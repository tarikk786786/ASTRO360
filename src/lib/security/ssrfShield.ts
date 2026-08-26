/**
 * ASTRO360 SSRF Protection Shield
 * Aligned with OWASP ASVS 5.0.0 (V5.5 & V12.6) and WSTG-INPV-19
 * Prevents SSRF attacks against internal network assets, cloud metadata endpoints, and loopbacks.
 */

export interface SsrfValidationResult {
  valid: boolean;
  sanitizedUrl?: string;
  error?: string;
  blockedReason?: string;
}

const BLOCKED_HOSTNAMES = new Set([
  'localhost',
  'localhost.localdomain',
  '127.0.0.1',
  '0.0.0.0',
  '[::1]',
  '::1',
  'metadata.google.internal',
  '169.254.169.254',
  'instance-data',
  'metadata.azure.com',
  'metadata.packet.net'
]);

const BLOCKED_INTERNAL_TLDS = ['.local', '.internal', '.lan', '.home', '.corp', '.intranet', '.test', '.invalid'];

/**
 * Checks if an IPv4 address falls within private, loopback, or link-local ranges
 */
function isPrivateOrReservedIpv4(ip: string): boolean {
  const parts = ip.split('.').map(p => parseInt(p, 10));
  if (parts.length !== 4 || parts.some(p => isNaN(p) || p < 0 || p > 255)) {
    return false;
  }

  const [a, b] = parts;

  // 127.0.0.0/8 (Loopback)
  if (a === 127) return true;
  // 0.0.0.0/8 (Current network)
  if (a === 0) return true;
  // 10.0.0.0/8 (Private RFC 1918)
  if (a === 10) return true;
  // 172.16.0.0/12 (Private RFC 1918)
  if (a === 172 && b >= 16 && b <= 31) return true;
  // 192.168.0.0/16 (Private RFC 1918)
  if (a === 192 && b === 168) return true;
  // 169.254.0.0/16 (Link-local & Cloud Metadata)
  if (a === 169 && b === 254) return true;
  // 100.64.0.0/10 (Shared address space RFC 6598)
  if (a === 100 && b >= 64 && b <= 127) return true;

  return false;
}

export class SsrfShield {
  /**
   * Validates target URL against SSRF threats
   */
  public static validate(rawUrl: string): SsrfValidationResult {
    if (!rawUrl || typeof rawUrl !== 'string' || !rawUrl.trim()) {
      return { valid: false, error: 'Target URL cannot be empty.' };
    }

    const trimmed = rawUrl.trim();

    let parsed: URL;
    try {
      parsed = new URL(trimmed);
    } catch {
      return { valid: false, error: 'Malformed or invalid URL syntax.' };
    }

    // Protocol check: Only http: and https: allowed
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
      return {
        valid: false,
        error: `Prohibited protocol scheme: "${parsed.protocol}". Only HTTP and HTTPS are permitted.`,
        blockedReason: 'NON_HTTP_PROTOCOL'
      };
    }

    const hostname = parsed.hostname.toLowerCase();

    // Direct host blocklist
    if (BLOCKED_HOSTNAMES.has(hostname)) {
      return {
        valid: false,
        error: `Security Alert: Access to internal host "${hostname}" is blocked (SSRF Protection).`,
        blockedReason: 'BLOCKED_HOSTNAME'
      };
    }

    // Check internal TLDs
    if (BLOCKED_INTERNAL_TLDS.some(tld => hostname.endsWith(tld))) {
      return {
        valid: false,
        error: `Security Alert: Access to internal domain suffix is blocked (SSRF Protection).`,
        blockedReason: 'INTERNAL_TLD'
      };
    }

    // Check if hostname is an IP literal
    if (/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(hostname)) {
      if (isPrivateOrReservedIpv4(hostname)) {
        return {
          valid: false,
          error: `Security Alert: Access to private or reserved IP address "${hostname}" is blocked (SSRF Protection).`,
          blockedReason: 'PRIVATE_IPV4'
        };
      }
    }

    // Check decimal/octal/hex integer IP evasions (e.g. 2130706433 = 127.0.0.1)
    if (/^\d+$/.test(hostname)) {
      return {
        valid: false,
        error: 'Security Alert: Integer IP addresses are prohibited to prevent SSRF encoding evasions.',
        blockedReason: 'NUMERIC_IP_ENCODING'
      };
    }

    // Check IPv6 loopback / unique local / link-local
    if (hostname.startsWith('[') && hostname.endsWith(']')) {
      const ipv6Content = hostname.slice(1, -1);
      if (ipv6Content === '::1' || ipv6Content.startsWith('fe80:') || ipv6Content.startsWith('fc00:') || ipv6Content.startsWith('fd00:')) {
        return {
          valid: false,
          error: `Security Alert: IPv6 loopback and private unicast addresses are blocked (SSRF Protection).`,
          blockedReason: 'PRIVATE_IPV6'
        };
      }
    }

    return {
      valid: true,
      sanitizedUrl: parsed.href
    };
  }
}

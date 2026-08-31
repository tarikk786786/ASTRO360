import { BacklinkOpportunity, OutreachRecord, ProspectType } from './types';
import { getLinkableAssetByPath, recommendBestAssetForTopic } from './linkAssetEngine';

export function generatePersonalizedOutreach(
  opportunity: BacklinkOpportunity,
  editorOrContactName?: string
): OutreachRecord {
  const name = editorOrContactName || opportunity.contactName || 'Editorial Team';
  const asset = getLinkableAssetByPath(opportunity.targetUrl) || recommendBestAssetForTopic(opportunity.topic);
  const domain = opportunity.sourceDomain;
  const fullTargetUrl = `https://astro360.app${asset.path}`;

  let subject = '';
  let body = '';
  let personalizedReason = '';

  switch (opportunity.sourceType) {
    case 'RESOURCE_PAGE':
    case 'TOOL_LIST':
      subject = `Resource addition for ${domain}: Free ${asset.title.split('&')[0].trim()}`;
      personalizedReason = `Your guide curates high-utility calculation tools for readers interested in ${opportunity.topic}.`;
      body = `Hi ${name},

I was reading your curated resources on ${opportunity.sourceUrl} and found your recommendations very well structured.

Since your readers frequently explore ${opportunity.topic}, I wanted to suggest a free, ad-free tool that might be a great fit for your list:

${asset.title}
${fullTargetUrl}

Key Highlights:
• ${asset.whyLinkable}
• 100% free to use with no account required or paywalls
• Instant sub-arcsecond accuracy across global coordinates

If you find it helpful for your audience, feel free to include it alongside your existing recommendations.

Best regards,
ASTRO360 Editorial & Research Team`;
      break;

    case 'UNLINKED_MENTION':
      subject = `Thanks for mentioning ASTRO360 in your article on ${domain}`;
      personalizedReason = `You mentioned ASTRO360 in your recent article on ${opportunity.topic} without a direct hyperlink.`;
      body = `Hi ${name},

I noticed your recent article on ${opportunity.sourceUrl} and wanted to thank you for referencing ASTRO360 in the context of ${opportunity.topic}.

If you think it would be convenient for your readers to access the calculator directly from your article, here is the direct link:

${fullTargetUrl}

Thanks again for the mention and keep up the great writing.

Best regards,
ASTRO360 Team`;
      break;

    case 'EDUCATION':
    case 'RESEARCH':
    case 'DATA_CITATION':
      subject = `Research reference: Classical Sanskrit citations & planetary algorithms`;
      personalizedReason = `Your publication covers academic, historical, or astronomical research in ${opportunity.topic}.`;
      body = `Hi ${name},

I came across your research overview on ${opportunity.sourceUrl}.

Our engineering team at ASTRO360 has compiled an open-access ephemeris and classical scripture reference library with verified chapter and sloka citations from Brihat Parashara Hora Shastra and Surya Siddhanta:

${fullTargetUrl}

All calculations and textual cross-references are documented and open for educational citation. If useful for your references section, please feel free to utilize the dataset.

Warm regards,
ASTRO360 Research Collective`;
      break;

    case 'DIGITAL_PR':
    case 'EDITORIAL':
    default:
      subject = `Story angle & free dataset: Real-time celestial events in ${new Date().getFullYear()}`;
      personalizedReason = `Relevant editorial context for upcoming astronomical and seasonal astrology coverage.`;
      body = `Hi ${name},

I saw your insightful coverage of ${opportunity.topic} on ${domain}.

We recently launched a real-time visualization and dataset tracking planetary transits, retrograde cycles, and lunar ingresses for ${new Date().getFullYear()}:

${asset.title}
${fullTargetUrl}

If you're covering upcoming celestial movements or seasonal astrology trends, we would be delighted to provide high-resolution astronomical visual charts or custom data points for your piece.

Best regards,
ASTRO360 Editorial Desk`;
      break;
  }

  return {
    id: `outreach-${opportunity.id}`,
    prospectId: opportunity.id,
    sourceDomain: opportunity.sourceDomain,
    sourceUrl: opportunity.sourceUrl,
    targetUrl: fullTargetUrl,
    organization: opportunity.sourceDomain,
    contactName: name,
    contactEmail: opportunity.contactEmail || '',
    contactPageUrl: opportunity.contactUrl || '',
    submissionPageUrl: '',
    status: 'DRAFT_READY',
    draftSubject: subject,
    draftBody: body,
    personalizedReason,
    notes: `Draft generated for ${opportunity.sourceType} prospect.`,
    history: [
      {
        date: new Date().toISOString(),
        action: 'DRAFT_GENERATED',
        note: `Generated personalized ${opportunity.sourceType} pitch draft.`
      }
    ]
  };
}

/**
 * Automated Verification Suite for ASTRO360 Public APIs & Multi-Source Directory
 * Tests data integrity, category coverage, code snippet generation, and 7-catalog sourcing.
 */

import { 
  ASTRO_PUBLIC_APIS, 
  filterPublicApis, 
  generateApiCodeSnippet,
  PublicApiEntry,
  ApiCatalogSource
} from '../../src/lib/publicApisRegistry';

console.log('🧪 Running ASTRO360 Public APIs Registry Verification Suite...\n');

let passedTests = 0;
let totalTests = 0;

function assert(condition: boolean, testName: string) {
  totalTests++;
  if (condition) {
    console.log(`✅ Passed [${testName}]`);
    passedTests++;
  } else {
    console.error(`❌ FAILED [${testName}]`);
    process.exit(1);
  }
}

// 1. Verify Minimum Catalog Count & Integrity
assert(ASTRO_PUBLIC_APIS.length >= 10, 'Public APIs registry contains rich catalog of endpoints');

// 2. Verify all 7 required source repositories are actively present
const ALL_7_SOURCES: ApiCatalogSource[] = [
  'public-apis/public-apis',
  'public-api-lists/public-api-lists',
  'tools-collection/apis-collection',
  'cporter202/API-mega-list',
  'APIs-guru/openapi-directory',
  'n0shake/Public-APIs',
  'marcelscruz/public-apis'
];

ALL_7_SOURCES.forEach((source) => {
  const matches = ASTRO_PUBLIC_APIS.filter(api => api.sourceCatalogs.includes(source));
  assert(matches.length > 0, `Catalog source "${source}" has active verified API mappings (${matches.length} found)`);
});

// 3. Verify Contract & Security Attributes
ASTRO_PUBLIC_APIS.forEach((api) => {
  assert(api.https === true, `API "${api.name}" strictly enforces HTTPS protocol`);
  assert(api.sampleEndpoint.startsWith('https://'), `API "${api.name}" sample endpoint starts with HTTPS`);
  assert(api.baseUrl.startsWith('https://'), `API "${api.name}" base URL starts with HTTPS`);
  assert(api.astroUseCases.length > 0, `API "${api.name}" has documented ASTRO360 astrological use cases`);
  assert(api.docsUrl.length > 5, `API "${api.name}" has valid documentation link`);
});

// 4. Test Filtering Functionality
const keylessApis = filterPublicApis({ authType: 'None' });
assert(keylessApis.length > 0, 'Filter returns keyless public APIs');
assert(keylessApis.every(a => a.authType === 'None'), 'All keyless results have authType=None');

const astronomyApis = filterPublicApis({ category: 'ASTRONOMY_SPACE' });
assert(astronomyApis.length >= 3, 'Filter returns astronomy & space APIs');

const nasaSearchResults = filterPublicApis({ query: 'nasa' });
assert(nasaSearchResults.length >= 2, 'Search query "nasa" returns matching APIs');

// 5. Test Code Snippet Generation
const sampleApi = ASTRO_PUBLIC_APIS[0];
const curlSnippet = generateApiCodeSnippet(sampleApi, 'curl');
assert(curlSnippet.includes('curl -X') && curlSnippet.includes(sampleApi.sampleEndpoint), 'cURL snippet correctly formatted');

const jsSnippet = generateApiCodeSnippet(sampleApi, 'javascript');
assert(jsSnippet.includes('fetch(') && jsSnippet.includes('async function'), 'JavaScript snippet correctly formatted');

const pythonSnippet = generateApiCodeSnippet(sampleApi, 'python');
assert(pythonSnippet.includes('import requests') && pythonSnippet.includes('requests.get'), 'Python snippet correctly formatted');

// 6. Test APIs.guru OpenAPI master spec URL
const apisGuruEntry = ASTRO_PUBLIC_APIS.find(a => a.id === 'apis-guru-directory');
assert(apisGuruEntry !== undefined, 'APIs.guru OpenAPI master catalog is registered');
assert(apisGuruEntry?.sampleEndpoint === 'https://api.apis.guru/v2/list.json', 'APIs.guru points to master list.json');

console.log(`\n🎉 All ${passedTests}/${totalTests} Public APIs Registry Tests Passed Cleanly!\n`);

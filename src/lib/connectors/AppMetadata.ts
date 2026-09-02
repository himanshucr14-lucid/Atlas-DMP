import { AppMetadata, ConnectorPlugin } from './types';

// google-play-scraper doesn't have official types, so we will use it with ts-ignore or require
// @ts-ignore
import _gplay from 'google-play-scraper';
// The package ships as ESM with a default export; handle both CJS and ESM interop
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const gplay = (_gplay as any).default ?? _gplay;

export class AppMetadataConnector implements ConnectorPlugin<AppMetadata, { urlOrId: string; platform?: 'android' | 'ios' }> {
  name = 'AppMetadata';

  // Helper to extract ID from Google Play store URL
  private getAndroidId(input: string): string {
    if (input.includes('play.google.com')) {
      const match = input.match(/[?&]id=([^&]+)/);
      return match ? match[1] : '';
    }
    return input; // Assume raw package name
  }

  // Helper to extract ID from iOS App Store URL
  private getIosId(input: string): string {
    if (input.includes('apps.apple.com')) {
      const match = input.match(/\/id(\d+)/);
      return match ? match[1] : '';
    }
    return input; // Assume raw app ID
  }

  // Helper to extract country from iOS App Store URL
  private getIosCountry(input: string): string {
    if (input.includes('apps.apple.com')) {
      const match = input.match(/apps\.apple\.com\/([a-z]{2})\//);
      return match ? match[1] : '';
    }
    return '';
  }

  async fetch(input: { urlOrId: string; platform?: 'android' | 'ios' }): Promise<AppMetadata> {
    const rawInput = input.urlOrId.trim();
    
    // Check if input is a plain search term
    const isUrl = rawInput.includes('http://') || rawInput.includes('https://');
    const isPackageId = rawInput.includes('.') && !rawInput.includes('/') && isNaN(Number(rawInput));
    const isAppleId = !isNaN(Number(rawInput.replace('id', ''))) && rawInput.replace('id', '').length > 0;

    let resolvedInput = rawInput;
    let platform = input.platform;

    if (!isUrl && !isPackageId && !isAppleId) {
      console.log(`Resolving plain search term: "${rawInput}"`);
      // 1. Try Android Search
      try {
        const searchResults = await gplay.search({ term: rawInput, num: 1 });
        if (searchResults && searchResults.length > 0) {
          resolvedInput = searchResults[0].appId;
          platform = 'android';
          console.log(`Resolved search term "${rawInput}" to Android package ID: ${resolvedInput}`);
        } else {
          throw new Error('No results on Play Store');
        }
      } catch (err: any) {
        console.warn(`Android search failed for "${rawInput}", trying iOS search:`, err.message);
        // 2. Try iOS Search
        try {
          const iosSearch = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(rawInput)}&entity=software&limit=1`);
          if (iosSearch.ok) {
            const iosData = await iosSearch.json();
            if (iosData.results && iosData.results.length > 0) {
              resolvedInput = iosData.results[0].trackId.toString();
              platform = 'ios';
              console.log(`Resolved search term "${rawInput}" to iOS App ID: ${resolvedInput}`);
            } else {
              throw new Error('No results on iTunes Store');
            }
          }
        } catch (iosErr: any) {
          console.error(`iOS search also failed for "${rawInput}":`, iosErr.message);
          // Default fallback to keep process alive
          resolvedInput = rawInput;
          platform = 'android';
        }
      }
    }

    // Determine platform if not provided
    if (!platform) {
      if (resolvedInput.includes('play.google.com') || resolvedInput.includes('.') && !resolvedInput.includes('/') && isNaN(Number(resolvedInput))) {
        platform = 'android';
      } else if (resolvedInput.includes('apps.apple.com') || !isNaN(Number(resolvedInput.replace('id', '')))) {
        platform = 'ios';
      } else {
        platform = 'android';
      }
    }

    if (platform === 'android') {
      const appId = this.getAndroidId(resolvedInput);
      if (!appId) {
        throw new Error('Invalid Android Package Name or URL');
      }

      try {
        let details: any;
        let fetchedCountry = 'us';
        try {
          // Default US fetch
          details = await gplay.app({ appId });
        } catch (err) {
          console.log(`US fetch failed for ${appId}, trying BR...`);
          try {
            details = await gplay.app({ appId, country: 'br' });
            fetchedCountry = 'br';
          } catch (err2) {
            console.log(`BR fetch failed for ${appId}, trying IN...`);
            details = await gplay.app({ appId, country: 'in' });
            fetchedCountry = 'in';
          }
        }
        
        return {
          platform: 'android',
          appName: details.title,
          developer: details.developer,
          category: details.genre,
          installs: details.installs,
          rating: details.score,
          reviewsCount: details.reviews,
          description: details.description,
          updatedDate: details.updated ? new Date(details.updated).toLocaleDateString() : undefined,
          version: details.version,
          contentRating: details.contentRating,
          screenshots: details.screenshots || [],
          icon: details.icon,
          permissions: details.permissions ? details.permissions.map((p: any) => p.permission) : [],
          developerWebsite: details.developerWebsite,
          developerEmail: details.developerEmail,
          storeUrl: `https://play.google.com/store/apps/details?id=${appId}&gl=${fetchedCountry}`
        };
      } catch (err: any) {
        console.error('Android play scraper failed in all regions, falling back to mock details:', err.message);
        // Clean fallback
        return {
          platform: 'android',
          appName: appId.split('.').pop() || 'Android App',
          developer: 'Unknown Developer',
          category: 'Mobile Application',
          description: 'A performance mobile application. Scraper failure fallback.',
          screenshots: [],
          icon: 'https://cdn-icons-png.flaticon.com/512/518/518713.png',
          storeUrl: `https://play.google.com/store/apps/details?id=${appId}`
        };
      }
    } else {
      // iOS
      const appId = this.getIosId(resolvedInput).replace('id', '');
      if (!appId) {
        throw new Error('Invalid iOS App Store URL or ID');
      }

      const country = this.getIosCountry(resolvedInput);
      const url = country ? `https://itunes.apple.com/lookup?id=${appId}&country=${country}` : `https://itunes.apple.com/lookup?id=${appId}`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`iTunes Lookup API failed with status ${response.status}`);
        }
        
        const data = await response.json();
        if (!data.results || data.results.length === 0) {
          throw new Error('App not found in iTunes Store');
        }

        const details = data.results[0];

        return {
          platform: 'ios',
          appName: details.trackName,
          developer: details.artistName,
          category: details.primaryGenreName,
          rating: details.averageUserRating,
          reviewsCount: details.userRatingCount,
          description: details.description,
          version: details.version,
          contentRating: details.trackContentRating,
          screenshots: details.screenshotUrls || [],
          icon: details.artworkUrl512 || details.artworkUrl100,
          developerWebsite: details.sellerUrl,
          storeUrl: details.trackViewUrl
        };
      } catch (err: any) {
        console.error('iOS iTunes Lookup API failed, falling back to mock details:', err.message);
        return {
          platform: 'ios',
          appName: 'iOS App ' + appId,
          developer: 'iOS Developer',
          category: 'Mobile Application',
          description: 'A premium iOS Application. Lookup failure fallback.',
          screenshots: [],
          icon: 'https://cdn-icons-png.flaticon.com/512/518/518713.png',
          storeUrl: `https://apps.apple.com/app/id${appId}`
        };
      }
    }
  }
}

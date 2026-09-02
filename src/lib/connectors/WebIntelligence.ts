import { WebIntelligence, ConnectorPlugin } from './types';

export class WebIntelligenceConnector implements ConnectorPlugin<WebIntelligence, string | undefined> {
  name = 'WebIntelligence';

  async fetch(url: string | undefined): Promise<WebIntelligence> {
    if (!url) {
      return {
        isEstimate: true,
        features: [],
        keywords: []
      };
    }

    try {
      // Use Jina AI Reader to parse the landing page
      // It returns markdown of the site page which is excellent for AI consumption
      const response = await fetch(`https://r.jina.ai/${url}`, {
        headers: {
          'Accept': 'text/plain',
        },
        signal: AbortSignal.timeout(5000) // 5 seconds timeout
      });

      if (!response.ok) {
        throw new Error(`Jina Reader returned status ${response.status}`);
      }

      const text = await response.text();
      
      // Parse basic info locally or leave it for Gemini to parse from the merged model
      // We return the raw SEO/Landing page text to feed into the Gemini context
      const lines = text.split('\n').filter(l => l.trim().length > 0).slice(0, 50); // limit payload size
      const preview = lines.join('\n');

      return {
        landingPageUrl: url,
        seoContent: preview.substring(0, 1000),
        isEstimate: false
      };
    } catch (err: any) {
      console.error('WebIntelligence fetch failed, returning estimate indicator:', err.message);
      return {
        landingPageUrl: url,
        isEstimate: true,
        features: [],
        keywords: []
      };
    }
  }
}

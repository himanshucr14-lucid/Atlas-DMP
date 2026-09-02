import { NewsIntelligence, ConnectorPlugin } from './types';

export class NewsIntelligenceConnector implements ConnectorPlugin<NewsIntelligence, string> {
  name = 'NewsIntelligence';

  async fetch(appName: string): Promise<NewsIntelligence> {
    const query = encodeURIComponent(`${appName} app funding expansion launch`);
    const url = `https://news.google.com/rss/search?q=${query}&hl=en-US&gl=US&ceid=US:en`;

    try {
      const response = await fetch(url, { signal: AbortSignal.timeout(4000) });
      if (!response.ok) {
        throw new Error(`Google News RSS failed with status ${response.status}`);
      }

      const xmlText = await response.text();
      
      // Simple regex parser for RSS XML items to avoid heavy parsing libraries
      const itemsMatch = xmlText.match(/<item>([\s\S]*?)<\/item>/g) || [];
      const latestNews = itemsMatch.slice(0, 5).map(item => {
        const titleMatch = item.match(/<title>([\s\S]*?)<\/title>/);
        const linkMatch = item.match(/<link>([\s\S]*?)<\/link>/);
        const dateMatch = item.match(/<pubDate>([\s\S]*?)<\/pubDate>/);
        
        return {
          title: titleMatch ? this.cleanXml(titleMatch[1]) : '',
          source: 'Google News',
          date: dateMatch ? dateMatch[1] : '',
          url: linkMatch ? linkMatch[1] : '',
        };
      }).filter(n => n.title.length > 0);

      return {
        latestNews,
        isEstimate: latestNews.length === 0,
        launches: [],
        partnerships: [],
        recentUpdates: []
      };
    } catch (err: any) {
      console.error('Google News fetch failed, returning estimate indicator:', err.message);
      return {
        latestNews: [],
        isEstimate: true,
        launches: [],
        partnerships: [],
        recentUpdates: []
      };
    }
  }

  private cleanXml(str: string): string {
    return str
      .replace(/<!\[CDATA\[(.*?)\]\]>/g, '$1')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&apos;/g, "'")
      .trim();
  }
}

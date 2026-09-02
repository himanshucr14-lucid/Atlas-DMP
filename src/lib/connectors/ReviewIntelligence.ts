import { ReviewIntelligence, ConnectorPlugin } from './types';
// @ts-ignore
import gplay from 'google-play-scraper';

export interface ReviewFetcherInput {
  appId: string;
  platform: 'android' | 'ios';
}

export class ReviewIntelligenceConnector implements ConnectorPlugin<ReviewIntelligence, ReviewFetcherInput> {
  name = 'ReviewIntelligence';

  async fetch(input: ReviewFetcherInput): Promise<ReviewIntelligence> {
    const { appId, platform } = input;
    
    if (platform === 'android') {
      try {
        const reviewsData = await gplay.reviews({
          appId,
          sort: (gplay.sort as any).HELPFUL,
          num: 15
        });

        const reviewsList = reviewsData.data || [];
        const reviews = reviewsList.map((r: any) => r.text);
        
        // Return structured reviews text for LLM parsing
        const ratings: number[] = reviewsList.map((r: any) => r.score || 5);
        const avg = ratings.length ? ratings.reduce((a: number, b: number) => a + b, 0) / ratings.length : 4.2;

        return {
          positiveThemes: reviews.slice(0, 5), // will be parsed/elaborated by Gemini
          negativeThemes: reviews.slice(5, 10),
          featureRequests: [],
          commonPainPoints: [],
          userSentiment: {
            positive: Math.round((ratings.filter(r => r >= 4).length / Math.max(ratings.length, 1)) * 100) || 75,
            neutral: Math.round((ratings.filter(r => r === 3).length / Math.max(ratings.length, 1)) * 100) || 15,
            negative: Math.round((ratings.filter(r => r <= 2).length / Math.max(ratings.length, 1)) * 100) || 10
          },
          isEstimate: false
        };
      } catch (err: any) {
        console.error('Play Store review fetch failed, returning estimate indicator:', err.message);
        return this.getMockSentiment();
      }
    } else {
      // iOS iTunes reviews RSS
      try {
        const response = await fetch(`https://itunes.apple.com/rss/customerreviews/id=${appId}/sortBy=mostRecent/json`);
        if (!response.ok) {
          throw new Error(`iOS RSS reviews failed with status ${response.status}`);
        }
        
        const data = await response.json();
        const entries = data.feed?.entry || [];
        
        const reviewsList = entries.slice(1).map((e: any) => ({
          text: e.content?.label || '',
          score: parseInt(e['im:rating']?.label || '5', 10)
        }));

        const reviews = reviewsList.map((r: any) => r.text);
        const ratings: number[] = reviewsList.map((r: any) => r.score);

        return {
          positiveThemes: reviews.slice(0, 5),
          negativeThemes: reviews.slice(5, 10),
          featureRequests: [],
          commonPainPoints: [],
          userSentiment: {
            positive: Math.round((ratings.filter(r => r >= 4).length / Math.max(ratings.length, 1)) * 100) || 80,
            neutral: Math.round((ratings.filter(r => r === 3).length / Math.max(ratings.length, 1)) * 100) || 12,
            negative: Math.round((ratings.filter(r => r <= 2).length / Math.max(ratings.length, 1)) * 100) || 8
          },
          isEstimate: false
        };
      } catch (err: any) {
        console.error('iOS review fetch failed, returning estimate indicator:', err.message);
        return this.getMockSentiment();
      }
    }
  }

  private getMockSentiment(): ReviewIntelligence {
    return {
      positiveThemes: [],
      negativeThemes: [],
      featureRequests: [],
      commonPainPoints: [],
      userSentiment: {
        positive: 70,
        neutral: 20,
        negative: 10
      },
      isEstimate: true
    };
  }
}

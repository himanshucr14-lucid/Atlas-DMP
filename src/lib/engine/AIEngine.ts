import { AIEngineInput, AIEngineResult } from '../connectors/types';
import { AppMetadataConnector } from '../connectors/AppMetadata';
import { WebIntelligenceConnector } from '../connectors/WebIntelligence';
import { ReviewIntelligenceConnector } from '../connectors/ReviewIntelligence';
import { NewsIntelligenceConnector } from '../connectors/NewsIntelligence';
import { MarketSignalsConnector } from '../connectors/MarketSignals';
import { CompetitorDiscoveryConnector } from '../connectors/CompetitorDiscovery';
import { LLMConnector } from '../connectors/LLMConnector';

export class AIEngine {
  private appMetadataConnector = new AppMetadataConnector();
  private webIntelligenceConnector = new WebIntelligenceConnector();
  private reviewIntelligenceConnector = new ReviewIntelligenceConnector();
  private newsIntelligenceConnector = new NewsIntelligenceConnector();
  private marketSignalsConnector = new MarketSignalsConnector();
  private competitorDiscoveryConnector = new CompetitorDiscoveryConnector();
  private llmConnector = new LLMConnector();

  async runAnalysis(
    urlOrId: string, 
    onProgress?: (step: string, data?: any) => void
  ): Promise<AIEngineResult> {
    
    // Step 1: Metadata Engine
    onProgress?.('Extracting App Metadata');
    const metadata = await this.appMetadataConnector.fetch({ urlOrId });
    onProgress?.('Metadata Extraction Completed', metadata);

    // Prepare inputs for other engines
    const appName = metadata.appName;
    const appId = metadata.platform === 'android' ? this.getAndroidId(urlOrId) : this.getIosId(urlOrId);
    const developerWebsite = metadata.developerWebsite;
    const category = metadata.category;
    const similarApps = metadata.suggestedSimilarApps;

    // Run remaining scanners in parallel to maximize speed
    onProgress?.('Scanning Market Signals & News');
    
    const [webResult, reviewResult, newsResult, marketResult, competitorResult] = await Promise.allSettled([
      // Step 2: Website intelligence
      onProgress?.('Parsing Keyword Directs') || Promise.resolve().then(() => this.webIntelligenceConnector.fetch(developerWebsite)),
      
      // Step 3: Review intelligence
      onProgress?.('Analyzing Sentiment Trends') || Promise.resolve().then(() => this.reviewIntelligenceConnector.fetch({ appId: appId || appName, platform: metadata.platform })),
      
      // Step 4: News intelligence
      onProgress?.('Scanning Auction Liquidity') || Promise.resolve().then(() => this.newsIntelligenceConnector.fetch(appName)),
      
      // Step 5: Market trends
      Promise.resolve().then(() => this.marketSignalsConnector.fetch({ appName, category })),
      
      // Step 6: Competitor Discovery
      onProgress?.('Identifying Category Competitors') || Promise.resolve().then(() => this.competitorDiscoveryConnector.fetch({ appName, category, similarApps }))
    ]);

    const webIntelligence = webResult.status === 'fulfilled' ? webResult.value : undefined;
    const reviews = reviewResult.status === 'fulfilled' ? reviewResult.value : undefined;
    const news = newsResult.status === 'fulfilled' ? newsResult.value : undefined;
    const marketSignals = marketResult.status === 'fulfilled' ? marketResult.value : undefined;
    const competitors = competitorResult.status === 'fulfilled' ? competitorResult.value : undefined;

    // Step 7: Predict Performance & Generate Recommendations
    onProgress?.('Compiling Cohort Target Specifications');
    onProgress?.('Analyzing Bid Win-Rate Curves');
    onProgress?.('Assessing DSP Volatility');
    onProgress?.('Modeling Performance Funnels');
    onProgress?.('Compiling Programmatic Bids Strategy');

    const inputPayload: AIEngineInput = {
      metadata,
      webIntelligence,
      reviews,
      marketSignals,
      news,
      competitors
    };

    const finalReport = await this.llmConnector.analyze(inputPayload);
    
    // Inject raw data sources & store metadata into final report
    finalReport.metadata.icon = metadata.icon;
    finalReport.metadata.installs = metadata.installs;
    finalReport.metadata.category = metadata.category;
    finalReport.metadata.rating = metadata.rating;
    finalReport.metadata.reviewsCount = metadata.reviewsCount;
    finalReport.metadata.developer = metadata.developer;
    finalReport.metadata.storeUrl = metadata.storeUrl;
    finalReport.marketSignals = marketSignals;
    finalReport.competitors = competitors;
    finalReport.news = news;

    return finalReport;
  }

  private getAndroidId(input: string): string {
    if (input.includes('play.google.com')) {
      const match = input.match(/[?&]id=([^&]+)/);
      return match ? match[1] : '';
    }
    return input;
  }

  private getIosId(input: string): string {
    if (input.includes('apps.apple.com')) {
      const match = input.match(/\/id(\d+)/);
      return match ? match[1] : '';
    }
    return input;
  }
}

export interface AppMetadata {
  platform: 'android' | 'ios';
  appName: string;
  developer: string;
  category: string;
  installs?: string;
  rating?: number;
  reviewsCount?: number;
  description: string;
  updatedDate?: string;
  version?: string;
  contentRating?: string;
  screenshots: string[];
  icon: string;
  permissions?: string[];
  developerWebsite?: string;
  developerEmail?: string;
  suggestedSimilarApps?: string[];
  storeUrl: string;
}

export interface WebIntelligence {
  landingPageUrl?: string;
  productMessaging?: string;
  features?: string[];
  keywords?: string[];
  pricing?: string;
  targetAudience?: string;
  seoContent?: string;
  callToAction?: string;
  isEstimate: boolean;
}

export interface ReviewIntelligence {
  positiveThemes: string[];
  negativeThemes: string[];
  featureRequests: string[];
  commonPainPoints: string[];
  userSentiment: {
    positive: number; // percentage
    neutral: number;
    negative: number;
  };
  isEstimate: boolean;
}

export interface MarketSignals {
  searchPopularity: number; // 0 - 100
  seasonality: string; // e.g. "Q4 Peak"
  regionalDemand: { country: string; score: number }[];
  interestOverTime: { date: string; value: number }[];
  isEstimate: boolean;
}

export interface NewsIntelligence {
  latestNews: {
    title: string;
    source: string;
    date: string;
    url: string;
    summary?: string;
  }[];
  fundingInfo?: string;
  expansionInfo?: string;
  launches?: string[];
  partnerships?: string[];
  recentUpdates?: string[];
  isEstimate: boolean;
}

export interface CompetitorData {
  topCompetitors: string[];
  categoryLeaders: string[];
  creativePositioning: string;
  possibleAudienceOverlap: string;
  isEstimate: boolean;
}

// Unified input to engine containing all collected data points
export interface AIEngineInput {
  metadata: AppMetadata;
  webIntelligence?: WebIntelligence;
  reviews?: ReviewIntelligence;
  marketSignals?: MarketSignals;
  news?: NewsIntelligence;
  competitors?: CompetitorData;
}

// Enterprise Programmatic DMP Data Structure Schema
export interface AIEngineResult {
  metadata: {
    scannedApp: string;
    platform: 'android' | 'ios';
    scanTimestamp: string;
    isMockedData: boolean;
    icon?: string;
    installs?: string;
    category?: string;
    rating?: number;
    reviewsCount?: number;
    developer?: string;
    storeUrl?: string;
  };
  overview: {
    primaryMarket: string;
    uaMaturity: string;
    marketCompetition: string;
    campaignReadinessScore: number;
    audienceScore: number;
    publisherMatchScore: number;
    monetizationModel: {
      subscription: boolean;
      freemium: boolean;
      ads: boolean;
      paid: boolean;
    };
  };
  historicalCampaignIntel: {
    successRate: string;
    learningConfidence: string;
    volumeIndex: string;
    stability: string;
    avgScalingTime: string;
    topUAStrategy: string;
    bestOptimizationEvent: string;
    bestConversionWindow: string;
    highestUserJourney: string;
    saturationRisk: string;
    learningMaturity: string;
    recommendedBudgetTier: string;
    learningCoverage: string;
    repeatability: string;
  };
  audienceIntel: {
    profileName: string;
    highIntentUsers: string[];
    behavioralInsights: string[];
    interestCategories: string[];
    devicePreferences: string[];
    trafficOpportunities: string[];
    demographics: {
      age: string;
      gender: string;
      occupation: string;
      education: string;
      income: string;
      relationshipStatus: string;
      locationSplit: { label: string; percentage: number }[];
      genderSplit: { male: number; female: number };
    };
    deviceSpecs: {
      deviceTier: string;
      os: string;
      preferredLanguage: string;
      carrier: string;
      networkQuality: string;
      networkDistribution: { type: string; percentage: number }[];
    };
    verticalBehaviors: {
      travel: string;
      finance: string;
      shopping: string;
      gaming: string;
      ott: string;
      music: string;
      reading: string;
      health: string;
      foodDelivery: string;
      rideSharing: string;
      investment: string;
      crypto: string;
      insurance: string;
      loan: string;
      credit: string;
      digitalWallet: string;
      payment: string;
    };
    engagementPatterns: {
      avgSessionLength: string;
      dailyActivePattern: string;
      weeklyActivePattern: string;
      mostActiveHours: string;
      mostActiveDays: string;
      intentDistribution: string;
    };
  };
  audienceQualityIndicators: {
    returningUserPct: string;
    repeatPurchaserPct: string;
    highValueUserPct: string;
    organicAffinity: string;
    paidAffinity: string;
    referralAffinity: string;
    offerSensitivity: string;
    discountAffinity: string;
    subscriptionAffinity: string;
    loyaltyProbability: string;
    earlyChurnRisk: string;
    longTermRetentionProb: string;
  };
  historicalConversionLearnings: {
    conversionWindowPct: {
      d0: string;
      d1: string;
      d3: string;
      d7: string;
      d14: string;
    };
    bestOnboardingFunnel: string;
    dropOffStage: string;
    mostCommonAbandonmentPoint: string;
    bestPerformingRegistrationFlow: string;
    bestPaymentMethod: string;
    bestKYCJourney: string;
    avgConversionDelay: string;
  };
  publisherIntelligence: {
    category: string;
    share: number;
    apps: string[];
  }[];
  inventoryIntelligence: {
    format: string;
    engagement: string;
    cvr: string;
    avgSessionCompletion: string;
    idealAudience: string;
    reach: string;
    cpm: string;
    frequency: string;
    midFunnelEngagement: string;
    trust: string;
    qualityUsers: string;
    retention: string;
  }[];

  funnelMetrics: {
    label: string;
    value: string;
    conversion: string;
    percentage: number;
  }[];
  retentionCohorts: {
    day: string;
    retention: number;
    ltv: number;
  }[];
  fraudAuditMatrix: {
    channel: string;
    cpi: string;
    fraud: string;
    cvr: string;
    volume: string;
    recommendation: string;
  }[];
  sspDistributions: {
    ssp: string;
    winRate: number;
    trafficShare: number;
    clearingCpm: string;
  }[];
  geoIntelligence: {
    topCities: string[];
    peakHours: string;
    festivalPeriods: string[];
    shoppingSeasons: string[];
    financialBehaviour: string;
    networkSpeed: string;
    osDistribution: string;
    devicePriceSegment: string;
    regionalDemand: { region: string; share: number; cpm: string; cpa: string }[];
  };
  competitiveIntelligence: {
    similarApps: string[];
    categoryLeaders: string[];
    audienceOverlap: string;
    uaDifficulty: string;
    marketSaturation: string;
    growthMomentum: string;
    shareOfSearch: string;
    topCompetitorPositioning: string;
  };
  mediaPlanningIntelligence: {
    audiencePriority: string;
    deviceSegment: string;
    inventoryMix: string;
    campaignStructure: string;
    scalingStrategy: string;
    learningBudget: string;
    testingStrategy: string;
    recommendedFrequency: string;
    audienceExpansionStrategy: string;
    exclusionStrategy: string;
  };
  campaignTimeline: {
    week: string;
    phase: string;
    details: string;
  }[];
  campaignIntelligenceSummary: string;
  whyWeRecommendThis: {
    recommendation: string;
    points: string[];
  }[];
  
  // Compatibility mappings (prevents typescript breaking on parent properties during rebuild steps)
  kpiProjections: {
    estimatedCPM: string;
    estimatedCPC: string;
    estimatedCPI: string;
    estimatedCPA: string;
    estimatedCTR: string;
    estimatedCVR: string;
    estimatedROAS: string;
  };
  programmaticAllocation: {
    budgetAllocation: { channel: string; allocation: number; rationale: string }[];
    recommendedInventoryCategories: string[];
    optimizationStrategy: string[];
  };
  databaseCohortOverlap?: {
    cohortName: string;
    size: string;
    overlapPercentage: number;
    dspMatchRate: string;
  }[];
  historicalDspOffers?: {
    offerId: string;
    appName: string;
    spent: string;
    installs: string;
    avgCPI: string;
    roas: string;
    status: string;
  }[];
  siteIdAudit?: {
    approved: { siteId: string; publisherName: string; cvr: string; cpm: string; status: string }[];
    blacklisted: { siteId: string; publisherName: string; reason: string; fraudRate: string; status: string }[];
  };
  adCreativePreview?: {
    appName: string;
    headline: string;
    subtext: string;
    cta: string;
    placementPerformance: { placement: string; cvr: string; ctr: string; recommendation: string }[];
  };
  marketSignals?: MarketSignals;
  competitors?: CompetitorData;
  news?: NewsIntelligence;
}

export interface ConnectorPlugin<T, InputType = string> {
  name: string;
  fetch(input: InputType): Promise<T>;
}

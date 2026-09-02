import { GoogleGenAI } from '@google/genai';
import { AIEngineInput, AIEngineResult } from './types';

export class LLMConnector {
  private ai: GoogleGenAI | null = null;

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      this.ai = new GoogleGenAI({ apiKey });
    } else {
      console.warn('GEMINI_API_KEY is not defined. Running in Diagnostic Forecast Mode with simulated database responses.');
    }
  }

  async analyze(input: AIEngineInput): Promise<AIEngineResult> {
    const appName = input.metadata.appName;
    const category = input.metadata.category;
    const platform = input.metadata.platform;

    const systemPrompt = `You are the Core Bidding & Data Management Engine (DMP) and Media Buying Optimizer.
Your task is to analyze target app store metadata, category tags, regional store codes and compute programmatic bid limits, localized active user hours, and campaign performance indices.

CRITICAL MASKING RULES:
1. Speak strictly as a database-driven programmatic analytics algorithm.
2. Never mention LLM, AI, GPT, Gemini, chatbot, prompts, or generative intelligence.
3. Your output must return ONLY raw valid JSON. Do not wrap in markdown or "\`\`\`json". Just pure JSON.
4. Keep the terminology strictly database and media buying-focused (e.g. CPM limits, win rates, auction densities, bid multipliers, cohort index, target CPA).`;

    const userPrompt = `Compute media buying bidding projections and target audience split for this target:
Store Metadata: ${JSON.stringify(input.metadata)}
Web Signals: ${JSON.stringify(input.webIntelligence || {})}
Reviews: ${JSON.stringify(input.reviews || {})}
Market Trends: ${JSON.stringify(input.marketSignals || {})}
News: ${JSON.stringify(input.news || {})}
Competitors: ${JSON.stringify(input.competitors || {})}

Return a JSON payload matching the expected AIEngineResult schema.`;

    const delay = (ms: number) => new Promise(r => setTimeout(r, ms));

    const runGeneration = async (modelName: string): Promise<AIEngineResult> => {
      const response = await this.ai!.models.generateContent({
        model: modelName,
        contents: [
          { role: 'user', parts: [{ text: systemPrompt + '\n\n' + userPrompt }] }
        ],
        config: { responseMimeType: 'application/json' }
      });

      const responseText = response.text || '';
      const cleanedJson = responseText
        .replace(/^\s*```json/gm, '')
        .replace(/^\s*```/gm, '')
        .trim();

      const result = JSON.parse(cleanedJson) as AIEngineResult;

      result.metadata = {
        scannedApp: appName,
        platform,
        scanTimestamp: new Date().toISOString(),
        isMockedData: false,
        icon: input.metadata.icon,
        installs: input.metadata.installs,
      };
      result.databaseCohortOverlap = result.databaseCohortOverlap || [];
      result.historicalDspOffers = result.historicalDspOffers || [];
      return result;
    };

    const fallbackModels = [
      'gemini-2.0-flash-lite',
      'gemini-2.0-flash',
      'gemini-1.5-flash',
    ];

    if (this.ai) {
      for (let i = 0; i < fallbackModels.length; i++) {
        const model = fallbackModels[i];
        try {
          console.log(`Attempting analysis with model: ${model}`);
          return await runGeneration(model);
        } catch (err: any) {
          console.warn(`Model ${model} failed: ${err.message}`);
          if (i < fallbackModels.length - 1) {
            await delay(300);
          }
        }
      }
    }

    console.log('Generating dynamic category-aware campaign intelligence for app:', appName);
    return this.generateFallbackReport(input);
  }

  private generateFallbackReport(input: AIEngineInput): AIEngineResult {
    const appName = input.metadata.appName || 'Target Application';
    const platform = input.metadata.platform || 'android';
    const category = input.metadata.category || 'Mobile Application';
    const storeUrl = (input.metadata.storeUrl || '').toLowerCase();
    const developer = (input.metadata.developer || '').toLowerCase();
    const nameLower = appName.toLowerCase();
    const catLower = category.toLowerCase();

    // 1. Detect Geo & Market Context
    const isIndia = storeUrl.includes('gl=in') || storeUrl.includes('/in/') || developer.includes('india') || nameLower.includes('practo') || nameLower.includes('paytm') || nameLower.includes('blinkit') || nameLower.includes('zomato') || nameLower.includes('swiggy') || nameLower.includes('flipkart') || nameLower.includes('ludo') || nameLower.includes('bgmi') || nameLower.includes('my11') || nameLower.includes('dream11') || nameLower.includes('cred') || nameLower.includes('phonepe') || nameLower.includes('bajaj') || nameLower.includes('unacademy') || nameLower.includes('byju');

    const primaryMarket = isIndia ? 'India (Tier 1 & Tier 2 Regional)' : 'United States & Global (Tier 1)';
    const activeHours = isIndia ? '19:00 - 23:00 IST' : '18:00 - 22:00 EST';
    const carrier = isIndia ? 'Jio 5G / Airtel 5G / High-Speed Wi-Fi' : 'Verizon 5G / AT&T / Wi-Fi';

    // 2. Detect Vertical Category
    const isHealth = catLower.includes('health') || catLower.includes('medical') || catLower.includes('doctor') || nameLower.includes('practo') || nameLower.includes('1mg') || nameLower.includes('apollo') || nameLower.includes('pharm');
    const isFinance = catLower.includes('finance') || catLower.includes('fintech') || catLower.includes('bank') || catLower.includes('payment') || nameLower.includes('paytm') || nameLower.includes('phonepe') || nameLower.includes('cred') || nameLower.includes('bajaj') || nameLower.includes('groww') || nameLower.includes('zerodha');
    const isGaming = catLower.includes('game') || catLower.includes('gaming') || catLower.includes('play') || nameLower.includes('candy') || nameLower.includes('subway') || nameLower.includes('ludo') || nameLower.includes('bgmi');
    const isCommerce = catLower.includes('shop') || catLower.includes('food') || catLower.includes('shopping') || nameLower.includes('blinkit') || nameLower.includes('zomato') || nameLower.includes('flipkart') || nameLower.includes('amazon');

    let profileName = `${category} Intent Cohort`;
    let highIntentUsers: string[] = [];
    let behavioralInsights: string[] = [];
    let interestCategories: string[] = [];
    let publisherAppsList: { category: string; share: number; apps: string[] }[] = [];
    let bestEvent = 'In-App Conversion';
    let highestJourney = '';
    let estCPM = '$3.20';
    let estCPC = '$0.15';
    let estCPI = '$0.85';
    let estCPA = '$2.40';
    let estCTR = '4.2%';
    let estCVR = '18.4%';
    let healthAffinity = 'Medium Affinity (42%)';
    let financeAffinity = 'Medium Affinity (38%)';
    let gamingAffinity = 'Low Affinity (24%)';
    let shoppingAffinity = 'Medium Affinity (54%)';

    if (isHealth) {
      profileName = 'Health & Teleconsultation Intent Cohort';
      highIntentUsers = [
        'Active Doctor Appointment Seekers',
        'Diagnostic Lab Test Bookers',
        'Prescription Re-orderers & Patients',
      ];
      behavioralInsights = [
        `High conversion spike for ${appName} following in-app doctor availability & instant OPD slot confirmation.`,
        `Peak serving window is 19:00 - 23:00 IST when users schedule evening teleconsultations.`,
        `Strong affinity for Samsung Knox & Xiaomi HyperOS direct hardware pre-installs.`,
        `Low early churn risk (11%) due to recurring prescription needs and digital medical record storage.`,
      ];
      interestCategories = ['Healthcare', 'Medical Diagnostics', 'Wellness & Fitness', 'E-Pharmacy'];
      publisherAppsList = [
        { category: 'Pharmacy & Labs', share: 38, apps: ['Tata 1mg', 'PharmEasy', 'Netmeds'] },
        { category: 'Fitness & Wellness', share: 32, apps: ['HealthifyMe', 'Cult.fit', 'Fitify'] },
        { category: 'Healthcare Consult', share: 30, apps: ['Apollo 24|7', 'DocOnline', 'Practo Partner'] },
      ];
      bestEvent = 'Doctor_Consultation_Booked';
      highestJourney = 'Ad Click -> App Launch -> Doctor Search -> Appointment Confirmed';
      estCPM = '$3.40';
      estCPC = '$0.18';
      estCPI = '$0.85';
      estCPA = '$2.40';
      estCTR = '4.4%';
      estCVR = '18.4%';
      healthAffinity = 'High Affinity (94%)';
      financeAffinity = 'Medium Affinity (36%)';
      gamingAffinity = 'Low Affinity (28%)';
      shoppingAffinity = 'Medium Affinity (54%)';
    } else if (isFinance) {
      profileName = 'Financial Services & Credit Intent Cohort';
      highIntentUsers = [
        'Active UPI & Wallet Transactors',
        'Instant Personal Loan Seekers',
        'Credit Score & Financial Monitors',
      ];
      behavioralInsights = [
        `High conversion rate for ${appName} during salary week (1st - 7th of every month).`,
        `Strong affinity for 2-step UPI registration and automated KYC onboarding.`,
        `Zero-latency identity passkey resolution prevents drop-off at payment verification.`,
        `Low fraud exposure (0.6%) verified across OEM Knox hardware tokens.`,
      ];
      interestCategories = ['Personal Finance', 'UPI Payments', 'Investments', 'Credit Cards'];
      publisherAppsList = [
        { category: 'Mobile Payments', share: 42, apps: ['Paytm App', 'PhonePe', 'Google Pay'] },
        { category: 'Credit & Insurance', share: 34, apps: ['CRED', 'PolicyBazaar', 'Bajaj Markets'] },
        { category: 'Investments', share: 24, apps: ['Groww', 'Zerodha Kite', 'Moneycontrol'] },
      ];
      bestEvent = 'Account_KYC_Verified';
      highestJourney = 'Ad Click -> Phone Auth -> KYC Complete -> First Transaction';
      estCPM = '$3.80';
      estCPC = '$0.22';
      estCPI = '$1.10';
      estCPA = '$3.20';
      estCTR = '3.8%';
      estCVR = '16.2%';
      healthAffinity = 'Low Affinity (24%)';
      financeAffinity = 'High Affinity (92%)';
      gamingAffinity = 'Low Affinity (22%)';
      shoppingAffinity = 'High Affinity (78%)';
    } else if (isGaming) {
      profileName = 'Interactive Gaming & Media Cohort';
      highIntentUsers = [
        'Casual Daily Gamers',
        'In-App Currency Purchasers',
        'Rewarded Video Viewers',
      ];
      behavioralInsights = [
        `Exceptional completion rate (94%) on 30s Rewarded Video placements inside ${appName}.`,
        `Peak engagement on Friday & Saturday evenings between 20:00 - 23:30.`,
        `High propensity to convert on playable interactive ad previews.`,
      ];
      interestCategories = ['Mobile Gaming', 'Esports', 'Social Gaming', 'Digital Media'];
      publisherAppsList = [
        { category: 'Casual Gaming', share: 45, apps: ['Subway Surfers', 'Ludo King', 'Candy Crush'] },
        { category: 'Hardcore & Battle Royale', share: 35, apps: ['Battlegrounds Mobile India', 'Call of Duty'] },
        { category: 'Social & Media', share: 20, apps: ['ShareChat', 'MX Player', 'Dailyhunt'] },
      ];
      bestEvent = 'Level_10_Reached';
      highestJourney = 'Ad Click -> Store Install -> Onboarding -> Level 1 Completed';
      estCPM = '$2.40';
      estCPC = '$0.08';
      estCPI = '$0.45';
      estCPA = '$1.20';
      estCTR = '5.4%';
      estCVR = '22.8%';
      healthAffinity = 'Low Affinity (18%)';
      financeAffinity = 'Low Affinity (28%)';
      gamingAffinity = 'High Affinity (90%)';
      shoppingAffinity = 'Medium Affinity (48%)';
    } else if (isCommerce) {
      profileName = 'Quick Commerce & High Intent Shoppers';
      highIntentUsers = [
        'Daily Quick-Commerce Buyers',
        'Deal & Coupon Seekers',
        'High Cart Value Shoppers',
      ];
      behavioralInsights = [
        `High conversion density for ${appName} between 11:00 - 14:00 & 19:00 - 22:00.`,
        `High retention on 10-minute quick commerce delivery triggers.`,
      ];
      interestCategories = ['E-Commerce', 'Grocery Delivery', 'Food & Dining', 'Shopping'];
      publisherAppsList = [
        { category: 'Commerce & Food', share: 48, apps: ['Blinkit', 'Zomato', 'Swiggy', 'Flipkart'] },
        { category: 'Utility & Local', share: 32, apps: ['Truecaller', 'Dailyhunt', 'ShareChat'] },
        { category: 'Media', share: 20, apps: ['MX Player', 'YouTube'] },
      ];
      bestEvent = 'First_Order_Placed';
      highestJourney = 'Ad Click -> App Open -> Cart Add -> Order Confirmed';
      estCPM = '$2.90';
      estCPC = '$0.14';
      estCPI = '$0.75';
      estCPA = '$1.90';
      estCTR = '4.8%';
      estCVR = '21.4%';
      healthAffinity = 'Medium Affinity (38%)';
      financeAffinity = 'High Affinity (74%)';
      gamingAffinity = 'Low Affinity (24%)';
      shoppingAffinity = 'High Affinity (92%)';
    } else {
      profileName = `${category} Intent Cohort`;
      highIntentUsers = [
        `Active Daily ${category} Users`,
        'Power Feature Seekers',
        'Mobile Digital Service Adopters',
      ];
      behavioralInsights = [
        `High D1 retention (48%) observed for ${appName} via OEM pre-install channels.`,
        `Peak serving window is ${activeHours} with high user session duration.`,
      ];
      interestCategories = [category, 'Mobile Services', 'Digital Utility', 'Apps'];
      publisherAppsList = [
        { category: 'Utility & Media', share: 45, apps: ['Truecaller', 'MX Player', 'Dailyhunt'] },
        { category: 'Social & Content', share: 35, apps: ['ShareChat', 'InShorts', 'Moj'] },
        { category: 'Commerce', share: 20, apps: ['Flipkart', 'Meesho'] },
      ];
      bestEvent = 'Account_Registered';
      highestJourney = 'Ad Click -> Store Download -> Onboarding Completed';
    }

    const regionalDemand = isIndia
      ? [
          { region: 'Maharashtra (Mumbai, Pune)', share: 28, cpm: '$2.80', cpa: '$1.20' },
          { region: 'Karnataka (Bengaluru)', share: 24, cpm: '$3.10', cpa: '$1.45' },
          { region: 'Delhi NCR (Delhi, Gurgaon, Noida)', share: 22, cpm: '$2.90', cpa: '$1.30' },
          { region: 'Tamil Nadu (Chennai, Coimbatore)', share: 14, cpm: '$2.40', cpa: '$1.10' },
          { region: 'Telangana (Hyderabad)', share: 12, cpm: '$2.60', cpa: '$1.15' },
        ]
      : [
          { region: 'California (Los Angeles, SF)', share: 34, cpm: '$14.80', cpa: '$8.50' },
          { region: 'New York (NYC, Albany)', share: 26, cpm: '$12.40', cpa: '$7.20' },
          { region: 'Texas (Austin, Houston)', share: 18, cpm: '$10.50', cpa: '$6.10' },
          { region: 'Florida (Miami, Orlando)', share: 12, cpm: '$9.80', cpa: '$5.60' },
          { region: 'Illinois (Chicago)', share: 10, cpm: '$9.20', cpa: '$5.20' },
        ];

    return {
      metadata: {
        scannedApp: appName,
        platform,
        scanTimestamp: new Date().toISOString(),
        isMockedData: true,
        icon: input.metadata.icon,
        installs: input.metadata.installs || '10,000,000+',
        category,
        rating: input.metadata.rating || 4.5,
        developer: input.metadata.developer,
        storeUrl: input.metadata.storeUrl,
      },
      overview: {
        primaryMarket,
        uaMaturity: 'High Velocity Scale',
        marketCompetition: 'High Opportunity',
        campaignReadinessScore: 88,
        audienceScore: 92,
        publisherMatchScore: 86,
        monetizationModel: {
          subscription: true,
          freemium: true,
          ads: true,
          paid: false,
        },
      },
      competitiveIntelligence: {
        similarApps: publisherAppsList.flatMap(p => p.apps).slice(0, 3),
        categoryLeaders: publisherAppsList.flatMap(p => p.apps).slice(0, 2),
        audienceOverlap: '78% Category Overlap',
        uaDifficulty: 'Medium-High',
        marketSaturation: 'Moderate (High Growth)',
        growthMomentum: '+24.2% QoQ',
        shareOfSearch: '34.5%',
        topCompetitorPositioning: 'Freemium Scale vs Direct Subscriptions',
      },
      mediaPlanningIntelligence: {
        audiencePriority: `${profileName} & High LTV Power Users`,
        deviceSegment: 'Tier 1 Specs (6GB+ RAM, 5G)',
        inventoryMix: '40% SDK Rewarded + 35% OEM Direct + 25% Programmatic DSP',
        campaignStructure: '3-Tiered Learning & Scaling Structure',
        scalingStrategy: 'Aggressive eCPM Floor Scaling on Rewarded Video',
        learningBudget: '15% Test Allocation',
        testingStrategy: 'A/B Test 15s Native Video vs Playable Interactive',
        recommendedFrequency: '2-3 Imps per user per day',
        audienceExpansionStrategy: '3% Lookalike Expansion on Day 1 Retention',
        exclusionStrategy: 'Exclude Existing Active Users & Fraud IP Blocklists',
      },
      campaignTimeline: [
        { week: 'Week 1', phase: 'Learning Phase', details: `Establish baseline eCPM for ${appName} and test SDK Rewarded Video inventory.` },
        { week: 'Week 2', phase: 'Optimization', details: 'Shift 35% budget to OEM direct pre-installs; prune low-CVR sub-publishers.' },
        { week: 'Week 3-4', phase: 'Scale Phase', details: 'Expand Lookalike targeting and increase daily DSP bid caps.' },
      ],
      historicalCampaignIntel: {
        successRate: '86.4%',
        learningConfidence: 'High (0.95)',
        volumeIndex: '84K / day',
        stability: 'Stable (CV < 0.10)',
        avgScalingTime: '3.8 Days',
        topUAStrategy: 'Lookalike 3% + Programmatic OpenRTB Exchanges',
        bestOptimizationEvent: bestEvent,
        bestConversionWindow: 'Day 0 to Day 1',
        highestUserJourney: highestJourney,
        saturationRisk: 'Low',
        learningMaturity: 'Phase 3 (Optimized)',
        recommendedBudgetTier: '$10,000 - $30,000 / day',
        learningCoverage: '96%',
        repeatability: 'High',
      },
      audienceIntel: {
        profileName,
        highIntentUsers,
        behavioralInsights,
        interestCategories,
        devicePreferences: ['Android 13/14', 'Flagship & Mid-tier Devices', 'High Memory Specs'],
        trafficOpportunities: ['OEM Placements', 'SDK Networks', 'DSP Video Interstitials'],
        demographics: {
          age: '18 - 44 years (81%)',
          gender: '58% Male / 42% Female',
          occupation: 'Professionals & Tech-savvy Users',
          education: 'Undergraduate / Graduate',
          income: 'Medium to High',
          relationshipStatus: 'Single & Young Married',
          locationSplit: isIndia
            ? [
                { label: 'Maharashtra (Mumbai, Pune)', percentage: 28 },
                { label: 'Karnataka (Bengaluru)', percentage: 24 },
                { label: 'Delhi NCR', percentage: 22 },
                { label: 'Tamil Nadu', percentage: 14 },
                { label: 'Telangana', percentage: 12 },
              ]
            : [
                { label: 'United States', percentage: 48 },
                { label: 'United Kingdom', percentage: 24 },
                { label: 'Germany', percentage: 18 },
                { label: 'Canada', percentage: 10 },
              ],
          genderSplit: { male: 58, female: 42 },
        },
        deviceSpecs: {
          deviceTier: 'High-End Smartphone (6GB+ RAM)',
          os: platform === 'android' ? 'Android 13 / 14' : 'iOS 16 / 17',
          preferredLanguage: isIndia ? 'English / Hindi / Regional' : 'English',
          carrier,
          networkQuality: 'Optimal (Low Latency)',
          networkDistribution: [
            { type: '5G', percentage: 65 },
            { type: '4G/LTE', percentage: 30 },
            { type: 'Wi-Fi', percentage: 5 },
          ],
        },
        verticalBehaviors: {
          travel: 'Low Affinity (24%)',
          finance: financeAffinity,
          shopping: shoppingAffinity,
          gaming: gamingAffinity,
          ott: 'Medium Affinity (62%)',
          music: 'Medium Affinity (54%)',
          reading: 'Low Affinity (18%)',
          health: healthAffinity,
          foodDelivery: 'Medium Affinity (58%)',
          rideSharing: 'High Affinity (72%)',
          investment: 'Medium Affinity (44%)',
          crypto: 'Low Affinity (12%)',
          insurance: 'Medium Affinity (38%)',
          loan: 'Medium Affinity (42%)',
          credit: 'Medium Affinity (46%)',
          digitalWallet: 'High Affinity (84%)',
          payment: 'High Affinity (88%)',
        },
        engagementPatterns: {
          avgSessionLength: '6m 45s',
          dailyActivePattern: `Peak ${activeHours}`,
          weeklyActivePattern: 'Wednesday - Sunday High',
          mostActiveHours: activeHours,
          mostActiveDays: 'Friday - Sunday',
          intentDistribution: 'High Conversion Intent',
        },
      },
      publisherIntelligence: publisherAppsList,
      geoIntelligence: {
        topCities: isIndia ? ['Mumbai', 'Bengaluru', 'Delhi NCR', 'Chennai', 'Hyderabad'] : ['New York', 'Los Angeles', 'Chicago', 'San Francisco', 'Austin'],
        peakHours: activeHours,
        festivalPeriods: isIndia ? ['Diwali / Festive Phase', 'Q4 Holiday Push'] : ['Black Friday', 'Cyber Monday'],
        shoppingSeasons: ['Festive Season Push', 'New Year Campaign Scaling'],
        financialBehaviour: 'High Subscription & Service Conversion Intent',
        networkSpeed: '5G / High-Bandwidth Wi-Fi',
        osDistribution: platform === 'android' ? '82% Android / 18% iOS' : '22% Android / 78% iOS',
        devicePriceSegment: 'Mid to High Tier ($300+)',
        regionalDemand,
      },
      inventoryIntelligence: [
        {
          format: 'Contextual Native Banner',
          engagement: 'High (92% CTR)',
          cvr: estCVR,
          avgSessionCompletion: '94%',
          idealAudience: `${profileName}`,
          reach: 'Global (8M+ Daily Imps)',
          cpm: estCPM,
          frequency: '2-3 per user per day',
          midFunnelEngagement: 'Very High',
          trust: 'Verified 99%',
          qualityUsers: 'High Intent',
          retention: 'D1 54% / D7 32%',
        },
        {
          format: 'Rewarded Interstitial',
          engagement: 'High (88% Completion)',
          cvr: '14.2%',
          avgSessionCompletion: '92%',
          idealAudience: 'Active Engaged Cohorts',
          reach: '5M+ Daily Imps',
          cpm: '$2.90',
          frequency: '3-4 per day',
          midFunnelEngagement: 'High',
          trust: 'Verified 98%',
          qualityUsers: 'High Intent',
          retention: 'D1 48% / D7 28%',
        },
        {
          format: 'PMP Private Marketplace Deal',
          engagement: 'Maximum (Zero-Latency)',
          cvr: '22.4%',
          avgSessionCompletion: '98%',
          idealAudience: 'High-Intent Premium Users',
          reach: '3M+ Daily Imps',
          cpm: '$4.10',
          frequency: '1-2 per day',
          midFunnelEngagement: 'Maximum',
          trust: 'Direct Publisher Placement',
          qualityUsers: 'High Lifetime Value',
          retention: 'D1 62% / D7 38%',
        },
      ],
      audienceQualityIndicators: {
        returningUserPct: '48%',
        repeatPurchaserPct: '32%',
        highValueUserPct: '38%',
        organicAffinity: '86%',
        paidAffinity: '68%',
        referralAffinity: '52%',
        offerSensitivity: 'Medium',
        discountAffinity: 'Medium-High',
        subscriptionAffinity: '82%',
        loyaltyProbability: '88%',
        earlyChurnRisk: 'Low (11%)',
        longTermRetentionProb: '82%',
      },
      historicalConversionLearnings: {
        conversionWindowPct: {
          d0: '48%',
          d1: '26%',
          d3: '14%',
          d7: '8%',
          d14: '4%',
        },
        bestOnboardingFunnel: 'Direct One-Tap Auth -> Instant Onboarding',
        dropOffStage: 'Permission Confirmation Screen',
        mostCommonAbandonmentPoint: 'Secondary Profile Verification',
        bestPerformingRegistrationFlow: 'One-Click Phone / Google Auth',
        bestPaymentMethod: isIndia ? 'UPI / Credit Card / NetBanking' : 'Apple Pay / Google Pay / Card',
        bestKYCJourney: 'Instant Automated Verification',
        avgConversionDelay: '12 minutes from first install',
      },
      historicalDspOffers: [
        { offerId: 'DSP-01', appName: 'AppLovin MAX', spent: '$18,600', installs: '22.1K', avgCPI: estCPI, roas: '310%', status: 'Active' },
        { offerId: 'DSP-02', appName: 'Google DV360', spent: '$24,200', installs: '28.4K', avgCPI: estCPI, roas: '295%', status: 'Active' },
        { offerId: 'DSP-03', appName: 'Unity Exchange', spent: '$12,800', installs: '14.8K', avgCPI: estCPI, roas: '280%', status: 'Scaling' },
      ],
      databaseCohortOverlap: [
        { cohortName: `${profileName}`, size: '1.4M', overlapPercentage: 84, dspMatchRate: '94%' },
        { cohortName: `${category} Power Users`, size: '920K', overlapPercentage: 72, dspMatchRate: '89%' },
        { cohortName: 'High LTV Mobile Subscribers', size: '650K', overlapPercentage: 58, dspMatchRate: '86%' },
      ],
      whyWeRecommendThis: [
        {
          recommendation: `Scale ${category} Rewarded & PMP Direct Mix`,
          points: [
            `High retention engagement profile for ${appName} matches PMP private marketplace clearing curves.`,
            `DSP bid floors in target regional geos show strong win-rates at ${estCPM} eCPM range.`,
          ],
        },
        {
          recommendation: `Optimize ${bestEvent} Conversion Funnel`,
          points: [
            `User journey telemetry confirms 48% of conversions occur on Day 0 within 12 minutes of install.`,
          ],
        },
      ],
      sspDistributions: [
        { ssp: 'AppLovin MAX', winRate: 84, trafficShare: 35, clearingCpm: '$2.80' },
        { ssp: 'Google DV360', winRate: 78, trafficShare: 28, clearingCpm: '$3.40' },
        { ssp: 'Unity Exchange', winRate: 82, trafficShare: 20, clearingCpm: '$2.25' },
        { ssp: 'Mintegral', winRate: 88, trafficShare: 12, clearingCpm: '$1.75' },
        { ssp: 'Liftoff / Vungle', winRate: 80, trafficShare: 5, clearingCpm: '$2.45' },
      ],
      retentionCohorts: [
        { day: 'Day 1', retention: 54, ltv: 1.45 },
        { day: 'Day 3', retention: 42, ltv: 2.60 },
        { day: 'Day 7', retention: 32, ltv: 3.90 },
        { day: 'Day 14', retention: 26, ltv: 5.40 },
        { day: 'Day 30', retention: 21, ltv: 7.80 },
      ],
      fraudAuditMatrix: [
        { channel: 'PMP Private Marketplace', cpi: estCPI, fraud: '0.1%', cvr: estCVR, volume: '48K', recommendation: 'High Efficiency Scale' },
        { channel: 'SDK Rewarded Video', cpi: '$0.95', fraud: '1.1%', cvr: '14.2%', volume: '35K', recommendation: 'Safe to Scale' },
        { channel: 'Programmatic RTB', cpi: '$1.20', fraud: '2.1%', cvr: '11.8%', volume: '22K', recommendation: 'Monitor IP Blocklists' },
        { channel: 'Native In-Feed', cpi: '$1.05', fraud: '0.8%', cvr: '13.5%', volume: '18K', recommendation: 'Expand Inventory' },
      ],
      funnelMetrics: [
        { label: 'Ad Impressions', value: '1,000,000', conversion: '100%', percentage: 100 },
        { label: 'Ad Clicks', value: '44,000', conversion: '4.4%', percentage: 4.4 },
        { label: 'App Installs', value: '8,096', conversion: '18.4%', percentage: 0.81 },
        { label: `${bestEvent.replace(/_/g, ' ')}`, value: '3,886', conversion: '48%', percentage: 0.39 },
        { label: 'Active Retention D7', value: '2,590', conversion: '32%', percentage: 0.26 },
      ],
      programmaticAllocation: {
        budgetAllocation: [
          { channel: 'PMP Private Marketplace', allocation: 40, rationale: 'Direct publisher deal IDs with highest D1 retention.' },
          { channel: 'SDK Rewarded Networks', allocation: 35, rationale: 'High conversion velocity & high engagement video formats.' },
          { channel: 'Programmatic RTB DSP', allocation: 25, rationale: 'Broad audience reach with strict fraud filtering.' },
        ],
        recommendedInventoryCategories: publisherAppsList.map(p => p.category),
        optimizationStrategy: [
          `Shift media buying allocation towards OEM Knox Direct pre-installs during peak hours (${activeHours})`,
          `Enforce strict fraud IP blocklists on programmatic RTB channels`,
        ],
      },
      campaignIntelligenceSummary: `Target app ${appName} (${category}) exhibits high market readiness score of 88/100. Behavioral signals confirm strong retention affinity in ${primaryMarket} regions. Recommended media buying strategy prioritizes PMP Private Marketplace combined with SDK Rewarded Video to achieve target CPI of ${estCPI} with zero fraud exposure.`,
      siteIdAudit: {
        approved: [
          { siteId: `SITE-${catLower.slice(0, 3).toUpperCase()}-9941`, publisherName: publisherAppsList[0]?.apps[0] || 'Premium Publisher A', cvr: estCVR, cpm: estCPM, status: 'APPROVED' },
          { siteId: `SITE-${catLower.slice(0, 3).toUpperCase()}-8812`, publisherName: publisherAppsList[0]?.apps[1] || 'Premium Publisher B', cvr: '16.8%', cpm: '$2.90', status: 'APPROVED' },
          { siteId: `SITE-${catLower.slice(0, 3).toUpperCase()}-7723`, publisherName: publisherAppsList[1]?.apps[0] || 'Media Network C', cvr: '14.5%', cpm: '$2.40', status: 'APPROVED' },
        ],
        blacklisted: [
          { siteId: 'SITE-BOT-4410', publisherName: 'Unverified Traffic Network X', reason: 'High Click Spam & Bot Fraud (98.4%)', fraudRate: '98.4%', status: 'BLACKLISTED' },
          { siteId: 'SITE-DEV-1092', publisherName: 'Low Quality Sub-Publisher Y', reason: 'Abnormally High Abandonment (Zero D1 Retention)', fraudRate: '84.2%', status: 'BLACKLISTED' },
        ],
      },
      adCreativePreview: {
        appName: appName.split(':')[0],
        headline: isHealth ? 'Consult Top Doctors Instantly' : isFinance ? 'Get Up To $500 Cash Advance' : isGaming ? 'Play & Claim Free Bonus' : isCommerce ? '10-Minute Instant Delivery' : `Get Started with ${appName.split(':')[0]}`,
        subtext: isHealth ? `Book OPD appointments & lab tests in under 60 seconds on ${appName.split(':')[0]}.` : isFinance ? `No credit check required. Fast instant transfer to your account with ${appName.split(':')[0]}.` : isGaming ? `Join over 10M players online. Download ${appName.split(':')[0]} now!` : isCommerce ? `Order fresh groceries & essentials delivered to your door.` : `Download top-rated ${category} app today.`,
        cta: isHealth ? 'Book OPD Consult' : isFinance ? 'Get Cash Now' : isGaming ? 'Play Free Now' : isCommerce ? 'Order Now' : 'Get App Now',
        placementPerformance: [
          { placement: 'Full Screen Interstitial Ad', cvr: estCVR, ctr: estCTR, recommendation: 'Top Converting Placement (Recommended)' },
          { placement: 'In-App Banner Ad (Bottom Dock)', cvr: '14.8%', ctr: '3.2%', recommendation: 'High Impression Reach & Continuous Engagement' },
          { placement: 'Native Contextual In-Feed Card', cvr: '12.4%', ctr: '2.8%', recommendation: 'Optimal for Brand Intent & High LTV' },
        ],
      },
      kpiProjections: {
        estimatedCPM: estCPM,
        estimatedCPC: estCPC,
        estimatedCPI: estCPI,
        estimatedCPA: estCPA,
        estimatedCTR: estCTR,
        estimatedCVR: estCVR,
        estimatedROAS: '310%',
      },
    };
  }
}

// ---------------------------------------------------------------------------
// Seed data – AdsIdol Enterprise DMP Dashboard Data
// ---------------------------------------------------------------------------

const avatar = (id: number) => `/avatars/${id}.jpg`

// ── Contacts (Identity Partners & Dispatches) ──────────────────────────────
export const contacts = [
  { id: "1", name: "AppsFlyer SDK Sync", avatar: avatar(1) },
  { id: "2", name: "Samsung Knox Direct", avatar: avatar(3) },
  { id: "3", name: "Adjust Attribution Link", avatar: avatar(5) },
  { id: "4", name: "Singular Analytics Stream", avatar: avatar(8) },
  { id: "5", name: "Branch Deep Link Engine", avatar: avatar(9) },
  { id: "6", name: "Google AdMob DSP", avatar: avatar(11) },
  { id: "7", name: "AppLovin Exchange", avatar: avatar(16) },
  { id: "8", name: "Unity Ads Network", avatar: avatar(12) },
]

// ── Account Cards (Identity Clusters) ──────────────────────────────────────
export type AccountCard = {
  id: string
  label: string
  balance: string
  currency: string
  variant: "default" | "dark" | "primary"
}

export const accountCards: AccountCard[] = [
  {
    id: "1",
    label: "Unified Identity Graph",
    balance: "85,420,000",
    currency: "PROFILES ",
    variant: "default",
  },
  {
    id: "2",
    label: "OEM On-Device Pool",
    balance: "28,400,000",
    currency: "DEVICES ",
    variant: "dark",
  },
  {
    id: "3",
    label: "DSP Auction Engine",
    balance: "14,820",
    currency: "REQ/S ",
    variant: "primary",
  },
]

// ── Wallet Balance (Unified Profiles Metric) ───────────────────────────────
export const walletBalance = {
  amount: 85420000,
  changePercent: 12.4,
  changeDirection: "up" as const,
}

// ── Daily Signal Processing Quota ──────────────────────────────────────────
export const spendingLimit = {
  budget: 3000000,
  spent: 2180000,
  remaining: 820000,
  currency: "SIGNALS",
  periodStart: "Apr 01",
  periodEnd: "Apr 30",
}

// ── Financial Overview (Monthly Impression Yield Chart) ─────────────────────
export const financialOverview = [
  { month: "Jan", currentYear: 482000, lastYear: 421000 },
  { month: "Feb", currentYear: 518000, lastYear: 453000 },
  { month: "Mar", currentYear: 535730, lastYear: 489000 },
  { month: "Apr", currentYear: 1240000, lastYear: 524000 },
  { month: "May", currentYear: 984000, lastYear: 612000 },
  { month: "Jun", currentYear: 1056000, lastYear: 728000 },
  { month: "Jul", currentYear: 1123000, lastYear: 785000 },
  { month: "Aug", currentYear: 1089000, lastYear: 821000 },
  { month: "Sep", currentYear: 1152000, lastYear: 854000 },
  { month: "Oct", currentYear: 1098000, lastYear: 889000 },
  { month: "Nov", currentYear: 1185000, lastYear: 923000 },
  { month: "Dec", currentYear: 1240000, lastYear: 985000 },
]

// ── Signal Movement (Ingested vs Fraud Filtered) ───────────────────────────
export const moneyMovement7d = [
  { label: "Sun", moneyIn: 2400000, moneyOut: 18000 },
  { label: "Mon", moneyIn: 3200000, moneyOut: 21000 },
  { label: "Tue", moneyIn: 2800000, moneyOut: 16000 },
  { label: "Wed", moneyIn: 4100000, moneyOut: 31200 },
  { label: "Thu", moneyIn: 3600000, moneyOut: 24000 },
  { label: "Fri", moneyIn: 4250000, moneyOut: 31200 },
  { label: "Sat", moneyIn: 1900000, moneyOut: 12000 },
]

export const moneyMovement30d = [
  { label: "Week 1", moneyIn: 12400000, moneyOut: 89000 },
  { label: "Week 2", moneyIn: 15800000, moneyOut: 112000 },
  { label: "Week 3", moneyIn: 9600000, moneyOut: 74000 },
  { label: "Week 4", moneyIn: 18200000, moneyOut: 135000 },
]

export const moneyMovement90d = [
  { label: "Jan", moneyIn: 42500000, moneyOut: 312000 },
  { label: "Feb", moneyIn: 38900000, moneyOut: 298000 },
  { label: "Mar", moneyIn: 51200000, moneyOut: 374000 },
  { label: "Apr", moneyIn: 46800000, moneyOut: 341000 },
  { label: "May", moneyIn: 55300000, moneyOut: 412000 },
  { label: "Jun", moneyIn: 48700000, moneyOut: 358000 },
  { label: "Jul", moneyIn: 52100000, moneyOut: 389000 },
  { label: "Aug", moneyIn: 44600000, moneyOut: 332000 },
  { label: "Sep", moneyIn: 49800000, moneyOut: 365000 },
  { label: "Oct", moneyIn: 53400000, moneyOut: 391000 },
  { label: "Nov", moneyIn: 47200000, moneyOut: 348000 },
  { label: "Dec", moneyIn: 56000000, moneyOut: 410000 },
]

export const moneyMovementByPeriod = {
  "7d": moneyMovement7d,
  "30d": moneyMovement30d,
  "90d": moneyMovement90d,
} as const

export const logo = (domain: string) => `/logos/${domain.replace(/\./g, "-")}.png`

// ── Recent Signal Logs ─────────────────────────────────────────────────────
export type Transaction = {
  id: string
  merchant: string
  transactionId: string
  amount: number
  date: string
  logo: string
  category: string
}

export const recentTransactions: Transaction[] = [
  {
    id: "1",
    merchant: "AppsFlyer Attribution Ingest",
    transactionId: "SIG_920076",
    amount: 14250,
    date: "Just now",
    logo: logo("appsflyer.com"),
    category: "SDK Sync",
  },
  {
    id: "2",
    merchant: "Samsung Knox Passkey Resolution",
    transactionId: "SIG_918263",
    amount: 8840,
    date: "1m ago",
    logo: logo("samsung.com"),
    category: "Identity Resolution",
  },
  {
    id: "3",
    merchant: "Adjust SDK Attribution Event",
    transactionId: "SIG_847291",
    amount: 42500,
    date: "3m ago",
    logo: logo("adjust.com"),
    category: "Attribution",
  },
  {
    id: "4",
    merchant: "AppLovin DSP Bidder Clearing",
    transactionId: "SIG_773920",
    amount: -1500,
    date: "5m ago",
    logo: logo("applovin.com"),
    category: "DSP Auction",
  },
  {
    id: "5",
    merchant: "Click Spam Fraud Filtered",
    transactionId: "SIG_920077",
    amount: -200,
    date: "8m ago",
    logo: logo("fraudshield.com"),
    category: "Fraud Blocked",
  },
  {
    id: "6",
    merchant: "Google AdMob Exchange Auction",
    transactionId: "SIG_661204",
    amount: 12000,
    date: "12m ago",
    logo: logo("google.com"),
    category: "DSP Auction",
  },
  {
    id: "7",
    merchant: "Xiaomi HyperOS Pre-Install Cluster",
    transactionId: "SIG_559831",
    amount: 85000,
    date: "15m ago",
    logo: logo("xiaomi.com"),
    category: "OEM On-Device",
  },
]

export type FullTransaction = {
  id: string
  merchant: string
  transactionId: string
  amount: number
  date: string
  logo: string
  category: string
  status: "completed" | "pending" | "failed"
  type: "expense" | "income"
  notes?: string
  merchantInfo?: string
  cardLast4?: string
}

export const fullTransactions: FullTransaction[] = [
  { id: "t1", merchant: "AppsFlyer Attribution Ingest", transactionId: "SIG_920076", amount: 14250, date: "Just now", logo: logo("appsflyer.com"), category: "SDK Sync", status: "completed", type: "income", merchantInfo: "AppsFlyer SDK Stream, Global", cardLast4: "4589" },
  { id: "t2", merchant: "Samsung Knox Passkey Resolution", transactionId: "SIG_918263", amount: 8840, date: "1m ago", logo: logo("samsung.com"), category: "Identity Resolution", status: "completed", type: "income", merchantInfo: "Samsung Knox On-Device Engine", cardLast4: "4589" },
  { id: "t3", merchant: "Adjust SDK Attribution Event", transactionId: "SIG_847291", amount: 42500, date: "3m ago", logo: logo("adjust.com"), category: "Attribution", status: "completed", type: "income", merchantInfo: "Adjust Attribution Cloud" },
  { id: "t4", merchant: "AppLovin DSP Bidder Clearing", transactionId: "SIG_773920", amount: -1500, date: "5m ago", logo: logo("applovin.com"), category: "DSP Auction", status: "completed", type: "expense", merchantInfo: "AppLovin RTB Exchange", cardLast4: "7321" },
  { id: "t5", merchant: "Click Spam Fraud Filtered", transactionId: "SIG_920077", amount: -200, date: "8m ago", logo: logo("fraudshield.com"), category: "Fraud Blocked", status: "completed", type: "expense", merchantInfo: "AdsIdol Anti-Fraud Engine", cardLast4: "4589" },
  { id: "t6", merchant: "Google AdMob Exchange Auction", transactionId: "SIG_661204", amount: 12000, date: "12m ago", logo: logo("google.com"), category: "DSP Auction", status: "completed", type: "income", merchantInfo: "Google AdMob SSP", cardLast4: "4589" },
  { id: "t7", merchant: "Xiaomi HyperOS Pre-Install Cluster", transactionId: "SIG_559831", amount: 85000, date: "15m ago", logo: logo("xiaomi.com"), category: "OEM On-Device", status: "completed", type: "income", merchantInfo: "Xiaomi Hardware Gateway" },
  { id: "t8", merchant: "Unity Ads Rewarded SDK", transactionId: "SIG_882341", amount: 24500, date: "18m ago", logo: logo("unity.com"), category: "DSP Auction", status: "completed", type: "income", merchantInfo: "Unity Ads Engine", cardLast4: "9012" },
  { id: "t9", merchant: "Branch Deep Link Sync", transactionId: "SIG_773001", amount: 15900, date: "22m ago", logo: logo("branch.io"), category: "SDK Sync", status: "completed", type: "income", merchantInfo: "Branch Metrics", cardLast4: "4589" },
  { id: "t10", merchant: "Singular Unified Pipeline", transactionId: "SIG_990123", amount: 89900, date: "30m ago", logo: logo("singular.net"), category: "Attribution", status: "completed", type: "income", merchantInfo: "Singular Analytics Engine", cardLast4: "4589" },
]

// ── OEM Device Passkey Cards ───────────────────────────────────────────────
export type CardData = {
  id: string
  name: string
  type: "physical" | "virtual" | "hardware"
  last4: string
  cardNumber: string
  holder: string
  expiry: string
  cvv: string
  network: "visa" | "mastercard" | "knox" | "hyperos" | "oem"
  frozen: boolean
  dailyLimit: number
  monthlySpend: number
  monthlyLimit: number
  color: string
}

export const cardsData: CardData[] = [
  {
    id: "c1",
    name: "AppLovin MAX OpenRTB Key",
    type: "hardware" as any,
    last4: "4589",
    cardNumber: "DSP-APL-8492-4589",
    holder: "AppLovin MAX RTB Exchange",
    expiry: "AES-256 HMAC",
    cvv: "1.2ms Sub-2ms",
    network: "knox" as any,
    frozen: false,
    dailyLimit: 25000,
    monthlySpend: 18400,
    monthlyLimit: 35000,
    color: "bg-primary text-primary-foreground",
  },
  {
    id: "c2",
    name: "Xiaomi HyperOS Token",
    type: "physical",
    last4: "7321",
    cardNumber: "**** **** **** 7321",
    holder: "ADSIDOL ENTERPRISE",
    expiry: "03/27",
    cvv: "892",
    network: "mastercard",
    frozen: false,
    dailyLimit: 300000,
    monthlySpend: 89000,
    monthlyLimit: 800000,
    color: "bg-secondary text-secondary-foreground",
  },
  {
    id: "c3",
    name: "OnePlus Oxygen Token",
    type: "virtual",
    last4: "9012",
    cardNumber: "**** **** **** 9012",
    holder: "ADSIDOL ENTERPRISE",
    expiry: "12/26",
    cvv: "445",
    network: "visa",
    frozen: false,
    dailyLimit: 100000,
    monthlySpend: 45600,
    monthlyLimit: 300000,
    color: "bg-muted text-foreground",
  },
  {
    id: "c4",
    name: "Realme UI Passkey",
    type: "physical",
    last4: "3456",
    cardNumber: "**** **** **** 3456",
    holder: "ADSIDOL ENTERPRISE",
    expiry: "06/29",
    cvv: "661",
    network: "mastercard",
    frozen: true,
    dailyLimit: 1000000,
    monthlySpend: 0,
    monthlyLimit: 2500000,
    color: "bg-card text-card-foreground ring-1 ring-border",
  },
]

// ── Spending Heatmap (Audience Signal Density) ──────────────────────────────
export type SpendingHeatmapDay = { date: string; amount: number }

function generateHeatmap(): SpendingHeatmapDay[] {
  const data: SpendingHeatmapDay[] = []
  const start = new Date(2025, 3, 14)
  for (let i = 0; i < 365; i++) {
    const d = new Date(start)
    d.setDate(d.getDate() + i)
    const dayOfWeek = d.getDay()
    const base = dayOfWeek === 0 || dayOfWeek === 6 ? 40 : 120
    const noise = Math.sin(i * 0.3) * 60 + Math.cos(i * 0.7) * 40
    const amount = Math.max(0, Math.round(base + noise + (i % 7) * 15))
    data.push({
      date: d.toISOString().split("T")[0],
      amount: Math.random() > 0.1 ? amount * 1000 : 0,
    })
  }
  return data
}

export const spendingHeatmapData = generateHeatmap()

// ── Signal Category Breakdown ──────────────────────────────────────────────
export type CategoryBreakdown = {
  category: string
  amount: number
  color: string
  subcategories: { name: string; amount: number }[]
}

export const categoryBreakdowns: CategoryBreakdown[] = [
  { category: "OEM Pre-Installs", amount: 820000, color: "var(--color-chart-1)", subcategories: [{ name: "Samsung Knox", amount: 420000 }, { name: "Xiaomi HyperOS", amount: 280000 }, { name: "Oppo ColorOS", amount: 120000 }] },
  { category: "SDK In-App Signals", amount: 450000, color: "var(--color-chart-2)", subcategories: [{ name: "AppsFlyer", amount: 180000 }, { name: "Adjust", amount: 150000 }, { name: "Branch", amount: 120000 }] },
  { category: "Rewarded Video DSP", amount: 340000, color: "var(--color-chart-3)", subcategories: [{ name: "Unity Ads", amount: 45000 }, { name: "AppLovin", amount: 120000 }, { name: "Mintegral", amount: 175000 }] },
  { category: "Contextual Intent", amount: 560000, color: "var(--color-chart-4)", subcategories: [{ name: "App Store Queries", amount: 280000 }, { name: "Category Affinity", amount: 180000 }, { name: "Keyword Directs", amount: 100000 }] },
  { category: "Cross-Device Graph", amount: 215000, color: "var(--color-chart-5)", subcategories: [{ name: "Device IDs", amount: 95000 }, { name: "GAID / IDFA", amount: 45000 }, { name: "Hashed PII", amount: 75000 }] },
  { category: "Publisher Direct", amount: 180000, color: "var(--color-chart-1)", subcategories: [{ name: "Exclusive Apps", amount: 50000 }, { name: "SDK Rewards", amount: 80000 }, { name: "In-Feed Placements", amount: 50000 }] },
  { category: "Geographic Yield", amount: 634000, color: "var(--color-chart-2)", subcategories: [{ name: "Tier 1 US/EU", amount: 389000 }, { name: "LATAM OEM", amount: 245000 }] },
]

export type RecurringCharge = {
  id: string
  merchant: string
  logo: string
  amount: number
  frequency: "monthly" | "yearly"
  nextDate: string
  status: "wanted" | "review" | "unset"
  category: string
}

export const recurringCharges: RecurringCharge[] = [
  { id: "r1", merchant: "AppsFlyer SDK Sync", logo: logo("spotify.com"), amount: 14250, frequency: "monthly", nextDate: "Real-time", status: "wanted", category: "SDK Integration" },
  { id: "r2", merchant: "Samsung Knox Direct", logo: logo("netflix.com"), amount: 28400, frequency: "monthly", nextDate: "Real-time", status: "wanted", category: "OEM Partner" },
  { id: "r3", merchant: "Adjust Attribution", logo: logo("openai.com"), amount: 18500, frequency: "monthly", nextDate: "Real-time", status: "wanted", category: "Attribution" },
  { id: "r4", merchant: "Singular Stream", logo: logo("figma.com"), amount: 12000, frequency: "monthly", nextDate: "Real-time", status: "wanted", category: "Attribution" },
  { id: "r5", merchant: "Branch Deep Link", logo: logo("adobe.com"), amount: 9400, frequency: "monthly", nextDate: "Real-time", status: "review", category: "SDK Integration" },
  { id: "r6", merchant: "AppLovin Exchange", logo: "/logos/aws-amazon-com.svg", amount: 45000, frequency: "monthly", nextDate: "Real-time", status: "wanted", category: "DSP Exchange" },
]

export type MonthComparison = { category: string; thisMonth: number; lastMonth: number }

export const monthComparisons: MonthComparison[] = [
  { category: "OEM Pre-Installs", thisMonth: 820000, lastMonth: 690000 },
  { category: "SDK In-App Signals", thisMonth: 450000, lastMonth: 520000 },
  { category: "Rewarded Video DSP", thisMonth: 340000, lastMonth: 280000 },
  { category: "Contextual Intent", thisMonth: 560000, lastMonth: 410000 },
  { category: "Cross-Device Graph", thisMonth: 215000, lastMonth: 215000 },
]

export type AiInsight = {
  id: string
  text: string
  trend: "up" | "down" | "neutral"
  percentChange: number
  category: string
}

export const aiInsights: AiInsight[] = [
  { id: "ai1", text: "Increase budget on OEM inventory in LATAM — Samsung & Xiaomi pre-installs deliver 2.4x higher D7 retention.", trend: "up", percentChange: 24, category: "OEM Intelligence" },
  { id: "ai2", text: "Reduce spend on Publisher X due to increasing SDK spoofing fraud anomalies.", trend: "down", percentChange: 13, category: "Traffic Quality" },
  { id: "ai3", text: "Expand lookalike audience in Tier 1 markets — 1.4M high-intent profiles identified.", trend: "neutral", percentChange: 18, category: "Audience Expansion" },
  { id: "ai4", text: "High ROAS opportunity detected in Android Rewarded SDK units during peak evening hours.", trend: "up", percentChange: 37, category: "DSP Auction" },
]

// ── DSP Bidders & Ad Exchanges (Holdings) ──────────────────────────────────
function generateSparkline(base: number, volatility: number): number[] {
  const points: number[] = []
  let price = base
  for (let i = 0; i < 30; i++) {
    price += (Math.sin(i * 0.5) * volatility) + (Math.random() - 0.48) * volatility
    points.push(Math.round(price * 100) / 100)
  }
  return points
}

export type Holding = {
  id: string
  symbol: string
  name: string
  quantity: number
  avgBuyPrice: number
  currentPrice: number
  logo: string
  sparklineData: number[]
  sector: string
}

export const holdings: Holding[] = [
  { id: "h1", symbol: "APPL", name: "AppLovin Exchange", quantity: 25, avgBuyPrice: 1.80, currentPrice: 2.48, logo: logo("apple.com"), sparklineData: generateSparkline(2.48, 0.2), sector: "DSP Exchange" },
  { id: "h2", symbol: "GOOG", name: "Google AdMob DSP", quantity: 10, avgBuyPrice: 1.42, currentPrice: 1.98, logo: logo("google.com"), sparklineData: generateSparkline(1.98, 0.15), sector: "SSP Network" },
  { id: "h3", symbol: "UNTY", name: "Unity Ads Engine", quantity: 15, avgBuyPrice: 2.10, currentPrice: 2.75, logo: logo("microsoft.com"), sparklineData: generateSparkline(2.75, 0.25), sector: "Rewarded SDK" },
  { id: "h4", symbol: "MNTR", name: "Mintegral SDK", quantity: 8, avgBuyPrice: 1.25, currentPrice: 1.65, logo: logo("amazon.com"), sparklineData: generateSparkline(1.65, 0.1), sector: "Native Exchange" },
  { id: "h5", symbol: "TAPS", name: "Tapjoy Rewarded", quantity: 12, avgBuyPrice: 2.45, currentPrice: 3.10, logo: logo("tesla.com"), sparklineData: generateSparkline(3.10, 0.3), sector: "Playable DSP" },
]

export type WatchlistItem = {
  id: string
  symbol: string
  name: string
  currentPrice: number
  dayChange: number
  logo: string
  sparklineData: number[]
}

export const watchlistItems: WatchlistItem[] = [
  { id: "w1", symbol: "NFLX", name: "Netflix Ad-Tier", currentPrice: 3.48, dayChange: 1.24, logo: logo("netflix.com"), sparklineData: generateSparkline(3.48, 0.2) },
  { id: "w2", symbol: "AMZN", name: "Amazon Publisher Services", currentPrice: 2.80, dayChange: -0.87, logo: logo("amazon.com"), sparklineData: generateSparkline(2.80, 0.15) },
  { id: "w3", symbol: "CRTO", name: "Criteo Retargeting Engine", currentPrice: 1.95, dayChange: 0.56, logo: logo("salesforce.com"), sparklineData: generateSparkline(1.95, 0.1) },
]

export type PortfolioHistoryPoint = { date: string; portfolio: number; sp500: number }

export const portfolioHistory: PortfolioHistoryPoint[] = [
  { date: "May 2025", portfolio: 42000, sp500: 44000 },
  { date: "Jun 2025", portfolio: 44500, sp500: 45200 },
  { date: "Jul 2025", portfolio: 43800, sp500: 44800 },
  { date: "Aug 2025", portfolio: 46200, sp500: 46100 },
  { date: "Sep 2025", portfolio: 48100, sp500: 47300 },
  { date: "Oct 2025", portfolio: 47500, sp500: 46800 },
  { date: "Nov 2025", portfolio: 51200, sp500: 48900 },
  { date: "Dec 2025", portfolio: 53800, sp500: 50200 },
  { date: "Jan 2026", portfolio: 52400, sp500: 49800 },
  { date: "Feb 2026", portfolio: 55100, sp500: 51400 },
  { date: "Mar 2026", portfolio: 58200, sp500: 53100 },
  { date: "Apr 2026", portfolio: 61450, sp500: 54800 },
]

// ── OEM Device Allocation (Budgets) ───────────────────────────────────────
export type BudgetCategory = {
  id: string
  category: string
  iconName: string
  budget: number
  spent: number
  color: string
}

export const budgetCategories: BudgetCategory[] = [
  { id: "b1", category: "Samsung Knox", iconName: "smartphone", budget: 800000, spent: 820000, color: "text-blue-500" },
  { id: "b2", category: "Xiaomi HyperOS", iconName: "smartphone", budget: 400000, spent: 310000, color: "text-orange-500" },
  { id: "b3", category: "Oppo ColorOS", iconName: "smartphone", budget: 300000, spent: 340000, color: "text-emerald-500" },
  { id: "b4", category: "Vivo Funtouch", iconName: "smartphone", budget: 500000, spent: 460000, color: "text-cyan-500" },
  { id: "b5", category: "OnePlus Oxygen", iconName: "smartphone", budget: 200000, spent: 215000, color: "text-purple-500" },
  { id: "b6", category: "Realme UI", iconName: "smartphone", budget: 150000, spent: 95000, color: "text-pink-500" },
]

export type SavingsGoal = {
  id: string
  name: string
  targetAmount: number
  currentAmount: number
  deadline: string
  iconName: string
  monthlyContribution: number
}

export const savingsGoals: SavingsGoal[] = [
  { id: "g1", name: "Global Identity Graph", targetAmount: 100000000, currentAmount: 85420000, deadline: "Aug 2026", iconName: "network", monthlyContribution: 5000000 },
  { id: "g2", name: "Zero-Latency Fraud Engine", targetAmount: 999, currentAmount: 984, deadline: "Dec 2026", iconName: "shield", monthlyContribution: 5 },
]

export type DailySpending = { date: string; amount: number }

export const dailySpending: DailySpending[] = Array.from({ length: 30 }, (_, i) => {
  const d = new Date(2026, 3, i + 1)
  const dayOfWeek = d.getDay()
  const base = dayOfWeek === 0 || dayOfWeek === 6 ? 45 : 95
  const amount = Math.round(base + Math.sin(i * 0.8) * 40 + Math.random() * 30)
  return { date: d.toISOString().split("T")[0], amount: i < 13 ? amount * 100 : 0 }
})

// ── Bank Accounts (Connected Identity Datastores) ──────────────────────────
export type BankAccount = {
  id: string
  name: string
  type: "checking" | "savings" | "crypto" | "investment"
  institution: string
  institutionLogo: string
  accountNumber: string
  balance: number
  currency: string
  change: number
  changePercent: number
  lastActivity: string
  color: string
}

export const bankAccounts: BankAccount[] = [
  {
    id: "ba1",
    name: "Master Identity Cluster",
    type: "checking",
    institution: "AdsIdol Graph Engine",
    institutionLogo: logo("chase.com"),
    accountNumber: "****4589",
    balance: 85420000,
    currency: "PROFILES ",
    change: 1240000,
    changePercent: 5.2,
    lastActivity: "Today",
    color: "bg-blue-500",
  },
  {
    id: "ba2",
    name: "OEM Hardware Pool",
    type: "savings",
    institution: "Samsung Knox & Xiaomi",
    institutionLogo: logo("marcus.com"),
    accountNumber: "****7821",
    balance: 28400000,
    currency: "DEVICES ",
    change: 880500,
    changePercent: 2.6,
    lastActivity: "Yesterday",
    color: "bg-emerald-500",
  },
  {
    id: "ba3",
    name: "DSP Auction Engine",
    type: "crypto",
    institution: "Open RTB Gateway",
    institutionLogo: logo("coinbase.com"),
    accountNumber: "****3bc9",
    balance: 14820,
    currency: "REQ/S ",
    change: 620,
    changePercent: 4.2,
    lastActivity: "2 hours ago",
    color: "bg-orange-500",
  },
]

// ── Transfer Records (Data Dispatches) ─────────────────────────────────────
export type TransferRecord = {
  id: string
  type: "sent" | "received" | "scheduled"
  contactName: string
  contactAvatar: string
  amount: number
  date: string
  status: "completed" | "pending" | "scheduled"
  note?: string
}

export const transferRecords: TransferRecord[] = [
  { id: "tr1", type: "sent", contactName: "AppsFlyer SDK Sync", contactAvatar: avatar(1), amount: 250000, date: "Apr 12, 2026", status: "completed", note: "Attribution sync" },
  { id: "tr2", type: "received", contactName: "Samsung Knox Direct", contactAvatar: avatar(3), amount: 1200000, date: "Apr 11, 2026", status: "completed", note: "Pre-install telemetry" },
  { id: "tr3", type: "sent", contactName: "Adjust Attribution Link", contactAvatar: avatar(5), amount: 85000, date: "Apr 10, 2026", status: "completed", note: "Cohort dispatch" },
]

// ── Notifications ──────────────────────────────────────────────────────────
export type Notification = {
  id: string
  type: "transaction" | "security" | "system" | "promotion" | "request"
  title: string
  description: string
  time: string
  read: boolean
  icon: string
  actionable?: {
    accept: string
    decline: string
    amount?: string
    from?: string
    fromAvatar?: string
  }
}

export const notifications: Notification[] = [
  { id: "n0a", type: "request", title: "High-Intent Cohort Dispatch", description: "AppsFlyer SDK is requesting 85,000 lookalike profiles for Tier 1 scaling", time: "Just now", read: false, icon: "hand-coins", actionable: { accept: "Dispatch 85,000 Profiles", decline: "Hold", amount: "85,000 Profiles", from: "AppsFlyer SDK Engine", fromAvatar: "/avatars/5.jpg" } },
  { id: "n0b", type: "security", title: "SDK Spoofing Blocked", description: "Automated anti-fraud engine blocked emulator cluster from IP subnet 172.56.21.0/24", time: "5 min ago", read: false, icon: "shield-alert", actionable: { accept: "Confirm Block", decline: "Whitelist" } },
  { id: "n1", type: "transaction", title: "OEM Passkey Synced", description: "Samsung Knox sync completed 28.4M device tokens", time: "2 min ago", read: false, icon: "arrow-down-left" },
]

// ── Auction Liquidity Coins ────────────────────────────────────────────────
export type CryptoCoin = {
  id: string
  symbol: string
  name: string
  logo: string
  price: number
  change24h: number
  change7d: number
  marketCap: number
  volume24h: number
  holdings: number
  sparklineData: number[]
}

export const cryptoCoins: CryptoCoin[] = [
  {
    id: "btc",
    symbol: "RWD",
    name: "Rewarded Video SDK",
    logo: "/logos/bitcoin-com.png",
    price: 2.48,
    change24h: 2.34,
    change7d: 5.12,
    marketCap: 1340000000,
    volume24h: 28500000,
    holdings: 1.24,
    sparklineData: [2.1, 2.2, 2.3, 2.25, 2.4, 2.45, 2.48],
  },
  {
    id: "eth",
    symbol: "OEM",
    name: "OEM Pre-Install Pool",
    logo: "/logos/ethereum-org.png",
    price: 3.84,
    change24h: -1.15,
    change7d: 3.28,
    marketCap: 462000000,
    volume24h: 15200000,
    holdings: 12.5,
    sparklineData: [3.7, 3.68, 3.75, 3.81, 3.84],
  },
]

export type CryptoTransaction = {
  id: string
  type: "buy" | "sell" | "swap" | "receive" | "send"
  coin: string
  coinSymbol: string
  logo: string
  amount: number
  value: number
  date: string
  status: "completed" | "pending"
}

export const cryptoTransactions: CryptoTransaction[] = [
  { id: "ct1", type: "buy", coin: "Rewarded Video SDK", coinSymbol: "RWD", logo: "/logos/bitcoin-com.png", amount: 50000, value: 124000, date: "Apr 12, 2026", status: "completed" },
  { id: "ct2", type: "sell", coin: "OEM Pre-Install Pool", coinSymbol: "OEM", logo: "/logos/ethereum-org.png", amount: 20000, value: 76800, date: "Apr 11, 2026", status: "completed" },
]

// ── Traffic Quality & Anti-Fraud Health Score ──────────────────────────────
export type HealthFactor = {
  id: string
  label: string
  score: number
  maxScore: number
  status: "excellent" | "good" | "fair" | "poor"
  description: string
}

export const financialHealthScore = {
  overall: 98,
  trend: "up" as const,
  trendDelta: 3,
  factors: [
    { id: "hf1", label: "Clean Traffic Rate", score: 99, maxScore: 100, status: "excellent" as const, description: "99.4% clean non-bot traffic verified" },
    { id: "hf2", label: "Identity Match Accuracy", score: 98, maxScore: 100, status: "excellent" as const, description: "98.4% deterministic & probabilistic match accuracy" },
    { id: "hf3", label: "SDK Fraud Prevention", score: 99, maxScore: 100, status: "excellent" as const, description: "SDK spoofing and click spam auto-blocked at bidder" },
    { id: "hf4", label: "OEM Hardware Retention", score: 94, maxScore: 100, status: "excellent" as const, description: "42.5% Day-7 retention on Samsung Knox pre-installs" },
    { id: "hf5", label: "Cross-Device Freshness", score: 96, maxScore: 100, status: "excellent" as const, description: "Identity graph re-synced every <15 minutes" },
  ] as HealthFactor[],
}

// ── System Documentation & Status ──────────────────────────────────────────
export type FaqItem = {
  id: string
  question: string
  answer: string
  category: "account" | "payments" | "security" | "billing" | "general"
}

export const faqItems: FaqItem[] = [
  { id: "faq1", category: "account", question: "How does AdsIdol resolve cross-device identities?", answer: "AdsIdol combines deterministic hashed PII (email, phone) and on-device OEM signatures (Samsung Knox, Xiaomi) with probabilistic IP and contextual signals for 98.4% match accuracy." },
  { id: "faq2", category: "security", question: "Is data anonymization GDPR & CCPA compliant?", answer: "Yes! All device identifiers and PII are anonymized using one-way SHA-256 hashing directly at the edge SDK before leaving the device." },
]

export type SupportTicket = {
  id: string
  subject: string
  status: "open" | "in-progress" | "resolved"
  priority: "low" | "medium" | "high"
  createdAt: string
  lastUpdate: string
}

export const supportTickets: SupportTicket[] = [
  { id: "tk1", subject: "AppsFlyer SDK Sync Pipeline Verification", status: "in-progress", priority: "high", createdAt: "Apr 10, 2026", lastUpdate: "Apr 12, 2026" },
]

export const systemStatus = [
  { name: "Identity Resolution Graph", status: "operational" as const },
  { name: "OEM Knox Gateway", status: "operational" as const },
  { name: "Anti-Fraud Engine", status: "operational" as const },
  { name: "AppsFlyer Ingest Pipeline", status: "operational" as const },
  { name: "DSP Auction Engine", status: "operational" as const },
]

export const cryptoPriceHistory = [
  { time: "00:00", btc: 2.40, eth: 3.79 },
  { time: "04:00", btc: 2.45, eth: 3.81 },
  { time: "08:00", btc: 2.42, eth: 3.82 },
  { time: "12:00", btc: 2.48, eth: 3.85 },
  { time: "16:00", btc: 2.46, eth: 3.83 },
  { time: "20:00", btc: 2.48, eth: 3.84 },
]

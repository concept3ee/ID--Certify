import { useState } from 'react'
import { 
  Shield, TrendingUp, TrendingDown, AlertTriangle, CheckCircle, 
  BarChart3, Clock, Award, Target, Users, Building, DollarSign,
  FileText, Lock, Globe, Star, Zap, Eye, Settings, RefreshCw,
  ArrowUp, ArrowDown, Minus, Info, ExternalLink, Download,
  ShoppingCart, Link
} from 'lucide-react'

// Trust Score Interfaces
interface TrustScoreCategory {
  id: string
  name: string
  description: string
  score: number
  maxScore: number
  weight: number
  trend: 'up' | 'down' | 'stable'
  change: number
  status: 'excellent' | 'good' | 'fair' | 'poor' | 'critical'
  icon: React.ComponentType<{ className?: string }>
  subcategories: TrustScoreSubcategory[]
  lastUpdated: string
  nextReview: string
}

interface TrustScoreSubcategory {
  id: string
  name: string
  score: number
  maxScore: number
  status: 'completed' | 'pending' | 'in-progress' | 'failed'
  description: string
  impact: 'high' | 'medium' | 'low'
}

interface TrustScoreHistory {
  date: string
  score: number
  change: number
  category: string
  reason: string
}

interface TrustScoreAlert {
  id: string
  type: 'warning' | 'critical' | 'info' | 'success'
  title: string
  description: string
  category: string
  timestamp: string
  actionRequired: boolean
  actionText?: string
}

interface ImprovementRecommendation {
  id: string
  category: string
  title: string
  description: string
  impact: 'high' | 'medium' | 'low'
  effort: 'low' | 'medium' | 'high'
  priority: number
  estimatedScoreIncrease: number
  timeframe: string
  resources: string[]
}

// Phase 2 Interfaces
interface IndustryBenchmark {
  industry: string
  averageScore: number
  topQuartile: number
  median: number
  bottomQuartile: number
  yourScore: number
  percentile: number
  rank: number
  totalOrganizations: number
}

interface PredictiveInsight {
  id: string
  type: 'risk' | 'opportunity' | 'trend'
  title: string
  description: string
  probability: number
  impact: 'high' | 'medium' | 'low'
  timeframe: string
  confidence: number
  factors: string[]
  recommendations: string[]
}

interface ExternalDataSource {
  id: string
  name: string
  type: 'credit' | 'regulatory' | 'media' | 'industry'
  status: 'connected' | 'pending' | 'error' | 'disconnected'
  lastSync: string
  dataPoints: number
  reliability: number
  description: string
}

interface CustomScoringModel {
  id: string
  name: string
  industry: string
  description: string
  isActive: boolean
  categories: {
    name: string
    weight: number
    customFactors: string[]
  }[]
  createdAt: string
  performance: {
    accuracy: number
    predictions: number
    successRate: number
  }
}

// Phase 3 Interfaces
interface TrustMarketplaceItem {
  id: string
  title: string
  description: string
  category: 'data' | 'insights' | 'models' | 'verification'
  price: number
  currency: 'USD' | 'TRUST' | 'ETH'
  seller: string
  rating: number
  reviews: number
  downloads: number
  isVerified: boolean
  tags: string[]
  createdAt: string
  lastUpdated: string
}

interface TrustNetworkMember {
  id: string
  name: string
  industry: string
  trustScore: number
  verificationLevel: 'basic' | 'verified' | 'premium' | 'enterprise'
  isOnline: boolean
  lastActive: string
  mutualConnections: number
  sharedVerifications: number
  reputation: number
  specialties: string[]
  location: string
  isConnected: boolean
}

interface BlockchainRecord {
  id: string
  transactionHash: string
  blockNumber: number
  timestamp: string
  type: 'verification' | 'score_update' | 'attestation' | 'partnership'
  data: {
    score?: number
    verifier?: string
    verifiedBy?: string
    metadata?: any
  }
  gasUsed: number
  status: 'confirmed' | 'pending' | 'failed'
  network: 'ethereum' | 'polygon' | 'arbitrum'
}

interface TrustToken {
  id: string
  name: string
  symbol: string
  balance: number
  value: number
  currency: string
  earned: number
  spent: number
  transactions: {
    id: string
    type: 'earn' | 'spend' | 'transfer'
    amount: number
    description: string
    timestamp: string
  }[]
}

interface APIMarketplaceItem {
  id: string
  name: string
  description: string
  endpoint: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  pricing: {
    type: 'free' | 'per_request' | 'subscription'
    price: number
    currency: string
  }
  rateLimit: {
    requests: number
    period: string
  }
  documentation: string
  isActive: boolean
  category: string
  provider: string
  version: string
}

const TrustScore = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'breakdown' | 'history' | 'recommendations' | 'alerts' | 'benchmarking' | 'predictive' | 'external' | 'marketplace' | 'network' | 'blockchain'>('overview')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d')

  // Mock data for trust score categories
  const trustScoreCategories: TrustScoreCategory[] = [
    {
      id: 'financial',
      name: 'Financial Stability',
      description: 'Credit rating, financial health, and payment history',
      score: 85,
      maxScore: 100,
      weight: 0.25,
      trend: 'up',
      change: 5,
      status: 'good',
      icon: DollarSign,
      lastUpdated: '2024-01-20',
      nextReview: '2024-02-20',
      subcategories: [
        { id: 'credit-rating', name: 'Credit Rating', score: 90, maxScore: 100, status: 'completed', description: 'AAA credit rating maintained', impact: 'high' },
        { id: 'payment-history', name: 'Payment History', score: 95, maxScore: 100, status: 'completed', description: '100% on-time payments', impact: 'high' },
        { id: 'revenue-growth', name: 'Revenue Growth', score: 75, maxScore: 100, status: 'in-progress', description: '15% YoY growth', impact: 'medium' },
        { id: 'debt-equity', name: 'Debt-to-Equity Ratio', score: 80, maxScore: 100, status: 'completed', description: 'Healthy 0.3 ratio', impact: 'medium' }
      ]
    },
    {
      id: 'compliance',
      name: 'Regulatory Compliance',
      description: 'GDPR, SOX, and industry-specific compliance',
      score: 92,
      maxScore: 100,
      weight: 0.20,
      trend: 'stable',
      change: 0,
      status: 'excellent',
      icon: Shield,
      lastUpdated: '2024-01-18',
      nextReview: '2024-02-18',
      subcategories: [
        { id: 'gdpr', name: 'GDPR Compliance', score: 95, maxScore: 100, status: 'completed', description: 'Full GDPR compliance', impact: 'high' },
        { id: 'sox', name: 'SOX Compliance', score: 90, maxScore: 100, status: 'completed', description: 'SOX 404 compliance', impact: 'high' },
        { id: 'industry', name: 'Industry Regulations', score: 88, maxScore: 100, status: 'completed', description: 'All industry standards met', impact: 'medium' },
        { id: 'audit', name: 'Audit Results', score: 95, maxScore: 100, status: 'completed', description: 'Clean audit results', impact: 'high' }
      ]
    },
    {
      id: 'operational',
      name: 'Operational Excellence',
      description: 'Process efficiency, quality metrics, and certifications',
      score: 78,
      maxScore: 100,
      weight: 0.20,
      trend: 'up',
      change: 3,
      status: 'good',
      icon: Target,
      lastUpdated: '2024-01-19',
      nextReview: '2024-02-19',
      subcategories: [
        { id: 'efficiency', name: 'Process Efficiency', score: 80, maxScore: 100, status: 'in-progress', description: '85% efficiency rating', impact: 'medium' },
        { id: 'quality', name: 'Quality Certifications', score: 75, maxScore: 100, status: 'pending', description: 'ISO 9001 pending', impact: 'high' },
        { id: 'customer', name: 'Customer Satisfaction', score: 85, maxScore: 100, status: 'completed', description: '4.2/5 customer rating', impact: 'medium' },
        { id: 'retention', name: 'Employee Retention', score: 72, maxScore: 100, status: 'in-progress', description: '88% retention rate', impact: 'low' }
      ]
    },
    {
      id: 'security',
      name: 'Security & Risk Management',
      description: 'Cybersecurity, data protection, and incident response',
      score: 88,
      maxScore: 100,
      weight: 0.15,
      trend: 'up',
      change: 2,
      status: 'good',
      icon: Lock,
      lastUpdated: '2024-01-17',
      nextReview: '2024-02-17',
      subcategories: [
        { id: 'cybersecurity', name: 'Cybersecurity Score', score: 90, maxScore: 100, status: 'completed', description: 'SOC 2 Type II certified', impact: 'high' },
        { id: 'data-protection', name: 'Data Protection', score: 85, maxScore: 100, status: 'completed', description: 'End-to-end encryption', impact: 'high' },
        { id: 'incident-response', name: 'Incident Response', score: 88, maxScore: 100, status: 'completed', description: '24/7 monitoring', impact: 'medium' },
        { id: 'risk-management', name: 'Risk Management', score: 90, maxScore: 100, status: 'completed', description: 'Comprehensive risk framework', impact: 'high' }
      ]
    },
    {
      id: 'reputation',
      name: 'Reputation & Brand',
      description: 'Public perception, media sentiment, and customer reviews',
      score: 82,
      maxScore: 100,
      weight: 0.10,
      trend: 'stable',
      change: 1,
      status: 'good',
      icon: Star,
      lastUpdated: '2024-01-16',
      nextReview: '2024-02-16',
      subcategories: [
        { id: 'sentiment', name: 'Public Sentiment', score: 85, maxScore: 100, status: 'completed', description: 'Positive sentiment trend', impact: 'medium' },
        { id: 'media', name: 'Media Coverage', score: 80, maxScore: 100, status: 'completed', description: 'Balanced media coverage', impact: 'low' },
        { id: 'partnerships', name: 'Partnership Quality', score: 85, maxScore: 100, status: 'completed', description: 'Strong partner network', impact: 'medium' },
        { id: 'industry', name: 'Industry Standing', score: 78, maxScore: 100, status: 'in-progress', description: 'Top 25% in industry', impact: 'high' }
      ]
    },
    {
      id: 'network',
      name: 'Partnership & Network',
      description: 'Supplier relationships, customer satisfaction, and industry standing',
      score: 75,
      maxScore: 100,
      weight: 0.10,
      trend: 'down',
      change: -2,
      status: 'fair',
      icon: Users,
      lastUpdated: '2024-01-15',
      nextReview: '2024-02-15',
      subcategories: [
        { id: 'suppliers', name: 'Supplier Relationships', score: 80, maxScore: 100, status: 'completed', description: 'Strong supplier network', impact: 'medium' },
        { id: 'customers', name: 'Customer Satisfaction', score: 75, maxScore: 100, status: 'in-progress', description: '4.0/5 customer rating', impact: 'high' },
        { id: 'industry', name: 'Industry Standing', score: 70, maxScore: 100, status: 'pending', description: 'Industry recognition needed', impact: 'high' },
        { id: 'collaboration', name: 'Collaboration Score', score: 75, maxScore: 100, status: 'completed', description: 'Active partnerships', impact: 'low' }
      ]
    }
  ]

  // Calculate overall trust score
  const overallScore = Math.round(
    trustScoreCategories.reduce((total, category) => 
      total + (category.score * category.weight), 0
    )
  )

  const maxOverallScore = 100
  const scoreGrade = overallScore >= 90 ? 'A+' : 
                    overallScore >= 80 ? 'A' : 
                    overallScore >= 70 ? 'B+' : 
                    overallScore >= 60 ? 'B' : 
                    overallScore >= 50 ? 'C' : 'D'

  // Mock historical data
  const scoreHistory: TrustScoreHistory[] = [
    { date: '2024-01-01', score: 82, change: 0, category: 'Initial', reason: 'Baseline score' },
    { date: '2024-01-05', score: 83, change: 1, category: 'Financial', reason: 'Improved payment history' },
    { date: '2024-01-10', score: 84, change: 1, category: 'Compliance', reason: 'GDPR audit passed' },
    { date: '2024-01-15', score: 83, change: -1, category: 'Network', reason: 'Partnership review' },
    { date: '2024-01-20', score: 85, change: 2, category: 'Financial', reason: 'Credit rating upgrade' }
  ]

  // Mock alerts
  const alerts: TrustScoreAlert[] = [
    {
      id: '1',
      type: 'warning',
      title: 'Network Score Declining',
      description: 'Partnership quality score has decreased by 2 points this month',
      category: 'Partnership & Network',
      timestamp: '2024-01-20T10:30:00Z',
      actionRequired: true,
      actionText: 'Review partnerships'
    },
    {
      id: '2',
      type: 'info',
      title: 'ISO 9001 Certification Pending',
      description: 'Quality certification application is under review',
      category: 'Operational Excellence',
      timestamp: '2024-01-19T14:15:00Z',
      actionRequired: false
    },
    {
      id: '3',
      type: 'success',
      title: 'Credit Rating Upgraded',
      description: 'Credit rating improved to AAA, increasing financial score',
      category: 'Financial Stability',
      timestamp: '2024-01-18T09:45:00Z',
      actionRequired: false
    }
  ]

  // Mock recommendations
  const recommendations: ImprovementRecommendation[] = [
    {
      id: '1',
      category: 'Operational Excellence',
      title: 'Complete ISO 9001 Certification',
      description: 'Obtain ISO 9001 quality management certification to improve operational score',
      impact: 'high',
      effort: 'medium',
      priority: 1,
      estimatedScoreIncrease: 8,
      timeframe: '3-6 months',
      resources: ['Quality team', 'External auditor', '$15,000 budget']
    },
    {
      id: '2',
      category: 'Partnership & Network',
      title: 'Strengthen Key Partnerships',
      description: 'Review and strengthen relationships with top 5 strategic partners',
      impact: 'medium',
      effort: 'low',
      priority: 2,
      estimatedScoreIncrease: 5,
      timeframe: '1-2 months',
      resources: ['Partnership team', 'Relationship manager']
    },
    {
      id: '3',
      category: 'Reputation & Brand',
      title: 'Industry Recognition Program',
      description: 'Apply for industry awards and recognition programs',
      impact: 'high',
      effort: 'medium',
      priority: 3,
      estimatedScoreIncrease: 6,
      timeframe: '6-12 months',
      resources: ['Marketing team', 'Industry relations', '$10,000 budget']
    }
  ]

  // Phase 2 Mock Data
  const industryBenchmarks: IndustryBenchmark[] = [
    {
      industry: 'Technology',
      averageScore: 78,
      topQuartile: 92,
      median: 79,
      bottomQuartile: 65,
      yourScore: 85,
      percentile: 75,
      rank: 1250,
      totalOrganizations: 5000
    },
    {
      industry: 'Financial Services',
      averageScore: 82,
      topQuartile: 95,
      median: 83,
      bottomQuartile: 68,
      yourScore: 85,
      percentile: 68,
      rank: 890,
      totalOrganizations: 3200
    },
    {
      industry: 'Healthcare',
      averageScore: 85,
      topQuartile: 96,
      median: 86,
      bottomQuartile: 72,
      yourScore: 85,
      percentile: 52,
      rank: 2100,
      totalOrganizations: 4100
    }
  ]

  const predictiveInsights: PredictiveInsight[] = [
    {
      id: '1',
      type: 'risk',
      title: 'Compliance Risk Increase',
      description: 'Based on recent regulatory changes, compliance score may decrease by 5-8 points in Q2',
      probability: 75,
      impact: 'medium',
      timeframe: '2-3 months',
      confidence: 85,
      factors: ['New GDPR requirements', 'Industry regulation updates', 'Audit schedule changes'],
      recommendations: ['Update compliance procedures', 'Schedule pre-emptive audit', 'Train compliance team']
    },
    {
      id: '2',
      type: 'opportunity',
      title: 'Partnership Score Improvement',
      description: 'Strategic partnership opportunities could increase network score by 10-15 points',
      probability: 60,
      impact: 'high',
      timeframe: '4-6 months',
      confidence: 70,
      factors: ['Industry collaboration trends', 'Market expansion opportunities', 'Technology partnerships'],
      recommendations: ['Identify key partners', 'Develop partnership strategy', 'Initiate collaboration talks']
    },
    {
      id: '3',
      type: 'trend',
      title: 'Financial Stability Trend',
      description: 'Current financial trajectory suggests 3-5 point improvement over next 6 months',
      probability: 85,
      impact: 'medium',
      timeframe: '6 months',
      confidence: 90,
      factors: ['Revenue growth trend', 'Debt reduction plan', 'Credit rating stability'],
      recommendations: ['Maintain current financial practices', 'Monitor credit utilization', 'Continue growth strategy']
    }
  ]

  const externalDataSources: ExternalDataSource[] = [
    {
      id: '1',
      name: 'Experian Credit Bureau',
      type: 'credit',
      status: 'connected',
      lastSync: '2024-01-20T10:30:00Z',
      dataPoints: 15,
      reliability: 98,
      description: 'Real-time credit rating and financial health data'
    },
    {
      id: '2',
      name: 'SEC Regulatory Database',
      type: 'regulatory',
      status: 'connected',
      lastSync: '2024-01-19T14:15:00Z',
      dataPoints: 8,
      reliability: 95,
      description: 'Regulatory compliance status and filings'
    },
    {
      id: '3',
      name: 'Media Sentiment Monitor',
      type: 'media',
      status: 'connected',
      lastSync: '2024-01-20T08:45:00Z',
      dataPoints: 245,
      reliability: 87,
      description: 'Real-time media sentiment and brand monitoring'
    },
    {
      id: '4',
      name: 'Industry Benchmark API',
      type: 'industry',
      status: 'pending',
      lastSync: '2024-01-15T16:20:00Z',
      dataPoints: 0,
      reliability: 0,
      description: 'Industry-specific benchmarking data'
    }
  ]

  const customScoringModels: CustomScoringModel[] = [
    {
      id: '1',
      name: 'Technology Industry Model',
      industry: 'Technology',
      description: 'Custom scoring model optimized for technology companies',
      isActive: true,
      categories: [
        { name: 'Innovation Score', weight: 0.30, customFactors: ['R&D Investment', 'Patent Portfolio', 'Technology Adoption'] },
        { name: 'Security Posture', weight: 0.25, customFactors: ['Cybersecurity Rating', 'Data Protection', 'Incident Response'] },
        { name: 'Market Position', weight: 0.20, customFactors: ['Market Share', 'Competitive Advantage', 'Customer Base'] },
        { name: 'Financial Health', weight: 0.15, customFactors: ['Revenue Growth', 'Profitability', 'Cash Flow'] },
        { name: 'Compliance', weight: 0.10, customFactors: ['Regulatory Compliance', 'Industry Standards', 'Audit Results'] }
      ],
      createdAt: '2024-01-10',
      performance: {
        accuracy: 92,
        predictions: 156,
        successRate: 88
      }
    },
    {
      id: '2',
      name: 'Healthcare Industry Model',
      industry: 'Healthcare',
      description: 'Specialized model for healthcare organizations',
      isActive: false,
      categories: [
        { name: 'Patient Safety', weight: 0.35, customFactors: ['Safety Metrics', 'Quality Ratings', 'Incident Reports'] },
        { name: 'Regulatory Compliance', weight: 0.25, customFactors: ['HIPAA Compliance', 'FDA Regulations', 'State Requirements'] },
        { name: 'Financial Stability', weight: 0.20, customFactors: ['Revenue Cycle', 'Cost Management', 'Insurance Coverage'] },
        { name: 'Operational Excellence', weight: 0.20, customFactors: ['Efficiency Metrics', 'Staff Satisfaction', 'Technology Adoption'] }
      ],
      createdAt: '2024-01-05',
      performance: {
        accuracy: 89,
        predictions: 89,
        successRate: 85
      }
    }
  ]

  // Phase 3 Mock Data
  const marketplaceItems: TrustMarketplaceItem[] = [
    {
      id: '1',
      title: 'Industry Trust Score Dataset',
      description: 'Comprehensive dataset of trust scores across 50+ industries with historical trends',
      category: 'data',
      price: 250,
      currency: 'USD',
      seller: 'TrustAnalytics Inc.',
      rating: 4.8,
      reviews: 156,
      downloads: 2340,
      isVerified: true,
      tags: ['industry', 'benchmarking', 'historical'],
      createdAt: '2024-01-15',
      lastUpdated: '2024-01-20'
    },
    {
      id: '2',
      title: 'AI Trust Prediction Model',
      description: 'Machine learning model for predicting trust score changes with 92% accuracy',
      category: 'models',
      price: 500,
      currency: 'TRUST',
      seller: 'MLTrust Solutions',
      rating: 4.9,
      reviews: 89,
      downloads: 567,
      isVerified: true,
      tags: ['AI', 'prediction', 'machine-learning'],
      createdAt: '2024-01-10',
      lastUpdated: '2024-01-18'
    },
    {
      id: '3',
      title: 'Compliance Risk Assessment API',
      description: 'Real-time compliance risk scoring for regulatory requirements',
      category: 'verification',
      price: 0.05,
      currency: 'ETH',
      seller: 'ComplianceTech',
      rating: 4.7,
      reviews: 234,
      downloads: 1200,
      isVerified: true,
      tags: ['compliance', 'risk', 'API'],
      createdAt: '2024-01-12',
      lastUpdated: '2024-01-19'
    }
  ]

  const networkMembers: TrustNetworkMember[] = [
    {
      id: '1',
      name: 'TechCorp Solutions',
      industry: 'Technology',
      trustScore: 92,
      verificationLevel: 'enterprise',
      isOnline: true,
      lastActive: '2024-01-20T10:30:00Z',
      mutualConnections: 15,
      sharedVerifications: 8,
      reputation: 95,
      specialties: ['Software Development', 'Cybersecurity', 'AI/ML'],
      location: 'San Francisco, CA',
      isConnected: true
    },
    {
      id: '2',
      name: 'FinanceFirst Bank',
      industry: 'Financial Services',
      trustScore: 88,
      verificationLevel: 'premium',
      isOnline: false,
      lastActive: '2024-01-19T16:45:00Z',
      mutualConnections: 12,
      sharedVerifications: 5,
      reputation: 92,
      specialties: ['Banking', 'Compliance', 'Risk Management'],
      location: 'New York, NY',
      isConnected: false
    },
    {
      id: '3',
      name: 'HealthTech Innovations',
      industry: 'Healthcare',
      trustScore: 85,
      verificationLevel: 'verified',
      isOnline: true,
      lastActive: '2024-01-20T09:15:00Z',
      mutualConnections: 8,
      sharedVerifications: 3,
      reputation: 88,
      specialties: ['Medical Technology', 'Data Privacy', 'HIPAA Compliance'],
      location: 'Boston, MA',
      isConnected: false
    }
  ]

  const blockchainRecords: BlockchainRecord[] = [
    {
      id: '1',
      transactionHash: '0x1234...5678',
      blockNumber: 18543210,
      timestamp: '2024-01-20T10:30:00Z',
      type: 'verification',
      data: {
        score: 85,
        verifier: 'TechCorp Solutions',
        verifiedBy: 'Blockchain Validator #1'
      },
      gasUsed: 21000,
      status: 'confirmed',
      network: 'ethereum'
    },
    {
      id: '2',
      transactionHash: '0x9876...5432',
      blockNumber: 18543211,
      timestamp: '2024-01-20T11:15:00Z',
      type: 'score_update',
      data: {
        score: 87,
        metadata: { reason: 'Compliance improvement' }
      },
      gasUsed: 45000,
      status: 'confirmed',
      network: 'polygon'
    },
    {
      id: '3',
      transactionHash: '0xabcd...efgh',
      blockNumber: 18543212,
      timestamp: '2024-01-20T12:00:00Z',
      type: 'attestation',
      data: {
        verifier: 'FinanceFirst Bank',
        verifiedBy: 'Network Validator #2'
      },
      gasUsed: 32000,
      status: 'pending',
      network: 'arbitrum'
    }
  ]

  const trustTokens: TrustToken = {
    id: '1',
    name: 'Trust Token',
    symbol: 'TRUST',
    balance: 1250,
    value: 2.50,
    currency: 'USD',
    earned: 1800,
    spent: 550,
    transactions: [
      {
        id: '1',
        type: 'earn',
        amount: 100,
        description: 'Trust score improvement reward',
        timestamp: '2024-01-20T10:30:00Z'
      },
      {
        id: '2',
        type: 'spend',
        amount: 50,
        description: 'Marketplace purchase - AI Model',
        timestamp: '2024-01-19T14:20:00Z'
      },
      {
        id: '3',
        type: 'earn',
        amount: 200,
        description: 'Network contribution bonus',
        timestamp: '2024-01-18T09:15:00Z'
      }
    ]
  }

  const apiMarketplaceItems: APIMarketplaceItem[] = [
    {
      id: '1',
      name: 'Trust Score Verification API',
      description: 'Verify trust scores and get detailed breakdowns',
      endpoint: '/api/v1/verify-trust-score',
      method: 'POST',
      pricing: {
        type: 'per_request',
        price: 0.10,
        currency: 'USD'
      },
      rateLimit: {
        requests: 1000,
        period: 'hour'
      },
      documentation: 'https://docs.trustapi.com/verify',
      isActive: true,
      category: 'Verification',
      provider: 'TrustAPI',
      version: '1.2.0'
    },
    {
      id: '2',
      name: 'Blockchain Trust Records API',
      description: 'Access immutable trust records from blockchain',
      endpoint: '/api/v1/blockchain-records',
      method: 'GET',
      pricing: {
        type: 'subscription',
        price: 99,
        currency: 'USD'
      },
      rateLimit: {
        requests: 10000,
        period: 'month'
      },
      documentation: 'https://docs.blocktrust.com/records',
      isActive: true,
      category: 'Blockchain',
      provider: 'BlockTrust',
      version: '2.0.1'
    },
    {
      id: '3',
      name: 'Network Analytics API',
      description: 'Get insights from the trust network',
      endpoint: '/api/v1/network-analytics',
      method: 'GET',
      pricing: {
        type: 'free',
        price: 0,
        currency: 'USD'
      },
      rateLimit: {
        requests: 100,
        period: 'day'
      },
      documentation: 'https://docs.networktrust.com/analytics',
      isActive: true,
      category: 'Analytics',
      provider: 'NetworkTrust',
      version: '1.0.0'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-600 bg-green-100'
      case 'good': return 'text-blue-600 bg-blue-100'
      case 'fair': return 'text-yellow-600 bg-yellow-100'
      case 'poor': return 'text-orange-600 bg-orange-100'
      case 'critical': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-500" />
      case 'down': return <TrendingDown className="w-4 h-4 text-red-500" />
      default: return <Minus className="w-4 h-4 text-gray-500" />
    }
  }

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-500" />
      case 'critical': return <AlertTriangle className="w-5 h-5 text-red-500" />
      case 'info': return <Info className="w-5 h-5 text-blue-500" />
      case 'success': return <CheckCircle className="w-5 h-5 text-green-500" />
      default: return <Info className="w-5 h-5 text-gray-500" />
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-red-600 bg-red-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'low': return 'text-green-600 bg-green-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Trust Score Dashboard</h1>
              <p className="text-gray-600 mt-1">Monitor and improve your organization's trustworthiness</p>
            </div>
            <div className="flex items-center space-x-3">
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                <RefreshCw className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                <Settings className="w-5 h-5" />
              </button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Export Report</span>
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6">
          <nav className="flex space-x-4 overflow-x-auto scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {[
              { id: 'overview', name: 'Overview', icon: BarChart3 },
              { id: 'breakdown', name: 'Breakdown', icon: Target },
              { id: 'history', name: 'History', icon: Clock },
              { id: 'recommendations', name: 'Recommendations', icon: Zap },
              { id: 'alerts', name: 'Alerts', icon: AlertTriangle },
              { id: 'benchmarking', name: 'Benchmarking', icon: Building },
              { id: 'predictive', name: 'Predictive', icon: TrendingUp },
              { id: 'external', name: 'External Data', icon: Globe },
              { id: 'marketplace', name: 'Marketplace', icon: ShoppingCart },
              { id: 'network', name: 'Network', icon: Users },
              { id: 'blockchain', name: 'Blockchain', icon: Link }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 py-4 px-3 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-4 h-4 flex-shrink-0" />
                <span className="hidden sm:inline">{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Overall Score Card */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-8 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold mb-2">Overall Trust Score</h2>
                  <div className="flex items-center space-x-4">
                    <div className="text-6xl font-bold">{overallScore}</div>
                    <div className="text-4xl font-bold text-blue-200">/ {maxOverallScore}</div>
                    <div className="text-2xl font-bold bg-white text-blue-600 px-3 py-1 rounded-lg">
                      {scoreGrade}
                    </div>
                  </div>
                  <p className="text-blue-100 mt-4">Your organization maintains a strong trust profile</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-300">+3</div>
                  <div className="text-blue-200">This month</div>
                </div>
              </div>
            </div>

            {/* Category Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trustScoreCategories.map((category) => {
                const IconComponent = category.icon
                return (
                  <div key={category.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <IconComponent className="w-8 h-8 text-blue-600" />
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
                          <p className="text-sm text-gray-600">{category.description}</p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(category.status)}`}>
                        {category.status}
                      </span>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-gray-900">{category.score}</span>
                        <span className="text-gray-500">/ {category.maxScore}</span>
                        <div className="flex items-center space-x-1">
                          {getTrendIcon(category.trend)}
                          <span className={`text-sm font-medium ${
                            category.trend === 'up' ? 'text-green-600' : 
                            category.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                          }`}>
                            {category.change > 0 ? '+' : ''}{category.change}
                          </span>
                        </div>
                      </div>
                      
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            category.score >= 90 ? 'bg-green-500' :
                            category.score >= 80 ? 'bg-blue-500' :
                            category.score >= 70 ? 'bg-yellow-500' :
                            category.score >= 60 ? 'bg-orange-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${(category.score / category.maxScore) * 100}%` }}
                        ></div>
                      </div>
                      
                      <div className="text-xs text-gray-500">
                        Weight: {(category.weight * 100).toFixed(0)}% • Last updated: {category.lastUpdated}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Recent Alerts */}
            <div className="bg-white rounded-xl border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Recent Alerts</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {alerts.slice(0, 3).map((alert) => (
                    <div key={alert.id} className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg">
                      {getAlertIcon(alert.type)}
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{alert.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{alert.description}</p>
                        <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                          <span>{alert.category}</span>
                          <span>•</span>
                          <span>{new Date(alert.timestamp).toLocaleDateString()}</span>
                        </div>
                      </div>
                      {alert.actionRequired && (
                        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                          {alert.actionText}
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'breakdown' && (
          <div className="space-y-6">
            {trustScoreCategories.map((category) => {
              const IconComponent = category.icon
              return (
                <div key={category.id} className="bg-white rounded-xl border border-gray-200">
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <IconComponent className="w-6 h-6 text-blue-600" />
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
                          <p className="text-sm text-gray-600">{category.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900">{category.score}</div>
                        <div className="text-sm text-gray-500">/ {category.maxScore}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="space-y-4">
                      {category.subcategories.map((subcategory) => (
                        <div key={subcategory.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3">
                              <h4 className="font-medium text-gray-900">{subcategory.name}</h4>
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getImpactColor(subcategory.impact)}`}>
                                {subcategory.impact} impact
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{subcategory.description}</p>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="text-right">
                              <div className="text-lg font-semibold text-gray-900">{subcategory.score}</div>
                              <div className="text-sm text-gray-500">/ {subcategory.maxScore}</div>
                            </div>
                            <div className="w-20 bg-gray-200 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${
                                  subcategory.score >= 90 ? 'bg-green-500' :
                                  subcategory.score >= 80 ? 'bg-blue-500' :
                                  subcategory.score >= 70 ? 'bg-yellow-500' :
                                  subcategory.score >= 60 ? 'bg-orange-500' : 'bg-red-500'
                                }`}
                                style={{ width: `${(subcategory.score / subcategory.maxScore) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {activeTab === 'history' && (
          <div className="bg-white rounded-xl border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Score History</h3>
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value as any)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="7d">Last 7 days</option>
                  <option value="30d">Last 30 days</option>
                  <option value="90d">Last 90 days</option>
                  <option value="1y">Last year</option>
                </select>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {scoreHistory.map((entry, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className={`w-3 h-3 rounded-full ${
                        entry.change > 0 ? 'bg-green-500' : 
                        entry.change < 0 ? 'bg-red-500' : 'bg-gray-500'
                      }`}></div>
                      <div>
                        <div className="font-medium text-gray-900">{entry.reason}</div>
                        <div className="text-sm text-gray-600">{entry.category}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="font-semibold text-gray-900">{entry.score}</div>
                        <div className="text-sm text-gray-500">{new Date(entry.date).toLocaleDateString()}</div>
                      </div>
                      <div className={`flex items-center space-x-1 ${
                        entry.change > 0 ? 'text-green-600' : 
                        entry.change < 0 ? 'text-red-600' : 'text-gray-600'
                      }`}>
                        {entry.change > 0 ? <ArrowUp className="w-4 h-4" /> : 
                         entry.change < 0 ? <ArrowDown className="w-4 h-4" /> : 
                         <Minus className="w-4 h-4" />}
                        <span className="font-medium">{Math.abs(entry.change)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'recommendations' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Improvement Recommendations</h3>
                <p className="text-gray-600 mt-1">AI-powered suggestions to improve your trust score</p>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  {recommendations.map((rec) => (
                    <div key={rec.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900">{rec.title}</h4>
                          <p className="text-gray-600 mt-1">{rec.description}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-green-600">+{rec.estimatedScoreIncrease}</div>
                          <div className="text-sm text-gray-500">points</div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <div className="text-sm text-gray-500">Impact</div>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getImpactColor(rec.impact)}`}>
                            {rec.impact}
                          </span>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Effort</div>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getImpactColor(rec.effort)}`}>
                            {rec.effort}
                          </span>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Timeframe</div>
                          <div className="text-sm font-medium text-gray-900">{rec.timeframe}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Priority</div>
                          <div className="text-sm font-medium text-gray-900">#{rec.priority}</div>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <div className="text-sm text-gray-500 mb-2">Resources Needed</div>
                        <div className="flex flex-wrap gap-2">
                          {rec.resources.map((resource, index) => (
                            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                              {resource}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                          Start Implementation
                        </button>
                        <button className="text-gray-600 hover:text-gray-800">
                          Learn More
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'alerts' && (
          <div className="bg-white rounded-xl border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Trust Score Alerts</h3>
              <p className="text-gray-600 mt-1">Monitor important changes and notifications</p>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {alerts.map((alert) => (
                  <div key={alert.id} className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg">
                    {getAlertIcon(alert.type)}
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-gray-900">{alert.title}</h4>
                        <span className="text-xs text-gray-500">
                          {new Date(alert.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{alert.description}</p>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                        <span>{alert.category}</span>
                        {alert.actionRequired && (
                          <>
                            <span>•</span>
                            <span className="text-orange-600 font-medium">Action Required</span>
                          </>
                        )}
                      </div>
                    </div>
                    {alert.actionRequired && (
                      <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                        {alert.actionText}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'benchmarking' && (
          <div className="space-y-6">
            {/* Industry Comparison */}
            <div className="bg-white rounded-xl border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Industry Benchmarking</h3>
                <p className="text-gray-600 mt-1">Compare your trust score against industry peers</p>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  {industryBenchmarks.map((benchmark) => (
                    <div key={benchmark.industry} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-semibold text-gray-900">{benchmark.industry}</h4>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-blue-600">{benchmark.percentile}th</div>
                          <div className="text-sm text-gray-500">percentile</div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-gray-900">{benchmark.yourScore}</div>
                          <div className="text-sm text-gray-500">Your Score</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-gray-700">{benchmark.averageScore}</div>
                          <div className="text-sm text-gray-500">Industry Average</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-gray-700">{benchmark.median}</div>
                          <div className="text-sm text-gray-500">Median</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-gray-700">{benchmark.topQuartile}</div>
                          <div className="text-sm text-gray-500">Top Quartile</div>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                          <span>Score Distribution</span>
                          <span>Rank: {benchmark.rank} of {benchmark.totalOrganizations}</span>
                        </div>
                        <div className="relative h-4 bg-gray-200 rounded-full">
                          <div className="absolute left-0 top-0 h-4 bg-red-200 rounded-l-full" style={{ width: '25%' }}></div>
                          <div className="absolute left-1/4 top-0 h-4 bg-yellow-200" style={{ width: '25%' }}></div>
                          <div className="absolute left-1/2 top-0 h-4 bg-blue-200" style={{ width: '25%' }}></div>
                          <div className="absolute left-3/4 top-0 h-4 bg-green-200 rounded-r-full" style={{ width: '25%' }}></div>
                          <div 
                            className="absolute top-0 h-4 w-1 bg-gray-800 rounded-full"
                            style={{ left: `${benchmark.percentile}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>Bottom 25%</span>
                          <span>Top 25%</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                          View Detailed Comparison
                        </button>
                        <button className="text-gray-600 hover:text-gray-800">
                          Export Benchmark Report
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Custom Scoring Models */}
            <div className="bg-white rounded-xl border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Custom Scoring Models</h3>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                    Create New Model
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {customScoringModels.map((model) => (
                    <div key={model.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-gray-900">{model.name}</h4>
                          <p className="text-sm text-gray-600">{model.description}</p>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            model.isActive ? 'text-green-600 bg-green-100' : 'text-gray-600 bg-gray-100'
                          }`}>
                            {model.isActive ? 'Active' : 'Inactive'}
                          </span>
                          <button className="text-blue-600 hover:text-blue-700 text-sm">
                            Configure
                          </button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <div className="text-gray-500">Accuracy</div>
                          <div className="font-semibold text-gray-900">{model.performance.accuracy}%</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Predictions</div>
                          <div className="font-semibold text-gray-900">{model.performance.predictions}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Success Rate</div>
                          <div className="font-semibold text-gray-900">{model.performance.successRate}%</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'predictive' && (
          <div className="space-y-6">
            {/* Predictive Insights */}
            <div className="bg-white rounded-xl border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Predictive Analytics</h3>
                <p className="text-gray-600 mt-1">AI-powered insights and risk forecasting</p>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  {predictiveInsights.map((insight) => (
                    <div key={insight.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${
                            insight.type === 'risk' ? 'bg-red-500' :
                            insight.type === 'opportunity' ? 'bg-green-500' : 'bg-blue-500'
                          }`}></div>
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900">{insight.title}</h4>
                            <p className="text-gray-600 mt-1">{insight.description}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-gray-900">{insight.probability}%</div>
                          <div className="text-sm text-gray-500">probability</div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <div className="text-sm text-gray-500">Impact</div>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getImpactColor(insight.impact)}`}>
                            {insight.impact}
                          </span>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Timeframe</div>
                          <div className="text-sm font-medium text-gray-900">{insight.timeframe}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Confidence</div>
                          <div className="text-sm font-medium text-gray-900">{insight.confidence}%</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Type</div>
                          <div className="text-sm font-medium text-gray-900 capitalize">{insight.type}</div>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <div className="text-sm text-gray-500 mb-2">Key Factors</div>
                        <div className="flex flex-wrap gap-2">
                          {insight.factors.map((factor, index) => (
                            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                              {factor}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <div className="text-sm text-gray-500 mb-2">Recommendations</div>
                        <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                          {insight.recommendations.map((rec, index) => (
                            <li key={index}>{rec}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                          Take Action
                        </button>
                        <button className="text-gray-600 hover:text-gray-800">
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Risk Forecast Chart */}
            <div className="bg-white rounded-xl border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Risk Forecast</h3>
                <p className="text-gray-600 mt-1">Predicted trust score changes over the next 12 months</p>
              </div>
              <div className="p-6">
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <TrendingUp className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Risk Forecast Chart</h4>
                    <p className="text-gray-600">Interactive chart showing predicted score changes</p>
                    <p className="text-sm text-gray-500 mt-2">Expected improvement: +8 points over 12 months</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'external' && (
          <div className="space-y-6">
            {/* External Data Sources */}
            <div className="bg-white rounded-xl border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">External Data Sources</h3>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                    Add Data Source
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {externalDataSources.map((source) => (
                    <div key={source.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${
                            source.status === 'connected' ? 'bg-green-500' :
                            source.status === 'pending' ? 'bg-yellow-500' :
                            source.status === 'error' ? 'bg-red-500' : 'bg-gray-500'
                          }`}></div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{source.name}</h4>
                            <p className="text-sm text-gray-600">{source.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            source.status === 'connected' ? 'text-green-600 bg-green-100' :
                            source.status === 'pending' ? 'text-yellow-600 bg-yellow-100' :
                            source.status === 'error' ? 'text-red-600 bg-red-100' : 'text-gray-600 bg-gray-100'
                          }`}>
                            {source.status}
                          </span>
                          <button className="text-blue-600 hover:text-blue-700 text-sm">
                            Configure
                          </button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <div className="text-gray-500">Type</div>
                          <div className="font-semibold text-gray-900 capitalize">{source.type}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Data Points</div>
                          <div className="font-semibold text-gray-900">{source.dataPoints}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Reliability</div>
                          <div className="font-semibold text-gray-900">{source.reliability}%</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Last Sync</div>
                          <div className="font-semibold text-gray-900">
                            {new Date(source.lastSync).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Data Integration Status */}
            <div className="bg-white rounded-xl border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Integration Status</h3>
                <p className="text-gray-600 mt-1">Real-time data integration and sync status</p>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">3 Connected</h4>
                    <p className="text-sm text-gray-600">Active data sources</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Clock className="w-8 h-8 text-yellow-600" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">1 Pending</h4>
                    <p className="text-sm text-gray-600">Awaiting connection</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <RefreshCw className="w-8 h-8 text-blue-600" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">268 Data Points</h4>
                    <p className="text-sm text-gray-600">Total integrated data</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'marketplace' && (
          <div className="space-y-6">
            {/* Trust Tokens Balance */}
            <div className="bg-white rounded-xl border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Trust Tokens</h3>
                <p className="text-gray-600 mt-1">Your digital currency for trust ecosystem transactions</p>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">{trustTokens.balance}</div>
                    <div className="text-sm text-gray-500">TRUST Tokens</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">${(trustTokens.balance * trustTokens.value).toFixed(2)}</div>
                    <div className="text-sm text-gray-500">USD Value</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900">{trustTokens.earned}</div>
                    <div className="text-sm text-gray-500">Total Earned</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900">{trustTokens.spent}</div>
                    <div className="text-sm text-gray-500">Total Spent</div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Recent Transactions</h4>
                  <div className="space-y-3">
                    {trustTokens.transactions.map((transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className={`w-2 h-2 rounded-full ${
                            transaction.type === 'earn' ? 'bg-green-500' :
                            transaction.type === 'spend' ? 'bg-red-500' : 'bg-blue-500'
                          }`}></div>
                          <div>
                            <div className="font-medium text-gray-900">{transaction.description}</div>
                            <div className="text-sm text-gray-500">
                              {new Date(transaction.timestamp).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                        <div className={`font-semibold ${
                          transaction.type === 'earn' ? 'text-green-600' :
                          transaction.type === 'spend' ? 'text-red-600' : 'text-blue-600'
                        }`}>
                          {transaction.type === 'earn' ? '+' : '-'}{transaction.amount} TRUST
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Marketplace Items */}
            <div className="bg-white rounded-xl border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Trust Marketplace</h3>
                  <div className="flex items-center space-x-3">
                    <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
                      <option>All Categories</option>
                      <option>Data</option>
                      <option>Models</option>
                      <option>Verification</option>
                    </select>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                      Sell Item
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {marketplaceItems.map((item) => (
                    <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            item.category === 'data' ? 'bg-blue-100 text-blue-600' :
                            item.category === 'models' ? 'bg-purple-100 text-purple-600' :
                            item.category === 'verification' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                          }`}>
                            {item.category}
                          </span>
                          {item.isVerified && (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          )}
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-gray-900">
                            {item.price} {item.currency}
                          </div>
                        </div>
                      </div>
                      
                      <h4 className="font-semibold text-gray-900 mb-2">{item.title}</h4>
                      <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span>{item.rating}</span>
                          <span>({item.reviews})</span>
                        </div>
                        <div>{item.downloads} downloads</div>
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mb-4">
                        {item.tags.map((tag, index) => (
                          <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-500">
                          by {item.seller}
                        </div>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm">
                          Purchase
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* API Marketplace */}
            <div className="bg-white rounded-xl border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">API Marketplace</h3>
                <p className="text-gray-600 mt-1">Integrate trust data into your applications</p>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {apiMarketplaceItems.map((api) => (
                    <div key={api.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-gray-900">{api.name}</h4>
                          <p className="text-sm text-gray-600">{api.description}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-gray-900">
                            {api.pricing.type === 'free' ? 'Free' : 
                             `${api.pricing.price} ${api.pricing.currency}/${api.pricing.type === 'per_request' ? 'request' : 'month'}`}
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm mb-3">
                        <div>
                          <div className="text-gray-500">Endpoint</div>
                          <div className="font-mono text-gray-900">{api.endpoint}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Method</div>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            api.method === 'GET' ? 'bg-green-100 text-green-600' :
                            api.method === 'POST' ? 'bg-blue-100 text-blue-600' :
                            api.method === 'PUT' ? 'bg-yellow-100 text-yellow-600' : 'bg-red-100 text-red-600'
                          }`}>
                            {api.method}
                          </span>
                        </div>
                        <div>
                          <div className="text-gray-500">Rate Limit</div>
                          <div className="font-medium text-gray-900">
                            {api.rateLimit.requests}/{api.rateLimit.period}
                          </div>
                        </div>
                        <div>
                          <div className="text-gray-500">Provider</div>
                          <div className="font-medium text-gray-900">{api.provider}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            api.isActive ? 'text-green-600 bg-green-100' : 'text-gray-600 bg-gray-100'
                          }`}>
                            {api.isActive ? 'Active' : 'Inactive'}
                          </span>
                          <span className="text-sm text-gray-500">v{api.version}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button className="text-blue-600 hover:text-blue-700 text-sm">
                            View Docs
                          </button>
                          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm">
                            Subscribe
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'network' && (
          <div className="space-y-6">
            {/* Network Overview */}
            <div className="bg-white rounded-xl border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Trust Network</h3>
                <p className="text-gray-600 mt-1">Connect with verified organizations and build trust relationships</p>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="w-8 h-8 text-blue-600" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">1,247</h4>
                    <p className="text-sm text-gray-600">Network Members</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">35</h4>
                    <p className="text-sm text-gray-600">Your Connections</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Shield className="w-8 h-8 text-purple-600" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">156</h4>
                    <p className="text-sm text-gray-600">Shared Verifications</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Star className="w-8 h-8 text-yellow-600" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">4.8</h4>
                    <p className="text-sm text-gray-600">Network Rating</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Network Members */}
            <div className="bg-white rounded-xl border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Network Members</h3>
                  <div className="flex items-center space-x-3">
                    <input
                      type="text"
                      placeholder="Search members..."
                      className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
                    />
                    <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
                      <option>All Industries</option>
                      <option>Technology</option>
                      <option>Financial Services</option>
                      <option>Healthcare</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {networkMembers.map((member) => (
                    <div key={member.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-4">
                          <div className="relative">
                            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                              <Building className="w-6 h-6 text-gray-600" />
                            </div>
                            {member.isOnline && (
                              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                            )}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{member.name}</h4>
                            <p className="text-sm text-gray-600">{member.industry} • {member.location}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="text-right">
                            <div className="text-lg font-bold text-gray-900">{member.trustScore}</div>
                            <div className="text-sm text-gray-500">Trust Score</div>
                          </div>
                          <button className={`px-4 py-2 rounded-lg text-sm font-medium ${
                            member.isConnected 
                              ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
                              : 'bg-blue-600 text-white hover:bg-blue-700'
                          }`}>
                            {member.isConnected ? 'Connected' : 'Connect'}
                          </button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm mb-3">
                        <div>
                          <div className="text-gray-500">Verification Level</div>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            member.verificationLevel === 'enterprise' ? 'text-purple-600 bg-purple-100' :
                            member.verificationLevel === 'premium' ? 'text-blue-600 bg-blue-100' :
                            member.verificationLevel === 'verified' ? 'text-green-600 bg-green-100' : 'text-gray-600 bg-gray-100'
                          }`}>
                            {member.verificationLevel}
                          </span>
                        </div>
                        <div>
                          <div className="text-gray-500">Mutual Connections</div>
                          <div className="font-medium text-gray-900">{member.mutualConnections}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Shared Verifications</div>
                          <div className="font-medium text-gray-900">{member.sharedVerifications}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Reputation</div>
                          <div className="font-medium text-gray-900">{member.reputation}%</div>
                        </div>
                      </div>
                      
                      <div className="mb-3">
                        <div className="text-sm text-gray-500 mb-2">Specialties</div>
                        <div className="flex flex-wrap gap-2">
                          {member.specialties.map((specialty, index) => (
                            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                              {specialty}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-500">
                          Last active: {new Date(member.lastActive).toLocaleDateString()}
                        </div>
                        <div className="flex items-center space-x-2">
                          <button className="text-blue-600 hover:text-blue-700 text-sm">
                            View Profile
                          </button>
                          <button className="text-blue-600 hover:text-blue-700 text-sm">
                            Message
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'blockchain' && (
          <div className="space-y-6">
            {/* Blockchain Overview */}
            <div className="bg-white rounded-xl border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Blockchain Trust Records</h3>
                <p className="text-gray-600 mt-1">Immutable trust records stored on blockchain networks</p>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Link className="w-8 h-8 text-blue-600" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">3</h4>
                    <p className="text-sm text-gray-600">Active Networks</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">2,847</h4>
                    <p className="text-sm text-gray-600">Confirmed Records</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Clock className="w-8 h-8 text-yellow-600" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">3</h4>
                    <p className="text-sm text-gray-600">Pending Records</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Shield className="w-8 h-8 text-purple-600" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">99.9%</h4>
                    <p className="text-sm text-gray-600">Uptime</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Blockchain Records */}
            <div className="bg-white rounded-xl border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Blockchain Records</h3>
                  <div className="flex items-center space-x-3">
                    <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
                      <option>All Networks</option>
                      <option>Ethereum</option>
                      <option>Polygon</option>
                      <option>Arbitrum</option>
                    </select>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                      Add Record
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {blockchainRecords.map((record) => (
                    <div key={record.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${
                            record.status === 'confirmed' ? 'bg-green-500' :
                            record.status === 'pending' ? 'bg-yellow-500' : 'bg-red-500'
                          }`}></div>
                          <div>
                            <h4 className="font-semibold text-gray-900 capitalize">{record.type.replace('_', ' ')}</h4>
                            <p className="text-sm text-gray-600">
                              Block #{record.blockNumber} • {new Date(record.timestamp).toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            record.status === 'confirmed' ? 'text-green-600 bg-green-100' :
                            record.status === 'pending' ? 'text-yellow-600 bg-yellow-100' : 'text-red-600 bg-red-100'
                          }`}>
                            {record.status}
                          </span>
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-600">
                            {record.network}
                          </span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-3">
                        <div>
                          <div className="text-gray-500">Transaction Hash</div>
                          <div className="font-mono text-gray-900 text-xs">{record.transactionHash}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Gas Used</div>
                          <div className="font-medium text-gray-900">{record.gasUsed.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Network</div>
                          <div className="font-medium text-gray-900 capitalize">{record.network}</div>
                        </div>
                      </div>
                      
                      {record.data && (
                        <div className="mb-3">
                          <div className="text-sm text-gray-500 mb-2">Record Data</div>
                          <div className="bg-gray-50 rounded-lg p-3">
                            <pre className="text-xs text-gray-700 whitespace-pre-wrap">
                              {JSON.stringify(record.data, null, 2)}
                            </pre>
                          </div>
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-500">
                          {record.status === 'confirmed' ? 'Confirmed' : 
                           record.status === 'pending' ? 'Pending confirmation' : 'Failed to confirm'}
                        </div>
                        <div className="flex items-center space-x-2">
                          <button className="text-blue-600 hover:text-blue-700 text-sm">
                            View on Explorer
                          </button>
                          <button className="text-blue-600 hover:text-blue-700 text-sm">
                            Download Proof
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Network Status */}
            <div className="bg-white rounded-xl border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Network Status</h3>
                <p className="text-gray-600 mt-1">Real-time status of blockchain networks</p>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {[
                    { name: 'Ethereum', status: 'operational', latency: '2.3s', gasPrice: '25 gwei' },
                    { name: 'Polygon', status: 'operational', latency: '1.1s', gasPrice: '30 gwei' },
                    { name: 'Arbitrum', status: 'operational', latency: '0.8s', gasPrice: '0.1 gwei' }
                  ].map((network) => (
                    <div key={network.name} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{network.name}</h4>
                          <p className="text-sm text-gray-600">Latency: {network.latency}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-900">{network.gasPrice}</div>
                        <div className="text-sm text-gray-500">Gas Price</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default TrustScore

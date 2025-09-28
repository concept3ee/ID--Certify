import React, { useState, useEffect } from 'react'
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  CheckCircle,
    Clock,
    AlertTriangle,
    XCircle,
    ChevronRight,
    ChevronLeft,
    Download,
    ArrowLeft,
    X,
    Edit3,
  Save,
  Eye,
  EyeOff,
  CreditCard,
  Upload,
  FileText,
  Plus,
  Trash2,
  ChevronDown
} from 'lucide-react'

interface BackgroundCheckRequest {
  id: string
  orderNumber: string
  firstName: string
  middleName: string
  lastName: string
  candidateEmail: string
  candidatePhone: string
  countryCode: string
  profileImage: File | null
  requestDate: string
  status: 'draft' | 'submitted' | 'in-progress' | 'completed' | 'failed'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  assignedTo: string
  completionDate?: string
  reportUrl?: string
  cost: number
  checks: {
    personalIdentity: boolean
    criminalRecord: boolean
    financialCredit: boolean
    fraudDetection: boolean
    education: boolean
    employment: boolean
    medical: boolean
    socialMedia: boolean
    association: boolean
  }
  results?: {
    personalIdentity: 'pending' | 'completed' | 'failed' | 'inconsistent' | 'in-progress'
    criminalRecord: 'pending' | 'completed' | 'failed' | 'inconsistent' | 'in-progress'
    financialCredit: 'pending' | 'completed' | 'failed' | 'inconsistent' | 'in-progress'
    fraudDetection: 'pending' | 'completed' | 'failed' | 'inconsistent' | 'in-progress'
    education: 'pending' | 'completed' | 'failed' | 'inconsistent' | 'in-progress'
    employment: 'pending' | 'completed' | 'failed' | 'inconsistent' | 'in-progress'
    medical: 'pending' | 'completed' | 'failed' | 'inconsistent' | 'in-progress'
    socialMedia: 'pending' | 'completed' | 'failed' | 'inconsistent' | 'in-progress'
    association: 'pending' | 'completed' | 'failed' | 'inconsistent' | 'in-progress'
  }
  details?: {
    personalIdentity: {
      address: string
      lga: string
      city: string
      state: string
      bvn: string
      nin: string
      frscHistory: string
      stateResidency: string
      nameChange: string
      email: string
      // Multiple addresses support
      addresses?: Array<{
        id: string
        addressType: string
        residenceFrom: string
        residenceTo: string
        street: string
        buildingNumber: string
        city: string
        state: string
      }>
      // Enhanced address fields
      addressType: string
      residenceFrom: string
      residenceTo: string
      street: string
      buildingNumber: string
      postalCode: string
      country: string
      landmark: string
      propertyType: string
      verificationMethod: string
      lastVerified: string
      // Document upload fields
      billingDocument: File | null
      lightBill: File | null
      waterBill: File | null
      tenancyAgreement: File | null
      otherDocuments: File[]
      // FRSC fields
      licenseNumber: string
      licenseClass: string
      licenseIssueDate: string
      licenseExpiryDate: string
      vehicleRegistration: string
      vehicleMakeModel: string
      trafficViolations: string
      accidentHistory: string
      licenseStatus: string
      licensePoints: string
      // State Residency fields
      currentState: string
      previousStates: string
      residencyType: string
      residencyStatus: string
      residencyDocuments: string
      // Birth Certificate fields
      birthCertNumber: string
      dateOfBirth: string
      placeOfBirth: string
      stateOfBirth: string
      registrationDate: string
      registrationOffice: string
      fathersName: string
      mothersName: string
      gender: string
      birthWeight: string
      certificateStatus: string
      issuingAuthority: string
      // Passport fields
      passportNumber: string
      passportType: string
      passportIssueDate: string
      passportExpiryDate: string
      passportIssuingCountry: string
      passportIssuingAuthority: string
      passportFullName: string
      passportDateOfBirth: string
      passportPlaceOfBirth: string
      passportNationality: string
      passportStatus: string
      passportPages: string
      passportTravelHistory: string
      passportVisaStatus: string
      // Name Change fields
      currentFullName: string
      nameChangeDate: string
      previousFullName: string
      birthName: string
      nameChangeReason: string
      nameChangeType: string
      courtOrderNumber: string
      courtOrderDate: string
      issuingCourt: string
      nameChangeStatus: string
      allPreviousNames: string
      nameChangeDocuments: string
      nameChangeAdditionalInfo: string
    }
    criminalRecord: {
      criminalHistory: string
      courtRecords: string
      arrestRecords: string
      // Enhanced criminal history fields
      criminalRecordStatus: string
      lastCriminalCheckDate: string
      numberOfArrests: string
      numberOfConvictions: string
      mostRecentOffenseDate: string
      offenseType: string
      specificCharges: string
      criminalCourtJurisdiction: string
      caseStatus: string
      sentenceType: string
      sentenceDuration: string
      additionalCriminalInfo: string
      // Enhanced financial crime fields
      financialCrimeStatus: string
      lastFinancialCheckDate: string
      primaryCrimeType: string
      amountInvolved: string
      incidentDate: string
      discoveryDate: string
      financialCrimeJurisdiction: string
      caseNumber: string
      financialCaseStatus: string
      resolutionDate: string
      financialLoss: string
      recoveryAmount: string
      additionalFinancialCrimes: string
      investigationDetails: string
      additionalFinancialCrimeInfo: string
      // Enhanced court records fields
      courtRecordsStatus: string
      lastCourtCheckDate: string
      courtType: string
      courtName: string
      courtCaseNumber: string
      caseType: string
      filingDate: string
      courtCaseStatus: string
      courtJurisdiction: string
      courtLocation: string
      caseDescription: string
      caseOutcome: string
      courtResolutionDate: string
      additionalCourtRecords: string
      additionalCourtInfo: string
      // Enhanced sex offender registry fields
      sexOffenderRegistryStatus: string
      lastRegistryCheckDate: string
      primaryRegistryState: string
      registryNumber: string
      registryDate: string
      registryExpiryDate: string
      sexOffenseType: string
      sexOffenseDate: string
      additionalRegistryStates: string
      registryVerificationMethod: string
      registryVerificationAgency: string
      additionalRegistryInfo: string
    }
    financialCredit: {
      creditScore: number
      creditHistory: string
      financialRecords: string
      // Enhanced credit report fields
      creditRating: string
      lastCreditCheckDate: string
      primaryCreditBureau: string
      creditReportNumber: string
      creditHistoryLength: string
      numberOfCreditAccounts: string
      paymentHistoryStatus: string
      numberOfLatePayments: string
      creditUtilizationRate: string
      totalCreditLimit: string
      hardInquiries: string
      softInquiries: string
      bankruptcies: string
      collections: string
      creditHistorySummary: string
      additionalCreditInfo: string
      // Enhanced income sources fields
      monthlyIncome: number
      annualIncome: number
      incomeVerificationDate: string
      primaryIncomeSource: string
      employmentStatus: string
      employerName: string
      jobTitle: string
      employmentStartDate: string
      employmentEndDate: string
      secondaryIncomeSource: string
      secondaryIncomeAmount: number
      incomeVerificationMethod: string
      incomeVerificationAgency: string
      incomeStability: string
      incomeFrequency: string
      incomeSummary: string
      additionalIncomeInfo: string
      // Enhanced outstanding debts fields
      totalOutstandingDebt: number
      debtStatus: string
      lastDebtCheckDate: string
      creditCardDebt: number
      numberOfCreditCards: number
      personalLoanDebt: number
      mortgageDebt: number
      monthlyDebtPayments: number
      debtToIncomeRatio: number
      debtSummary: string
      // Enhanced business financial fields
      businessName: string
      businessRegistrationNumber: string
      businessType: string
      businessStatus: string
      annualRevenue: number
      businessAssets: number
      businessLiabilities: number
      businessRegistrationDate: string
      businessAddress: string
      businessTIN: string
      taxComplianceStatus: string
      businessFinancialSummary: string
      // Enhanced loan history fields
      totalLoansApplied: number
      totalLoansApproved: number
      totalLoanAmount: number
      currentActiveLoans: number
      outstandingLoanBalance: number
      primaryLoanType: string
      loanStatus: string
      latePayments30Days: number
      latePayments90Days: number
      loanHistorySummary: string
      // Enhanced FIRS history fields
      firsTIN: string
      firsTINRegistrationDate: string
      firsComplianceStatus: string
      lastTaxFilingDate: string
      annualTaxAssessment: number
      taxPaidLastYear: number
      outstandingTax: number
      taxPenalties: number
      taxAuditStatus: string
      firsHistorySummary: string
      // Multiple income sources
      incomeSourceEntries?: Array<{
        id: string
        sourceType: string
        sourceDescription: string
        monthlyAmount: number
        annualAmount: number
        frequency: string
        verificationMethod: string
        verificationStatus: string
        employerName: string
        startDate: string
        endDate: string
        stability: string
        paymentMethod: string
      }>
    }
    fraudDetection: {
      fraudAlerts: string
      identityTheft: string
      suspiciousActivity: string
      // Enhanced identity fraud check fields
      fraudRiskLevel: string
      identityVerificationScore: number
      syntheticIdentityRisk: string
      identityTheftRisk: string
      documentFraudRisk: string
      identityFraudIndicators: string
      identityFraudCheckSummary: string
      // Enhanced watchlist check fields
      watchlistStatus: string
      databasesChecked: string
      sanctionsListCheck: string
      pepCheck: string
      adverseMediaCheck: string
      watchlistMatches: string
      watchlistCheckSummary: string
      // Enhanced device fingerprint fields
      deviceType: string
      browser: string
      operatingSystem: string
      screenResolution: string
      ipAddress: string
      deviceRiskScore: number
      deviceTrustLevel: string
      deviceFingerprintAnalysis: string
      deviceFingerprintSummary: string
    }
    education: {
      institution: string
      degree: string
      graduationDate: string
      verificationStatus: string
      // Enhanced degree verification fields
      institutionName: string
      degreeType: string
      fieldOfStudy: string
      graduationYear: number
      gpaClassOfDegree: string
      institutionLocation: string
      institutionType: string
      degreeVerificationSummary: string
      // Enhanced transcript verification fields
      transcriptGpa: string
      gradingScale: string
      classOfDegree: string
      totalCreditHours: number
      transcriptStatus: string
      keyCourses: string
      transcriptVerificationSummary: string
      // Enhanced professional certifications fields
      certificationName: string
      issuingOrganization: string
      certificationType: string
      certificationIssueDate: string
      certificationExpiryDate: string
      certificationStatus: string
      certificationNumber: string
      certificationDescription: string
      professionalCertificationsVerificationSummary: string
      // Multiple degree entries
      degreeEntries?: Array<{
        id: string
        institutionName: string
        degreeType: string
        fieldOfStudy: string
        graduationYear: number
        gpaClassOfDegree: string
        institutionLocation: string
        institutionType: string
        verificationStatus: string
        expectedGraduationDate: string
        currentlyEnrolled: boolean
        degreeLevel: string
      }>
    }
    employment: {
      currentEmployer: string
      previousEmployers: string
      employmentHistory: string
      // Enhanced employment history fields
      currentPosition: string
      employmentStartDate: string
      employmentStatus: string
      salaryRange: string
      previousEmploymentHistory: string
      employmentVerificationSummary: string
      // Enhanced reference check fields
      referenceName: string
      referencePosition: string
      referenceCompany: string
      referencePhone: string
      referenceEmail: string
      referenceRelationship: string
      referenceStatus: string
      referenceFeedback: string
      // Enhanced background gap analysis fields
      gapPeriodStart: string
      gapPeriodEnd: string
      gapDurationMonths: number
      gapType: string
      gapStatus: string
      gapExplanation: string
      gapAnalysisSummary: string
      // Multiple employment entries
      employmentEntries?: Array<{
        id: string
        companyName: string
        position: string
        startDate: string
        endDate: string
        employmentType: string
        salary: string
        responsibilities: string
        reasonForLeaving: string
        supervisorName: string
        supervisorContact: string
      }>
    }
    medical: {
      medicalHistory: string
      drugTest: string
      healthRecords: string
      // Enhanced medical history fields
      overallHealthStatus: string
      lastMedicalCheckup: string
      chronicMedicalConditions: string
      currentMedications: string
      allergies: string
      bloodType: string
      disabilityStatus: string
      medicalHistorySummary: string
      // Enhanced drug test fields
      drugTestType: string
      drugTestResult: string
      drugTestDate: string
      drugTestingFacility: string
      drugTestPanel: string
      substancesTested: string
      positiveSubstances: string
      drugTestSummary: string
      // Enhanced fitness assessment fields
      overallFitnessLevel: string
      fitnessAssessmentDate: string
      height: number
      weight: number
      bmi: number
      cardiovascularFitness: string
      muscularStrength: string
      physicalLimitations: string
      workplaceAccommodations: string
      fitnessAssessmentSummary: string
    }
    socialMedia: {
      socialProfiles: string
      onlinePresence: string
      reputationCheck: string
      // Enhanced news articles & public mentions fields
      searchKeywords: string
      searchPeriod: string
      totalArticlesFound: number
      positiveMentions: number
      negativeMentions: number
      newsArticlesAnalysis: string
      newsArticlesSummary: string
      // Enhanced online content & reputation analysis fields
      contentType: string
      contentSentiment: string
      totalContentFound: number
      engagementScore: number
      contentQualityScore: number
      onlineContentAnalysis: string
      onlineContentSummary: string
      // Enhanced social media profiles fields
      primaryPlatform: string
      profileStatus: string
      followersCount: number
      postsCount: number
      engagementRate: number
      socialMediaAnalysis: string
      socialMediaSummary: string
      // Enhanced reputation score fields
      overallReputationScore: number
      scoreCategory: string
      professionalReputationScore: number
      socialMediaReputationScore: number
      onlinePresenceScore: number
      reputationScoreAnalysis: string
      reputationScoreSummary: string
      // Enhanced thought leadership fields
      thoughtLeadershipContentType: string
      industryFocus: string
      totalPublications: number
      speakingEngagements: number
      influenceScore: number
      thoughtLeadershipAnalysis: string
      thoughtLeadershipSummary: string
    }
    association: {
      knownAssociates: string
      familyConnections: string
      businessAssociations: string
      // Enhanced political exposure fields
      pepStatus: string
      politicalPosition: string
      governmentLevel: string
      positionDuration: string
      familyMemberPEPStatus: string
      closeAssociatePEPStatus: string
      politicalExposureSummary: string
      // Enhanced professional bodies fields
      professionalBodyName: string
      professionalBodyMembershipNumber: string
      professionalBodyMembershipStartDate: string
      professionalBodyMembershipStatus: string
      professionalBodyCertificationLevel: string
      additionalProfessionalBodies: string
      // Enhanced alumni networks fields
      alumniInstitutionName: string
      alumniInstitutionType: string
      alumniDegreeProgram: string
      alumniGraduationYear: number
      alumniStatus: string
      alumniNetworkParticipation: string
      alumniEventsAttended: number
      additionalAlumniNetworks: string
      // Enhanced exclusive associations fields
      exclusiveClubName: string
      exclusiveMembershipType: string
      exclusiveMembershipStartDate: string
      exclusiveMembershipStatus: string
      additionalExclusiveAssociations: string
      // Enhanced professional associations fields
      professionalAssociationName: string
      professionalMembershipNumber: string
      professionalMembershipStartDate: string
      professionalMembershipStatus: string
      professionalCertificationLevel: string
      additionalProfessionalAssociations: string
      // Enhanced business associations fields
      businessAssociationName: string
      businessAssociationType: string
      businessMembershipStartDate: string
      businessMembershipStatus: string
      businessLeadershipRole: string
      additionalBusinessAssociations: string
      // Enhanced social associations fields
      socialAssociationName: string
      socialAssociationType: string
      socialMembershipStartDate: string
      socialMembershipStatus: string
      socialVolunteerHours: number
      additionalSocialAssociations: string
    }
  }
  notes?: string
  tags?: string[]
}

interface PreFilledData {
  firstName: string
  middleName: string
  lastName: string
  candidateEmail: string
  idcertifyId: string
}

interface BackgroundCheckRequestFormProps {
  requestId?: string
  entityType?: 'individual' | 'organization' | null
  isRegistered?: boolean | null
  preFilledData?: PreFilledData
  onClose: () => void
  onSave?: (request: BackgroundCheckRequest) => void
}

const BackgroundCheckRequestForm: React.FC<BackgroundCheckRequestFormProps> = ({
  requestId,
  entityType,
  isRegistered,
  preFilledData,
  onClose,
  onSave
}) => {
  const [isEditing, setIsEditing] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('personalIdentity')
  const [selectedSubTab, setSelectedSubTab] = useState('address')
  const [showDetails, setShowDetails] = useState(false)
  const [expandedAddresses, setExpandedAddresses] = useState<Set<string>>(new Set(['addr-1']))
  const [expandedEmployments, setExpandedEmployments] = useState<Set<string>>(new Set(['emp-1']))
  const [expandedDegrees, setExpandedDegrees] = useState<Set<string>>(new Set(['deg-1']))
  const [expandedIncomeSources, setExpandedIncomeSources] = useState<Set<string>>(new Set(['income-1']))
  // Payment flow states
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [showOTPModal, setShowOTPModal] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', ''])
  const [isPaymentPanelCollapsed, setIsPaymentPanelCollapsed] = useState(false)
  const [uploadedBirthCertificate, setUploadedBirthCertificate] = useState<File | null>(null)
  
  // Address verification document uploads
  const [uploadedBillingDocument, setUploadedBillingDocument] = useState<File | null>(null)
  const [uploadedLightBill, setUploadedLightBill] = useState<File | null>(null)
  const [uploadedWaterBill, setUploadedWaterBill] = useState<File | null>(null)
  const [uploadedTenancyAgreement, setUploadedTenancyAgreement] = useState<File | null>(null)
  const [uploadedOtherDocuments, setUploadedOtherDocuments] = useState<File[]>([])
  
  // Name change document uploads
  const [uploadedNameChangeDocuments, setUploadedNameChangeDocuments] = useState<File[]>([])
  
  // Passport document uploads
  const [uploadedPassportDocuments, setUploadedPassportDocuments] = useState<File[]>([])

  // Employment document upload state
  const [uploadedEmploymentDocuments, setUploadedEmploymentDocuments] = useState<{
    employmentLetter: File | null
    paySlip: File | null
    referenceLetter: File | null
    backgroundGapDocument: File | null
  }>({
    employmentLetter: null,
    paySlip: null,
    referenceLetter: null,
    backgroundGapDocument: null
  })

  // Education document upload state
  const [uploadedEducationDocuments, setUploadedEducationDocuments] = useState<{
    degreeCertificate: File | null
    transcript: File | null
    professionalCertification: File | null
    additionalEducationDocuments: File[]
  }>({
    degreeCertificate: null,
    transcript: null,
    professionalCertification: null,
    additionalEducationDocuments: []
  })

  // Fraud detection document upload state
  const [uploadedFraudDocuments, setUploadedFraudDocuments] = useState<{
    identityFraudReport: File | null
    watchlistReport: File | null
    deviceFingerprintReport: File | null
    additionalFraudDocuments: File[]
  }>({
    identityFraudReport: null,
    watchlistReport: null,
    deviceFingerprintReport: null,
    additionalFraudDocuments: []
  })

  // Social media document upload state
  const [uploadedSocialMediaDocuments, setUploadedSocialMediaDocuments] = useState<{
    newsArticlesReport: File | null
    onlineContentReport: File | null
    socialMediaProfilesReport: File | null
    reputationScoreReport: File | null
    thoughtLeadershipReport: File | null
    additionalSocialMediaDocuments: File[]
  }>({
    newsArticlesReport: null,
    onlineContentReport: null,
    socialMediaProfilesReport: null,
    reputationScoreReport: null,
    thoughtLeadershipReport: null,
    additionalSocialMediaDocuments: []
  })

  // Profile image upload state
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(null)

  // Profile image upload handler
  const handleProfileImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg']
      if (!allowedTypes.includes(file.type)) {
        alert('Please upload a valid image file (JPEG or PNG)')
        return
      }
      
      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size must be less than 5MB')
        return
      }
      
      // Create preview URL
      const previewUrl = URL.createObjectURL(file)
      setProfileImagePreview(previewUrl)
      
      // Update request state
      setRequest(prev => ({
        ...prev,
        profileImage: file
      }))
    }
  }

  // Remove profile image
  const removeProfileImage = () => {
    if (profileImagePreview) {
      URL.revokeObjectURL(profileImagePreview)
    }
    setProfileImagePreview(null)
    setRequest(prev => ({
      ...prev,
      profileImage: null
    }))
  }

  // Email validation
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // Phone number validation based on country code
  const validatePhoneNumber = (phone: string, countryCode: string) => {
    // Remove all non-digit characters
    const digits = phone.replace(/\D/g, '')
    
    // Phone number length validation based on country code
    const phoneLengths: { [key: string]: number } = {
      '+234': 10, // Nigeria: 10 digits
      '+1': 10,   // US/Canada: 10 digits
      '+44': 10,  // UK: 10 digits
      '+33': 9,   // France: 9 digits
      '+49': 10,  // Germany: 10-11 digits (using 10 as standard)
      '+81': 10,  // Japan: 10 digits
      '+86': 11,  // China: 11 digits
      '+91': 10,  // India: 10 digits
      '+55': 10,  // Brazil: 10-11 digits (using 10 as standard)
      '+61': 9,   // Australia: 9 digits
      '+27': 9,   // South Africa: 9 digits
      '+254': 9,  // Kenya: 9 digits
      '+233': 9,  // Ghana: 9 digits
      '+256': 9,  // Uganda: 9 digits
      '+250': 9   // Rwanda: 9 digits
    }
    
    const expectedLength = phoneLengths[countryCode] || 10
    return digits.length === expectedLength
  }

  // Form validation
  const validateForm = () => {
    const errors: string[] = []
    
    // Check mandatory fields
    if (!request.firstName.trim()) {
      errors.push('First name is required')
    }
    
    if (!request.lastName.trim()) {
      errors.push('Last name is required')
    }
    
    if (!request.profileImage) {
      errors.push('Profile picture is required')
    }
    
    // Check email validation
    if (request.candidateEmail && !validateEmail(request.candidateEmail)) {
      errors.push('Please enter a valid email address')
    }
    
    // Check phone validation
    if (request.candidatePhone && !validatePhoneNumber(request.candidatePhone, request.countryCode)) {
      const countryCode = countryCodes.find(c => c.code === request.countryCode)
      const expectedLength = countryCode ? 
        (request.countryCode === '+234' ? 10 : 
         request.countryCode === '+86' ? 11 : 
         request.countryCode === '+49' || request.countryCode === '+55' ? 10 : 9) : 10
      errors.push(`Phone number must be ${expectedLength} digits for ${countryCode?.country || 'selected country'}`)
    }
    
    return errors
  }

  // Country codes with flags
  const countryCodes = [
    { code: '+234', flag: '🇳🇬', country: 'Nigeria' },
    { code: '+1', flag: '🇺🇸', country: 'United States' },
    { code: '+44', flag: '🇬🇧', country: 'United Kingdom' },
    { code: '+33', flag: '🇫🇷', country: 'France' },
    { code: '+49', flag: '🇩🇪', country: 'Germany' },
    { code: '+81', flag: '🇯🇵', country: 'Japan' },
    { code: '+86', flag: '🇨🇳', country: 'China' },
    { code: '+91', flag: '🇮🇳', country: 'India' },
    { code: '+55', flag: '🇧🇷', country: 'Brazil' },
    { code: '+61', flag: '🇦🇺', country: 'Australia' },
    { code: '+27', flag: '🇿🇦', country: 'South Africa' },
    { code: '+254', flag: '🇰🇪', country: 'Kenya' },
    { code: '+233', flag: '🇬🇭', country: 'Ghana' },
    { code: '+256', flag: '🇺🇬', country: 'Uganda' },
    { code: '+250', flag: '🇷🇼', country: 'Rwanda' }
  ]

  // Criminal Record document uploads
  const [uploadedCriminalDocuments, setUploadedCriminalDocuments] = useState<{
    criminalHistoryReport: File | null
    financialCrimeReport: File | null
    courtRecordsReport: File | null
    sexOffenderRegistryReport: File | null
    additionalCriminalDocuments: File[]
  }>({
    criminalHistoryReport: null,
    financialCrimeReport: null,
    courtRecordsReport: null,
    sexOffenderRegistryReport: null,
    additionalCriminalDocuments: []
  })

  // Financial & Credit document uploads
  const [uploadedFinancialDocuments, setUploadedFinancialDocuments] = useState<{
    creditReport: File | null
    incomeVerification: File | null
    debtDocumentation: File | null
    businessFinancialReport: File | null
    loanHistoryReport: File | null
    firsHistoryReport: File | null
    bankVerificationReport: File | null
    additionalFinancialDocuments: File[]
  }>({
    creditReport: null,
    incomeVerification: null,
    debtDocumentation: null,
    businessFinancialReport: null,
    loanHistoryReport: null,
    firsHistoryReport: null,
    bankVerificationReport: null,
    additionalFinancialDocuments: []
  })

  // Association document uploads
  const [uploadedAssociationDocuments, setUploadedAssociationDocuments] = useState<{
    professionalBodiesReport: File | null
    alumniNetworksReport: File | null
    exclusiveAssociationsReport: File | null
    politicalExposureReport: File | null
    professionalAssociationsReport: File | null
    businessAssociationsReport: File | null
    socialAssociationsReport: File | null
    additionalAssociationDocuments: File[]
  }>({
    professionalBodiesReport: null,
    alumniNetworksReport: null,
    exclusiveAssociationsReport: null,
    politicalExposureReport: null,
    professionalAssociationsReport: null,
    businessAssociationsReport: null,
    socialAssociationsReport: null,
    additionalAssociationDocuments: []
  })

  // Medical document uploads
  const [uploadedMedicalDocuments, setUploadedMedicalDocuments] = useState<{
    medicalHistoryReport: File | null
    medicalRecordsReport: File | null
    drugTestReport: File | null
    fitnessAssessmentReport: File | null
    additionalMedicalDocuments: File[]
  }>({
    medicalHistoryReport: null,
    medicalRecordsReport: null,
    drugTestReport: null,
    fitnessAssessmentReport: null,
    additionalMedicalDocuments: []
  })

  const [selectedChecks, setSelectedChecks] = useState<{[key: string]: {selected: boolean, price: number}}>({
    // Personal Identity sub-checks
    'personalIdentity.address': { selected: false, price: 2000 },
    'personalIdentity.bvn': { selected: false, price: 1500 },
    'personalIdentity.nin': { selected: false, price: 1000 },
    'personalIdentity.frsc': { selected: false, price: 2500 },
    'personalIdentity.birthCertificate': { selected: false, price: 1800 },
    'personalIdentity.stateResidency': { selected: false, price: 1200 },
    'personalIdentity.nameChange': { selected: false, price: 800 },
    'personalIdentity.phoneEmail': { selected: false, price: 500 },
    'personalIdentity.passport': { selected: false, price: 3000 },
    // Criminal Record sub-checks
    'criminalRecord.criminalHistory': { selected: false, price: 4000 },
    'criminalRecord.financialCrime': { selected: false, price: 3500 },
    'criminalRecord.courtRecords': { selected: false, price: 3000 },
    'criminalRecord.sexOffenderRegistry': { selected: false, price: 2500 },
    // Financial & Credit sub-checks
    'financialCredit.creditReport': { selected: false, price: 2000 },
    'financialCredit.incomeSources': { selected: false, price: 2500 },
    'financialCredit.outstandingDebts': { selected: false, price: 1800 },
    'financialCredit.businessFinancial': { selected: false, price: 3000 },
    'financialCredit.firsHistory': { selected: false, price: 2200 },
    'financialCredit.bankVerification': { selected: false, price: 1500 },
    'financialCredit.loanHistory': { selected: false, price: 2000 },
    // Association sub-checks
    'association.professionalBodies': { selected: false, price: 1500 },
    'association.alumniNetworks': { selected: false, price: 2000 },
    'association.exclusiveAssociations': { selected: false, price: 2500 },
    'association.politicalExposure': { selected: false, price: 3000 },
    'association.professionalAssociations': { selected: false, price: 1200 },
    'association.businessAssociations': { selected: false, price: 1800 },
    'association.socialAssociations': { selected: false, price: 1000 },
    // Medical sub-checks
    'medical.medicalHistory': { selected: false, price: 2000 },
    'medical.medicalRecords': { selected: false, price: 2500 },
    'medical.drugTest': { selected: false, price: 3000 },
    'medical.fitnessAssessment': { selected: false, price: 1500 },
    // Employment sub-checks
    'employment.employmentHistory': { selected: false, price: 2500 },
    'employment.referenceCheck': { selected: false, price: 2000 },
    'employment.backgroundGapAnalysis': { selected: false, price: 1800 },
    // Education sub-checks
    'education.degreeVerification': { selected: false, price: 2000 },
    'education.transcriptVerification': { selected: false, price: 2500 },
    'education.professionalCertifications': { selected: false, price: 1500 },
    // Social Media sub-checks
    'socialMedia.newsArticles': { selected: false, price: 1000 },
    'socialMedia.onlineContent': { selected: false, price: 1500 },
    'socialMedia.thoughtLeadership': { selected: false, price: 2000 },
    'socialMedia.socialMediaProfiles': { selected: false, price: 1200 },
    'socialMedia.reputationScore': { selected: false, price: 1800 },
    // Fraud Detection sub-checks
    'fraudDetection.identityFraud': { selected: false, price: 2000 },
    'fraudDetection.watchlistCheck': { selected: false, price: 1500 },
    'fraudDetection.deviceFingerprint': { selected: false, price: 1000 }
  })

  // Initialize with empty form or existing data
  const [request, setRequest] = useState<BackgroundCheckRequest>({
    id: requestId || `BC-${Date.now()}`,
    orderNumber: `ORD-${Date.now()}`,
    firstName: preFilledData?.firstName || '',
    middleName: preFilledData?.middleName || '',
    lastName: preFilledData?.lastName || '',
    candidateEmail: preFilledData?.candidateEmail || '',
    candidatePhone: '',
    countryCode: '+234',
    profileImage: null,
    requestDate: new Date().toISOString().split('T')[0],
    status: 'draft',
    priority: 'medium',
    assignedTo: '',
    cost: 0,
    checks: {
      personalIdentity: false,
      criminalRecord: false,
      financialCredit: false,
      fraudDetection: false,
      education: false,
      employment: false,
      medical: false,
      socialMedia: false,
      association: false
    }
  })

  // Mock data for demonstration
  useEffect(() => {
    if (requestId) {
      // Load existing request data
      setRequest({
        id: requestId,
        orderNumber: 'ORD-20240115-001',
        firstName: 'Nene',
        middleName: 'Oyinda',
        lastName: 'Afamefuna',
        candidateEmail: 'NeneAfamefuna@gmail.com',
        candidatePhone: '801 234 5678',
        countryCode: '+234',
        profileImage: null,
        requestDate: '2024-01-15',
        status: 'completed',
        priority: 'high',
        assignedTo: 'Sarah Johnson',
        completionDate: '2024-01-18',
        reportUrl: '/reports/bc-2024-001.pdf',
        cost: 25000,
        checks: {
          personalIdentity: true,
          criminalRecord: true,
          financialCredit: true,
          fraudDetection: true,
          education: true,
          employment: false,
          medical: false,
          socialMedia: false,
          association: false
        },
        results: {
          personalIdentity: 'completed',
          criminalRecord: 'in-progress',
          financialCredit: 'completed',
          fraudDetection: 'completed',
          education: 'inconsistent',
          employment: 'pending',
          medical: 'pending',
          socialMedia: 'pending',
          association: 'pending'
        },
        details: {
          personalIdentity: {
            address: 'No 6 Ajanaku Street, Opebi',
            lga: 'Ikeja L.G.A',
            city: 'Ikeja',
            state: 'Lagos',
            bvn: '12345678901',
            nin: '12345678901',
            frscHistory: 'Clean record',
            stateResidency: 'Lagos State',
            nameChange: 'No changes',
            email: 'NeneAfamefuna@gmail.com',
            // Multiple addresses support
            addresses: [
              {
                id: 'addr-1',
                addressType: 'residential',
                residenceFrom: 'Jun 2019',
                residenceTo: 'now',
                street: 'Ajanaku Street',
                buildingNumber: '6',
                city: 'Lagos',
                state: 'Lagos'
              }
            ],
            // Enhanced address fields
            addressType: 'residential',
            residenceFrom: 'Jun 2019',
            residenceTo: 'now',
            street: 'Ajanaku Street',
            buildingNumber: '6',
            postalCode: '100001',
            country: 'Nigeria',
            landmark: 'Near Opebi Link Bridge',
            propertyType: 'apartment',
            verificationMethod: 'Physical verification',
            lastVerified: 'Jan 15, 2024',
            // Document upload fields
            billingDocument: null,
            lightBill: null,
            waterBill: null,
            tenancyAgreement: null,
            otherDocuments: [],
            // FRSC fields
            licenseNumber: 'DL123456789',
            licenseClass: 'B',
            licenseIssueDate: '2020-03-15',
            licenseExpiryDate: '2025-03-15',
            vehicleRegistration: 'ABC123DE',
            vehicleMakeModel: 'Toyota Camry',
            trafficViolations: 'No violations',
            accidentHistory: 'No accidents',
            licenseStatus: 'valid',
            licensePoints: '0',
            // State Residency fields
            currentState: 'Lagos',
            previousStates: 'Abia (2015-2018), Rivers (2018-2020)',
            residencyType: 'permanent',
            residencyStatus: 'verified',
            residencyDocuments: 'Utility bills, Tenancy agreement, Employment letter',
            // Birth Certificate fields
            birthCertNumber: 'BC123456789',
            dateOfBirth: '1990-05-15',
            placeOfBirth: 'Lagos',
            stateOfBirth: 'Lagos',
            registrationDate: '1990-06-01',
            registrationOffice: 'Lagos State Registry',
            fathersName: 'John Doe',
            mothersName: 'Jane Doe',
            gender: 'male',
            birthWeight: '3.2kg',
            certificateStatus: 'original',
            issuingAuthority: 'National Population Commission',
            // Passport fields
            passportNumber: 'A12345678',
            passportType: 'ordinary',
            passportIssueDate: '2020-01-15',
            passportExpiryDate: '2030-01-15',
            passportIssuingCountry: 'Nigeria',
            passportIssuingAuthority: 'Nigeria Immigration Service',
            passportFullName: 'John Doe',
            passportDateOfBirth: '1990-05-15',
            passportPlaceOfBirth: 'Lagos',
            passportNationality: 'Nigerian',
            passportStatus: 'valid',
            passportPages: '64',
            passportTravelHistory: 'United States (2021), United Kingdom (2022), Canada (2023)',
            passportVisaStatus: 'US B1/B2 Visa (valid until 2025), UK Standard Visitor Visa (valid until 2024)',
            // Name Change fields
            currentFullName: 'John Doe',
            nameChangeDate: '2018-06-15',
            previousFullName: 'John Smith',
            birthName: 'John Smith',
            nameChangeReason: 'marriage',
            nameChangeType: 'last-name',
            courtOrderNumber: 'CO-2018-12345',
            courtOrderDate: '2018-06-10',
            issuingCourt: 'Lagos High Court',
            nameChangeStatus: 'completed',
            allPreviousNames: 'John Smith (1990-2018), John Doe (2018-present)',
            nameChangeDocuments: 'Marriage Certificate, Court Order, Deed Poll',
            nameChangeAdditionalInfo: 'Name changed after marriage in 2018'
          },
          criminalRecord: {
            criminalHistory: 'No criminal record found',
            courtRecords: 'No court records',
            arrestRecords: 'No arrest records',
            // Enhanced criminal history fields
            criminalRecordStatus: 'clean',
            lastCriminalCheckDate: '2024-01-15',
            numberOfArrests: '0',
            numberOfConvictions: '0',
            mostRecentOffenseDate: '',
            offenseType: 'none',
            specificCharges: 'No criminal charges or convictions',
            criminalCourtJurisdiction: '',
            caseStatus: 'none',
            sentenceType: 'none',
            sentenceDuration: '',
            additionalCriminalInfo: 'Clean criminal record with no arrests, charges, or convictions',
            // Enhanced financial crime fields
            financialCrimeStatus: 'clean',
            lastFinancialCheckDate: '2024-01-15',
            primaryCrimeType: 'none',
            amountInvolved: '',
            incidentDate: '',
            discoveryDate: '',
            financialCrimeJurisdiction: '',
            caseNumber: '',
            financialCaseStatus: 'none',
            resolutionDate: '',
            financialLoss: '',
            recoveryAmount: '',
            additionalFinancialCrimes: 'No financial crimes or fraud-related offenses',
            investigationDetails: 'No financial investigations or fraud cases',
            additionalFinancialCrimeInfo: 'Clean financial record with no fraud, embezzlement, or financial crimes',
            // Enhanced court records fields
            courtRecordsStatus: 'clean',
            lastCourtCheckDate: '2024-01-15',
            courtType: 'none',
            courtName: '',
            courtCaseNumber: '',
            caseType: 'none',
            filingDate: '',
            courtCaseStatus: 'none',
            courtJurisdiction: '',
            courtLocation: '',
            caseDescription: 'No court cases or legal proceedings',
            caseOutcome: 'none',
            courtResolutionDate: '',
            additionalCourtRecords: 'No additional court records or legal proceedings',
            additionalCourtInfo: 'Clean court record with no legal cases, civil suits, or court proceedings',
            // Enhanced sex offender registry fields
            sexOffenderRegistryStatus: 'clear',
            lastRegistryCheckDate: '2024-01-15',
            primaryRegistryState: 'none',
            registryNumber: '',
            registryDate: '',
            registryExpiryDate: '',
            sexOffenseType: 'none',
            sexOffenseDate: '',
            additionalRegistryStates: 'No additional state registrations',
            registryVerificationMethod: 'database-search',
            registryVerificationAgency: 'Nigerian Police Force',
            additionalRegistryInfo: 'Clean record with no sex offender registry entries'
          },
          financialCredit: {
            creditScore: 750,
            creditHistory: 'Good credit history',
            financialRecords: 'No financial issues',
            // Enhanced credit report fields
            creditRating: 'good',
            lastCreditCheckDate: '2024-01-15',
            primaryCreditBureau: 'crc',
            creditReportNumber: '',
            creditHistoryLength: '3-5-years',
            numberOfCreditAccounts: '3',
            paymentHistoryStatus: 'excellent',
            numberOfLatePayments: '0',
            creditUtilizationRate: '25',
            totalCreditLimit: '₦2,000,000',
            hardInquiries: '2',
            softInquiries: '5',
            bankruptcies: 'none',
            collections: 'none',
            creditHistorySummary: 'Good credit history with consistent on-time payments and low credit utilization. No negative marks or collections.',
            additionalCreditInfo: 'Clean credit record with no disputes or special circumstances',
            // Enhanced income sources fields
            monthlyIncome: 250000,
            annualIncome: 3000000,
            incomeVerificationDate: '2024-01-15',
            primaryIncomeSource: 'employment',
            employmentStatus: 'employed',
            employerName: 'Tech Solutions Ltd',
            jobTitle: 'Software Engineer',
            employmentStartDate: '2022-03-01',
            employmentEndDate: '',
            secondaryIncomeSource: 'freelance',
            secondaryIncomeAmount: 50000,
            incomeVerificationMethod: 'pay-stub',
            incomeVerificationAgency: 'HR Department',
            incomeStability: 'stable',
            incomeFrequency: 'monthly',
            incomeSummary: 'Stable employment income with consistent monthly salary. Additional freelance income from software development projects.',
            additionalIncomeInfo: 'Regular salary with occasional performance bonuses and freelance project income',
            // Enhanced outstanding debts fields
            totalOutstandingDebt: 500000,
            debtStatus: 'current',
            lastDebtCheckDate: '2024-01-15',
            creditCardDebt: 150000,
            numberOfCreditCards: 2,
            personalLoanDebt: 200000,
            mortgageDebt: 150000,
            monthlyDebtPayments: 45000,
            debtToIncomeRatio: 18,
            debtSummary: 'Manageable debt levels with consistent payment history. Credit card debt and personal loan are current with no late payments.',
            // Enhanced business financial fields
            businessName: 'Tech Solutions Ltd',
            businessRegistrationNumber: 'RC123456789',
            businessType: 'limited-liability',
            businessStatus: 'active',
            annualRevenue: 5000000,
            businessAssets: 2000000,
            businessLiabilities: 800000,
            businessRegistrationDate: '2020-01-15',
            businessAddress: '123 Business District, Lagos, Nigeria',
            businessTIN: '12345678-0001',
            taxComplianceStatus: 'compliant',
            businessFinancialSummary: 'Established technology company with consistent growth and strong financial performance. Compliant with all tax obligations and regulatory requirements.',
            // Enhanced loan history fields
            totalLoansApplied: 3,
            totalLoansApproved: 2,
            totalLoanAmount: 1500000,
            currentActiveLoans: 1,
            outstandingLoanBalance: 500000,
            primaryLoanType: 'business',
            loanStatus: 'current',
            latePayments30Days: 0,
            latePayments90Days: 0,
            loanHistorySummary: 'Good loan history with consistent payments. Two business loans approved and one personal loan. All payments made on time with no defaults or late payments.',
            // Enhanced FIRS history fields
            firsTIN: '12345678-0001',
            firsTINRegistrationDate: '2020-01-15',
            firsComplianceStatus: 'compliant',
            lastTaxFilingDate: '2024-01-31',
            annualTaxAssessment: 750000,
            taxPaidLastYear: 720000,
            outstandingTax: 0,
            taxPenalties: 0,
            taxAuditStatus: 'never-audited',
            firsHistorySummary: 'Excellent tax compliance record with FIRS. All tax returns filed on time with no outstanding obligations. No penalties or audit issues. Regular taxpayer with consistent compliance.',
            // Multiple income sources
            incomeSourceEntries: [
              {
                id: 'income-1',
                sourceType: 'employment',
                sourceDescription: 'Primary employment salary',
                monthlyAmount: 250000,
                annualAmount: 3000000,
                frequency: 'monthly',
                verificationMethod: 'pay-stub',
                verificationStatus: 'verified',
                employerName: 'Tech Solutions Ltd',
                startDate: '2022-03-01',
                endDate: '',
                stability: 'stable',
                paymentMethod: 'direct-deposit'
              }
            ]
          },
          fraudDetection: {
            fraudAlerts: 'No fraud alerts',
            identityTheft: 'No identity theft reports',
            suspiciousActivity: 'No suspicious activity',
            // Enhanced identity fraud check fields
            fraudRiskLevel: 'low',
            identityVerificationScore: 85,
            syntheticIdentityRisk: 'none',
            identityTheftRisk: 'low',
            documentFraudRisk: 'none',
            identityFraudIndicators: 'No identity fraud indicators detected. Identity verification completed successfully with high confidence score.',
            identityFraudCheckSummary: 'Identity fraud check completed successfully. No synthetic identity risks detected. Identity verification score: 85/100. Document fraud risk: None. Overall assessment: Low risk.',
            // Enhanced watchlist check fields
            watchlistStatus: 'clear',
            databasesChecked: 'OFAC, UN Sanctions, EU Sanctions, UK HMT, World-Check, PEP Database, Adverse Media Database',
            sanctionsListCheck: 'clear',
            pepCheck: 'clear',
            adverseMediaCheck: 'clear',
            watchlistMatches: 'No matches found in any watchlist databases. Individual is clear of sanctions, PEP status, and adverse media.',
            watchlistCheckSummary: 'Watchlist check completed successfully. No matches found in sanctions lists, PEP databases, or adverse media. Individual is clear of all regulatory and compliance risks.',
            // Enhanced device fingerprint fields
            deviceType: 'desktop',
            browser: 'Chrome 120.0.0.0',
            operatingSystem: 'Windows 11',
            screenResolution: '1920x1080',
            ipAddress: '192.168.1.100',
            deviceRiskScore: 15,
            deviceTrustLevel: 'high',
            deviceFingerprintAnalysis: 'Device fingerprint analysis completed. Device shows consistent patterns with low risk indicators. No suspicious activity detected.',
            deviceFingerprintSummary: 'Device fingerprint analysis completed successfully. Device trust level: High. Risk score: 15/100. No suspicious patterns or anomalies detected. Device appears legitimate and trustworthy.'
          },
          education: {
            institution: 'University of Lagos',
            degree: 'Computer Science',
            graduationDate: '2019',
            verificationStatus: 'Inconsistent records found',
            // Enhanced degree verification fields
            institutionName: 'University of Lagos',
            degreeType: 'bachelor',
            fieldOfStudy: 'Computer Science',
            graduationYear: 2019,
            gpaClassOfDegree: 'Second Class Upper',
            institutionLocation: 'Lagos, Nigeria',
            institutionType: 'university',
            degreeVerificationSummary: 'Degree verification completed. Institution confirmed as accredited. Degree type and field of study verified. Graduation year and class of degree confirmed.',
            // Multiple degree entries
            degreeEntries: [
              {
                id: 'deg-1',
                institutionName: 'University of Lagos',
                degreeType: 'bachelor',
                fieldOfStudy: 'Computer Science',
                graduationYear: 2019,
                gpaClassOfDegree: 'Second Class Upper',
                institutionLocation: 'Lagos, Nigeria',
                institutionType: 'university',
                verificationStatus: 'verified',
                expectedGraduationDate: '2019-07-15',
                currentlyEnrolled: false,
                degreeLevel: 'undergraduate'
              }
            ],
            // Enhanced transcript verification fields
            transcriptGpa: '3.7/4.0',
            gradingScale: '4.0',
            classOfDegree: 'second-class-upper',
            totalCreditHours: 120,
            transcriptStatus: 'verified',
            keyCourses: 'Data Structures, Algorithms, Database Systems, Software Engineering, Computer Networks, Operating Systems',
            transcriptVerificationSummary: 'Transcript verification completed. GPA and grading scale confirmed. Class of degree and credit hours verified. All key courses completed successfully.',
            // Enhanced professional certifications fields
            certificationName: 'AWS Certified Solutions Architect',
            issuingOrganization: 'Amazon Web Services',
            certificationType: 'professional',
            certificationIssueDate: '2023-06-15',
            certificationExpiryDate: '2026-06-15',
            certificationStatus: 'active',
            certificationNumber: 'AWS-CSA-2023-001234',
            certificationDescription: 'AWS Certified Solutions Architect - Associate level certification demonstrating expertise in designing distributed systems on AWS platform.',
            professionalCertificationsVerificationSummary: 'Professional certification verification completed. Certification status confirmed as active. Issue and expiry dates verified. Certification number validated with issuing organization.'
          },
          employment: {
            currentEmployer: 'Tech Corp',
            previousEmployers: 'Previous Company',
            employmentHistory: '5 years experience',
            // Enhanced employment history fields
            currentPosition: 'Senior Software Engineer',
            employmentStartDate: '2022-01-15',
            employmentStatus: 'active',
            salaryRange: '₦800,000 - ₦1,200,000',
            previousEmploymentHistory: 'Previous Company (2019-2022) - Software Engineer, ABC Corp (2017-2019) - Junior Developer',
            employmentVerificationSummary: 'Employment history verified with current and previous employers. All positions and dates confirmed. No discrepancies found.',
            // Multiple employment entries
            employmentEntries: [
              {
                id: 'emp-1',
                companyName: 'Tech Corp',
                position: 'Senior Software Engineer',
                startDate: '2022-01-15',
                endDate: 'Current',
                employmentType: 'Full-time',
                salary: '₦1,000,000',
                responsibilities: 'Lead development of web applications, mentor junior developers, and architect scalable solutions.',
                reasonForLeaving: 'Current position',
                supervisorName: 'John Smith',
                supervisorContact: 'john.smith@techcorp.com'
              }
            ],
            // Enhanced reference check fields
            referenceName: 'John Smith',
            referencePosition: 'Engineering Manager',
            referenceCompany: 'Tech Corp',
            referencePhone: '+234-801-234-5678',
            referenceEmail: 'john.smith@techcorp.com',
            referenceRelationship: 'direct-supervisor',
            referenceStatus: 'responded',
            referenceFeedback: 'Excellent employee with strong technical skills and good work ethic. Highly recommended for any position.',
            // Enhanced background gap analysis fields
            gapPeriodStart: '2019-06-01',
            gapPeriodEnd: '2019-08-31',
            gapDurationMonths: 3,
            gapType: 'personal-gap',
            gapStatus: 'explained',
            gapExplanation: 'Took time off to care for family member during medical treatment. Gap period was planned and communicated with previous employer.',
            gapAnalysisSummary: 'Gap analysis completed. 3-month gap in 2019 was for personal family reasons and is well-documented. No concerns identified.'
          },
          medical: {
            medicalHistory: 'No significant medical history',
            drugTest: 'Pending',
            healthRecords: 'Clean health record',
            // Enhanced medical history fields
            overallHealthStatus: 'good',
            lastMedicalCheckup: '2024-01-15',
            chronicMedicalConditions: 'None reported',
            currentMedications: 'None currently taking',
            allergies: 'None known',
            bloodType: 'O+',
            disabilityStatus: 'no-disability',
            medicalHistorySummary: 'Individual reports good overall health with no significant medical history. No chronic conditions, current medications, or known allergies. Last medical checkup was recent and showed no concerns.',
            // Enhanced drug test fields
            drugTestType: 'urine',
            drugTestResult: 'negative',
            drugTestDate: '2024-01-20',
            drugTestingFacility: 'Lagos Medical Laboratory',
            drugTestPanel: '5-panel',
            substancesTested: 'Marijuana, Cocaine, Opiates, Amphetamines, PCP',
            positiveSubstances: 'None',
            drugTestSummary: 'Comprehensive 5-panel drug test conducted with negative results for all substances tested. No evidence of substance abuse or illegal drug use.',
            // Enhanced fitness assessment fields
            overallFitnessLevel: 'good',
            fitnessAssessmentDate: '2024-01-18',
            height: 175,
            weight: 70,
            bmi: 22.9,
            cardiovascularFitness: 'good',
            muscularStrength: 'average',
            physicalLimitations: 'None reported',
            workplaceAccommodations: 'None required',
            fitnessAssessmentSummary: 'Individual demonstrates good overall fitness level with no physical limitations. BMI within healthy range. Cardiovascular fitness and muscular strength are adequate for most workplace requirements.'
          },
          socialMedia: {
            socialProfiles: 'LinkedIn, Twitter profiles found',
            onlinePresence: 'Professional online presence',
            reputationCheck: 'Positive reputation',
            // Enhanced news articles & public mentions fields
            searchKeywords: 'John Doe, Software Engineer, Tech Industry',
            searchPeriod: '2_years',
            totalArticlesFound: 15,
            positiveMentions: 12,
            negativeMentions: 1,
            newsArticlesAnalysis: 'Found 15 news articles and public mentions over the last 2 years. 12 positive mentions highlighting professional achievements and industry contributions. 1 negative mention related to a minor controversy that was later resolved. Overall media coverage is positive and professional.',
            newsArticlesSummary: 'News articles and public mentions analysis completed successfully. Positive media coverage with 80% positive sentiment. Professional reputation maintained with minimal negative coverage. Media presence demonstrates industry expertise and thought leadership.',
            // Enhanced online content & reputation analysis fields
            contentType: 'blog_posts',
            contentSentiment: 'positive',
            totalContentFound: 45,
            engagementScore: 78,
            contentQualityScore: 85,
            onlineContentAnalysis: 'Analyzed 45 pieces of online content including blog posts, articles, and social media content. High engagement score of 78/100 with strong audience interaction. Content quality score of 85/100 indicates professional, well-researched content. Positive sentiment across all content types.',
            onlineContentSummary: 'Online content and reputation analysis completed successfully. High-quality content with strong engagement metrics. Positive sentiment and professional tone throughout. Demonstrates expertise and thought leadership in the field.',
            // Enhanced social media profiles fields
            primaryPlatform: 'linkedin',
            profileStatus: 'active',
            followersCount: 2500,
            postsCount: 120,
            engagementRate: 4.2,
            socialMediaAnalysis: 'Active LinkedIn profile with 2,500 professional connections. 120 posts with 4.2% engagement rate indicating strong professional network interaction. Profile demonstrates industry expertise and thought leadership. Consistent professional content and networking activity.',
            socialMediaSummary: 'Social media profiles analysis completed successfully. Strong professional presence on LinkedIn with active engagement. Professional content and networking demonstrate industry expertise. Social media reputation is positive and professional.',
            // Enhanced reputation score fields
            overallReputationScore: 82,
            scoreCategory: 'good',
            professionalReputationScore: 85,
            socialMediaReputationScore: 78,
            onlinePresenceScore: 80,
            reputationScoreAnalysis: 'Overall reputation score of 82/100 places individual in the "Good" category. Professional reputation score of 85/100 reflects strong industry standing. Social media reputation score of 78/100 indicates positive online presence. Online presence score of 80/100 shows consistent professional activity.',
            reputationScoreSummary: 'Reputation score assessment completed successfully. Overall score of 82/100 indicates good professional reputation. Strong professional standing with positive online presence. Recommendations include maintaining current professional standards and continuing thought leadership activities.',
            // Enhanced thought leadership fields
            thoughtLeadershipContentType: 'articles',
            industryFocus: 'Software Engineering, Technology',
            totalPublications: 8,
            speakingEngagements: 12,
            influenceScore: 75,
            thoughtLeadershipAnalysis: 'Published 8 articles in industry publications focusing on software engineering and technology. 12 speaking engagements at conferences and events. Influence score of 75/100 indicates strong thought leadership in the field. Content demonstrates deep technical expertise and industry insights.',
            thoughtLeadershipSummary: 'Thought leadership analysis completed successfully. Strong industry influence with 8 publications and 12 speaking engagements. Influence score of 75/100 demonstrates thought leadership capabilities. Professional contributions are well-regarded in the software engineering and technology community.'
          },
          association: {
            knownAssociates: 'Professional network',
            familyConnections: 'Family background verified',
            businessAssociations: 'No concerning associations',
            // Enhanced political exposure fields
            pepStatus: 'not_pep',
            politicalPosition: 'Not applicable',
            governmentLevel: 'not_applicable',
            positionDuration: 'N/A',
            familyMemberPEPStatus: 'no_family_pep',
            closeAssociatePEPStatus: 'no_close_associate_pep',
            politicalExposureSummary: 'No political exposure identified. Individual has no known political positions, family members, or close associates who are politically exposed persons.',
            // Enhanced professional bodies fields
            professionalBodyName: 'nba',
            professionalBodyMembershipNumber: 'NBA-2023-001234',
            professionalBodyMembershipStartDate: '2023-01-15',
            professionalBodyMembershipStatus: 'active',
            professionalBodyCertificationLevel: 'member',
            additionalProfessionalBodies: 'Member of Nigerian Bar Association, Institute of Chartered Accountants of Nigeria, and Project Management Institute.',
            // Enhanced alumni networks fields
            alumniInstitutionName: 'University of Lagos',
            alumniInstitutionType: 'university',
            alumniDegreeProgram: 'Bachelor of Law (LL.B)',
            alumniGraduationYear: 2018,
            alumniStatus: 'active',
            alumniNetworkParticipation: 'active',
            alumniEventsAttended: 5,
            additionalAlumniNetworks: 'Active member of University of Lagos Alumni Association, Lagos Business School Alumni Network, and Harvard Business School Alumni Association.',
            // Enhanced exclusive associations fields
            exclusiveClubName: 'Lagos Country Club',
            exclusiveMembershipType: 'full-member',
            exclusiveMembershipStartDate: '2022-01-15',
            exclusiveMembershipStatus: 'active',
            additionalExclusiveAssociations: 'Member of Ikoyi Club and Metropolitan Club. Active participant in exclusive networking events and social gatherings.',
            // Enhanced professional associations fields
            professionalAssociationName: 'Nigerian Institute of Management',
            professionalMembershipNumber: 'NIM-2023-001234',
            professionalMembershipStartDate: '2023-01-15',
            professionalMembershipStatus: 'active',
            professionalCertificationLevel: 'member',
            additionalProfessionalAssociations: 'Member of Nigerian Society of Engineers, Chartered Institute of Personnel Management, and Project Management Institute.',
            // Enhanced business associations fields
            businessAssociationName: 'Lagos Chamber of Commerce and Industry',
            businessAssociationType: 'chamber-of-commerce',
            businessMembershipStartDate: '2021-03-01',
            businessMembershipStatus: 'active',
            businessLeadershipRole: 'board-member',
            additionalBusinessAssociations: 'Member of Nigerian-American Chamber of Commerce, Technology Association of Nigeria, and Young Entrepreneurs Network.',
            // Enhanced social associations fields
            socialAssociationName: 'Rotary Club of Lagos',
            socialAssociationType: 'community-organization',
            socialMembershipStartDate: '2020-06-01',
            socialMembershipStatus: 'active',
            socialVolunteerHours: 20,
            additionalSocialAssociations: 'Active member of Lions Club, Red Cross Society, and local community development initiatives. Regular volunteer at orphanages and educational programs.'
          }
        },
        notes: 'All checks completed successfully. Candidate cleared for hire.',
        tags: ['engineering', 'senior-level', 'cleared']
      })
      setIsEditing(false)
    }
  }, [requestId])

  const categories = [
    {
      key: 'personalIdentity',
      name: 'Personal & Identity Information',
      icon: User,
      subTabs: ['address', 'bvn', 'nin', 'frsc', 'birthCertificate', 'stateResidency', 'nameChange', 'phoneEmail', 'passport']
    },
    {
      key: 'criminalRecord',
      name: 'Criminal Record Check',
      icon: AlertTriangle,
      subTabs: ['criminalHistory', 'financialCrime', 'courtRecords', 'sexOffenderRegistry']
    },
    {
      key: 'financialCredit',
      name: 'Financial & Credit History',
      icon: CheckCircle,
      subTabs: ['creditReport', 'incomeSources', 'outstandingDebts', 'businessFinancial', 'firsHistory', 'bankVerification', 'loanHistory']
    },
    {
      key: 'association',
      name: 'Association Verification',
      icon: CheckCircle,
      subTabs: ['professionalBodies', 'alumniNetworks', 'exclusiveAssociations', 'politicalExposure', 'professionalAssociations', 'businessAssociations', 'socialAssociations']
    },
    {
      key: 'medical',
      name: 'Medical History',
      icon: Clock,
      subTabs: ['medicalHistory', 'medicalRecords', 'drugTest', 'fitnessAssessment']
    },
    {
      key: 'employment',
      name: 'Professional Records (Employment & Credentials)',
      icon: Clock,
      subTabs: ['employmentHistory', 'referenceCheck', 'backgroundGapAnalysis']
    },
    {
      key: 'education',
      name: 'Education',
      icon: AlertTriangle,
      subTabs: ['degreeVerification', 'transcriptVerification', 'professionalCertifications']
    },
    {
      key: 'socialMedia',
      name: 'Social Media & Online Presence (Digital Reputation)',
      icon: CheckCircle,
      subTabs: ['newsArticles', 'onlineContent', 'thoughtLeadership', 'socialMediaProfiles', 'reputationScore']
    },
    {
      key: 'fraudDetection',
      name: 'Fraud & Anti-Fraud Detection',
      icon: CheckCircle,
      subTabs: ['identityFraud', 'watchlistCheck', 'deviceFingerprint']
    }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'in-progress':
        return <Clock className="h-4 w-4 text-blue-600" />
      case 'inconsistent':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'inconsistent':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'failed':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  // Address management functions
  const addNewAddress = () => {
    const newAddress = {
      id: `addr-${Date.now()}`,
      addressType: 'residential',
      residenceFrom: '',
      residenceTo: '',
      street: '',
      buildingNumber: '',
      city: '',
      state: ''
    }
    
    setRequest(prev => ({
      ...prev,
      details: {
        ...prev.details,
        personalIdentity: {
          ...prev.details?.personalIdentity,
          addresses: [...(prev.details?.personalIdentity?.addresses || []), newAddress]
        }
      } as any
    }))
    setExpandedAddresses(prev => new Set([...prev, newAddress.id]))
  }

  const removeAddress = (addressId: string) => {
    setRequest(prev => ({
      ...prev,
      details: {
        ...prev.details,
        personalIdentity: {
          ...prev.details?.personalIdentity,
          addresses: (prev.details?.personalIdentity?.addresses || []).filter(addr => addr.id !== addressId)
        }
      } as any
    }))
  }

  const updateAddress = (addressId: string, field: string, value: any) => {
    setRequest(prev => ({
      ...prev,
      details: {
        ...prev.details,
        personalIdentity: {
          ...prev.details?.personalIdentity,
          addresses: (prev.details?.personalIdentity?.addresses || []).map(addr => 
            addr.id === addressId ? { ...addr, [field]: value } : addr
          )
        }
      } as any
    }))
  }

  const toggleAddressExpansion = (addressId: string) => {
    setExpandedAddresses(prev => {
      const newSet = new Set(prev)
      if (newSet.has(addressId)) {
        newSet.delete(addressId)
      } else {
        newSet.add(addressId)
      }
      return newSet
    })
  }

  // Employment management functions
  const addNewEmployment = () => {
    const newEmployment = {
      id: `emp-${Date.now()}`,
      companyName: '',
      position: '',
      startDate: '',
      endDate: '',
      employmentType: 'Full-time',
      salary: '',
      responsibilities: '',
      reasonForLeaving: '',
      supervisorName: '',
      supervisorContact: ''
    }
    
    setRequest(prev => ({
      ...prev,
      details: {
        ...prev.details,
        employment: {
          ...prev.details?.employment,
          employmentEntries: [...(prev.details?.employment?.employmentEntries || []), newEmployment]
        }
      } as any
    }))
    setExpandedEmployments(prev => new Set([...prev, newEmployment.id]))
  }

  const removeEmployment = (employmentId: string) => {
    setRequest(prev => ({
      ...prev,
      details: {
        ...prev.details,
        employment: {
          ...prev.details?.employment,
          employmentEntries: (prev.details?.employment?.employmentEntries || []).filter(emp => emp.id !== employmentId)
        }
      } as any
    }))
  }

  const updateEmployment = (employmentId: string, field: string, value: any) => {
    setRequest(prev => ({
      ...prev,
      details: {
        ...prev.details,
        employment: {
          ...prev.details?.employment,
          employmentEntries: (prev.details?.employment?.employmentEntries || []).map(emp => 
            emp.id === employmentId ? { ...emp, [field]: value } : emp
          )
        }
      } as any
    }))
  }

  const toggleEmploymentExpansion = (employmentId: string) => {
    setExpandedEmployments(prev => {
      const newSet = new Set(prev)
      if (newSet.has(employmentId)) {
        newSet.delete(employmentId)
      } else {
        newSet.add(employmentId)
      }
      return newSet
    })
  }

  // Degree management functions
  const addNewDegree = () => {
    const newDegree = {
      id: `deg-${Date.now()}`,
      institutionName: '',
      degreeType: '',
      fieldOfStudy: '',
      graduationYear: new Date().getFullYear(),
      gpaClassOfDegree: '',
      institutionLocation: '',
      institutionType: '',
      verificationStatus: 'pending',
      expectedGraduationDate: '',
      currentlyEnrolled: false,
      degreeLevel: ''
    }
    
    setRequest(prev => ({
      ...prev,
      details: {
        ...prev.details,
        education: {
          ...prev.details?.education,
          degreeEntries: [...(prev.details?.education?.degreeEntries || []), newDegree]
        }
      } as any
    }))
    setExpandedDegrees(prev => new Set([...prev, newDegree.id]))
  }

  const removeDegree = (degreeId: string) => {
    setRequest(prev => ({
      ...prev,
      details: {
        ...prev.details,
        education: {
          ...prev.details?.education,
          degreeEntries: (prev.details?.education?.degreeEntries || []).filter(deg => deg.id !== degreeId)
        }
      } as any
    }))
  }

  const updateDegree = (degreeId: string, field: string, value: any) => {
    setRequest(prev => ({
      ...prev,
      details: {
        ...prev.details,
        education: {
          ...prev.details?.education,
          degreeEntries: (prev.details?.education?.degreeEntries || []).map(deg => 
            deg.id === degreeId ? { ...deg, [field]: value } : deg
          )
        }
      } as any
    }))
  }

  const toggleDegreeExpansion = (degreeId: string) => {
    setExpandedDegrees(prev => {
      const newSet = new Set(prev)
      if (newSet.has(degreeId)) {
        newSet.delete(degreeId)
      } else {
        newSet.add(degreeId)
      }
      return newSet
    })
  }

  // Income source management functions
  const addNewIncomeSource = () => {
    const newIncomeSource = {
      id: `income-${Date.now()}`,
      sourceType: '',
      sourceDescription: '',
      monthlyAmount: 0,
      annualAmount: 0,
      frequency: 'monthly',
      verificationMethod: '',
      verificationStatus: 'pending',
      employerName: '',
      startDate: '',
      endDate: '',
      stability: '',
      paymentMethod: ''
    }
    
    setRequest(prev => ({
      ...prev,
      details: {
        ...prev.details,
        financialCredit: {
          ...prev.details?.financialCredit,
          incomeSourceEntries: [...(prev.details?.financialCredit?.incomeSourceEntries || []), newIncomeSource]
        }
      } as any
    }))
    setExpandedIncomeSources(prev => new Set([...prev, newIncomeSource.id]))
  }

  const removeIncomeSource = (incomeId: string) => {
    setRequest(prev => ({
      ...prev,
      details: {
        ...prev.details,
        financialCredit: {
          ...prev.details?.financialCredit,
          incomeSourceEntries: (prev.details?.financialCredit?.incomeSourceEntries || []).filter(income => income.id !== incomeId)
        }
      } as any
    }))
  }

  const updateIncomeSource = (incomeId: string, field: string, value: any) => {
    setRequest(prev => ({
      ...prev,
      details: {
        ...prev.details,
        financialCredit: {
          ...prev.details?.financialCredit,
          incomeSourceEntries: (prev.details?.financialCredit?.incomeSourceEntries || []).map(income => 
            income.id === incomeId ? { ...income, [field]: value } : income
          )
        }
      } as any
    }))
  }

  const toggleIncomeSourceExpansion = (incomeId: string) => {
    setExpandedIncomeSources(prev => {
      const newSet = new Set(prev)
      if (newSet.has(incomeId)) {
        newSet.delete(incomeId)
      } else {
        newSet.add(incomeId)
      }
      return newSet
    })
  }

  const handleInputChange = (field: string, value: any) => {
    if (isEditing) {
      setRequest(prev => ({
        ...prev,
        [field]: value
      }))
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf']
      if (!allowedTypes.includes(file.type)) {
        alert('Please upload a valid file (JPEG, PNG, or PDF)')
        return
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB')
        return
      }
      
      setUploadedBirthCertificate(file)
    }
  }

  const removeUploadedFile = () => {
    setUploadedBirthCertificate(null)
  }

  // Address document upload handlers
  const handleAddressDocumentUpload = (event: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const file = event.target.files?.[0]
    if (file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf']
      if (!allowedTypes.includes(file.type)) {
        alert('Please upload a valid file (JPEG, PNG, or PDF)')
        return
      }
      
      // Validate file size (max 10MB for address documents)
      if (file.size > 10 * 1024 * 1024) {
        alert('File size must be less than 10MB')
        return
      }
      
      switch (type) {
        case 'billing':
          setUploadedBillingDocument(file)
          break
        case 'lightBill':
          setUploadedLightBill(file)
          break
        case 'waterBill':
          setUploadedWaterBill(file)
          break
        case 'tenancy':
          setUploadedTenancyAgreement(file)
          break
        case 'other':
          setUploadedOtherDocuments(prev => [...prev, file])
          break
      }
    }
  }

  const removeAddressDocument = (type: string, index?: number) => {
    switch (type) {
      case 'billing':
        setUploadedBillingDocument(null)
        break
      case 'lightBill':
        setUploadedLightBill(null)
        break
      case 'waterBill':
        setUploadedWaterBill(null)
        break
      case 'tenancy':
        setUploadedTenancyAgreement(null)
        break
      case 'other':
        if (index !== undefined) {
          setUploadedOtherDocuments(prev => prev.filter((_, i) => i !== index))
        }
        break
    }
  }

  // Name change document upload handlers
  const handleNameChangeDocumentUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    if (files.length > 0) {
      // Validate file types
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf']
      const validFiles = files.filter(file => {
        if (!allowedTypes.includes(file.type)) {
          alert(`File ${file.name} is not a valid file type (JPEG, PNG, or PDF)`)
          return false
        }
        
        // Validate file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
          alert(`File ${file.name} is too large. Maximum size is 10MB`)
          return false
        }
        
        return true
      })
      
      setUploadedNameChangeDocuments(prev => [...prev, ...validFiles])
    }
  }

  const removeNameChangeDocument = (index: number) => {
    setUploadedNameChangeDocuments(prev => prev.filter((_, i) => i !== index))
  }

  // Passport document upload handlers
  const handlePassportDocumentUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    if (files.length > 0) {
      // Validate file types
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf']
      const validFiles = files.filter(file => {
        if (!allowedTypes.includes(file.type)) {
          alert(`File ${file.name} is not a valid file type (JPEG, PNG, or PDF)`)
          return false
        }
        
        // Validate file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
          alert(`File ${file.name} is too large. Maximum size is 10MB`)
          return false
        }
        
        return true
      })
      
      setUploadedPassportDocuments(prev => [...prev, ...validFiles])
    }
  }

  const removePassportDocument = (index: number) => {
    setUploadedPassportDocuments(prev => prev.filter((_, i) => i !== index))
  }

  // Employment document upload handlers
  const handleEmploymentDocumentUpload = (event: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const file = event.target.files?.[0]
    if (file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf']
      if (!allowedTypes.includes(file.type)) {
        alert('Please upload a valid file type (JPEG, PNG, or PDF)')
        return
      }
      
      // Validate file size (10MB max)
      if (file.size > 10 * 1024 * 1024) {
        alert('File size must be less than 10MB')
        return
      }
      
      setUploadedEmploymentDocuments(prev => ({
        ...prev,
        [type]: file
      }))
    }
  }

  const removeEmploymentDocument = (type: string) => {
    setUploadedEmploymentDocuments(prev => ({
      ...prev,
      [type]: null
    }))
  }

  // Education document upload handlers
  const handleEducationDocumentUpload = (event: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const file = event.target.files?.[0]
    if (file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf']
      if (!allowedTypes.includes(file.type)) {
        alert('Please upload a valid file type (JPEG, PNG, or PDF)')
        return
      }
      
      // Validate file size (10MB max)
      if (file.size > 10 * 1024 * 1024) {
        alert('File size must be less than 10MB')
        return
      }
      
      if (type === 'additionalEducationDocuments') {
        setUploadedEducationDocuments(prev => ({
          ...prev,
          additionalEducationDocuments: [...prev.additionalEducationDocuments, file]
        }))
      } else {
        setUploadedEducationDocuments(prev => ({
          ...prev,
          [type]: file
        }))
      }
    }
  }

  const removeEducationDocument = (type: string, index?: number) => {
    if (type === 'additionalEducationDocuments' && index !== undefined) {
      setUploadedEducationDocuments(prev => ({
        ...prev,
        additionalEducationDocuments: prev.additionalEducationDocuments.filter((_, i) => i !== index)
      }))
    } else {
      setUploadedEducationDocuments(prev => ({
        ...prev,
        [type]: null
      }))
    }
  }

  // Fraud detection document upload handlers
  const handleFraudDocumentUpload = (event: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const file = event.target.files?.[0]
    if (file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf']
      if (!allowedTypes.includes(file.type)) {
        alert('Please upload a valid file type (JPEG, PNG, or PDF)')
        return
      }
      
      // Validate file size (10MB max)
      if (file.size > 10 * 1024 * 1024) {
        alert('File size must be less than 10MB')
        return
      }
      
      if (type === 'additionalFraudDocuments') {
        setUploadedFraudDocuments(prev => ({
          ...prev,
          additionalFraudDocuments: [...prev.additionalFraudDocuments, file]
        }))
      } else {
        setUploadedFraudDocuments(prev => ({
          ...prev,
          [type]: file
        }))
      }
    }
  }

  const removeFraudDocument = (type: string, index?: number) => {
    if (type === 'additionalFraudDocuments' && index !== undefined) {
      setUploadedFraudDocuments(prev => ({
        ...prev,
        additionalFraudDocuments: prev.additionalFraudDocuments.filter((_, i) => i !== index)
      }))
    } else {
      setUploadedFraudDocuments(prev => ({
        ...prev,
        [type]: null
      }))
    }
  }

  // Social media document upload handlers
  const handleSocialMediaDocumentUpload = (event: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const file = event.target.files?.[0]
    if (file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf']
      if (!allowedTypes.includes(file.type)) {
        alert('Please upload a valid file type (JPEG, PNG, or PDF)')
        return
      }
      
      // Validate file size (10MB max)
      if (file.size > 10 * 1024 * 1024) {
        alert('File size must be less than 10MB')
        return
      }
      
      if (type === 'additionalSocialMediaDocuments') {
        setUploadedSocialMediaDocuments(prev => ({
          ...prev,
          additionalSocialMediaDocuments: [...prev.additionalSocialMediaDocuments, file]
        }))
      } else {
        setUploadedSocialMediaDocuments(prev => ({
          ...prev,
          [type]: file
        }))
      }
    }
  }

  const removeSocialMediaDocument = (type: string, index?: number) => {
    if (type === 'additionalSocialMediaDocuments' && index !== undefined) {
      setUploadedSocialMediaDocuments(prev => ({
        ...prev,
        additionalSocialMediaDocuments: prev.additionalSocialMediaDocuments.filter((_, i) => i !== index)
      }))
    } else {
      setUploadedSocialMediaDocuments(prev => ({
        ...prev,
        [type]: null
      }))
    }
  }

  // Criminal Record document upload handlers
  const handleCriminalDocumentUpload = (event: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const file = event.target.files?.[0]
    if (file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf']
      if (!allowedTypes.includes(file.type)) {
        alert('Please upload a valid file type (JPEG, PNG, or PDF)')
        return
      }
      
      // Validate file size (10MB max)
      if (file.size > 10 * 1024 * 1024) {
        alert('File size must be less than 10MB')
        return
      }
      
      if (type === 'additionalCriminalDocuments') {
        setUploadedCriminalDocuments(prev => ({
          ...prev,
          additionalCriminalDocuments: [...prev.additionalCriminalDocuments, file]
        }))
      } else {
        setUploadedCriminalDocuments(prev => ({
          ...prev,
          [type]: file
        }))
      }
    }
  }

  const removeCriminalDocument = (type: string, index?: number) => {
    if (type === 'additionalCriminalDocuments' && index !== undefined) {
      setUploadedCriminalDocuments(prev => ({
        ...prev,
        additionalCriminalDocuments: prev.additionalCriminalDocuments.filter((_, i) => i !== index)
      }))
    } else {
      setUploadedCriminalDocuments(prev => ({
        ...prev,
        [type]: null
      }))
    }
  }

  // Financial & Credit document upload handlers
  const handleFinancialDocumentUpload = (event: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const file = event.target.files?.[0]
    if (file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf']
      if (!allowedTypes.includes(file.type)) {
        alert('Please upload a valid file type (JPEG, PNG, or PDF)')
        return
      }
      
      // Validate file size (10MB max)
      if (file.size > 10 * 1024 * 1024) {
        alert('File size must be less than 10MB')
        return
      }
      
      if (type === 'additionalFinancialDocuments') {
        setUploadedFinancialDocuments(prev => ({
          ...prev,
          additionalFinancialDocuments: [...prev.additionalFinancialDocuments, file]
        }))
      } else {
        setUploadedFinancialDocuments(prev => ({
          ...prev,
          [type]: file
        }))
      }
    }
  }

  const removeFinancialDocument = (type: string, index?: number) => {
    if (type === 'additionalFinancialDocuments' && index !== undefined) {
      setUploadedFinancialDocuments(prev => ({
        ...prev,
        additionalFinancialDocuments: prev.additionalFinancialDocuments.filter((_, i) => i !== index)
      }))
    } else {
      setUploadedFinancialDocuments(prev => ({
        ...prev,
        [type]: null
      }))
    }
  }

  // Association document upload handlers
  const handleAssociationDocumentUpload = (event: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const file = event.target.files?.[0]
    if (file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf']
      if (!allowedTypes.includes(file.type)) {
        alert('Please upload a valid file type (JPEG, PNG, or PDF)')
        return
      }
      
      // Validate file size (10MB max)
      if (file.size > 10 * 1024 * 1024) {
        alert('File size must be less than 10MB')
        return
      }
      
      if (type === 'additionalAssociationDocuments') {
        setUploadedAssociationDocuments(prev => ({
          ...prev,
          additionalAssociationDocuments: [...prev.additionalAssociationDocuments, file]
        }))
      } else {
        setUploadedAssociationDocuments(prev => ({
          ...prev,
          [type]: file
        }))
      }
    }
  }

  const removeAssociationDocument = (type: string, index?: number) => {
    if (type === 'additionalAssociationDocuments' && index !== undefined) {
      setUploadedAssociationDocuments(prev => ({
        ...prev,
        additionalAssociationDocuments: prev.additionalAssociationDocuments.filter((_, i) => i !== index)
      }))
    } else {
      setUploadedAssociationDocuments(prev => ({
        ...prev,
        [type]: null
      }))
    }
  }

  // Medical document upload handlers
  const handleMedicalDocumentUpload = (event: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const file = event.target.files?.[0]
    if (file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf']
      if (!allowedTypes.includes(file.type)) {
        alert('Please upload a valid file type (JPEG, PNG, or PDF)')
        return
      }
      
      // Validate file size (10MB max)
      if (file.size > 10 * 1024 * 1024) {
        alert('File size must be less than 10MB')
        return
      }
      
      if (type === 'additionalMedicalDocuments') {
        setUploadedMedicalDocuments(prev => ({
          ...prev,
          additionalMedicalDocuments: [...prev.additionalMedicalDocuments, file]
        }))
      } else {
        setUploadedMedicalDocuments(prev => ({
          ...prev,
          [type]: file
        }))
      }
    }
  }

  const removeMedicalDocument = (type: string, index?: number) => {
    if (type === 'additionalMedicalDocuments' && index !== undefined) {
      setUploadedMedicalDocuments(prev => ({
        ...prev,
        additionalMedicalDocuments: prev.additionalMedicalDocuments.filter((_, i) => i !== index)
      }))
    } else {
      setUploadedMedicalDocuments(prev => ({
        ...prev,
        [type]: null
      }))
    }
  }

  const handleCheckChange = (checkType: string, checked: boolean) => {
    if (isEditing) {
      setRequest(prev => ({
        ...prev,
        checks: {
          ...prev.checks,
          [checkType]: checked
        }
      }))
    }
  }

  const handleSave = () => {
    if (onSave) {
      onSave(request)
    }
    setIsEditing(false)
  }

  const toggleCheck = (checkKey: string) => {
    setSelectedChecks(prev => ({
      ...prev,
      [checkKey]: {
        ...prev[checkKey],
        selected: !prev[checkKey].selected
      }
    }))
  }

  const getTotalPrice = () => {
    return Object.entries(selectedChecks)
      .filter(([_, check]) => check.selected)
      .reduce((total, [key, check]) => {
        // Special handling for address verification - multiply by number of addresses
        if (key === 'personalIdentity.address') {
          const addressCount = request.details?.personalIdentity?.addresses?.length || 1
          return total + (check.price * addressCount)
        }
        // Special handling for employment history verification - multiply by number of employment entries
        if (key === 'employment.employmentHistory') {
          const employmentCount = request.details?.employment?.employmentEntries?.length || 1
          return total + (check.price * employmentCount)
        }
        // Special handling for degree verification - multiply by number of degree entries
        if (key === 'education.degreeVerification') {
          const degreeCount = request.details?.education?.degreeEntries?.length || 1
          return total + (check.price * degreeCount)
        }
        // Special handling for income sources verification - multiply by number of income source entries
        if (key === 'financialCredit.incomeSources') {
          const incomeSourceCount = request.details?.financialCredit?.incomeSourceEntries?.length || 1
          return total + (check.price * incomeSourceCount)
        }
        return total + check.price
      }, 0)
  }

  // Payment calculation functions
  const calculateTotal = () => {
    const subtotal = Object.entries(selectedChecks)
      .filter(([_, check]) => check.selected)
      .reduce((sum, [key, check]) => {
        // Special handling for address verification - multiply by number of addresses
        if (key === 'personalIdentity.address') {
          const addressCount = request.details?.personalIdentity?.addresses?.length || 1
          return sum + (check.price * addressCount)
        }
        // Special handling for employment history verification - multiply by number of employment entries
        if (key === 'employment.employmentHistory') {
          const employmentCount = request.details?.employment?.employmentEntries?.length || 1
          return sum + (check.price * employmentCount)
        }
        // Special handling for degree verification - multiply by number of degree entries
        if (key === 'education.degreeVerification') {
          const degreeCount = request.details?.education?.degreeEntries?.length || 1
          return sum + (check.price * degreeCount)
        }
        // Special handling for income sources verification - multiply by number of income source entries
        if (key === 'financialCredit.incomeSources') {
          const incomeSourceCount = request.details?.financialCredit?.incomeSourceEntries?.length || 1
          return sum + (check.price * incomeSourceCount)
        }
        return sum + check.price
      }, 0)
    
    const serviceFee = Math.round(subtotal * 0.1) // 10% service fee
    const total = subtotal + serviceFee
    
    return { subtotal, serviceFee, total }
  }

  const getSelectedChecksList = () => {
    return Object.entries(selectedChecks)
      .filter(([_, check]) => check.selected)
      .map(([key, check]) => {
        // Handle all sub-checks
        if (key.includes('.')) {
          const [category, subTab] = key.split('.')
          const subTabNames: {[key: string]: {[key: string]: string}} = {
            'personalIdentity': {
              'address': 'Address Verification',
              'bvn': 'BVN Check',
              'nin': 'NIN Check',
              'frsc': 'FRSC History Check',
              'birthCertificate': 'Birth Certificate',
              'stateResidency': 'State Residency Verification',
              'nameChange': 'Name Change History',
              'phoneEmail': 'Phone & Email Verification',
              'passport': 'Passport History Verification'
            },
            'criminalRecord': {
              'criminalHistory': 'Criminal History',
              'financialCrime': 'Financial Crime History',
              'courtRecords': 'Court Records',
              'sexOffenderRegistry': 'Sex Offender Registry'
            },
            'financialCredit': {
              'creditReport': 'Credit Report',
              'incomeSources': 'Verified Income Sources',
              'outstandingDebts': 'Outstanding Debts & Liabilities',
              'businessFinancial': 'Business Financial History',
              'firsHistory': 'FIRS History',
              'bankVerification': 'Bank Verification',
              'loanHistory': 'Loan History'
            },
            'association': {
              'professionalBodies': 'Professional Bodies (NBA, ICAN, etc.)',
              'alumniNetworks': 'Alumni Networks (Harvard, Oxford, etc.)',
              'exclusiveAssociations': 'Exclusive Industry Associations',
              'politicalExposure': 'Political Exposure (PEPs)',
              'professionalAssociations': 'Professional Associations',
              'businessAssociations': 'Business Associations',
              'socialAssociations': 'Social Associations'
            },
            'medical': {
              'medicalHistory': 'Medical History',
              'medicalRecords': 'Medical Records',
              'drugTest': 'Drug Test',
              'fitnessAssessment': 'Fitness Assessment'
            },
            'employment': {
              'employmentHistory': 'Employment History',
              'referenceCheck': 'Reference Check',
              'backgroundGapAnalysis': 'Background Gap Analysis'
            },
            'education': {
              'degreeVerification': 'Degree Verification',
              'transcriptVerification': 'Transcript Verification',
              'professionalCertifications': 'Professional Certifications'
            },
            'socialMedia': {
              'newsArticles': 'News Articles & Public Mentions',
              'onlineContent': 'Online Content & Reputation Analysis',
              'thoughtLeadership': 'Thought Leadership & Professional Contributions',
              'socialMediaProfiles': 'Social Media Profiles',
              'reputationScore': 'Reputation Score'
            },
            'fraudDetection': {
              'identityFraud': 'Identity Fraud Check',
              'watchlistCheck': 'Watchlist Check',
              'deviceFingerprint': 'Device Fingerprint'
            }
          }
          // Special handling for address verification - show count
          if (key === 'personalIdentity.address') {
            const addressCount = request.details?.personalIdentity?.addresses?.length || 1
            return {
              name: `${subTabNames[category]?.[subTab] || key} (${addressCount} address${addressCount > 1 ? 'es' : ''})`,
              price: check.price * addressCount
            }
          }
          // Special handling for employment history verification - show count
          if (key === 'employment.employmentHistory') {
            const employmentCount = request.details?.employment?.employmentEntries?.length || 1
            return {
              name: `${subTabNames[category]?.[subTab] || key} (${employmentCount} employment${employmentCount > 1 ? 's' : ''})`,
              price: check.price * employmentCount
            }
          }
          // Special handling for degree verification - show count
          if (key === 'education.degreeVerification') {
            const degreeCount = request.details?.education?.degreeEntries?.length || 1
            return {
              name: `${subTabNames[category]?.[subTab] || key} (${degreeCount} degree${degreeCount > 1 ? 's' : ''})`,
              price: check.price * degreeCount
            }
          }
          // Special handling for income sources verification - show count
          if (key === 'financialCredit.incomeSources') {
            const incomeCount = request.details?.financialCredit?.incomeSourceEntries?.length || 1
            return {
              name: `${subTabNames[category]?.[subTab] || key} (${incomeCount} source${incomeCount > 1 ? 's' : ''})`,
              price: check.price * incomeCount
            }
          }
          return {
            name: subTabNames[category]?.[subTab] || key,
            price: check.price
          }
        }
        // Handle other categories
        return {
          name: categories.find(c => c.key === key)?.name || key,
          price: check.price
        }
      })
  }

  const renderPersonalIdentityContent = () => {
    const details = request.details?.personalIdentity
    const subTabs = [
      { key: 'address', name: 'Address', icon: MapPin, price: 2000 },
      { key: 'bvn', name: 'BVN Check', icon: User, price: 1500 },
      { key: 'nin', name: 'NIN Check', icon: User, price: 1000 },
      { key: 'frsc', name: 'FRSC History', icon: User, price: 2500 },
      { key: 'birthCertificate', name: 'Birth Certificate', icon: User, price: 1800 },
      { key: 'stateResidency', name: 'State Residency', icon: MapPin, price: 1200 },
      { key: 'nameChange', name: 'Name change', icon: User, price: 800 },
      { key: 'phoneEmail', name: 'Phone & Email', icon: Mail, price: 500 },
      { key: 'passport', name: 'Passport', icon: User, price: 3000 }
    ]

    return (
      <div className="space-y-6">
        {/* Sub-tabs */}
        <div className="flex space-x-1 border-b border-gray-200 overflow-x-auto">
          {subTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setSelectedSubTab(tab.key)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap flex-shrink-0 ${
                selectedSubTab === tab.key
                  ? 'border-red-500 text-red-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Content based on selected sub-tab */}
        {selectedSubTab === 'address' && (
          <div className="space-y-6">
            {!selectedChecks['personalIdentity.address']?.selected ? (
              <div className="text-center py-12 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl border-2 border-dashed border-blue-200">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MapPin className="h-10 w-10 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Address Verification</h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  Verify multiple residential addresses for comprehensive background checking. Each address is calculated separately.
                </p>
                <div className="flex items-center justify-center space-x-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">₦2,000</div>
                    <div className="text-sm text-gray-500">per address</div>
                  </div>
                  <div className="text-gray-400">×</div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">1</div>
                    <div className="text-sm text-gray-500">address</div>
                  </div>
                  <div className="text-gray-400">=</div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">₦2,000</div>
                    <div className="text-sm text-gray-500">total</div>
                  </div>
                </div>
                <button
                  onClick={() => toggleCheck('personalIdentity.address')}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-xl transition-colors shadow-lg hover:shadow-xl"
                >
                  Start Address Verification
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Header with controls */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <MapPin className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">Address Verification</h3>
                        <p className="text-sm text-gray-600">
                          {request.details?.personalIdentity?.addresses?.length || 1} address{(request.details?.personalIdentity?.addresses?.length || 1) > 1 ? 'es' : ''} selected
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-900">
                          ₦{((request.details?.personalIdentity?.addresses?.length || 1) * 2000).toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-500">total cost</div>
                      </div>
                      <button
                        onClick={() => toggleCheck('personalIdentity.address')}
                        className="bg-red-100 text-red-700 hover:bg-red-200 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                      >
                        Remove All
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={addNewAddress}
                        className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                      >
                        <Plus className="h-4 w-4" />
                        <span>Add Address</span>
                      </button>
                      <span className="text-sm text-gray-500">
                        Each additional address costs ₦2,000
                      </span>
                    </div>
                  </div>
                </div>

                {/* Address Cards */}
                <div className="space-y-4">
                  {request.details?.personalIdentity?.addresses?.map((address, index) => {
                    const isExpanded = expandedAddresses.has(address.id)
                    return (
                      <div key={address.id} className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                        {/* Address Card Header */}
                        <div className="p-4 border-b border-gray-100">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                                <span className="text-sm font-medium text-gray-600">#{index + 1}</span>
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-900">
                                  {address.addressType ? address.addressType.charAt(0).toUpperCase() + address.addressType.slice(1) : 'Residential'} Address
                                </h4>
                                <p className="text-sm text-gray-500">
                                  {address.street && address.buildingNumber 
                                    ? `${address.buildingNumber} ${address.street}, ${address.city || 'City'}, ${address.state || 'State'}`
                                    : 'Address details pending'
                                  }
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="text-right">
                                <div className="text-sm font-medium text-gray-900">₦2,000</div>
                                <div className="text-xs text-gray-500">per address</div>
                              </div>
                              {(request.details?.personalIdentity?.addresses?.length || 0) > 1 && (
                                <button
                                  onClick={() => removeAddress(address.id)}
                                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                  title="Remove this address"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              )}
                              <button
                                onClick={() => toggleAddressExpansion(address.id)}
                                className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                                title={isExpanded ? "Collapse" : "Expand"}
                              >
                                <ChevronDown className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Address Form Content */}
                        {isExpanded && (
                          <div className="p-6 space-y-4">
                            {/* Address Type and Duration */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Address Type</label>
                                {isEditing ? (
                                  <select
                                    value={address.addressType || ''}
                                    onChange={(e) => updateAddress(address.id, 'addressType', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                  >
                                    <option value="">Select address type</option>
                                    <option value="residential">Residential</option>
                                    <option value="business">Business</option>
                                    <option value="mailing">Mailing</option>
                                    <option value="permanent">Permanent</option>
                                    <option value="temporary">Temporary</option>
                                  </select>
                                ) : (
                                  <p className="text-gray-900">{address.addressType || 'Not specified'}</p>
                                )}
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Duration of Residence</label>
                                {isEditing ? (
                                  <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
                                    <input
                                      type="text"
                                      placeholder="From"
                                      value={address.residenceFrom || ''}
                                      onChange={(e) => updateAddress(address.id, 'residenceFrom', e.target.value)}
                                      className="flex-1 w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                    />
                                    <span className="text-gray-500">to</span>
                                    <input
                                      type="text"
                                      placeholder="To"
                                      value={address.residenceTo || ''}
                                      onChange={(e) => updateAddress(address.id, 'residenceTo', e.target.value)}
                                      className="flex-1 w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                    />
                                  </div>
                                ) : (
                                  <p className="text-gray-900">
                                    {address.residenceFrom && address.residenceTo 
                                      ? `${address.residenceFrom} to ${address.residenceTo}`
                                      : address.residenceFrom || 'Not specified'
                                    }
                                  </p>
                                )}
                              </div>
                            </div>

                            {/* Location Details */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Street/Area</label>
                                {isEditing ? (
                                  <input
                                    type="text"
                                    value={address.street || ''}
                                    onChange={(e) => updateAddress(address.id, 'street', e.target.value)}
                                    placeholder="Street name or area"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                  />
                                ) : (
                                  <p className="text-gray-900">{address.street || 'Not specified'}</p>
                                )}
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Building/House Number</label>
                                {isEditing ? (
                                  <input
                                    type="text"
                                    value={address.buildingNumber || ''}
                                    onChange={(e) => updateAddress(address.id, 'buildingNumber', e.target.value)}
                                    placeholder="Building or house number"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                  />
                                ) : (
                                  <p className="text-gray-900">{address.buildingNumber || 'Not specified'}</p>
                                )}
                              </div>
                            </div>

                            {/* Geographic Information */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">City/Town</label>
                                {isEditing ? (
                                  <input
                                    type="text"
                                    value={address.city || ''}
                                    onChange={(e) => updateAddress(address.id, 'city', e.target.value)}
                                    placeholder="City or town"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                  />
                                ) : (
                                  <p className="text-gray-900">{address.city || 'Not specified'}</p>
                                )}
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                                {isEditing ? (
                                  <select
                                    value={address.state || ''}
                                    onChange={(e) => updateAddress(address.id, 'state', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                  >
                                    <option value="">Select state</option>
                                    <option value="Abia">Abia</option>
                                    <option value="Adamawa">Adamawa</option>
                                    <option value="Akwa Ibom">Akwa Ibom</option>
                                    <option value="Anambra">Anambra</option>
                                    <option value="Bauchi">Bauchi</option>
                                    <option value="Bayelsa">Bayelsa</option>
                                    <option value="Benue">Benue</option>
                                    <option value="Borno">Borno</option>
                                    <option value="Cross River">Cross River</option>
                                    <option value="Delta">Delta</option>
                                    <option value="Ebonyi">Ebonyi</option>
                                    <option value="Edo">Edo</option>
                                    <option value="Ekiti">Ekiti</option>
                                    <option value="Enugu">Enugu</option>
                                    <option value="FCT">Federal Capital Territory</option>
                                    <option value="Gombe">Gombe</option>
                                    <option value="Imo">Imo</option>
                                    <option value="Jigawa">Jigawa</option>
                                    <option value="Kaduna">Kaduna</option>
                                    <option value="Kano">Kano</option>
                                    <option value="Katsina">Katsina</option>
                                    <option value="Kebbi">Kebbi</option>
                                    <option value="Kogi">Kogi</option>
                                    <option value="Kwara">Kwara</option>
                                    <option value="Lagos">Lagos</option>
                                    <option value="Nasarawa">Nasarawa</option>
                                    <option value="Niger">Niger</option>
                                    <option value="Ogun">Ogun</option>
                                    <option value="Ondo">Ondo</option>
                                    <option value="Osun">Osun</option>
                                    <option value="Oyo">Oyo</option>
                                    <option value="Plateau">Plateau</option>
                                    <option value="Rivers">Rivers</option>
                                    <option value="Sokoto">Sokoto</option>
                                    <option value="Taraba">Taraba</option>
                                    <option value="Yobe">Yobe</option>
                                    <option value="Zamfara">Zamfara</option>
                                  </select>
                                ) : (
                                  <p className="text-gray-900">{address.state || 'Not specified'}</p>
                                )}
                              </div>
                            </div>

                            {/* Supporting Documents Upload */}
                            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                              <div className="flex items-center space-x-2 mb-4">
                                <FileText className="h-5 w-5 text-gray-600" />
                                <h4 className="font-medium text-gray-900">Supporting Documents</h4>
                                <span className="text-sm text-gray-500">(Optional but recommended)</span>
                              </div>
                              <p className="text-sm text-gray-600 mb-6">
                                Upload supporting documents to strengthen your address verification. Accepted formats: JPEG, PNG, PDF (max 10MB each).
                              </p>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Billing Document */}
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">Billing Document</label>
                                  {isEditing ? (
                                    <div className="space-y-3">
                                      {!uploadedBillingDocument ? (
                                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
                                          <input
                                            type="file"
                                            id={`billing-document-upload-${address.id}`}
                                            accept=".jpg,.jpeg,.png,.pdf"
                                            onChange={(e) => handleAddressDocumentUpload(e, 'billing')}
                                            className="hidden"
                                          />
                                          <label
                                            htmlFor={`billing-document-upload-${address.id}`}
                                            className="cursor-pointer flex flex-col items-center space-y-2"
                                          >
                                            <Upload className="h-6 w-6 text-gray-400" />
                                            <div className="text-sm text-gray-600">
                                              <span className="font-medium text-primary-600 hover:text-primary-700">Click to upload</span>
                                            </div>
                                            <div className="text-xs text-gray-500">Bank statement, utility bill, etc.</div>
                                          </label>
                                        </div>
                                      ) : (
                                        <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                                          <div className="flex items-center space-x-3">
                                            <FileText className="h-6 w-6 text-green-600" />
                                            <div>
                                              <p className="text-sm font-medium text-green-900">{uploadedBillingDocument.name}</p>
                                              <p className="text-xs text-green-700">
                                                {(uploadedBillingDocument.size / 1024 / 1024).toFixed(2)} MB
                                              </p>
                                            </div>
                                          </div>
                                          <div className="flex items-center space-x-2">
                                            <button
                                              onClick={() => uploadedBillingDocument && window.open(URL.createObjectURL(uploadedBillingDocument), '_blank')}
                                              className="text-green-600 hover:text-green-700 p-1"
                                              title="View file"
                                            >
                                              <Eye className="h-4 w-4" />
                                            </button>
                                            <button
                                              onClick={() => removeAddressDocument('billing')}
                                              className="text-red-600 hover:text-red-700 p-1"
                                              title="Remove file"
                                            >
                                              <X className="h-4 w-4" />
                                            </button>
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  ) : (
                                    <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                                      {uploadedBillingDocument ? (
                                        <div className="flex items-center space-x-3">
                                          <FileText className="h-5 w-5 text-gray-600" />
                                          <div>
                                            <p className="text-sm font-medium text-gray-900">{uploadedBillingDocument.name}</p>
                                            <p className="text-xs text-gray-600">
                                              {(uploadedBillingDocument.size / 1024 / 1024).toFixed(2)} MB
                                            </p>
                                          </div>
                                        </div>
                                      ) : (
                                        <p className="text-gray-500 text-sm">No document uploaded</p>
                                      )}
                                    </div>
                                  )}
                                </div>

                                {/* Light Bill */}
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">Light Bill (Electricity)</label>
                                  {isEditing ? (
                                    <div className="space-y-3">
                                      {!uploadedLightBill ? (
                                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
                                          <input
                                            type="file"
                                            id={`light-bill-upload-${address.id}`}
                                            accept=".jpg,.jpeg,.png,.pdf"
                                            onChange={(e) => handleAddressDocumentUpload(e, 'lightBill')}
                                            className="hidden"
                                          />
                                          <label
                                            htmlFor={`light-bill-upload-${address.id}`}
                                            className="cursor-pointer flex flex-col items-center space-y-2"
                                          >
                                            <Upload className="h-6 w-6 text-gray-400" />
                                            <div className="text-sm text-gray-600">
                                              <span className="font-medium text-primary-600 hover:text-primary-700">Click to upload</span>
                                            </div>
                                            <div className="text-xs text-gray-500">Electricity bill</div>
                                          </label>
                                        </div>
                                      ) : (
                                        <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                                          <div className="flex items-center space-x-3">
                                            <FileText className="h-6 w-6 text-green-600" />
                                            <div>
                                              <p className="text-sm font-medium text-green-900">{uploadedLightBill.name}</p>
                                              <p className="text-xs text-green-700">
                                                {(uploadedLightBill.size / 1024 / 1024).toFixed(2)} MB
                                              </p>
                                            </div>
                                          </div>
                                          <div className="flex items-center space-x-2">
                                            <button
                                              onClick={() => uploadedLightBill && window.open(URL.createObjectURL(uploadedLightBill), '_blank')}
                                              className="text-green-600 hover:text-green-700 p-1"
                                              title="View file"
                                            >
                                              <Eye className="h-4 w-4" />
                                            </button>
                                            <button
                                              onClick={() => removeAddressDocument('lightBill')}
                                              className="text-red-600 hover:text-red-700 p-1"
                                              title="Remove file"
                                            >
                                              <X className="h-4 w-4" />
                                            </button>
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  ) : (
                                    <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                                      {uploadedLightBill ? (
                                        <div className="flex items-center space-x-3">
                                          <FileText className="h-5 w-5 text-gray-600" />
                                          <div>
                                            <p className="text-sm font-medium text-gray-900">{uploadedLightBill.name}</p>
                                            <p className="text-xs text-gray-600">
                                              {(uploadedLightBill.size / 1024 / 1024).toFixed(2)} MB
                                            </p>
                                          </div>
                                        </div>
                                      ) : (
                                        <p className="text-gray-500 text-sm">No document uploaded</p>
                                      )}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {selectedSubTab === 'bvn' && (
          <div className="space-y-4">
            {!selectedChecks['personalIdentity.bvn']?.selected ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">BVN Verification</h3>
                <p className="text-gray-500 mb-4">Verify the candidate's Bank Verification Number</p>
                <button
                  onClick={() => toggleCheck('personalIdentity.bvn')}
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                >
                  Add BVN Check - ₦1,500
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">BVN Verification</h3>
                  <button
                    onClick={() => toggleCheck('personalIdentity.bvn')}
                    className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-full text-sm font-medium transition-colors"
                  >
                    Remove
                  </button>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">BVN Number</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={details?.bvn || ''}
                      onChange={(e) => {
                        // Only allow numbers and limit to 11 digits
                        const value = e.target.value.replace(/\D/g, '').slice(0, 11)
                        handleInputChange('details.personalIdentity.bvn', value)
                      }}
                      placeholder="Enter 11-digit BVN number"
                      maxLength={11}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900">{details?.bvn || 'Not provided'}</p>
                  )}
                  {isEditing && (
                    <p className="text-xs text-gray-500 mt-1">
                      {details?.bvn?.length || 0}/11 digits
                    </p>
                  )}
                </div>

                {/* BVN Information Section */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-blue-900 mb-2">How to get your BVN</h4>
                      <div className="text-sm text-blue-800 space-y-2">
                        <p><strong>Method 1 - USSD Code:</strong></p>
                        <ul className="list-disc list-inside ml-2 space-y-1">
                          <li>Dial <code className="bg-blue-100 px-1 rounded">*565*0#</code> on your registered phone number</li>
                          <li>Follow the prompts to retrieve your BVN</li>
                        </ul>
                        
                        <p className="mt-3"><strong>Method 2 - Bank Branch:</strong></p>
                        <ul className="list-disc list-inside ml-2 space-y-1">
                          <li>Visit any bank branch where you have an account</li>
                          <li>Present a valid ID (Driver's License, International Passport, or National ID)</li>
                          <li>Request for your BVN from the customer service desk</li>
                        </ul>
                        
                        <p className="mt-3"><strong>Method 3 - Online Banking:</strong></p>
                        <ul className="list-disc list-inside ml-2 space-y-1">
                          <li>Log into your bank's mobile app or internet banking</li>
                          <li>Navigate to account details or profile section</li>
                          <li>Your BVN should be displayed there</li>
                        </ul>
                        
                        <div className="mt-3 p-2 bg-blue-100 rounded text-xs">
                          <strong>Note:</strong> BVN is a unique 11-digit number that identifies you across all Nigerian banks. It's free to retrieve and required for most financial transactions.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {selectedSubTab === 'nin' && (
          <div className="space-y-4">
            {!selectedChecks['personalIdentity.nin']?.selected ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">NIN Verification</h3>
                <p className="text-gray-500 mb-4">Verify the candidate's National Identification Number</p>
                <button
                  onClick={() => toggleCheck('personalIdentity.nin')}
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                >
                  Add NIN Check - ₦1,000
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">NIN Verification</h3>
                  <button
                    onClick={() => toggleCheck('personalIdentity.nin')}
                    className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-full text-sm font-medium transition-colors"
                  >
                    Remove
                  </button>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">NIN Number</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={details?.nin || ''}
                      onChange={(e) => {
                        // Only allow numbers and limit to 11 digits
                        const value = e.target.value.replace(/\D/g, '').slice(0, 11)
                        handleInputChange('details.personalIdentity.nin', value)
                      }}
                      placeholder="Enter 11-digit NIN number"
                      maxLength={11}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900">{details?.nin || 'Not provided'}</p>
                  )}
                  {isEditing && (
                    <p className="text-xs text-gray-500 mt-1">
                      {details?.nin?.length || 0}/11 digits
                    </p>
                  )}
                </div>

                {/* NIN Information Section */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-green-900 mb-2">How to get your NIN</h4>
                      <div className="text-sm text-green-800 space-y-2">
                        <p><strong>Method 1 - NIMC Enrollment Center:</strong></p>
                        <ul className="list-disc list-inside ml-2 space-y-1">
                          <li>Visit any NIMC (National Identity Management Commission) enrollment center</li>
                          <li>Bring required documents: Birth certificate, valid ID, proof of address</li>
                          <li>Complete the enrollment form and biometric capture</li>
                          <li>Receive your NIN slip immediately after enrollment</li>
                        </ul>
                        
                        <p className="mt-3"><strong>Method 2 - NIMC Mobile App:</strong></p>
                        <ul className="list-disc list-inside ml-2 space-y-1">
                          <li>Download the NIMC Mobile App from Google Play Store or App Store</li>
                          <li>Register with your phone number and email</li>
                          <li>Follow the enrollment process and schedule an appointment</li>
                          <li>Visit the assigned center for biometric capture</li>
                        </ul>
                        
                        <p className="mt-3"><strong>Method 3 - NIMC Website:</strong></p>
                        <ul className="list-disc list-inside ml-2 space-y-1">
                          <li>Visit <code className="bg-green-100 px-1 rounded">www.nimc.gov.ng</code></li>
                          <li>Click on "Enroll for NIN" and fill the pre-enrollment form</li>
                          <li>Print the pre-enrollment slip</li>
                          <li>Visit any NIMC center with the slip for biometric capture</li>
                        </ul>
                        
                        <p className="mt-3"><strong>Method 4 - Retrieve Existing NIN:</strong></p>
                        <ul className="list-disc list-inside ml-2 space-y-1">
                          <li>Dial <code className="bg-green-100 px-1 rounded">*346#</code> on your registered phone number</li>
                          <li>Follow the prompts to retrieve your NIN</li>
                          <li>Or visit any NIMC center with valid ID to retrieve your NIN</li>
                        </ul>
                        
                        <div className="mt-3 p-2 bg-green-100 rounded text-xs">
                          <strong>Note:</strong> NIN is a unique 11-digit number that serves as your national identity. It's mandatory for all Nigerian citizens and legal residents. The enrollment is free of charge.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {selectedSubTab === 'frsc' && (
          <div className="space-y-4">
            {!selectedChecks['personalIdentity.frsc']?.selected ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">FRSC History Check</h3>
                <p className="text-gray-500 mb-4">Check the candidate's Federal Road Safety Corps history</p>
                <button
                  onClick={() => toggleCheck('personalIdentity.frsc')}
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                >
                  Add FRSC Check - ₦2,500
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">FRSC History Check</h3>
                  <button
                    onClick={() => toggleCheck('personalIdentity.frsc')}
                    className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-full text-sm font-medium transition-colors"
                  >
                    Remove
                  </button>
                </div>
                {/* Driver's License Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Driver's License Number</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={details?.licenseNumber || ''}
                        onChange={(e) => handleInputChange('details.personalIdentity.licenseNumber', e.target.value)}
                        placeholder="Enter license number"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.licenseNumber || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">License Class</label>
                    {isEditing ? (
                      <select
                        value={details?.licenseClass || ''}
                        onChange={(e) => handleInputChange('details.personalIdentity.licenseClass', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select license class</option>
                        <option value="A">Class A - Motorcycle</option>
                        <option value="B">Class B - Private Car</option>
                        <option value="C">Class C - Commercial Vehicle</option>
                        <option value="D">Class D - Heavy Duty Vehicle</option>
                        <option value="E">Class E - Tractor</option>
                        <option value="F">Class F - Public Passenger Vehicle</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.licenseClass || 'Not specified'}</p>
                    )}
                  </div>
                </div>

                {/* License Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Issue Date</label>
                    {isEditing ? (
                      <input
                        type="date"
                        value={details?.licenseIssueDate || ''}
                        onChange={(e) => handleInputChange('details.personalIdentity.licenseIssueDate', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.licenseIssueDate || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                    {isEditing ? (
                      <input
                        type="date"
                        value={details?.licenseExpiryDate || ''}
                        onChange={(e) => handleInputChange('details.personalIdentity.licenseExpiryDate', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.licenseExpiryDate || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* Vehicle Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Registration Number</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={details?.vehicleRegistration || ''}
                        onChange={(e) => handleInputChange('details.personalIdentity.vehicleRegistration', e.target.value)}
                        placeholder="e.g., ABC123DE"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.vehicleRegistration || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Make/Model</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={details?.vehicleMakeModel || ''}
                        onChange={(e) => handleInputChange('details.personalIdentity.vehicleMakeModel', e.target.value)}
                        placeholder="e.g., Toyota Camry"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.vehicleMakeModel || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* Violation History */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Traffic Violations</label>
                  {isEditing ? (
                    <textarea
                      rows={3}
                      value={details?.trafficViolations || ''}
                      onChange={(e) => handleInputChange('details.personalIdentity.trafficViolations', e.target.value)}
                      placeholder="List any traffic violations, fines, or penalties (if any)"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                    />
                  ) : (
                    <p className="text-gray-900">{details?.trafficViolations || 'No violations reported'}</p>
                  )}
                </div>

                {/* Accident History */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Accident History</label>
                  {isEditing ? (
                    <textarea
                      rows={3}
                      value={details?.accidentHistory || ''}
                      onChange={(e) => handleInputChange('details.personalIdentity.accidentHistory', e.target.value)}
                      placeholder="List any road accidents or incidents (if any)"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                    />
                  ) : (
                    <p className="text-gray-900">{details?.accidentHistory || 'No accidents reported'}</p>
                  )}
                </div>

                {/* License Status */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">License Status</label>
                    {isEditing ? (
                      <select
                        value={details?.licenseStatus || ''}
                        onChange={(e) => handleInputChange('details.personalIdentity.licenseStatus', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select status</option>
                        <option value="valid">Valid</option>
                        <option value="expired">Expired</option>
                        <option value="suspended">Suspended</option>
                        <option value="revoked">Revoked</option>
                        <option value="pending">Pending Renewal</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.licenseStatus || 'Not specified'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Points on License</label>
                    {isEditing ? (
                      <input
                        type="number"
                        min="0"
                        max="12"
                        value={details?.licensePoints || ''}
                        onChange={(e) => handleInputChange('details.personalIdentity.licensePoints', e.target.value)}
                        placeholder="0"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.licensePoints || '0'} points</p>
                    )}
                  </div>
                </div>

                {/* FRSC Information Section */}
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-orange-900 mb-2">About FRSC History Check</h4>
                      <div className="text-sm text-orange-800 space-y-2">
                        <p><strong>What we verify:</strong></p>
                        <ul className="list-disc list-inside ml-2 space-y-1">
                          <li>Driver's license validity and status</li>
                          <li>Traffic violation history and fines</li>
                          <li>Accident records and claims</li>
                          <li>License points and demerits</li>
                          <li>Vehicle registration details</li>
                        </ul>
                        
                        <div className="mt-3 p-2 bg-orange-100 rounded text-xs">
                          <strong>Note:</strong> FRSC (Federal Road Safety Corps) history check helps verify driving records, traffic violations, and overall road safety compliance. This information is crucial for positions involving driving or vehicle operation.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {selectedSubTab === 'stateResidency' && (
          <div className="space-y-4">
            {!selectedChecks['personalIdentity.stateResidency']?.selected ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">State Residency Verification</h3>
                <p className="text-gray-500 mb-4">Verify the candidate's state of residence</p>
                <button
                  onClick={() => toggleCheck('personalIdentity.stateResidency')}
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                >
                  Add State Residency Check - ₦1,200
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">State Residency Verification</h3>
                  <button
                    onClick={() => toggleCheck('personalIdentity.stateResidency')}
                    className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-full text-sm font-medium transition-colors"
                  >
                    Remove
                  </button>
                </div>
                {/* Current State of Residence */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Current State of Residence</label>
                    {isEditing ? (
                      <select
                        value={details?.currentState || ''}
                        onChange={(e) => handleInputChange('details.personalIdentity.currentState', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select current state</option>
                        <option value="Abia">Abia</option>
                        <option value="Adamawa">Adamawa</option>
                        <option value="Akwa Ibom">Akwa Ibom</option>
                        <option value="Anambra">Anambra</option>
                        <option value="Bauchi">Bauchi</option>
                        <option value="Bayelsa">Bayelsa</option>
                        <option value="Benue">Benue</option>
                        <option value="Borno">Borno</option>
                        <option value="Cross River">Cross River</option>
                        <option value="Delta">Delta</option>
                        <option value="Ebonyi">Ebonyi</option>
                        <option value="Edo">Edo</option>
                        <option value="Ekiti">Ekiti</option>
                        <option value="Enugu">Enugu</option>
                        <option value="FCT">Federal Capital Territory</option>
                        <option value="Gombe">Gombe</option>
                        <option value="Imo">Imo</option>
                        <option value="Jigawa">Jigawa</option>
                        <option value="Kaduna">Kaduna</option>
                        <option value="Kano">Kano</option>
                        <option value="Katsina">Katsina</option>
                        <option value="Kebbi">Kebbi</option>
                        <option value="Kogi">Kogi</option>
                        <option value="Kwara">Kwara</option>
                        <option value="Lagos">Lagos</option>
                        <option value="Nasarawa">Nasarawa</option>
                        <option value="Niger">Niger</option>
                        <option value="Ogun">Ogun</option>
                        <option value="Ondo">Ondo</option>
                        <option value="Osun">Osun</option>
                        <option value="Oyo">Oyo</option>
                        <option value="Plateau">Plateau</option>
                        <option value="Rivers">Rivers</option>
                        <option value="Sokoto">Sokoto</option>
                        <option value="Taraba">Taraba</option>
                        <option value="Yobe">Yobe</option>
                        <option value="Zamfara">Zamfara</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.currentState || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Duration of Current Residence</label>
                    {isEditing ? (
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          placeholder="From"
                          value={details?.residenceFrom || ''}
                          onChange={(e) => handleInputChange('details.personalIdentity.residenceFrom', e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                        <span className="text-gray-500">to</span>
                        <input
                          type="text"
                          placeholder="To"
                          value={details?.residenceTo || ''}
                          onChange={(e) => handleInputChange('details.personalIdentity.residenceTo', e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                    ) : (
                      <p className="text-gray-900">
                        {details?.residenceFrom && details?.residenceTo 
                          ? `${details.residenceFrom} to ${details.residenceTo}`
                          : details?.residenceFrom || 'Not specified'
                        }
                      </p>
                    )}
                  </div>
                </div>

                {/* Previous States of Residence */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Previous States of Residence</label>
                  {isEditing ? (
                    <textarea
                      rows={3}
                      value={details?.previousStates || ''}
                      onChange={(e) => handleInputChange('details.personalIdentity.previousStates', e.target.value)}
                      placeholder="List any previous states where you have resided (include dates if known)"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                    />
                  ) : (
                    <p className="text-gray-900">{details?.previousStates || 'No previous states listed'}</p>
                  )}
                </div>

                {/* Residency Type and Status */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Residency Type</label>
                    {isEditing ? (
                      <select
                        value={details?.residencyType || ''}
                        onChange={(e) => handleInputChange('details.personalIdentity.residencyType', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select residency type</option>
                        <option value="permanent">Permanent Resident</option>
                        <option value="temporary">Temporary Resident</option>
                        <option value="student">Student Resident</option>
                        <option value="work">Work Permit Holder</option>
                        <option value="indigene">State Indigene</option>
                        <option value="non-indigene">Non-Indigene</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.residencyType || 'Not specified'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Residency Status</label>
                    {isEditing ? (
                      <select
                        value={details?.residencyStatus || ''}
                        onChange={(e) => handleInputChange('details.personalIdentity.residencyStatus', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select status</option>
                        <option value="verified">Verified</option>
                        <option value="pending">Pending Verification</option>
                        <option value="expired">Expired</option>
                        <option value="suspended">Suspended</option>
                        <option value="under-review">Under Review</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.residencyStatus || 'Not specified'}</p>
                    )}
                  </div>
                </div>

                {/* Supporting Documents */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Supporting Documents</label>
                  {isEditing ? (
                    <textarea
                      rows={3}
                      value={details?.residencyDocuments || ''}
                      onChange={(e) => handleInputChange('details.personalIdentity.residencyDocuments', e.target.value)}
                      placeholder="List supporting documents (e.g., utility bills, tenancy agreement, employment letter, school admission letter, etc.)"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                    />
                  ) : (
                    <p className="text-gray-900">{details?.residencyDocuments || 'No documents listed'}</p>
                  )}
                </div>

                {/* Verification Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Verification Method</label>
                    {isEditing ? (
                      <select
                        value={details?.verificationMethod || ''}
                        onChange={(e) => handleInputChange('details.personalIdentity.verificationMethod', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select verification method</option>
                        <option value="document-verification">Document Verification</option>
                        <option value="database-check">Database Check</option>
                        <option value="physical-verification">Physical Verification</option>
                        <option value="third-party-verification">Third Party Verification</option>
                        <option value="cross-reference">Cross Reference</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.verificationMethod || 'Not specified'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Verified</label>
                    {isEditing ? (
                      <input
                        type="date"
                        value={details?.lastVerified || ''}
                        onChange={(e) => handleInputChange('details.personalIdentity.lastVerified', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.lastVerified || 'Not verified'}</p>
                    )}
                  </div>
                </div>

                {/* State Residency Information Section */}
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-purple-900 mb-2">About State Residency Verification</h4>
                      <div className="text-sm text-purple-800 space-y-2">
                        <p><strong>What we verify:</strong></p>
                        <ul className="list-disc list-inside ml-2 space-y-1">
                          <li>Current state of residence and duration</li>
                          <li>Previous states of residence history</li>
                          <li>Residency type and status</li>
                          <li>Supporting documentation</li>
                          <li>Verification through official databases</li>
                        </ul>
                        
                        <div className="mt-3 p-2 bg-purple-100 rounded text-xs">
                          <strong>Note:</strong> State residency verification helps confirm where an individual currently resides and their residency history. This is important for employment, education, and various official processes that require state-specific documentation.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {selectedSubTab === 'nameChange' && (
          <div className="space-y-4">
            {!selectedChecks['personalIdentity.nameChange']?.selected ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Name Change History</h3>
                <p className="text-gray-500 mb-4">Check for any legal name changes</p>
                <button
                  onClick={() => toggleCheck('personalIdentity.nameChange')}
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                >
                  Add Name Change Check - ₦800
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Name Change History</h3>
                  <button
                    onClick={() => toggleCheck('personalIdentity.nameChange')}
                    className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-full text-sm font-medium transition-colors"
                  >
                    Remove
                  </button>
                </div>
                {/* Current Name Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Current Full Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={details?.currentFullName || ''}
                        onChange={(e) => handleInputChange('details.personalIdentity.currentFullName', e.target.value)}
                        placeholder="Enter current full name"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.currentFullName || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name Change Date</label>
                    {isEditing ? (
                      <input
                        type="date"
                        value={details?.nameChangeDate || ''}
                        onChange={(e) => handleInputChange('details.personalIdentity.nameChangeDate', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.nameChangeDate || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* Previous Names */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Previous Full Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={details?.previousFullName || ''}
                        onChange={(e) => handleInputChange('details.personalIdentity.previousFullName', e.target.value)}
                        placeholder="Enter previous full name"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.previousFullName || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Birth Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={details?.birthName || ''}
                        onChange={(e) => handleInputChange('details.personalIdentity.birthName', e.target.value)}
                        placeholder="Enter name at birth"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.birthName || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* Name Change Reason and Type */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Reason for Name Change</label>
                    {isEditing ? (
                      <select
                        value={details?.nameChangeReason || ''}
                        onChange={(e) => handleInputChange('details.personalIdentity.nameChangeReason', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select reason</option>
                        <option value="marriage">Marriage</option>
                        <option value="divorce">Divorce</option>
                        <option value="adoption">Adoption</option>
                        <option value="personal-preference">Personal Preference</option>
                        <option value="religious-reasons">Religious Reasons</option>
                        <option value="cultural-reasons">Cultural Reasons</option>
                        <option value="professional-reasons">Professional Reasons</option>
                        <option value="other">Other</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.nameChangeReason || 'Not specified'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type of Name Change</label>
                    {isEditing ? (
                      <select
                        value={details?.nameChangeType || ''}
                        onChange={(e) => handleInputChange('details.personalIdentity.nameChangeType', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select type</option>
                        <option value="first-name">First Name Only</option>
                        <option value="last-name">Last Name Only</option>
                        <option value="middle-name">Middle Name Only</option>
                        <option value="full-name">Full Name</option>
                        <option value="spelling-correction">Spelling Correction</option>
                        <option value="nickname-to-legal">Nickname to Legal Name</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.nameChangeType || 'Not specified'}</p>
                    )}
                  </div>
                </div>

                {/* Legal Documentation */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Court Order Number</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={details?.courtOrderNumber || ''}
                        onChange={(e) => handleInputChange('details.personalIdentity.courtOrderNumber', e.target.value)}
                        placeholder="Enter court order number (if applicable)"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.courtOrderNumber || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Court Order Date</label>
                    {isEditing ? (
                      <input
                        type="date"
                        value={details?.courtOrderDate || ''}
                        onChange={(e) => handleInputChange('details.personalIdentity.courtOrderDate', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.courtOrderDate || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* Issuing Authority and Status */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Issuing Court/Authority</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={details?.issuingCourt || ''}
                        onChange={(e) => handleInputChange('details.personalIdentity.issuingCourt', e.target.value)}
                        placeholder="Enter issuing court or authority"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.issuingCourt || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name Change Status</label>
                    {isEditing ? (
                      <select
                        value={details?.nameChangeStatus || ''}
                        onChange={(e) => handleInputChange('details.personalIdentity.nameChangeStatus', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select status</option>
                        <option value="completed">Completed</option>
                        <option value="in-progress">In Progress</option>
                        <option value="pending">Pending</option>
                        <option value="rejected">Rejected</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.nameChangeStatus || 'Not specified'}</p>
                    )}
                  </div>
                </div>

                {/* Additional Names and History */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">All Previous Names (Chronological Order)</label>
                  {isEditing ? (
                    <textarea
                      value={details?.allPreviousNames || ''}
                      onChange={(e) => handleInputChange('details.personalIdentity.allPreviousNames', e.target.value)}
                      placeholder="List all previous names in chronological order with dates"
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900">{details?.allPreviousNames || 'Not provided'}</p>
                  )}
                </div>

                {/* Supporting Documents */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Supporting Documents</label>
                  {isEditing ? (
                    <textarea
                      value={details?.nameChangeDocuments || ''}
                      onChange={(e) => handleInputChange('details.personalIdentity.nameChangeDocuments', e.target.value)}
                      placeholder="List supporting documents (marriage certificate, court order, etc.)"
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900">{details?.nameChangeDocuments || 'Not provided'}</p>
                  )}
                </div>

                {/* Additional Information */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Additional Information</label>
                  {isEditing ? (
                    <textarea
                      value={details?.nameChangeAdditionalInfo || ''}
                      onChange={(e) => handleInputChange('details.personalIdentity.nameChangeAdditionalInfo', e.target.value)}
                      placeholder="Any additional information about the name change"
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900">{details?.nameChangeAdditionalInfo || 'Not provided'}</p>
                  )}
                </div>

                {/* Name Change Document Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name Change Documents</label>
                  {isEditing ? (
                    <div className="space-y-3">
                      {!uploadedNameChangeDocuments || uploadedNameChangeDocuments.length === 0 ? (
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                          <input
                            type="file"
                            id="name-change-upload"
                            accept=".jpg,.jpeg,.png,.pdf"
                            multiple
                            onChange={(e) => handleNameChangeDocumentUpload(e)}
                            className="hidden"
                          />
                          <label htmlFor="name-change-upload" className="cursor-pointer">
                            <div className="flex flex-col items-center">
                              <Upload className="h-8 w-8 text-gray-400 mb-2" />
                              <p className="text-sm text-gray-600 mb-1">
                                <span className="font-medium text-primary-600">Click to upload</span> or drag and drop
                              </p>
                              <p className="text-xs text-gray-500">JPEG, PNG, or PDF (max 10MB each)</p>
                            </div>
                          </label>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {uploadedNameChangeDocuments.map((file, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg">
                              <div className="flex items-center space-x-3">
                                <FileText className="h-5 w-5 text-gray-600" />
                                <div>
                                  <p className="text-sm font-medium text-gray-900">{file.name}</p>
                                  <p className="text-xs text-gray-600">
                                    {(file.size / 1024 / 1024).toFixed(2)} MB
                                  </p>
                                </div>
                              </div>
                              <button
                                onClick={() => removeNameChangeDocument(index)}
                                className="text-red-600 hover:text-red-800 transition-colors"
                              >
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </div>
                          ))}
                          <button
                            onClick={() => document.getElementById('name-change-upload')?.click()}
                            className="w-full py-2 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                          >
                            Add More Documents
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                      {uploadedNameChangeDocuments && uploadedNameChangeDocuments.length > 0 ? (
                        <div className="space-y-2">
                          {uploadedNameChangeDocuments.map((file, index) => (
                            <div key={index} className="flex items-center space-x-3">
                              <FileText className="h-5 w-5 text-gray-600" />
                              <div>
                                <p className="text-sm font-medium text-gray-900">{file.name}</p>
                                <p className="text-xs text-gray-600">
                                  {(file.size / 1024 / 1024).toFixed(2)} MB
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500 text-sm">No documents uploaded</p>
                      )}
                    </div>
                  )}
                </div>

                {/* Name Change Information Section */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-green-900 mb-2">About Name Change Verification</h4>
                      <div className="text-sm text-green-800 space-y-2">
                        <p><strong>What we verify:</strong></p>
                        <ul className="list-disc list-inside ml-2 space-y-1">
                          <li>Legal name change history and documentation</li>
                          <li>Previous names and aliases used</li>
                          <li>Court orders and legal documentation</li>
                          <li>Reason and type of name changes</li>
                          <li>Issuing authority and status verification</li>
                          <li>Supporting documentation validation</li>
                          <li>Chronological name change timeline</li>
                        </ul>
                        
                        <div className="mt-3 p-2 bg-green-100 rounded text-xs">
                          <strong>Note:</strong> Name change verification helps track an individual's legal name history, which is important for identity verification, background checks, and ensuring all names are properly documented for legal and professional purposes.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {selectedSubTab === 'phoneEmail' && (
          <div className="space-y-4">
            {!selectedChecks['personalIdentity.phoneEmail']?.selected ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Phone & Email Verification</h3>
                <p className="text-gray-500 mb-4">Verify the candidate's phone number and email address</p>
                <button
                  onClick={() => toggleCheck('personalIdentity.phoneEmail')}
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                >
                  Add Phone & Email Check - ₦500
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Phone & Email Verification</h3>
                  <button
                    onClick={() => toggleCheck('personalIdentity.phoneEmail')}
                    className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-full text-sm font-medium transition-colors"
                  >
                    Remove
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={details?.email || ''}
                        onChange={(e) => handleInputChange('details.personalIdentity.email', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.email || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={details?.email || ''}
                        onChange={(e) => handleInputChange('details.personalIdentity.email', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.email || 'Not provided'}</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {selectedSubTab === 'birthCertificate' && (
          <div className="space-y-4">
            {!selectedChecks['personalIdentity.birthCertificate']?.selected ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Birth Certificate Verification</h3>
                <p className="text-gray-500 mb-4">Verify the candidate's birth certificate details</p>
                <button
                  onClick={() => toggleCheck('personalIdentity.birthCertificate')}
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                >
                  Add Birth Certificate Check - ₦1,800
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Birth Certificate Verification</h3>
                  <button
                    onClick={() => toggleCheck('personalIdentity.birthCertificate')}
                    className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-full text-sm font-medium transition-colors"
                  >
                    Remove
                  </button>
                </div>
                {/* Birth Certificate Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Birth Certificate Number</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={details?.birthCertNumber || ''}
                        onChange={(e) => handleInputChange('details.personalIdentity.birthCertNumber', e.target.value)}
                        placeholder="Enter birth certificate number"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.birthCertNumber || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                    {isEditing ? (
                      <input
                        type="date"
                        value={details?.dateOfBirth || ''}
                        onChange={(e) => handleInputChange('details.personalIdentity.dateOfBirth', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.dateOfBirth || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* Place of Birth */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Place of Birth (City/Town)</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={details?.placeOfBirth || ''}
                        onChange={(e) => handleInputChange('details.personalIdentity.placeOfBirth', e.target.value)}
                        placeholder="Enter city or town of birth"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.placeOfBirth || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">State of Birth</label>
                    {isEditing ? (
                      <select
                        value={details?.stateOfBirth || ''}
                        onChange={(e) => handleInputChange('details.personalIdentity.stateOfBirth', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select state of birth</option>
                        <option value="Abia">Abia</option>
                        <option value="Adamawa">Adamawa</option>
                        <option value="Akwa Ibom">Akwa Ibom</option>
                        <option value="Anambra">Anambra</option>
                        <option value="Bauchi">Bauchi</option>
                        <option value="Bayelsa">Bayelsa</option>
                        <option value="Benue">Benue</option>
                        <option value="Borno">Borno</option>
                        <option value="Cross River">Cross River</option>
                        <option value="Delta">Delta</option>
                        <option value="Ebonyi">Ebonyi</option>
                        <option value="Edo">Edo</option>
                        <option value="Ekiti">Ekiti</option>
                        <option value="Enugu">Enugu</option>
                        <option value="FCT">Federal Capital Territory</option>
                        <option value="Gombe">Gombe</option>
                        <option value="Imo">Imo</option>
                        <option value="Jigawa">Jigawa</option>
                        <option value="Kaduna">Kaduna</option>
                        <option value="Kano">Kano</option>
                        <option value="Katsina">Katsina</option>
                        <option value="Kebbi">Kebbi</option>
                        <option value="Kogi">Kogi</option>
                        <option value="Kwara">Kwara</option>
                        <option value="Lagos">Lagos</option>
                        <option value="Nasarawa">Nasarawa</option>
                        <option value="Niger">Niger</option>
                        <option value="Ogun">Ogun</option>
                        <option value="Ondo">Ondo</option>
                        <option value="Osun">Osun</option>
                        <option value="Oyo">Oyo</option>
                        <option value="Plateau">Plateau</option>
                        <option value="Rivers">Rivers</option>
                        <option value="Sokoto">Sokoto</option>
                        <option value="Taraba">Taraba</option>
                        <option value="Yobe">Yobe</option>
                        <option value="Zamfara">Zamfara</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.stateOfBirth || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* Registration Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Registration Date</label>
                    {isEditing ? (
                      <input
                        type="date"
                        value={details?.registrationDate || ''}
                        onChange={(e) => handleInputChange('details.personalIdentity.registrationDate', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.registrationDate || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Registration Office</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={details?.registrationOffice || ''}
                        onChange={(e) => handleInputChange('details.personalIdentity.registrationOffice', e.target.value)}
                        placeholder="Enter registration office"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.registrationOffice || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* Parents Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Father's Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={details?.fathersName || ''}
                        onChange={(e) => handleInputChange('details.personalIdentity.fathersName', e.target.value)}
                        placeholder="Enter father's full name"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.fathersName || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mother's Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={details?.mothersName || ''}
                        onChange={(e) => handleInputChange('details.personalIdentity.mothersName', e.target.value)}
                        placeholder="Enter mother's full name"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.mothersName || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* Additional Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                    {isEditing ? (
                      <select
                        value={details?.gender || ''}
                        onChange={(e) => handleInputChange('details.personalIdentity.gender', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.gender || 'Not specified'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Birth Weight</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={details?.birthWeight || ''}
                        onChange={(e) => handleInputChange('details.personalIdentity.birthWeight', e.target.value)}
                        placeholder="e.g., 3.2kg"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.birthWeight || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* Birth Certificate Status */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Certificate Status</label>
                    {isEditing ? (
                      <select
                        value={details?.certificateStatus || ''}
                        onChange={(e) => handleInputChange('details.personalIdentity.certificateStatus', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select status</option>
                        <option value="original">Original</option>
                        <option value="certified-copy">Certified Copy</option>
                        <option value="replacement">Replacement</option>
                        <option value="amended">Amended</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.certificateStatus || 'Not specified'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Issuing Authority</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={details?.issuingAuthority || ''}
                        onChange={(e) => handleInputChange('details.personalIdentity.issuingAuthority', e.target.value)}
                        placeholder="e.g., National Population Commission"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.issuingAuthority || 'Not provided'}</p>
                    )}
                  </div>
                </div>
                
                {/* Birth Certificate Upload */}
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Birth Certificate Document</label>
                  {isEditing ? (
                    <div className="space-y-3">
                      {!uploadedBirthCertificate ? (
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                          <input
                            type="file"
                            id="birth-certificate-upload"
                            accept=".jpg,.jpeg,.png,.pdf"
                            onChange={handleFileUpload}
                            className="hidden"
                          />
                          <label
                            htmlFor="birth-certificate-upload"
                            className="cursor-pointer flex flex-col items-center space-y-2"
                          >
                            <Upload className="h-8 w-8 text-gray-400" />
                            <div className="text-sm text-gray-600">
                              <span className="font-medium text-primary-600 hover:text-primary-700">Click to upload</span> or drag and drop
                            </div>
                            <div className="text-xs text-gray-500">
                              PNG, JPG, PDF up to 5MB
                            </div>
                          </label>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <FileText className="h-8 w-8 text-green-600" />
                            <div>
                              <p className="text-sm font-medium text-green-900">{uploadedBirthCertificate.name}</p>
                              <p className="text-xs text-green-700">
                                {(uploadedBirthCertificate.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => window.open(URL.createObjectURL(uploadedBirthCertificate), '_blank')}
                              className="text-green-600 hover:text-green-700 p-1"
                              title="View file"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            <button
                              onClick={removeUploadedFile}
                              className="text-red-600 hover:text-red-700 p-1"
                              title="Remove file"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                      {uploadedBirthCertificate ? (
                        <div className="flex items-center space-x-3">
                          <FileText className="h-6 w-6 text-gray-600" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">{uploadedBirthCertificate.name}</p>
                            <p className="text-xs text-gray-600">
                              {(uploadedBirthCertificate.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                      ) : (
                        <p className="text-gray-500 text-sm">No document uploaded</p>
                      )}
                    </div>
                  )}
                </div>

                {/* Birth Certificate Information Section */}
                <div className="bg-pink-50 border border-pink-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-pink-900 mb-2">About Birth Certificate Verification</h4>
                      <div className="text-sm text-pink-800 space-y-2">
                        <p><strong>What we verify:</strong></p>
                        <ul className="list-disc list-inside ml-2 space-y-1">
                          <li>Birth certificate authenticity and validity</li>
                          <li>Date and place of birth accuracy</li>
                          <li>Parental information verification</li>
                          <li>Registration details and issuing authority</li>
                          <li>Certificate status and amendments</li>
                        </ul>
                        
                        <div className="mt-3 p-2 bg-pink-100 rounded text-xs">
                          <strong>Note:</strong> Birth certificate verification helps confirm an individual's identity, age, and place of birth. This is essential for employment, education, legal processes, and various official documentation requirements.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {selectedSubTab === 'passport' && (
          <div className="space-y-4">
            {!selectedChecks['personalIdentity.passport']?.selected ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Passport History Verification</h3>
                <p className="text-gray-500 mb-4">Verify the candidate's passport details and travel history</p>
                <button
                  onClick={() => toggleCheck('personalIdentity.passport')}
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                >
                  Add Passport Check - ₦3,000
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Passport History Verification</h3>
                  <button
                    onClick={() => toggleCheck('personalIdentity.passport')}
                    className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-full text-sm font-medium transition-colors"
                  >
                    Remove
                  </button>
                </div>
                {/* Passport Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Passport Number</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={details?.passportNumber || ''}
                        onChange={(e) => handleInputChange('details.personalIdentity.passportNumber', e.target.value)}
                        placeholder="Enter passport number"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.passportNumber || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Passport Type</label>
                    {isEditing ? (
                      <select
                        value={details?.passportType || ''}
                        onChange={(e) => handleInputChange('details.personalIdentity.passportType', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select passport type</option>
                        <option value="ordinary">Ordinary Passport</option>
                        <option value="diplomatic">Diplomatic Passport</option>
                        <option value="official">Official Passport</option>
                        <option value="service">Service Passport</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.passportType || 'Not specified'}</p>
                    )}
                  </div>
                </div>

                {/* Issue and Expiry Dates */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Issue Date</label>
                    {isEditing ? (
                      <input
                        type="date"
                        value={details?.passportIssueDate || ''}
                        onChange={(e) => handleInputChange('details.personalIdentity.passportIssueDate', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.passportIssueDate || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                    {isEditing ? (
                      <input
                        type="date"
                        value={details?.passportExpiryDate || ''}
                        onChange={(e) => handleInputChange('details.personalIdentity.passportExpiryDate', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.passportExpiryDate || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* Issuing Authority and Country */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Issuing Country</label>
                    {isEditing ? (
                      <select
                        value={details?.passportIssuingCountry || ''}
                        onChange={(e) => handleInputChange('details.personalIdentity.passportIssuingCountry', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select issuing country</option>
                        <option value="Nigeria">Nigeria</option>
                        <option value="United States">United States</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Canada">Canada</option>
                        <option value="Germany">Germany</option>
                        <option value="France">France</option>
                        <option value="Italy">Italy</option>
                        <option value="Spain">Spain</option>
                        <option value="Netherlands">Netherlands</option>
                        <option value="Belgium">Belgium</option>
                        <option value="Switzerland">Switzerland</option>
                        <option value="Austria">Austria</option>
                        <option value="Sweden">Sweden</option>
                        <option value="Norway">Norway</option>
                        <option value="Denmark">Denmark</option>
                        <option value="Finland">Finland</option>
                        <option value="Australia">Australia</option>
                        <option value="New Zealand">New Zealand</option>
                        <option value="Japan">Japan</option>
                        <option value="South Korea">South Korea</option>
                        <option value="Singapore">Singapore</option>
                        <option value="Malaysia">Malaysia</option>
                        <option value="Thailand">Thailand</option>
                        <option value="India">India</option>
                        <option value="China">China</option>
                        <option value="Brazil">Brazil</option>
                        <option value="Argentina">Argentina</option>
                        <option value="Chile">Chile</option>
                        <option value="South Africa">South Africa</option>
                        <option value="Egypt">Egypt</option>
                        <option value="Kenya">Kenya</option>
                        <option value="Ghana">Ghana</option>
                        <option value="Other">Other</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.passportIssuingCountry || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Issuing Authority</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={details?.passportIssuingAuthority || ''}
                        onChange={(e) => handleInputChange('details.personalIdentity.passportIssuingAuthority', e.target.value)}
                        placeholder="e.g., Nigeria Immigration Service"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.passportIssuingAuthority || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name (as on passport)</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={details?.passportFullName || ''}
                        onChange={(e) => handleInputChange('details.personalIdentity.passportFullName', e.target.value)}
                        placeholder="Enter full name as it appears on passport"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.passportFullName || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth (as on passport)</label>
                    {isEditing ? (
                      <input
                        type="date"
                        value={details?.passportDateOfBirth || ''}
                        onChange={(e) => handleInputChange('details.personalIdentity.passportDateOfBirth', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.passportDateOfBirth || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* Place of Birth and Nationality */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Place of Birth (as on passport)</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={details?.passportPlaceOfBirth || ''}
                        onChange={(e) => handleInputChange('details.personalIdentity.passportPlaceOfBirth', e.target.value)}
                        placeholder="Enter place of birth as on passport"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.passportPlaceOfBirth || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nationality</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={details?.passportNationality || ''}
                        onChange={(e) => handleInputChange('details.personalIdentity.passportNationality', e.target.value)}
                        placeholder="Enter nationality"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.passportNationality || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* Passport Status and Travel History */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Passport Status</label>
                    {isEditing ? (
                      <select
                        value={details?.passportStatus || ''}
                        onChange={(e) => handleInputChange('details.personalIdentity.passportStatus', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select status</option>
                        <option value="valid">Valid</option>
                        <option value="expired">Expired</option>
                        <option value="lost">Lost</option>
                        <option value="stolen">Stolen</option>
                        <option value="cancelled">Cancelled</option>
                        <option value="renewed">Renewed</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.passportStatus || 'Not specified'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Number of Pages</label>
                    {isEditing ? (
                      <input
                        type="number"
                        value={details?.passportPages || ''}
                        onChange={(e) => handleInputChange('details.personalIdentity.passportPages', e.target.value)}
                        placeholder="e.g., 32, 48, 64"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.passportPages || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* Travel History */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Recent Travel History (Last 5 years)</label>
                  {isEditing ? (
                    <textarea
                      value={details?.passportTravelHistory || ''}
                      onChange={(e) => handleInputChange('details.personalIdentity.passportTravelHistory', e.target.value)}
                      placeholder="List countries visited in the last 5 years with dates"
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900">{details?.passportTravelHistory || 'Not provided'}</p>
                  )}
                </div>

                {/* Visa Information */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Current Visa Status</label>
                  {isEditing ? (
                    <textarea
                      value={details?.passportVisaStatus || ''}
                      onChange={(e) => handleInputChange('details.personalIdentity.passportVisaStatus', e.target.value)}
                      placeholder="List current valid visas and their expiry dates"
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900">{details?.passportVisaStatus || 'Not provided'}</p>
                  )}
                </div>

                {/* Passport Document Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Passport Documents</label>
                  {isEditing ? (
                    <div className="space-y-3">
                      {!uploadedPassportDocuments || uploadedPassportDocuments.length === 0 ? (
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                          <input
                            type="file"
                            id="passport-upload"
                            accept=".jpg,.jpeg,.png,.pdf"
                            multiple
                            onChange={(e) => handlePassportDocumentUpload(e)}
                            className="hidden"
                          />
                          <label htmlFor="passport-upload" className="cursor-pointer">
                            <div className="flex flex-col items-center">
                              <Upload className="h-8 w-8 text-gray-400 mb-2" />
                              <p className="text-sm text-gray-600 mb-1">
                                <span className="font-medium text-primary-600">Click to upload</span> or drag and drop
                              </p>
                              <p className="text-xs text-gray-500">JPEG, PNG, or PDF (max 10MB each)</p>
                            </div>
                          </label>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {uploadedPassportDocuments.map((file, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg">
                              <div className="flex items-center space-x-3">
                                <FileText className="h-5 w-5 text-gray-600" />
                                <div>
                                  <p className="text-sm font-medium text-gray-900">{file.name}</p>
                                  <p className="text-xs text-gray-600">
                                    {(file.size / 1024 / 1024).toFixed(2)} MB
                                  </p>
                                </div>
                              </div>
                              <button
                                onClick={() => removePassportDocument(index)}
                                className="text-red-600 hover:text-red-800 transition-colors"
                              >
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </div>
                          ))}
                          <button
                            onClick={() => document.getElementById('passport-upload')?.click()}
                            className="w-full py-2 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                          >
                            Add More Documents
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                      {uploadedPassportDocuments && uploadedPassportDocuments.length > 0 ? (
                        <div className="space-y-2">
                          {uploadedPassportDocuments.map((file, index) => (
                            <div key={index} className="flex items-center space-x-3">
                              <FileText className="h-5 w-5 text-gray-600" />
                              <div>
                                <p className="text-sm font-medium text-gray-900">{file.name}</p>
                                <p className="text-xs text-gray-600">
                                  {(file.size / 1024 / 1024).toFixed(2)} MB
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500 text-sm">No documents uploaded</p>
                      )}
                    </div>
                  )}
                </div>

                {/* Passport Information Section */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-blue-900 mb-2">About Passport Verification</h4>
                      <div className="text-sm text-blue-800 space-y-2">
                        <p><strong>What we verify:</strong></p>
                        <ul className="list-disc list-inside ml-2 space-y-1">
                          <li>Passport authenticity and validity</li>
                          <li>Passport number and type verification</li>
                          <li>Issue and expiry date accuracy</li>
                          <li>Issuing authority and country verification</li>
                          <li>Personal information consistency</li>
                          <li>Travel history and visa status</li>
                          <li>Passport status and any restrictions</li>
                        </ul>
                        
                        <div className="mt-3 p-2 bg-blue-100 rounded text-xs">
                          <strong>Note:</strong> Passport verification is essential for international travel, employment verification, and identity confirmation. This check helps verify an individual's travel history, visa status, and passport authenticity.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    )
  }

  const renderCriminalRecordContent = () => {
    const details = request.details?.criminalRecord
    const subTabs = [
      { key: 'criminalHistory', name: 'Criminal History', icon: AlertTriangle, price: 4000 },
      { key: 'financialCrime', name: 'Financial Crime', icon: AlertTriangle, price: 3500 },
      { key: 'courtRecords', name: 'Court Records', icon: AlertTriangle, price: 3000 },
      { key: 'sexOffenderRegistry', name: 'Sex Offender Registry', icon: AlertTriangle, price: 2500 }
    ]

    return (
      <div className="space-y-6">
        {/* Sub-tabs */}
        <div className="flex space-x-1 border-b border-gray-200 overflow-x-auto">
          {subTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setSelectedSubTab(tab.key)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap flex-shrink-0 ${
                selectedSubTab === tab.key
                  ? 'border-red-500 text-red-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Content based on selected sub-tab */}
        {selectedSubTab === 'criminalHistory' && (
          <div className="space-y-4">
            {!selectedChecks['criminalRecord.criminalHistory']?.selected ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Criminal History Check</h3>
                <p className="text-gray-500 mb-4">Check for any criminal records or convictions</p>
                <button
                  onClick={() => toggleCheck('criminalRecord.criminalHistory')}
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                >
                  Add Criminal History Check - ₦4,000
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Criminal History Check</h3>
                  <button
                    onClick={() => toggleCheck('criminalRecord.criminalHistory')}
                    className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-full text-sm font-medium transition-colors"
                  >
                    Remove
                  </button>
                </div>
                {/* Criminal Record Status */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Criminal Record Status</label>
                    {isEditing ? (
                      <select
                        value={details?.criminalRecordStatus || ''}
                        onChange={(e) => handleInputChange('details.criminalRecord.criminalRecordStatus', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select status</option>
                        <option value="clean">Clean Record</option>
                        <option value="minor">Minor Offenses</option>
                        <option value="serious">Serious Offenses</option>
                        <option value="pending">Pending Cases</option>
                        <option value="expunged">Expunged Records</option>
                        <option value="sealed">Sealed Records</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.criminalRecordStatus || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Check Date</label>
                    {isEditing ? (
                      <input
                        type="date"
                        value={details?.lastCriminalCheckDate || ''}
                        onChange={(e) => handleInputChange('details.criminalRecord.lastCriminalCheckDate', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.lastCriminalCheckDate || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* Arrest Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Number of Arrests</label>
                    {isEditing ? (
                      <input
                        type="number"
                        value={details?.numberOfArrests || ''}
                        onChange={(e) => handleInputChange('details.criminalRecord.numberOfArrests', e.target.value)}
                        placeholder="Enter number of arrests"
                        min="0"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.numberOfArrests || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Number of Convictions</label>
                    {isEditing ? (
                      <input
                        type="number"
                        value={details?.numberOfConvictions || ''}
                        onChange={(e) => handleInputChange('details.criminalRecord.numberOfConvictions', e.target.value)}
                        placeholder="Enter number of convictions"
                        min="0"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.numberOfConvictions || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* Most Recent Offense */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Most Recent Offense Date</label>
                    {isEditing ? (
                      <input
                        type="date"
                        value={details?.mostRecentOffenseDate || ''}
                        onChange={(e) => handleInputChange('details.criminalRecord.mostRecentOffenseDate', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.mostRecentOffenseDate || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Offense Type</label>
                    {isEditing ? (
                      <select
                        value={details?.offenseType || ''}
                        onChange={(e) => handleInputChange('details.criminalRecord.offenseType', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select offense type</option>
                        <option value="none">No Offenses</option>
                        <option value="misdemeanor">Misdemeanor</option>
                        <option value="felony">Felony</option>
                        <option value="traffic">Traffic Violation</option>
                        <option value="drug">Drug Offense</option>
                        <option value="theft">Theft/Burglary</option>
                        <option value="assault">Assault</option>
                        <option value="fraud">Fraud</option>
                        <option value="other">Other</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.offenseType || 'Not specified'}</p>
                    )}
                  </div>
                </div>

                {/* Charge Details */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Specific Charges</label>
                  {isEditing ? (
                    <textarea
                      value={details?.specificCharges || ''}
                      onChange={(e) => handleInputChange('details.criminalRecord.specificCharges', e.target.value)}
                      placeholder="List specific charges, case numbers, and details"
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900">{details?.specificCharges || 'Not provided'}</p>
                  )}
                </div>

                {/* Court Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Court Jurisdiction</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={details?.criminalCourtJurisdiction || ''}
                        onChange={(e) => handleInputChange('details.criminalRecord.criminalCourtJurisdiction', e.target.value)}
                        placeholder="Enter court jurisdiction"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.criminalCourtJurisdiction || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Case Status</label>
                    {isEditing ? (
                      <select
                        value={details?.caseStatus || ''}
                        onChange={(e) => handleInputChange('details.criminalRecord.caseStatus', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select case status</option>
                        <option value="none">No Cases</option>
                        <option value="pending">Pending</option>
                        <option value="dismissed">Dismissed</option>
                        <option value="convicted">Convicted</option>
                        <option value="acquitted">Acquitted</option>
                        <option value="plea-bargain">Plea Bargain</option>
                        <option value="deferred">Deferred Prosecution</option>
                        <option value="expunged">Expunged</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.caseStatus || 'Not specified'}</p>
                    )}
                  </div>
                </div>

                {/* Sentence Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sentence Type</label>
                    {isEditing ? (
                      <select
                        value={details?.sentenceType || ''}
                        onChange={(e) => handleInputChange('details.criminalRecord.sentenceType', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select sentence type</option>
                        <option value="none">No Sentence</option>
                        <option value="probation">Probation</option>
                        <option value="community-service">Community Service</option>
                        <option value="fine">Fine</option>
                        <option value="jail">Jail Time</option>
                        <option value="prison">Prison Time</option>
                        <option value="suspended">Suspended Sentence</option>
                        <option value="diversion">Diversion Program</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.sentenceType || 'Not specified'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sentence Duration</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={details?.sentenceDuration || ''}
                        onChange={(e) => handleInputChange('details.criminalRecord.sentenceDuration', e.target.value)}
                        placeholder="e.g., 6 months, 2 years, etc."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.sentenceDuration || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* Additional Information */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Additional Criminal History Information</label>
                  {isEditing ? (
                    <textarea
                      value={details?.additionalCriminalInfo || ''}
                      onChange={(e) => handleInputChange('details.criminalRecord.additionalCriminalInfo', e.target.value)}
                      placeholder="Any additional information about criminal history, rehabilitation, etc."
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900">{details?.additionalCriminalInfo || 'Not provided'}</p>
                  )}
                </div>

                {/* Document Upload Section */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Criminal History Documentation</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Criminal History Report</label>
                      {!uploadedCriminalDocuments.criminalHistoryReport ? (
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
                          <input
                            type="file"
                            onChange={(e) => handleCriminalDocumentUpload(e, 'criminalHistoryReport')}
                            accept=".pdf,.jpg,.jpeg,.png"
                            className="hidden"
                            id="criminalHistoryReport"
                          />
                          <label htmlFor="criminalHistoryReport" className="cursor-pointer">
                            <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-600">Click to upload criminal history report</p>
                            <p className="text-xs text-gray-500 mt-1">PDF, JPEG, PNG (max 10MB)</p>
                          </label>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <FileText className="h-5 w-5 text-green-600" />
                            <span className="text-sm text-green-800">{uploadedCriminalDocuments.criminalHistoryReport.name}</span>
                          </div>
                          <button
                            onClick={() => removeCriminalDocument('criminalHistoryReport')}
                            className="text-red-600 hover:text-red-700 text-sm font-medium"
                          >
                            Remove
                          </button>
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Additional Criminal Documents</label>
                      {uploadedCriminalDocuments.additionalCriminalDocuments.length > 0 && (
                        <div className="space-y-2 mb-3">
                          {uploadedCriminalDocuments.additionalCriminalDocuments.map((file, index) => (
                            <div key={index} className="flex items-center justify-between p-2 bg-white border border-gray-200 rounded">
                              <div className="flex items-center space-x-2">
                                <FileText className="h-4 w-4 text-gray-600" />
                                <span className="text-sm text-gray-800">{file.name}</span>
                              </div>
                              <button
                                onClick={() => removeCriminalDocument('additionalCriminalDocuments', index)}
                                className="text-red-600 hover:text-red-700 text-xs"
                              >
                                Remove
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-3 text-center hover:border-gray-400 transition-colors">
                        <input
                          type="file"
                          onChange={(e) => handleCriminalDocumentUpload(e, 'additionalCriminalDocuments')}
                          accept=".pdf,.jpg,.jpeg,.png"
                          className="hidden"
                          id="additionalCriminalDocuments"
                        />
                        <label htmlFor="additionalCriminalDocuments" className="cursor-pointer">
                          <Upload className="h-6 w-6 text-gray-400 mx-auto mb-1" />
                          <p className="text-xs text-gray-600">Add more documents</p>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Criminal History Information Section */}
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-red-900 mb-2">About Criminal History Verification</h4>
                      <div className="text-sm text-red-800 space-y-2">
                        <p><strong>What we verify:</strong></p>
                        <ul className="list-disc list-inside ml-2 space-y-1">
                          <li>Criminal record status and history</li>
                          <li>Arrest records and convictions</li>
                          <li>Court cases and legal proceedings</li>
                          <li>Offense types and severity levels</li>
                          <li>Sentence information and completion status</li>
                          <li>Expunged or sealed record status</li>
                          <li>Pending cases and legal issues</li>
                        </ul>
                        
                        <div className="mt-3 p-2 bg-red-100 rounded text-xs">
                          <strong>Note:</strong> Criminal history verification is essential for employment, security clearance, and various professional licensing requirements. This check helps ensure workplace safety and compliance with regulatory requirements.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {selectedSubTab === 'financialCrime' && (
          <div className="space-y-4">
            {!selectedChecks['criminalRecord.financialCrime']?.selected ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Financial Crime History</h3>
                <p className="text-gray-500 mb-4">Check for financial crimes and fraud-related offenses</p>
                <button
                  onClick={() => toggleCheck('criminalRecord.financialCrime')}
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                >
                  Add Financial Crime Check - ₦3,500
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Financial Crime History</h3>
                  <button
                    onClick={() => toggleCheck('criminalRecord.financialCrime')}
                    className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-full text-sm font-medium transition-colors"
                  >
                    Remove
                  </button>
                </div>
                {/* Financial Crime Status */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Financial Crime Status</label>
                    {isEditing ? (
                      <select
                        value={details?.financialCrimeStatus || ''}
                        onChange={(e) => handleInputChange('details.criminalRecord.financialCrimeStatus', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select status</option>
                        <option value="clean">Clean Record</option>
                        <option value="minor">Minor Financial Issues</option>
                        <option value="serious">Serious Financial Crimes</option>
                        <option value="pending">Pending Cases</option>
                        <option value="resolved">Resolved Cases</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.financialCrimeStatus || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Financial Check Date</label>
                    {isEditing ? (
                      <input
                        type="date"
                        value={details?.lastFinancialCheckDate || ''}
                        onChange={(e) => handleInputChange('details.criminalRecord.lastFinancialCheckDate', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.lastFinancialCheckDate || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* Crime Type and Amount */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Primary Crime Type</label>
                    {isEditing ? (
                      <select
                        value={details?.primaryCrimeType || ''}
                        onChange={(e) => handleInputChange('details.criminalRecord.primaryCrimeType', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select crime type</option>
                        <option value="none">No Financial Crimes</option>
                        <option value="fraud">Fraud</option>
                        <option value="embezzlement">Embezzlement</option>
                        <option value="money_laundering">Money Laundering</option>
                        <option value="tax_evasion">Tax Evasion</option>
                        <option value="identity_theft">Identity Theft</option>
                        <option value="credit_card_fraud">Credit Card Fraud</option>
                        <option value="bank_fraud">Bank Fraud</option>
                        <option value="securities_fraud">Securities Fraud</option>
                        <option value="insurance_fraud">Insurance Fraud</option>
                        <option value="ponzi_scheme">Ponzi Scheme</option>
                        <option value="forgery">Forgery</option>
                        <option value="counterfeiting">Counterfeiting</option>
                        <option value="other">Other</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.primaryCrimeType || 'Not specified'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Amount Involved</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={details?.amountInvolved || ''}
                        onChange={(e) => handleInputChange('details.criminalRecord.amountInvolved', e.target.value)}
                        placeholder="e.g., ₦500,000, $10,000, etc."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.amountInvolved || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* Incident Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Incident Date</label>
                    {isEditing ? (
                      <input
                        type="date"
                        value={details?.incidentDate || ''}
                        onChange={(e) => handleInputChange('details.criminalRecord.incidentDate', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.incidentDate || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Discovery Date</label>
                    {isEditing ? (
                      <input
                        type="date"
                        value={details?.discoveryDate || ''}
                        onChange={(e) => handleInputChange('details.criminalRecord.discoveryDate', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.discoveryDate || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* Jurisdiction and Case Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Jurisdiction</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={details?.financialCrimeJurisdiction || ''}
                        onChange={(e) => handleInputChange('details.criminalRecord.financialCrimeJurisdiction', e.target.value)}
                        placeholder="Enter jurisdiction (state, federal, etc.)"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.financialCrimeJurisdiction || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Case Number</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={details?.caseNumber || ''}
                        onChange={(e) => handleInputChange('details.criminalRecord.caseNumber', e.target.value)}
                        placeholder="Enter case number"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.caseNumber || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* Case Status and Resolution */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Case Status</label>
                    {isEditing ? (
                      <select
                        value={details?.financialCaseStatus || ''}
                        onChange={(e) => handleInputChange('details.criminalRecord.financialCaseStatus', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select case status</option>
                        <option value="none">No Cases</option>
                        <option value="investigation">Under Investigation</option>
                        <option value="pending">Pending Trial</option>
                        <option value="trial">On Trial</option>
                        <option value="convicted">Convicted</option>
                        <option value="acquitted">Acquitted</option>
                        <option value="dismissed">Dismissed</option>
                        <option value="settled">Settled</option>
                        <option value="resolved">Resolved</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.financialCaseStatus || 'Not specified'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Resolution Date</label>
                    {isEditing ? (
                      <input
                        type="date"
                        value={details?.resolutionDate || ''}
                        onChange={(e) => handleInputChange('details.criminalRecord.resolutionDate', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.resolutionDate || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* Financial Impact */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Financial Loss</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={details?.financialLoss || ''}
                        onChange={(e) => handleInputChange('details.criminalRecord.financialLoss', e.target.value)}
                        placeholder="e.g., ₦1,000,000, $50,000, etc."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.financialLoss || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Recovery Amount</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={details?.recoveryAmount || ''}
                        onChange={(e) => handleInputChange('details.criminalRecord.recoveryAmount', e.target.value)}
                        placeholder="e.g., ₦500,000, $25,000, etc."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.recoveryAmount || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* Additional Crimes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Additional Financial Crimes</label>
                  {isEditing ? (
                    <textarea
                      value={details?.additionalFinancialCrimes || ''}
                      onChange={(e) => handleInputChange('details.criminalRecord.additionalFinancialCrimes', e.target.value)}
                      placeholder="List any additional financial crimes, fraud schemes, or related offenses"
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900">{details?.additionalFinancialCrimes || 'Not provided'}</p>
                  )}
                </div>

                {/* Investigation Details */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Investigation Details</label>
                  {isEditing ? (
                    <textarea
                      value={details?.investigationDetails || ''}
                      onChange={(e) => handleInputChange('details.criminalRecord.investigationDetails', e.target.value)}
                      placeholder="Details about the investigation, agencies involved, evidence, etc."
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900">{details?.investigationDetails || 'Not provided'}</p>
                  )}
                </div>

                {/* Additional Information */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Additional Financial Crime Information</label>
                  {isEditing ? (
                    <textarea
                      value={details?.additionalFinancialCrimeInfo || ''}
                      onChange={(e) => handleInputChange('details.criminalRecord.additionalFinancialCrimeInfo', e.target.value)}
                      placeholder="Any additional information about financial crimes, restitution, rehabilitation, etc."
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900">{details?.additionalFinancialCrimeInfo || 'Not provided'}</p>
                  )}
                </div>

                {/* Document Upload Section */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Financial Crime Documentation</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Financial Crime Report</label>
                      {!uploadedCriminalDocuments.financialCrimeReport ? (
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
                          <input
                            type="file"
                            onChange={(e) => handleCriminalDocumentUpload(e, 'financialCrimeReport')}
                            accept=".pdf,.jpg,.jpeg,.png"
                            className="hidden"
                            id="financialCrimeReport"
                          />
                          <label htmlFor="financialCrimeReport" className="cursor-pointer">
                            <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-600">Click to upload financial crime report</p>
                            <p className="text-xs text-gray-500 mt-1">PDF, JPEG, PNG (max 10MB)</p>
                          </label>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <FileText className="h-5 w-5 text-green-600" />
                            <span className="text-sm text-green-800">{uploadedCriminalDocuments.financialCrimeReport.name}</span>
                          </div>
                          <button
                            onClick={() => removeCriminalDocument('financialCrimeReport')}
                            className="text-red-600 hover:text-red-700 text-sm font-medium"
                          >
                            Remove
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Financial Crime Information Section */}
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-orange-900 mb-2">About Financial Crime Verification</h4>
                      <div className="text-sm text-orange-800 space-y-2">
                        <p><strong>What we verify:</strong></p>
                        <ul className="list-disc list-inside ml-2 space-y-1">
                          <li>Financial crime history and fraud records</li>
                          <li>Money laundering and embezzlement cases</li>
                          <li>Identity theft and credit card fraud</li>
                          <li>Securities fraud and Ponzi schemes</li>
                          <li>Tax evasion and financial misconduct</li>
                          <li>Bank fraud and insurance fraud</li>
                          <li>Financial investigation outcomes</li>
                        </ul>
                        
                        <div className="mt-3 p-2 bg-orange-100 rounded text-xs">
                          <strong>Note:</strong> Financial crime verification is crucial for positions involving financial responsibility, banking, investment, and fiduciary duties. This check helps protect organizations from financial risks and ensures compliance with financial regulations.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {selectedSubTab === 'courtRecords' && (
          <div className="space-y-4">
            {!selectedChecks['criminalRecord.courtRecords']?.selected ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Court Records</h3>
                <p className="text-gray-500 mb-4">Search court records and legal proceedings</p>
                <button
                  onClick={() => toggleCheck('criminalRecord.courtRecords')}
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                >
                  Add Court Records Check - ₦3,000
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Court Records</h3>
                  <button
                    onClick={() => toggleCheck('criminalRecord.courtRecords')}
                    className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-full text-sm font-medium transition-colors"
                  >
                    Remove
                  </button>
                </div>
                {/* Court Records Status */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Court Records Status</label>
                    {isEditing ? (
                      <select
                        value={details?.courtRecordsStatus || ''}
                        onChange={(e) => handleInputChange('details.criminalRecord.courtRecordsStatus', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select status</option>
                        <option value="clean">Clean Record</option>
                        <option value="minor">Minor Court Cases</option>
                        <option value="serious">Serious Court Cases</option>
                        <option value="pending">Pending Cases</option>
                        <option value="resolved">Resolved Cases</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.courtRecordsStatus || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Court Check Date</label>
                    {isEditing ? (
                      <input
                        type="date"
                        value={details?.lastCourtCheckDate || ''}
                        onChange={(e) => handleInputChange('details.criminalRecord.lastCourtCheckDate', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.lastCourtCheckDate || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* Court Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Court Type</label>
                    {isEditing ? (
                      <select
                        value={details?.courtType || ''}
                        onChange={(e) => handleInputChange('details.criminalRecord.courtType', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select court type</option>
                        <option value="none">No Court Records</option>
                        <option value="federal">Federal Court</option>
                        <option value="state">State Court</option>
                        <option value="county">County Court</option>
                        <option value="municipal">Municipal Court</option>
                        <option value="district">District Court</option>
                        <option value="superior">Superior Court</option>
                        <option value="appellate">Appellate Court</option>
                        <option value="supreme">Supreme Court</option>
                        <option value="bankruptcy">Bankruptcy Court</option>
                        <option value="family">Family Court</option>
                        <option value="juvenile">Juvenile Court</option>
                        <option value="traffic">Traffic Court</option>
                        <option value="small-claims">Small Claims Court</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.courtType || 'Not specified'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Court Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={details?.courtName || ''}
                        onChange={(e) => handleInputChange('details.criminalRecord.courtName', e.target.value)}
                        placeholder="Enter court name"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.courtName || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* Case Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Case Number</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={details?.courtCaseNumber || ''}
                        onChange={(e) => handleInputChange('details.criminalRecord.courtCaseNumber', e.target.value)}
                        placeholder="Enter case number"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.courtCaseNumber || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Case Type</label>
                    {isEditing ? (
                      <select
                        value={details?.caseType || ''}
                        onChange={(e) => handleInputChange('details.criminalRecord.caseType', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select case type</option>
                        <option value="none">No Cases</option>
                        <option value="criminal">Criminal</option>
                        <option value="civil">Civil</option>
                        <option value="family">Family</option>
                        <option value="bankruptcy">Bankruptcy</option>
                        <option value="traffic">Traffic</option>
                        <option value="small-claims">Small Claims</option>
                        <option value="probate">Probate</option>
                        <option value="juvenile">Juvenile</option>
                        <option value="appeal">Appeal</option>
                        <option value="other">Other</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.caseType || 'Not specified'}</p>
                    )}
                  </div>
                </div>

                {/* Case Dates */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Filing Date</label>
                    {isEditing ? (
                      <input
                        type="date"
                        value={details?.filingDate || ''}
                        onChange={(e) => handleInputChange('details.criminalRecord.filingDate', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.filingDate || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Case Status</label>
                    {isEditing ? (
                      <select
                        value={details?.courtCaseStatus || ''}
                        onChange={(e) => handleInputChange('details.criminalRecord.courtCaseStatus', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select case status</option>
                        <option value="none">No Cases</option>
                        <option value="active">Active</option>
                        <option value="pending">Pending</option>
                        <option value="closed">Closed</option>
                        <option value="dismissed">Dismissed</option>
                        <option value="settled">Settled</option>
                        <option value="judgment">Judgment Entered</option>
                        <option value="appealed">Appealed</option>
                        <option value="reopened">Reopened</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.courtCaseStatus || 'Not specified'}</p>
                    )}
                  </div>
                </div>

                {/* Jurisdiction and Location */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Jurisdiction</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={details?.courtJurisdiction || ''}
                        onChange={(e) => handleInputChange('details.criminalRecord.courtJurisdiction', e.target.value)}
                        placeholder="Enter jurisdiction"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.courtJurisdiction || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Court Location</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={details?.courtLocation || ''}
                        onChange={(e) => handleInputChange('details.criminalRecord.courtLocation', e.target.value)}
                        placeholder="Enter court location (city, state)"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.courtLocation || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* Case Details */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Case Description</label>
                  {isEditing ? (
                    <textarea
                      value={details?.caseDescription || ''}
                      onChange={(e) => handleInputChange('details.criminalRecord.caseDescription', e.target.value)}
                      placeholder="Describe the case, charges, or legal matter"
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900">{details?.caseDescription || 'Not provided'}</p>
                  )}
                </div>

                {/* Outcome Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Case Outcome</label>
                    {isEditing ? (
                      <select
                        value={details?.caseOutcome || ''}
                        onChange={(e) => handleInputChange('details.criminalRecord.caseOutcome', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select outcome</option>
                        <option value="none">No Outcome</option>
                        <option value="guilty">Guilty</option>
                        <option value="not-guilty">Not Guilty</option>
                        <option value="dismissed">Dismissed</option>
                        <option value="acquitted">Acquitted</option>
                        <option value="plea-bargain">Plea Bargain</option>
                        <option value="settled">Settled</option>
                        <option value="judgment-plaintiff">Judgment for Plaintiff</option>
                        <option value="judgment-defendant">Judgment for Defendant</option>
                        <option value="appealed">Appealed</option>
                        <option value="pending">Pending</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.caseOutcome || 'Not specified'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Resolution Date</label>
                    {isEditing ? (
                      <input
                        type="date"
                        value={details?.courtResolutionDate || ''}
                        onChange={(e) => handleInputChange('details.criminalRecord.courtResolutionDate', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.courtResolutionDate || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* Additional Court Records */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Additional Court Records</label>
                  {isEditing ? (
                    <textarea
                      value={details?.additionalCourtRecords || ''}
                      onChange={(e) => handleInputChange('details.criminalRecord.additionalCourtRecords', e.target.value)}
                      placeholder="List any additional court cases, legal proceedings, or related matters"
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900">{details?.additionalCourtRecords || 'Not provided'}</p>
                  )}
                </div>

                {/* Additional Information */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Additional Court Information</label>
                  {isEditing ? (
                    <textarea
                      value={details?.additionalCourtInfo || ''}
                      onChange={(e) => handleInputChange('details.criminalRecord.additionalCourtInfo', e.target.value)}
                      placeholder="Any additional information about court records, legal history, etc."
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900">{details?.additionalCourtInfo || 'Not provided'}</p>
                  )}
                </div>

                {/* Document Upload Section */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Court Records Documentation</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Court Records Report</label>
                      {!uploadedCriminalDocuments.courtRecordsReport ? (
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
                          <input
                            type="file"
                            onChange={(e) => handleCriminalDocumentUpload(e, 'courtRecordsReport')}
                            accept=".pdf,.jpg,.jpeg,.png"
                            className="hidden"
                            id="courtRecordsReport"
                          />
                          <label htmlFor="courtRecordsReport" className="cursor-pointer">
                            <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-600">Click to upload court records report</p>
                            <p className="text-xs text-gray-500 mt-1">PDF, JPEG, PNG (max 10MB)</p>
                          </label>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <FileText className="h-5 w-5 text-green-600" />
                            <span className="text-sm text-green-800">{uploadedCriminalDocuments.courtRecordsReport.name}</span>
                          </div>
                          <button
                            onClick={() => removeCriminalDocument('courtRecordsReport')}
                            className="text-red-600 hover:text-red-700 text-sm font-medium"
                          >
                            Remove
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Court Records Information Section */}
                <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-indigo-900 mb-2">About Court Records Verification</h4>
                      <div className="text-sm text-indigo-800 space-y-2">
                        <p><strong>What we verify:</strong></p>
                        <ul className="list-disc list-inside ml-2 space-y-1">
                          <li>Court records and legal proceedings</li>
                          <li>Criminal and civil case history</li>
                          <li>Family court and bankruptcy records</li>
                          <li>Traffic violations and small claims</li>
                          <li>Case outcomes and judgments</li>
                          <li>Pending and resolved cases</li>
                          <li>Appeals and legal history</li>
                        </ul>
                        
                        <div className="mt-3 p-2 bg-indigo-100 rounded text-xs">
                          <strong>Note:</strong> Court records verification provides comprehensive legal history information, including civil and criminal cases, which is essential for employment screening, legal compliance, and risk assessment in various professional contexts.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {selectedSubTab === 'sexOffenderRegistry' && (
          <div className="space-y-4">
            {!selectedChecks['criminalRecord.sexOffenderRegistry']?.selected ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Sex Offender Registry</h3>
                <p className="text-gray-500 mb-4">Check against sex offender registries</p>
                <button
                  onClick={() => toggleCheck('criminalRecord.sexOffenderRegistry')}
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                >
                  Add Sex Offender Registry Check - ₦2,500
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Sex Offender Registry</h3>
                  <button
                    onClick={() => toggleCheck('criminalRecord.sexOffenderRegistry')}
                    className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-full text-sm font-medium transition-colors"
                  >
                    Remove
                  </button>
                </div>
                {/* Registry Status */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Registry Status</label>
                    {isEditing ? (
                      <select
                        value={details?.sexOffenderRegistryStatus || ''}
                        onChange={(e) => handleInputChange('details.criminalRecord.sexOffenderRegistryStatus', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select status</option>
                        <option value="clear">Clear - Not Registered</option>
                        <option value="registered">Currently Registered</option>
                        <option value="pending">Pending Review</option>
                        <option value="expired">Registration Expired</option>
                        <option value="removed">Removed from Registry</option>
                        <option value="tier1">Tier 1 Offender</option>
                        <option value="tier2">Tier 2 Offender</option>
                        <option value="tier3">Tier 3 Offender</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.sexOffenderRegistryStatus || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Registry Check Date</label>
                    {isEditing ? (
                      <input
                        type="date"
                        value={details?.lastRegistryCheckDate || ''}
                        onChange={(e) => handleInputChange('details.criminalRecord.lastRegistryCheckDate', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.lastRegistryCheckDate || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* Primary State Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Primary State of Registration</label>
                    {isEditing ? (
                      <select
                        value={details?.primaryRegistryState || ''}
                        onChange={(e) => handleInputChange('details.criminalRecord.primaryRegistryState', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select state</option>
                        <option value="none">No Registration</option>
                        <option value="abia">Abia</option>
                        <option value="adamawa">Adamawa</option>
                        <option value="akwa-ibom">Akwa Ibom</option>
                        <option value="anambra">Anambra</option>
                        <option value="bauchi">Bauchi</option>
                        <option value="bayelsa">Bayelsa</option>
                        <option value="benue">Benue</option>
                        <option value="borno">Borno</option>
                        <option value="cross-river">Cross River</option>
                        <option value="delta">Delta</option>
                        <option value="ebonyi">Ebonyi</option>
                        <option value="edo">Edo</option>
                        <option value="ekiti">Ekiti</option>
                        <option value="enugu">Enugu</option>
                        <option value="gombe">Gombe</option>
                        <option value="imo">Imo</option>
                        <option value="jigawa">Jigawa</option>
                        <option value="kaduna">Kaduna</option>
                        <option value="kano">Kano</option>
                        <option value="katsina">Katsina</option>
                        <option value="kebbi">Kebbi</option>
                        <option value="kogi">Kogi</option>
                        <option value="kwara">Kwara</option>
                        <option value="lagos">Lagos</option>
                        <option value="nasarawa">Nasarawa</option>
                        <option value="niger">Niger</option>
                        <option value="ogun">Ogun</option>
                        <option value="ondo">Ondo</option>
                        <option value="osun">Osun</option>
                        <option value="oyo">Oyo</option>
                        <option value="plateau">Plateau</option>
                        <option value="rivers">Rivers</option>
                        <option value="sokoto">Sokoto</option>
                        <option value="taraba">Taraba</option>
                        <option value="yobe">Yobe</option>
                        <option value="zamfara">Zamfara</option>
                        <option value="fct">Federal Capital Territory</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.primaryRegistryState || 'Not specified'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Registration Number</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={details?.registryNumber || ''}
                        onChange={(e) => handleInputChange('details.criminalRecord.registryNumber', e.target.value)}
                        placeholder="Enter registration number"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.registryNumber || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* Registration Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Registration Date</label>
                    {isEditing ? (
                      <input
                        type="date"
                        value={details?.registryDate || ''}
                        onChange={(e) => handleInputChange('details.criminalRecord.registryDate', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.registryDate || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Registration Expiry Date</label>
                    {isEditing ? (
                      <input
                        type="date"
                        value={details?.registryExpiryDate || ''}
                        onChange={(e) => handleInputChange('details.criminalRecord.registryExpiryDate', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.registryExpiryDate || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* Offense Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Offense Type</label>
                    {isEditing ? (
                      <select
                        value={details?.sexOffenseType || ''}
                        onChange={(e) => handleInputChange('details.criminalRecord.sexOffenseType', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select offense type</option>
                        <option value="none">No Offenses</option>
                        <option value="sexual-assault">Sexual Assault</option>
                        <option value="rape">Rape</option>
                        <option value="child-molestation">Child Molestation</option>
                        <option value="indecent-exposure">Indecent Exposure</option>
                        <option value="possession-child-porn">Possession of Child Pornography</option>
                        <option value="distribution-child-porn">Distribution of Child Pornography</option>
                        <option value="statutory-rape">Statutory Rape</option>
                        <option value="incest">Incest</option>
                        <option value="prostitution">Prostitution</option>
                        <option value="solicitation">Solicitation</option>
                        <option value="other">Other Sexual Offense</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.sexOffenseType || 'Not specified'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Offense Date</label>
                    {isEditing ? (
                      <input
                        type="date"
                        value={details?.sexOffenseDate || ''}
                        onChange={(e) => handleInputChange('details.criminalRecord.sexOffenseDate', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.sexOffenseDate || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* Additional States */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Additional States of Registration</label>
                  {isEditing ? (
                    <textarea
                      value={details?.additionalRegistryStates || ''}
                      onChange={(e) => handleInputChange('details.criminalRecord.additionalRegistryStates', e.target.value)}
                      placeholder="List any additional states where the person is registered (comma-separated)"
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900">{details?.additionalRegistryStates || 'Not provided'}</p>
                  )}
                </div>

                {/* Verification Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Verification Method</label>
                    {isEditing ? (
                      <select
                        value={details?.registryVerificationMethod || ''}
                        onChange={(e) => handleInputChange('details.criminalRecord.registryVerificationMethod', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select verification method</option>
                        <option value="database-search">Database Search</option>
                        <option value="state-registry">State Registry Check</option>
                        <option value="federal-database">Federal Database</option>
                        <option value="court-records">Court Records</option>
                        <option value="law-enforcement">Law Enforcement Records</option>
                        <option value="manual-verification">Manual Verification</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.registryVerificationMethod || 'Not specified'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Verification Agency</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={details?.registryVerificationAgency || ''}
                        onChange={(e) => handleInputChange('details.criminalRecord.registryVerificationAgency', e.target.value)}
                        placeholder="Enter verification agency"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.registryVerificationAgency || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* Additional Information */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Additional Registry Information</label>
                  {isEditing ? (
                    <textarea
                      value={details?.additionalRegistryInfo || ''}
                      onChange={(e) => handleInputChange('details.criminalRecord.additionalRegistryInfo', e.target.value)}
                      placeholder="Any additional information about sex offender registry status, compliance, restrictions, etc."
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900">{details?.additionalRegistryInfo || 'Not provided'}</p>
                  )}
                </div>

                {/* Document Upload Section */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Sex Offender Registry Documentation</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Sex Offender Registry Report</label>
                      {!uploadedCriminalDocuments.sexOffenderRegistryReport ? (
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
                          <input
                            type="file"
                            onChange={(e) => handleCriminalDocumentUpload(e, 'sexOffenderRegistryReport')}
                            accept=".pdf,.jpg,.jpeg,.png"
                            className="hidden"
                            id="sexOffenderRegistryReport"
                          />
                          <label htmlFor="sexOffenderRegistryReport" className="cursor-pointer">
                            <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-600">Click to upload sex offender registry report</p>
                            <p className="text-xs text-gray-500 mt-1">PDF, JPEG, PNG (max 10MB)</p>
                          </label>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <FileText className="h-5 w-5 text-green-600" />
                            <span className="text-sm text-green-800">{uploadedCriminalDocuments.sexOffenderRegistryReport.name}</span>
                          </div>
                          <button
                            onClick={() => removeCriminalDocument('sexOffenderRegistryReport')}
                            className="text-red-600 hover:text-red-700 text-sm font-medium"
                          >
                            Remove
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Sex Offender Registry Information Section */}
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-red-900 mb-2">About Sex Offender Registry Verification</h4>
                      <div className="text-sm text-red-800 space-y-2">
                        <p><strong>What we verify:</strong></p>
                        <ul className="list-disc list-inside ml-2 space-y-1">
                          <li>State and federal sex offender registries</li>
                          <li>Registration status and compliance</li>
                          <li>Offense types and severity levels</li>
                          <li>Registration dates and expiry information</li>
                          <li>Multi-state registration tracking</li>
                          <li>Verification through official databases</li>
                          <li>Compliance with registration requirements</li>
                        </ul>
                        
                        <div className="mt-3 p-2 bg-red-100 rounded text-xs">
                          <strong>Note:</strong> Sex offender registry verification is critical for positions involving children, vulnerable populations, or security-sensitive roles. This check ensures compliance with legal requirements and helps protect organizations and communities.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    )
  }

  const renderFinancialCreditContent = () => {
    const details = request.details?.financialCredit
    const subTabs = [
      { key: 'creditReport', name: 'Credit Report', icon: CheckCircle, price: 2000 },
      { key: 'incomeSources', name: 'Income Sources', icon: CheckCircle, price: 2500 },
      { key: 'outstandingDebts', name: 'Outstanding Debts', icon: CheckCircle, price: 1800 },
      { key: 'businessFinancial', name: 'Business Financial', icon: CheckCircle, price: 3000 },
      { key: 'firsHistory', name: 'FIRS History', icon: CheckCircle, price: 2200 },
      { key: 'bankVerification', name: 'Bank Verification', icon: CheckCircle, price: 1500 },
      { key: 'loanHistory', name: 'Loan History', icon: CheckCircle, price: 2000 }
    ]

    return (
      <div className="space-y-6">
        {/* Sub-tabs */}
        <div className="flex space-x-1 border-b border-gray-200 overflow-x-auto">
          {subTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setSelectedSubTab(tab.key)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap flex-shrink-0 ${
                selectedSubTab === tab.key
                  ? 'border-red-500 text-red-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Content based on selected sub-tab */}
        {selectedSubTab === 'creditReport' && (
          <div className="space-y-4">
            {!selectedChecks['financialCredit.creditReport']?.selected ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Credit Report Verification</h3>
                <p className="text-gray-500 mb-4">Verify the candidate's credit history and score</p>
                <button
                  onClick={() => toggleCheck('financialCredit.creditReport')}
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                >
                  Add Credit Report Check - ₦2,000
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Credit Report Verification</h3>
                  <button
                    onClick={() => toggleCheck('financialCredit.creditReport')}
                    className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-full text-sm font-medium transition-colors"
                  >
                    Remove
                  </button>
                </div>
                {/* Credit Score and Rating */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Credit Score</label>
                    {isEditing ? (
                      <input
                        type="number"
                        min="300"
                        max="850"
                        value={details?.creditScore || ''}
                        onChange={(e) => handleInputChange('details.financialCredit.creditScore', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="300-850"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.creditScore || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Credit Rating</label>
                    {isEditing ? (
                      <select
                        value={details?.creditRating || ''}
                        onChange={(e) => handleInputChange('details.financialCredit.creditRating', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select rating</option>
                        <option value="excellent">Excellent (750-850)</option>
                        <option value="good">Good (700-749)</option>
                        <option value="fair">Fair (650-699)</option>
                        <option value="poor">Poor (600-649)</option>
                        <option value="very-poor">Very Poor (300-599)</option>
                        <option value="no-credit">No Credit History</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.creditRating || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Credit Check Date</label>
                    {isEditing ? (
                      <input
                        type="date"
                        value={details?.lastCreditCheckDate || ''}
                        onChange={(e) => handleInputChange('details.financialCredit.lastCreditCheckDate', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.lastCreditCheckDate || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* Credit Bureau Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Primary Credit Bureau</label>
                    {isEditing ? (
                      <select
                        value={details?.primaryCreditBureau || ''}
                        onChange={(e) => handleInputChange('details.financialCredit.primaryCreditBureau', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select bureau</option>
                        <option value="experian">Experian</option>
                        <option value="equifax">Equifax</option>
                        <option value="transunion">TransUnion</option>
                        <option value="crc">CRC Credit Bureau</option>
                        <option value="firstcentral">FirstCentral Credit Bureau</option>
                        <option value="creditregistry">CreditRegistry</option>
                        <option value="xds">XDS Credit Bureau</option>
                        <option value="other">Other</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.primaryCreditBureau || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Credit Report Number</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={details?.creditReportNumber || ''}
                        onChange={(e) => handleInputChange('details.financialCredit.creditReportNumber', e.target.value)}
                        placeholder="Enter report number"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.creditReportNumber || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* Credit History Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Credit History Length</label>
                    {isEditing ? (
                      <select
                        value={details?.creditHistoryLength || ''}
                        onChange={(e) => handleInputChange('details.financialCredit.creditHistoryLength', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select length</option>
                        <option value="no-history">No Credit History</option>
                        <option value="less-than-1-year">Less than 1 year</option>
                        <option value="1-2-years">1-2 years</option>
                        <option value="3-5-years">3-5 years</option>
                        <option value="6-10-years">6-10 years</option>
                        <option value="more-than-10-years">More than 10 years</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.creditHistoryLength || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Number of Credit Accounts</label>
                    {isEditing ? (
                      <input
                        type="number"
                        min="0"
                        value={details?.numberOfCreditAccounts || ''}
                        onChange={(e) => handleInputChange('details.financialCredit.numberOfCreditAccounts', e.target.value)}
                        placeholder="Enter number of accounts"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.numberOfCreditAccounts || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* Payment History */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Payment History Status</label>
                    {isEditing ? (
                      <select
                        value={details?.paymentHistoryStatus || ''}
                        onChange={(e) => handleInputChange('details.financialCredit.paymentHistoryStatus', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select status</option>
                        <option value="excellent">Excellent - No late payments</option>
                        <option value="good">Good - Few late payments</option>
                        <option value="fair">Fair - Some late payments</option>
                        <option value="poor">Poor - Many late payments</option>
                        <option value="very-poor">Very Poor - Defaults/Collections</option>
                        <option value="no-history">No Payment History</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.paymentHistoryStatus || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Number of Late Payments</label>
                    {isEditing ? (
                      <input
                        type="number"
                        min="0"
                        value={details?.numberOfLatePayments || ''}
                        onChange={(e) => handleInputChange('details.financialCredit.numberOfLatePayments', e.target.value)}
                        placeholder="Enter number of late payments"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.numberOfLatePayments || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* Credit Utilization */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Credit Utilization Rate (%)</label>
                    {isEditing ? (
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={details?.creditUtilizationRate || ''}
                        onChange={(e) => handleInputChange('details.financialCredit.creditUtilizationRate', e.target.value)}
                        placeholder="0-100"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.creditUtilizationRate || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Total Credit Limit</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={details?.totalCreditLimit || ''}
                        onChange={(e) => handleInputChange('details.financialCredit.totalCreditLimit', e.target.value)}
                        placeholder="Enter total credit limit"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.totalCreditLimit || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* Credit Inquiries */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Hard Inquiries (Last 2 Years)</label>
                    {isEditing ? (
                      <input
                        type="number"
                        min="0"
                        value={details?.hardInquiries || ''}
                        onChange={(e) => handleInputChange('details.financialCredit.hardInquiries', e.target.value)}
                        placeholder="Enter number of hard inquiries"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.hardInquiries || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Soft Inquiries (Last 2 Years)</label>
                    {isEditing ? (
                      <input
                        type="number"
                        min="0"
                        value={details?.softInquiries || ''}
                        onChange={(e) => handleInputChange('details.financialCredit.softInquiries', e.target.value)}
                        placeholder="Enter number of soft inquiries"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.softInquiries || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* Negative Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bankruptcies</label>
                    {isEditing ? (
                      <select
                        value={details?.bankruptcies || ''}
                        onChange={(e) => handleInputChange('details.financialCredit.bankruptcies', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select status</option>
                        <option value="none">No Bankruptcies</option>
                        <option value="chapter-7">Chapter 7 Bankruptcy</option>
                        <option value="chapter-13">Chapter 13 Bankruptcy</option>
                        <option value="chapter-11">Chapter 11 Bankruptcy</option>
                        <option value="discharged">Discharged Bankruptcy</option>
                        <option value="dismissed">Dismissed Bankruptcy</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.bankruptcies || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Collections</label>
                    {isEditing ? (
                      <select
                        value={details?.collections || ''}
                        onChange={(e) => handleInputChange('details.financialCredit.collections', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select status</option>
                        <option value="none">No Collections</option>
                        <option value="paid">Paid Collections</option>
                        <option value="unpaid">Unpaid Collections</option>
                        <option value="settled">Settled Collections</option>
                        <option value="disputed">Disputed Collections</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.collections || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* Credit History Summary */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Credit History Summary</label>
                  {isEditing ? (
                    <textarea
                      value={details?.creditHistorySummary || ''}
                      onChange={(e) => handleInputChange('details.financialCredit.creditHistorySummary', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      rows={4}
                      placeholder="Detailed summary of credit history, including positive and negative factors"
                    />
                  ) : (
                    <p className="text-gray-900">{details?.creditHistorySummary || 'Not provided'}</p>
                  )}
                </div>

                {/* Additional Credit Information */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Additional Credit Information</label>
                  {isEditing ? (
                    <textarea
                      value={details?.additionalCreditInfo || ''}
                      onChange={(e) => handleInputChange('details.financialCredit.additionalCreditInfo', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      rows={3}
                      placeholder="Any additional information about credit report, disputes, or special circumstances"
                    />
                  ) : (
                    <p className="text-gray-900">{details?.additionalCreditInfo || 'Not provided'}</p>
                  )}
                </div>

                {/* Document Upload Section */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Credit Report Documentation</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Credit Report</label>
                      {!uploadedFinancialDocuments.creditReport ? (
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
                          <input
                            type="file"
                            onChange={(e) => handleFinancialDocumentUpload(e, 'creditReport')}
                            accept=".pdf,.jpg,.jpeg,.png"
                            className="hidden"
                            id="creditReport"
                          />
                          <label htmlFor="creditReport" className="cursor-pointer">
                            <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-600">Click to upload credit report</p>
                            <p className="text-xs text-gray-500 mt-1">PDF, JPEG, PNG (max 10MB)</p>
                          </label>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <FileText className="h-5 w-5 text-green-600" />
                            <span className="text-sm text-green-800">{uploadedFinancialDocuments.creditReport.name}</span>
                          </div>
                          <button
                            onClick={() => removeFinancialDocument('creditReport')}
                            className="text-red-600 hover:text-red-700 text-sm font-medium"
                          >
                            Remove
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Credit Report Information Section */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-green-900 mb-2">About Credit Report Verification</h4>
                      <div className="text-sm text-green-800 space-y-2">
                        <p><strong>What we verify:</strong></p>
                        <ul className="list-disc list-inside ml-2 space-y-1">
                          <li>Credit score and rating assessment</li>
                          <li>Payment history and late payments</li>
                          <li>Credit utilization and limits</li>
                          <li>Credit inquiries and applications</li>
                          <li>Bankruptcy and collection records</li>
                          <li>Credit account history and types</li>
                          <li>Credit bureau information and reports</li>
                        </ul>
                        
                        <div className="mt-3 p-2 bg-green-100 rounded text-xs">
                          <strong>Note:</strong> Credit report verification is essential for positions involving financial responsibility, loans, or fiduciary duties. This check helps assess financial reliability and creditworthiness for employment decisions.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {selectedSubTab === 'incomeSources' && (
          <div className="space-y-6">
            {!selectedChecks['financialCredit.incomeSources']?.selected ? (
              <div className="text-center py-12 bg-gradient-to-br from-emerald-50 to-teal-100 rounded-2xl border-2 border-dashed border-emerald-200">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-10 w-10 text-emerald-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Verified Income Sources</h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  Verify multiple income sources for comprehensive financial background checking. Each income source is calculated separately.
                </p>
                <div className="flex items-center justify-center space-x-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-emerald-600">₦2,500</div>
                    <div className="text-sm text-gray-500">per source</div>
                  </div>
                  <div className="text-gray-400">×</div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">1</div>
                    <div className="text-sm text-gray-500">source</div>
                  </div>
                  <div className="text-gray-400">=</div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-emerald-600">₦2,500</div>
                    <div className="text-sm text-gray-500">total</div>
                  </div>
                </div>
                <button
                  onClick={() => toggleCheck('financialCredit.incomeSources')}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-8 rounded-xl transition-colors shadow-lg hover:shadow-xl"
                >
                  Start Income Sources Verification
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Header with controls */}
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                        <CheckCircle className="h-5 w-5 text-emerald-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">Verified Income Sources</h3>
                        <p className="text-sm text-gray-600">
                          {request.details?.financialCredit?.incomeSourceEntries?.length || 1} source{(request.details?.financialCredit?.incomeSourceEntries?.length || 1) > 1 ? 's' : ''} selected
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-900">
                          ₦{((request.details?.financialCredit?.incomeSourceEntries?.length || 1) * 2500).toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-500">total cost</div>
                      </div>
                      <button
                        onClick={() => toggleCheck('financialCredit.incomeSources')}
                        className="bg-red-100 text-red-700 hover:bg-red-200 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                      >
                        Remove All
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={addNewIncomeSource}
                        className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                      >
                        <Plus className="h-4 w-4" />
                        <span>Add Income Source</span>
                      </button>
                      <span className="text-sm text-gray-500">
                        Each additional source costs ₦2,500
                      </span>
                    </div>
                  </div>
                </div>

                {/* Income Source Cards */}
                <div className="space-y-4">
                  {request.details?.financialCredit?.incomeSourceEntries?.map((incomeSource, index) => {
                    const isExpanded = expandedIncomeSources.has(incomeSource.id)
                    return (
                      <div key={incomeSource.id} className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                        {/* Income Source Card Header */}
                        <div className="p-4 border-b border-gray-100">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                                <span className="text-sm font-medium text-gray-600">#{index + 1}</span>
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-900">
                                  {incomeSource.sourceDescription || 'Income Source'} - {incomeSource.sourceType || 'Type'}
                                </h4>
                                <p className="text-sm text-gray-500">
                                  {incomeSource.monthlyAmount 
                                    ? `₦${incomeSource.monthlyAmount.toLocaleString()}/month`
                                    : 'Income details pending'
                                  }
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="text-right">
                                <div className="text-sm font-medium text-gray-900">₦2,500</div>
                                <div className="text-xs text-gray-500">per source</div>
                              </div>
                              {(request.details?.financialCredit?.incomeSourceEntries?.length || 0) > 1 && (
                                <button
                                  onClick={() => removeIncomeSource(incomeSource.id)}
                                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                  title="Remove this income source"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              )}
                              <button
                                onClick={() => toggleIncomeSourceExpansion(incomeSource.id)}
                                className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                                title={isExpanded ? "Collapse" : "Expand"}
                              >
                                <ChevronDown className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Income Source Form Content */}
                        {isExpanded && (
                          <div className="p-6 space-y-4">
                            {/* Source Type and Description */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Source Type</label>
                                {isEditing ? (
                                  <select
                                    value={incomeSource.sourceType || ''}
                                    onChange={(e) => updateIncomeSource(incomeSource.id, 'sourceType', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                  >
                                    <option value="">Select source type</option>
                                    <option value="employment">Employment</option>
                                    <option value="business">Business</option>
                                    <option value="freelance">Freelance</option>
                                    <option value="investment">Investment</option>
                                    <option value="rental">Rental Income</option>
                                    <option value="pension">Pension</option>
                                    <option value="allowance">Allowance</option>
                                    <option value="other">Other</option>
                                  </select>
                                ) : (
                                  <p className="text-gray-900">{incomeSource.sourceType || 'Not specified'}</p>
                                )}
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Source Description</label>
                                {isEditing ? (
                                  <input
                                    type="text"
                                    value={incomeSource.sourceDescription || ''}
                                    onChange={(e) => updateIncomeSource(incomeSource.id, 'sourceDescription', e.target.value)}
                                    placeholder="e.g., Primary employment salary"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                  />
                                ) : (
                                  <p className="text-gray-900">{incomeSource.sourceDescription || 'Not specified'}</p>
                                )}
                              </div>
                            </div>

                            {/* Income Amounts */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Amount (₦)</label>
                                {isEditing ? (
                                  <input
                                    type="number"
                                    min="0"
                                    value={incomeSource.monthlyAmount || ''}
                                    onChange={(e) => updateIncomeSource(incomeSource.id, 'monthlyAmount', parseFloat(e.target.value) || 0)}
                                    placeholder="e.g., 250000"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                  />
                                ) : (
                                  <p className="text-gray-900">
                                    {incomeSource.monthlyAmount ? `₦${incomeSource.monthlyAmount.toLocaleString()}` : 'Not specified'}
                                  </p>
                                )}
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Annual Amount (₦)</label>
                                {isEditing ? (
                                  <input
                                    type="number"
                                    min="0"
                                    value={incomeSource.annualAmount || ''}
                                    onChange={(e) => updateIncomeSource(incomeSource.id, 'annualAmount', parseFloat(e.target.value) || 0)}
                                    placeholder="e.g., 3000000"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                  />
                                ) : (
                                  <p className="text-gray-900">
                                    {incomeSource.annualAmount ? `₦${incomeSource.annualAmount.toLocaleString()}` : 'Not specified'}
                                  </p>
                                )}
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Frequency</label>
                                {isEditing ? (
                                  <select
                                    value={incomeSource.frequency || ''}
                                    onChange={(e) => updateIncomeSource(incomeSource.id, 'frequency', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                  >
                                    <option value="">Select frequency</option>
                                    <option value="monthly">Monthly</option>
                                    <option value="quarterly">Quarterly</option>
                                    <option value="annually">Annually</option>
                                    <option value="weekly">Weekly</option>
                                    <option value="irregular">Irregular</option>
                                  </select>
                                ) : (
                                  <p className="text-gray-900">{incomeSource.frequency || 'Not specified'}</p>
                                )}
                              </div>
                            </div>

                            {/* Verification Details */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Verification Method</label>
                                {isEditing ? (
                                  <select
                                    value={incomeSource.verificationMethod || ''}
                                    onChange={(e) => updateIncomeSource(incomeSource.id, 'verificationMethod', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                  >
                                    <option value="">Select method</option>
                                    <option value="pay-stub">Pay Stub</option>
                                    <option value="bank-statement">Bank Statement</option>
                                    <option value="tax-return">Tax Return</option>
                                    <option value="employer-letter">Employer Letter</option>
                                    <option value="contract">Contract</option>
                                    <option value="invoice">Invoice</option>
                                    <option value="other">Other</option>
                                  </select>
                                ) : (
                                  <p className="text-gray-900">{incomeSource.verificationMethod || 'Not specified'}</p>
                                )}
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Verification Status</label>
                                {isEditing ? (
                                  <select
                                    value={incomeSource.verificationStatus || ''}
                                    onChange={(e) => updateIncomeSource(incomeSource.id, 'verificationStatus', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                  >
                                    <option value="pending">Pending</option>
                                    <option value="verified">Verified</option>
                                    <option value="rejected">Rejected</option>
                                    <option value="in-progress">In Progress</option>
                                  </select>
                                ) : (
                                  <p className="text-gray-900">{incomeSource.verificationStatus || 'Pending'}</p>
                                )}
                              </div>
                            </div>

                            {/* Employment Details */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Employer/Organization</label>
                                {isEditing ? (
                                  <input
                                    type="text"
                                    value={incomeSource.employerName || ''}
                                    onChange={(e) => updateIncomeSource(incomeSource.id, 'employerName', e.target.value)}
                                    placeholder="e.g., Tech Solutions Ltd"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                  />
                                ) : (
                                  <p className="text-gray-900">{incomeSource.employerName || 'Not specified'}</p>
                                )}
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                                {isEditing ? (
                                  <select
                                    value={incomeSource.paymentMethod || ''}
                                    onChange={(e) => updateIncomeSource(incomeSource.id, 'paymentMethod', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                  >
                                    <option value="">Select method</option>
                                    <option value="direct-deposit">Direct Deposit</option>
                                    <option value="check">Check</option>
                                    <option value="cash">Cash</option>
                                    <option value="transfer">Bank Transfer</option>
                                    <option value="mobile-money">Mobile Money</option>
                                    <option value="other">Other</option>
                                  </select>
                                ) : (
                                  <p className="text-gray-900">{incomeSource.paymentMethod || 'Not specified'}</p>
                                )}
                              </div>
                            </div>

                            {/* Duration and Stability */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                                {isEditing ? (
                                  <input
                                    type="date"
                                    value={incomeSource.startDate || ''}
                                    onChange={(e) => updateIncomeSource(incomeSource.id, 'startDate', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                  />
                                ) : (
                                  <p className="text-gray-900">{incomeSource.startDate || 'Not specified'}</p>
                                )}
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                                {isEditing ? (
                                  <input
                                    type="date"
                                    value={incomeSource.endDate || ''}
                                    onChange={(e) => updateIncomeSource(incomeSource.id, 'endDate', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                  />
                                ) : (
                                  <p className="text-gray-900">{incomeSource.endDate || 'Not specified'}</p>
                                )}
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Stability</label>
                                {isEditing ? (
                                  <select
                                    value={incomeSource.stability || ''}
                                    onChange={(e) => updateIncomeSource(incomeSource.id, 'stability', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                  >
                                    <option value="">Select stability</option>
                                    <option value="stable">Stable</option>
                                    <option value="variable">Variable</option>
                                    <option value="seasonal">Seasonal</option>
                                    <option value="irregular">Irregular</option>
                                    <option value="temporary">Temporary</option>
                                  </select>
                                ) : (
                                  <p className="text-gray-900">{incomeSource.stability || 'Not specified'}</p>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {selectedSubTab === 'outstandingDebts' && (
          <div className="space-y-4">
            {!selectedChecks['financialCredit.outstandingDebts']?.selected ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Outstanding Debts & Liabilities</h3>
                <p className="text-gray-500 mb-4">Verify the candidate's outstanding debts and financial liabilities</p>
                <button
                  onClick={() => toggleCheck('financialCredit.outstandingDebts')}
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                >
                  Add Outstanding Debts Check - ₦1,800
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Outstanding Debts & Liabilities</h3>
                  <button
                    onClick={() => toggleCheck('financialCredit.outstandingDebts')}
                    className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-full text-sm font-medium transition-colors"
                  >
                    Remove
                  </button>
                </div>
                {/* Primary Income Information */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Income (₦)</label>
                    {isEditing ? (
                      <input
                        type="number"
                        min="0"
                        value={details?.monthlyIncome || ''}
                        onChange={(e) => handleInputChange('details.financialCredit.monthlyIncome', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter monthly income"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.monthlyIncome ? `₦${details.monthlyIncome.toLocaleString()}` : 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Annual Income (₦)</label>
                    {isEditing ? (
                      <input
                        type="number"
                        min="0"
                        value={details?.annualIncome || ''}
                        onChange={(e) => handleInputChange('details.financialCredit.annualIncome', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter annual income"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.annualIncome ? `₦${details.annualIncome.toLocaleString()}` : 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Income Verification Date</label>
                    {isEditing ? (
                      <input
                        type="date"
                        value={details?.incomeVerificationDate || ''}
                        onChange={(e) => handleInputChange('details.financialCredit.incomeVerificationDate', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.incomeVerificationDate || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* Primary Income Source */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Primary Income Source</label>
                    {isEditing ? (
                      <select
                        value={details?.primaryIncomeSource || ''}
                        onChange={(e) => handleInputChange('details.financialCredit.primaryIncomeSource', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select primary source</option>
                        <option value="employment">Employment/Salary</option>
                        <option value="business">Business/Entrepreneurship</option>
                        <option value="freelance">Freelance/Contract</option>
                        <option value="investment">Investment Returns</option>
                        <option value="rental">Rental Income</option>
                        <option value="pension">Pension/Retirement</option>
                        <option value="government">Government Benefits</option>
                        <option value="inheritance">Inheritance/Trust</option>
                        <option value="other">Other</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.primaryIncomeSource || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Employment Status</label>
                    {isEditing ? (
                      <select
                        value={details?.employmentStatus || ''}
                        onChange={(e) => handleInputChange('details.financialCredit.employmentStatus', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select status</option>
                        <option value="employed">Employed</option>
                        <option value="self-employed">Self-Employed</option>
                        <option value="freelancer">Freelancer</option>
                        <option value="contractor">Contractor</option>
                        <option value="unemployed">Unemployed</option>
                        <option value="retired">Retired</option>
                        <option value="student">Student</option>
                        <option value="other">Other</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.employmentStatus || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* Employer/Business Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Employer/Business Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={details?.employerName || ''}
                        onChange={(e) => handleInputChange('details.financialCredit.employerName', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter employer or business name"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.employerName || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Job Title/Position</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={details?.jobTitle || ''}
                        onChange={(e) => handleInputChange('details.financialCredit.jobTitle', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter job title or position"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.jobTitle || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* Employment Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Employment Start Date</label>
                    {isEditing ? (
                      <input
                        type="date"
                        value={details?.employmentStartDate || ''}
                        onChange={(e) => handleInputChange('details.financialCredit.employmentStartDate', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.employmentStartDate || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Employment End Date</label>
                    {isEditing ? (
                      <input
                        type="date"
                        value={details?.employmentEndDate || ''}
                        onChange={(e) => handleInputChange('details.financialCredit.employmentEndDate', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.employmentEndDate || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* Additional Income Sources */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Secondary Income Source</label>
                    {isEditing ? (
                      <select
                        value={details?.secondaryIncomeSource || ''}
                        onChange={(e) => handleInputChange('details.financialCredit.secondaryIncomeSource', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select secondary source</option>
                        <option value="none">No Secondary Income</option>
                        <option value="part-time">Part-time Employment</option>
                        <option value="freelance">Freelance Work</option>
                        <option value="investment">Investment Returns</option>
                        <option value="rental">Rental Income</option>
                        <option value="consulting">Consulting</option>
                        <option value="commission">Commission</option>
                        <option value="other">Other</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.secondaryIncomeSource || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Secondary Income Amount (₦)</label>
                    {isEditing ? (
                      <input
                        type="number"
                        min="0"
                        value={details?.secondaryIncomeAmount || ''}
                        onChange={(e) => handleInputChange('details.financialCredit.secondaryIncomeAmount', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter secondary income amount"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.secondaryIncomeAmount ? `₦${details.secondaryIncomeAmount.toLocaleString()}` : 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* Income Verification Method */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Verification Method</label>
                    {isEditing ? (
                      <select
                        value={details?.incomeVerificationMethod || ''}
                        onChange={(e) => handleInputChange('details.financialCredit.incomeVerificationMethod', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select verification method</option>
                        <option value="pay-stub">Pay Stub</option>
                        <option value="bank-statement">Bank Statement</option>
                        <option value="tax-return">Tax Return</option>
                        <option value="employer-letter">Employer Letter</option>
                        <option value="business-license">Business License</option>
                        <option value="financial-statement">Financial Statement</option>
                        <option value="contract">Contract Agreement</option>
                        <option value="other">Other</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.incomeVerificationMethod || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Verification Agency</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={details?.incomeVerificationAgency || ''}
                        onChange={(e) => handleInputChange('details.financialCredit.incomeVerificationAgency', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter verification agency"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.incomeVerificationAgency || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* Income Stability */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Income Stability</label>
                    {isEditing ? (
                      <select
                        value={details?.incomeStability || ''}
                        onChange={(e) => handleInputChange('details.financialCredit.incomeStability', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select stability</option>
                        <option value="very-stable">Very Stable</option>
                        <option value="stable">Stable</option>
                        <option value="moderate">Moderately Stable</option>
                        <option value="variable">Variable</option>
                        <option value="unstable">Unstable</option>
                        <option value="irregular">Irregular</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.incomeStability || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Income Frequency</label>
                    {isEditing ? (
                      <select
                        value={details?.incomeFrequency || ''}
                        onChange={(e) => handleInputChange('details.financialCredit.incomeFrequency', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select frequency</option>
                        <option value="weekly">Weekly</option>
                        <option value="bi-weekly">Bi-weekly</option>
                        <option value="monthly">Monthly</option>
                        <option value="quarterly">Quarterly</option>
                        <option value="annually">Annually</option>
                        <option value="irregular">Irregular</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.incomeFrequency || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* Income Summary */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Income Summary</label>
                  {isEditing ? (
                    <textarea
                      value={details?.incomeSummary || ''}
                      onChange={(e) => handleInputChange('details.financialCredit.incomeSummary', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      rows={4}
                      placeholder="Detailed summary of income sources, verification status, and any additional information"
                    />
                  ) : (
                    <p className="text-gray-900">{details?.incomeSummary || 'Not provided'}</p>
                  )}
                </div>

                {/* Additional Income Information */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Additional Income Information</label>
                  {isEditing ? (
                    <textarea
                      value={details?.additionalIncomeInfo || ''}
                      onChange={(e) => handleInputChange('details.financialCredit.additionalIncomeInfo', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      rows={3}
                      placeholder="Any additional information about income sources, bonuses, commissions, or special circumstances"
                    />
                  ) : (
                    <p className="text-gray-900">{details?.additionalIncomeInfo || 'Not provided'}</p>
                  )}
                </div>

                {/* Document Upload Section */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Income Verification Documentation</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Income Verification Documents</label>
                      {!uploadedFinancialDocuments.incomeVerification ? (
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
                          <input
                            type="file"
                            onChange={(e) => handleFinancialDocumentUpload(e, 'incomeVerification')}
                            accept=".pdf,.jpg,.jpeg,.png"
                            className="hidden"
                            id="incomeVerification"
                          />
                          <label htmlFor="incomeVerification" className="cursor-pointer">
                            <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-600">Click to upload income verification documents</p>
                            <p className="text-xs text-gray-500 mt-1">PDF, JPEG, PNG (max 10MB)</p>
                          </label>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <FileText className="h-5 w-5 text-green-600" />
                            <span className="text-sm text-green-800">{uploadedFinancialDocuments.incomeVerification.name}</span>
                          </div>
                          <button
                            onClick={() => removeFinancialDocument('incomeVerification')}
                            className="text-red-600 hover:text-red-700 text-sm font-medium"
                          >
                            Remove
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Verified Income Sources Information Section */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-blue-900 mb-2">About Verified Income Sources</h4>
                      <div className="text-sm text-blue-800 space-y-2">
                        <p><strong>What we verify:</strong></p>
                        <ul className="list-disc list-inside ml-2 space-y-1">
                          <li>Primary and secondary income sources</li>
                          <li>Employment status and job details</li>
                          <li>Income amounts and frequency</li>
                          <li>Employer verification and business details</li>
                          <li>Income stability and consistency</li>
                          <li>Verification methods and documentation</li>
                          <li>Financial capacity and reliability</li>
                        </ul>
                        
                        <div className="mt-3 p-2 bg-blue-100 rounded text-xs">
                          <strong>Note:</strong> Income verification is crucial for assessing financial capacity, loan eligibility, and employment suitability. This check helps organizations make informed decisions about financial responsibility and risk assessment.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {selectedSubTab === 'outstandingDebts' && (
          <div className="space-y-4">
            {!selectedChecks['financialCredit.outstandingDebts']?.selected ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Outstanding Debts & Liabilities</h3>
                <p className="text-gray-500 mb-4">Check for outstanding debts and financial liabilities</p>
                <button
                  onClick={() => toggleCheck('financialCredit.outstandingDebts')}
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                >
                  Add Outstanding Debts Check - ₦1,800
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Outstanding Debts & Liabilities</h3>
                  <button
                    onClick={() => toggleCheck('financialCredit.outstandingDebts')}
                    className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-full text-sm font-medium transition-colors"
                  >
                    Remove
                  </button>
                </div>
                {/* Debt Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Total Outstanding Debt (₦)</label>
                    {isEditing ? (
                      <input
                        type="number"
                        min="0"
                        value={details?.totalOutstandingDebt || ''}
                        onChange={(e) => handleInputChange('details.financialCredit.totalOutstandingDebt', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter total debt amount"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.totalOutstandingDebt ? `₦${details.totalOutstandingDebt.toLocaleString()}` : 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Debt Status</label>
                    {isEditing ? (
                      <select
                        value={details?.debtStatus || ''}
                        onChange={(e) => handleInputChange('details.financialCredit.debtStatus', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select status</option>
                        <option value="none">No Outstanding Debts</option>
                        <option value="current">Current - All Payments Up to Date</option>
                        <option value="minor-delays">Minor Delays - 1-30 Days Late</option>
                        <option value="moderate-delays">Moderate Delays - 31-90 Days Late</option>
                        <option value="serious-delays">Serious Delays - 90+ Days Late</option>
                        <option value="default">Default/Collection</option>
                        <option value="settled">Settled/Paid Off</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.debtStatus || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Debt Check Date</label>
                    {isEditing ? (
                      <input
                        type="date"
                        value={details?.lastDebtCheckDate || ''}
                        onChange={(e) => handleInputChange('details.financialCredit.lastDebtCheckDate', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.lastDebtCheckDate || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* Credit Card Debts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Credit Card Debt (₦)</label>
                    {isEditing ? (
                      <input
                        type="number"
                        min="0"
                        value={details?.creditCardDebt || ''}
                        onChange={(e) => handleInputChange('details.financialCredit.creditCardDebt', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter credit card debt amount"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.creditCardDebt ? `₦${details.creditCardDebt.toLocaleString()}` : 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Number of Credit Cards</label>
                    {isEditing ? (
                      <input
                        type="number"
                        min="0"
                        value={details?.numberOfCreditCards || ''}
                        onChange={(e) => handleInputChange('details.financialCredit.numberOfCreditCards', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter number of credit cards"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.numberOfCreditCards || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* Loan Debts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Personal Loan Debt (₦)</label>
                    {isEditing ? (
                      <input
                        type="number"
                        min="0"
                        value={details?.personalLoanDebt || ''}
                        onChange={(e) => handleInputChange('details.financialCredit.personalLoanDebt', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter personal loan debt amount"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.personalLoanDebt ? `₦${details.personalLoanDebt.toLocaleString()}` : 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mortgage/Home Loan Debt (₦)</label>
                    {isEditing ? (
                      <input
                        type="number"
                        min="0"
                        value={details?.mortgageDebt || ''}
                        onChange={(e) => handleInputChange('details.financialCredit.mortgageDebt', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter mortgage debt amount"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.mortgageDebt ? `₦${details.mortgageDebt.toLocaleString()}` : 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* Payment Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Debt Payments (₦)</label>
                    {isEditing ? (
                      <input
                        type="number"
                        min="0"
                        value={details?.monthlyDebtPayments || ''}
                        onChange={(e) => handleInputChange('details.financialCredit.monthlyDebtPayments', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter monthly debt payments"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.monthlyDebtPayments ? `₦${details.monthlyDebtPayments.toLocaleString()}` : 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Debt-to-Income Ratio (%)</label>
                    {isEditing ? (
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={details?.debtToIncomeRatio || ''}
                        onChange={(e) => handleInputChange('details.financialCredit.debtToIncomeRatio', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="0-100"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.debtToIncomeRatio ? `${details.debtToIncomeRatio}%` : 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* Debt Summary */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Debt Summary</label>
                  {isEditing ? (
                    <textarea
                      value={details?.debtSummary || ''}
                      onChange={(e) => handleInputChange('details.financialCredit.debtSummary', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      rows={4}
                      placeholder="Detailed summary of outstanding debts, payment history, and any additional information"
                    />
                  ) : (
                    <p className="text-gray-900">{details?.debtSummary || 'Not provided'}</p>
                  )}
                </div>

                {/* Document Upload Section */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Debt Documentation</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Debt Documentation</label>
                      {!uploadedFinancialDocuments.debtDocumentation ? (
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
                          <input
                            type="file"
                            onChange={(e) => handleFinancialDocumentUpload(e, 'debtDocumentation')}
                            accept=".pdf,.jpg,.jpeg,.png"
                            className="hidden"
                            id="debtDocumentation"
                          />
                          <label htmlFor="debtDocumentation" className="cursor-pointer">
                            <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-600">Click to upload debt documentation</p>
                            <p className="text-xs text-gray-500 mt-1">PDF, JPEG, PNG (max 10MB)</p>
                          </label>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <FileText className="h-5 w-5 text-green-600" />
                            <span className="text-sm text-green-800">{uploadedFinancialDocuments.debtDocumentation.name}</span>
                          </div>
                          <button
                            onClick={() => removeFinancialDocument('debtDocumentation')}
                            className="text-red-600 hover:text-red-700 text-sm font-medium"
                          >
                            Remove
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Outstanding Debts Information Section */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-yellow-900 mb-2">About Outstanding Debts & Liabilities</h4>
                      <div className="text-sm text-yellow-800 space-y-2">
                        <p><strong>What we verify:</strong></p>
                        <ul className="list-disc list-inside ml-2 space-y-1">
                          <li>Total outstanding debt amounts</li>
                          <li>Credit card and loan balances</li>
                          <li>Payment history and status</li>
                          <li>Debt-to-income ratio analysis</li>
                          <li>Collection and default status</li>
                          <li>Monthly payment obligations</li>
                          <li>Financial liability assessment</li>
                        </ul>
                        
                        <div className="mt-3 p-2 bg-yellow-100 rounded text-xs">
                          <strong>Note:</strong> Outstanding debts verification is essential for assessing financial risk, loan eligibility, and payment capacity. This check helps organizations evaluate financial responsibility and debt management capabilities.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {selectedSubTab === 'businessFinancial' && (
          <div className="space-y-4">
            {!selectedChecks['financialCredit.businessFinancial']?.selected ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Business Financial History</h3>
                <p className="text-gray-500 mb-4">Verify business financial records and company information</p>
                <button
                  onClick={() => toggleCheck('financialCredit.businessFinancial')}
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                >
                  Add Business Financial Check - ₦3,000
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Business Financial History</h3>
                  <button
                    onClick={() => toggleCheck('financialCredit.businessFinancial')}
                    className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-full text-sm font-medium transition-colors"
                  >
                    Remove
                  </button>
                </div>

                {/* Business Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={details?.businessName || ''}
                        onChange={(e) => handleInputChange('details.financialCredit.businessName', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter business name"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.businessName || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Business Registration Number</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={details?.businessRegistrationNumber || ''}
                        onChange={(e) => handleInputChange('details.financialCredit.businessRegistrationNumber', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter registration number"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.businessRegistrationNumber || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* Business Type and Status */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Business Type</label>
                    {isEditing ? (
                      <select
                        value={details?.businessType || ''}
                        onChange={(e) => handleInputChange('details.financialCredit.businessType', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select business type</option>
                        <option value="sole-proprietorship">Sole Proprietorship</option>
                        <option value="partnership">Partnership</option>
                        <option value="limited-liability">Limited Liability Company</option>
                        <option value="corporation">Corporation</option>
                        <option value="cooperative">Cooperative</option>
                        <option value="non-profit">Non-Profit Organization</option>
                        <option value="other">Other</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.businessType || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Business Status</label>
                    {isEditing ? (
                      <select
                        value={details?.businessStatus || ''}
                        onChange={(e) => handleInputChange('details.financialCredit.businessStatus', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="suspended">Suspended</option>
                        <option value="dissolved">Dissolved</option>
                        <option value="pending">Pending Registration</option>
                        <option value="other">Other</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.businessStatus || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* Business Financial Information */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Annual Revenue (₦)</label>
                    {isEditing ? (
                      <input
                        type="number"
                        min="0"
                        value={details?.annualRevenue || ''}
                        onChange={(e) => handleInputChange('details.financialCredit.annualRevenue', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter annual revenue"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.annualRevenue ? `₦${details.annualRevenue.toLocaleString()}` : 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Business Assets (₦)</label>
                    {isEditing ? (
                      <input
                        type="number"
                        min="0"
                        value={details?.businessAssets || ''}
                        onChange={(e) => handleInputChange('details.financialCredit.businessAssets', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter business assets"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.businessAssets ? `₦${details.businessAssets.toLocaleString()}` : 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Business Liabilities (₦)</label>
                    {isEditing ? (
                      <input
                        type="number"
                        min="0"
                        value={details?.businessLiabilities || ''}
                        onChange={(e) => handleInputChange('details.financialCredit.businessLiabilities', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter business liabilities"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.businessLiabilities ? `₦${details.businessLiabilities.toLocaleString()}` : 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* Business Registration Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Registration Date</label>
                    {isEditing ? (
                      <input
                        type="date"
                        value={details?.businessRegistrationDate || ''}
                        onChange={(e) => handleInputChange('details.financialCredit.businessRegistrationDate', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.businessRegistrationDate || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Business Address</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={details?.businessAddress || ''}
                        onChange={(e) => handleInputChange('details.financialCredit.businessAddress', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter business address"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.businessAddress || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* Tax Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tax Identification Number (TIN)</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={details?.businessTIN || ''}
                        onChange={(e) => handleInputChange('details.financialCredit.businessTIN', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter TIN"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.businessTIN || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tax Compliance Status</label>
                    {isEditing ? (
                      <select
                        value={details?.taxComplianceStatus || ''}
                        onChange={(e) => handleInputChange('details.financialCredit.taxComplianceStatus', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select status</option>
                        <option value="compliant">Compliant</option>
                        <option value="non-compliant">Non-Compliant</option>
                        <option value="pending">Pending</option>
                        <option value="exempt">Exempt</option>
                        <option value="unknown">Unknown</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.taxComplianceStatus || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* Business Summary */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Business Financial Summary</label>
                  {isEditing ? (
                    <textarea
                      value={details?.businessFinancialSummary || ''}
                      onChange={(e) => handleInputChange('details.financialCredit.businessFinancialSummary', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      rows={4}
                      placeholder="Detailed summary of business financial history, performance, and any additional information"
                    />
                  ) : (
                    <p className="text-gray-900">{details?.businessFinancialSummary || 'Not provided'}</p>
                  )}
                </div>

                {/* Document Upload Section */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Business Financial Documentation</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Business Financial Report</label>
                      {!uploadedFinancialDocuments.businessFinancialReport ? (
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
                          <input
                            type="file"
                            onChange={(e) => handleFinancialDocumentUpload(e, 'businessFinancialReport')}
                            accept=".pdf,.jpg,.jpeg,.png"
                            className="hidden"
                            id="businessFinancialReport"
                          />
                          <label htmlFor="businessFinancialReport" className="cursor-pointer">
                            <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-600">Click to upload business financial report</p>
                            <p className="text-xs text-gray-500 mt-1">PDF, JPEG, PNG (max 10MB)</p>
                          </label>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <FileText className="h-5 w-5 text-green-600" />
                            <span className="text-sm text-green-800">{uploadedFinancialDocuments.businessFinancialReport.name}</span>
                          </div>
                          <button
                            onClick={() => removeFinancialDocument('businessFinancialReport')}
                            className="text-red-600 hover:text-red-700 text-sm font-medium"
                          >
                            Remove
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Business Financial Information Section */}
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-purple-900 mb-2">About Business Financial History</h4>
                      <div className="text-sm text-purple-800 space-y-2">
                        <p><strong>What we verify:</strong></p>
                        <ul className="list-disc list-inside ml-2 space-y-1">
                          <li>Business registration and legal status</li>
                          <li>Financial performance and revenue</li>
                          <li>Business assets and liabilities</li>
                          <li>Tax compliance and TIN verification</li>
                          <li>Business type and structure</li>
                          <li>Registration and operational history</li>
                          <li>Financial stability and growth</li>
                        </ul>
                        
                        <div className="mt-3 p-2 bg-purple-100 rounded text-xs">
                          <strong>Note:</strong> Business financial verification is crucial for assessing business credibility, financial stability, and compliance. This check helps organizations evaluate business partnerships, investments, and financial reliability.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {selectedSubTab === 'bankVerification' && (
          <div className="space-y-4">
            {!selectedChecks['financialCredit.bankVerification']?.selected ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Bank Verification</h3>
                <p className="text-gray-500 mb-4">Verify bank account details and banking history</p>
                <button
                  onClick={() => toggleCheck('financialCredit.bankVerification')}
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                >
                  Add Bank Verification - ₦1,500
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Bank Verification</h3>
                  <button
                    onClick={() => toggleCheck('financialCredit.bankVerification')}
                    className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-full text-sm font-medium transition-colors"
                  >
                    Remove
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bank Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={details?.creditHistory || ''}
                        onChange={(e) => handleInputChange('details.financialCredit.creditHistory', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter bank name"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.creditHistory || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Account Number</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={details?.financialRecords || ''}
                        onChange={(e) => handleInputChange('details.financialCredit.financialRecords', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter account number"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.financialRecords || 'Not provided'}</p>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Account Status</label>
                  {isEditing ? (
                    <select
                      value={details?.creditHistory || ''}
                      onChange={(e) => handleInputChange('details.financialCredit.creditHistory', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">Select status</option>
                      <option value="active">Active</option>
                      <option value="dormant">Dormant</option>
                      <option value="closed">Closed</option>
                      <option value="restricted">Restricted</option>
                    </select>
                  ) : (
                    <p className="text-gray-900">{details?.creditHistory || 'Not provided'}</p>
                  )}
                </div>

                {/* Document Upload Section */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Bank Verification Documentation</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Bank Verification Report</label>
                      {!uploadedFinancialDocuments.bankVerificationReport ? (
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
                          <input
                            type="file"
                            onChange={(e) => handleFinancialDocumentUpload(e, 'bankVerificationReport')}
                            accept=".pdf,.jpg,.jpeg,.png"
                            className="hidden"
                            id="bankVerificationReport"
                          />
                          <label htmlFor="bankVerificationReport" className="cursor-pointer">
                            <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-600">Click to upload bank verification report</p>
                            <p className="text-xs text-gray-500 mt-1">PDF, JPEG, PNG (max 10MB)</p>
                          </label>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <FileText className="h-5 w-5 text-green-600" />
                            <span className="text-sm text-green-800">{uploadedFinancialDocuments.bankVerificationReport.name}</span>
                          </div>
                          <button
                            onClick={() => removeFinancialDocument('bankVerificationReport')}
                            className="text-red-600 hover:text-red-700 text-sm font-medium"
                          >
                            Remove
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {selectedSubTab === 'loanHistory' && (
          <div className="space-y-4">
            {!selectedChecks['financialCredit.loanHistory']?.selected ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Loan History</h3>
                <p className="text-gray-500 mb-4">Verify loan applications, approvals, and payment history</p>
                <button
                  onClick={() => toggleCheck('financialCredit.loanHistory')}
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                >
                  Add Loan History Check - ₦2,000
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Loan History</h3>
                  <button
                    onClick={() => toggleCheck('financialCredit.loanHistory')}
                    className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-full text-sm font-medium transition-colors"
                  >
                    Remove
                  </button>
                </div>

                {/* Loan Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Total Loans Applied</label>
                    {isEditing ? (
                      <input
                        type="number"
                        min="0"
                        value={details?.totalLoansApplied || ''}
                        onChange={(e) => handleInputChange('details.financialCredit.totalLoansApplied', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter number of loans"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.totalLoansApplied || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Total Loans Approved</label>
                    {isEditing ? (
                      <input
                        type="number"
                        min="0"
                        value={details?.totalLoansApproved || ''}
                        onChange={(e) => handleInputChange('details.financialCredit.totalLoansApproved', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter approved loans"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.totalLoansApproved || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Total Loan Amount (₦)</label>
                    {isEditing ? (
                      <input
                        type="number"
                        min="0"
                        value={details?.totalLoanAmount || ''}
                        onChange={(e) => handleInputChange('details.financialCredit.totalLoanAmount', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter total amount"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.totalLoanAmount ? `₦${details.totalLoanAmount.toLocaleString()}` : 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* Current Loans */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Current Active Loans</label>
                    {isEditing ? (
                      <input
                        type="number"
                        min="0"
                        value={details?.currentActiveLoans || ''}
                        onChange={(e) => handleInputChange('details.financialCredit.currentActiveLoans', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter active loans"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.currentActiveLoans || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Outstanding Loan Balance (₦)</label>
                    {isEditing ? (
                      <input
                        type="number"
                        min="0"
                        value={details?.outstandingLoanBalance || ''}
                        onChange={(e) => handleInputChange('details.financialCredit.outstandingLoanBalance', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter outstanding balance"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.outstandingLoanBalance ? `₦${details.outstandingLoanBalance.toLocaleString()}` : 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* Loan Types */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Primary Loan Type</label>
                    {isEditing ? (
                      <select
                        value={details?.primaryLoanType || ''}
                        onChange={(e) => handleInputChange('details.financialCredit.primaryLoanType', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select loan type</option>
                        <option value="personal">Personal Loan</option>
                        <option value="business">Business Loan</option>
                        <option value="mortgage">Mortgage</option>
                        <option value="auto">Auto Loan</option>
                        <option value="student">Student Loan</option>
                        <option value="credit-card">Credit Card</option>
                        <option value="other">Other</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.primaryLoanType || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Loan Status</label>
                    {isEditing ? (
                      <select
                        value={details?.loanStatus || ''}
                        onChange={(e) => handleInputChange('details.financialCredit.loanStatus', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select status</option>
                        <option value="current">Current</option>
                        <option value="paid-off">Paid Off</option>
                        <option value="defaulted">Defaulted</option>
                        <option value="restructured">Restructured</option>
                        <option value="written-off">Written Off</option>
                        <option value="no-loans">No Loans</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.loanStatus || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* Payment History */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Late Payments (30+ days)</label>
                    {isEditing ? (
                      <input
                        type="number"
                        min="0"
                        value={details?.latePayments30Days || ''}
                        onChange={(e) => handleInputChange('details.financialCredit.latePayments30Days', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter late payments"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.latePayments30Days || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Late Payments (90+ days)</label>
                    {isEditing ? (
                      <input
                        type="number"
                        min="0"
                        value={details?.latePayments90Days || ''}
                        onChange={(e) => handleInputChange('details.financialCredit.latePayments90Days', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter late payments"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.latePayments90Days || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* Loan Summary */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Loan History Summary</label>
                  {isEditing ? (
                    <textarea
                      value={details?.loanHistorySummary || ''}
                      onChange={(e) => handleInputChange('details.financialCredit.loanHistorySummary', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      rows={4}
                      placeholder="Detailed summary of loan history, payment patterns, and any additional information"
                    />
                  ) : (
                    <p className="text-gray-900">{details?.loanHistorySummary || 'Not provided'}</p>
                  )}
                </div>

                {/* Document Upload Section */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Loan History Documentation</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Loan History Report</label>
                      {!uploadedFinancialDocuments.loanHistoryReport ? (
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
                          <input
                            type="file"
                            onChange={(e) => handleFinancialDocumentUpload(e, 'loanHistoryReport')}
                            accept=".pdf,.jpg,.jpeg,.png"
                            className="hidden"
                            id="loanHistoryReport"
                          />
                          <label htmlFor="loanHistoryReport" className="cursor-pointer">
                            <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-600">Click to upload loan history report</p>
                            <p className="text-xs text-gray-500 mt-1">PDF, JPEG, PNG (max 10MB)</p>
                          </label>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <FileText className="h-5 w-5 text-green-600" />
                            <span className="text-sm text-green-800">{uploadedFinancialDocuments.loanHistoryReport.name}</span>
                          </div>
                          <button
                            onClick={() => removeFinancialDocument('loanHistoryReport')}
                            className="text-red-600 hover:text-red-700 text-sm font-medium"
                          >
                            Remove
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Loan History Information Section */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-blue-900 mb-2">About Loan History Verification</h4>
                      <div className="text-sm text-blue-800 space-y-2">
                        <p><strong>What we verify:</strong></p>
                        <ul className="list-disc list-inside ml-2 space-y-1">
                          <li>Loan applications and approval history</li>
                          <li>Current and past loan balances</li>
                          <li>Payment history and patterns</li>
                          <li>Late payment records</li>
                          <li>Loan defaults and restructures</li>
                          <li>Credit utilization patterns</li>
                          <li>Financial responsibility assessment</li>
                        </ul>
                        
                        <div className="mt-3 p-2 bg-blue-100 rounded text-xs">
                          <strong>Note:</strong> Loan history verification is essential for assessing creditworthiness, financial responsibility, and payment reliability. This check helps organizations evaluate borrowing patterns and financial management capabilities.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {selectedSubTab === 'firsHistory' && (
          <div className="space-y-4">
            {!selectedChecks['financialCredit.firsHistory']?.selected ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">FIRS History</h3>
                <p className="text-gray-500 mb-4">Verify Federal Inland Revenue Service tax compliance and history</p>
                <button
                  onClick={() => toggleCheck('financialCredit.firsHistory')}
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                >
                  Add FIRS History Check - ₦2,200
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">FIRS History</h3>
                  <button
                    onClick={() => toggleCheck('financialCredit.firsHistory')}
                    className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-full text-sm font-medium transition-colors"
                  >
                    Remove
                  </button>
                </div>

                {/* Tax Identification */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tax Identification Number (TIN)</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={details?.firsTIN || ''}
                        onChange={(e) => handleInputChange('details.financialCredit.firsTIN', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter TIN"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.firsTIN || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">TIN Registration Date</label>
                    {isEditing ? (
                      <input
                        type="date"
                        value={details?.firsTINRegistrationDate || ''}
                        onChange={(e) => handleInputChange('details.financialCredit.firsTINRegistrationDate', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.firsTINRegistrationDate || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* Tax Compliance Status */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tax Compliance Status</label>
                    {isEditing ? (
                      <select
                        value={details?.firsComplianceStatus || ''}
                        onChange={(e) => handleInputChange('details.financialCredit.firsComplianceStatus', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select status</option>
                        <option value="compliant">Compliant</option>
                        <option value="non-compliant">Non-Compliant</option>
                        <option value="under-review">Under Review</option>
                        <option value="exempt">Exempt</option>
                        <option value="pending">Pending</option>
                        <option value="unknown">Unknown</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.firsComplianceStatus || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Tax Filing Date</label>
                    {isEditing ? (
                      <input
                        type="date"
                        value={details?.lastTaxFilingDate || ''}
                        onChange={(e) => handleInputChange('details.financialCredit.lastTaxFilingDate', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.lastTaxFilingDate || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* Tax Assessment Information */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Annual Tax Assessment (₦)</label>
                    {isEditing ? (
                      <input
                        type="number"
                        min="0"
                        value={details?.annualTaxAssessment || ''}
                        onChange={(e) => handleInputChange('details.financialCredit.annualTaxAssessment', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter tax assessment"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.annualTaxAssessment ? `₦${details.annualTaxAssessment.toLocaleString()}` : 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tax Paid Last Year (₦)</label>
                    {isEditing ? (
                      <input
                        type="number"
                        min="0"
                        value={details?.taxPaidLastYear || ''}
                        onChange={(e) => handleInputChange('details.financialCredit.taxPaidLastYear', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter tax paid"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.taxPaidLastYear ? `₦${details.taxPaidLastYear.toLocaleString()}` : 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Outstanding Tax (₦)</label>
                    {isEditing ? (
                      <input
                        type="number"
                        min="0"
                        value={details?.outstandingTax || ''}
                        onChange={(e) => handleInputChange('details.financialCredit.outstandingTax', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter outstanding tax"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.outstandingTax ? `₦${details.outstandingTax.toLocaleString()}` : 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* Tax Penalties and Issues */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tax Penalties (₦)</label>
                    {isEditing ? (
                      <input
                        type="number"
                        min="0"
                        value={details?.taxPenalties || ''}
                        onChange={(e) => handleInputChange('details.financialCredit.taxPenalties', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter penalties"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.taxPenalties ? `₦${details.taxPenalties.toLocaleString()}` : 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tax Audit Status</label>
                    {isEditing ? (
                      <select
                        value={details?.taxAuditStatus || ''}
                        onChange={(e) => handleInputChange('details.financialCredit.taxAuditStatus', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select status</option>
                        <option value="never-audited">Never Audited</option>
                        <option value="currently-audited">Currently Audited</option>
                        <option value="audit-completed">Audit Completed</option>
                        <option value="audit-pending">Audit Pending</option>
                        <option value="audit-disputed">Audit Disputed</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.taxAuditStatus || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* FIRS Summary */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">FIRS History Summary</label>
                  {isEditing ? (
                    <textarea
                      value={details?.firsHistorySummary || ''}
                      onChange={(e) => handleInputChange('details.financialCredit.firsHistorySummary', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      rows={4}
                      placeholder="Detailed summary of FIRS history, tax compliance, and any additional information"
                    />
                  ) : (
                    <p className="text-gray-900">{details?.firsHistorySummary || 'Not provided'}</p>
                  )}
                </div>

                {/* Document Upload Section */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">FIRS History Documentation</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">FIRS History Report</label>
                      {!uploadedFinancialDocuments.firsHistoryReport ? (
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
                          <input
                            type="file"
                            onChange={(e) => handleFinancialDocumentUpload(e, 'firsHistoryReport')}
                            accept=".pdf,.jpg,.jpeg,.png"
                            className="hidden"
                            id="firsHistoryReport"
                          />
                          <label htmlFor="firsHistoryReport" className="cursor-pointer">
                            <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-600">Click to upload FIRS history report</p>
                            <p className="text-xs text-gray-500 mt-1">PDF, JPEG, PNG (max 10MB)</p>
                          </label>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <FileText className="h-5 w-5 text-green-600" />
                            <span className="text-sm text-green-800">{uploadedFinancialDocuments.firsHistoryReport.name}</span>
                          </div>
                          <button
                            onClick={() => removeFinancialDocument('firsHistoryReport')}
                            className="text-red-600 hover:text-red-700 text-sm font-medium"
                          >
                            Remove
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* FIRS History Information Section */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-green-900 mb-2">About FIRS History Verification</h4>
                      <div className="text-sm text-green-800 space-y-2">
                        <p><strong>What we verify:</strong></p>
                        <ul className="list-disc list-inside ml-2 space-y-1">
                          <li>Tax Identification Number (TIN) registration</li>
                          <li>Tax compliance and filing history</li>
                          <li>Annual tax assessments and payments</li>
                          <li>Outstanding tax obligations</li>
                          <li>Tax penalties and interest charges</li>
                          <li>Tax audit history and status</li>
                          <li>Overall tax compliance record</li>
                        </ul>
                        
                        <div className="mt-3 p-2 bg-green-100 rounded text-xs">
                          <strong>Note:</strong> FIRS history verification is crucial for assessing tax compliance, financial responsibility, and regulatory adherence. This check helps organizations evaluate tax obligations and compliance with Nigerian tax laws.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    )
  }

  const renderAssociationContent = () => {
    const details = request.details?.association
    const subTabs = [
      { key: 'professionalBodies', name: 'Professional Bodies', icon: CheckCircle, price: 1500 },
      { key: 'alumniNetworks', name: 'Alumni Networks', icon: CheckCircle, price: 2000 },
      { key: 'exclusiveAssociations', name: 'Exclusive Associations', icon: CheckCircle, price: 2500 },
      { key: 'politicalExposure', name: 'Political Exposure', icon: CheckCircle, price: 3000 },
      { key: 'professionalAssociations', name: 'Professional Associations', icon: CheckCircle, price: 1200 },
      { key: 'businessAssociations', name: 'Business Associations', icon: CheckCircle, price: 1800 },
      { key: 'socialAssociations', name: 'Social Associations', icon: CheckCircle, price: 1000 }
    ]

    return (
      <div className="space-y-6">
        {/* Sub-tabs */}
        <div className="flex space-x-1 border-b border-gray-200 overflow-x-auto">
          {subTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setSelectedSubTab(tab.key)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap flex-shrink-0 ${
                selectedSubTab === tab.key
                  ? 'border-red-500 text-red-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Content based on selected sub-tab */}
        {selectedSubTab === 'professionalBodies' && (
          <div className="space-y-4">
            {!selectedChecks['association.professionalBodies']?.selected ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Professional Bodies (NBA, ICAN, etc.)</h3>
                <p className="text-gray-500 mb-4">Verify membership in professional bodies and associations</p>
                <button
                  onClick={() => toggleCheck('association.professionalBodies')}
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                >
                  Add Professional Bodies Check - ₦1,500
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Professional Bodies (NBA, ICAN, etc.)</h3>
                  <button
                    onClick={() => toggleCheck('association.professionalBodies')}
                    className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-full text-sm font-medium transition-colors"
                  >
                    Remove
                  </button>
                </div>
                {/* Professional Body Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Professional Body</label>
                    {isEditing ? (
                      <select
                        value={details?.professionalBodyName || ''}
                        onChange={(e) => handleInputChange('details.association.professionalBodyName', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select body</option>
                        <option value="nba">Nigerian Bar Association (NBA)</option>
                        <option value="ican">Institute of Chartered Accountants (ICAN)</option>
                        <option value="cima">Chartered Institute of Management Accountants (CIMA)</option>
                        <option value="pmi">Project Management Institute (PMI)</option>
                        <option value="nim">Nigerian Institute of Management (NIM)</option>
                        <option value="nse">Nigerian Society of Engineers (NSE)</option>
                        <option value="cipm">Chartered Institute of Personnel Management (CIPM)</option>
                        <option value="cibn">Chartered Institute of Bankers of Nigeria (CIBN)</option>
                        <option value="other">Other</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.professionalBodyName || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Membership Number</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={details?.professionalBodyMembershipNumber || ''}
                        onChange={(e) => handleInputChange('details.association.professionalBodyMembershipNumber', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter membership number"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.professionalBodyMembershipNumber || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* Membership Information */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Membership Start Date</label>
                    {isEditing ? (
                      <input
                        type="date"
                        value={details?.professionalBodyMembershipStartDate || ''}
                        onChange={(e) => handleInputChange('details.association.professionalBodyMembershipStartDate', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.professionalBodyMembershipStartDate || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Membership Status</label>
                    {isEditing ? (
                      <select
                        value={details?.professionalBodyMembershipStatus || ''}
                        onChange={(e) => handleInputChange('details.association.professionalBodyMembershipStatus', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="suspended">Suspended</option>
                        <option value="expired">Expired</option>
                        <option value="cancelled">Cancelled</option>
                        <option value="other">Other</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.professionalBodyMembershipStatus || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Certification Level</label>
                    {isEditing ? (
                      <select
                        value={details?.professionalBodyCertificationLevel || ''}
                        onChange={(e) => handleInputChange('details.association.professionalBodyCertificationLevel', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select level</option>
                        <option value="student">Student</option>
                        <option value="associate">Associate</option>
                        <option value="member">Member</option>
                        <option value="senior">Senior</option>
                        <option value="fellow">Fellow</option>
                        <option value="chartered">Chartered</option>
                        <option value="certified">Certified</option>
                        <option value="other">Other</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.professionalBodyCertificationLevel || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* Additional Professional Bodies */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Additional Professional Bodies</label>
                  {isEditing ? (
                    <textarea
                      value={details?.additionalProfessionalBodies || ''}
                      onChange={(e) => handleInputChange('details.association.additionalProfessionalBodies', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      rows={4}
                      placeholder="List any other professional bodies, certifications, or professional associations"
                    />
                  ) : (
                    <p className="text-gray-900">{details?.additionalProfessionalBodies || 'Not provided'}</p>
                  )}
                </div>

                {/* Document Upload Section */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Professional Bodies Documentation</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Professional Bodies Report</label>
                      {!uploadedAssociationDocuments.professionalBodiesReport ? (
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
                          <input
                            type="file"
                            onChange={(e) => handleAssociationDocumentUpload(e, 'professionalBodiesReport')}
                            accept=".pdf,.jpg,.jpeg,.png"
                            className="hidden"
                            id="professionalBodiesReport"
                          />
                          <label htmlFor="professionalBodiesReport" className="cursor-pointer">
                            <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-600">Click to upload professional bodies report</p>
                            <p className="text-xs text-gray-500 mt-1">PDF, JPEG, PNG (max 10MB)</p>
                          </label>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <FileText className="h-5 w-5 text-green-600" />
                            <span className="text-sm text-green-800">{uploadedAssociationDocuments.professionalBodiesReport.name}</span>
                          </div>
                          <button
                            onClick={() => removeAssociationDocument('professionalBodiesReport')}
                            className="text-red-600 hover:text-red-700 text-sm font-medium"
                          >
                            Remove
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Professional Bodies Information Section */}
                <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-indigo-900 mb-2">About Professional Bodies Verification</h4>
                      <div className="text-sm text-indigo-800 space-y-2">
                        <p><strong>What we verify:</strong></p>
                        <ul className="list-disc list-inside ml-2 space-y-1">
                          <li>Professional body memberships (NBA, ICAN, NIM, etc.)</li>
                          <li>Professional certification levels</li>
                          <li>Membership status and duration</li>
                          <li>Professional development activities</li>
                          <li>Industry recognition and standing</li>
                          <li>Professional competence verification</li>
                          <li>Regulatory compliance status</li>
                        </ul>
                        
                        <div className="mt-3 p-2 bg-indigo-100 rounded text-xs">
                          <strong>Note:</strong> Professional bodies verification helps assess professional competence, industry standing, and regulatory compliance. This check is valuable for understanding professional qualifications and industry recognition.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {selectedSubTab === 'alumniNetworks' && (
          <div className="space-y-4">
            {!selectedChecks['association.alumniNetworks']?.selected ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Alumni Networks (Harvard, Oxford, etc.)</h3>
                <p className="text-gray-500 mb-4">Verify alumni status and network connections</p>
                <button
                  onClick={() => toggleCheck('association.alumniNetworks')}
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                >
                  Add Alumni Networks Check - ₦2,000
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Alumni Networks (Harvard, Oxford, etc.)</h3>
                  <button
                    onClick={() => toggleCheck('association.alumniNetworks')}
                    className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-full text-sm font-medium transition-colors"
                  >
                    Remove
                  </button>
                </div>
                {/* Alumni Institution Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Institution Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={details?.alumniInstitutionName || ''}
                        onChange={(e) => handleInputChange('details.association.alumniInstitutionName', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter institution name"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.alumniInstitutionName || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Institution Type</label>
                    {isEditing ? (
                      <select
                        value={details?.alumniInstitutionType || ''}
                        onChange={(e) => handleInputChange('details.association.alumniInstitutionType', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select type</option>
                        <option value="university">University</option>
                        <option value="college">College</option>
                        <option value="business-school">Business School</option>
                        <option value="law-school">Law School</option>
                        <option value="medical-school">Medical School</option>
                        <option value="engineering-school">Engineering School</option>
                        <option value="graduate-school">Graduate School</option>
                        <option value="other">Other</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.alumniInstitutionType || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* Academic Information */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Degree/Program</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={details?.alumniDegreeProgram || ''}
                        onChange={(e) => handleInputChange('details.association.alumniDegreeProgram', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter degree or program"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.alumniDegreeProgram || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Graduation Year</label>
                    {isEditing ? (
                      <input
                        type="number"
                        min="1950"
                        max="2030"
                        value={details?.alumniGraduationYear || ''}
                        onChange={(e) => handleInputChange('details.association.alumniGraduationYear', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter graduation year"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.alumniGraduationYear || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Alumni Status</label>
                    {isEditing ? (
                      <select
                        value={details?.alumniStatus || ''}
                        onChange={(e) => handleInputChange('details.association.alumniStatus', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select status</option>
                        <option value="active">Active Alumni</option>
                        <option value="inactive">Inactive Alumni</option>
                        <option value="life-member">Life Member</option>
                        <option value="honorary">Honorary Alumni</option>
                        <option value="former">Former Alumni</option>
                        <option value="other">Other</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.alumniStatus || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* Alumni Network Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Alumni Network Participation</label>
                    {isEditing ? (
                      <select
                        value={details?.alumniNetworkParticipation || ''}
                        onChange={(e) => handleInputChange('details.association.alumniNetworkParticipation', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select participation level</option>
                        <option value="very-active">Very Active</option>
                        <option value="active">Active</option>
                        <option value="moderate">Moderate</option>
                        <option value="occasional">Occasional</option>
                        <option value="minimal">Minimal</option>
                        <option value="none">No Participation</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.alumniNetworkParticipation || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Alumni Events Attended (Annual)</label>
                    {isEditing ? (
                      <input
                        type="number"
                        min="0"
                        value={details?.alumniEventsAttended || ''}
                        onChange={(e) => handleInputChange('details.association.alumniEventsAttended', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter number of events"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.alumniEventsAttended || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* Additional Alumni Networks */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Additional Alumni Networks</label>
                  {isEditing ? (
                    <textarea
                      value={details?.additionalAlumniNetworks || ''}
                      onChange={(e) => handleInputChange('details.association.additionalAlumniNetworks', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      rows={4}
                      placeholder="List any other alumni networks, educational institutions, or academic associations"
                    />
                  ) : (
                    <p className="text-gray-900">{details?.additionalAlumniNetworks || 'Not provided'}</p>
                  )}
                </div>

                {/* Document Upload Section */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Alumni Networks Documentation</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Alumni Networks Report</label>
                      {!uploadedAssociationDocuments.alumniNetworksReport ? (
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
                          <input
                            type="file"
                            onChange={(e) => handleAssociationDocumentUpload(e, 'alumniNetworksReport')}
                            accept=".pdf,.jpg,.jpeg,.png"
                            className="hidden"
                            id="alumniNetworksReport"
                          />
                          <label htmlFor="alumniNetworksReport" className="cursor-pointer">
                            <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-600">Click to upload alumni networks report</p>
                            <p className="text-xs text-gray-500 mt-1">PDF, JPEG, PNG (max 10MB)</p>
                          </label>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <FileText className="h-5 w-5 text-green-600" />
                            <span className="text-sm text-green-800">{uploadedAssociationDocuments.alumniNetworksReport.name}</span>
                          </div>
                          <button
                            onClick={() => removeAssociationDocument('alumniNetworksReport')}
                            className="text-red-600 hover:text-red-700 text-sm font-medium"
                          >
                            Remove
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Alumni Networks Information Section */}
                <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-teal-900 mb-2">About Alumni Networks Verification</h4>
                      <div className="text-sm text-teal-800 space-y-2">
                        <p><strong>What we verify:</strong></p>
                        <ul className="list-disc list-inside ml-2 space-y-1">
                          <li>Educational institution alumni status</li>
                          <li>Degree and program verification</li>
                          <li>Graduation year and academic achievements</li>
                          <li>Alumni network participation level</li>
                          <li>Alumni events and activities involvement</li>
                          <li>Educational background verification</li>
                          <li>Academic network connections</li>
                        </ul>
                        
                        <div className="mt-3 p-2 bg-teal-100 rounded text-xs">
                          <strong>Note:</strong> Alumni networks verification helps assess educational background, academic achievements, and networking capabilities. This check is valuable for understanding educational qualifications and academic connections.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {selectedSubTab === 'politicalExposure' && (
          <div className="space-y-4">
            {!selectedChecks['association.politicalExposure']?.selected ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Political Exposure (PEPs)</h3>
                <p className="text-gray-500 mb-4">Check for politically exposed person status</p>
                <button
                  onClick={() => toggleCheck('association.politicalExposure')}
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                >
                  Add Political Exposure Check - ₦3,000
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Political Exposure (PEPs)</h3>
                  <button
                    onClick={() => toggleCheck('association.politicalExposure')}
                    className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-full text-sm font-medium transition-colors"
                  >
                    Remove
                  </button>
                </div>
                {/* PEP Status and Classification */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">PEP Status</label>
                    {isEditing ? (
                      <select
                        value={details?.pepStatus || ''}
                        onChange={(e) => handleInputChange('details.association.pepStatus', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select status</option>
                        <option value="not_pep">Not a PEP</option>
                        <option value="domestic_pep">Domestic PEP</option>
                        <option value="foreign_pep">Foreign PEP</option>
                        <option value="family_pep">Family Member of PEP</option>
                        <option value="close_associate">Close Associate of PEP</option>
                        <option value="former_pep">Former PEP</option>
                        <option value="under_investigation">Under Investigation</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.pepStatus || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Political Position</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={details?.politicalPosition || ''}
                        onChange={(e) => handleInputChange('details.association.politicalPosition', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter political position (if applicable)"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.politicalPosition || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* PEP Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Government Level</label>
                    {isEditing ? (
                      <select
                        value={details?.governmentLevel || ''}
                        onChange={(e) => handleInputChange('details.association.governmentLevel', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select level</option>
                        <option value="federal">Federal</option>
                        <option value="state">State</option>
                        <option value="local">Local Government</option>
                        <option value="international">International</option>
                        <option value="not_applicable">Not Applicable</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.governmentLevel || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Position Duration</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={details?.positionDuration || ''}
                        onChange={(e) => handleInputChange('details.association.positionDuration', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="e.g., 2019-2023"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.positionDuration || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* Family and Associates */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Family Member PEP Status</label>
                    {isEditing ? (
                      <select
                        value={details?.familyMemberPEPStatus || ''}
                        onChange={(e) => handleInputChange('details.association.familyMemberPEPStatus', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select status</option>
                        <option value="no_family_pep">No Family Member PEP</option>
                        <option value="spouse_pep">Spouse is PEP</option>
                        <option value="parent_pep">Parent is PEP</option>
                        <option value="sibling_pep">Sibling is PEP</option>
                        <option value="child_pep">Child is PEP</option>
                        <option value="other_relative_pep">Other Relative is PEP</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.familyMemberPEPStatus || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Close Associate PEP Status</label>
                    {isEditing ? (
                      <select
                        value={details?.closeAssociatePEPStatus || ''}
                        onChange={(e) => handleInputChange('details.association.closeAssociatePEPStatus', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select status</option>
                        <option value="no_close_associate_pep">No Close Associate PEP</option>
                        <option value="business_partner_pep">Business Partner is PEP</option>
                        <option value="close_friend_pep">Close Friend is PEP</option>
                        <option value="professional_associate_pep">Professional Associate is PEP</option>
                        <option value="other_associate_pep">Other Associate is PEP</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.closeAssociatePEPStatus || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* PEP Summary */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Political Exposure Summary</label>
                  {isEditing ? (
                    <textarea
                      value={details?.politicalExposureSummary || ''}
                      onChange={(e) => handleInputChange('details.association.politicalExposureSummary', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      rows={4}
                      placeholder="Detailed summary of political exposure, positions held, and any additional information"
                    />
                  ) : (
                    <p className="text-gray-900">{details?.politicalExposureSummary || 'Not provided'}</p>
                  )}
                </div>

                {/* Document Upload Section */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Political Exposure Documentation</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Political Exposure Report</label>
                      {!uploadedAssociationDocuments.politicalExposureReport ? (
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
                          <input
                            type="file"
                            onChange={(e) => handleAssociationDocumentUpload(e, 'politicalExposureReport')}
                            accept=".pdf,.jpg,.jpeg,.png"
                            className="hidden"
                            id="politicalExposureReport"
                          />
                          <label htmlFor="politicalExposureReport" className="cursor-pointer">
                            <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-600">Click to upload political exposure report</p>
                            <p className="text-xs text-gray-500 mt-1">PDF, JPEG, PNG (max 10MB)</p>
                          </label>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <FileText className="h-5 w-5 text-green-600" />
                            <span className="text-sm text-green-800">{uploadedAssociationDocuments.politicalExposureReport.name}</span>
                          </div>
                          <button
                            onClick={() => removeAssociationDocument('politicalExposureReport')}
                            className="text-red-600 hover:text-red-700 text-sm font-medium"
                          >
                            Remove
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Political Exposure Information Section */}
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-red-900 mb-2">About Political Exposure (PEPs) Verification</h4>
                      <div className="text-sm text-red-800 space-y-2">
                        <p><strong>What we verify:</strong></p>
                        <ul className="list-disc list-inside ml-2 space-y-1">
                          <li>Politically Exposed Person (PEP) status</li>
                          <li>Government positions and political roles</li>
                          <li>Family member PEP connections</li>
                          <li>Close associate PEP relationships</li>
                          <li>Government level and jurisdiction</li>
                          <li>Position duration and history</li>
                          <li>Political influence and exposure level</li>
                        </ul>
                        
                        <div className="mt-3 p-2 bg-red-100 rounded text-xs">
                          <strong>Note:</strong> Political exposure verification is crucial for compliance with anti-money laundering (AML) regulations and risk assessment. PEPs require enhanced due diligence due to their potential for corruption and money laundering risks.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {selectedSubTab === 'exclusiveAssociations' && (
          <div className="space-y-4">
            {!selectedChecks['association.exclusiveAssociations']?.selected ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Exclusive Associations</h3>
                <p className="text-gray-500 mb-4">Verify membership in exclusive clubs, societies, and organizations</p>
                <button
                  onClick={() => toggleCheck('association.exclusiveAssociations')}
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                >
                  Add Exclusive Associations Check - ₦2,500
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Exclusive Associations</h3>
                  <button
                    onClick={() => toggleCheck('association.exclusiveAssociations')}
                    className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-full text-sm font-medium transition-colors"
                  >
                    Remove
                  </button>
                </div>

                {/* Exclusive Club Memberships */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Exclusive Club Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={details?.exclusiveClubName || ''}
                        onChange={(e) => handleInputChange('details.association.exclusiveClubName', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter exclusive club name"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.exclusiveClubName || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Membership Type</label>
                    {isEditing ? (
                      <select
                        value={details?.exclusiveMembershipType || ''}
                        onChange={(e) => handleInputChange('details.association.exclusiveMembershipType', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select membership type</option>
                        <option value="full-member">Full Member</option>
                        <option value="associate-member">Associate Member</option>
                        <option value="honorary-member">Honorary Member</option>
                        <option value="life-member">Life Member</option>
                        <option value="founding-member">Founding Member</option>
                        <option value="other">Other</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.exclusiveMembershipType || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* Membership Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Membership Start Date</label>
                    {isEditing ? (
                      <input
                        type="date"
                        value={details?.exclusiveMembershipStartDate || ''}
                        onChange={(e) => handleInputChange('details.association.exclusiveMembershipStartDate', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.exclusiveMembershipStartDate || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Membership Status</label>
                    {isEditing ? (
                      <select
                        value={details?.exclusiveMembershipStatus || ''}
                        onChange={(e) => handleInputChange('details.association.exclusiveMembershipStatus', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="suspended">Suspended</option>
                        <option value="expelled">Expelled</option>
                        <option value="resigned">Resigned</option>
                        <option value="other">Other</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.exclusiveMembershipStatus || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* Additional Exclusive Associations */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Additional Exclusive Associations</label>
                  {isEditing ? (
                    <textarea
                      value={details?.additionalExclusiveAssociations || ''}
                      onChange={(e) => handleInputChange('details.association.additionalExclusiveAssociations', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      rows={4}
                      placeholder="List any other exclusive clubs, societies, or organizations"
                    />
                  ) : (
                    <p className="text-gray-900">{details?.additionalExclusiveAssociations || 'Not provided'}</p>
                  )}
                </div>

                {/* Document Upload Section */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Exclusive Associations Documentation</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Exclusive Associations Report</label>
                      {!uploadedAssociationDocuments.exclusiveAssociationsReport ? (
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
                          <input
                            type="file"
                            onChange={(e) => handleAssociationDocumentUpload(e, 'exclusiveAssociationsReport')}
                            accept=".pdf,.jpg,.jpeg,.png"
                            className="hidden"
                            id="exclusiveAssociationsReport"
                          />
                          <label htmlFor="exclusiveAssociationsReport" className="cursor-pointer">
                            <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-600">Click to upload exclusive associations report</p>
                            <p className="text-xs text-gray-500 mt-1">PDF, JPEG, PNG (max 10MB)</p>
                          </label>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <FileText className="h-5 w-5 text-green-600" />
                            <span className="text-sm text-green-800">{uploadedAssociationDocuments.exclusiveAssociationsReport.name}</span>
                          </div>
                          <button
                            onClick={() => removeAssociationDocument('exclusiveAssociationsReport')}
                            className="text-red-600 hover:text-red-700 text-sm font-medium"
                          >
                            Remove
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Exclusive Associations Information Section */}
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-purple-900 mb-2">About Exclusive Associations</h4>
                      <div className="text-sm text-purple-800 space-y-2">
                        <p><strong>What we verify:</strong></p>
                        <ul className="list-disc list-inside ml-2 space-y-1">
                          <li>Membership in exclusive clubs and societies</li>
                          <li>Membership type and status</li>
                          <li>Membership duration and history</li>
                          <li>Leadership positions in exclusive organizations</li>
                          <li>Social status and networking connections</li>
                          <li>Exclusive event participation</li>
                          <li>Prestigious association affiliations</li>
                        </ul>
                        
                        <div className="mt-3 p-2 bg-purple-100 rounded text-xs">
                          <strong>Note:</strong> Exclusive associations verification helps assess social status, networking capabilities, and access to influential circles. This check is valuable for understanding social connections and prestige.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {selectedSubTab === 'professionalAssociations' && (
          <div className="space-y-4">
            {!selectedChecks['association.professionalAssociations']?.selected ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Professional Associations</h3>
                <p className="text-gray-500 mb-4">Verify membership in professional organizations and trade associations</p>
                <button
                  onClick={() => toggleCheck('association.professionalAssociations')}
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                >
                  Add Professional Associations Check - ₦1,200
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Professional Associations</h3>
                  <button
                    onClick={() => toggleCheck('association.professionalAssociations')}
                    className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-full text-sm font-medium transition-colors"
                  >
                    Remove
                  </button>
                </div>

                {/* Professional Association Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Professional Association Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={details?.professionalAssociationName || ''}
                        onChange={(e) => handleInputChange('details.association.professionalAssociationName', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter association name"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.professionalAssociationName || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Membership Number</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={details?.professionalMembershipNumber || ''}
                        onChange={(e) => handleInputChange('details.association.professionalMembershipNumber', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter membership number"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.professionalMembershipNumber || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* Membership Information */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Membership Start Date</label>
                    {isEditing ? (
                      <input
                        type="date"
                        value={details?.professionalMembershipStartDate || ''}
                        onChange={(e) => handleInputChange('details.association.professionalMembershipStartDate', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.professionalMembershipStartDate || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Membership Status</label>
                    {isEditing ? (
                      <select
                        value={details?.professionalMembershipStatus || ''}
                        onChange={(e) => handleInputChange('details.association.professionalMembershipStatus', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="suspended">Suspended</option>
                        <option value="expired">Expired</option>
                        <option value="cancelled">Cancelled</option>
                        <option value="other">Other</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.professionalMembershipStatus || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Certification Level</label>
                    {isEditing ? (
                      <select
                        value={details?.professionalCertificationLevel || ''}
                        onChange={(e) => handleInputChange('details.association.professionalCertificationLevel', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select level</option>
                        <option value="student">Student</option>
                        <option value="associate">Associate</option>
                        <option value="member">Member</option>
                        <option value="senior">Senior</option>
                        <option value="fellow">Fellow</option>
                        <option value="chartered">Chartered</option>
                        <option value="certified">Certified</option>
                        <option value="other">Other</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.professionalCertificationLevel || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* Additional Professional Associations */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Additional Professional Associations</label>
                  {isEditing ? (
                    <textarea
                      value={details?.additionalProfessionalAssociations || ''}
                      onChange={(e) => handleInputChange('details.association.additionalProfessionalAssociations', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      rows={4}
                      placeholder="List any other professional associations, trade organizations, or industry groups"
                    />
                  ) : (
                    <p className="text-gray-900">{details?.additionalProfessionalAssociations || 'Not provided'}</p>
                  )}
                </div>

                {/* Document Upload Section */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Professional Associations Documentation</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Professional Associations Report</label>
                      {!uploadedAssociationDocuments.professionalAssociationsReport ? (
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
                          <input
                            type="file"
                            onChange={(e) => handleAssociationDocumentUpload(e, 'professionalAssociationsReport')}
                            accept=".pdf,.jpg,.jpeg,.png"
                            className="hidden"
                            id="professionalAssociationsReport"
                          />
                          <label htmlFor="professionalAssociationsReport" className="cursor-pointer">
                            <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-600">Click to upload professional associations report</p>
                            <p className="text-xs text-gray-500 mt-1">PDF, JPEG, PNG (max 10MB)</p>
                          </label>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <FileText className="h-5 w-5 text-green-600" />
                            <span className="text-sm text-green-800">{uploadedAssociationDocuments.professionalAssociationsReport.name}</span>
                          </div>
                          <button
                            onClick={() => removeAssociationDocument('professionalAssociationsReport')}
                            className="text-red-600 hover:text-red-700 text-sm font-medium"
                          >
                            Remove
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Professional Associations Information Section */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-blue-900 mb-2">About Professional Associations</h4>
                      <div className="text-sm text-blue-800 space-y-2">
                        <p><strong>What we verify:</strong></p>
                        <ul className="list-disc list-inside ml-2 space-y-1">
                          <li>Professional organization memberships</li>
                          <li>Trade association affiliations</li>
                          <li>Industry group memberships</li>
                          <li>Professional certification levels</li>
                          <li>Membership status and duration</li>
                          <li>Professional development activities</li>
                          <li>Industry recognition and standing</li>
                        </ul>
                        
                        <div className="mt-3 p-2 bg-blue-100 rounded text-xs">
                          <strong>Note:</strong> Professional associations verification helps assess industry involvement, professional development, and career advancement. This check is valuable for understanding professional credibility and industry standing.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {selectedSubTab === 'businessAssociations' && (
          <div className="space-y-4">
            {!selectedChecks['association.businessAssociations']?.selected ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Business Associations</h3>
                <p className="text-gray-500 mb-4">Verify membership in business organizations and chambers of commerce</p>
                <button
                  onClick={() => toggleCheck('association.businessAssociations')}
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                >
                  Add Business Associations Check - ₦1,800
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Business Associations</h3>
                  <button
                    onClick={() => toggleCheck('association.businessAssociations')}
                    className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-full text-sm font-medium transition-colors"
                  >
                    Remove
                  </button>
                </div>

                {/* Business Association Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Business Association Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={details?.businessAssociationName || ''}
                        onChange={(e) => handleInputChange('details.association.businessAssociationName', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter business association name"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.businessAssociationName || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Association Type</label>
                    {isEditing ? (
                      <select
                        value={details?.businessAssociationType || ''}
                        onChange={(e) => handleInputChange('details.association.businessAssociationType', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select type</option>
                        <option value="chamber-of-commerce">Chamber of Commerce</option>
                        <option value="industry-association">Industry Association</option>
                        <option value="trade-organization">Trade Organization</option>
                        <option value="business-network">Business Network</option>
                        <option value="entrepreneur-group">Entrepreneur Group</option>
                        <option value="startup-community">Startup Community</option>
                        <option value="other">Other</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.businessAssociationType || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* Membership Information */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Membership Start Date</label>
                    {isEditing ? (
                      <input
                        type="date"
                        value={details?.businessMembershipStartDate || ''}
                        onChange={(e) => handleInputChange('details.association.businessMembershipStartDate', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.businessMembershipStartDate || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Membership Status</label>
                    {isEditing ? (
                      <select
                        value={details?.businessMembershipStatus || ''}
                        onChange={(e) => handleInputChange('details.association.businessMembershipStatus', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="suspended">Suspended</option>
                        <option value="expired">Expired</option>
                        <option value="cancelled">Cancelled</option>
                        <option value="other">Other</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.businessMembershipStatus || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Leadership Role</label>
                    {isEditing ? (
                      <select
                        value={details?.businessLeadershipRole || ''}
                        onChange={(e) => handleInputChange('details.association.businessLeadershipRole', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select role</option>
                        <option value="member">Member</option>
                        <option value="board-member">Board Member</option>
                        <option value="committee-member">Committee Member</option>
                        <option value="vice-president">Vice President</option>
                        <option value="president">President</option>
                        <option value="treasurer">Treasurer</option>
                        <option value="secretary">Secretary</option>
                        <option value="other">Other</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.businessLeadershipRole || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* Additional Business Associations */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Additional Business Associations</label>
                  {isEditing ? (
                    <textarea
                      value={details?.additionalBusinessAssociations || ''}
                      onChange={(e) => handleInputChange('details.association.additionalBusinessAssociations', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      rows={4}
                      placeholder="List any other business associations, chambers of commerce, or industry groups"
                    />
                  ) : (
                    <p className="text-gray-900">{details?.additionalBusinessAssociations || 'Not provided'}</p>
                  )}
                </div>

                {/* Document Upload Section */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Business Associations Documentation</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Business Associations Report</label>
                      {!uploadedAssociationDocuments.businessAssociationsReport ? (
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
                          <input
                            type="file"
                            onChange={(e) => handleAssociationDocumentUpload(e, 'businessAssociationsReport')}
                            accept=".pdf,.jpg,.jpeg,.png"
                            className="hidden"
                            id="businessAssociationsReport"
                          />
                          <label htmlFor="businessAssociationsReport" className="cursor-pointer">
                            <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-600">Click to upload business associations report</p>
                            <p className="text-xs text-gray-500 mt-1">PDF, JPEG, PNG (max 10MB)</p>
                          </label>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <FileText className="h-5 w-5 text-green-600" />
                            <span className="text-sm text-green-800">{uploadedAssociationDocuments.businessAssociationsReport.name}</span>
                          </div>
                          <button
                            onClick={() => removeAssociationDocument('businessAssociationsReport')}
                            className="text-red-600 hover:text-red-700 text-sm font-medium"
                          >
                            Remove
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Business Associations Information Section */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-green-900 mb-2">About Business Associations</h4>
                      <div className="text-sm text-green-800 space-y-2">
                        <p><strong>What we verify:</strong></p>
                        <ul className="list-disc list-inside ml-2 space-y-1">
                          <li>Chamber of Commerce memberships</li>
                          <li>Industry association affiliations</li>
                          <li>Trade organization memberships</li>
                          <li>Business network participation</li>
                          <li>Leadership roles in business groups</li>
                          <li>Entrepreneur community involvement</li>
                          <li>Business networking activities</li>
                        </ul>
                        
                        <div className="mt-3 p-2 bg-green-100 rounded text-xs">
                          <strong>Note:</strong> Business associations verification helps assess business networking, industry involvement, and entrepreneurial activities. This check is valuable for understanding business connections and market presence.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {selectedSubTab === 'socialAssociations' && (
          <div className="space-y-4">
            {!selectedChecks['association.socialAssociations']?.selected ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Social Associations</h3>
                <p className="text-gray-500 mb-4">Verify membership in social clubs, community organizations, and volunteer groups</p>
                <button
                  onClick={() => toggleCheck('association.socialAssociations')}
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                >
                  Add Social Associations Check - ₦1,000
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Social Associations</h3>
                  <button
                    onClick={() => toggleCheck('association.socialAssociations')}
                    className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-full text-sm font-medium transition-colors"
                  >
                    Remove
                  </button>
                </div>

                {/* Social Association Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Social Association Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={details?.socialAssociationName || ''}
                        onChange={(e) => handleInputChange('details.association.socialAssociationName', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter social association name"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.socialAssociationName || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Association Type</label>
                    {isEditing ? (
                      <select
                        value={details?.socialAssociationType || ''}
                        onChange={(e) => handleInputChange('details.association.socialAssociationType', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select type</option>
                        <option value="social-club">Social Club</option>
                        <option value="community-organization">Community Organization</option>
                        <option value="volunteer-group">Volunteer Group</option>
                        <option value="charity-organization">Charity Organization</option>
                        <option value="religious-group">Religious Group</option>
                        <option value="cultural-society">Cultural Society</option>
                        <option value="sports-club">Sports Club</option>
                        <option value="hobby-group">Hobby Group</option>
                        <option value="other">Other</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.socialAssociationType || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* Membership Information */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Membership Start Date</label>
                    {isEditing ? (
                      <input
                        type="date"
                        value={details?.socialMembershipStartDate || ''}
                        onChange={(e) => handleInputChange('details.association.socialMembershipStartDate', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.socialMembershipStartDate || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Membership Status</label>
                    {isEditing ? (
                      <select
                        value={details?.socialMembershipStatus || ''}
                        onChange={(e) => handleInputChange('details.association.socialMembershipStatus', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="suspended">Suspended</option>
                        <option value="expired">Expired</option>
                        <option value="cancelled">Cancelled</option>
                        <option value="other">Other</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.socialMembershipStatus || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Volunteer Hours (Monthly)</label>
                    {isEditing ? (
                      <input
                        type="number"
                        min="0"
                        value={details?.socialVolunteerHours || ''}
                        onChange={(e) => handleInputChange('details.association.socialVolunteerHours', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter volunteer hours"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.socialVolunteerHours || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* Additional Social Associations */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Additional Social Associations</label>
                  {isEditing ? (
                    <textarea
                      value={details?.additionalSocialAssociations || ''}
                      onChange={(e) => handleInputChange('details.association.additionalSocialAssociations', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      rows={4}
                      placeholder="List any other social clubs, community organizations, volunteer groups, or charitable activities"
                    />
                  ) : (
                    <p className="text-gray-900">{details?.additionalSocialAssociations || 'Not provided'}</p>
                  )}
                </div>

                {/* Document Upload Section */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Social Associations Documentation</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Social Associations Report</label>
                      {!uploadedAssociationDocuments.socialAssociationsReport ? (
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
                          <input
                            type="file"
                            onChange={(e) => handleAssociationDocumentUpload(e, 'socialAssociationsReport')}
                            accept=".pdf,.jpg,.jpeg,.png"
                            className="hidden"
                            id="socialAssociationsReport"
                          />
                          <label htmlFor="socialAssociationsReport" className="cursor-pointer">
                            <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-600">Click to upload social associations report</p>
                            <p className="text-xs text-gray-500 mt-1">PDF, JPEG, PNG (max 10MB)</p>
                          </label>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <FileText className="h-5 w-5 text-green-600" />
                            <span className="text-sm text-green-800">{uploadedAssociationDocuments.socialAssociationsReport.name}</span>
                          </div>
                          <button
                            onClick={() => removeAssociationDocument('socialAssociationsReport')}
                            className="text-red-600 hover:text-red-700 text-sm font-medium"
                          >
                            Remove
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Social Associations Information Section */}
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-orange-900 mb-2">About Social Associations</h4>
                      <div className="text-sm text-orange-800 space-y-2">
                        <p><strong>What we verify:</strong></p>
                        <ul className="list-disc list-inside ml-2 space-y-1">
                          <li>Social club memberships</li>
                          <li>Community organization involvement</li>
                          <li>Volunteer group participation</li>
                          <li>Charity organization affiliations</li>
                          <li>Religious group memberships</li>
                          <li>Cultural society participation</li>
                          <li>Sports and hobby club memberships</li>
                        </ul>
                        
                        <div className="mt-3 p-2 bg-orange-100 rounded text-xs">
                          <strong>Note:</strong> Social associations verification helps assess community involvement, volunteer activities, and social responsibility. This check is valuable for understanding character, community engagement, and social values.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    )
  }

  const renderMedicalContent = () => {
    const details = request.details?.medical
    const subTabs = [
      { key: 'medicalHistory', name: 'Medical History', icon: Clock, price: 2000 },
      { key: 'medicalRecords', name: 'Medical Records', icon: Clock, price: 2500 },
      { key: 'drugTest', name: 'Drug Test', icon: Clock, price: 3000 },
      { key: 'fitnessAssessment', name: 'Fitness Assessment', icon: Clock, price: 1500 }
    ]

    return (
      <div className="space-y-6">
        {/* Sub-tabs */}
        <div className="flex space-x-1 border-b border-gray-200 overflow-x-auto">
          {subTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setSelectedSubTab(tab.key)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap flex-shrink-0 ${
                selectedSubTab === tab.key
                  ? 'border-red-500 text-red-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Content based on selected sub-tab */}
        {selectedSubTab === 'medicalHistory' && (
          <div className="space-y-4">
            {!selectedChecks['medical.medicalHistory']?.selected ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Medical History Check</h3>
                <p className="text-gray-500 mb-4">Review the candidate's medical history and health records</p>
                <button
                  onClick={() => toggleCheck('medical.medicalHistory')}
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                >
                  Add Medical History Check - ₦2,000
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Medical History Check</h3>
                  <button
                    onClick={() => toggleCheck('medical.medicalHistory')}
                    className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-full text-sm font-medium transition-colors"
                  >
                    Remove
                  </button>
                </div>
                {/* Medical History Overview */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Overall Health Status</label>
                    {isEditing ? (
                      <select
                        value={details?.overallHealthStatus || ''}
                        onChange={(e) => handleInputChange('details.medical.overallHealthStatus', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select health status</option>
                        <option value="excellent">Excellent</option>
                        <option value="good">Good</option>
                        <option value="fair">Fair</option>
                        <option value="poor">Poor</option>
                        <option value="unknown">Unknown</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.overallHealthStatus || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Medical Checkup</label>
                    {isEditing ? (
                      <input
                        type="date"
                        value={details?.lastMedicalCheckup || ''}
                        onChange={(e) => handleInputChange('details.medical.lastMedicalCheckup', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.lastMedicalCheckup || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* Medical Conditions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Chronic Medical Conditions</label>
                    {isEditing ? (
                      <textarea
                        value={details?.chronicMedicalConditions || ''}
                        onChange={(e) => handleInputChange('details.medical.chronicMedicalConditions', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        rows={3}
                        placeholder="List any chronic medical conditions"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.chronicMedicalConditions || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Current Medications</label>
                    {isEditing ? (
                      <textarea
                        value={details?.currentMedications || ''}
                        onChange={(e) => handleInputChange('details.medical.currentMedications', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        rows={3}
                        placeholder="List current medications and dosages"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.currentMedications || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* Medical History Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Allergies</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={details?.allergies || ''}
                        onChange={(e) => handleInputChange('details.medical.allergies', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="List known allergies"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.allergies || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Blood Type</label>
                    {isEditing ? (
                      <select
                        value={details?.bloodType || ''}
                        onChange={(e) => handleInputChange('details.medical.bloodType', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select blood type</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                        <option value="unknown">Unknown</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.bloodType || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Disability Status</label>
                    {isEditing ? (
                      <select
                        value={details?.disabilityStatus || ''}
                        onChange={(e) => handleInputChange('details.medical.disabilityStatus', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select status</option>
                        <option value="no-disability">No Disability</option>
                        <option value="temporary-disability">Temporary Disability</option>
                        <option value="permanent-disability">Permanent Disability</option>
                        <option value="prefer-not-to-say">Prefer Not to Say</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.disabilityStatus || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* Medical History Summary */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Medical History Summary</label>
                  {isEditing ? (
                    <textarea
                      value={details?.medicalHistorySummary || ''}
                      onChange={(e) => handleInputChange('details.medical.medicalHistorySummary', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      rows={4}
                      placeholder="Comprehensive summary of medical history, conditions, treatments, and any relevant health information"
                    />
                  ) : (
                    <p className="text-gray-900">{details?.medicalHistorySummary || 'Not provided'}</p>
                  )}
                </div>

                {/* Document Upload Section */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Medical History Documentation</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Medical History Report</label>
                      {!uploadedMedicalDocuments.medicalHistoryReport ? (
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
                          <input
                            type="file"
                            onChange={(e) => handleMedicalDocumentUpload(e, 'medicalHistoryReport')}
                            accept=".pdf,.jpg,.jpeg,.png"
                            className="hidden"
                            id="medicalHistoryReport"
                          />
                          <label htmlFor="medicalHistoryReport" className="cursor-pointer">
                            <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-600">Click to upload medical history report</p>
                            <p className="text-xs text-gray-500 mt-1">PDF, JPEG, PNG (max 10MB)</p>
                          </label>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <FileText className="h-5 w-5 text-green-600" />
                            <span className="text-sm text-green-800">{uploadedMedicalDocuments.medicalHistoryReport.name}</span>
                          </div>
                          <button
                            onClick={() => removeMedicalDocument('medicalHistoryReport')}
                            className="text-red-600 hover:text-red-700 text-sm font-medium"
                          >
                            Remove
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Medical History Information Section */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-green-900 mb-2">About Medical History Verification</h4>
                      <div className="text-sm text-green-800 space-y-2">
                        <p><strong>What we verify:</strong></p>
                        <ul className="list-disc list-inside ml-2 space-y-1">
                          <li>Overall health status and medical history</li>
                          <li>Chronic medical conditions and treatments</li>
                          <li>Current medications and dosages</li>
                          <li>Allergies and adverse reactions</li>
                          <li>Blood type and medical identifiers</li>
                          <li>Disability status and accommodations</li>
                          <li>Medical checkup history and frequency</li>
                        </ul>
                        
                        <div className="mt-3 p-2 bg-green-100 rounded text-xs">
                          <strong>Note:</strong> Medical history verification helps assess health status, medical conditions, and any accommodations needed. This check is valuable for understanding health-related considerations and workplace accommodations.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {selectedSubTab === 'drugTest' && (
          <div className="space-y-4">
            {!selectedChecks['medical.drugTest']?.selected ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Drug Test</h3>
                <p className="text-gray-500 mb-4">Conduct drug screening and substance abuse testing</p>
                <button
                  onClick={() => toggleCheck('medical.drugTest')}
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                >
                  Add Drug Test - ₦3,000
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Drug Test</h3>
                  <button
                    onClick={() => toggleCheck('medical.drugTest')}
                    className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-full text-sm font-medium transition-colors"
                  >
                    Remove
                  </button>
                </div>
                {/* Drug Test Overview */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Test Type</label>
                    {isEditing ? (
                      <select
                        value={details?.drugTestType || ''}
                        onChange={(e) => handleInputChange('details.medical.drugTestType', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select test type</option>
                        <option value="urine">Urine Test</option>
                        <option value="blood">Blood Test</option>
                        <option value="hair">Hair Test</option>
                        <option value="saliva">Saliva Test</option>
                        <option value="breath">Breath Test</option>
                        <option value="comprehensive">Comprehensive Panel</option>
                        <option value="random">Random Test</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.drugTestType || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Test Result</label>
                    {isEditing ? (
                      <select
                        value={details?.drugTestResult || ''}
                        onChange={(e) => handleInputChange('details.medical.drugTestResult', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select result</option>
                        <option value="negative">Negative</option>
                        <option value="positive">Positive</option>
                        <option value="inconclusive">Inconclusive</option>
                        <option value="pending">Pending</option>
                        <option value="refused">Refused</option>
                        <option value="invalid">Invalid</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.drugTestResult || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* Test Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Test Date</label>
                    {isEditing ? (
                      <input
                        type="date"
                        value={details?.drugTestDate || ''}
                        onChange={(e) => handleInputChange('details.medical.drugTestDate', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.drugTestDate || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Testing Facility</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={details?.drugTestingFacility || ''}
                        onChange={(e) => handleInputChange('details.medical.drugTestingFacility', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter testing facility name"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.drugTestingFacility || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Test Panel</label>
                    {isEditing ? (
                      <select
                        value={details?.drugTestPanel || ''}
                        onChange={(e) => handleInputChange('details.medical.drugTestPanel', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select panel</option>
                        <option value="5-panel">5-Panel (Basic)</option>
                        <option value="10-panel">10-Panel (Extended)</option>
                        <option value="12-panel">12-Panel (Comprehensive)</option>
                        <option value="alcohol">Alcohol Only</option>
                        <option value="marijuana">Marijuana Only</option>
                        <option value="opiates">Opiates Only</option>
                        <option value="custom">Custom Panel</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.drugTestPanel || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* Substances Tested */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Substances Tested</label>
                    {isEditing ? (
                      <textarea
                        value={details?.substancesTested || ''}
                        onChange={(e) => handleInputChange('details.medical.substancesTested', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        rows={3}
                        placeholder="List substances tested (e.g., Marijuana, Cocaine, Opiates, Amphetamines, PCP)"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.substancesTested || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Positive Substances (if any)</label>
                    {isEditing ? (
                      <textarea
                        value={details?.positiveSubstances || ''}
                        onChange={(e) => handleInputChange('details.medical.positiveSubstances', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        rows={3}
                        placeholder="List any substances that tested positive"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.positiveSubstances || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* Test Summary */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Drug Test Summary</label>
                  {isEditing ? (
                    <textarea
                      value={details?.drugTestSummary || ''}
                      onChange={(e) => handleInputChange('details.medical.drugTestSummary', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      rows={4}
                      placeholder="Comprehensive summary of drug test results, substances tested, and any additional information"
                    />
                  ) : (
                    <p className="text-gray-900">{details?.drugTestSummary || 'Not provided'}</p>
                  )}
                </div>

                {/* Document Upload Section */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Drug Test Documentation</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Drug Test Report</label>
                      {!uploadedMedicalDocuments.drugTestReport ? (
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
                          <input
                            type="file"
                            onChange={(e) => handleMedicalDocumentUpload(e, 'drugTestReport')}
                            accept=".pdf,.jpg,.jpeg,.png"
                            className="hidden"
                            id="drugTestReport"
                          />
                          <label htmlFor="drugTestReport" className="cursor-pointer">
                            <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-600">Click to upload drug test report</p>
                            <p className="text-xs text-gray-500 mt-1">PDF, JPEG, PNG (max 10MB)</p>
                          </label>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <FileText className="h-5 w-5 text-green-600" />
                            <span className="text-sm text-green-800">{uploadedMedicalDocuments.drugTestReport.name}</span>
                          </div>
                          <button
                            onClick={() => removeMedicalDocument('drugTestReport')}
                            className="text-red-600 hover:text-red-700 text-sm font-medium"
                          >
                            Remove
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Drug Test Information Section */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-yellow-900 mb-2">About Drug Test Verification</h4>
                      <div className="text-sm text-yellow-800 space-y-2">
                        <p><strong>What we verify:</strong></p>
                        <ul className="list-disc list-inside ml-2 space-y-1">
                          <li>Drug test type and methodology</li>
                          <li>Test results and substance detection</li>
                          <li>Testing facility and certification</li>
                          <li>Substances tested and detection levels</li>
                          <li>Test date and validity period</li>
                          <li>Compliance with testing protocols</li>
                          <li>Substance abuse history and patterns</li>
                        </ul>
                        
                        <div className="mt-3 p-2 bg-yellow-100 rounded text-xs">
                          <strong>Note:</strong> Drug test verification helps assess substance abuse history, compliance with workplace policies, and safety considerations. This check is valuable for understanding substance use patterns and workplace safety.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {selectedSubTab === 'fitnessAssessment' && (
          <div className="space-y-4">
            {!selectedChecks['medical.fitnessAssessment']?.selected ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Fitness Assessment</h3>
                <p className="text-gray-500 mb-4">Evaluate physical fitness and capability for specific roles</p>
                <button
                  onClick={() => toggleCheck('medical.fitnessAssessment')}
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                >
                  Add Fitness Assessment - ₦1,500
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Fitness Assessment</h3>
                  <button
                    onClick={() => toggleCheck('medical.fitnessAssessment')}
                    className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-full text-sm font-medium transition-colors"
                  >
                    Remove
                  </button>
                </div>
                {/* Fitness Assessment Overview */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Overall Fitness Level</label>
                    {isEditing ? (
                      <select
                        value={details?.overallFitnessLevel || ''}
                        onChange={(e) => handleInputChange('details.medical.overallFitnessLevel', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select level</option>
                        <option value="excellent">Excellent</option>
                        <option value="good">Good</option>
                        <option value="average">Average</option>
                        <option value="below_average">Below Average</option>
                        <option value="poor">Poor</option>
                        <option value="not_assessed">Not Assessed</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.overallFitnessLevel || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Assessment Date</label>
                    {isEditing ? (
                      <input
                        type="date"
                        value={details?.fitnessAssessmentDate || ''}
                        onChange={(e) => handleInputChange('details.medical.fitnessAssessmentDate', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.fitnessAssessmentDate || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* Physical Measurements */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Height (cm)</label>
                    {isEditing ? (
                      <input
                        type="number"
                        min="100"
                        max="250"
                        value={details?.height || ''}
                        onChange={(e) => handleInputChange('details.medical.height', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter height in cm"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.height || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
                    {isEditing ? (
                      <input
                        type="number"
                        min="30"
                        max="200"
                        value={details?.weight || ''}
                        onChange={(e) => handleInputChange('details.medical.weight', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter weight in kg"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.weight || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">BMI</label>
                    {isEditing ? (
                      <input
                        type="number"
                        min="10"
                        max="50"
                        step="0.1"
                        value={details?.bmi || ''}
                        onChange={(e) => handleInputChange('details.medical.bmi', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter BMI"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.bmi || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* Fitness Test Results */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Cardiovascular Fitness</label>
                    {isEditing ? (
                      <select
                        value={details?.cardiovascularFitness || ''}
                        onChange={(e) => handleInputChange('details.medical.cardiovascularFitness', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select level</option>
                        <option value="excellent">Excellent</option>
                        <option value="good">Good</option>
                        <option value="average">Average</option>
                        <option value="below_average">Below Average</option>
                        <option value="poor">Poor</option>
                        <option value="not_tested">Not Tested</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.cardiovascularFitness || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Muscular Strength</label>
                    {isEditing ? (
                      <select
                        value={details?.muscularStrength || ''}
                        onChange={(e) => handleInputChange('details.medical.muscularStrength', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select level</option>
                        <option value="excellent">Excellent</option>
                        <option value="good">Good</option>
                        <option value="average">Average</option>
                        <option value="below_average">Below Average</option>
                        <option value="poor">Poor</option>
                        <option value="not_tested">Not Tested</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.muscularStrength || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* Physical Capabilities */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Physical Limitations</label>
                    {isEditing ? (
                      <textarea
                        value={details?.physicalLimitations || ''}
                        onChange={(e) => handleInputChange('details.medical.physicalLimitations', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        rows={3}
                        placeholder="List any physical limitations or restrictions"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.physicalLimitations || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Workplace Accommodations</label>
                    {isEditing ? (
                      <textarea
                        value={details?.workplaceAccommodations || ''}
                        onChange={(e) => handleInputChange('details.medical.workplaceAccommodations', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        rows={3}
                        placeholder="List any workplace accommodations needed"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.workplaceAccommodations || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* Fitness Assessment Summary */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fitness Assessment Summary</label>
                  {isEditing ? (
                    <textarea
                      value={details?.fitnessAssessmentSummary || ''}
                      onChange={(e) => handleInputChange('details.medical.fitnessAssessmentSummary', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      rows={4}
                      placeholder="Comprehensive summary of fitness assessment, physical capabilities, and any relevant information"
                    />
                  ) : (
                    <p className="text-gray-900">{details?.fitnessAssessmentSummary || 'Not provided'}</p>
                  )}
                </div>

                {/* Document Upload Section */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Fitness Assessment Documentation</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Fitness Assessment Report</label>
                      {!uploadedMedicalDocuments.fitnessAssessmentReport ? (
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
                          <input
                            type="file"
                            onChange={(e) => handleMedicalDocumentUpload(e, 'fitnessAssessmentReport')}
                            accept=".pdf,.jpg,.jpeg,.png"
                            className="hidden"
                            id="fitnessAssessmentReport"
                          />
                          <label htmlFor="fitnessAssessmentReport" className="cursor-pointer">
                            <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-600">Click to upload fitness assessment report</p>
                            <p className="text-xs text-gray-500 mt-1">PDF, JPEG, PNG (max 10MB)</p>
                          </label>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <FileText className="h-5 w-5 text-green-600" />
                            <span className="text-sm text-green-800">{uploadedMedicalDocuments.fitnessAssessmentReport.name}</span>
                          </div>
                          <button
                            onClick={() => removeMedicalDocument('fitnessAssessmentReport')}
                            className="text-red-600 hover:text-red-700 text-sm font-medium"
                          >
                            Remove
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Fitness Assessment Information Section */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-blue-900 mb-2">About Fitness Assessment Verification</h4>
                      <div className="text-sm text-blue-800 space-y-2">
                        <p><strong>What we verify:</strong></p>
                        <ul className="list-disc list-inside ml-2 space-y-1">
                          <li>Overall physical fitness level</li>
                          <li>Physical measurements and BMI</li>
                          <li>Cardiovascular fitness assessment</li>
                          <li>Muscular strength and endurance</li>
                          <li>Physical limitations and restrictions</li>
                          <li>Workplace accommodation needs</li>
                          <li>Role-specific fitness requirements</li>
                        </ul>
                        
                        <div className="mt-3 p-2 bg-blue-100 rounded text-xs">
                          <strong>Note:</strong> Fitness assessment verification helps evaluate physical capabilities, assess role suitability, and identify any accommodations needed. This check is valuable for understanding physical fitness and workplace readiness.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    )
  }

  const renderEmploymentContent = () => {
    const details = request.details?.employment
    const subTabs = [
      { key: 'employmentHistory', name: 'Employment History', icon: Clock, price: 2500 },
      { key: 'referenceCheck', name: 'Reference Check', icon: Clock, price: 2000 },
      { key: 'backgroundGapAnalysis', name: 'Background Gap Analysis', icon: Clock, price: 1800 }
    ]

    return (
      <div className="space-y-6">
        {/* Sub-tabs */}
        <div className="flex space-x-1 border-b border-gray-200 overflow-x-auto">
          {subTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setSelectedSubTab(tab.key)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap flex-shrink-0 ${
                selectedSubTab === tab.key
                  ? 'border-red-500 text-red-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Content based on selected sub-tab */}
        {selectedSubTab === 'employmentHistory' && (
          <div className="space-y-6">
            {!selectedChecks['employment.employmentHistory']?.selected ? (
              <div className="text-center py-12 bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl border-2 border-dashed border-green-200">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Clock className="h-10 w-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Employment History Verification</h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  Verify multiple employment history entries for comprehensive background checking. Each employment entry is calculated separately.
                </p>
                <div className="flex items-center justify-center space-x-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">₦2,500</div>
                    <div className="text-sm text-gray-500">per employment</div>
                  </div>
                  <div className="text-gray-400">×</div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">1</div>
                    <div className="text-sm text-gray-500">employment</div>
                  </div>
                  <div className="text-gray-400">=</div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">₦2,500</div>
                    <div className="text-sm text-gray-500">total</div>
                  </div>
                </div>
                <button
                  onClick={() => toggleCheck('employment.employmentHistory')}
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-xl transition-colors shadow-lg hover:shadow-xl"
                >
                  Start Employment History Verification
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Header with controls */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <Clock className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">Employment History Verification</h3>
                        <p className="text-sm text-gray-600">
                          {request.details?.employment?.employmentEntries?.length || 1} employment{(request.details?.employment?.employmentEntries?.length || 1) > 1 ? 's' : ''} selected
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-900">
                          ₦{((request.details?.employment?.employmentEntries?.length || 1) * 2500).toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-500">total cost</div>
                      </div>
                      <button
                        onClick={() => toggleCheck('employment.employmentHistory')}
                        className="bg-red-100 text-red-700 hover:bg-red-200 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                      >
                        Remove All
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={addNewEmployment}
                        className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                      >
                        <Plus className="h-4 w-4" />
                        <span>Add Employment</span>
                      </button>
                      <span className="text-sm text-gray-500">
                        Each additional employment costs ₦2,500
                      </span>
                    </div>
                  </div>
                </div>

                {/* Employment Cards */}
                <div className="space-y-4">
                  {request.details?.employment?.employmentEntries?.map((employment, index) => {
                    const isExpanded = expandedEmployments.has(employment.id)
                    return (
                      <div key={employment.id} className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                        {/* Employment Card Header */}
                        <div className="p-4 border-b border-gray-100">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                                <span className="text-sm font-medium text-gray-600">#{index + 1}</span>
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-900">
                                  {employment.companyName || 'Company Name'} - {employment.position || 'Position'}
                                </h4>
                                <p className="text-sm text-gray-500">
                                  {employment.startDate && employment.endDate 
                                    ? `${employment.startDate} to ${employment.endDate}`
                                    : employment.startDate || 'Employment details pending'
                                  }
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="text-right">
                                <div className="text-sm font-medium text-gray-900">₦2,500</div>
                                <div className="text-xs text-gray-500">per employment</div>
                              </div>
                              {(request.details?.employment?.employmentEntries?.length || 0) > 1 && (
                                <button
                                  onClick={() => removeEmployment(employment.id)}
                                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                  title="Remove this employment"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              )}
                              <button
                                onClick={() => toggleEmploymentExpansion(employment.id)}
                                className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                                title={isExpanded ? "Collapse" : "Expand"}
                              >
                                <ChevronDown className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Employment Form Content */}
                        {isExpanded && (
                          <div className="p-6 space-y-4">
                            {/* Company and Position */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                                {isEditing ? (
                                  <input
                                    type="text"
                                    value={employment.companyName || ''}
                                    onChange={(e) => updateEmployment(employment.id, 'companyName', e.target.value)}
                                    placeholder="Company name"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                  />
                                ) : (
                                  <p className="text-gray-900">{employment.companyName || 'Not specified'}</p>
                                )}
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Position/Job Title</label>
                                {isEditing ? (
                                  <input
                                    type="text"
                                    value={employment.position || ''}
                                    onChange={(e) => updateEmployment(employment.id, 'position', e.target.value)}
                                    placeholder="Job title or position"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                  />
                                ) : (
                                  <p className="text-gray-900">{employment.position || 'Not specified'}</p>
                                )}
                              </div>
                            </div>

                            {/* Employment Period */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                                {isEditing ? (
                                  <input
                                    type="date"
                                    value={employment.startDate || ''}
                                    onChange={(e) => updateEmployment(employment.id, 'startDate', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                  />
                                ) : (
                                  <p className="text-gray-900">{employment.startDate || 'Not specified'}</p>
                                )}
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                                {isEditing ? (
                                  <input
                                    type="date"
                                    value={employment.endDate || ''}
                                    onChange={(e) => updateEmployment(employment.id, 'endDate', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                  />
                                ) : (
                                  <p className="text-gray-900">{employment.endDate || 'Not specified'}</p>
                                )}
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Employment Type</label>
                                {isEditing ? (
                                  <select
                                    value={employment.employmentType || ''}
                                    onChange={(e) => updateEmployment(employment.id, 'employmentType', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                  >
                                    <option value="">Select type</option>
                                    <option value="Full-time">Full-time</option>
                                    <option value="Part-time">Part-time</option>
                                    <option value="Contract">Contract</option>
                                    <option value="Freelance">Freelance</option>
                                    <option value="Internship">Internship</option>
                                    <option value="Temporary">Temporary</option>
                                  </select>
                                ) : (
                                  <p className="text-gray-900">{employment.employmentType || 'Not specified'}</p>
                                )}
                              </div>
                            </div>

                            {/* Salary and Responsibilities */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Salary</label>
                                {isEditing ? (
                                  <input
                                    type="text"
                                    value={employment.salary || ''}
                                    onChange={(e) => updateEmployment(employment.id, 'salary', e.target.value)}
                                    placeholder="e.g., ₦500,000 annually"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                  />
                                ) : (
                                  <p className="text-gray-900">{employment.salary || 'Not specified'}</p>
                                )}
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Reason for Leaving</label>
                                {isEditing ? (
                                  <input
                                    type="text"
                                    value={employment.reasonForLeaving || ''}
                                    onChange={(e) => updateEmployment(employment.id, 'reasonForLeaving', e.target.value)}
                                    placeholder="e.g., Career advancement, relocation"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                  />
                                ) : (
                                  <p className="text-gray-900">{employment.reasonForLeaving || 'Not specified'}</p>
                                )}
                              </div>
                            </div>

                            {/* Responsibilities */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Key Responsibilities</label>
                              {isEditing ? (
                                <textarea
                                  rows={3}
                                  value={employment.responsibilities || ''}
                                  onChange={(e) => updateEmployment(employment.id, 'responsibilities', e.target.value)}
                                  placeholder="Describe key responsibilities and achievements"
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                                />
                              ) : (
                                <p className="text-gray-900">{employment.responsibilities || 'Not specified'}</p>
                              )}
                            </div>

                            {/* Supervisor Information */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Supervisor Name</label>
                                {isEditing ? (
                                  <input
                                    type="text"
                                    value={employment.supervisorName || ''}
                                    onChange={(e) => updateEmployment(employment.id, 'supervisorName', e.target.value)}
                                    placeholder="Direct supervisor or manager"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                  />
                                ) : (
                                  <p className="text-gray-900">{employment.supervisorName || 'Not specified'}</p>
                                )}
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Supervisor Contact</label>
                                {isEditing ? (
                                  <input
                                    type="text"
                                    value={employment.supervisorContact || ''}
                                    onChange={(e) => updateEmployment(employment.id, 'supervisorContact', e.target.value)}
                                    placeholder="Email or phone number"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                  />
                                ) : (
                                  <p className="text-gray-900">{employment.supervisorContact || 'Not specified'}</p>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {selectedSubTab === 'referenceCheck' && (
          <div className="space-y-4">
            {!selectedChecks['employment.referenceCheck']?.selected ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Reference Check</h3>
                <p className="text-gray-500 mb-4">Verify employment through professional references</p>
                <button
                  onClick={() => toggleCheck('employment.referenceCheck')}
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                >
                  Add Reference Check - ₦2,000
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Reference Check</h3>
                  <button
                    onClick={() => toggleCheck('employment.referenceCheck')}
                    className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-full text-sm font-medium transition-colors"
                  >
                    Remove
                  </button>
                </div>
                {/* Current Employment */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Current Employer</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={details?.currentEmployer || ''}
                        onChange={(e) => handleInputChange('details.employment.currentEmployer', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter current employer name"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.currentEmployer || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Current Position/Title</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={details?.currentPosition || ''}
                        onChange={(e) => handleInputChange('details.employment.currentPosition', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter current position"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.currentPosition || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* Employment Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Employment Start Date</label>
                    {isEditing ? (
                      <input
                        type="date"
                        value={details?.employmentStartDate || ''}
                        onChange={(e) => handleInputChange('details.employment.employmentStartDate', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.employmentStartDate || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Employment Status</label>
                    {isEditing ? (
                      <select
                        value={details?.employmentStatus || ''}
                        onChange={(e) => handleInputChange('details.employment.employmentStatus', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="terminated">Terminated</option>
                        <option value="resigned">Resigned</option>
                        <option value="retired">Retired</option>
                        <option value="contract">Contract</option>
                        <option value="freelance">Freelance</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.employmentStatus || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Salary Range</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={details?.salaryRange || ''}
                        onChange={(e) => handleInputChange('details.employment.salaryRange', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="e.g., ₦500,000 - ₦800,000"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.salaryRange || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* Previous Employment */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Previous Employment History</label>
                  {isEditing ? (
                    <textarea
                      value={details?.previousEmploymentHistory || ''}
                      onChange={(e) => handleInputChange('details.employment.previousEmploymentHistory', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      rows={4}
                      placeholder="List previous employers, positions, dates, and key responsibilities"
                    />
                  ) : (
                    <p className="text-gray-900">{details?.previousEmploymentHistory || 'Not provided'}</p>
                  )}
                </div>

                {/* Employment Verification Summary */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Employment Verification Summary</label>
                  {isEditing ? (
                    <textarea
                      value={details?.employmentVerificationSummary || ''}
                      onChange={(e) => handleInputChange('details.employment.employmentVerificationSummary', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      rows={4}
                      placeholder="Comprehensive summary of employment verification, including verification status, key findings, and any discrepancies"
                    />
                  ) : (
                    <p className="text-gray-900">{details?.employmentVerificationSummary || 'Not provided'}</p>
                  )}
                </div>

                {/* Employment Documents Upload */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <FileText className="h-5 w-5 text-gray-600" />
                    <h4 className="text-sm font-medium text-gray-900">Employment Verification Documents</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    Upload supporting documents to strengthen your employment verification. Accepted formats: JPEG, PNG, PDF (max 10MB each).
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Employment Letter Upload */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Employment Letter</label>
                      {isEditing ? (
                        <div className="space-y-2">
                          <input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) => handleEmploymentDocumentUpload(e, 'employmentLetter')}
                            className="hidden"
                            id="employmentLetter"
                          />
                          <label
                            htmlFor="employmentLetter"
                            className="flex items-center justify-center w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors"
                          >
                            <Upload className="h-6 w-6 text-gray-400" />
                            <span className="ml-2 text-sm text-gray-600">Upload Employment Letter</span>
                          </label>
                          {uploadedEmploymentDocuments.employmentLetter && (
                            <div className="flex items-center justify-between p-2 bg-green-50 border border-green-200 rounded">
                              <div className="flex items-center space-x-2">
                                <FileText className="h-5 w-5 text-green-600" />
                                <span className="text-sm text-green-800">{uploadedEmploymentDocuments.employmentLetter.name}</span>
                              </div>
                              <button
                                onClick={() => removeEmploymentDocument('employmentLetter')}
                                className="text-red-600 hover:text-red-800"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                          )}
                        </div>
                      ) : (
                        <p className="text-gray-900">{uploadedEmploymentDocuments.employmentLetter?.name || 'No document uploaded'}</p>
                      )}
                    </div>

                    {/* Pay Slip Upload */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Pay Slip</label>
                      {isEditing ? (
                        <div className="space-y-2">
                          <input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) => handleEmploymentDocumentUpload(e, 'paySlip')}
                            className="hidden"
                            id="paySlip"
                          />
                          <label
                            htmlFor="paySlip"
                            className="flex items-center justify-center w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors"
                          >
                            <Upload className="h-6 w-6 text-gray-400" />
                            <span className="ml-2 text-sm text-gray-600">Upload Pay Slip</span>
                          </label>
                          {uploadedEmploymentDocuments.paySlip && (
                            <div className="flex items-center justify-between p-2 bg-green-50 border border-green-200 rounded">
                              <div className="flex items-center space-x-2">
                                <FileText className="h-5 w-5 text-green-600" />
                                <span className="text-sm text-green-800">{uploadedEmploymentDocuments.paySlip.name}</span>
                              </div>
                              <button
                                onClick={() => removeEmploymentDocument('paySlip')}
                                className="text-red-600 hover:text-red-800"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                          )}
                        </div>
                      ) : (
                        <p className="text-gray-900">{uploadedEmploymentDocuments.paySlip?.name || 'No document uploaded'}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Employment History Information Section */}
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-purple-900 mb-2">About Employment History Verification</h4>
                      <div className="text-sm text-purple-800 space-y-2">
                        <p><strong>What we verify:</strong></p>
                        <ul className="list-disc list-inside ml-2 space-y-1">
                          <li>Current and previous employment history</li>
                          <li>Job titles, responsibilities, and duration</li>
                          <li>Employment status and verification</li>
                          <li>Salary and compensation verification</li>
                          <li>Performance and conduct records</li>
                          <li>Employment gaps and explanations</li>
                          <li>Professional references and recommendations</li>
                        </ul>
                        
                        <div className="mt-3 p-2 bg-purple-100 rounded text-xs">
                          <strong>Note:</strong> Employment history verification helps assess work experience, career progression, and professional reliability. This check is valuable for understanding work history and professional background.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {selectedSubTab === 'referenceCheck' && (
          <div className="space-y-4">
            {!selectedChecks['employment.referenceCheck']?.selected ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Reference Check</h3>
                <p className="text-gray-500 mb-4">Contact and verify professional references</p>
                <button
                  onClick={() => toggleCheck('employment.referenceCheck')}
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                >
                  Add Reference Check - ₦2,000
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Reference Check</h3>
                  <button
                    onClick={() => toggleCheck('employment.referenceCheck')}
                    className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-full text-sm font-medium transition-colors"
                  >
                    Remove
                  </button>
                </div>
                {/* Reference Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Reference Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={details?.referenceName || ''}
                        onChange={(e) => handleInputChange('details.employment.referenceName', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter reference name"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.referenceName || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Reference Position</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={details?.referencePosition || ''}
                        onChange={(e) => handleInputChange('details.employment.referencePosition', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter reference position"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.referencePosition || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* Reference Contact Information */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Reference Company</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={details?.referenceCompany || ''}
                        onChange={(e) => handleInputChange('details.employment.referenceCompany', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter reference company"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.referenceCompany || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Reference Phone</label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={details?.referencePhone || ''}
                        onChange={(e) => handleInputChange('details.employment.referencePhone', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter reference phone"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.referencePhone || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Reference Email</label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={details?.referenceEmail || ''}
                        onChange={(e) => handleInputChange('details.employment.referenceEmail', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter reference email"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.referenceEmail || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* Reference Relationship */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Relationship to Candidate</label>
                    {isEditing ? (
                      <select
                        value={details?.referenceRelationship || ''}
                        onChange={(e) => handleInputChange('details.employment.referenceRelationship', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select relationship</option>
                        <option value="direct-supervisor">Direct Supervisor</option>
                        <option value="manager">Manager</option>
                        <option value="colleague">Colleague</option>
                        <option value="client">Client</option>
                        <option value="vendor">Vendor</option>
                        <option value="business-partner">Business Partner</option>
                        <option value="other">Other</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.referenceRelationship || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Reference Status</label>
                    {isEditing ? (
                      <select
                        value={details?.referenceStatus || ''}
                        onChange={(e) => handleInputChange('details.employment.referenceStatus', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select status</option>
                        <option value="contacted">Contacted</option>
                        <option value="responded">Responded</option>
                        <option value="pending">Pending</option>
                        <option value="unavailable">Unavailable</option>
                        <option value="declined">Declined</option>
                        <option value="not-contacted">Not Contacted</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.referenceStatus || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* Reference Feedback */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Reference Feedback</label>
                  {isEditing ? (
                    <textarea
                      value={details?.referenceFeedback || ''}
                      onChange={(e) => handleInputChange('details.employment.referenceFeedback', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      rows={4}
                      placeholder="Enter reference feedback, comments, and recommendations"
                    />
                  ) : (
                    <p className="text-gray-900">{details?.referenceFeedback || 'Not provided'}</p>
                  )}
                </div>

                {/* Reference Documents Upload */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <FileText className="h-5 w-5 text-gray-600" />
                    <h4 className="text-sm font-medium text-gray-900">Reference Verification Documents</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    Upload supporting documents for reference verification. Accepted formats: JPEG, PNG, PDF (max 10MB each).
                  </p>
                  
                  <div className="space-y-4">
                    {/* Reference Letter Upload */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Reference Letter</label>
                      {isEditing ? (
                        <div className="space-y-2">
                          <input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) => handleEmploymentDocumentUpload(e, 'referenceLetter')}
                            className="hidden"
                            id="referenceLetter"
                          />
                          <label
                            htmlFor="referenceLetter"
                            className="flex items-center justify-center w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors"
                          >
                            <Upload className="h-6 w-6 text-gray-400" />
                            <span className="ml-2 text-sm text-gray-600">Upload Reference Letter</span>
                          </label>
                          {uploadedEmploymentDocuments.referenceLetter && (
                            <div className="flex items-center justify-between p-2 bg-green-50 border border-green-200 rounded">
                              <div className="flex items-center space-x-2">
                                <FileText className="h-5 w-5 text-green-600" />
                                <span className="text-sm text-green-800">{uploadedEmploymentDocuments.referenceLetter.name}</span>
                              </div>
                              <button
                                onClick={() => removeEmploymentDocument('referenceLetter')}
                                className="text-red-600 hover:text-red-800"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                          )}
                        </div>
                      ) : (
                        <p className="text-gray-900">{uploadedEmploymentDocuments.referenceLetter?.name || 'No document uploaded'}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Reference Check Information Section */}
                <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-indigo-900 mb-2">About Reference Check Verification</h4>
                      <div className="text-sm text-indigo-800 space-y-2">
                        <p><strong>What we verify:</strong></p>
                        <ul className="list-disc list-inside ml-2 space-y-1">
                          <li>Professional reference contact information</li>
                          <li>Reference relationship and credibility</li>
                          <li>Reference feedback and recommendations</li>
                          <li>Professional performance assessment</li>
                          <li>Work quality and reliability verification</li>
                          <li>Character and integrity assessment</li>
                          <li>Reference response and availability</li>
                        </ul>
                        
                        <div className="mt-3 p-2 bg-indigo-100 rounded text-xs">
                          <strong>Note:</strong> Reference check verification helps assess professional reputation, work quality, and character through third-party validation. This check is valuable for understanding professional standing and work performance.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {selectedSubTab === 'backgroundGapAnalysis' && (
          <div className="space-y-4">
            {!selectedChecks['employment.backgroundGapAnalysis']?.selected ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Background Gap Analysis</h3>
                <p className="text-gray-500 mb-4">Analyze gaps in employment history and background</p>
                <button
                  onClick={() => toggleCheck('employment.backgroundGapAnalysis')}
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                >
                  Add Background Gap Analysis - ₦1,800
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Background Gap Analysis</h3>
                  <button
                    onClick={() => toggleCheck('employment.backgroundGapAnalysis')}
                    className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-full text-sm font-medium transition-colors"
                  >
                    Remove
                  </button>
                </div>
                {/* Gap Analysis Overview */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Gap Period Start</label>
                    {isEditing ? (
                      <input
                        type="date"
                        value={details?.gapPeriodStart || ''}
                        onChange={(e) => handleInputChange('details.employment.gapPeriodStart', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.gapPeriodStart || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Gap Period End</label>
                    {isEditing ? (
                      <input
                        type="date"
                        value={details?.gapPeriodEnd || ''}
                        onChange={(e) => handleInputChange('details.employment.gapPeriodEnd', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.gapPeriodEnd || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* Gap Analysis Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Gap Duration (Months)</label>
                    {isEditing ? (
                      <input
                        type="number"
                        min="0"
                        max="120"
                        value={details?.gapDurationMonths || ''}
                        onChange={(e) => handleInputChange('details.employment.gapDurationMonths', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter gap duration"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.gapDurationMonths || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Gap Type</label>
                    {isEditing ? (
                      <select
                        value={details?.gapType || ''}
                        onChange={(e) => handleInputChange('details.employment.gapType', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select gap type</option>
                        <option value="employment-gap">Employment Gap</option>
                        <option value="education-gap">Education Gap</option>
                        <option value="travel-gap">Travel Gap</option>
                        <option value="personal-gap">Personal Gap</option>
                        <option value="health-gap">Health Gap</option>
                        <option value="family-gap">Family Gap</option>
                        <option value="other-gap">Other Gap</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.gapType || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Gap Status</label>
                    {isEditing ? (
                      <select
                        value={details?.gapStatus || ''}
                        onChange={(e) => handleInputChange('details.employment.gapStatus', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select status</option>
                        <option value="explained">Explained</option>
                        <option value="unexplained">Unexplained</option>
                        <option value="partially-explained">Partially Explained</option>
                        <option value="under-investigation">Under Investigation</option>
                        <option value="resolved">Resolved</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.gapStatus || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* Gap Explanation */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gap Explanation</label>
                  {isEditing ? (
                    <textarea
                      value={details?.gapExplanation || ''}
                      onChange={(e) => handleInputChange('details.employment.gapExplanation', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      rows={4}
                      placeholder="Provide detailed explanation of the gap period, including activities, reasons, and any relevant information"
                    />
                  ) : (
                    <p className="text-gray-900">{details?.gapExplanation || 'Not provided'}</p>
                  )}
                </div>

                {/* Gap Analysis Summary */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gap Analysis Summary</label>
                  {isEditing ? (
                    <textarea
                      value={details?.gapAnalysisSummary || ''}
                      onChange={(e) => handleInputChange('details.employment.gapAnalysisSummary', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      rows={4}
                      placeholder="Comprehensive summary of gap analysis findings, verification status, and any concerns or recommendations"
                    />
                  ) : (
                    <p className="text-gray-900">{details?.gapAnalysisSummary || 'Not provided'}</p>
                  )}
                </div>

                {/* Background Gap Documents Upload */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <FileText className="h-5 w-5 text-gray-600" />
                    <h4 className="text-sm font-medium text-gray-900">Background Gap Analysis Documents</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    Upload supporting documents for gap analysis verification. Accepted formats: JPEG, PNG, PDF (max 10MB each).
                  </p>
                  
                  <div className="space-y-4">
                    {/* Gap Analysis Document Upload */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Gap Analysis Document</label>
                      {isEditing ? (
                        <div className="space-y-2">
                          <input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) => handleEmploymentDocumentUpload(e, 'backgroundGapDocument')}
                            className="hidden"
                            id="backgroundGapDocument"
                          />
                          <label
                            htmlFor="backgroundGapDocument"
                            className="flex items-center justify-center w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors"
                          >
                            <Upload className="h-6 w-6 text-gray-400" />
                            <span className="ml-2 text-sm text-gray-600">Upload Gap Analysis Document</span>
                          </label>
                          {uploadedEmploymentDocuments.backgroundGapDocument && (
                            <div className="flex items-center justify-between p-2 bg-green-50 border border-green-200 rounded">
                              <div className="flex items-center space-x-2">
                                <FileText className="h-5 w-5 text-green-600" />
                                <span className="text-sm text-green-800">{uploadedEmploymentDocuments.backgroundGapDocument.name}</span>
                              </div>
                              <button
                                onClick={() => removeEmploymentDocument('backgroundGapDocument')}
                                className="text-red-600 hover:text-red-800"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                          )}
                        </div>
                      ) : (
                        <p className="text-gray-900">{uploadedEmploymentDocuments.backgroundGapDocument?.name || 'No document uploaded'}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Background Gap Analysis Information Section */}
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-orange-900 mb-2">About Background Gap Analysis</h4>
                      <div className="text-sm text-orange-800 space-y-2">
                        <p><strong>What we analyze:</strong></p>
                        <ul className="list-disc list-inside ml-2 space-y-1">
                          <li>Employment history gaps and periods</li>
                          <li>Gap duration and frequency analysis</li>
                          <li>Gap type classification and categorization</li>
                          <li>Gap explanation verification and validation</li>
                          <li>Background continuity assessment</li>
                          <li>Gap impact on professional profile</li>
                          <li>Recommendations for gap resolution</li>
                        </ul>
                        
                        <div className="mt-3 p-2 bg-orange-100 rounded text-xs">
                          <strong>Note:</strong> Background gap analysis helps identify and assess periods of unaccounted time in professional history. This analysis is valuable for understanding career continuity and identifying potential areas of concern.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    )
  }

  const renderEducationContent = () => {
    const details = request.details?.education
    const subTabs = [
      { key: 'degreeVerification', name: 'Degree Verification', icon: AlertTriangle, price: 2000 },
      { key: 'transcriptVerification', name: 'Transcript Verification', icon: AlertTriangle, price: 2500 },
      { key: 'professionalCertifications', name: 'Professional Certifications', icon: AlertTriangle, price: 1500 }
    ]

    return (
      <div className="space-y-6">
        {/* Sub-tabs */}
        <div className="flex space-x-1 border-b border-gray-200 overflow-x-auto">
          {subTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setSelectedSubTab(tab.key)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap flex-shrink-0 ${
                selectedSubTab === tab.key
                  ? 'border-red-500 text-red-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Content based on selected sub-tab */}
        {selectedSubTab === 'degreeVerification' && (
          <div className="space-y-6">
            {!selectedChecks['education.degreeVerification']?.selected ? (
              <div className="text-center py-12 bg-gradient-to-br from-purple-50 to-indigo-100 rounded-2xl border-2 border-dashed border-purple-200">
                <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <AlertTriangle className="h-10 w-10 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Degree Verification</h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  Verify multiple educational degrees and qualifications for comprehensive background checking. Each degree is calculated separately.
                </p>
                <div className="flex items-center justify-center space-x-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">₦2,000</div>
                    <div className="text-sm text-gray-500">per degree</div>
                  </div>
                  <div className="text-gray-400">×</div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">1</div>
                    <div className="text-sm text-gray-500">degree</div>
                  </div>
                  <div className="text-gray-400">=</div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">₦2,000</div>
                    <div className="text-sm text-gray-500">total</div>
                  </div>
                </div>
                <button
                  onClick={() => toggleCheck('education.degreeVerification')}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-xl transition-colors shadow-lg hover:shadow-xl"
                >
                  Start Degree Verification
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Header with controls */}
                <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <AlertTriangle className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">Degree Verification</h3>
                        <p className="text-sm text-gray-600">
                          {request.details?.education?.degreeEntries?.length || 1} degree{(request.details?.education?.degreeEntries?.length || 1) > 1 ? 's' : ''} selected
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-900">
                          ₦{((request.details?.education?.degreeEntries?.length || 1) * 2000).toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-500">total cost</div>
                      </div>
                      <button
                        onClick={() => toggleCheck('education.degreeVerification')}
                        className="bg-red-100 text-red-700 hover:bg-red-200 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                      >
                        Remove All
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={addNewDegree}
                        className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                      >
                        <Plus className="h-4 w-4" />
                        <span>Add Degree</span>
                      </button>
                      <span className="text-sm text-gray-500">
                        Each additional degree costs ₦2,000
                      </span>
                    </div>
                  </div>
                </div>

                {/* Degree Cards */}
                <div className="space-y-4">
                  {request.details?.education?.degreeEntries?.map((degree, index) => {
                    const isExpanded = expandedDegrees.has(degree.id)
                    return (
                      <div key={degree.id} className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                        {/* Degree Card Header */}
                        <div className="p-4 border-b border-gray-100">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                                <span className="text-sm font-medium text-gray-600">#{index + 1}</span>
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-900">
                                  {degree.fieldOfStudy || 'Field of Study'} - {degree.degreeType || 'Degree Type'}
                                </h4>
                                <p className="text-sm text-gray-500">
                                  {degree.institutionName 
                                    ? `${degree.institutionName} (${degree.graduationYear || 'Year'})`
                                    : 'Degree details pending'
                                  }
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="text-right">
                                <div className="text-sm font-medium text-gray-900">₦2,000</div>
                                <div className="text-xs text-gray-500">per degree</div>
                              </div>
                              {(request.details?.education?.degreeEntries?.length || 0) > 1 && (
                                <button
                                  onClick={() => removeDegree(degree.id)}
                                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                  title="Remove this degree"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              )}
                              <button
                                onClick={() => toggleDegreeExpansion(degree.id)}
                                className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                                title={isExpanded ? "Collapse" : "Expand"}
                              >
                                <ChevronDown className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Degree Form Content */}
                        {isExpanded && (
                          <div className="p-6 space-y-4">
                            {/* Institution and Degree Type */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Institution Name</label>
                                {isEditing ? (
                                  <input
                                    type="text"
                                    value={degree.institutionName || ''}
                                    onChange={(e) => updateDegree(degree.id, 'institutionName', e.target.value)}
                                    placeholder="Institution name"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                  />
                                ) : (
                                  <p className="text-gray-900">{degree.institutionName || 'Not specified'}</p>
                                )}
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Degree Type</label>
                                {isEditing ? (
                                  <select
                                    value={degree.degreeType || ''}
                                    onChange={(e) => updateDegree(degree.id, 'degreeType', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                  >
                                    <option value="">Select degree type</option>
                                    <option value="certificate">Certificate</option>
                                    <option value="diploma">Diploma</option>
                                    <option value="associate">Associate Degree</option>
                                    <option value="bachelor">Bachelor's Degree</option>
                                    <option value="master">Master's Degree</option>
                                    <option value="doctorate">Doctorate</option>
                                    <option value="professional">Professional Degree</option>
                                  </select>
                                ) : (
                                  <p className="text-gray-900">{degree.degreeType || 'Not specified'}</p>
                                )}
                              </div>
                            </div>

                            {/* Field of Study and Graduation */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Field of Study</label>
                                {isEditing ? (
                                  <input
                                    type="text"
                                    value={degree.fieldOfStudy || ''}
                                    onChange={(e) => updateDegree(degree.id, 'fieldOfStudy', e.target.value)}
                                    placeholder="e.g., Computer Science, Business Administration"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                  />
                                ) : (
                                  <p className="text-gray-900">{degree.fieldOfStudy || 'Not specified'}</p>
                                )}
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Graduation Year</label>
                                {isEditing ? (
                                  <input
                                    type="number"
                                    value={degree.graduationYear || ''}
                                    onChange={(e) => updateDegree(degree.id, 'graduationYear', parseInt(e.target.value))}
                                    placeholder="e.g., 2020"
                                    min="1950"
                                    max={new Date().getFullYear() + 10}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                  />
                                ) : (
                                  <p className="text-gray-900">{degree.graduationYear || 'Not specified'}</p>
                                )}
                              </div>
                            </div>

                            {/* GPA and Institution Details */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">GPA/Class of Degree</label>
                                {isEditing ? (
                                  <input
                                    type="text"
                                    value={degree.gpaClassOfDegree || ''}
                                    onChange={(e) => updateDegree(degree.id, 'gpaClassOfDegree', e.target.value)}
                                    placeholder="e.g., 3.7/4.0 or First Class"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                  />
                                ) : (
                                  <p className="text-gray-900">{degree.gpaClassOfDegree || 'Not specified'}</p>
                                )}
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Institution Location</label>
                                {isEditing ? (
                                  <input
                                    type="text"
                                    value={degree.institutionLocation || ''}
                                    onChange={(e) => updateDegree(degree.id, 'institutionLocation', e.target.value)}
                                    placeholder="e.g., Lagos, Nigeria"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                  />
                                ) : (
                                  <p className="text-gray-900">{degree.institutionLocation || 'Not specified'}</p>
                                )}
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Institution Type</label>
                                {isEditing ? (
                                  <select
                                    value={degree.institutionType || ''}
                                    onChange={(e) => updateDegree(degree.id, 'institutionType', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                  >
                                    <option value="">Select type</option>
                                    <option value="university">University</option>
                                    <option value="college">College</option>
                                    <option value="polytechnic">Polytechnic</option>
                                    <option value="technical">Technical Institute</option>
                                    <option value="vocational">Vocational School</option>
                                    <option value="online">Online Institution</option>
                                    <option value="international">International Institution</option>
                                  </select>
                                ) : (
                                  <p className="text-gray-900">{degree.institutionType || 'Not specified'}</p>
                                )}
                              </div>
                            </div>

                            {/* Enrollment Status and Verification */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Currently Enrolled</label>
                                {isEditing ? (
                                  <select
                                    value={degree.currentlyEnrolled ? 'true' : 'false'}
                                    onChange={(e) => updateDegree(degree.id, 'currentlyEnrolled', e.target.value === 'true')}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                  >
                                    <option value="false">No (Graduated)</option>
                                    <option value="true">Yes (Currently Enrolled)</option>
                                  </select>
                                ) : (
                                  <p className="text-gray-900">{degree.currentlyEnrolled ? 'Yes (Currently Enrolled)' : 'No (Graduated)'}</p>
                                )}
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Verification Status</label>
                                {isEditing ? (
                                  <select
                                    value={degree.verificationStatus || ''}
                                    onChange={(e) => updateDegree(degree.id, 'verificationStatus', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                  >
                                    <option value="pending">Pending</option>
                                    <option value="verified">Verified</option>
                                    <option value="rejected">Rejected</option>
                                    <option value="in-progress">In Progress</option>
                                  </select>
                                ) : (
                                  <p className="text-gray-900">{degree.verificationStatus || 'Pending'}</p>
                                )}
                              </div>
                            </div>

                            {/* Additional Details */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Expected Graduation Date</label>
                                {isEditing ? (
                                  <input
                                    type="date"
                                    value={degree.expectedGraduationDate || ''}
                                    onChange={(e) => updateDegree(degree.id, 'expectedGraduationDate', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                  />
                                ) : (
                                  <p className="text-gray-900">{degree.expectedGraduationDate || 'Not specified'}</p>
                                )}
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Degree Level</label>
                                {isEditing ? (
                                  <select
                                    value={degree.degreeLevel || ''}
                                    onChange={(e) => updateDegree(degree.id, 'degreeLevel', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                  >
                                    <option value="">Select level</option>
                                    <option value="undergraduate">Undergraduate</option>
                                    <option value="graduate">Graduate</option>
                                    <option value="postgraduate">Postgraduate</option>
                                    <option value="doctoral">Doctoral</option>
                                    <option value="professional">Professional</option>
                                  </select>
                                ) : (
                                  <p className="text-gray-900">{degree.degreeLevel || 'Not specified'}</p>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {selectedSubTab === 'transcriptVerification' && (
          <div className="space-y-4">
            {!selectedChecks['education.transcriptVerification']?.selected ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Transcript Verification</h3>
                <p className="text-gray-500 mb-4">Verify the candidate's academic transcripts and grades</p>
                <button
                  onClick={() => toggleCheck('education.transcriptVerification')}
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                >
                  Add Transcript Verification - ₦2,500
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Transcript Verification</h3>
                  <button
                    onClick={() => toggleCheck('education.transcriptVerification')}
                    className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-full text-sm font-medium transition-colors"
                  >
                    Remove
                  </button>
                </div>
                {/* Degree Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Institution Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={details?.institutionName || ''}
                        onChange={(e) => handleInputChange('details.education.institutionName', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter institution name"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.institutionName || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Degree Type</label>
                    {isEditing ? (
                      <select
                        value={details?.degreeType || ''}
                        onChange={(e) => handleInputChange('details.education.degreeType', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select degree</option>
                        <option value="bachelor">Bachelor's Degree</option>
                        <option value="master">Master's Degree</option>
                        <option value="phd">PhD/Doctorate</option>
                        <option value="diploma">Diploma</option>
                        <option value="certificate">Certificate</option>
                        <option value="associate">Associate Degree</option>
                        <option value="postgraduate">Postgraduate Diploma</option>
                        <option value="other">Other</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.degreeType || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* Degree Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Field of Study</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={details?.fieldOfStudy || ''}
                        onChange={(e) => handleInputChange('details.education.fieldOfStudy', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter field of study"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.fieldOfStudy || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Graduation Year</label>
                    {isEditing ? (
                      <input
                        type="number"
                        min="1950"
                        max="2030"
                        value={details?.graduationYear || ''}
                        onChange={(e) => handleInputChange('details.education.graduationYear', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter graduation year"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.graduationYear || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">GPA/Class of Degree</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={details?.gpaClassOfDegree || ''}
                        onChange={(e) => handleInputChange('details.education.gpaClassOfDegree', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="e.g., 3.5/4.0 or First Class"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.gpaClassOfDegree || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* Institution Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Institution Location</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={details?.institutionLocation || ''}
                        onChange={(e) => handleInputChange('details.education.institutionLocation', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter institution location"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.institutionLocation || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Institution Type</label>
                    {isEditing ? (
                      <select
                        value={details?.institutionType || ''}
                        onChange={(e) => handleInputChange('details.education.institutionType', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select type</option>
                        <option value="university">University</option>
                        <option value="college">College</option>
                        <option value="polytechnic">Polytechnic</option>
                        <option value="institute">Institute</option>
                        <option value="academy">Academy</option>
                        <option value="school">School</option>
                        <option value="other">Other</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.institutionType || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* Degree Verification Summary */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Degree Verification Summary</label>
                  {isEditing ? (
                    <textarea
                      value={details?.degreeVerificationSummary || ''}
                      onChange={(e) => handleInputChange('details.education.degreeVerificationSummary', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      rows={4}
                      placeholder="Comprehensive summary of degree verification, including verification status, key findings, and any discrepancies"
                    />
                  ) : (
                    <p className="text-gray-900">{details?.degreeVerificationSummary || 'Not provided'}</p>
                  )}
                </div>

                {/* Degree Documents Upload */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <FileText className="h-5 w-5 text-gray-600" />
                    <h4 className="text-sm font-medium text-gray-900">Degree Verification Documents</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    Upload supporting documents for degree verification. Accepted formats: JPEG, PNG, PDF (max 10MB each).
                  </p>
                  
                  <div className="space-y-4">
                    {/* Degree Certificate Upload */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Degree Certificate</label>
                      {isEditing ? (
                        <div className="space-y-2">
                          <input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) => handleEducationDocumentUpload(e, 'degreeCertificate')}
                            className="hidden"
                            id="degreeCertificate"
                          />
                          <label
                            htmlFor="degreeCertificate"
                            className="flex items-center justify-center w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors"
                          >
                            <Upload className="h-6 w-6 text-gray-400" />
                            <span className="ml-2 text-sm text-gray-600">Upload Degree Certificate</span>
                          </label>
                          {uploadedEducationDocuments.degreeCertificate && (
                            <div className="flex items-center justify-between p-2 bg-green-50 border border-green-200 rounded">
                              <div className="flex items-center space-x-2">
                                <FileText className="h-5 w-5 text-green-600" />
                                <span className="text-sm text-green-800">{uploadedEducationDocuments.degreeCertificate.name}</span>
                              </div>
                              <button
                                onClick={() => removeEducationDocument('degreeCertificate')}
                                className="text-red-600 hover:text-red-800"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                          )}
                        </div>
                      ) : (
                        <p className="text-gray-900">{uploadedEducationDocuments.degreeCertificate?.name || 'No document uploaded'}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Degree Verification Information Section */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-blue-900 mb-2">About Degree Verification</h4>
                      <div className="text-sm text-blue-800 space-y-2">
                        <p><strong>What we verify:</strong></p>
                        <ul className="list-disc list-inside ml-2 space-y-1">
                          <li>Institution name and accreditation status</li>
                          <li>Degree type and field of study</li>
                          <li>Graduation date and academic performance</li>
                          <li>Institution location and type</li>
                          <li>Degree authenticity and validity</li>
                          <li>Academic records and transcripts</li>
                          <li>Institution recognition and reputation</li>
                        </ul>
                        
                        <div className="mt-3 p-2 bg-blue-100 rounded text-xs">
                          <strong>Note:</strong> Degree verification helps assess educational qualifications, academic achievements, and institutional credibility. This check is valuable for understanding educational background and academic competence.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {selectedSubTab === 'transcriptVerification' && (
          <div className="space-y-4">
            {!selectedChecks['education.transcriptVerification']?.selected ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Transcript Verification</h3>
                <p className="text-gray-500 mb-4">Verify academic transcripts and grade records</p>
                <button
                  onClick={() => toggleCheck('education.transcriptVerification')}
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                >
                  Add Transcript Verification - ₦2,500
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Transcript Verification</h3>
                  <button
                    onClick={() => toggleCheck('education.transcriptVerification')}
                    className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-full text-sm font-medium transition-colors"
                  >
                    Remove
                  </button>
                </div>
                {/* Transcript Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">GPA/CGPA</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={details?.transcriptGpa || ''}
                        onChange={(e) => handleInputChange('details.education.transcriptGpa', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter GPA/CGPA"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.transcriptGpa || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Grading Scale</label>
                    {isEditing ? (
                      <select
                        value={details?.gradingScale || ''}
                        onChange={(e) => handleInputChange('details.education.gradingScale', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select scale</option>
                        <option value="4.0">4.0 Scale</option>
                        <option value="5.0">5.0 Scale</option>
                        <option value="100">100 Point Scale</option>
                        <option value="percentage">Percentage</option>
                        <option value="letter">Letter Grade</option>
                        <option value="other">Other</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.gradingScale || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* Academic Performance */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Class of Degree</label>
                    {isEditing ? (
                      <select
                        value={details?.classOfDegree || ''}
                        onChange={(e) => handleInputChange('details.education.classOfDegree', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select class</option>
                        <option value="first-class">First Class</option>
                        <option value="second-class-upper">Second Class Upper</option>
                        <option value="second-class-lower">Second Class Lower</option>
                        <option value="third-class">Third Class</option>
                        <option value="pass">Pass</option>
                        <option value="distinction">Distinction</option>
                        <option value="merit">Merit</option>
                        <option value="credit">Credit</option>
                        <option value="other">Other</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.classOfDegree || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Total Credit Hours</label>
                    {isEditing ? (
                      <input
                        type="number"
                        min="0"
                        max="200"
                        value={details?.totalCreditHours || ''}
                        onChange={(e) => handleInputChange('details.education.totalCreditHours', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter credit hours"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.totalCreditHours || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Transcript Status</label>
                    {isEditing ? (
                      <select
                        value={details?.transcriptStatus || ''}
                        onChange={(e) => handleInputChange('details.education.transcriptStatus', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select status</option>
                        <option value="verified">Verified</option>
                        <option value="pending">Pending</option>
                        <option value="unverified">Unverified</option>
                        <option value="discrepancy">Discrepancy Found</option>
                        <option value="incomplete">Incomplete</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.transcriptStatus || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* Course Information */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Key Courses/Subjects</label>
                  {isEditing ? (
                    <textarea
                      value={details?.keyCourses || ''}
                      onChange={(e) => handleInputChange('details.education.keyCourses', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      rows={3}
                      placeholder="List key courses, subjects, or areas of study"
                    />
                  ) : (
                    <p className="text-gray-900">{details?.keyCourses || 'Not provided'}</p>
                  )}
                </div>

                {/* Transcript Verification Summary */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Transcript Verification Summary</label>
                  {isEditing ? (
                    <textarea
                      value={details?.transcriptVerificationSummary || ''}
                      onChange={(e) => handleInputChange('details.education.transcriptVerificationSummary', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      rows={4}
                      placeholder="Comprehensive summary of transcript verification, including academic performance, key findings, and any discrepancies"
                    />
                  ) : (
                    <p className="text-gray-900">{details?.transcriptVerificationSummary || 'Not provided'}</p>
                  )}
                </div>

                {/* Transcript Documents Upload */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <FileText className="h-5 w-5 text-gray-600" />
                    <h4 className="text-sm font-medium text-gray-900">Transcript Verification Documents</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    Upload supporting documents for transcript verification. Accepted formats: JPEG, PNG, PDF (max 10MB each).
                  </p>
                  
                  <div className="space-y-4">
                    {/* Transcript Upload */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Academic Transcript</label>
                      {isEditing ? (
                        <div className="space-y-2">
                          <input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) => handleEducationDocumentUpload(e, 'transcript')}
                            className="hidden"
                            id="transcript"
                          />
                          <label
                            htmlFor="transcript"
                            className="flex items-center justify-center w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors"
                          >
                            <Upload className="h-6 w-6 text-gray-400" />
                            <span className="ml-2 text-sm text-gray-600">Upload Academic Transcript</span>
                          </label>
                          {uploadedEducationDocuments.transcript && (
                            <div className="flex items-center justify-between p-2 bg-green-50 border border-green-200 rounded">
                              <div className="flex items-center space-x-2">
                                <FileText className="h-5 w-5 text-green-600" />
                                <span className="text-sm text-green-800">{uploadedEducationDocuments.transcript.name}</span>
                              </div>
                              <button
                                onClick={() => removeEducationDocument('transcript')}
                                className="text-red-600 hover:text-red-800"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                          )}
                        </div>
                      ) : (
                        <p className="text-gray-900">{uploadedEducationDocuments.transcript?.name || 'No document uploaded'}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Transcript Verification Information Section */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-green-900 mb-2">About Transcript Verification</h4>
                      <div className="text-sm text-green-800 space-y-2">
                        <p><strong>What we verify:</strong></p>
                        <ul className="list-disc list-inside ml-2 space-y-1">
                          <li>Academic transcript authenticity and validity</li>
                          <li>GPA/CGPA and grading scale verification</li>
                          <li>Class of degree and academic performance</li>
                          <li>Course completion and credit hours</li>
                          <li>Academic standing and progression</li>
                          <li>Transcript consistency and accuracy</li>
                          <li>Institution transcript policies and procedures</li>
                        </ul>
                        
                        <div className="mt-3 p-2 bg-green-100 rounded text-xs">
                          <strong>Note:</strong> Transcript verification helps assess academic performance, course completion, and educational achievements. This check is valuable for understanding academic competence and educational progression.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {selectedSubTab === 'professionalCertifications' && (
          <div className="space-y-4">
            {!selectedChecks['education.professionalCertifications']?.selected ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Professional Certifications</h3>
                <p className="text-gray-500 mb-4">Verify professional certifications and licenses</p>
                <button
                  onClick={() => toggleCheck('education.professionalCertifications')}
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                >
                  Add Professional Certifications - ₦1,500
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Professional Certifications</h3>
                  <button
                    onClick={() => toggleCheck('education.professionalCertifications')}
                    className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-full text-sm font-medium transition-colors"
                  >
                    Remove
                  </button>
                </div>
                {/* Certification Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Certification Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={details?.certificationName || ''}
                        onChange={(e) => handleInputChange('details.education.certificationName', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter certification name"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.certificationName || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Issuing Organization</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={details?.issuingOrganization || ''}
                        onChange={(e) => handleInputChange('details.education.issuingOrganization', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter issuing organization"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.issuingOrganization || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* Certification Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Certification Type</label>
                    {isEditing ? (
                      <select
                        value={details?.certificationType || ''}
                        onChange={(e) => handleInputChange('details.education.certificationType', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select type</option>
                        <option value="professional">Professional Certification</option>
                        <option value="technical">Technical Certification</option>
                        <option value="industry">Industry Certification</option>
                        <option value="software">Software Certification</option>
                        <option value="language">Language Certification</option>
                        <option value="safety">Safety Certification</option>
                        <option value="compliance">Compliance Certification</option>
                        <option value="other">Other</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.certificationType || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Issue Date</label>
                    {isEditing ? (
                      <input
                        type="date"
                        value={details?.certificationIssueDate || ''}
                        onChange={(e) => handleInputChange('details.education.certificationIssueDate', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.certificationIssueDate || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                    {isEditing ? (
                      <input
                        type="date"
                        value={details?.certificationExpiryDate || ''}
                        onChange={(e) => handleInputChange('details.education.certificationExpiryDate', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.certificationExpiryDate || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* Certification Status */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Certification Status</label>
                    {isEditing ? (
                      <select
                        value={details?.certificationStatus || ''}
                        onChange={(e) => handleInputChange('details.education.certificationStatus', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select status</option>
                        <option value="active">Active</option>
                        <option value="expired">Expired</option>
                        <option value="suspended">Suspended</option>
                        <option value="revoked">Revoked</option>
                        <option value="pending">Pending</option>
                        <option value="verified">Verified</option>
                        <option value="unverified">Unverified</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.certificationStatus || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Certification Number</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={details?.certificationNumber || ''}
                        onChange={(e) => handleInputChange('details.education.certificationNumber', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter certification number"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.certificationNumber || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* Certification Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Certification Description</label>
                  {isEditing ? (
                    <textarea
                      value={details?.certificationDescription || ''}
                      onChange={(e) => handleInputChange('details.education.certificationDescription', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      rows={3}
                      placeholder="Describe the certification, its requirements, and relevance"
                    />
                  ) : (
                    <p className="text-gray-900">{details?.certificationDescription || 'Not provided'}</p>
                  )}
                </div>

                {/* Professional Certifications Verification Summary */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Professional Certifications Verification Summary</label>
                  {isEditing ? (
                    <textarea
                      value={details?.professionalCertificationsVerificationSummary || ''}
                      onChange={(e) => handleInputChange('details.education.professionalCertificationsVerificationSummary', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      rows={4}
                      placeholder="Comprehensive summary of professional certifications verification, including status, validity, and any discrepancies"
                    />
                  ) : (
                    <p className="text-gray-900">{details?.professionalCertificationsVerificationSummary || 'Not provided'}</p>
                  )}
                </div>

                {/* Professional Certifications Documents Upload */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <FileText className="h-5 w-5 text-gray-600" />
                    <h4 className="text-sm font-medium text-gray-900">Professional Certifications Documents</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    Upload supporting documents for professional certifications verification. Accepted formats: JPEG, PNG, PDF (max 10MB each).
                  </p>
                  
                  <div className="space-y-4">
                    {/* Professional Certification Upload */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Professional Certification</label>
                      {isEditing ? (
                        <div className="space-y-2">
                          <input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) => handleEducationDocumentUpload(e, 'professionalCertification')}
                            className="hidden"
                            id="professionalCertification"
                          />
                          <label
                            htmlFor="professionalCertification"
                            className="flex items-center justify-center w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors"
                          >
                            <Upload className="h-6 w-6 text-gray-400" />
                            <span className="ml-2 text-sm text-gray-600">Upload Professional Certification</span>
                          </label>
                          {uploadedEducationDocuments.professionalCertification && (
                            <div className="flex items-center justify-between p-2 bg-green-50 border border-green-200 rounded">
                              <div className="flex items-center space-x-2">
                                <FileText className="h-5 w-5 text-green-600" />
                                <span className="text-sm text-green-800">{uploadedEducationDocuments.professionalCertification.name}</span>
                              </div>
                              <button
                                onClick={() => removeEducationDocument('professionalCertification')}
                                className="text-red-600 hover:text-red-800"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                          )}
                        </div>
                      ) : (
                        <p className="text-gray-900">{uploadedEducationDocuments.professionalCertification?.name || 'No document uploaded'}</p>
                      )}
                    </div>

                    {/* Additional Education Documents Upload */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Additional Education Documents</label>
                      {isEditing ? (
                        <div className="space-y-2">
                          <input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) => handleEducationDocumentUpload(e, 'additionalEducationDocuments')}
                            className="hidden"
                            id="additionalEducationDocuments"
                            multiple
                          />
                          <label
                            htmlFor="additionalEducationDocuments"
                            className="flex items-center justify-center w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors"
                          >
                            <Upload className="h-6 w-6 text-gray-400" />
                            <span className="ml-2 text-sm text-gray-600">Upload Additional Documents</span>
                          </label>
                          {uploadedEducationDocuments.additionalEducationDocuments.length > 0 && (
                            <div className="space-y-2">
                              {uploadedEducationDocuments.additionalEducationDocuments.map((file, index) => (
                                <div key={index} className="flex items-center justify-between p-2 bg-green-50 border border-green-200 rounded">
                                  <div className="flex items-center space-x-2">
                                    <FileText className="h-5 w-5 text-green-600" />
                                    <span className="text-sm text-green-800">{file.name}</span>
                                  </div>
                                  <button
                                    onClick={() => removeEducationDocument('additionalEducationDocuments', index)}
                                    className="text-red-600 hover:text-red-800"
                                  >
                                    <X className="h-4 w-4" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ) : (
                        <p className="text-gray-900">{uploadedEducationDocuments.additionalEducationDocuments.length > 0 ? `${uploadedEducationDocuments.additionalEducationDocuments.length} documents uploaded` : 'No documents uploaded'}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Professional Certifications Information Section */}
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-purple-900 mb-2">About Professional Certifications Verification</h4>
                      <div className="text-sm text-purple-800 space-y-2">
                        <p><strong>What we verify:</strong></p>
                        <ul className="list-disc list-inside ml-2 space-y-1">
                          <li>Certification name and issuing organization</li>
                          <li>Certification type and validity period</li>
                          <li>Issue date and expiry date verification</li>
                          <li>Certification status and authenticity</li>
                          <li>Certification number and registration</li>
                          <li>Professional competency and skills</li>
                          <li>Continuing education and renewal requirements</li>
                        </ul>
                        
                        <div className="mt-3 p-2 bg-purple-100 rounded text-xs">
                          <strong>Note:</strong> Professional certifications verification helps assess specialized skills, professional competency, and industry qualifications. This check is valuable for understanding professional expertise and specialized knowledge.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Certification Number</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={details?.graduationDate || ''}
                        onChange={(e) => handleInputChange('details.education.graduationDate', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter certification number"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.graduationDate || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                    {isEditing ? (
                      <input
                        type="date"
                        value={details?.verificationStatus || ''}
                        onChange={(e) => handleInputChange('details.education.verificationStatus', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.verificationStatus || 'Not provided'}</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    )
  }

  const renderSocialMediaContent = () => {
    const details = request.details?.socialMedia
    const subTabs = [
      { key: 'newsArticles', name: 'News Articles', icon: CheckCircle, price: 1000 },
      { key: 'onlineContent', name: 'Online Content', icon: CheckCircle, price: 1500 },
      { key: 'thoughtLeadership', name: 'Thought Leadership', icon: CheckCircle, price: 2000 },
      { key: 'socialMediaProfiles', name: 'Social Media Profiles', icon: CheckCircle, price: 1200 },
      { key: 'reputationScore', name: 'Reputation Score', icon: CheckCircle, price: 1800 }
    ]

    return (
      <div className="space-y-6">
        {/* Sub-tabs */}
        <div className="flex space-x-1 border-b border-gray-200 overflow-x-auto">
          {subTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setSelectedSubTab(tab.key)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap flex-shrink-0 ${
                selectedSubTab === tab.key
                  ? 'border-red-500 text-red-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Content based on selected sub-tab */}
        {selectedSubTab === 'newsArticles' && (
          <div className="space-y-4">
            {!selectedChecks['socialMedia.newsArticles']?.selected ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">News Articles & Public Mentions</h3>
                <p className="text-gray-500 mb-4">Search for news articles and public mentions (positive or negative)</p>
                <button
                  onClick={() => toggleCheck('socialMedia.newsArticles')}
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                >
                  Add News Articles Check - ₦1,000
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">News Articles & Public Mentions</h3>
                  <button
                    onClick={() => toggleCheck('socialMedia.newsArticles')}
                    className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-full text-sm font-medium transition-colors"
                  >
                    Remove
                  </button>
                </div>
                {/* News Articles Search Parameters */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Search Keywords</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={details?.searchKeywords || ''}
                        onChange={(e) => handleInputChange('details.socialMedia.searchKeywords', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter search keywords"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.searchKeywords || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Search Period</label>
                    {isEditing ? (
                      <select
                        value={details?.searchPeriod || ''}
                        onChange={(e) => handleInputChange('details.socialMedia.searchPeriod', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select period</option>
                        <option value="1_year">Last 1 Year</option>
                        <option value="2_years">Last 2 Years</option>
                        <option value="5_years">Last 5 Years</option>
                        <option value="all_time">All Time</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.searchPeriod || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* News Articles Results */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Total Articles Found</label>
                    {isEditing ? (
                      <input
                        type="number"
                        min="0"
                        value={details?.totalArticlesFound || ''}
                        onChange={(e) => handleInputChange('details.socialMedia.totalArticlesFound', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter number of articles"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.totalArticlesFound || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Positive Mentions</label>
                    {isEditing ? (
                      <input
                        type="number"
                        min="0"
                        value={details?.positiveMentions || ''}
                        onChange={(e) => handleInputChange('details.socialMedia.positiveMentions', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter positive mentions"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.positiveMentions || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Negative Mentions</label>
                    {isEditing ? (
                      <input
                        type="number"
                        min="0"
                        value={details?.negativeMentions || ''}
                        onChange={(e) => handleInputChange('details.socialMedia.negativeMentions', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter negative mentions"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.negativeMentions || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* News Articles Analysis */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">News Articles Analysis</label>
                  {isEditing ? (
                    <textarea
                      value={details?.newsArticlesAnalysis || ''}
                      onChange={(e) => handleInputChange('details.socialMedia.newsArticlesAnalysis', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      rows={4}
                      placeholder="Detailed analysis of news articles and public mentions found"
                    />
                  ) : (
                    <p className="text-gray-900">{details?.newsArticlesAnalysis || 'Not provided'}</p>
                  )}
                </div>

                {/* News Articles Summary */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">News Articles Summary</label>
                  {isEditing ? (
                    <textarea
                      value={details?.newsArticlesSummary || ''}
                      onChange={(e) => handleInputChange('details.socialMedia.newsArticlesSummary', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      rows={4}
                      placeholder="Comprehensive summary of news articles findings, sentiment analysis, and public perception"
                    />
                  ) : (
                    <p className="text-gray-900">{details?.newsArticlesSummary || 'Not provided'}</p>
                  )}
                </div>

                {/* News Articles Documents Upload */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <FileText className="h-5 w-5 text-gray-600" />
                    <h4 className="text-sm font-medium text-gray-900">News Articles Documents</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    Upload supporting documents for news articles verification. Accepted formats: JPEG, PNG, PDF (max 10MB each).
                  </p>
                  
                  <div className="space-y-4">
                    {/* News Articles Report Upload */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">News Articles Report</label>
                      {isEditing ? (
                        <div className="space-y-2">
                          <input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) => handleSocialMediaDocumentUpload(e, 'newsArticlesReport')}
                            className="hidden"
                            id="newsArticlesReport"
                          />
                          <label
                            htmlFor="newsArticlesReport"
                            className="flex items-center justify-center w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors"
                          >
                            <Upload className="h-6 w-6 text-gray-400" />
                            <span className="ml-2 text-sm text-gray-600">Upload News Articles Report</span>
                          </label>
                          {uploadedSocialMediaDocuments.newsArticlesReport && (
                            <div className="flex items-center justify-between p-2 bg-green-50 border border-green-200 rounded">
                              <div className="flex items-center space-x-2">
                                <FileText className="h-5 w-5 text-green-600" />
                                <span className="text-sm text-green-800">{uploadedSocialMediaDocuments.newsArticlesReport.name}</span>
                              </div>
                              <button
                                onClick={() => removeSocialMediaDocument('newsArticlesReport')}
                                className="text-red-600 hover:text-red-800"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                          )}
                        </div>
                      ) : (
                        <p className="text-gray-900">{uploadedSocialMediaDocuments.newsArticlesReport?.name || 'No document uploaded'}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* News Articles Information Section */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-blue-900 mb-2">About News Articles & Public Mentions</h4>
                      <div className="text-sm text-blue-800 space-y-2">
                        <p><strong>What we search:</strong></p>
                        <ul className="list-disc list-inside ml-2 space-y-1">
                          <li>News articles and press releases</li>
                          <li>Public mentions in media outlets</li>
                          <li>Industry publications and blogs</li>
                          <li>Press coverage and interviews</li>
                          <li>Public statements and announcements</li>
                          <li>Media appearances and features</li>
                          <li>Public relations and marketing content</li>
                        </ul>
                        
                        <div className="mt-3 p-2 bg-blue-100 rounded text-xs">
                          <strong>Note:</strong> News articles and public mentions help assess public perception, media presence, and professional reputation. This check is valuable for understanding public image and media coverage.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {selectedSubTab === 'onlineContent' && (
          <div className="space-y-4">
            {!selectedChecks['socialMedia.onlineContent']?.selected ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Online Content & Reputation Analysis</h3>
                <p className="text-gray-500 mb-4">Analyze online content and digital reputation</p>
                <button
                  onClick={() => toggleCheck('socialMedia.onlineContent')}
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                >
                  Add Online Content Check - ₦1,500
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Online Content & Reputation Analysis</h3>
                  <button
                    onClick={() => toggleCheck('socialMedia.onlineContent')}
                    className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-full text-sm font-medium transition-colors"
                  >
                    Remove
                  </button>
                </div>
                {/* Online Content Analysis Parameters */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Content Type</label>
                    {isEditing ? (
                      <select
                        value={details?.contentType || ''}
                        onChange={(e) => handleInputChange('details.socialMedia.contentType', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select type</option>
                        <option value="blog_posts">Blog Posts</option>
                        <option value="forum_posts">Forum Posts</option>
                        <option value="comments">Comments</option>
                        <option value="reviews">Reviews</option>
                        <option value="articles">Articles</option>
                        <option value="videos">Videos</option>
                        <option value="podcasts">Podcasts</option>
                        <option value="other">Other</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.contentType || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Content Sentiment</label>
                    {isEditing ? (
                      <select
                        value={details?.contentSentiment || ''}
                        onChange={(e) => handleInputChange('details.socialMedia.contentSentiment', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select sentiment</option>
                        <option value="positive">Positive</option>
                        <option value="negative">Negative</option>
                        <option value="neutral">Neutral</option>
                        <option value="mixed">Mixed</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.contentSentiment || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* Online Content Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Total Content Found</label>
                    {isEditing ? (
                      <input
                        type="number"
                        min="0"
                        value={details?.totalContentFound || ''}
                        onChange={(e) => handleInputChange('details.socialMedia.totalContentFound', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter total content count"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.totalContentFound || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Engagement Score</label>
                    {isEditing ? (
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={details?.engagementScore || ''}
                        onChange={(e) => handleInputChange('details.socialMedia.engagementScore', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter engagement score (0-100)"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.engagementScore || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Content Quality Score</label>
                    {isEditing ? (
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={details?.contentQualityScore || ''}
                        onChange={(e) => handleInputChange('details.socialMedia.contentQualityScore', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter quality score (0-100)"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.contentQualityScore || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* Online Content Analysis */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Online Content Analysis</label>
                  {isEditing ? (
                    <textarea
                      value={details?.onlineContentAnalysis || ''}
                      onChange={(e) => handleInputChange('details.socialMedia.onlineContentAnalysis', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      rows={4}
                      placeholder="Detailed analysis of online content, engagement patterns, and reputation indicators"
                    />
                  ) : (
                    <p className="text-gray-900">{details?.onlineContentAnalysis || 'Not provided'}</p>
                  )}
                </div>

                {/* Online Content Summary */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Online Content Summary</label>
                  {isEditing ? (
                    <textarea
                      value={details?.onlineContentSummary || ''}
                      onChange={(e) => handleInputChange('details.socialMedia.onlineContentSummary', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      rows={4}
                      placeholder="Comprehensive summary of online content analysis, reputation assessment, and digital presence evaluation"
                    />
                  ) : (
                    <p className="text-gray-900">{details?.onlineContentSummary || 'Not provided'}</p>
                  )}
                </div>

                {/* Online Content Documents Upload */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <FileText className="h-5 w-5 text-gray-600" />
                    <h4 className="text-sm font-medium text-gray-900">Online Content Documents</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    Upload supporting documents for online content verification. Accepted formats: JPEG, PNG, PDF (max 10MB each).
                  </p>
                  
                  <div className="space-y-4">
                    {/* Online Content Report Upload */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Online Content Report</label>
                      {isEditing ? (
                        <div className="space-y-2">
                          <input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) => handleSocialMediaDocumentUpload(e, 'onlineContentReport')}
                            className="hidden"
                            id="onlineContentReport"
                          />
                          <label
                            htmlFor="onlineContentReport"
                            className="flex items-center justify-center w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors"
                          >
                            <Upload className="h-6 w-6 text-gray-400" />
                            <span className="ml-2 text-sm text-gray-600">Upload Online Content Report</span>
                          </label>
                          {uploadedSocialMediaDocuments.onlineContentReport && (
                            <div className="flex items-center justify-between p-2 bg-green-50 border border-green-200 rounded">
                              <div className="flex items-center space-x-2">
                                <FileText className="h-5 w-5 text-green-600" />
                                <span className="text-sm text-green-800">{uploadedSocialMediaDocuments.onlineContentReport.name}</span>
                              </div>
                              <button
                                onClick={() => removeSocialMediaDocument('onlineContentReport')}
                                className="text-red-600 hover:text-red-800"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                          )}
                        </div>
                      ) : (
                        <p className="text-gray-900">{uploadedSocialMediaDocuments.onlineContentReport?.name || 'No document uploaded'}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Online Content Information Section */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-green-900 mb-2">About Online Content & Reputation Analysis</h4>
                      <div className="text-sm text-green-800 space-y-2">
                        <p><strong>What we analyze:</strong></p>
                        <ul className="list-disc list-inside ml-2 space-y-1">
                          <li>Blog posts and articles</li>
                          <li>Forum posts and comments</li>
                          <li>Online reviews and ratings</li>
                          <li>Social media content and engagement</li>
                          <li>Video content and podcasts</li>
                          <li>Content quality and engagement metrics</li>
                          <li>Digital reputation and online presence</li>
                        </ul>
                        
                        <div className="mt-3 p-2 bg-green-100 rounded text-xs">
                          <strong>Note:</strong> Online content and reputation analysis helps assess digital presence, content quality, and online reputation. This check is valuable for understanding digital footprint and online influence.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {selectedSubTab === 'socialMediaProfiles' && (
          <div className="space-y-4">
            {!selectedChecks['socialMedia.socialMediaProfiles']?.selected ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Social Media Profiles</h3>
                <p className="text-gray-500 mb-4">Check social media profiles and activity</p>
                <button
                  onClick={() => toggleCheck('socialMedia.socialMediaProfiles')}
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                >
                  Add Social Media Profiles Check - ₦1,200
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Social Media Profiles</h3>
                  <button
                    onClick={() => toggleCheck('socialMedia.socialMediaProfiles')}
                    className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-full text-sm font-medium transition-colors"
                  >
                    Remove
                  </button>
                </div>
                {/* Social Media Platform Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Primary Platform</label>
                    {isEditing ? (
                      <select
                        value={details?.primaryPlatform || ''}
                        onChange={(e) => handleInputChange('details.socialMedia.primaryPlatform', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select platform</option>
                        <option value="facebook">Facebook</option>
                        <option value="twitter">Twitter/X</option>
                        <option value="linkedin">LinkedIn</option>
                        <option value="instagram">Instagram</option>
                        <option value="youtube">YouTube</option>
                        <option value="tiktok">TikTok</option>
                        <option value="snapchat">Snapchat</option>
                        <option value="pinterest">Pinterest</option>
                        <option value="other">Other</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.primaryPlatform || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Profile Status</label>
                    {isEditing ? (
                      <select
                        value={details?.profileStatus || ''}
                        onChange={(e) => handleInputChange('details.socialMedia.profileStatus', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="private">Private</option>
                        <option value="deleted">Deleted</option>
                        <option value="not_found">Not Found</option>
                        <option value="suspended">Suspended</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.profileStatus || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* Social Media Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Followers/Connections</label>
                    {isEditing ? (
                      <input
                        type="number"
                        min="0"
                        value={details?.followersCount || ''}
                        onChange={(e) => handleInputChange('details.socialMedia.followersCount', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter followers count"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.followersCount || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Posts/Content Count</label>
                    {isEditing ? (
                      <input
                        type="number"
                        min="0"
                        value={details?.postsCount || ''}
                        onChange={(e) => handleInputChange('details.socialMedia.postsCount', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter posts count"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.postsCount || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Engagement Rate</label>
                    {isEditing ? (
                      <input
                        type="number"
                        min="0"
                        max="100"
                        step="0.1"
                        value={details?.engagementRate || ''}
                        onChange={(e) => handleInputChange('details.socialMedia.engagementRate', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter engagement rate (%)"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.engagementRate || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* Social Media Analysis */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Social Media Analysis</label>
                  {isEditing ? (
                    <textarea
                      value={details?.socialMediaAnalysis || ''}
                      onChange={(e) => handleInputChange('details.socialMedia.socialMediaAnalysis', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      rows={4}
                      placeholder="Detailed analysis of social media profiles, activity patterns, and engagement metrics"
                    />
                  ) : (
                    <p className="text-gray-900">{details?.socialMediaAnalysis || 'Not provided'}</p>
                  )}
                </div>

                {/* Social Media Summary */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Social Media Summary</label>
                  {isEditing ? (
                    <textarea
                      value={details?.socialMediaSummary || ''}
                      onChange={(e) => handleInputChange('details.socialMedia.socialMediaSummary', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      rows={4}
                      placeholder="Comprehensive summary of social media presence, activity, and reputation assessment"
                    />
                  ) : (
                    <p className="text-gray-900">{details?.socialMediaSummary || 'Not provided'}</p>
                  )}
                </div>

                {/* Social Media Documents Upload */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <FileText className="h-5 w-5 text-gray-600" />
                    <h4 className="text-sm font-medium text-gray-900">Social Media Documents</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    Upload supporting documents for social media verification. Accepted formats: JPEG, PNG, PDF (max 10MB each).
                  </p>
                  
                  <div className="space-y-4">
                    {/* Social Media Profiles Report Upload */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Social Media Profiles Report</label>
                      {isEditing ? (
                        <div className="space-y-2">
                          <input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) => handleSocialMediaDocumentUpload(e, 'socialMediaProfilesReport')}
                            className="hidden"
                            id="socialMediaProfilesReport"
                          />
                          <label
                            htmlFor="socialMediaProfilesReport"
                            className="flex items-center justify-center w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors"
                          >
                            <Upload className="h-6 w-6 text-gray-400" />
                            <span className="ml-2 text-sm text-gray-600">Upload Social Media Profiles Report</span>
                          </label>
                          {uploadedSocialMediaDocuments.socialMediaProfilesReport && (
                            <div className="flex items-center justify-between p-2 bg-green-50 border border-green-200 rounded">
                              <div className="flex items-center space-x-2">
                                <FileText className="h-5 w-5 text-green-600" />
                                <span className="text-sm text-green-800">{uploadedSocialMediaDocuments.socialMediaProfilesReport.name}</span>
                              </div>
                              <button
                                onClick={() => removeSocialMediaDocument('socialMediaProfilesReport')}
                                className="text-red-600 hover:text-red-800"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                          )}
                        </div>
                      ) : (
                        <p className="text-gray-900">{uploadedSocialMediaDocuments.socialMediaProfilesReport?.name || 'No document uploaded'}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Social Media Information Section */}
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-purple-900 mb-2">About Social Media Profiles</h4>
                      <div className="text-sm text-purple-800 space-y-2">
                        <p><strong>What we check:</strong></p>
                        <ul className="list-disc list-inside ml-2 space-y-1">
                          <li>Social media platform presence and activity</li>
                          <li>Profile completeness and professionalism</li>
                          <li>Follower count and engagement metrics</li>
                          <li>Content quality and posting frequency</li>
                          <li>Social media reputation and influence</li>
                          <li>Professional networking and connections</li>
                          <li>Social media behavior and conduct</li>
                        </ul>
                        
                        <div className="mt-3 p-2 bg-purple-100 rounded text-xs">
                          <strong>Note:</strong> Social media profiles help assess digital presence, professional networking, and online reputation. This check is valuable for understanding social media influence and professional image.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {selectedSubTab === 'reputationScore' && (
          <div className="space-y-4">
            {!selectedChecks['socialMedia.reputationScore']?.selected ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Reputation Score</h3>
                <p className="text-gray-500 mb-4">Calculate overall digital reputation score</p>
                <button
                  onClick={() => toggleCheck('socialMedia.reputationScore')}
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                >
                  Add Reputation Score - ₦1,800
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Reputation Score</h3>
                  <button
                    onClick={() => toggleCheck('socialMedia.reputationScore')}
                    className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-full text-sm font-medium transition-colors"
                  >
                    Remove
                  </button>
                </div>
                {/* Reputation Score Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Overall Reputation Score</label>
                    {isEditing ? (
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={details?.overallReputationScore || ''}
                        onChange={(e) => handleInputChange('details.socialMedia.overallReputationScore', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter score (0-100)"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.overallReputationScore || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Score Category</label>
                    {isEditing ? (
                      <select
                        value={details?.scoreCategory || ''}
                        onChange={(e) => handleInputChange('details.socialMedia.scoreCategory', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select category</option>
                        <option value="excellent">Excellent (90-100)</option>
                        <option value="good">Good (70-89)</option>
                        <option value="average">Average (50-69)</option>
                        <option value="poor">Poor (30-49)</option>
                        <option value="very_poor">Very Poor (0-29)</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.scoreCategory || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* Reputation Score Breakdown */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Professional Reputation Score</label>
                    {isEditing ? (
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={details?.professionalReputationScore || ''}
                        onChange={(e) => handleInputChange('details.socialMedia.professionalReputationScore', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter professional score (0-100)"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.professionalReputationScore || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Social Media Reputation Score</label>
                    {isEditing ? (
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={details?.socialMediaReputationScore || ''}
                        onChange={(e) => handleInputChange('details.socialMedia.socialMediaReputationScore', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter social media score (0-100)"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.socialMediaReputationScore || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Online Presence Score</label>
                    {isEditing ? (
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={details?.onlinePresenceScore || ''}
                        onChange={(e) => handleInputChange('details.socialMedia.onlinePresenceScore', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter online presence score (0-100)"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.onlinePresenceScore || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* Reputation Score Analysis */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Reputation Score Analysis</label>
                  {isEditing ? (
                    <textarea
                      value={details?.reputationScoreAnalysis || ''}
                      onChange={(e) => handleInputChange('details.socialMedia.reputationScoreAnalysis', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      rows={4}
                      placeholder="Detailed analysis of reputation score calculation, factors considered, and score breakdown"
                    />
                  ) : (
                    <p className="text-gray-900">{details?.reputationScoreAnalysis || 'Not provided'}</p>
                  )}
                </div>

                {/* Reputation Score Summary */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Reputation Score Summary</label>
                  {isEditing ? (
                    <textarea
                      value={details?.reputationScoreSummary || ''}
                      onChange={(e) => handleInputChange('details.socialMedia.reputationScoreSummary', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      rows={4}
                      placeholder="Comprehensive summary of reputation score assessment, recommendations, and overall digital reputation evaluation"
                    />
                  ) : (
                    <p className="text-gray-900">{details?.reputationScoreSummary || 'Not provided'}</p>
                  )}
                </div>

                {/* Reputation Score Documents Upload */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <FileText className="h-5 w-5 text-gray-600" />
                    <h4 className="text-sm font-medium text-gray-900">Reputation Score Documents</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    Upload supporting documents for reputation score verification. Accepted formats: JPEG, PNG, PDF (max 10MB each).
                  </p>
                  
                  <div className="space-y-4">
                    {/* Reputation Score Report Upload */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Reputation Score Report</label>
                      {isEditing ? (
                        <div className="space-y-2">
                          <input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) => handleSocialMediaDocumentUpload(e, 'reputationScoreReport')}
                            className="hidden"
                            id="reputationScoreReport"
                          />
                          <label
                            htmlFor="reputationScoreReport"
                            className="flex items-center justify-center w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors"
                          >
                            <Upload className="h-6 w-6 text-gray-400" />
                            <span className="ml-2 text-sm text-gray-600">Upload Reputation Score Report</span>
                          </label>
                          {uploadedSocialMediaDocuments.reputationScoreReport && (
                            <div className="flex items-center justify-between p-2 bg-green-50 border border-green-200 rounded">
                              <div className="flex items-center space-x-2">
                                <FileText className="h-5 w-5 text-green-600" />
                                <span className="text-sm text-green-800">{uploadedSocialMediaDocuments.reputationScoreReport.name}</span>
                              </div>
                              <button
                                onClick={() => removeSocialMediaDocument('reputationScoreReport')}
                                className="text-red-600 hover:text-red-800"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                          )}
                        </div>
                      ) : (
                        <p className="text-gray-900">{uploadedSocialMediaDocuments.reputationScoreReport?.name || 'No document uploaded'}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Reputation Score Information Section */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-yellow-900 mb-2">About Reputation Score</h4>
                      <div className="text-sm text-yellow-800 space-y-2">
                        <p><strong>What we calculate:</strong></p>
                        <ul className="list-disc list-inside ml-2 space-y-1">
                          <li>Overall digital reputation score (0-100)</li>
                          <li>Professional reputation assessment</li>
                          <li>Social media reputation evaluation</li>
                          <li>Online presence and influence metrics</li>
                          <li>Content quality and engagement analysis</li>
                          <li>Public perception and sentiment analysis</li>
                          <li>Reputation risk assessment and recommendations</li>
                        </ul>
                        
                        <div className="mt-3 p-2 bg-yellow-100 rounded text-xs">
                          <strong>Note:</strong> Reputation score provides a comprehensive assessment of digital reputation across multiple platforms and factors. This check is valuable for understanding overall online reputation and influence.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {selectedSubTab === 'thoughtLeadership' && (
          <div className="space-y-4">
            {!selectedChecks['socialMedia.thoughtLeadership']?.selected ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Thought Leadership & Professional Contributions</h3>
                <p className="text-gray-500 mb-4">Analyze thought leadership and professional contributions</p>
                <button
                  onClick={() => toggleCheck('socialMedia.thoughtLeadership')}
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                >
                  Add Thought Leadership Check - ₦2,000
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Thought Leadership & Professional Contributions</h3>
                  <button
                    onClick={() => toggleCheck('socialMedia.thoughtLeadership')}
                    className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-full text-sm font-medium transition-colors"
                  >
                    Remove
                  </button>
                </div>
                {/* Thought Leadership Analysis Parameters */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Content Type</label>
                    {isEditing ? (
                      <select
                        value={details?.thoughtLeadershipContentType || ''}
                        onChange={(e) => handleInputChange('details.socialMedia.thoughtLeadershipContentType', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select content type</option>
                        <option value="articles">Articles</option>
                        <option value="blog_posts">Blog Posts</option>
                        <option value="speeches">Speeches</option>
                        <option value="presentations">Presentations</option>
                        <option value="interviews">Interviews</option>
                        <option value="podcasts">Podcasts</option>
                        <option value="videos">Videos</option>
                        <option value="books">Books</option>
                        <option value="research">Research</option>
                        <option value="other">Other</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.thoughtLeadershipContentType || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Industry Focus</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={details?.industryFocus || ''}
                        onChange={(e) => handleInputChange('details.socialMedia.industryFocus', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter industry focus"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.industryFocus || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* Thought Leadership Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Total Publications</label>
                    {isEditing ? (
                      <input
                        type="number"
                        min="0"
                        value={details?.totalPublications || ''}
                        onChange={(e) => handleInputChange('details.socialMedia.totalPublications', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter total publications"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.totalPublications || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Speaking Engagements</label>
                    {isEditing ? (
                      <input
                        type="number"
                        min="0"
                        value={details?.speakingEngagements || ''}
                        onChange={(e) => handleInputChange('details.socialMedia.speakingEngagements', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter speaking engagements count"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.speakingEngagements || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Influence Score</label>
                    {isEditing ? (
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={details?.influenceScore || ''}
                        onChange={(e) => handleInputChange('details.socialMedia.influenceScore', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter influence score (0-100)"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.influenceScore || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* Thought Leadership Analysis */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Thought Leadership Analysis</label>
                  {isEditing ? (
                    <textarea
                      value={details?.thoughtLeadershipAnalysis || ''}
                      onChange={(e) => handleInputChange('details.socialMedia.thoughtLeadershipAnalysis', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      rows={4}
                      placeholder="Detailed analysis of thought leadership content, influence, and professional contributions"
                    />
                  ) : (
                    <p className="text-gray-900">{details?.thoughtLeadershipAnalysis || 'Not provided'}</p>
                  )}
                </div>

                {/* Thought Leadership Summary */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Thought Leadership Summary</label>
                  {isEditing ? (
                    <textarea
                      value={details?.thoughtLeadershipSummary || ''}
                      onChange={(e) => handleInputChange('details.socialMedia.thoughtLeadershipSummary', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      rows={4}
                      placeholder="Comprehensive summary of thought leadership assessment, influence evaluation, and professional contribution analysis"
                    />
                  ) : (
                    <p className="text-gray-900">{details?.thoughtLeadershipSummary || 'Not provided'}</p>
                  )}
                </div>

                {/* Thought Leadership Documents Upload */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <FileText className="h-5 w-5 text-gray-600" />
                    <h4 className="text-sm font-medium text-gray-900">Thought Leadership Documents</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    Upload supporting documents for thought leadership verification. Accepted formats: JPEG, PNG, PDF (max 10MB each).
                  </p>
                  
                  <div className="space-y-4">
                    {/* Thought Leadership Report Upload */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Thought Leadership Report</label>
                      {isEditing ? (
                        <div className="space-y-2">
                          <input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) => handleSocialMediaDocumentUpload(e, 'thoughtLeadershipReport')}
                            className="hidden"
                            id="thoughtLeadershipReport"
                          />
                          <label
                            htmlFor="thoughtLeadershipReport"
                            className="flex items-center justify-center w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors"
                          >
                            <Upload className="h-6 w-6 text-gray-400" />
                            <span className="ml-2 text-sm text-gray-600">Upload Thought Leadership Report</span>
                          </label>
                          {uploadedSocialMediaDocuments.thoughtLeadershipReport && (
                            <div className="flex items-center justify-between p-2 bg-green-50 border border-green-200 rounded">
                              <div className="flex items-center space-x-2">
                                <FileText className="h-5 w-5 text-green-600" />
                                <span className="text-sm text-green-800">{uploadedSocialMediaDocuments.thoughtLeadershipReport.name}</span>
                              </div>
                              <button
                                onClick={() => removeSocialMediaDocument('thoughtLeadershipReport')}
                                className="text-red-600 hover:text-red-800"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                          )}
                        </div>
                      ) : (
                        <p className="text-gray-900">{uploadedSocialMediaDocuments.thoughtLeadershipReport?.name || 'No document uploaded'}</p>
                      )}
                    </div>

                    {/* Additional Social Media Documents Upload */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Additional Social Media Documents</label>
                      {isEditing ? (
                        <div className="space-y-2">
                          <input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) => handleSocialMediaDocumentUpload(e, 'additionalSocialMediaDocuments')}
                            className="hidden"
                            id="additionalSocialMediaDocuments"
                            multiple
                          />
                          <label
                            htmlFor="additionalSocialMediaDocuments"
                            className="flex items-center justify-center w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors"
                          >
                            <Upload className="h-6 w-6 text-gray-400" />
                            <span className="ml-2 text-sm text-gray-600">Upload Additional Documents</span>
                          </label>
                          {uploadedSocialMediaDocuments.additionalSocialMediaDocuments.length > 0 && (
                            <div className="space-y-2">
                              {uploadedSocialMediaDocuments.additionalSocialMediaDocuments.map((file, index) => (
                                <div key={index} className="flex items-center justify-between p-2 bg-green-50 border border-green-200 rounded">
                                  <div className="flex items-center space-x-2">
                                    <FileText className="h-5 w-5 text-green-600" />
                                    <span className="text-sm text-green-800">{file.name}</span>
                                  </div>
                                  <button
                                    onClick={() => removeSocialMediaDocument('additionalSocialMediaDocuments', index)}
                                    className="text-red-600 hover:text-red-800"
                                  >
                                    <X className="h-4 w-4" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ) : (
                        <p className="text-gray-900">{uploadedSocialMediaDocuments.additionalSocialMediaDocuments.length > 0 ? `${uploadedSocialMediaDocuments.additionalSocialMediaDocuments.length} documents uploaded` : 'No documents uploaded'}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Thought Leadership Information Section */}
                <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-teal-900 mb-2">About Thought Leadership & Professional Contributions</h4>
                      <div className="text-sm text-teal-800 space-y-2">
                        <p><strong>What we analyze:</strong></p>
                        <ul className="list-disc list-inside ml-2 space-y-1">
                          <li>Published articles and blog posts</li>
                          <li>Speaking engagements and presentations</li>
                          <li>Industry interviews and podcasts</li>
                          <li>Research publications and studies</li>
                          <li>Professional contributions and expertise</li>
                          <li>Industry influence and recognition</li>
                          <li>Thought leadership content quality</li>
                        </ul>
                        
                        <div className="mt-3 p-2 bg-teal-100 rounded text-xs">
                          <strong>Note:</strong> Thought leadership analysis helps assess professional expertise, industry influence, and contribution to knowledge. This check is valuable for understanding professional standing and thought leadership capabilities.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    )
  }

  const renderFraudDetectionContent = () => {
    const details = request.details?.fraudDetection
    const subTabs = [
      { key: 'identityFraud', name: 'Identity Fraud', icon: CheckCircle, price: 2000 },
      { key: 'watchlistCheck', name: 'Watchlist Check', icon: CheckCircle, price: 1500 },
      { key: 'deviceFingerprint', name: 'Device Fingerprint', icon: CheckCircle, price: 1000 }
    ]

    return (
      <div className="space-y-6">
        {/* Sub-tabs */}
        <div className="flex space-x-1 border-b border-gray-200 overflow-x-auto">
          {subTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setSelectedSubTab(tab.key)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap flex-shrink-0 ${
                selectedSubTab === tab.key
                  ? 'border-red-500 text-red-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Content based on selected sub-tab */}
        {selectedSubTab === 'identityFraud' && (
          <div className="space-y-4">
            {!selectedChecks['fraudDetection.identityFraud']?.selected ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Identity Fraud Check</h3>
                <p className="text-gray-500 mb-4">Detect potential identity fraud and synthetic identity risks</p>
                <button
                  onClick={() => toggleCheck('fraudDetection.identityFraud')}
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                >
                  Add Identity Fraud Check - ₦2,000
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Identity Fraud Check</h3>
                  <button
                    onClick={() => toggleCheck('fraudDetection.identityFraud')}
                    className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-full text-sm font-medium transition-colors"
                  >
                    Remove
                  </button>
                </div>
                {/* Identity Fraud Risk Assessment */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Fraud Risk Level</label>
                    {isEditing ? (
                      <select
                        value={details?.fraudRiskLevel || ''}
                        onChange={(e) => handleInputChange('details.fraudDetection.fraudRiskLevel', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select risk level</option>
                        <option value="low">Low Risk</option>
                        <option value="medium">Medium Risk</option>
                        <option value="high">High Risk</option>
                        <option value="critical">Critical Risk</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.fraudRiskLevel || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Identity Verification Score</label>
                    {isEditing ? (
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={details?.identityVerificationScore || ''}
                        onChange={(e) => handleInputChange('details.fraudDetection.identityVerificationScore', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter score (0-100)"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.identityVerificationScore || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* Identity Fraud Detection Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Synthetic Identity Risk</label>
                    {isEditing ? (
                      <select
                        value={details?.syntheticIdentityRisk || ''}
                        onChange={(e) => handleInputChange('details.fraudDetection.syntheticIdentityRisk', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select risk level</option>
                        <option value="none">No Risk</option>
                        <option value="low">Low Risk</option>
                        <option value="medium">Medium Risk</option>
                        <option value="high">High Risk</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.syntheticIdentityRisk || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Identity Theft Risk</label>
                    {isEditing ? (
                      <select
                        value={details?.identityTheftRisk || ''}
                        onChange={(e) => handleInputChange('details.fraudDetection.identityTheftRisk', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select risk level</option>
                        <option value="none">No Risk</option>
                        <option value="low">Low Risk</option>
                        <option value="medium">Medium Risk</option>
                        <option value="high">High Risk</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.identityTheftRisk || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Document Fraud Risk</label>
                    {isEditing ? (
                      <select
                        value={details?.documentFraudRisk || ''}
                        onChange={(e) => handleInputChange('details.fraudDetection.documentFraudRisk', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select risk level</option>
                        <option value="none">No Risk</option>
                        <option value="low">Low Risk</option>
                        <option value="medium">Medium Risk</option>
                        <option value="high">High Risk</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.documentFraudRisk || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* Identity Fraud Indicators */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Identity Fraud Indicators</label>
                  {isEditing ? (
                    <textarea
                      value={details?.identityFraudIndicators || ''}
                      onChange={(e) => handleInputChange('details.fraudDetection.identityFraudIndicators', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      rows={4}
                      placeholder="List any identity fraud indicators, red flags, or suspicious patterns detected"
                    />
                  ) : (
                    <p className="text-gray-900">{details?.identityFraudIndicators || 'Not provided'}</p>
                  )}
                </div>

                {/* Identity Fraud Check Summary */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Identity Fraud Check Summary</label>
                  {isEditing ? (
                    <textarea
                      value={details?.identityFraudCheckSummary || ''}
                      onChange={(e) => handleInputChange('details.fraudDetection.identityFraudCheckSummary', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      rows={4}
                      placeholder="Comprehensive summary of identity fraud check findings, risk assessment, and recommendations"
                    />
                  ) : (
                    <p className="text-gray-900">{details?.identityFraudCheckSummary || 'Not provided'}</p>
                  )}
                </div>

                {/* Identity Fraud Documents Upload */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <FileText className="h-5 w-5 text-gray-600" />
                    <h4 className="text-sm font-medium text-gray-900">Identity Fraud Check Documents</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    Upload supporting documents for identity fraud verification. Accepted formats: JPEG, PNG, PDF (max 10MB each).
                  </p>
                  
                  <div className="space-y-4">
                    {/* Identity Fraud Report Upload */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Identity Fraud Report</label>
                      {isEditing ? (
                        <div className="space-y-2">
                          <input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) => handleFraudDocumentUpload(e, 'identityFraudReport')}
                            className="hidden"
                            id="identityFraudReport"
                          />
                          <label
                            htmlFor="identityFraudReport"
                            className="flex items-center justify-center w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors"
                          >
                            <Upload className="h-6 w-6 text-gray-400" />
                            <span className="ml-2 text-sm text-gray-600">Upload Identity Fraud Report</span>
                          </label>
                          {uploadedFraudDocuments.identityFraudReport && (
                            <div className="flex items-center justify-between p-2 bg-green-50 border border-green-200 rounded">
                              <div className="flex items-center space-x-2">
                                <FileText className="h-5 w-5 text-green-600" />
                                <span className="text-sm text-green-800">{uploadedFraudDocuments.identityFraudReport.name}</span>
                              </div>
                              <button
                                onClick={() => removeFraudDocument('identityFraudReport')}
                                className="text-red-600 hover:text-red-800"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                          )}
                        </div>
                      ) : (
                        <p className="text-gray-900">{uploadedFraudDocuments.identityFraudReport?.name || 'No document uploaded'}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Identity Fraud Check Information Section */}
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-red-900 mb-2">About Identity Fraud Check</h4>
                      <div className="text-sm text-red-800 space-y-2">
                        <p><strong>What we check:</strong></p>
                        <ul className="list-disc list-inside ml-2 space-y-1">
                          <li>Identity verification and authenticity</li>
                          <li>Synthetic identity detection and risk assessment</li>
                          <li>Identity theft indicators and patterns</li>
                          <li>Document fraud detection and validation</li>
                          <li>Identity consistency across multiple sources</li>
                          <li>Fraud risk scoring and classification</li>
                          <li>Identity verification score calculation</li>
                        </ul>
                        
                        <div className="mt-3 p-2 bg-red-100 rounded text-xs">
                          <strong>Note:</strong> Identity fraud check helps detect potential identity fraud, synthetic identities, and identity theft risks. This check is valuable for preventing fraud and ensuring identity authenticity.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {selectedSubTab === 'watchlistCheck' && (
          <div className="space-y-4">
            {!selectedChecks['fraudDetection.watchlistCheck']?.selected ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Watchlist Check</h3>
                <p className="text-gray-500 mb-4">Check against various watchlists and sanctions databases</p>
                <button
                  onClick={() => toggleCheck('fraudDetection.watchlistCheck')}
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                >
                  Add Watchlist Check - ₦1,500
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Watchlist Check</h3>
                  <button
                    onClick={() => toggleCheck('fraudDetection.watchlistCheck')}
                    className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-full text-sm font-medium transition-colors"
                  >
                    Remove
                  </button>
                </div>
                {/* Watchlist Check Status */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Watchlist Status</label>
                    {isEditing ? (
                      <select
                        value={details?.watchlistStatus || ''}
                        onChange={(e) => handleInputChange('details.fraudDetection.watchlistStatus', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select status</option>
                        <option value="clear">Clear</option>
                        <option value="match">Match Found</option>
                        <option value="partial">Partial Match</option>
                        <option value="pending">Pending Review</option>
                        <option value="false-positive">False Positive</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.watchlistStatus || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Databases Checked</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={details?.databasesChecked || ''}
                        onChange={(e) => handleInputChange('details.fraudDetection.databasesChecked', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter databases checked"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.databasesChecked || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* Watchlist Check Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sanctions List Check</label>
                    {isEditing ? (
                      <select
                        value={details?.sanctionsListCheck || ''}
                        onChange={(e) => handleInputChange('details.fraudDetection.sanctionsListCheck', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select status</option>
                        <option value="clear">Clear</option>
                        <option value="match">Match Found</option>
                        <option value="partial">Partial Match</option>
                        <option value="pending">Pending Review</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.sanctionsListCheck || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">PEP (Politically Exposed Person) Check</label>
                    {isEditing ? (
                      <select
                        value={details?.pepCheck || ''}
                        onChange={(e) => handleInputChange('details.fraudDetection.pepCheck', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select status</option>
                        <option value="clear">Clear</option>
                        <option value="match">Match Found</option>
                        <option value="partial">Partial Match</option>
                        <option value="pending">Pending Review</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.pepCheck || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Adverse Media Check</label>
                    {isEditing ? (
                      <select
                        value={details?.adverseMediaCheck || ''}
                        onChange={(e) => handleInputChange('details.fraudDetection.adverseMediaCheck', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select status</option>
                        <option value="clear">Clear</option>
                        <option value="match">Match Found</option>
                        <option value="partial">Partial Match</option>
                        <option value="pending">Pending Review</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.adverseMediaCheck || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* Watchlist Matches */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Watchlist Matches</label>
                  {isEditing ? (
                    <textarea
                      value={details?.watchlistMatches || ''}
                      onChange={(e) => handleInputChange('details.fraudDetection.watchlistMatches', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      rows={4}
                      placeholder="List any watchlist matches, sanctions, or adverse media findings"
                    />
                  ) : (
                    <p className="text-gray-900">{details?.watchlistMatches || 'Not provided'}</p>
                  )}
                </div>

                {/* Watchlist Check Summary */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Watchlist Check Summary</label>
                  {isEditing ? (
                    <textarea
                      value={details?.watchlistCheckSummary || ''}
                      onChange={(e) => handleInputChange('details.fraudDetection.watchlistCheckSummary', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      rows={4}
                      placeholder="Comprehensive summary of watchlist check findings, matches, and recommendations"
                    />
                  ) : (
                    <p className="text-gray-900">{details?.watchlistCheckSummary || 'Not provided'}</p>
                  )}
                </div>

                {/* Watchlist Check Documents Upload */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <FileText className="h-5 w-5 text-gray-600" />
                    <h4 className="text-sm font-medium text-gray-900">Watchlist Check Documents</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    Upload supporting documents for watchlist verification. Accepted formats: JPEG, PNG, PDF (max 10MB each).
                  </p>
                  
                  <div className="space-y-4">
                    {/* Watchlist Report Upload */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Watchlist Report</label>
                      {isEditing ? (
                        <div className="space-y-2">
                          <input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) => handleFraudDocumentUpload(e, 'watchlistReport')}
                            className="hidden"
                            id="watchlistReport"
                          />
                          <label
                            htmlFor="watchlistReport"
                            className="flex items-center justify-center w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors"
                          >
                            <Upload className="h-6 w-6 text-gray-400" />
                            <span className="ml-2 text-sm text-gray-600">Upload Watchlist Report</span>
                          </label>
                          {uploadedFraudDocuments.watchlistReport && (
                            <div className="flex items-center justify-between p-2 bg-green-50 border border-green-200 rounded">
                              <div className="flex items-center space-x-2">
                                <FileText className="h-5 w-5 text-green-600" />
                                <span className="text-sm text-green-800">{uploadedFraudDocuments.watchlistReport.name}</span>
                              </div>
                              <button
                                onClick={() => removeFraudDocument('watchlistReport')}
                                className="text-red-600 hover:text-red-800"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                          )}
                        </div>
                      ) : (
                        <p className="text-gray-900">{uploadedFraudDocuments.watchlistReport?.name || 'No document uploaded'}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Watchlist Check Information Section */}
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-orange-900 mb-2">About Watchlist Check</h4>
                      <div className="text-sm text-orange-800 space-y-2">
                        <p><strong>What we check:</strong></p>
                        <ul className="list-disc list-inside ml-2 space-y-1">
                          <li>Sanctions lists and embargoed entities</li>
                          <li>Politically Exposed Persons (PEP) databases</li>
                          <li>Adverse media and negative news screening</li>
                          <li>Regulatory enforcement actions</li>
                          <li>Financial crime and fraud databases</li>
                          <li>International watchlists and blacklists</li>
                          <li>Compliance and regulatory databases</li>
                        </ul>
                        
                        <div className="mt-3 p-2 bg-orange-100 rounded text-xs">
                          <strong>Note:</strong> Watchlist check helps identify individuals or entities that may pose compliance, reputational, or regulatory risks. This check is valuable for regulatory compliance and risk management.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {selectedSubTab === 'deviceFingerprint' && (
          <div className="space-y-4">
            {!selectedChecks['fraudDetection.deviceFingerprint']?.selected ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Device Fingerprint</h3>
                <p className="text-gray-500 mb-4">Analyze device fingerprint for fraud detection</p>
                <button
                  onClick={() => toggleCheck('fraudDetection.deviceFingerprint')}
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                >
                  Add Device Fingerprint - ₦1,000
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Device Fingerprint</h3>
                  <button
                    onClick={() => toggleCheck('fraudDetection.deviceFingerprint')}
                    className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-full text-sm font-medium transition-colors"
                  >
                    Remove
                  </button>
                </div>
                {/* Device Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Device Type</label>
                    {isEditing ? (
                      <select
                        value={details?.deviceType || ''}
                        onChange={(e) => handleInputChange('details.fraudDetection.deviceType', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select device type</option>
                        <option value="mobile">Mobile</option>
                        <option value="desktop">Desktop</option>
                        <option value="tablet">Tablet</option>
                        <option value="laptop">Laptop</option>
                        <option value="unknown">Unknown</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.deviceType || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Browser</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={details?.browser || ''}
                        onChange={(e) => handleInputChange('details.fraudDetection.browser', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter browser information"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.browser || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* Device Fingerprint Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Operating System</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={details?.operatingSystem || ''}
                        onChange={(e) => handleInputChange('details.fraudDetection.operatingSystem', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter OS information"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.operatingSystem || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Screen Resolution</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={details?.screenResolution || ''}
                        onChange={(e) => handleInputChange('details.fraudDetection.screenResolution', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="e.g., 1920x1080"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.screenResolution || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">IP Address</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={details?.ipAddress || ''}
                        onChange={(e) => handleInputChange('details.fraudDetection.ipAddress', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter IP address"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.ipAddress || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* Device Risk Assessment */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Device Risk Score</label>
                    {isEditing ? (
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={details?.deviceRiskScore || ''}
                        onChange={(e) => handleInputChange('details.fraudDetection.deviceRiskScore', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter risk score (0-100)"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.deviceRiskScore || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Device Trust Level</label>
                    {isEditing ? (
                      <select
                        value={details?.deviceTrustLevel || ''}
                        onChange={(e) => handleInputChange('details.fraudDetection.deviceTrustLevel', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select trust level</option>
                        <option value="high">High Trust</option>
                        <option value="medium">Medium Trust</option>
                        <option value="low">Low Trust</option>
                        <option value="suspicious">Suspicious</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.deviceTrustLevel || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* Device Fingerprint Analysis */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Device Fingerprint Analysis</label>
                  {isEditing ? (
                    <textarea
                      value={details?.deviceFingerprintAnalysis || ''}
                      onChange={(e) => handleInputChange('details.fraudDetection.deviceFingerprintAnalysis', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      rows={4}
                      placeholder="Detailed analysis of device fingerprint, including any suspicious patterns or anomalies"
                    />
                  ) : (
                    <p className="text-gray-900">{details?.deviceFingerprintAnalysis || 'Not provided'}</p>
                  )}
                </div>

                {/* Device Fingerprint Summary */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Device Fingerprint Summary</label>
                  {isEditing ? (
                    <textarea
                      value={details?.deviceFingerprintSummary || ''}
                      onChange={(e) => handleInputChange('details.fraudDetection.deviceFingerprintSummary', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      rows={4}
                      placeholder="Comprehensive summary of device fingerprint analysis, risk assessment, and recommendations"
                    />
                  ) : (
                    <p className="text-gray-900">{details?.deviceFingerprintSummary || 'Not provided'}</p>
                  )}
                </div>

                {/* Device Fingerprint Documents Upload */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <FileText className="h-5 w-5 text-gray-600" />
                    <h4 className="text-sm font-medium text-gray-900">Device Fingerprint Documents</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    Upload supporting documents for device fingerprint verification. Accepted formats: JPEG, PNG, PDF (max 10MB each).
                  </p>
                  
                  <div className="space-y-4">
                    {/* Device Fingerprint Report Upload */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Device Fingerprint Report</label>
                      {isEditing ? (
                        <div className="space-y-2">
                          <input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) => handleFraudDocumentUpload(e, 'deviceFingerprintReport')}
                            className="hidden"
                            id="deviceFingerprintReport"
                          />
                          <label
                            htmlFor="deviceFingerprintReport"
                            className="flex items-center justify-center w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors"
                          >
                            <Upload className="h-6 w-6 text-gray-400" />
                            <span className="ml-2 text-sm text-gray-600">Upload Device Fingerprint Report</span>
                          </label>
                          {uploadedFraudDocuments.deviceFingerprintReport && (
                            <div className="flex items-center justify-between p-2 bg-green-50 border border-green-200 rounded">
                              <div className="flex items-center space-x-2">
                                <FileText className="h-5 w-5 text-green-600" />
                                <span className="text-sm text-green-800">{uploadedFraudDocuments.deviceFingerprintReport.name}</span>
                              </div>
                              <button
                                onClick={() => removeFraudDocument('deviceFingerprintReport')}
                                className="text-red-600 hover:text-red-800"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                          )}
                        </div>
                      ) : (
                        <p className="text-gray-900">{uploadedFraudDocuments.deviceFingerprintReport?.name || 'No document uploaded'}</p>
                      )}
                    </div>

                    {/* Additional Fraud Documents Upload */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Additional Fraud Detection Documents</label>
                      {isEditing ? (
                        <div className="space-y-2">
                          <input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) => handleFraudDocumentUpload(e, 'additionalFraudDocuments')}
                            className="hidden"
                            id="additionalFraudDocuments"
                            multiple
                          />
                          <label
                            htmlFor="additionalFraudDocuments"
                            className="flex items-center justify-center w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors"
                          >
                            <Upload className="h-6 w-6 text-gray-400" />
                            <span className="ml-2 text-sm text-gray-600">Upload Additional Documents</span>
                          </label>
                          {uploadedFraudDocuments.additionalFraudDocuments.length > 0 && (
                            <div className="space-y-2">
                              {uploadedFraudDocuments.additionalFraudDocuments.map((file, index) => (
                                <div key={index} className="flex items-center justify-between p-2 bg-green-50 border border-green-200 rounded">
                                  <div className="flex items-center space-x-2">
                                    <FileText className="h-5 w-5 text-green-600" />
                                    <span className="text-sm text-green-800">{file.name}</span>
                                  </div>
                                  <button
                                    onClick={() => removeFraudDocument('additionalFraudDocuments', index)}
                                    className="text-red-600 hover:text-red-800"
                                  >
                                    <X className="h-4 w-4" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ) : (
                        <p className="text-gray-900">{uploadedFraudDocuments.additionalFraudDocuments.length > 0 ? `${uploadedFraudDocuments.additionalFraudDocuments.length} documents uploaded` : 'No documents uploaded'}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Device Fingerprint Information Section */}
                <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-indigo-900 mb-2">About Device Fingerprint</h4>
                      <div className="text-sm text-indigo-800 space-y-2">
                        <p><strong>What we analyze:</strong></p>
                        <ul className="list-disc list-inside ml-2 space-y-1">
                          <li>Device type, browser, and operating system</li>
                          <li>Screen resolution and display characteristics</li>
                          <li>IP address and network information</li>
                          <li>Device risk scoring and trust assessment</li>
                          <li>Device fingerprint uniqueness and consistency</li>
                          <li>Suspicious device patterns and anomalies</li>
                          <li>Device reputation and historical behavior</li>
                        </ul>
                        
                        <div className="mt-3 p-2 bg-indigo-100 rounded text-xs">
                          <strong>Note:</strong> Device fingerprint analysis helps detect suspicious devices, identify potential fraud patterns, and assess device trustworthiness. This check is valuable for fraud prevention and device-based risk assessment.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    )
  }

  const renderDetailContent = () => {
    switch (selectedCategory) {
      case 'personalIdentity':
        return renderPersonalIdentityContent()
      case 'criminalRecord':
        return renderCriminalRecordContent()
      case 'financialCredit':
        return renderFinancialCreditContent()
      case 'association':
        return renderAssociationContent()
      case 'medical':
        return renderMedicalContent()
      case 'employment':
        return renderEmploymentContent()
      case 'education':
        return renderEducationContent()
      case 'socialMedia':
        return renderSocialMediaContent()
      case 'fraudDetection':
        return renderFraudDetectionContent()
      default:
        return (
          <div className="text-center py-8">
            <p className="text-gray-500">Select a category to view details</p>
          </div>
        )
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-7xl h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-red-600 text-white px-6 py-4 rounded-t-xl flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={onClose}
              className="p-2 hover:bg-red-700 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div>
              <h1 className="text-xl font-semibold">Background Check Request</h1>
              {isRegistered && preFilledData && (
                <div className="flex items-center space-x-2 mt-1">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-green-700">
                    Pre-filled data for {entityType === 'individual' ? 'Individual' : 'Organization'}: {preFilledData.firstName} {preFilledData.lastName}
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {request.status === 'completed' && (
              <button className="bg-white text-red-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center space-x-2">
                <Download className="h-4 w-4" />
                <span>Download Full Report</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 hover:bg-red-700 rounded-lg transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Candidate Information */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-start space-x-4">
            {/* Editable Profile Image */}
            <div className="relative flex-shrink-0">
              <div className="flex flex-col items-center space-y-1">
                {profileImagePreview ? (
                  <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-green-300">
                    <img 
                      src={profileImagePreview} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className={`w-24 h-24 rounded-full flex items-center justify-center border-2 ${
                    !request.profileImage ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-gray-200'
                  }`}>
                    <User className={`h-12 w-12 ${!request.profileImage ? 'text-red-500' : 'text-gray-500'}`} />
                  </div>
                )}
                {isEditing && (
                  <div className="text-xs text-center">
                    <div className="font-medium text-gray-700">Profile Picture <span className="text-red-500">*</span></div>
                    <div className="text-gray-500">Required</div>
                  </div>
                )}
              </div>
              {isEditing && (
                <div className="absolute -bottom-1 -right-1">
                  <input
                    type="file"
                    onChange={handleProfileImageUpload}
                    accept="image/jpeg,image/png,image/jpg"
                    className="hidden"
                    id="profileImageUpload"
                  />
                  <label 
                    htmlFor="profileImageUpload"
                    className="w-5 h-5 bg-primary-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-primary-600 transition-colors"
                  >
                    <Upload className="h-2.5 w-2.5 text-white" />
                  </label>
                </div>
              )}
              {isEditing && profileImagePreview && (
                <button
                  onClick={removeProfileImage}
                  className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-red-600 transition-colors"
                >
                  <span className="text-white text-xs">×</span>
                </button>
              )}
              {!request.profileImage && isEditing && (
                <div className="absolute -bottom-5 left-0 right-0 text-center">
                  <p className="text-red-500 text-xs">Profile picture is required</p>
                </div>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              {/* Order Number */}
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Order Number</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={request.orderNumber}
                    onChange={(e) => handleInputChange('orderNumber', e.target.value)}
                    className="bg-transparent border-b border-gray-300 focus:border-primary-500 outline-none w-full max-w-xs"
                    placeholder="Enter order number"
                  />
                ) : (
                  <p className="text-gray-900 font-medium">{request.orderNumber || 'No order number'}</p>
                )}
              </div>

              {/* Name and Contact Fields - Single Row Layout */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  {isEditing ? (
                    <div>
                      <input
                        type="text"
                        value={request.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className={`bg-transparent border-b focus:border-primary-500 outline-none w-full text-sm ${
                          !request.firstName.trim() 
                            ? 'border-red-300' 
                            : 'border-gray-300'
                        }`}
                        placeholder="Enter first name"
                        required
                      />
                      {!request.firstName.trim() && (
                        <p className="text-red-500 text-[10px] mt-1">First name is required</p>
                      )}
                    </div>
                  ) : (
                    <p className="text-gray-900 text-sm">{request.firstName || 'No first name'}</p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Middle Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={request.middleName}
                      onChange={(e) => handleInputChange('middleName', e.target.value)}
                      className="bg-transparent border-b border-gray-300 focus:border-primary-500 outline-none w-full text-sm"
                      placeholder="Enter middle name"
                    />
                  ) : (
                    <p className="text-gray-900 text-sm">{request.middleName || 'No middle name'}</p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  {isEditing ? (
                    <div>
                      <input
                        type="text"
                        value={request.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className={`bg-transparent border-b focus:border-primary-500 outline-none w-full text-sm ${
                          !request.lastName.trim() 
                            ? 'border-red-300' 
                            : 'border-gray-300'
                        }`}
                        placeholder="Enter last name"
                        required
                      />
                      {!request.lastName.trim() && (
                        <p className="text-red-500 text-[10px] mt-1">Last name is required</p>
                      )}
                    </div>
                  ) : (
                    <p className="text-gray-900 text-sm">{request.lastName || 'No last name'}</p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
                  {isEditing ? (
                    <div>
                      <input
                        type="email"
                        value={request.candidateEmail}
                        onChange={(e) => handleInputChange('candidateEmail', e.target.value)}
                        className={`bg-transparent border-b focus:border-primary-500 outline-none w-full text-sm ${
                          request.candidateEmail && !validateEmail(request.candidateEmail) 
                            ? 'border-red-300' 
                            : 'border-gray-300'
                        }`}
                        placeholder="Enter email"
                      />
                      {request.candidateEmail && !validateEmail(request.candidateEmail) && (
                        <p className="text-red-500 text-[10px] mt-1">Please enter a valid email address</p>
                      )}
                    </div>
                  ) : (
                    <p className="text-gray-900 text-sm">{request.candidateEmail || 'No email provided'}</p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Phone Number</label>
                  {isEditing ? (
                    <div>
                      <div className="flex">
                        <select
                          value={request.countryCode}
                          onChange={(e) => handleInputChange('countryCode', e.target.value)}
                          className="bg-transparent border-b border-gray-300 focus:border-primary-500 outline-none pr-1 mr-1 text-xs"
                        >
                          {countryCodes.map((country) => (
                            <option key={country.code} value={country.code}>
                              {country.flag} {country.code}
                            </option>
                          ))}
                        </select>
                        <input
                          type="tel"
                          value={request.candidatePhone}
                          onChange={(e) => handleInputChange('candidatePhone', e.target.value.replace(/\D/g, ''))}
                          className={`bg-transparent border-b focus:border-primary-500 outline-none flex-1 text-sm ${
                            request.candidatePhone && !validatePhoneNumber(request.candidatePhone, request.countryCode)
                              ? 'border-red-300' 
                              : 'border-gray-300'
                          }`}
                          placeholder="Enter phone number"
                        />
                      </div>
                      {request.candidatePhone && !validatePhoneNumber(request.candidatePhone, request.countryCode) && (
                        <p className="text-red-500 text-[10px] mt-1">
                          Phone number must be {request.countryCode === '+234' ? '10' : 
                           request.countryCode === '+86' ? '11' : 
                           request.countryCode === '+49' || request.countryCode === '+55' ? '10' : '9'} digits for {countryCodes.find(c => c.code === request.countryCode)?.country}
                        </p>
                      )}
                    </div>
                  ) : (
                    <p className="text-gray-900 text-sm">
                      {request.countryCode} {request.candidatePhone || 'No phone provided'}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Panel - Categories */}
          <div className="w-80 bg-gray-50 border-r border-gray-200 overflow-y-auto">
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Background Check Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => {
                  const Icon = category.icon
                  const result = request.results?.[category.key as keyof typeof request.results]
                  const isSelected = selectedCategory === category.key
                  const isCheckSelected = selectedChecks[category.key]?.selected || false
                  
                  return (
                    <div
                      key={category.key}
                      className={`p-3 rounded-lg cursor-pointer transition-all ${
                        isSelected 
                          ? 'bg-white border-2 border-blue-500 shadow-sm' 
                          : 'hover:bg-white hover:shadow-sm'
                      }`}
                      onClick={() => setSelectedCategory(category.key)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Icon className="h-5 w-5 text-gray-600" />
                          <span className="text-sm font-medium text-gray-900">{category.name}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          {result && (
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(result)}`}>
                              {result.toUpperCase().replace('-', ' ')}
                            </span>
                          )}
                          <ChevronRight className="h-4 w-4 text-gray-400" />
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Center Panel - Details */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-6">
              {selectedCategory && (
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {categories.find(c => c.key === selectedCategory)?.name}
                    </h3>
                    {request.results?.[selectedCategory as keyof typeof request.results] && (
                      <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full border ${getStatusColor(request.results[selectedCategory as keyof typeof request.results])}`}>
                        {request.results[selectedCategory as keyof typeof request.results]?.toUpperCase().replace('-', ' ')}
                      </span>
                    )}
                  </div>
                  {renderDetailContent()}
                </div>
              )}
            </div>
          </div>

          {/* Right Panel - Payment Section */}
          <div className={`bg-gray-50 border-l border-gray-200 overflow-y-auto transition-all duration-300 ${isPaymentPanelCollapsed ? 'w-12' : 'w-80'}`}>
            {isPaymentPanelCollapsed ? (
              <div className="p-2 h-full flex flex-col items-center justify-center">
                <button
                  onClick={() => setIsPaymentPanelCollapsed(false)}
                  className="p-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
                  title="Expand Payment Summary"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <div className="mt-4 text-center">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <CreditCard className="h-4 w-4 text-primary-600" />
                  </div>
                  <p className="text-xs text-gray-500 transform -rotate-90 whitespace-nowrap">Payment</p>
                </div>
              </div>
            ) : (
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Payment Summary</h3>
                  <button
                    onClick={() => setIsPaymentPanelCollapsed(true)}
                    className="p-1 hover:bg-gray-200 rounded transition-colors"
                    title="Collapse Payment Summary"
                  >
                    <ChevronLeft className="h-4 w-4 text-gray-500" />
                  </button>
                </div>
                
                {getSelectedChecksList().length > 0 ? (
                  <div className="space-y-4">
                    <div className="space-y-3">
                      {getSelectedChecksList().map((check, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                          <div>
                            <p className="text-sm font-medium text-gray-900">{check.name}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-semibold text-gray-900">₦{check.price.toLocaleString()}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="border-t border-gray-200 pt-4">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-lg font-semibold text-gray-900">Total</span>
                        <span className="text-lg font-bold text-gray-900">₦{getTotalPrice().toLocaleString()}</span>
                      </div>
                      
                      <button 
                        onClick={() => {
                          const validationErrors = validateForm()
                          if (validationErrors.length > 0) {
                            alert('Please fix the following errors:\n\n' + validationErrors.join('\n'))
                            return
                          }
                          setShowPaymentModal(true)
                        }}
                        className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                      >
                        Proceed to Payment
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CreditCard className="h-8 w-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500 text-sm">No background checks selected</p>
                    <p className="text-gray-400 text-xs mt-1">Click "Add" on any category to get started</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
          <div className="bg-white rounded-2xl w-full max-w-4xl p-6 relative">
            <button 
              onClick={() => setShowPaymentModal(false)} 
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
            
            <div className="p-6">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <h4 className="text-lg font-semibold text-gray-900">Review and Deposit</h4>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column - Escrow Summary */}
                <div className="space-y-6">
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h5 className="font-semibold text-gray-900 mb-4">Escrow Summary</h5>
                    {(() => {
                      const totals = calculateTotal()
                      return (
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Selected Background Checks Total</span>
                            <span className="font-medium">₦{totals.subtotal.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Platform Service Fee</span>
                            <span className="font-medium">₦{totals.serviceFee.toLocaleString()}</span>
                          </div>
                          <div className="border-t border-gray-200 pt-3">
                            <div className="flex justify-between text-lg font-semibold">
                              <span>Total to Escrow</span>
                              <span>₦{totals.total.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                      )
                    })()}
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                    <h5 className="font-semibold text-gray-900 mb-4">Escrow Details</h5>
                    <div className="space-y-3">
                      <div className="flex items-center text-sm text-green-700">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Funds will be held securely
                      </div>
                      <div className="flex items-center text-sm text-green-700">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Released after check is complete
                      </div>
                      <div className="flex items-center text-sm text-green-700">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Refund if candidate doesn't respond in 7d
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Wallet Information */}
                <div className="space-y-6">
                  <div className="bg-red-600 text-white rounded-lg p-6">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">WALLET</span>
                      <span className="text-sm opacity-75">Powered by SureBanker</span>
                    </div>
                    <div className="text-2xl font-bold mt-2">₦20,132.00</div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900 mb-2">₦14,632</div>
                      <div className="text-sm text-gray-600">Remaining after escrow</div>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <button
                      onClick={() => {
                        setShowPaymentModal(false)
                        setShowOTPModal(true)
                      }}
                      className="w-full px-8 py-4 bg-red-600 text-white rounded-lg hover:bg-red-700 text-lg font-semibold"
                    >
                      Deposit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* OTP Verification Modal */}
      {showOTPModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 relative">
            <button 
              onClick={() => setShowOTPModal(false)} 
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
            
            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">OTP Verification</h3>
              <p className="text-sm text-gray-600">We texted a verification code to +23470*******061</p>
              <p className="text-sm text-gray-600 mt-2">
                You are authorizing a payment of <strong>NGN {calculateTotal().total.toLocaleString()}.00</strong> on <strong>{new Date().toLocaleDateString()}</strong> from your <strong>SureBanker Account</strong> to <strong>SureEscrow</strong>
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex justify-center space-x-2">
                {[1,2,3,4,5,6].map((digit) => (
                  <input
                    key={digit}
                    type="text"
                    maxLength={1}
                    value={otp[digit - 1]}
                    onChange={(e) => {
                      const newOtp = [...otp]
                      newOtp[digit - 1] = e.target.value
                      setOtp(newOtp)
                    }}
                    className="w-12 h-12 text-center border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                ))}
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Didn't receive the code? <span className="text-red-600 font-medium">Request new code 0:24</span>
                </p>
              </div>

              <button
                onClick={() => {
                  setShowOTPModal(false)
                  setShowSuccessModal(true)
                }}
                className="w-full py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold"
              >
                Pay
              </button>

              <div className="text-center">
                <p className="text-sm text-gray-600">
                  <span className="text-red-600 font-medium">Request via code via Email</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 relative">
            <button 
              onClick={() => {
                setShowSuccessModal(false)
                onClose()
              }} 
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Request Sent to Candidate</h3>
              <p className="text-sm text-gray-600 mb-6">
                Background check request for <strong className="text-red-600">{request.firstName} {request.lastName}</strong> has been successfully paid. Please allow up to 48 hours for the results to be processed.
              </p>
              <button
                onClick={() => {
                  setShowSuccessModal(false)
                  onClose()
                }}
                className="w-full py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold"
              >
                View Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default BackgroundCheckRequestForm

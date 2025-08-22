import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/store/store'
import { registerUser } from '@/store/slices/authSlice'
import { ArrowLeft, ArrowRight, Check, Circle, X, Shield } from 'lucide-react'
import { useTour } from '@/contexts/TourContext'

const SignupPage = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Step 1 - Common fields
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    companyName: '',
    companyEmail: '',
    industry: '',
    serviceNeeds: [] as string[],
    
    // Step 2 - Password
    password: '',
    confirmPassword: '',
    
    // Step 3 - OTP
    otp: '',
    
    userType: 'individual' as 'individual' | 'organisation' | 'developer',
    agreeToTerms: false,
  })
  
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [showTermsModal, setShowTermsModal] = useState(false)
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const { startTourAfterNavigation } = useTour()

  const industries = [
    'Technology',
    'Finance',
    'Healthcare',
    'Education',
    'Retail',
    'Manufacturing',
    'Real Estate',
    'Transportation',
    'Energy',
    'Other'
  ]

  const serviceNeeds = [
    'Identity Verification',
    'Document Verification',
    'Biometric Authentication',
    'Trust Score Calculation',
    'AML Compliance',
    'KYC Processing',
    'Employee Verification',
    'Customer Onboarding',
    'Fraud Detection',
    'API Integration'
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleServiceNeedChange = (service: string) => {
    setFormData(prev => ({
      ...prev,
      serviceNeeds: prev.serviceNeeds.includes(service)
        ? prev.serviceNeeds.filter(s => s !== service)
        : [...prev.serviceNeeds, service]
    }))
  }

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {}

    if (formData.userType === 'individual' || formData.userType === 'developer') {
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required'
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required'
      if (!formData.email.trim()) newErrors.email = 'Email is required'
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid'
      if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required'
    }

    if (formData.userType === 'organisation') {
      if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required'
      if (!formData.companyName.trim()) newErrors.companyName = 'Company name is required'
      if (!formData.companyEmail.trim()) newErrors.companyEmail = 'Company email is required'
      else if (!/\S+@\S+\.\S+/.test(formData.companyEmail)) newErrors.companyEmail = 'Company email is invalid'
      if (!formData.industry) newErrors.industry = 'Industry is required'
      if (formData.serviceNeeds.length === 0) newErrors.serviceNeeds = 'At least one service need is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep3 = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.otp.trim()) {
      newErrors.otp = 'OTP is required'
    } else if (formData.otp.length !== 6) {
      newErrors.otp = 'OTP must be 6 digits'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    let isValid = false
    
    switch (currentStep) {
      case 1:
        isValid = validateStep1()
        break
      case 2:
        isValid = validateStep2()
        break
      default:
        isValid = true
    }

    if (isValid && currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    if (currentStep === 3) {
      // Validate OTP
      if (!formData.otp.trim()) {
        setErrors({ otp: 'Please enter the OTP code' })
        return
      }

      setIsVerifying(true)
      
      try {
        // Simulate OTP verification delay
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        // Register user
        await dispatch(registerUser({
          email: formData.userType === 'organisation' ? formData.companyEmail : formData.email,
          password: formData.password,
          userType: formData.userType,
          firstName: formData.firstName,
          lastName: formData.lastName
        }))
        
        setIsVerifying(false)
        
        // Set tour navigation BEFORE navigating
        console.log('Registration successful, setting tour navigation for:', formData.userType)
        startTourAfterNavigation(formData.userType)
        
        // Add a small delay to ensure localStorage is set
        setTimeout(() => {
          console.log('Navigating to dashboard...')
          navigate(`/${formData.userType}`)
        }, 100)
        
      } catch (error) {
        setIsVerifying(false)
        setErrors({ general: 'Registration failed. Please try again.' })
      }
    } else {
      setCurrentStep(prev => prev + 1)
    }
  }

  const testimonials = [
    {
      name: 'Amara Eberechi',
      title: 'HR Head, Delta Steel',
      quote: 'ID Certify transformed our hiring process. Verifications are quick, reliable, and securely stored, saving time and ensuring trust. A must-have for HR teams!',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face'
    }
  ]

  const [currentTestimonial] = useState(0)

  const renderStep1 = () => (
    <div className="space-y-6">
      {/* Role Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4">Choose Account Type</label>
        <div className="grid grid-cols-1 gap-4">
          <div 
            className={`relative p-4 border-2 rounded-lg cursor-pointer transition-colors ${
              formData.userType === 'individual' 
                ? 'border-primary-600 bg-primary-50' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => setFormData(prev => ({ ...prev, userType: 'individual' }))}
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Individual</h3>
                <p className="text-sm text-gray-600">Personal identity verification and management</p>
              </div>
              {formData.userType === 'individual' ? (
                <Check className="h-5 w-5 text-primary-600" />
              ) : (
                <Circle className="h-5 w-5 text-gray-400" />
              )}
            </div>
          </div>

          <div 
            className={`relative p-4 border-2 rounded-lg cursor-pointer transition-colors ${
              formData.userType === 'organisation' 
                ? 'border-primary-600 bg-primary-50' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => setFormData(prev => ({ ...prev, userType: 'organisation' }))}
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Organisation</h3>
                <p className="text-sm text-gray-600">Business compliance and employee verification</p>
              </div>
              {formData.userType === 'organisation' ? (
                <Check className="h-5 w-5 text-primary-600" />
              ) : (
                <Circle className="h-5 w-5 text-gray-400" />
              )}
            </div>
          </div>

          <div 
            className={`relative p-4 border-2 rounded-lg cursor-pointer transition-colors ${
              formData.userType === 'developer' 
                ? 'border-primary-600 bg-primary-50' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => setFormData(prev => ({ ...prev, userType: 'developer' }))}
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Developer</h3>
                <p className="text-sm text-gray-600">API access and integration services</p>
              </div>
              {formData.userType === 'developer' ? (
                <Check className="h-5 w-5 text-primary-600" />
              ) : (
                <Circle className="h-5 w-5 text-gray-400" />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Individual/Developer Fields */}
      {(formData.userType === 'individual' || formData.userType === 'developer') && (
        <>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className={`w-full px-3 py-2.5 border rounded-lg focus:outline-none focus:ring-0 focus:border-primary-500 transition-colors ${
                  errors.firstName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your first name"
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
              )}
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className={`w-full px-3 py-2.5 border rounded-lg focus:outline-none focus:ring-0 focus:border-primary-500 transition-colors ${
                  errors.lastName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your last name"
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full px-3 py-2.5 border rounded-lg focus:outline-none focus:ring-0 focus:border-primary-500 transition-colors ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>
        </>
      )}

      {/* Organisation Fields */}
      {formData.userType === 'organisation' && (
        <>
          <div>
            <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-2">
              Company Name
            </label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleInputChange}
              className={`w-full px-3 py-2.5 border rounded-lg focus:outline-none focus:ring-0 focus:border-primary-500 transition-colors ${
                errors.companyName ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your company name"
            />
            {errors.companyName && (
              <p className="mt-1 text-sm text-red-600">{errors.companyName}</p>
            )}
          </div>

          <div>
            <label htmlFor="companyEmail" className="block text-sm font-medium text-gray-700 mb-2">
              Company Email
            </label>
            <input
              type="email"
              id="companyEmail"
              name="companyEmail"
              value={formData.companyEmail}
              onChange={handleInputChange}
              className={`w-full px-3 py-2.5 border rounded-lg focus:outline-none focus:ring-0 focus:border-primary-500 transition-colors ${
                errors.companyEmail ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your company email"
            />
            {errors.companyEmail && (
              <p className="mt-1 text-sm text-red-600">{errors.companyEmail}</p>
            )}
          </div>

          <div>
            <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-2">
              Industry
            </label>
            <select
              id="industry"
              name="industry"
              value={formData.industry}
              onChange={handleInputChange}
              className={`w-full px-3 py-2.5 border rounded-lg focus:outline-none focus:ring-0 focus:border-primary-500 transition-colors ${
                errors.industry ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select your industry</option>
              {industries.map((industry) => (
                <option key={industry} value={industry}>
                  {industry}
                </option>
              ))}
            </select>
            {errors.industry && (
              <p className="mt-1 text-sm text-red-600">{errors.industry}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Service Needs (Select all that apply)
            </label>
            <div className="grid grid-cols-2 gap-2">
              {serviceNeeds.map((service) => (
                <label key={service} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.serviceNeeds.includes(service)}
                    onChange={() => handleServiceNeedChange(service)}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-primary-300 rounded-md"
                  />
                  <span className="text-sm text-gray-700">{service}</span>
                </label>
              ))}
            </div>
            {errors.serviceNeeds && (
              <p className="mt-1 text-sm text-red-600">{errors.serviceNeeds}</p>
            )}
          </div>
        </>
      )}

      {/* Common Phone Number Field */}
      <div>
        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
          Phone Number
        </label>
        <input
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleInputChange}
          className={`w-full px-3 py-2.5 border rounded-lg focus:outline-none focus:ring-0 focus:border-primary-500 transition-colors ${
            errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Enter your phone number"
        />
        {errors.phoneNumber && (
          <p className="mt-1 text-sm text-red-600">{errors.phoneNumber}</p>
        )}
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className={`w-full px-3 py-2.5 border rounded-lg focus:outline-none focus:ring-0 focus:border-primary-500 transition-colors pr-32 ${
              errors.password ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Create a password"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs font-medium text-gray-500 hover:text-gray-700"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? 'HIDE PASSWORD' : 'SHOW PASSWORD'}
          </button>
        </div>
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password}</p>
        )}
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
          Confirm Password
        </label>
        <div className="relative">
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className={`w-full px-3 py-2.5 border rounded-lg focus:outline-none focus:ring-0 focus:border-primary-500 transition-colors pr-32 ${
              errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Confirm your password"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs font-medium text-gray-500 hover:text-gray-700"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? 'HIDE PASSWORD' : 'SHOW PASSWORD'}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
        )}
      </div>

      <div className="flex items-start">
        <input
          type="checkbox"
          id="agreeToTerms"
          name="agreeToTerms"
          checked={formData.agreeToTerms}
          onChange={(e) => {
            if (!formData.agreeToTerms) {
              // If trying to check the box, show modal first
              e.preventDefault()
              setShowTermsModal(true)
            } else {
              // If unchecking, allow it
              handleInputChange(e)
            }
          }}
          className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-primary-300 rounded-md"
        />
        <label htmlFor="agreeToTerms" className="ml-2 text-sm text-gray-600">
          I agree to the{' '}
          <button
            type="button"
            onClick={() => setShowTermsModal(true)}
            className="text-primary-600 hover:text-primary-700 underline"
          >
            Terms and Conditions
          </button>{' '}
          and{' '}
          <button
            type="button"
            onClick={() => setShowTermsModal(true)}
            className="text-primary-600 hover:text-primary-700 underline"
          >
            Privacy Policy
          </button>
        </label>
      </div>
      {errors.agreeToTerms && (
        <p className="text-sm text-red-600">{errors.agreeToTerms}</p>
      )}
    </div>
  )

  const renderStep3 = () => (
    <div className="space-y-6">
      {isVerifying ? (
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Verifying Your Email</h3>
            <p className="text-gray-600">
              Please wait while we verify your email address...
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Verify Your Email</h3>
            <p className="text-gray-600">
              We've sent a 6-digit verification code to{' '}
              <span className="font-medium">
                {formData.userType === 'organisation' ? formData.companyEmail : formData.email}
              </span>
            </p>
          </div>

          <div>
            <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">
              Verification Code
            </label>
            <input
              type="text"
              id="otp"
              name="otp"
              value={formData.otp}
              onChange={handleInputChange}
              maxLength={6}
              className={`w-full px-3 py-2.5 border rounded-lg focus:outline-none focus:ring-0 focus:border-primary-500 transition-colors text-center text-lg tracking-widest ${
                errors.otp ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="000000"
            />
            {errors.otp && (
              <p className="mt-1 text-sm text-red-600">{errors.otp}</p>
            )}
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Didn't receive the code?{' '}
              <button type="button" className="text-primary-600 hover:text-primary-700 font-medium">
                Resend Code
              </button>
            </p>
          </div>
        </>
      )}
    </div>
  )

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return 'Account Information'
      case 2:
        return 'Create Password'
      case 3:
        return 'Email Verification'
      default:
        return ''
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Column - Registration Form */}
      <div className="flex-1 flex flex-col px-8 py-12 bg-white overflow-y-auto lg:mr-[50%]">
        <div className="max-w-md mx-auto w-full">
          {/* Progress Indicator and Back Button */}
          <div className="mb-8">
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-1 mb-4">
              <div 
                className="bg-primary-600 h-1 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / 3) * 100}%` }}
              ></div>
            </div>
            
            {/* Step Counter and Back Button */}
            <div className="flex items-center justify-between">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="flex items-center text-primary-600 hover:text-primary-700 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Back
                </button>
              )}
              
              <div className="text-primary-600 font-medium">
                Step {currentStep}/3
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex flex-col justify-center flex-1">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-3">
                {getStepTitle()}
              </h1>
              <p className="text-gray-600">
                {currentStep === 1 && 'Tell us about yourself to get started'}
                {currentStep === 2 && 'Create a secure password for your account'}
                {currentStep === 3 && 'Verify your email address to complete registration'}
              </p>
            </div>

            {/* Form Content */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {currentStep === 1 && renderStep1()}
              {currentStep === 2 && renderStep2()}
              {currentStep === 3 && renderStep3()}

              {errors.general && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-sm text-red-600">{errors.general}</p>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="pt-6">
                {currentStep < 3 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="w-full flex items-center justify-center bg-primary-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-primary-700 transition-colors"
                  >
                    Next
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isVerifying}
                    className={`w-full px-6 py-2.5 rounded-lg font-medium transition-colors ${
                      isVerifying
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-primary-600 text-white hover:bg-primary-700'
                    }`}
                  >
                    {isVerifying ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Verifying...
                      </div>
                    ) : (
                      'Create Account'
                    )}
                  </button>
                )}
              </div>
            </form>

            {/* Login Link */}
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium">
                  Sign in
                </Link>
              </p>
            </div>

            {/* Footer */}
            <div className="mt-12 text-center">
              <p className="text-xs text-gray-500">
                © IDCertify.ai 2025. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Testimonial (Fixed Position) */}
      <div className="hidden lg:block lg:w-1/2 bg-primary-600 fixed right-0 top-0 h-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-700 to-primary-800"></div>
        
        <div className="relative z-10 flex flex-col justify-end items-center text-center px-24 py-20 text-white h-full">
          {/* Testimonial Image */}
          <div className="mb-6">
            <img
              src={testimonials[currentTestimonial].image}
              alt={testimonials[currentTestimonial].name}
              className="w-24 h-24 rounded-full object-cover border-4 border-white/20"
            />
          </div>

          {/* Testimonial Content */}
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-2">
              {testimonials[currentTestimonial].name}
            </h3>
            <p className="text-primary-200 mb-4 text-sm">
              {testimonials[currentTestimonial].title}
            </p>
            <div className="relative">
              <div className="text-4xl text-white/20 absolute -top-2 -left-2">"</div>
              <p className="text-sm leading-relaxed relative z-10">
                {testimonials[currentTestimonial].quote}
              </p>
              <div className="text-4xl text-white/20 absolute -bottom-2 -right-2">"</div>
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex space-x-2">
            {testimonials.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentTestimonial ? 'bg-white' : 'bg-white/30'
                }`}
              ></div>
            ))}
          </div>
        </div>

        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>
      </div>

      {/* Terms and Conditions Modal */}
      {showTermsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Terms and Conditions & Privacy Policy</h2>
              <button
                onClick={() => setShowTermsModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <div className="space-y-6">
                {/* Terms and Conditions */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Terms and Conditions</h3>
                  <div className="text-sm text-gray-600 space-y-3">
                    <p>
                      Welcome to IDCertify. By using our service, you agree to these terms and conditions.
                    </p>
                    <p>
                      <strong>1. Service Description:</strong> IDCertify provides identity verification and trust management services for individuals, organizations, and developers.
                    </p>
                    <p>
                      <strong>2. User Responsibilities:</strong> You are responsible for providing accurate information and maintaining the security of your account.
                    </p>
                    <p>
                      <strong>3. Prohibited Uses:</strong> You may not use our service for any illegal activities or to violate the rights of others.
                    </p>
                    <p>
                      <strong>4. Service Availability:</strong> We strive to maintain high availability but cannot guarantee uninterrupted service.
                    </p>
                    <p>
                      <strong>5. Termination:</strong> We reserve the right to terminate accounts that violate these terms.
                    </p>
                  </div>
                </div>

                {/* Privacy Policy */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Privacy Policy</h3>
                  <div className="text-sm text-gray-600 space-y-3">
                    <p>
                      Your privacy is important to us. This policy describes how we collect, use, and protect your information.
                    </p>
                    <p>
                      <strong>1. Information We Collect:</strong> We collect information you provide directly to us, including personal identification information and verification documents.
                    </p>
                    <p>
                      <strong>2. How We Use Information:</strong> We use your information to provide our services, verify your identity, and improve our platform.
                    </p>
                    <p>
                      <strong>3. Information Sharing:</strong> We do not sell your personal information. We may share information with third-party verification services as necessary to provide our services.
                    </p>
                    <p>
                      <strong>4. Data Security:</strong> We implement appropriate security measures to protect your personal information.
                    </p>
                    <p>
                      <strong>5. Your Rights:</strong> You have the right to access, correct, or delete your personal information.
                    </p>
                    <p>
                      <strong>6. Contact Us:</strong> If you have questions about this privacy policy, please contact us at privacy@idcertify.ai
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="acceptTerms"
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-primary-300 rounded-md"
                  />
                  <label htmlFor="acceptTerms" className="ml-2 text-sm text-gray-700">
                    I accept the terms and conditions
                  </label>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowTermsModal(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      if (acceptedTerms) {
                        setFormData(prev => ({ ...prev, agreeToTerms: true }))
                        setShowTermsModal(false)
                        setAcceptedTerms(false)
                      }
                    }}
                    disabled={!acceptedTerms}
                    className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                      acceptedTerms
                        ? 'bg-primary-600 text-white hover:bg-primary-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}




    </div>
  )
}

export default SignupPage

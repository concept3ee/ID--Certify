import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle } from 'lucide-react'

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate email
    if (!email.trim()) {
      setErrors({ email: 'Email is required' })
      return
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrors({ email: 'Please enter a valid email address' })
      return
    }

    // Simulate password reset request
    setIsSubmitted(true)
    setErrors({})
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

  return (
    <div className="min-h-screen flex">
      {/* Left Column - Forgot Password Form */}
      <div className="flex-1 flex flex-col px-8 py-12 bg-white overflow-y-auto lg:mr-[50%]">
        <div className="max-w-md mx-auto w-full">
          {/* Progress Indicator */}
          <div className="mb-8">
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-1 mb-4">
              <div 
                className="bg-primary-600 h-1 rounded-full transition-all duration-300"
                style={{ width: '100%' }}
              ></div>
            </div>
            
            {/* Step Counter and Back Button */}
            <div className="flex items-center justify-between">
              <Link 
                to="/login" 
                className="flex items-center text-primary-600 hover:text-primary-700 transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to login
              </Link>
              
              <div className="text-primary-600 font-medium">
                Reset password
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex flex-col justify-center flex-1">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-3">
                Forgot your password?
              </h1>
              <p className="text-gray-600">
                No worries! Enter your email address and we'll send you a link to reset your password.
              </p>
            </div>

            {!isSubmitted ? (
              /* Password Reset Form */
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      if (errors.email) {
                        setErrors({})
                      }
                    }}
                    className={`w-full px-3 py-2.5 border rounded-lg focus:outline-none focus:ring-0 focus:border-primary-500 transition-colors ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your email address"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary-600 text-white py-2.5 px-6 rounded-lg font-medium hover:bg-primary-700 transition-colors"
                >
                  Send Reset Link
                </button>
              </form>
            ) : (
              /* Success Message */
              <div className="text-center space-y-6">
                <div className="flex justify-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                </div>
                
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Check your email
                  </h2>
                  <p className="text-gray-600">
                    We've sent a password reset link to <strong>{email}</strong>
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">
                    Didn't receive the email? Check your spam folder or{' '}
                    <button 
                      onClick={() => setIsSubmitted(false)}
                      className="text-primary-600 hover:text-primary-700 font-medium"
                    >
                      try again
                    </button>
                  </p>
                </div>

                <Link
                  to="/login"
                  className="inline-block bg-primary-600 text-white py-2.5 px-6 rounded-lg font-medium hover:bg-primary-700 transition-colors"
                >
                  Back to Login
                </Link>
              </div>
            )}

            {/* Sign Up Link */}
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <Link to="/signup" className="text-primary-600 hover:text-primary-700 font-medium">
                  Sign up
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
    </div>
  )
}

export default ForgotPasswordPage

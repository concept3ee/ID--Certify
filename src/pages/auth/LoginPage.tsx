import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/store/store'
import { loginUser } from '@/store/slices/authSlice'
import { Eye, EyeOff } from 'lucide-react'

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userType: 'individual' as 'individual' | 'organisation' | 'developer' | 'admin',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate form
    const newErrors: Record<string, string> = {}
    if (!formData.email) newErrors.email = 'Email is required'
    if (!formData.password) newErrors.password = 'Password is required'
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    try {
      await dispatch(loginUser({ email: formData.email, password: formData.password, userType: formData.userType }))
      navigate(`/${formData.userType}`)
    } catch (error) {
      setErrors({ general: 'Invalid credentials' })
    }
  }

  const handleDemoLogin = async (userType: 'individual' | 'organisation' | 'developer' | 'admin') => {
    const demoEmails = {
      individual: 'demo@individual.com',
      organisation: 'demo@organisation.com',
      developer: 'demo@developer.com',
      admin: 'demo@admin.com'
    }
    
    try {
      await dispatch(loginUser({ 
        email: demoEmails[userType], 
        password: 'demo123', 
        userType 
      }))
      navigate(`/${userType}`)
    } catch (error) {
      setErrors({ general: 'Demo login failed' })
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

  return (
    <div className="min-h-screen flex">
      {/* Left Column - Login Form */}
      <div className="flex-1 flex flex-col px-8 py-12 bg-white overflow-y-auto lg:mr-[50%]">
        <div className="max-w-md mx-auto w-full">
          {/* Main Content */}
          <div className="flex flex-col justify-center flex-1">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-3">
                Welcome back
              </h1>
              <p className="text-gray-600">
                Sign in to your IDCertify account to continue managing your identity verification.
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
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
                    placeholder="Enter your password"
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

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600">
                    Remember me
                  </label>
                </div>
                <Link to="/forgot-password" className="text-sm text-primary-600 hover:text-primary-700">
                  Forgot password?
                </Link>
              </div>

              {errors.general && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-sm text-red-600">{errors.general}</p>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-primary-600 text-white py-2.5 px-6 rounded-lg font-medium hover:bg-primary-700 transition-colors"
              >
                Sign In
              </button>
            </form>

            {/* Demo Login Buttons */}
            <div className="mt-6">
              <p className="text-sm text-gray-600 text-center mb-4">Or try our demo accounts:</p>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleDemoLogin('individual')}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Individual Demo
                </button>
                <button
                  onClick={() => handleDemoLogin('organisation')}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Organisation Demo
                </button>
                <button
                  onClick={() => handleDemoLogin('developer')}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Developer Demo
                </button>
                <button
                  onClick={() => handleDemoLogin('admin')}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Admin Demo
                </button>
              </div>
            </div>

            {/* Sign Up Link */}
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <Link to="/signup" className="text-primary-600 hover:text-primary-700 font-medium">
                  Sign up
                </Link>
              </p>
            </div>

            {/* Alternative Login */}
            <div className="mt-6">
              <button className="w-full border-2 border-primary-600 text-primary-600 py-2.5 px-6 rounded-lg font-medium hover:bg-primary-50 transition-colors flex items-center justify-center">
                <div className="flex space-x-1 mr-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                </div>
                Login with Finclusion ID
              </button>
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

export default LoginPage

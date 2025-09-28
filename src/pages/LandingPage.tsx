import { Link } from 'react-router-dom'
import { 
  Shield, 
  UserCheck, 
  Building, 
  Code, 
  ArrowRight, 
  CheckCircle,
  BarChart3,
  FileText,
  CreditCard,
  Bell,
  Database,
  Globe,
  Activity,
  Users,
  Lock,
  Eye,
  Brain,
  MessageSquare
} from 'lucide-react'

const LandingPage = () => {
  const features = [
    {
      icon: Shield,
      title: 'Secure Identity Verification',
      description: 'End-to-end encrypted document storage with biometric authentication'
    },
    {
      icon: UserCheck,
      title: 'Multi-POV Support',
      description: 'Tailored experiences for individuals, organizations, developers, and admins'
    },
    {
      icon: Database,
      title: 'Biometric Biobank',
      description: 'Advanced biometric data management with uncompromising security'
    },
    {
      icon: BarChart3,
      title: 'Trust Score Engine',
      description: 'AI-powered trust scoring and reputation management'
    }
  ]

  const solutions = [
    {
      title: 'For Individuals',
      description: 'Secure your identity, manage documents, and build trust',
      icon: UserCheck,
      features: ['Document Verification', 'Trust Score', 'Secure Wallet', 'Notifications']
    },
    {
      title: 'For Organizations',
      description: 'Streamline employee verification and compliance management',
      icon: Building,
      features: ['Employee Verification', 'AML Compliance', 'Data Monitoring', 'Integrations']
    },
    {
      title: 'For Developers',
      description: 'Powerful APIs and tools for identity verification',
      icon: Code,
      features: ['API Management', 'Webhooks', 'Analytics', 'Documentation']
    },
    {
      title: 'For Admins',
      description: 'Complete platform oversight and management',
      icon: Users,
      features: ['User Management', 'Biobank Control', 'System Analytics', 'Security']
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Rainbow gradient bar at top */}
      <div className="h-1 bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500"></div>

      {/* Header */}
      <header className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <span className="ml-2 text-xl font-bold text-gray-900">IDCertify</span>
            </div>


            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</a>
              <a href="#solutions" className="text-gray-600 hover:text-gray-900 transition-colors">Solutions</a>
              <a href="#security" className="text-gray-600 hover:text-gray-900 transition-colors">Security</a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">Pricing</a>
            </nav>

            {/* CTA Buttons */}
            <div className="flex items-center space-x-4">
              <Link to="/login" className="text-gray-600 hover:text-gray-900 transition-colors">
                Sign In
              </Link>
              <Link 
                to="/signup" 
                className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Demo toggle */}
          <div className="inline-flex items-center bg-gray-100 rounded-full p-1 mb-8">
            <div className="bg-white rounded-full p-2 shadow-sm">
              <Shield className="h-4 w-4 text-primary-600" />
            </div>
            <span className="ml-2 text-sm text-gray-600">Live Demo</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            The identity verification platform
            <span className="text-primary-600"> for everyone</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            IDCertify is an all-in-one identity verification and trust platform. Verify, secure, and manage identities across every stage of digital transformation.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
            <Link 
              to="/signup" 
              className="bg-gray-900 text-white px-8 py-4 rounded-lg hover:bg-gray-800 transition-colors text-lg font-medium flex items-center"
            >
              Get started for free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>

          <p className="text-sm text-gray-500">
            No credit card required. Cancel anytime.
          </p>

        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Add anything, verify everything
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Verify identities, manage documents, and build trust across all your digital interactions. 
              Monitor everything in one secure, encrypted platform.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section id="solutions" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Solutions for every perspective
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Whether you're an individual, organization, developer, or administrator, 
              we have the tools you need to succeed.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {solutions.map((solution, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <solution.icon className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{solution.title}</h3>
                <p className="text-gray-600 mb-4">{solution.description}</p>
                <ul className="space-y-2">
                  {solution.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="h-4 w-4 text-primary-600 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section id="security" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Uncompromising Security, Radical Transparency
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your data is protected with enterprise-grade security and complete transparency.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Features</h3>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-600">
                  <Lock className="h-4 w-4 text-primary-600 mr-2" />
                  End-to-end encryption
                </li>
                <li className="flex items-center text-gray-600">
                  <Shield className="h-4 w-4 text-primary-600 mr-2" />
                  Two-factor authentication
                </li>
                <li className="flex items-center text-gray-600">
                  <UserCheck className="h-4 w-4 text-primary-600 mr-2" />
                  Biometric login
                </li>
                <li className="flex items-center text-gray-600">
                  <Eye className="h-4 w-4 text-primary-600 mr-2" />
                  Regular security audits
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="w-full h-32 bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg flex items-center justify-center mb-4">
                <div className="grid grid-cols-3 gap-1">
                  {[...Array(9)].map((_, i) => (
                    <div key={i} className="w-3 h-3 bg-primary-600 rounded-sm"></div>
                  ))}
                </div>
              </div>
              <p className="text-sm text-gray-600 text-center">
                Advanced encryption and secure data handling
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Privacy Controls</h3>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-600">
                  <Database className="h-4 w-4 text-primary-600 mr-2" />
                  Data export
                </li>
                <li className="flex items-center text-gray-600">
                  <UserCheck className="h-4 w-4 text-primary-600 mr-2" />
                  Account deletion
                </li>
                <li className="flex items-center text-gray-600">
                  <Eye className="h-4 w-4 text-primary-600 mr-2" />
                  Privacy policy
                </li>
                <li className="flex items-center text-gray-600">
                  <Shield className="h-4 w-4 text-primary-600 mr-2" />
                  GDPR compliance
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* AI Features Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              One more thing. And yes, it's AI.
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Ask anything, get intelligent insights, and optimize your verification processes.
            </p>
          </div>

          <div className="bg-gray-800 rounded-xl p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="bg-gray-700 rounded-lg p-4 mb-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <MessageSquare className="h-5 w-5 text-primary-400" />
                    <span className="text-sm text-gray-300">AI Assistant</span>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-gray-600 rounded p-3">
                      <p className="text-sm text-gray-300">"Analyze my verification patterns"</p>
                    </div>
                    <div className="bg-primary-600 rounded p-3">
                      <p className="text-sm text-white">"Based on your data, I recommend..."</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-700 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Smart Insights</h4>
                  <div className="space-y-2 text-sm text-gray-300">
                    <div className="flex justify-between">
                      <span>Verification Success Rate</span>
                      <span className="text-green-400">98.5%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Average Processing Time</span>
                      <span className="text-blue-400">2.3s</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Risk Score</span>
                      <span className="text-yellow-400">Low</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-700 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">AI Recommendations</h4>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li className="flex items-center">
                      <Brain className="h-4 w-4 text-primary-400 mr-2" />
                      Optimize verification workflow
                    </li>
                    <li className="flex items-center">
                      <Brain className="h-4 w-4 text-primary-400 mr-2" />
                      Reduce false positives by 15%
                    </li>
                    <li className="flex items-center">
                      <Brain className="h-4 w-4 text-primary-400 mr-2" />
                      Improve user experience
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Turn your identity verification into a sure thing
          </h2>
          <Link 
            to="/signup" 
            className="bg-gray-900 text-white px-8 py-4 rounded-lg hover:bg-gray-800 transition-colors text-lg font-medium inline-flex items-center"
          >
            Get started for free
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          <p className="text-sm text-gray-500 mt-4">
            No credit card required. Cancel anytime.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                <span className="ml-2 text-xl font-bold text-gray-900">IDCertify</span>
              </div>
              <p className="text-gray-600 text-sm">
                Secure identity verification and trust platform for everyone.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900">Features</a></li>
                <li><a href="#" className="hover:text-gray-900">Pricing</a></li>
                <li><a href="#" className="hover:text-gray-900">API</a></li>
                <li><a href="#" className="hover:text-gray-900">Documentation</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900">About</a></li>
                <li><a href="#" className="hover:text-gray-900">Blog</a></li>
                <li><a href="#" className="hover:text-gray-900">Careers</a></li>
                <li><a href="#" className="hover:text-gray-900">Contact</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-gray-900">Terms of Service</a></li>
                <li><a href="#" className="hover:text-gray-900">Security</a></li>
                <li><a href="#" className="hover:text-gray-900">Compliance</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
              <p className="text-sm text-gray-600">
                © 2024 IDCertify. All rights reserved.
              </p>
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-gray-600">
                <span className="sr-only">Twitter</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-600">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Rainbow gradient bar at bottom */}
      <div className="h-1 bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500"></div>
    </div>
  )
}

export default LandingPage

import { useState } from 'react'
import { 
  HelpCircle, 
  MessageCircle, 
  Phone, 
  Mail, 
  FileText, 
  Search, 
  ChevronDown,
  ChevronRight,
  BookOpen,
  Video,
  Download,
  ExternalLink,
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
  Send,
  User,
  Calendar,
  Tag
} from 'lucide-react'

interface FAQItem {
  id: string
  question: string
  answer: string
  category: string
  isExpanded: boolean
}

interface HelpArticle {
  id: string
  title: string
  description: string
  category: string
  readTime: string
  icon: React.ComponentType<{ className?: string }>
}

interface SupportTicket {
  id: string
  title: string
  description: string
  status: 'open' | 'in_progress' | 'resolved' | 'closed'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  category: string
  createdAt: string
  updatedAt: string
  assignedTo?: string
}

const Support = () => {
  const [activeTab, setActiveTab] = useState('help')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const faqItems: FAQItem[] = [
    {
      id: '1',
      question: 'How do I verify my identity?',
      answer: 'To verify your identity, go to the Verification section and follow the step-by-step process. You\'ll need to upload government-issued ID documents and complete biometric verification.',
      category: 'verification',
      isExpanded: false
    },
    {
      id: '2',
      question: 'What documents are accepted for verification?',
      answer: 'We accept government-issued IDs like National ID, Passport, Driver\'s License, and other official documents. All documents must be clear, unexpired, and match your profile information.',
      category: 'verification',
      isExpanded: false
    },
    {
      id: '3',
      question: 'How does the trust score work?',
      answer: 'Your trust score is calculated based on various factors including identity verification, document authenticity, activity consistency, and social verification. Higher scores indicate greater trustworthiness.',
      category: 'trust-score',
      isExpanded: false
    },
    {
      id: '4',
      question: 'Can I delete my account?',
      answer: 'Yes, you can delete your account from the Settings page. Please note that this action is irreversible and all your data will be permanently removed.',
      category: 'account',
      isExpanded: false
    },
    {
      id: '5',
      question: 'How secure is my data?',
      answer: 'Your data is protected with end-to-end encryption and follows industry best practices. We never share your personal information without your explicit consent.',
      category: 'security',
      isExpanded: false
    },
    {
      id: '6',
      question: 'What if I forgot my password?',
      answer: 'You can reset your password using the "Forgot Password" link on the login page. You\'ll receive a reset link via email.',
      category: 'account',
      isExpanded: false
    }
  ]

  const helpArticles: HelpArticle[] = [
    {
      id: '1',
      title: 'Getting Started with IDCertify',
      description: 'Learn the basics of setting up your account and completing your first verification.',
      category: 'getting-started',
      readTime: '5 min read',
      icon: BookOpen
    },
    {
      id: '2',
      title: 'Understanding Trust Scores',
      description: 'A comprehensive guide to how trust scores are calculated and improved.',
      category: 'trust-score',
      readTime: '8 min read',
      icon: FileText
    },
    {
      id: '3',
      title: 'Document Upload Guide',
      description: 'Step-by-step instructions for uploading and managing your documents securely.',
      category: 'documents',
      readTime: '6 min read',
      icon: Download
    },
    {
      id: '4',
      title: 'Security Best Practices',
      description: 'Essential security tips to keep your account and data safe.',
      category: 'security',
      readTime: '4 min read',
      icon: AlertCircle
    }
  ]

  const supportTickets: SupportTicket[] = [
    {
      id: '1',
      title: 'Verification Process Issue',
      description: 'Unable to complete identity verification process',
      status: 'in_progress',
      priority: 'high',
      category: 'verification',
      createdAt: '2024-01-20',
      updatedAt: '2024-01-21',
      assignedTo: 'Support Team'
    },
    {
      id: '2',
      title: 'Document Upload Problem',
      description: 'Documents not uploading properly',
      status: 'resolved',
      priority: 'medium',
      category: 'technical',
      createdAt: '2024-01-18',
      updatedAt: '2024-01-19'
    }
  ]

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'verification', name: 'Verification' },
    { id: 'trust-score', name: 'Trust Score' },
    { id: 'account', name: 'Account' },
    { id: 'security', name: 'Security' },
    { id: 'technical', name: 'Technical' }
  ]

  const filteredFAQ = faqItems.filter(item => {
    if (selectedCategory !== 'all' && item.category !== selectedCategory) return false
    if (searchTerm && !item.question.toLowerCase().includes(searchTerm.toLowerCase())) return false
    return true
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'text-blue-600 bg-blue-100'
      case 'in_progress':
        return 'text-yellow-600 bg-yellow-100'
      case 'resolved':
        return 'text-green-600 bg-green-100'
      case 'closed':
        return 'text-gray-600 bg-gray-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'text-red-600 bg-red-100'
      case 'high':
        return 'text-orange-600 bg-orange-100'
      case 'medium':
        return 'text-yellow-600 bg-yellow-100'
      case 'low':
        return 'text-green-600 bg-green-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const tabs = [
    { id: 'help', name: 'Help Center', icon: HelpCircle },
    { id: 'faq', name: 'FAQ', icon: FileText },
    { id: 'contact', name: 'Contact Us', icon: MessageCircle },
    { id: 'tickets', name: 'My Tickets', icon: BookOpen }
  ]

  const renderHelpCenter = () => (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search for help articles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card text-center p-6">
          <MessageCircle className="h-12 w-12 text-primary-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Live Chat</h3>
          <p className="text-gray-600 mb-4">Get instant help from our support team</p>
          <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
            Start Chat
          </button>
        </div>
        <div className="card text-center p-6">
          <Phone className="h-12 w-12 text-primary-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Call Us</h3>
          <p className="text-gray-600 mb-4">Speak directly with our support team</p>
          <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
            Call Now
          </button>
        </div>
        <div className="card text-center p-6">
          <Mail className="h-12 w-12 text-primary-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Support</h3>
          <p className="text-gray-600 mb-4">Send us a detailed message</p>
          <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
            Send Email
          </button>
        </div>
      </div>

      {/* Help Articles */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Help Articles</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {helpArticles.map((article) => (
            <div key={article.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-primary-100 rounded-lg">
                  <article.icon className="h-6 w-6 text-primary-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-2">{article.title}</h4>
                  <p className="text-gray-600 text-sm mb-3">{article.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{article.readTime}</span>
                    <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                      Read More
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderFAQ = () => (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search FAQ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* FAQ Items */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Frequently Asked Questions</h3>
        <div className="space-y-4">
          {filteredFAQ.map((item) => (
            <div key={item.id} className="border border-gray-200 rounded-lg">
              <button
                onClick={() => {
                  // Toggle expansion logic would go here
                }}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50"
              >
                <span className="font-medium text-gray-900">{item.question}</span>
                <ChevronDown className="h-5 w-5 text-gray-500" />
              </button>
              {item.isExpanded && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderContact = () => (
    <div className="space-y-6">
      {/* Contact Methods */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-primary-600" />
              <div>
                <p className="font-medium text-gray-900">Phone Support</p>
                <p className="text-gray-600">+234 801 234 5678</p>
                <p className="text-sm text-gray-500">Mon-Fri 9AM-6PM WAT</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-primary-600" />
              <div>
                <p className="font-medium text-gray-900">Email Support</p>
                <p className="text-gray-600">support@idcertify.com</p>
                <p className="text-sm text-gray-500">24/7 response</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <MessageCircle className="h-5 w-5 text-primary-600" />
              <div>
                <p className="font-medium text-gray-900">Live Chat</p>
                <p className="text-gray-600">Available 24/7</p>
                <p className="text-sm text-gray-500">Instant response</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Send us a Message</h3>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="What can we help you with?"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Describe your issue in detail..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center justify-center space-x-2"
            >
              <Send className="h-4 w-4" />
              <span>Send Message</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  )

  const renderTickets = () => (
    <div className="space-y-6">
      {/* Ticket Actions */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">My Support Tickets</h3>
        <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>New Ticket</span>
        </button>
      </div>

      {/* Tickets List */}
      <div className="card">
        <div className="space-y-4">
          {supportTickets.map((ticket) => (
            <div key={ticket.id} className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="font-semibold text-gray-900">{ticket.title}</h4>
                  <p className="text-sm text-gray-600">{ticket.description}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                    {ticket.status.replace('_', ' ').toUpperCase()}
                  </span>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                    {ticket.priority.toUpperCase()}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Category</p>
                  <p className="font-medium">{ticket.category}</p>
                </div>
                <div>
                  <p className="text-gray-600">Created</p>
                  <p className="font-medium">{ticket.createdAt}</p>
                </div>
                <div>
                  <p className="text-gray-600">Updated</p>
                  <p className="font-medium">{ticket.updatedAt}</p>
                </div>
                <div>
                  <p className="text-gray-600">Assigned To</p>
                  <p className="font-medium">{ticket.assignedTo || 'Unassigned'}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Support</h1>
          <p className="text-gray-600">Get help and support for your IDCertify account</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              <span>{tab.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'help' && renderHelpCenter()}
        {activeTab === 'faq' && renderFAQ()}
        {activeTab === 'contact' && renderContact()}
        {activeTab === 'tickets' && renderTickets()}
      </div>
    </div>
  )
}

export default Support

import { useState } from 'react'
import { 
  MessageSquare, 
  MessageCircle, 
  Bell, 
  Mail, 
  Users, 
  Search, 
  Send, 
  Paperclip, 
  Smile, 
  MoreVertical,
  Phone,
  Video,
  Info,
  Settings,
  Archive,
  Star,
  Pin,
  Hash,
  AtSign,
  Clock,
  CheckCircle,
  AlertCircle,
  UserPlus,
  Shield,
  Zap,
  Ticket,
  Filter,
  SortAsc,
  Eye,
  Edit,
  Trash2,
  Plus,
  Tag,
  User,
  Calendar,
  TrendingUp,
  FileText,
  Download,
  Upload,
  RefreshCw,
  X,
  ChevronDown,
  ChevronRight,
  CreditCard
} from 'lucide-react'

// Support Ticket Interfaces
interface SupportTicket {
  id: string
  ticketNumber: string
  customerName: string
  customerEmail: string
  subject: string
  description: string
  priority: 'low' | 'medium' | 'high' | 'urgent'
  status: 'open' | 'in-progress' | 'pending' | 'resolved' | 'closed'
  category: 'technical' | 'billing' | 'verification' | 'general' | 'bug'
  assignedTo?: string
  assignedAgent?: string
  createdAt: string
  updatedAt: string
  lastMessage?: string
  lastMessageTime?: string
  messages: SupportMessage[]
  tags: string[]
  attachments?: string[]
}

interface SupportMessage {
  id: string
  ticketId: string
  senderId: string
  senderName: string
  senderType: 'customer' | 'agent' | 'system'
  content: string
  timestamp: string
  isRead: boolean
  attachments?: string[]
}

interface Customer {
  id: string
  name: string
  email: string
  phone?: string
  company?: string
  avatar?: string
  status: 'active' | 'inactive' | 'blocked'
  totalTickets: number
  openTickets: number
  lastContact: string
  satisfaction: number
}

interface SupportAgent {
  id: string
  name: string
  email: string
  avatar: string
  role: 'agent' | 'senior' | 'supervisor'
  status: 'online' | 'away' | 'busy' | 'offline'
  activeTickets: number
  resolvedToday: number
  averageResponseTime: number
  satisfaction: number
}

const ChatSupport = () => {
  // Support System State
  const [supportTab, setSupportTab] = useState<'tickets' | 'customers' | 'agents' | 'analytics'>('tickets')
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null)
  const [ticketFilter, setTicketFilter] = useState<'all' | 'open' | 'in-progress' | 'pending' | 'resolved'>('all')
  const [ticketPriority, setTicketPriority] = useState<'all' | 'low' | 'medium' | 'high' | 'urgent'>('all')
  const [showNewTicket, setShowNewTicket] = useState(false)
  const [supportMessage, setSupportMessage] = useState('')

  // Mock data for support tickets
  const supportTickets: SupportTicket[] = [
    {
      id: '1',
      ticketNumber: 'TKT-2024-001',
      customerName: 'John Smith',
      customerEmail: 'john.smith@company.com',
      subject: 'Verification process not working',
      description: 'I\'m unable to complete the verification process. The system keeps showing an error message.',
      priority: 'high',
      status: 'in-progress',
      category: 'technical',
      assignedTo: '2',
      assignedAgent: 'Michael Chen',
      createdAt: '2024-01-20T09:30:00Z',
      updatedAt: '2024-01-20T14:15:00Z',
      lastMessage: 'We\'re investigating the issue and will update you shortly.',
      lastMessageTime: '2 hours ago',
      messages: [
        {
          id: '1',
          ticketId: '1',
          senderId: 'customer',
          senderName: 'John Smith',
          senderType: 'customer',
          content: 'I\'m unable to complete the verification process. The system keeps showing an error message.',
          timestamp: '2024-01-20T09:30:00Z',
          isRead: true
        },
        {
          id: '2',
          ticketId: '1',
          senderId: '2',
          senderName: 'Michael Chen',
          senderType: 'agent',
          content: 'Thank you for contacting us. I\'ve received your ticket and I\'m looking into this issue.',
          timestamp: '2024-01-20T10:15:00Z',
          isRead: true
        },
        {
          id: '3',
          ticketId: '1',
          senderId: '2',
          senderName: 'Michael Chen',
          senderType: 'agent',
          content: 'We\'re investigating the issue and will update you shortly.',
          timestamp: '2024-01-20T14:15:00Z',
          isRead: false
        }
      ],
      tags: ['verification', 'error', 'urgent']
    },
    {
      id: '2',
      ticketNumber: 'TKT-2024-002',
      customerName: 'Sarah Johnson',
      customerEmail: 'sarah.j@business.com',
      subject: 'Billing inquiry',
      description: 'I have a question about my recent invoice and payment method.',
      priority: 'medium',
      status: 'open',
      category: 'billing',
      assignedTo: '3',
      assignedAgent: 'Emily Davis',
      createdAt: '2024-01-20T11:45:00Z',
      updatedAt: '2024-01-20T11:45:00Z',
      lastMessage: 'I have a question about my recent invoice and payment method.',
      lastMessageTime: '3 hours ago',
      messages: [
        {
          id: '4',
          ticketId: '2',
          senderId: 'customer',
          senderName: 'Sarah Johnson',
          senderType: 'customer',
          content: 'I have a question about my recent invoice and payment method.',
          timestamp: '2024-01-20T11:45:00Z',
          isRead: true
        }
      ],
      tags: ['billing', 'invoice']
    },
    {
      id: '3',
      ticketNumber: 'TKT-2024-003',
      customerName: 'David Wilson',
      customerEmail: 'david.w@enterprise.com',
      subject: 'Feature request',
      description: 'Would it be possible to add bulk verification functionality?',
      priority: 'low',
      status: 'pending',
      category: 'general',
      assignedTo: '1',
      assignedAgent: 'Sarah Johnson',
      createdAt: '2024-01-19T16:20:00Z',
      updatedAt: '2024-01-20T08:30:00Z',
      lastMessage: 'This is a great suggestion! I\'ll forward it to our product team.',
      lastMessageTime: '1 day ago',
      messages: [
        {
          id: '5',
          ticketId: '3',
          senderId: 'customer',
          senderName: 'David Wilson',
          senderType: 'customer',
          content: 'Would it be possible to add bulk verification functionality?',
          timestamp: '2024-01-19T16:20:00Z',
          isRead: true
        },
        {
          id: '6',
          ticketId: '3',
          senderId: '1',
          senderName: 'Sarah Johnson',
          senderType: 'agent',
          content: 'This is a great suggestion! I\'ll forward it to our product team.',
          timestamp: '2024-01-20T08:30:00Z',
          isRead: true
        }
      ],
      tags: ['feature-request', 'bulk-verification']
    }
  ]

  // Mock data for customers
  const customers: Customer[] = [
    {
      id: '1',
      name: 'John Smith',
      email: 'john.smith@company.com',
      phone: '+1-555-0123',
      company: 'TechCorp Solutions',
      status: 'active',
      totalTickets: 5,
      openTickets: 1,
      lastContact: '2 hours ago',
      satisfaction: 4.5
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah.j@business.com',
      phone: '+1-555-0456',
      company: 'Business Inc',
      status: 'active',
      totalTickets: 3,
      openTickets: 1,
      lastContact: '3 hours ago',
      satisfaction: 4.8
    },
    {
      id: '3',
      name: 'David Wilson',
      email: 'david.w@enterprise.com',
      phone: '+1-555-0789',
      company: 'Enterprise Corp',
      status: 'active',
      totalTickets: 8,
      openTickets: 0,
      lastContact: '1 day ago',
      satisfaction: 4.2
    }
  ]

  // Mock data for support agents
  const supportAgents: SupportAgent[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@techcorp.com',
      avatar: '/avatars/sarah.jpg',
      role: 'supervisor',
      status: 'online',
      activeTickets: 3,
      resolvedToday: 8,
      averageResponseTime: 15,
      satisfaction: 4.9
    },
    {
      id: '2',
      name: 'Michael Chen',
      email: 'michael.chen@techcorp.com',
      avatar: '/avatars/michael.jpg',
      role: 'senior',
      status: 'busy',
      activeTickets: 5,
      resolvedToday: 6,
      averageResponseTime: 12,
      satisfaction: 4.7
    },
    {
      id: '3',
      name: 'Emily Davis',
      email: 'emily.davis@techcorp.com',
      avatar: '/avatars/emily.jpg',
      role: 'agent',
      status: 'online',
      activeTickets: 2,
      resolvedToday: 4,
      averageResponseTime: 18,
      satisfaction: 4.6
    }
  ]

  // Support System Helper Functions
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800 border-red-200'
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'low': return 'bg-green-100 text-green-800 border-green-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'in-progress': return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'resolved': return 'bg-green-100 text-green-800 border-green-200'
      case 'closed': return 'bg-gray-100 text-gray-800 border-gray-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'technical': return <Settings className="w-4 h-4" />
      case 'billing': return <CreditCard className="w-4 h-4" />
      case 'verification': return <Shield className="w-4 h-4" />
      case 'general': return <MessageSquare className="w-4 h-4" />
      case 'bug': return <AlertCircle className="w-4 h-4" />
      default: return <FileText className="w-4 h-4" />
    }
  }

  const filteredTickets = supportTickets.filter(ticket => {
    const statusMatch = ticketFilter === 'all' || ticket.status === ticketFilter
    const priorityMatch = ticketPriority === 'all' || ticket.priority === ticketPriority
    return statusMatch && priorityMatch
  })

  const selectedTicketData = supportTickets.find(ticket => ticket.id === selectedTicket)

  return (
    <div className="w-full h-full flex flex-col">
      {/* Support Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Customer Support</h3>
            <p className="text-sm text-gray-600">Manage customer inquiries and support tickets</p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowNewTicket(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>New Ticket</span>
            </button>
            <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 flex items-center space-x-2">
              <RefreshCw className="w-4 h-4" />
              <span>Refresh</span>
            </button>
          </div>
        </div>
      </div>

      {/* Support Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="flex space-x-8 px-4">
          {[
            { id: 'tickets', label: 'Tickets', count: supportTickets.length },
            { id: 'customers', label: 'Customers', count: customers.length },
            { id: 'agents', label: 'Agents', count: supportAgents.length },
            { id: 'analytics', label: 'Analytics', count: null }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSupportTab(tab.id as any)}
              className={`py-4 px-2 border-b-2 font-medium text-sm ${
                supportTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
              {tab.count !== null && (
                <span className="ml-2 bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Support Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Support Sidebar */}
        <div className="w-1/3 bg-white border-r border-gray-200 flex flex-col">
          {supportTab === 'tickets' && (
            <>
              {/* Ticket Filters */}
              <div className="p-4 border-b border-gray-200">
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <select
                      value={ticketFilter}
                      onChange={(e) => setTicketFilter(e.target.value as any)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="all">All Status</option>
                      <option value="open">Open</option>
                      <option value="in-progress">In Progress</option>
                      <option value="pending">Pending</option>
                      <option value="resolved">Resolved</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                    <select
                      value={ticketPriority}
                      onChange={(e) => setTicketPriority(e.target.value as any)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="all">All Priority</option>
                      <option value="urgent">Urgent</option>
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Ticket List */}
              <div className="flex-1 overflow-y-auto">
                {filteredTickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    onClick={() => setSelectedTicket(ticket.id)}
                    className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                      selectedTicket === ticket.id ? 'bg-blue-50 border-blue-200' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 text-sm">{ticket.subject}</h4>
                        <p className="text-xs text-gray-600 mt-1">{ticket.customerName}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(ticket.priority)}`}>
                          {ticket.priority}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(ticket.status)}`}>
                        {ticket.status}
                      </span>
                      <span className="text-xs text-gray-500">{ticket.lastMessageTime}</span>
                    </div>
                    {ticket.lastMessage && (
                      <p className="text-xs text-gray-600 mt-2 truncate">{ticket.lastMessage}</p>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}

          {supportTab === 'customers' && (
            <div className="flex-1 overflow-y-auto">
              {customers.map((customer) => (
                <div key={customer.id} className="p-4 border-b border-gray-100 hover:bg-gray-50">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 text-sm">{customer.name}</h4>
                      <p className="text-xs text-gray-600">{customer.company}</p>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-xs text-gray-500">{customer.openTickets} open</span>
                        <span className="text-xs text-gray-500">★ {customer.satisfaction}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {supportTab === 'agents' && (
            <div className="flex-1 overflow-y-auto">
              {supportAgents.map((agent) => (
                <div key={agent.id} className="p-4 border-b border-gray-100 hover:bg-gray-50">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-gray-600" />
                      </div>
                      <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(agent.status)}`}></div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 text-sm">{agent.name}</h4>
                      <p className="text-xs text-gray-600 capitalize">{agent.role}</p>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-xs text-gray-500">{agent.activeTickets} active</span>
                        <span className="text-xs text-gray-500">{agent.resolvedToday} resolved</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {supportTab === 'analytics' && (
            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Today's Stats</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-blue-700">New Tickets</p>
                      <p className="text-2xl font-bold text-blue-900">12</p>
                    </div>
                    <div>
                      <p className="text-blue-700">Resolved</p>
                      <p className="text-2xl font-bold text-blue-900">18</p>
                    </div>
                  </div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-medium text-green-900 mb-2">Response Time</h4>
                  <p className="text-2xl font-bold text-green-900">14 min</p>
                  <p className="text-sm text-green-700">Average</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-medium text-purple-900 mb-2">Satisfaction</h4>
                  <p className="text-2xl font-bold text-purple-900">4.7</p>
                  <p className="text-sm text-purple-700">Out of 5</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Support Main Content */}
        <div className="flex-1 flex flex-col">
          {selectedTicketData && supportTab === 'tickets' ? (
            <>
              {/* Ticket Header */}
              <div className="bg-white border-b border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{selectedTicketData.subject}</h3>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-sm text-gray-600">#{selectedTicketData.ticketNumber}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(selectedTicketData.priority)}`}>
                        {selectedTicketData.priority}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(selectedTicketData.status)}`}>
                        {selectedTicketData.status}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Ticket Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {selectedTicketData.messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.senderType === 'customer' ? 'justify-start' : 'justify-end'}`}>
                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      msg.senderType === 'customer' 
                        ? 'bg-gray-100 text-gray-900' 
                        : 'bg-blue-600 text-white'
                    }`}>
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-xs font-medium">{msg.senderName}</span>
                        <span className="text-xs opacity-75">{new Date(msg.timestamp).toLocaleTimeString()}</span>
                      </div>
                      <p className="text-sm">{msg.content}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="bg-white border-t border-gray-200 p-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={supportMessage}
                    onChange={(e) => setSupportMessage(e.target.value)}
                    placeholder="Type your response..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button className="p-2 text-gray-400 hover:text-gray-600">
                    <Paperclip className="w-4 h-4" />
                  </button>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  {supportTab === 'tickets' ? 'Select a ticket to view details' : 
                   supportTab === 'customers' ? 'Customer Management' :
                   supportTab === 'agents' ? 'Agent Dashboard' : 'Analytics Dashboard'}
                </h4>
                <p className="text-gray-600">
                  {supportTab === 'tickets' ? 'Choose a ticket from the sidebar to start a conversation' :
                   supportTab === 'customers' ? 'Manage customer relationships and support history' :
                   supportTab === 'agents' ? 'Monitor agent performance and workload' : 'View support metrics and insights'}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ChatSupport

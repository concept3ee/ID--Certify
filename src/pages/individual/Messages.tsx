import React, { useState } from 'react'
import { 
  MessageSquare, 
  Search, 
  Filter, 
  MoreVertical, 
  Send, 
  Paperclip, 
  Smile, 
  Phone, 
  Video, 
  Info,
  CheckCircle,
  Clock,
  User,
  Users,
  Shield,
  FileText,
  AlertCircle
} from 'lucide-react'

interface Message {
  id: string
  senderId: string
  senderName: string
  senderAvatar: string
  senderType: 'user' | 'support' | 'verification' | 'system'
  content: string
  timestamp: string
  isRead: boolean
  messageType: 'text' | 'file' | 'image' | 'system'
  attachments?: Array<{
    id: string
    name: string
    type: string
    size: string
    url: string
  }>
}

interface Conversation {
  id: string
  participantId: string
  participantName: string
  participantAvatar: string
  participantType: 'support' | 'verification' | 'system'
  lastMessage: string
  lastMessageTime: string
  unreadCount: number
  isOnline: boolean
  status: 'active' | 'resolved' | 'pending'
  category: 'support' | 'verification' | 'billing' | 'general'
}

const Messages = () => {
  const [conversations] = useState<Conversation[]>([
    {
      id: '1',
      participantId: 'support-1',
      participantName: 'Support Team',
      participantAvatar: '🆘',
      participantType: 'support',
      lastMessage: 'How can we help you today?',
      lastMessageTime: '2 min ago',
      unreadCount: 1,
      isOnline: true,
      status: 'active',
      category: 'support'
    },
    {
      id: '2',
      participantId: 'verification-1',
      participantName: 'Verification Team',
      participantAvatar: '✅',
      participantType: 'verification',
      lastMessage: 'Your documents have been reviewed and approved.',
      lastMessageTime: '1 hour ago',
      unreadCount: 0,
      isOnline: true,
      status: 'resolved',
      category: 'verification'
    },
    {
      id: '3',
      participantId: 'billing-1',
      participantName: 'Billing Team',
      participantAvatar: '💰',
      participantType: 'support',
      lastMessage: 'Your invoice has been generated for this month.',
      lastMessageTime: '3 hours ago',
      unreadCount: 0,
      isOnline: false,
      status: 'active',
      category: 'billing'
    },
    {
      id: '4',
      participantId: 'system-1',
      participantName: 'System Notifications',
      participantAvatar: '🔔',
      participantType: 'system',
      lastMessage: 'Your account security has been updated.',
      lastMessageTime: '1 day ago',
      unreadCount: 0,
      isOnline: false,
      status: 'resolved',
      category: 'general'
    }
  ])

  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(conversations[0])
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      senderId: 'support-1',
      senderName: 'Support Team',
      senderAvatar: '🆘',
      senderType: 'support',
      content: 'Hello! Welcome to ID Certify. How can we help you today?',
      timestamp: '2024-01-20T10:00:00Z',
      isRead: true,
      messageType: 'text'
    },
    {
      id: '2',
      senderId: 'user-1',
      senderName: 'You',
      senderAvatar: '👤',
      senderType: 'user',
      content: 'Hi! I have a question about my verification process.',
      timestamp: '2024-01-20T10:02:00Z',
      isRead: true,
      messageType: 'text'
    },
    {
      id: '3',
      senderId: 'support-1',
      senderName: 'Support Team',
      senderAvatar: '🆘',
      senderType: 'support',
      content: 'Of course! I\'d be happy to help. What specific question do you have about your verification?',
      timestamp: '2024-01-20T10:03:00Z',
      isRead: true,
      messageType: 'text'
    },
    {
      id: '4',
      senderId: 'support-1',
      senderName: 'Support Team',
      senderAvatar: '🆘',
      senderType: 'support',
      content: 'How can we help you today?',
      timestamp: '2024-01-20T10:30:00Z',
      isRead: false,
      messageType: 'text'
    }
  ])

  const [newMessage, setNewMessage] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState('all')
  const [showFilters, setShowFilters] = useState(false)

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedConversation) {
      const message: Message = {
        id: Date.now().toString(),
        senderId: 'user-1',
        senderName: 'You',
        senderAvatar: '👤',
        senderType: 'user',
        content: newMessage.trim(),
        timestamp: new Date().toISOString(),
        isRead: false,
        messageType: 'text'
      }
      
      setMessages(prev => [...prev, message])
      setNewMessage('')
      
      // Simulate response after 2 seconds
      setTimeout(() => {
        const response: Message = {
          id: (Date.now() + 1).toString(),
          senderId: selectedConversation.participantId,
          senderName: selectedConversation.participantName,
          senderAvatar: selectedConversation.participantAvatar,
          senderType: selectedConversation.participantType,
          content: 'Thank you for your message. We\'ll get back to you shortly.',
          timestamp: new Date().toISOString(),
          isRead: false,
          messageType: 'text'
        }
        setMessages(prev => [...prev, response])
      }, 2000)
    }
  }

  const handleConversationSelect = (conversation: Conversation) => {
    setSelectedConversation(conversation)
    // Mark messages as read
    setMessages(prev => prev.map(msg => ({ ...msg, isRead: true })))
  }

  const getFilteredConversations = () => {
    let filtered = conversations
    
    if (activeFilter !== 'all') {
      filtered = filtered.filter(conv => conv.category === activeFilter)
    }
    
    if (searchQuery) {
      filtered = filtered.filter(conv => 
        conv.participantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    
    return filtered
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'resolved': return 'bg-blue-100 text-blue-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'support': return <MessageSquare className="h-4 w-4" />
      case 'verification': return <CheckCircle className="h-4 w-4" />
      case 'billing': return <FileText className="h-4 w-4" />
      case 'general': return <Info className="h-4 w-4" />
      default: return <MessageSquare className="h-4 w-4" />
    }
  }

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor(diffInHours * 60)
      return `${diffInMinutes} min ago`
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)} hour${Math.floor(diffInHours) === 1 ? '' : 's'} ago`
    } else {
      return date.toLocaleDateString()
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="h-screen bg-gray-50 flex">
      {/* Left Sidebar - Conversations */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900">Messages</h1>
          <p className="text-sm text-gray-600">Stay connected with our teams</p>
        </div>

        {/* Search and Filters */}
        <div className="p-4 border-b border-gray-200">
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900"
            >
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </button>
            
            {showFilters && (
              <div className="flex space-x-2">
                {['all', 'support', 'verification', 'billing', 'general'].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-3 py-1 text-xs rounded-full ${
                      activeFilter === filter
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {filter.charAt(0).toUpperCase() + filter.slice(1)}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto">
          {getFilteredConversations().map((conversation) => (
            <div
              key={conversation.id}
              onClick={() => handleConversationSelect(conversation)}
              className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                selectedConversation?.id === conversation.id ? 'bg-blue-50 border-blue-200' : ''
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-xl">
                    {conversation.participantAvatar}
                  </div>
                  {conversation.isOnline && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-sm font-medium text-gray-900 truncate">
                      {conversation.participantName}
                    </h3>
                    <span className="text-xs text-gray-500">
                      {formatTime(conversation.lastMessageTime)}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600 truncate flex-1">
                      {conversation.lastMessage}
                    </p>
                    
                    <div className="flex items-center space-x-2 ml-2">
                      {conversation.unreadCount > 0 && (
                        <span className="bg-blue-600 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                          {conversation.unreadCount}
                        </span>
                      )}
                      
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(conversation.status)}`}>
                        {conversation.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Side - Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="bg-white border-b border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-lg">
                    {selectedConversation.participantAvatar}
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      {selectedConversation.participantName}
                    </h2>
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(selectedConversation.status)}`}>
                        {selectedConversation.status}
                      </span>
                      <span className="text-sm text-gray-500">
                        {selectedConversation.isOnline ? 'Online' : 'Offline'}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
                    <Phone className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
                    <Video className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
                    <MoreVertical className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.senderType === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs lg:max-w-md ${message.senderType === 'user' ? 'order-2' : 'order-1'}`}>
                    {message.senderType !== 'user' && (
                      <div className="flex items-center space-x-2 mb-1">
                        <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-sm">
                          {message.senderAvatar}
                        </div>
                        <span className="text-xs text-gray-500">{message.senderName}</span>
                      </div>
                    )}
                    
                    <div className={`rounded-lg px-4 py-2 ${
                      message.senderType === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-900'
                    }`}>
                      <p className="text-sm">{message.content}</p>
                      <div className={`text-xs mt-1 ${
                        message.senderType === 'user' ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {formatTime(message.timestamp)}
                        {message.senderType === 'user' && (
                          <span className="ml-2">
                            {message.isRead ? '✓✓' : '✓'}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="bg-white border-t border-gray-200 p-4">
              <div className="flex items-center space-x-3">
                <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
                  <Paperclip className="h-4 w-4" />
                </button>
                <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
                  <Smile className="h-4 w-4" />
                </button>
                
                <div className="flex-1">
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    rows={1}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>
                
                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </>
        ) : (
          /* Empty State */
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageSquare className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Select a conversation</h3>
              <p className="text-gray-500">Choose a conversation from the list to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Messages

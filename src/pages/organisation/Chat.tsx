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
  Zap
} from 'lucide-react'

// Chat Interfaces
interface ChatMessage {
  id: string
  senderId: string
  senderName: string
  senderAvatar: string
  content: string
  timestamp: string
  type: 'text' | 'image' | 'file' | 'system'
  isRead: boolean
  isEdited?: boolean
  reactions?: { emoji: string; users: string[] }[]
  replyTo?: string
}

interface ChatChannel {
  id: string
  name: string
  type: 'direct' | 'group' | 'channel'
  description?: string
  members: number
  isOnline: boolean
  lastMessage?: string
  lastMessageTime?: string
  unreadCount: number
  isPinned: boolean
  isMuted: boolean
  avatar?: string
}

interface TeamMember {
  id: string
  name: string
  email: string
  avatar: string
  role: string
  status: 'online' | 'away' | 'busy' | 'offline'
  lastSeen?: string
  isTyping?: boolean
}


const Chat = () => {
  const [activeTab, setActiveTab] = useState<'team' | 'support' | 'notifications' | 'email'>('team')
  const [selectedChannel, setSelectedChannel] = useState<string>('general')
  const [message, setMessage] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  

  // Mock data for team members
  const teamMembers: TeamMember[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@techcorp.com',
      avatar: '/avatars/sarah.jpg',
      role: 'Verification Manager',
      status: 'online',
      lastSeen: 'now'
    },
    {
      id: '2',
      name: 'Michael Chen',
      email: 'michael.chen@techcorp.com',
      avatar: '/avatars/michael.jpg',
      role: 'Compliance Officer',
      status: 'away',
      lastSeen: '5 minutes ago'
    },
    {
      id: '3',
      name: 'Emily Davis',
      email: 'emily.davis@techcorp.com',
      avatar: '/avatars/emily.jpg',
      role: 'Customer Support Lead',
      status: 'busy',
      lastSeen: '1 hour ago'
    },
    {
      id: '4',
      name: 'David Wilson',
      email: 'david.wilson@techcorp.com',
      avatar: '/avatars/david.jpg',
      role: 'Technical Lead',
      status: 'offline',
      lastSeen: '2 hours ago'
    }
  ]


  // Mock data for channels
  const channels: ChatChannel[] = [
    {
      id: 'general',
      name: 'General',
      type: 'channel',
      description: 'General team discussions',
      members: 12,
      isOnline: true,
      lastMessage: 'The new verification system is working great!',
      lastMessageTime: '2 minutes ago',
      unreadCount: 3,
      isPinned: true,
      isMuted: false
    },
    {
      id: 'verification-team',
      name: 'Verification Team',
      type: 'group',
      description: 'Verification team coordination',
      members: 8,
      isOnline: true,
      lastMessage: 'Sarah: Can someone review the new candidate?',
      lastMessageTime: '15 minutes ago',
      unreadCount: 1,
      isPinned: true,
      isMuted: false
    },
    {
      id: 'compliance',
      name: 'Compliance',
      type: 'channel',
      description: 'Compliance and regulatory updates',
      members: 6,
      isOnline: false,
      lastMessage: 'New AML regulations effective next month',
      lastMessageTime: '1 hour ago',
      unreadCount: 0,
      isPinned: false,
      isMuted: false
    },
    {
      id: 'support',
      name: 'Customer Support',
      type: 'group',
      description: 'Customer support coordination',
      members: 5,
      isOnline: true,
      lastMessage: 'Emily: Resolved the payment issue for client #1234',
      lastMessageTime: '30 minutes ago',
      unreadCount: 2,
      isPinned: false,
      isMuted: false
    }
  ]

  // Mock data for messages
  const messages: ChatMessage[] = [
    {
      id: '1',
      senderId: '1',
      senderName: 'Sarah Johnson',
      senderAvatar: '/avatars/sarah.jpg',
      content: 'Good morning team! The new verification system is working great. We\'ve processed 50+ verifications today.',
      timestamp: '10:30 AM',
      type: 'text',
      isRead: true,
      reactions: [
        { emoji: '👍', users: ['2', '3'] },
        { emoji: '🎉', users: ['4'] }
      ]
    },
    {
      id: '2',
      senderId: '2',
      senderName: 'Michael Chen',
      senderAvatar: '/avatars/michael.jpg',
      content: 'That\'s excellent news! The compliance checks are also running smoothly.',
      timestamp: '10:32 AM',
      type: 'text',
      isRead: true
    },
    {
      id: '3',
      senderId: '3',
      senderName: 'Emily Davis',
      senderAvatar: '/avatars/emily.jpg',
      content: 'I\'ve noticed a few customer inquiries about the new process. Should we create a FAQ document?',
      timestamp: '10:35 AM',
      type: 'text',
      isRead: true,
      replyTo: '1'
    },
    {
      id: '4',
      senderId: '1',
      senderName: 'Sarah Johnson',
      senderAvatar: '/avatars/sarah.jpg',
      content: 'Great idea Emily! I\'ll work on that today.',
      timestamp: '10:36 AM',
      type: 'text',
      isRead: false
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500'
      case 'away': return 'bg-yellow-500'
      case 'busy': return 'bg-red-500'
      case 'offline': return 'bg-gray-400'
      default: return 'bg-gray-400'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'online': return 'Online'
      case 'away': return 'Away'
      case 'busy': return 'Busy'
      case 'offline': return 'Offline'
      default: return 'Unknown'
    }
  }


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Debug Header */}
      <div className="bg-green-500 text-white p-2 text-center text-sm">
        ✅ Chat Component is Rendering - Active Tab: {activeTab}
      </div>
      
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Chat & Communication</h1>
              <p className="text-gray-600 mt-1">Team collaboration and customer communication tools</p>
            </div>
            <div className="flex items-center space-x-3">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2">
                <UserPlus className="w-4 h-4" />
                <span>Invite Members</span>
              </button>
              <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 flex items-center space-x-2">
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6">
          <nav className="flex space-x-8">
            {[
              { id: 'team', name: 'Team Chat', icon: MessageSquare },
              { id: 'support', name: 'Customer Support', icon: MessageCircle },
              { id: 'notifications', name: 'Notifications', icon: Bell },
              { id: 'email', name: 'Email Integration', icon: Mail }
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

      <div className="flex h-[calc(100vh-140px)]">
        {/* Team Chat Tab */}
        {activeTab === 'team' && (
          <div className="flex w-full">
            {/* Sidebar */}
            <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
              {/* Search */}
              <div className="p-4 border-b border-gray-200">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search conversations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Channels */}
              <div className="flex-1 overflow-y-auto">
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                    Channels
                  </h3>
                  <div className="space-y-1">
                    {channels.map((channel) => (
                      <button
                        key={channel.id}
                        onClick={() => setSelectedChannel(channel.id)}
                        className={`w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 ${
                          selectedChannel === channel.id ? 'bg-blue-50 border border-blue-200' : ''
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="relative">
                            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                              {channel.type === 'channel' ? (
                                <Hash className="w-5 h-5 text-gray-600" />
                              ) : (
                                <Users className="w-5 h-5 text-gray-600" />
                              )}
                            </div>
                            {channel.isOnline && (
                              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                            )}
                          </div>
                          <div className="text-left">
                            <div className="flex items-center space-x-2">
                              <span className="font-medium text-gray-900">{channel.name}</span>
                              {channel.isPinned && <Pin className="w-3 h-3 text-gray-400" />}
                            </div>
                            <p className="text-sm text-gray-500 truncate max-w-40">
                              {channel.lastMessage}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          {channel.unreadCount > 0 && (
                            <div className="bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center mb-1">
                              {channel.unreadCount}
                            </div>
                          )}
                          <p className="text-xs text-gray-400">{channel.lastMessageTime}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Team Members */}
                <div className="p-4 border-t border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                    Team Members
                  </h3>
                  <div className="space-y-2">
                    {teamMembers.map((member) => (
                      <div key={member.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50">
                        <div className="relative">
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-gray-600">
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(member.status)}`}></div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{member.name}</p>
                          <p className="text-xs text-gray-500 truncate">{member.role}</p>
                        </div>
                        <div className="text-xs text-gray-400">
                          {member.lastSeen}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
              {/* Chat Header */}
              <div className="bg-white border-b border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <Hash className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <h2 className="font-semibold text-gray-900">General</h2>
                      <p className="text-sm text-gray-500">General team discussions</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                      <Phone className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                      <Video className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                      <Info className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                  <div key={msg.id} className="flex space-x-3">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-medium text-gray-600">
                        {msg.senderName.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium text-gray-900">{msg.senderName}</span>
                        <span className="text-sm text-gray-500">{msg.timestamp}</span>
                        {msg.isEdited && (
                          <span className="text-xs text-gray-400">(edited)</span>
                        )}
                      </div>
                      <div className="bg-white border border-gray-200 rounded-lg p-3">
                        <p className="text-gray-900">{msg.content}</p>
                        {msg.reactions && msg.reactions.length > 0 && (
                          <div className="flex items-center space-x-2 mt-2">
                            {msg.reactions.map((reaction, index) => (
                              <button
                                key={index}
                                className="flex items-center space-x-1 bg-gray-100 hover:bg-gray-200 rounded-full px-2 py-1 text-sm"
                              >
                                <span>{reaction.emoji}</span>
                                <span className="text-gray-600">{reaction.users.length}</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="bg-white border-t border-gray-200 p-4">
                <div className="flex items-center space-x-3">
                  <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                    <Paperclip className="w-5 h-5" />
                  </button>
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type a message..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600">
                      <Smile className="w-5 h-5" />
                    </button>
                  </div>
                  <button className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700">
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Customer Support Tab */}
        {activeTab === 'support' && (
          <div className="w-full p-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Support</h3>
              <div className="text-center py-12">
                <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Customer Support System</h4>
                <p className="text-gray-600 mb-6">Manage customer inquiries and support tickets</p>
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
                  Launch Support Dashboard
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <div className="w-full p-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Management</h3>
              <div className="text-center py-12">
                <Bell className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Notification Center</h4>
                <p className="text-gray-600 mb-6">Configure and manage notification preferences</p>
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
                  Configure Notifications
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Email Integration Tab */}
        {activeTab === 'email' && (
          <div className="w-full p-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Email Integration</h3>
              <div className="text-center py-12">
                <Mail className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Email Communication Tools</h4>
                <p className="text-gray-600 mb-6">Integrate with email services for seamless communication</p>
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
                  Setup Email Integration
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Chat

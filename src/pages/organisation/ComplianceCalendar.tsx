import React, { useState } from 'react'
import { 
  Calendar, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Plus,
  Filter,
  Search,
  ChevronLeft,
  ChevronRight,
  Bell,
  FileText,
  Shield,
  Users,
  Building,
  Globe,
  Settings,
  Eye,
  Edit,
  Trash2,
  MoreVertical,
  ExternalLink,
  Info,
  Target,
  TrendingUp,
  TrendingDown
} from 'lucide-react'

interface ComplianceEvent {
  id: string
  title: string
  type: 'audit' | 'deadline' | 'review' | 'training' | 'assessment' | 'report'
  framework: string
  status: 'upcoming' | 'overdue' | 'completed' | 'cancelled'
  priority: 'low' | 'medium' | 'high' | 'critical'
  dueDate: string
  startDate?: string
  endDate?: string
  assignedTo: string
  description: string
  location?: string
  attendees?: string[]
  reminders: string[]
  documents: string[]
  notes: string
  riskLevel: 'low' | 'medium' | 'high' | 'critical'
  category: 'data-protection' | 'financial' | 'operational' | 'regulatory'
}

interface CalendarDay {
  date: number
  isCurrentMonth: boolean
  isToday: boolean
  events: ComplianceEvent[]
}

const ComplianceCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month')
  const [selectedEvent, setSelectedEvent] = useState<ComplianceEvent | null>(null)
  const [showEventModal, setShowEventModal] = useState(false)
  const [filterType, setFilterType] = useState<string>('all')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')

  // Mock data - in real implementation, this would come from API
  const events: ComplianceEvent[] = [
    {
      id: '1',
      title: 'GDPR Annual Audit',
      type: 'audit',
      framework: 'GDPR',
      status: 'upcoming',
      priority: 'high',
      dueDate: '2024-02-15',
      startDate: '2024-02-15',
      endDate: '2024-02-17',
      assignedTo: 'External Auditor',
      description: 'Annual GDPR compliance audit by external auditor',
      location: 'Office',
      attendees: ['Compliance Team', 'Legal Team', 'IT Team'],
      reminders: ['1 week before', '1 day before'],
      documents: ['Audit Checklist', 'Evidence Package', 'Previous Audit Report'],
      notes: 'Prepare all documentation and ensure team availability',
      riskLevel: 'medium',
      category: 'data-protection'
    },
    {
      id: '2',
      title: 'SOX Management Assessment',
      type: 'assessment',
      framework: 'SOX',
      status: 'overdue',
      priority: 'critical',
      dueDate: '2024-01-31',
      assignedTo: 'Management Team',
      description: 'Annual management assessment of internal controls',
      attendees: ['CEO', 'CFO', 'Audit Committee'],
      reminders: ['2 weeks before', '1 week before', '1 day before'],
      documents: ['Assessment Template', 'Control Documentation', 'Testing Results'],
      notes: 'URGENT: Overdue assessment required for regulatory filing',
      riskLevel: 'high',
      category: 'financial'
    },
    {
      id: '3',
      title: 'PCI-DSS Quarterly Review',
      type: 'review',
      framework: 'PCI-DSS',
      status: 'upcoming',
      priority: 'medium',
      dueDate: '2024-02-05',
      assignedTo: 'Security Team',
      description: 'Quarterly review of PCI-DSS compliance status',
      attendees: ['Security Team', 'IT Team'],
      reminders: ['1 week before'],
      documents: ['Compliance Report', 'Security Assessment'],
      notes: 'Review recent security incidents and control effectiveness',
      riskLevel: 'low',
      category: 'operational'
    },
    {
      id: '4',
      title: 'HIPAA Training Session',
      type: 'training',
      framework: 'HIPAA',
      status: 'upcoming',
      priority: 'medium',
      dueDate: '2024-02-10',
      startDate: '2024-02-10',
      endDate: '2024-02-10',
      assignedTo: 'HR Team',
      description: 'Mandatory HIPAA training for all employees',
      location: 'Conference Room A',
      attendees: ['All Employees'],
      reminders: ['1 week before', '1 day before'],
      documents: ['Training Materials', 'Attendance Sheet', 'Quiz'],
      notes: 'Ensure all employees complete training before deadline',
      riskLevel: 'medium',
      category: 'data-protection'
    },
    {
      id: '5',
      title: 'Regulatory Report Submission',
      type: 'report',
      framework: 'Multiple',
      status: 'upcoming',
      priority: 'high',
      dueDate: '2024-02-28',
      assignedTo: 'Compliance Team',
      description: 'Submit quarterly regulatory reports to authorities',
      attendees: ['Compliance Team', 'Legal Team'],
      reminders: ['2 weeks before', '1 week before', '3 days before'],
      documents: ['Report Templates', 'Supporting Documentation'],
      notes: 'Coordinate with legal team for final review',
      riskLevel: 'high',
      category: 'regulatory'
    }
  ]

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'audit': return <Shield className="w-4 h-4" />
      case 'deadline': return <Clock className="w-4 h-4" />
      case 'review': return <FileText className="w-4 h-4" />
      case 'training': return <Users className="w-4 h-4" />
      case 'assessment': return <Target className="w-4 h-4" />
      case 'report': return <FileText className="w-4 h-4" />
      default: return <Calendar className="w-4 h-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'text-blue-600 bg-blue-100'
      case 'overdue': return 'text-red-600 bg-red-100'
      case 'completed': return 'text-green-600 bg-green-100'
      case 'cancelled': return 'text-gray-600 bg-gray-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-red-600 bg-red-100'
      case 'high': return 'text-orange-600 bg-orange-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'low': return 'text-green-600 bg-green-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'critical': return 'text-red-600 bg-red-100'
      case 'high': return 'text-orange-600 bg-orange-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'low': return 'text-green-600 bg-green-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'data-protection': return <Shield className="w-4 h-4" />
      case 'financial': return <Building className="w-4 h-4" />
      case 'operational': return <Settings className="w-4 h-4" />
      case 'regulatory': return <Globe className="w-4 h-4" />
      default: return <FileText className="w-4 h-4" />
    }
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days: CalendarDay[] = []

    // Previous month days
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const prevDate = new Date(year, month, -i)
      days.push({
        date: prevDate.getDate(),
        isCurrentMonth: false,
        isToday: false,
        events: []
      })
    }

    // Current month days
    const today = new Date()
    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(year, month, day)
      const dayEvents = events.filter(event => {
        const eventDate = new Date(event.dueDate)
        return eventDate.getDate() === day && 
               eventDate.getMonth() === month && 
               eventDate.getFullYear() === year
      })

      days.push({
        date: day,
        isCurrentMonth: true,
        isToday: currentDate.toDateString() === today.toDateString(),
        events: dayEvents
      })
    }

    // Next month days to fill the grid
    const remainingDays = 42 - days.length
    for (let day = 1; day <= remainingDays; day++) {
      days.push({
        date: day,
        isCurrentMonth: false,
        isToday: false,
        events: []
      })
    }

    return days
  }

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate)
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1)
    } else {
      newDate.setMonth(newDate.getMonth() + 1)
    }
    setCurrentDate(newDate)
  }

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.framework.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === 'all' || event.type === filterType
    const matchesStatus = filterStatus === 'all' || event.status === filterStatus
    return matchesSearch && matchesType && matchesStatus
  })

  const upcomingEvents = events.filter(event => event.status === 'upcoming').slice(0, 5)
  const overdueEvents = events.filter(event => event.status === 'overdue')

  const days = getDaysInMonth(currentDate)
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Compliance Calendar</h1>
          <p className="text-gray-600 mt-1">Track compliance deadlines, audits, and important events</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('month')}
              className={`px-3 py-2 text-sm font-medium rounded-lg ${
                viewMode === 'month' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Month
            </button>
            <button
              onClick={() => setViewMode('week')}
              className={`px-3 py-2 text-sm font-medium rounded-lg ${
                viewMode === 'week' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setViewMode('day')}
              className={`px-3 py-2 text-sm font-medium rounded-lg ${
                viewMode === 'day' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Day
            </button>
          </div>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Event
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Upcoming Events</p>
              <p className="text-2xl font-bold text-gray-900">{upcomingEvents.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Overdue</p>
              <p className="text-2xl font-bold text-gray-900">{overdueEvents.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-gray-900">
                {events.filter(e => e.status === 'completed').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-lg">
              <Bell className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">This Month</p>
              <p className="text-2xl font-bold text-gray-900">
                {events.filter(e => {
                  const eventDate = new Date(e.dueDate)
                  return eventDate.getMonth() === currentDate.getMonth() && 
                         eventDate.getFullYear() === currentDate.getFullYear()
                }).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-3 bg-white rounded-lg border border-gray-200 p-6">
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">
              {formatDate(currentDate)}
            </h2>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => navigateMonth('prev')}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setCurrentDate(new Date())}
                className="px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                Today
              </button>
              <button
                onClick={() => navigateMonth('next')}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {/* Week day headers */}
            {weekDays.map((day) => (
              <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
                {day}
              </div>
            ))}

            {/* Calendar days */}
            {days.map((day, index) => (
              <div
                key={index}
                className={`min-h-[100px] p-2 border border-gray-200 ${
                  day.isCurrentMonth ? 'bg-white' : 'bg-gray-50'
                } ${day.isToday ? 'bg-blue-50 border-blue-200' : ''}`}
              >
                <div className={`text-sm font-medium ${
                  day.isCurrentMonth ? 'text-gray-900' : 'text-gray-400'
                } ${day.isToday ? 'text-blue-600' : ''}`}>
                  {day.date}
                </div>
                <div className="mt-1 space-y-1">
                  {day.events.slice(0, 2).map((event) => (
                    <div
                      key={event.id}
                      onClick={() => {
                        setSelectedEvent(event)
                        setShowEventModal(true)
                      }}
                      className={`text-xs p-1 rounded cursor-pointer truncate ${
                        event.priority === 'critical' ? 'bg-red-100 text-red-800' :
                        event.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                        event.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}
                    >
                      {event.title}
                    </div>
                  ))}
                  {day.events.length > 2 && (
                    <div className="text-xs text-gray-500">
                      +{day.events.length - 2} more
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Search and Filters */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="space-y-4">
              <div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search events..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                </div>
              </div>
              <div>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                >
                  <option value="all">All Types</option>
                  <option value="audit">Audit</option>
                  <option value="deadline">Deadline</option>
                  <option value="review">Review</option>
                  <option value="training">Training</option>
                  <option value="assessment">Assessment</option>
                  <option value="report">Report</option>
                </select>
              </div>
              <div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                >
                  <option value="all">All Status</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="overdue">Overdue</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Events</h3>
            <div className="space-y-3">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  onClick={() => {
                    setSelectedEvent(event)
                    setShowEventModal(true)
                  }}
                  className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`flex items-center justify-center w-8 h-8 rounded-lg ${
                      event.priority === 'critical' ? 'bg-red-100' :
                      event.priority === 'high' ? 'bg-orange-100' :
                      event.priority === 'medium' ? 'bg-yellow-100' :
                      'bg-green-100'
                    }`}>
                      {getEventTypeIcon(event.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{event.title}</p>
                      <p className="text-xs text-gray-500">{event.dueDate}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Overdue Events */}
          {overdueEvents.length > 0 && (
            <div className="bg-white rounded-lg border border-red-200 p-4">
              <h3 className="text-lg font-semibold text-red-900 mb-4">Overdue Events</h3>
              <div className="space-y-3">
                {overdueEvents.map((event) => (
                  <div
                    key={event.id}
                    onClick={() => {
                      setSelectedEvent(event)
                      setShowEventModal(true)
                    }}
                    className="p-3 border border-red-200 rounded-lg hover:bg-red-50 cursor-pointer"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-red-100">
                        <AlertTriangle className="w-4 h-4 text-red-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-red-900 truncate">{event.title}</p>
                        <p className="text-xs text-red-600">Due: {event.dueDate}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Event Modal */}
      {showEventModal && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">{selectedEvent.title}</h3>
                <button
                  onClick={() => setShowEventModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Type</p>
                    <p className="text-sm text-gray-900 capitalize">{selectedEvent.type}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Framework</p>
                    <p className="text-sm text-gray-900">{selectedEvent.framework}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Due Date</p>
                    <p className="text-sm text-gray-900">{selectedEvent.dueDate}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Assigned To</p>
                    <p className="text-sm text-gray-900">{selectedEvent.assignedTo}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(selectedEvent.status)}`}>
                    {selectedEvent.status}
                  </span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(selectedEvent.priority)}`}>
                    {selectedEvent.priority}
                  </span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRiskColor(selectedEvent.riskLevel)}`}>
                    {selectedEvent.riskLevel}
                  </span>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700">Description</p>
                  <p className="text-sm text-gray-900">{selectedEvent.description}</p>
                </div>

                {selectedEvent.notes && (
                  <div>
                    <p className="text-sm font-medium text-gray-700">Notes</p>
                    <p className="text-sm text-gray-900">{selectedEvent.notes}</p>
                  </div>
                )}

                {selectedEvent.attendees && selectedEvent.attendees.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-gray-700">Attendees</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedEvent.attendees.map((attendee, index) => (
                        <span key={index} className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                          {attendee}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {selectedEvent.documents && selectedEvent.documents.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-gray-700">Documents</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedEvent.documents.map((doc, index) => (
                        <span key={index} className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full">
                          {doc}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex space-x-3 pt-4 border-t border-gray-200">
                  <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    <Edit className="w-4 h-4 mr-2 inline" />
                    Edit Event
                  </button>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                    <MoreVertical className="w-4 h-4" />
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

export default ComplianceCalendar

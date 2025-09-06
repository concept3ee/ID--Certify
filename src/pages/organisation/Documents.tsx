import { useState, useCallback } from 'react'
import { 
  FileText, Upload, Eye, Download, Trash2, Lock, X, Plus, Folder,
  Image as ImageIcon, Video, Music, File, MoreVertical, Filter, ChevronDown,
  Users, Calendar, HardDrive, Key, Shield, EyeOff, CheckCircle, AlertTriangle,
  Copy, RefreshCw, Settings, UserCheck, Clock, Zap, Building, UserPlus,
  Share2, Archive, Search, Grid, List, Star, Tag, Globe, Mail
} from 'lucide-react'

// Organization-specific interfaces
interface OrgFileItem {
  id: number
  name: string
  type: string
  size: string
  lastModified: string
  sharedWith: string
  fileType: 'pdf' | 'png' | 'mp3' | 'folder' | 'docx' | 'psd' | 'xlsx' | 'pptx'
  icon: React.ComponentType<{ className?: string }>
  department: string
  owner: string
  tags: string[]
  isConfidential: boolean
  complianceLevel: 'public' | 'internal' | 'confidential' | 'restricted'
  retentionPeriod: number
  lastAccessed: string
  accessCount: number
}

interface TeamMember {
  id: string
  name: string
  email: string
  role: 'admin' | 'manager' | 'member' | 'viewer'
  department: string
  avatar?: string
}

interface Department {
  id: string
  name: string
  description: string
  memberCount: number
  storageUsed: string
  storageLimit: string
}

interface FilePermission {
  id: string
  userId: string
  userName: string
  userEmail: string
  userRole: 'owner' | 'admin' | 'editor' | 'viewer'
  department: string
  permissions: {
    read: boolean
    write: boolean
    delete: boolean
    share: boolean
    download: boolean
  }
  grantedAt: string
  grantedBy: string
  expiresAt?: string
  isActive: boolean
}

interface StorageStats {
  used: string
  total: string
  percentage: number
  byDepartment: { department: string; used: string; percentage: number }[]
}

const Documents = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'shared' | 'departments' | 'compliance' | 'archive'>('overview')
  const [activeFilter, setActiveFilter] = useState<'all' | 'images' | 'video' | 'documents' | 'other'>('all')
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)
  const [showFileDetailsModal, setShowFileDetailsModal] = useState<OrgFileItem | null>(null)
  const [showDeleteModal, setShowDeleteModal] = useState<OrgFileItem | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [shareEmail, setShareEmail] = useState('')
  const [sharePermission, setSharePermission] = useState<'view' | 'edit'>('view')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchQuery, setSearchQuery] = useState('')

  // Mock data
  const departments: Department[] = [
    { id: '1', name: 'HR', description: 'Human Resources', memberCount: 12, storageUsed: '2.3 GB', storageLimit: '10 GB' },
    { id: '2', name: 'Finance', description: 'Financial Operations', memberCount: 8, storageUsed: '1.8 GB', storageLimit: '10 GB' },
    { id: '3', name: 'IT', description: 'Information Technology', memberCount: 15, storageUsed: '4.2 GB', storageLimit: '15 GB' },
    { id: '4', name: 'Legal', description: 'Legal Department', memberCount: 6, storageUsed: '3.1 GB', storageLimit: '10 GB' }
  ]

  const teamMembers: TeamMember[] = [
    { id: '1', name: 'John Smith', email: 'john@company.com', role: 'admin', department: 'IT' },
    { id: '2', name: 'Sarah Johnson', email: 'sarah@company.com', role: 'manager', department: 'HR' },
    { id: '3', name: 'Mike Davis', email: 'mike@company.com', role: 'member', department: 'Finance' },
    { id: '4', name: 'Lisa Wilson', email: 'lisa@company.com', role: 'viewer', department: 'Legal' }
  ]

  const files: OrgFileItem[] = [
    {
      id: 1,
      name: 'Company Policy Handbook.pdf',
      type: 'pdf',
      size: '2.4 MB',
      lastModified: '2024-01-20',
      sharedWith: 'All Employees',
      fileType: 'pdf',
      icon: FileText,
      department: 'HR',
      owner: 'Sarah Johnson',
      tags: ['policy', 'handbook', 'hr'],
      isConfidential: false,
      complianceLevel: 'internal',
      retentionPeriod: 2555, // 7 years
      lastAccessed: '2024-01-22',
      accessCount: 45
    },
    {
      id: 2,
      name: 'Q4 Financial Report.xlsx',
      type: 'xlsx',
      size: '1.8 MB',
      lastModified: '2024-01-18',
      sharedWith: 'Management Team',
      fileType: 'xlsx',
      icon: File,
      department: 'Finance',
      owner: 'Mike Davis',
      tags: ['financial', 'report', 'q4'],
      isConfidential: true,
      complianceLevel: 'confidential',
      retentionPeriod: 2555,
      lastAccessed: '2024-01-21',
      accessCount: 12
    },
    {
      id: 3,
      name: 'IT Security Guidelines.docx',
      type: 'docx',
      size: '856 KB',
      lastModified: '2024-01-15',
      sharedWith: 'IT Department',
      fileType: 'docx',
      icon: FileText,
      department: 'IT',
      owner: 'John Smith',
      tags: ['security', 'guidelines', 'it'],
      isConfidential: true,
      complianceLevel: 'restricted',
      retentionPeriod: 1825, // 5 years
      lastAccessed: '2024-01-19',
      accessCount: 8
    }
  ]

  const storageStats: StorageStats = {
    used: '11.4 GB',
    total: '45 GB',
    percentage: 25,
    byDepartment: [
      { department: 'IT', used: '4.2 GB', percentage: 28 },
      { department: 'Legal', used: '3.1 GB', percentage: 31 },
      { department: 'HR', used: '2.3 GB', percentage: 23 },
      { department: 'Finance', used: '1.8 GB', percentage: 18 }
    ]
  }

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case 'pdf': return FileText
      case 'docx': return FileText
      case 'xlsx': return File
      case 'pptx': return File
      case 'png': return ImageIcon
      case 'jpg': return ImageIcon
      case 'mp4': return Video
      case 'mp3': return Music
      default: return File
    }
  }

  const getComplianceColor = (level: string) => {
    switch (level) {
      case 'public': return 'text-green-600 bg-green-100'
      case 'internal': return 'text-blue-600 bg-blue-100'
      case 'confidential': return 'text-orange-600 bg-orange-100'
      case 'restricted': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const filteredFiles = files.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         file.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesFilter = activeFilter === 'all' || (activeFilter === 'documents' && ['pdf', 'docx', 'xlsx', 'pptx'].includes(file.fileType)) || (activeFilter === 'images' && ['png', 'jpg', 'jpeg'].includes(file.fileType)) || (activeFilter === 'video' && ['mp4', 'avi'].includes(file.fileType)) || (activeFilter === 'other' && !['pdf', 'docx', 'xlsx', 'pptx', 'png', 'jpg', 'jpeg', 'mp4', 'avi'].includes(file.fileType))
    return matchesSearch && matchesFilter
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Document Management</h1>
              <p className="text-gray-600 mt-1">Organize and share documents across your organization</p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
              >
                {viewMode === 'grid' ? <List className="w-5 h-5" /> : <Grid className="w-5 h-5" />}
              </button>
              <button
                onClick={() => setShowUploadModal(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
              >
                <Upload className="w-4 h-4" />
                <span>Upload</span>
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', name: 'Overview', icon: Grid },
              { id: 'shared', name: 'Shared Files', icon: Share2 },
              { id: 'departments', name: 'Departments', icon: Building },
              { id: 'compliance', name: 'Compliance', icon: Shield },
              { id: 'archive', name: 'Archive', icon: Archive }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search files..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
              />
            </div>
            <select
              value={activeFilter}
              onChange={(e) => setActiveFilter(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Files</option>
              <option value="documents">Documents</option>
              <option value="images">Images</option>
              <option value="video">Videos</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Storage Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-1 bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Storage Usage</h3>
                  <HardDrive className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 mb-2">{storageStats.used}</div>
                  <div className="text-sm text-gray-600 mb-4">of {storageStats.total} used</div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${storageStats.percentage}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500 mt-2">{storageStats.percentage}% used</div>
                </div>
              </div>

              <div className="lg:col-span-3 bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Storage by Department</h3>
                <div className="space-y-3">
                  {storageStats.byDepartment.map((dept) => (
                    <div key={dept.department} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Building className="w-4 h-4 text-gray-400" />
                        <span className="text-sm font-medium text-gray-900">{dept.department}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-sm text-gray-600">{dept.used}</span>
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${dept.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-500 w-8 text-right">{dept.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Files */}
            <div className="bg-white rounded-xl border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Recent Files</h2>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View All</button>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {filteredFiles.slice(0, 5).map((file) => {
                    const IconComponent = getFileIcon(file.fileType)
                    return (
                      <div key={file.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                        <div className="flex items-center space-x-4">
                          <IconComponent className="w-8 h-8 text-blue-600" />
                          <div>
                            <h3 className="font-medium text-gray-900">{file.name}</h3>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <span>{file.department}</span>
                              <span>•</span>
                              <span>{file.size}</span>
                              <span>•</span>
                              <span>{file.lastModified}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getComplianceColor(file.complianceLevel)}`}>
                            {file.complianceLevel}
                          </span>
                          <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'shared' && (
          <div className="bg-white rounded-xl border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Shared Files</h2>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                    <Filter className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredFiles.map((file) => {
                  const IconComponent = getFileIcon(file.fileType)
                  return (
                    <div key={file.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-3">
                        <IconComponent className="w-8 h-8 text-blue-600" />
                        <button className="p-1 text-gray-400 hover:text-gray-600">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                      <h3 className="font-medium text-gray-900 mb-2 truncate">{file.name}</h3>
                      <div className="space-y-1 text-sm text-gray-500">
                        <div className="flex items-center space-x-2">
                          <Building className="w-3 h-3" />
                          <span>{file.department}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="w-3 h-3" />
                          <span>{file.sharedWith}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getComplianceColor(file.complianceLevel)}`}>
                            {file.complianceLevel}
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'departments' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {departments.map((dept) => (
                <div key={dept.id} className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Building className="w-8 h-8 text-blue-600" />
                    <span className="text-sm text-gray-500">{dept.memberCount} members</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{dept.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{dept.description}</p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Storage</span>
                      <span className="font-medium">{dept.storageUsed}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${(parseFloat(dept.storageUsed) / parseFloat(dept.storageLimit.replace(' GB', ''))) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'compliance' && (
          <div className="bg-white rounded-xl border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Compliance & Security</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Data Protection</h3>
                  <p className="text-sm text-gray-600">All files are encrypted and access-controlled</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Retention Policy</h3>
                  <p className="text-sm text-gray-600">Automated retention and archival policies</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <UserCheck className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Access Control</h3>
                  <p className="text-sm text-gray-600">Role-based permissions and audit trails</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'archive' && (
          <div className="bg-white rounded-xl border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Archived Files</h2>
            </div>
            <div className="p-6">
              <div className="text-center py-12">
                <Archive className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No archived files</h3>
                <p className="text-gray-600">Files that are archived will appear here</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Upload Files</h3>
              <button onClick={() => setShowUploadModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">Drag and drop files here, or click to browse</p>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                Choose Files
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Documents

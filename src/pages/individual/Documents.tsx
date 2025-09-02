import { useState } from 'react'

import { 
  FileText, 
  Upload, 
  Eye, 
  Download, 
  Trash2, 
  Lock, 
  X, 
  Plus, 
  Folder,
  Image as ImageIcon,
  Video,
  Music,
  File,
  MoreVertical,
  Filter,
  ChevronDown,
  Users,
  Calendar,
  HardDrive
} from 'lucide-react'

interface FileItem {
  id: number
  name: string
  type: string
  size: string
  lastModified: string
  sharedWith: string
  fileType: 'pdf' | 'png' | 'mp3' | 'folder' | 'docx' | 'psd'
  icon: React.ComponentType<{ className?: string }>
}

interface StorageStats {
  used: string
  total: string
  percentage: number
}

interface FileTypeCard {
  type: string
  icon: React.ComponentType<{ className?: string }>
  files: string
  size: string
  color: string
}

const Documents = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'shared' | 'encrypted' | 'favourite' | 'bin'>('overview')
  const [activeFilter, setActiveFilter] = useState<'all' | 'images' | 'video' | 'documents' | 'other'>('all')
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)
  const [showFileDetailsModal, setShowFileDetailsModal] = useState<FileItem | null>(null)
  const [showDeleteModal, setShowDeleteModal] = useState<FileItem | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [shareEmail, setShareEmail] = useState('')
  const [sharePermission, setSharePermission] = useState<'view' | 'edit'>('view')

  const storageStats: StorageStats = {
    used: '400GB',
    total: '1TB',
    percentage: 40
  }

  const fileTypeCards: FileTypeCard[] = [
    {
      type: 'Documents',
      icon: Folder,
      files: '10,423 files',
      size: '73GB',
      color: 'text-red-600'
    },
    {
      type: 'Images',
      icon: ImageIcon,
      files: '1024 files',
      size: '20.59GB',
      color: 'text-green-600'
    },
    {
      type: 'Videos',
      icon: Video,
      files: '19 files',
      size: '12.89GB',
      color: 'text-purple-600'
    },
    {
      type: 'Musics',
      icon: Music,
      files: '203 files',
      size: '98MB',
      color: 'text-red-600'
    },
    {
      type: 'Other',
      icon: File,
      files: '50 files',
      size: '523MB',
      color: 'text-blue-600'
    }
  ]

  const recentFiles: FileItem[] = [
    {
      id: 1,
      name: 'Offer letter for employee.pdf',
      type: 'pdf',
      size: '24MB',
      lastModified: '50 min ago',
      sharedWith: 'Shared with 3 avatars +2',
      fileType: 'pdf',
      icon: FileText
    },
    {
      id: 2,
      name: 'shunshine.png',
      type: 'png',
      size: '1.2MB',
      lastModified: 'Yesterday',
      sharedWith: '-',
      fileType: 'png',
      icon: ImageIcon
    },
    {
      id: 3,
      name: 'Engage highlight.mp3',
      type: 'mp3',
      size: '1.02GB',
      lastModified: '27 Jan 2023',
      sharedWith: 'Shared with 3 avatars +9',
      fileType: 'mp3',
      icon: Music
    },
    {
      id: 4,
      name: 'Documents',
      type: 'folder',
      size: '12.35GB',
      lastModified: '26 Jan 2023',
      sharedWith: 'Shared with 3 avatars +',
      fileType: 'folder',
      icon: Folder
    },
    {
      id: 5,
      name: 'Salary slips.docx',
      type: 'docx',
      size: '2.3MB',
      lastModified: '25 Jan 2023',
      sharedWith: 'Shared with 3 avatars +',
      fileType: 'docx',
      icon: FileText
    },
    {
      id: 6,
      name: 'Wedding photo.psd',
      type: 'psd',
      size: '512MB',
      lastModified: '24 Jan 2023',
      sharedWith: '-',
      fileType: 'psd',
      icon: ImageIcon
    },
    {
      id: 7,
      name: 'Documents',
      type: 'folder',
      size: '12.35GB',
      lastModified: '23 Jan 2023',
      sharedWith: 'Shared with 3 avatars +',
      fileType: 'folder',
      icon: Folder
    },
    {
      id: 8,
      name: 'Offer letter for employee.pdf',
      type: 'pdf',
      size: '24MB',
      lastModified: '22 Jan 2023',
      sharedWith: 'Shared with 3 avatars +2',
      fileType: 'pdf',
      icon: FileText
    }
  ]

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case 'pdf':
        return <FileText className="h-5 w-5 text-red-500" />
      case 'png':
      case 'jpg':
      case 'jpeg':
        return <ImageIcon className="h-5 w-5 text-green-500" />
      case 'mp3':
      case 'wav':
        return <Music className="h-5 w-5 text-purple-500" />
      case 'mp4':
      case 'avi':
        return <Video className="h-5 w-5 text-blue-500" />
      case 'folder':
        return <Folder className="h-5 w-5 text-yellow-500" />
      case 'docx':
      case 'doc':
        return <FileText className="h-5 w-5 text-blue-500" />
      case 'psd':
        return <ImageIcon className="h-5 w-5 text-purple-500" />
      default:
        return <File className="h-5 w-5 text-gray-500" />
    }
  }

  const filteredFiles = recentFiles.filter(file => {
    if (activeFilter === 'all') return true
    if (activeFilter === 'images') return ['png', 'jpg', 'jpeg', 'psd'].includes(file.type)
    if (activeFilter === 'video') return ['mp4', 'avi'].includes(file.type)
    if (activeFilter === 'documents') return ['pdf', 'docx', 'doc'].includes(file.type)
    if (activeFilter === 'other') return !['png', 'jpg', 'jpeg', 'psd', 'mp4', 'avi', 'pdf', 'docx', 'doc', 'mp3', 'wav', 'folder'].includes(file.type)
    return true
  })

  // Handler functions
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const handleUpload = () => {
    if (selectedFile) {
      // In a real app, this would upload the file
      console.log('Uploading file:', selectedFile.name)
      setShowUploadModal(false)
      setSelectedFile(null)
      alert('File uploaded successfully!')
    }
  }

  const handleShareFile = (file: FileItem) => {
    setShowFileDetailsModal(file)
    setShowShareModal(true)
  }

  const handleShare = () => {
    if (shareEmail && showFileDetailsModal) {
      console.log('Sharing file:', showFileDetailsModal.name, 'with:', shareEmail, 'permission:', sharePermission)
      setShowShareModal(false)
      setShareEmail('')
      setSharePermission('view')
      alert('File shared successfully!')
    }
  }

  const handleDeleteFile = (file: FileItem) => {
    setShowDeleteModal(file)
  }

  const confirmDelete = () => {
    if (showDeleteModal) {
      console.log('Deleting file:', showDeleteModal.name)
      setShowDeleteModal(null)
      alert('File moved to recycle bin!')
    }
  }

  const handleRestoreFile = (file: FileItem) => {
    console.log('Restoring file:', file.name)
    alert('File restored successfully!')
  }

  const handleEmptyBin = () => {
    if (confirm('Are you sure you want to permanently delete all files in the recycle bin?')) {
      console.log('Emptying recycle bin')
      alert('Recycle bin emptied!')
    }
  }

  return (
    <div className="space-y-6">
      {/* Section Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-3">
          {/* Section Header Row - Title, Centered Navigation, and Action Button */}
          <div className="flex items-center">
            {/* Left Side - Title Only */}
            <div className="flex items-center flex-shrink-0">
              <h1 className="text-xl font-bold text-gray-900">Encrypted Document Storage</h1>
            </div>

            {/* Center - Navigation Tabs with Trust Score Styling */}
            <div className="flex-1 flex justify-center">
              <div className="bg-gray-100 rounded-lg p-1">
                <nav className="flex space-x-1">
                  <button
                    onClick={() => setActiveTab('overview')}
                    className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                      activeTab === 'overview'
                        ? 'bg-white text-gray-900 shadow-sm font-bold'
                        : 'text-gray-500 hover:text-gray-700 font-medium'
                    }`}
                  >
                    <span>Overview</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('shared')}
                    className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                      activeTab === 'shared'
                        ? 'bg-white text-gray-900 shadow-sm font-bold'
                        : 'text-gray-500 hover:text-gray-700 font-medium'
                    }`}
                  >
                    <span>Shared</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('encrypted')}
                    className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                      activeTab === 'encrypted'
                        ? 'bg-white text-gray-900 shadow-sm font-bold'
                        : 'text-gray-500 hover:text-gray-700 font-medium'
                    }`}
                  >
                    <span>Encrypted</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('favourite')}
                    className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                      activeTab === 'favourite'
                        ? 'bg-white text-gray-900 shadow-sm font-bold'
                        : 'text-gray-500 hover:text-gray-700 font-medium'
                    }`}
                  >
                    <span>Favourite</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('bin')}
                    className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                      activeTab === 'bin'
                        ? 'bg-white text-gray-900 shadow-sm font-bold'
                        : 'text-gray-500 hover:text-gray-700 font-medium'
                    }`}
                  >
                    <span>Recycle Bin</span>
                  </button>
                </nav>
              </div>
            </div>

            {/* Right Side - Action Button */}
            <div className="flex-shrink-0">
              <button 
                onClick={() => setShowUploadModal(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
              >
                <Upload className="h-4 w-4" />
                <span>Upload +</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      {activeTab === 'overview' && (
        <div className="px-6 space-y-6">
          {/* Storage Usage Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Storage Gauge */}
            <div className="lg:col-span-1 bg-white rounded-xl p-6 border border-gray-200">
              <div className="text-center">
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                    <circle
                      cx="60"
                      cy="60"
                      r="54"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="8"
                    />
                    <circle
                      cx="60"
                      cy="60"
                      r="54"
                      fill="none"
                      stroke="#8b5cf6"
                      strokeWidth="8"
                      strokeDasharray={`${2 * Math.PI * 54}`}
                      strokeDashoffset={`${2 * Math.PI * 54 * (1 - storageStats.percentage / 100)}`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">{storageStats.used}</div>
                      <div className="text-sm text-gray-500">Used space</div>
                    </div>
                  </div>
                </div>
                <div className="text-sm text-gray-600">{storageStats.total} Total space</div>
              </div>
            </div>

            {/* File Type Cards */}
            <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {fileTypeCards.map((card, index) => (
                <div key={index} className="bg-white rounded-xl p-4 border border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <card.icon className={`h-6 w-6 ${card.color}`} />
                  </div>
                  <div className="text-sm font-medium text-gray-900 mb-1">{card.type}</div>
                  <div className="text-xs text-gray-500 mb-1">{card.files}</div>
                  <div className={`text-sm font-semibold ${card.color}`}>{card.size}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Files */}
          <div className="bg-white rounded-xl border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Recent Files</h2>
                <a href="#" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                  View All
                </a>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex space-x-6">
                  <button
                    onClick={() => setActiveFilter('all')}
                    className={`text-sm font-medium ${
                      activeFilter === 'all'
                        ? 'text-primary-600 border-b-2 border-primary-600 pb-1'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setActiveFilter('images')}
                    className={`text-sm font-medium ${
                      activeFilter === 'images'
                        ? 'text-primary-600 border-b-2 border-primary-600 pb-1'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Images
                  </button>
                  <button
                    onClick={() => setActiveFilter('video')}
                    className={`text-sm font-medium ${
                      activeFilter === 'video'
                        ? 'text-primary-600 border-b-2 border-primary-600 pb-1'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Video
                  </button>
                  <button
                    onClick={() => setActiveFilter('documents')}
                    className={`text-sm font-medium ${
                      activeFilter === 'documents'
                        ? 'text-primary-600 border-b-2 border-primary-600 pb-1'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Documents
                  </button>
                  <button
                    onClick={() => setActiveFilter('other')}
                    className={`text-sm font-medium ${
                      activeFilter === 'other'
                        ? 'text-primary-600 border-b-2 border-primary-600 pb-1'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Other
                  </button>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <Filter className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Files Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center space-x-1">
                        <span>Name</span>
                        <ChevronDown className="h-3 w-3" />
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center space-x-1">
                        <span>Size</span>
                        <ChevronDown className="h-3 w-3" />
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center space-x-1">
                        <span>Last Modified</span>
                        <ChevronDown className="h-3 w-3" />
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center space-x-1">
                        <span>Shared with</span>
                        <ChevronDown className="h-3 w-3" />
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredFiles.map((file) => (
                    <tr key={file.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-8">
                            {getFileIcon(file.fileType)}
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900">{file.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {file.size}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {file.lastModified}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {file.sharedWith !== '-' ? (
                          <div className="flex items-center space-x-1">
                            <div className="flex -space-x-2">
                              {[1, 2, 3].map((i) => (
                                <div key={i} className="w-6 h-6 bg-gray-300 rounded-full border-2 border-white"></div>
                              ))}
                            </div>
                            <span className="text-xs text-gray-400">{file.sharedWith.split('+')[1]}</span>
                          </div>
                        ) : (
                          '-'
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button 
                            onClick={() => handleShareFile(file)}
                            className="text-blue-600 hover:text-blue-700"
                            title="Share"
                          >
                            <Users className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteFile(file)}
                            className="text-red-600 hover:text-red-700"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                          <button className="text-gray-400 hover:text-gray-600">
                            <MoreVertical className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Shared Files Tab */}
      {activeTab === 'shared' && (
        <div className="px-6 space-y-6">
          <div className="bg-white rounded-xl border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Shared Files</h2>
                <div className="flex items-center space-x-3">
                  <button className="text-sm text-gray-600 hover:text-gray-800">
                    <Users className="h-4 w-4 mr-1" />
                    Manage Sharing
                  </button>
                </div>
              </div>
            </div>

            {/* Shared Files Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center space-x-1">
                        <span>File Name</span>
                        <ChevronDown className="h-3 w-3" />
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center space-x-1">
                        <span>Shared With</span>
                        <ChevronDown className="h-3 w-3" />
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center space-x-1">
                        <span>Permission</span>
                        <ChevronDown className="h-3 w-3" />
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center space-x-1">
                        <span>Shared Date</span>
                        <ChevronDown className="h-3 w-3" />
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentFiles.filter(f => f.sharedWith !== '-').map((file) => (
                    <tr key={file.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-8">
                            {getFileIcon(file.fileType)}
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900">{file.name}</div>
                            <div className="text-xs text-gray-500">{file.size}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <div className="flex -space-x-2">
                            {[1, 2, 3].map((i) => (
                              <div key={i} className="w-6 h-6 bg-gray-300 rounded-full border-2 border-white"></div>
                            ))}
                          </div>
                          <span className="text-xs text-gray-400">{file.sharedWith.split('+')[1]}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                          View & Edit
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {file.lastModified}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-gray-400 hover:text-gray-600">
                          <MoreVertical className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Encrypted Documents Tab */}
      {activeTab === 'encrypted' && (
        <div className="px-6 space-y-6">
          <div className="bg-white rounded-xl border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Encrypted Documents</h2>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Lock className="h-4 w-4" />
                    <span>End-to-end encrypted</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Encryption Stats */}
            <div className="p-6 border-b border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-600">1,247</div>
                  <div className="text-sm text-gray-600">Encrypted Files</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">256-bit</div>
                  <div className="text-sm text-gray-600">AES Encryption</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">99.9%</div>
                  <div className="text-sm text-gray-600">Security Score</div>
                </div>
              </div>
            </div>

            {/* Encrypted Files Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center space-x-1">
                        <span>File Name</span>
                        <ChevronDown className="h-3 w-3" />
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center space-x-1">
                        <span>Encryption Level</span>
                        <ChevronDown className="h-3 w-3" />
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center space-x-1">
                        <span>Last Accessed</span>
                        <ChevronDown className="h-3 w-3" />
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center space-x-1">
                        <span>Status</span>
                        <ChevronDown className="h-3 w-3" />
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentFiles.slice(0, 5).map((file) => (
                    <tr key={file.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-8">
                            {getFileIcon(file.fileType)}
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900">{file.name}</div>
                            <div className="text-xs text-gray-500">{file.size}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                          AES-256
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {file.lastModified}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                          Secure
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-gray-400 hover:text-gray-600">
                          <MoreVertical className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Favourite Tab */}
      {activeTab === 'favourite' && (
        <div className="px-6 space-y-6">
          <div className="bg-white rounded-xl border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Favourite Files</h2>
                <div className="flex items-center space-x-3">
                  <button className="text-sm text-gray-600 hover:text-gray-800">
                    <Calendar className="h-4 w-4 mr-1" />
                    Sort by Date
                  </button>
                </div>
              </div>
            </div>

            {/* Favourite Files Grid */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {recentFiles.slice(0, 8).map((file) => (
                  <div key={file.id} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex-shrink-0 h-10 w-10">
                        {getFileIcon(file.fileType)}
                      </div>
                      <button className="text-yellow-500 hover:text-yellow-600">
                        <svg className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </button>
                    </div>
                    <div className="text-sm font-medium text-gray-900 mb-1 truncate">{file.name}</div>
                    <div className="text-xs text-gray-500 mb-2">{file.size}</div>
                    <div className="text-xs text-gray-400">{file.lastModified}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bin Tab */}
      {activeTab === 'bin' && (
        <div className="px-6 space-y-6">
          <div className="bg-white rounded-xl border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Recycle Bin</h2>
                <div className="flex items-center space-x-3">
                  <button 
                    onClick={handleEmptyBin}
                    className="text-sm text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Empty Bin
                  </button>
                </div>
              </div>
            </div>

            {/* Bin Stats */}
            <div className="p-6 border-b border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-600">23</div>
                  <div className="text-sm text-gray-600">Deleted Files</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-600">2.4GB</div>
                  <div className="text-sm text-gray-600">Storage Used</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">7 days</div>
                  <div className="text-sm text-gray-600">Auto-delete in</div>
                </div>
              </div>
            </div>

            {/* Deleted Files Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center space-x-1">
                        <span>File Name</span>
                        <ChevronDown className="h-3 w-3" />
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center space-x-1">
                        <span>Original Location</span>
                        <ChevronDown className="h-3 w-3" />
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center space-x-1">
                        <span>Deleted Date</span>
                        <ChevronDown className="h-3 w-3" />
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center space-x-1">
                        <span>Auto-delete</span>
                        <ChevronDown className="h-3 w-3" />
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentFiles.slice(0, 5).map((file, index) => (
                    <tr key={file.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-8 opacity-50">
                            {getFileIcon(file.fileType)}
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-500 line-through">{file.name}</div>
                            <div className="text-xs text-gray-400">{file.size}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Documents/{file.fileType}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {file.lastModified}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {7 - index} days
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button 
                            onClick={() => handleRestoreFile(file)}
                            className="text-blue-600 hover:text-blue-700 text-xs"
                          >
                            Restore
                          </button>
                          <button 
                            onClick={() => handleDeleteFile(file)}
                            className="text-red-600 hover:text-red-700 text-xs"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 relative">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Upload File</h3>
              <button 
                onClick={() => setShowUploadModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h4 className="text-lg font-medium text-gray-900 mb-2">Upload your files</h4>
              <p className="text-gray-600 mb-4">Drag and drop files here, or click to browse</p>
              <input
                type="file"
                multiple
                className="hidden"
                id="file-upload"
                onChange={handleFileSelect}
              />
              <label
                htmlFor="file-upload"
                className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 cursor-pointer"
              >
                Choose Files
              </label>
            </div>

            {selectedFile && (
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">{selectedFile.name}</span>
                  <button
                    onClick={() => setSelectedFile(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowUploadModal(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleUpload}
                disabled={!selectedFile}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Upload File
              </button>
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                <Lock className="h-4 w-4" />
                <span>Files are encrypted and secure</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Share File Modal */}
      {showShareModal && showFileDetailsModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 relative">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Share File</h3>
              <button 
                onClick={() => setShowShareModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0 h-10 w-10">
                  {getFileIcon(showFileDetailsModal.fileType)}
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">{showFileDetailsModal.name}</div>
                  <div className="text-xs text-gray-500">{showFileDetailsModal.size}</div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  value={shareEmail}
                  onChange={(e) => setShareEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Enter email address"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Permission</label>
                <select
                  value={sharePermission}
                  onChange={(e) => setSharePermission(e.target.value as 'view' | 'edit')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="view">View only</option>
                  <option value="edit">View & Edit</option>
                </select>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowShareModal(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleShare}
                disabled={!shareEmail}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Share File
              </button>
            </div>
          </div>
        </div>
      )}

      {/* File Details Modal */}
      {showFileDetailsModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 relative">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">File Details</h3>
              <button 
                onClick={() => setShowFileDetailsModal(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0 h-16 w-16">
                  {getFileIcon(showFileDetailsModal.fileType)}
                </div>
                <div>
                  <div className="text-lg font-medium text-gray-900">{showFileDetailsModal.name}</div>
                  <div className="text-sm text-gray-500">{showFileDetailsModal.size}</div>
                  <div className="text-xs text-gray-400">Last modified: {showFileDetailsModal.lastModified}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">File Type</label>
                  <p className="text-sm text-gray-900">{showFileDetailsModal.fileType.toUpperCase()}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Size</label>
                  <p className="text-sm text-gray-900">{showFileDetailsModal.size}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Modified</label>
                  <p className="text-sm text-gray-900">{showFileDetailsModal.lastModified}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Shared</label>
                  <p className="text-sm text-gray-900">{showFileDetailsModal.sharedWith}</p>
                </div>
              </div>

              <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                <Lock className="h-4 w-4" />
                <span>This file is encrypted and secure</span>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => handleShareFile(showFileDetailsModal)}
                className="px-4 py-2 text-blue-600 border border-blue-300 rounded-lg hover:bg-blue-50"
              >
                <Users className="h-4 w-4 mr-2" />
                Share
              </button>
              <button
                onClick={() => console.log('Downloading:', showFileDetailsModal.name)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </button>
              <button
                onClick={() => setShowFileDetailsModal(null)}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 relative">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-red-600">Delete File</h3>
              <button 
                onClick={() => setShowDeleteModal(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg">
                <div className="flex-shrink-0 h-10 w-10">
                  {getFileIcon(showDeleteModal.fileType)}
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">{showDeleteModal.name}</div>
                  <div className="text-xs text-gray-500">{showDeleteModal.size}</div>
                </div>
              </div>

              <div className="bg-red-50 p-3 rounded-lg">
                <p className="text-sm text-red-700">
                  Are you sure you want to delete "{showDeleteModal.name}"? This file will be moved to the recycle bin and can be restored within 30 days.
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(null)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete File
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Documents

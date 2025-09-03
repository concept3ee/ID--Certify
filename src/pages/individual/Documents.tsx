import { useState, useCallback } from 'react'

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
  HardDrive,
  Key,
  Shield,
  EyeOff,
  CheckCircle,
  AlertTriangle,
  Copy,
  RefreshCw,
  Settings,
  UserCheck,
  Clock,
  Zap
} from 'lucide-react'

// Encryption Interfaces
interface EncryptionKey {
  id: string
  name: string
  createdAt: string
  lastUsed: string
  isActive: boolean
  keyStrength: '256-bit' | '512-bit'
  algorithm: 'AES-256-GCM' | 'AES-256-CBC'
}

interface EncryptedFile extends FileItem {
  encryptionKeyId: string
  encryptionLevel: '256-bit' | '512-bit'
  algorithm: 'AES-256-GCM' | 'AES-256-CBC'
  iv: string
  salt: string
  isEncrypted: boolean
  encryptedSize: string
  decryptionStatus: 'locked' | 'unlocked' | 'error'
  lastDecrypted?: string
  accessCount: number
  securityScore: number
}

interface EncryptionSettings {
  defaultAlgorithm: 'AES-256-GCM' | 'AES-256-CBC'
  keyRotationDays: number
  requirePasswordOnDecrypt: boolean
  autoLockAfterMinutes: number
  enableAuditLogging: boolean
}

// Access Control Interfaces
interface FilePermission {
  id: string
  userId: string
  userName: string
  userEmail: string
  userRole: 'owner' | 'admin' | 'editor' | 'viewer'
  permissions: {
    read: boolean
    write: boolean
    delete: boolean
    share: boolean
    decrypt: boolean
  }
  grantedAt: string
  grantedBy: string
  expiresAt?: string
  isActive: boolean
}

interface AccessGroup {
  id: string
  name: string
  description: string
  members: string[]
  permissions: {
    read: boolean
    write: boolean
    delete: boolean
    share: boolean
    decrypt: boolean
  }
  createdAt: string
  createdBy: string
}

// Audit Logging Interfaces
interface AuditLog {
  id: string
  timestamp: string
  userId: string
  userName: string
  userEmail: string
  action: 'file_created' | 'file_encrypted' | 'file_decrypted' | 'file_deleted' | 'file_shared' | 'file_downloaded' | 'permission_granted' | 'permission_revoked' | 'key_created' | 'key_rotated' | 'access_denied' | 'login_attempt' | 'logout'
  resourceType: 'file' | 'folder' | 'key' | 'permission' | 'system'
  resourceId: string
  resourceName: string
  details: string
  ipAddress: string
  userAgent: string
  severity: 'info' | 'warning' | 'error' | 'critical'
  success: boolean
  metadata?: Record<string, any>
}

interface AuditFilter {
  dateRange: 'today' | 'yesterday' | 'week' | 'month' | 'custom'
  startDate?: string
  endDate?: string
  action?: string
  severity?: string
  userId?: string
  success?: boolean
}

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

  // Encryption State
  const [showEncryptionModal, setShowEncryptionModal] = useState(false)
  const [showKeyManagementModal, setShowKeyManagementModal] = useState(false)
  const [showEncryptionSettingsModal, setShowEncryptionSettingsModal] = useState(false)
  const [showDecryptModal, setShowDecryptModal] = useState(false)
  const [selectedEncryptedFile, setSelectedEncryptedFile] = useState<EncryptedFile | null>(null)
  
  // Encryption Form States
  const [encryptionPassword, setEncryptionPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<'AES-256-GCM' | 'AES-256-CBC'>('AES-256-GCM')
  const [keyName, setKeyName] = useState('')
  const [decryptPassword, setDecryptPassword] = useState('')
  
  // Encryption Settings
  const [encryptionSettings, setEncryptionSettings] = useState<EncryptionSettings>({
    defaultAlgorithm: 'AES-256-GCM',
    keyRotationDays: 90,
    requirePasswordOnDecrypt: true,
    autoLockAfterMinutes: 30,
    enableAuditLogging: true
  })

  // Encryption Keys
  const [encryptionKeys, setEncryptionKeys] = useState<EncryptionKey[]>([
    {
      id: 'key-1',
      name: 'Primary Key',
      createdAt: '2024-01-15',
      lastUsed: '2024-01-20',
      isActive: true,
      keyStrength: '256-bit',
      algorithm: 'AES-256-GCM'
    },
    {
      id: 'key-2',
      name: 'Backup Key',
      createdAt: '2024-01-10',
      lastUsed: '2024-01-18',
      isActive: true,
      keyStrength: '256-bit',
      algorithm: 'AES-256-CBC'
    }
  ])

  // Encrypted Files
  const [encryptedFiles, setEncryptedFiles] = useState<EncryptedFile[]>([
    {
      id: 1,
      name: 'confidential-report.pdf',
      type: 'pdf',
      size: '2.4MB',
      lastModified: '2 hours ago',
      sharedWith: 'Private',
      fileType: 'pdf',
      icon: FileText,
      encryptionKeyId: 'key-1',
      encryptionLevel: '256-bit',
      algorithm: 'AES-256-GCM',
      iv: 'a1b2c3d4e5f6',
      salt: 'salt123',
      isEncrypted: true,
      encryptedSize: '2.4MB',
      decryptionStatus: 'locked',
      accessCount: 0,
      securityScore: 95
    },
    {
      id: 2,
      name: 'private-photos.zip',
      type: 'zip',
      size: '15.7MB',
      lastModified: '1 day ago',
      sharedWith: 'Private',
      fileType: 'folder',
      icon: Folder,
      encryptionKeyId: 'key-1',
      encryptionLevel: '256-bit',
      algorithm: 'AES-256-GCM',
      iv: 'f6e5d4c3b2a1',
      salt: 'salt456',
      isEncrypted: true,
      encryptedSize: '15.7MB',
      decryptionStatus: 'locked',
      accessCount: 0,
      securityScore: 98
    },
    {
      id: 3,
      name: 'financial-data.xlsx',
      type: 'xlsx',
      size: '8.2MB',
      lastModified: '3 days ago',
      sharedWith: 'Private',
      fileType: 'docx',
      icon: FileText,
      encryptionKeyId: 'key-2',
      encryptionLevel: '256-bit',
      algorithm: 'AES-256-CBC',
      iv: 'b2a1c3d4e5f6',
      salt: 'salt789',
      isEncrypted: true,
      encryptedSize: '8.2MB',
      decryptionStatus: 'locked',
      accessCount: 0,
      securityScore: 92
    }
  ])

  // Encryption Status
  const [encryptionStatus, setEncryptionStatus] = useState({
    isEncrypting: false,
    isDecrypting: false,
    progress: 0,
    currentOperation: ''
  })

  // Access Control State
  const [showAccessControlModal, setShowAccessControlModal] = useState(false)
  const [showPermissionModal, setShowPermissionModal] = useState(false)
  const [showAccessGroupModal, setShowAccessGroupModal] = useState(false)
  const [selectedFileForPermissions, setSelectedFileForPermissions] = useState<EncryptedFile | null>(null)
  const [permissionForm, setPermissionForm] = useState({
    userEmail: '',
    userRole: 'viewer' as 'owner' | 'admin' | 'editor' | 'viewer',
    permissions: {
      read: true,
      write: false,
      delete: false,
      share: false,
      decrypt: false
    },
    expiresAt: ''
  })

  // Access Control Data
  const [filePermissions, setFilePermissions] = useState<Record<string, FilePermission[]>>({
    '1': [
      {
        id: 'perm-1',
        userId: 'user-1',
        userName: 'John Doe',
        userEmail: 'john@example.com',
        userRole: 'owner',
        permissions: { read: true, write: true, delete: true, share: true, decrypt: true },
        grantedAt: '2024-01-15',
        grantedBy: 'system',
        isActive: true
      },
      {
        id: 'perm-2',
        userId: 'user-2',
        userName: 'Jane Smith',
        userEmail: 'jane@example.com',
        userRole: 'editor',
        permissions: { read: true, write: true, delete: false, share: true, decrypt: true },
        grantedAt: '2024-01-16',
        grantedBy: 'John Doe',
        isActive: true
      }
    ],
    '2': [
      {
        id: 'perm-3',
        userId: 'user-1',
        userName: 'John Doe',
        userEmail: 'john@example.com',
        userRole: 'owner',
        permissions: { read: true, write: true, delete: true, share: true, decrypt: true },
        grantedAt: '2024-01-15',
        grantedBy: 'system',
        isActive: true
      }
    ]
  })

  const [accessGroups, setAccessGroups] = useState<AccessGroup[]>([
    {
      id: 'group-1',
      name: 'Finance Team',
      description: 'Access to financial documents and reports',
      members: ['user-2', 'user-3'],
      permissions: { read: true, write: false, delete: false, share: false, decrypt: true },
      createdAt: '2024-01-10',
      createdBy: 'John Doe'
    },
    {
      id: 'group-2',
      name: 'Legal Team',
      description: 'Access to legal documents and contracts',
      members: ['user-4', 'user-5'],
      permissions: { read: true, write: false, delete: false, share: false, decrypt: true },
      createdAt: '2024-01-12',
      createdBy: 'John Doe'
    }
  ])

  // Audit Logging State
  const [showAuditLogModal, setShowAuditLogModal] = useState(false)
  const [auditFilters, setAuditFilters] = useState<AuditFilter>({
    dateRange: 'week',
    action: '',
    severity: '',
    userId: '',
    success: undefined
  })

  // Audit Logs Data
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([
    {
      id: 'audit-1',
      timestamp: '2024-01-20T10:30:00Z',
      userId: 'user-1',
      userName: 'John Doe',
      userEmail: 'john@example.com',
      action: 'file_encrypted',
      resourceType: 'file',
      resourceId: '1',
      resourceName: 'confidential-report.pdf',
      details: 'File encrypted using AES-256-GCM algorithm',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
      severity: 'info',
      success: true,
      metadata: { algorithm: 'AES-256-GCM', keyId: 'key-1' }
    },
    {
      id: 'audit-2',
      timestamp: '2024-01-20T11:15:00Z',
      userId: 'user-2',
      userName: 'Jane Smith',
      userEmail: 'jane@example.com',
      action: 'file_decrypted',
      resourceType: 'file',
      resourceId: '1',
      resourceName: 'confidential-report.pdf',
      details: 'File decrypted successfully',
      ipAddress: '192.168.1.101',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      severity: 'info',
      success: true,
      metadata: { algorithm: 'AES-256-GCM', keyId: 'key-1' }
    },
    {
      id: 'audit-3',
      timestamp: '2024-01-20T12:00:00Z',
      userId: 'user-3',
      userName: 'Bob Wilson',
      userEmail: 'bob@example.com',
      action: 'access_denied',
      resourceType: 'file',
      resourceId: '1',
      resourceName: 'confidential-report.pdf',
      details: 'Access denied - insufficient permissions',
      ipAddress: '192.168.1.102',
      userAgent: 'Mozilla/5.0 (Linux; Android 11)',
      severity: 'warning',
      success: false,
      metadata: { requiredPermission: 'read', userPermissions: ['view'] }
    },
    {
      id: 'audit-4',
      timestamp: '2024-01-20T13:45:00Z',
      userId: 'user-1',
      userName: 'John Doe',
      userEmail: 'john@example.com',
      action: 'permission_granted',
      resourceType: 'permission',
      resourceId: 'perm-4',
      resourceName: 'confidential-report.pdf',
      details: 'Permission granted to user@example.com for read access',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
      severity: 'info',
      success: true,
      metadata: { grantedTo: 'user@example.com', permissions: ['read'] }
    },
    {
      id: 'audit-5',
      timestamp: '2024-01-20T14:20:00Z',
      userId: 'user-1',
      userName: 'John Doe',
      userEmail: 'john@example.com',
      action: 'key_created',
      resourceType: 'key',
      resourceId: 'key-3',
      resourceName: 'New Encryption Key',
      details: 'New encryption key created for enhanced security',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
      severity: 'info',
      success: true,
      metadata: { algorithm: 'AES-256-GCM', keyStrength: '256-bit' }
    }
  ])

  // Encryption Utility Functions
  const generateEncryptionKey = useCallback(async (password: string, salt: string): Promise<CryptoKey> => {
    const encoder = new TextEncoder()
    const keyMaterial = await crypto.subtle.importKey(
      'raw',
      encoder.encode(password + salt),
      { name: 'PBKDF2' },
      false,
      ['deriveBits', 'deriveKey']
    )
    
    return crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: encoder.encode(salt),
        iterations: 100000,
        hash: 'SHA-256'
      },
      keyMaterial,
      { name: 'AES-GCM', length: 256 },
      true,
      ['encrypt', 'decrypt']
    )
  }, [])

  const encryptFile = useCallback(async (file: File, password: string, algorithm: 'AES-256-GCM' | 'AES-256-CBC'): Promise<{
    encryptedData: ArrayBuffer
    iv: Uint8Array
    salt: string
  }> => {
    setEncryptionStatus({
      isEncrypting: true,
      isDecrypting: false,
      progress: 0,
      currentOperation: 'Generating encryption key...'
    })

    // Generate salt and IV
    const salt = crypto.getRandomValues(new Uint8Array(16))
    const iv = crypto.getRandomValues(new Uint8Array(12))
    
    setEncryptionStatus(prev => ({ ...prev, progress: 20, currentOperation: 'Deriving key from password...' }))
    
    // Generate encryption key
    const key = await generateEncryptionKey(password, Array.from(salt).map(b => b.toString(16).padStart(2, '0')).join(''))
    
    setEncryptionStatus(prev => ({ ...prev, progress: 40, currentOperation: 'Reading file data...' }))
    
    // Read file data
    const arrayBuffer = await file.arrayBuffer()
    
    setEncryptionStatus(prev => ({ ...prev, progress: 60, currentOperation: 'Encrypting file...' }))
    
    // Encrypt the data
    const encryptedData = await crypto.subtle.encrypt(
      {
        name: algorithm === 'AES-256-GCM' ? 'AES-GCM' : 'AES-CBC',
        iv: iv
      },
      key,
      arrayBuffer
    )
    
    setEncryptionStatus(prev => ({ ...prev, progress: 100, currentOperation: 'Encryption complete!' }))
    
    setTimeout(() => {
      setEncryptionStatus({
        isEncrypting: false,
        isDecrypting: false,
        progress: 0,
        currentOperation: ''
      })
    }, 2000)
    
    return {
      encryptedData,
      iv,
      salt: Array.from(salt).map(b => b.toString(16).padStart(2, '0')).join('')
    }
  }, [generateEncryptionKey])

  const decryptFile = useCallback(async (encryptedFile: EncryptedFile, password: string): Promise<ArrayBuffer | null> => {
    setEncryptionStatus({
      isEncrypting: false,
      isDecrypting: true,
      progress: 0,
      currentOperation: 'Deriving decryption key...'
    })

    try {
      setEncryptionStatus(prev => ({ ...prev, progress: 30, currentOperation: 'Reconstructing key...' }))
      
      // Reconstruct the key from password and salt
      const key = await generateEncryptionKey(password, encryptedFile.salt)
      
      setEncryptionStatus(prev => ({ ...prev, progress: 60, currentOperation: 'Decrypting file...' }))
      
      // Convert hex IV back to Uint8Array
      const iv = new Uint8Array(encryptedFile.iv.match(/.{1,2}/g)?.map(byte => parseInt(byte, 16)) || [])
      
      // For demo purposes, we'll simulate decryption
      // In a real implementation, you'd decrypt the actual encrypted data
      const decryptedData = new ArrayBuffer(1024) // Simulated decrypted data
      
      setEncryptionStatus(prev => ({ ...prev, progress: 100, currentOperation: 'Decryption complete!' }))
      
      // Update file status
      setEncryptedFiles(prev => prev.map(f => 
        f.id === encryptedFile.id 
          ? { ...f, decryptionStatus: 'unlocked', lastDecrypted: new Date().toISOString(), accessCount: f.accessCount + 1 }
          : f
      ))
      
      setTimeout(() => {
        setEncryptionStatus({
          isEncrypting: false,
          isDecrypting: false,
          progress: 0,
          currentOperation: ''
        })
      }, 2000)
      
      return decryptedData
    } catch (error) {
      setEncryptionStatus(prev => ({ ...prev, currentOperation: 'Decryption failed!' }))
      
      setTimeout(() => {
        setEncryptionStatus({
          isEncrypting: false,
          isDecrypting: false,
          progress: 0,
          currentOperation: ''
        })
      }, 3000)
      
      return null
    }
  }, [generateEncryptionKey])

  // Encryption Handlers
  const handleEncryptFile = async () => {
    if (!selectedFile || !encryptionPassword || encryptionPassword !== confirmPassword) {
      alert('Please fill all fields and ensure passwords match')
      return
    }

    try {
      const { encryptedData, iv, salt } = await encryptFile(selectedFile, encryptionPassword, selectedAlgorithm)
      
      // Create new encrypted file entry
      const newEncryptedFile: EncryptedFile = {
        id: Date.now(),
        name: selectedFile.name,
        type: selectedFile.type || 'unknown',
        size: `${(selectedFile.size / 1024 / 1024).toFixed(1)}MB`,
        lastModified: 'Just now',
        sharedWith: 'Private',
        fileType: 'pdf', // Default, could be determined from file extension
        icon: FileText,
        encryptionKeyId: encryptionKeys[0].id,
        encryptionLevel: '256-bit',
        algorithm: selectedAlgorithm,
        iv: Array.from(iv).map(b => b.toString(16).padStart(2, '0')).join(''),
        salt,
        isEncrypted: true,
        encryptedSize: `${(encryptedData.byteLength / 1024 / 1024).toFixed(1)}MB`,
        decryptionStatus: 'locked',
        accessCount: 0,
        securityScore: Math.floor(Math.random() * 20) + 80 // Random score between 80-100
      }
      
      setEncryptedFiles(prev => [newEncryptedFile, ...prev])
      setShowEncryptionModal(false)
      setEncryptionPassword('')
      setConfirmPassword('')
      setSelectedFile(null)
      
      alert('File encrypted successfully!')
    } catch (error) {
      alert('Encryption failed: ' + error)
    }
  }

  const handleDecryptFile = async (file: EncryptedFile) => {
    setSelectedEncryptedFile(file)
    setShowDecryptModal(true)
  }

  const handleConfirmDecrypt = async () => {
    if (!selectedEncryptedFile || !decryptPassword) {
      alert('Please enter the decryption password')
      return
    }

    const decryptedData = await decryptFile(selectedEncryptedFile, decryptPassword)
    
    if (decryptedData) {
      setShowDecryptModal(false)
      setDecryptPassword('')
      setSelectedEncryptedFile(null)
      alert('File decrypted successfully! You can now download it.')
    } else {
      alert('Decryption failed. Please check your password.')
    }
  }

  const handleCreateNewKey = () => {
    if (!keyName) {
      alert('Please enter a key name')
      return
    }

    const newKey: EncryptionKey = {
      id: `key-${Date.now()}`,
      name: keyName,
      createdAt: new Date().toISOString().split('T')[0],
      lastUsed: 'Never',
      isActive: true,
      keyStrength: '256-bit',
      algorithm: selectedAlgorithm
    }

    setEncryptionKeys(prev => [...prev, newKey])
    setKeyName('')
    setShowKeyManagementModal(false)
    alert('New encryption key created successfully!')
  }

  const handleRotateKey = (keyId: string) => {
    setEncryptionKeys(prev => prev.map(key => 
      key.id === keyId 
        ? { ...key, lastUsed: new Date().toISOString().split('T')[0] }
        : key
    ))
    alert('Key rotated successfully!')
  }

  const handleUpdateEncryptionSettings = () => {
    // In a real app, this would save to backend
    setShowEncryptionSettingsModal(false)
    alert('Encryption settings updated successfully!')
  }

  // Access Control Handlers
  const handleGrantPermission = () => {
    if (!selectedFileForPermissions || !permissionForm.userEmail) {
      alert('Please select a file and enter user email')
      return
    }

    const newPermission: FilePermission = {
      id: `perm-${Date.now()}`,
      userId: `user-${Date.now()}`,
      userName: permissionForm.userEmail.split('@')[0],
      userEmail: permissionForm.userEmail,
      userRole: permissionForm.userRole,
      permissions: permissionForm.permissions,
      grantedAt: new Date().toISOString().split('T')[0],
      grantedBy: 'John Doe', // Current user
      expiresAt: permissionForm.expiresAt || undefined,
      isActive: true
    }

    const fileId = selectedFileForPermissions.id.toString()
    setFilePermissions(prev => ({
      ...prev,
      [fileId]: [...(prev[fileId] || []), newPermission]
    }))

    // Log the permission grant
    const auditLog: AuditLog = {
      id: `audit-${Date.now()}`,
      timestamp: new Date().toISOString(),
      userId: 'user-1',
      userName: 'John Doe',
      userEmail: 'john@example.com',
      action: 'permission_granted',
      resourceType: 'permission',
      resourceId: newPermission.id,
      resourceName: selectedFileForPermissions.name,
      details: `Permission granted to ${permissionForm.userEmail} for ${permissionForm.userRole} role`,
      ipAddress: '192.168.1.100',
      userAgent: navigator.userAgent,
      severity: 'info',
      success: true,
      metadata: { 
        grantedTo: permissionForm.userEmail, 
        permissions: Object.keys(permissionForm.permissions).filter(k => permissionForm.permissions[k as keyof typeof permissionForm.permissions])
      }
    }

    setAuditLogs(prev => [auditLog, ...prev])

    setShowPermissionModal(false)
    setPermissionForm({
      userEmail: '',
      userRole: 'viewer',
      permissions: { read: true, write: false, delete: false, share: false, decrypt: false },
      expiresAt: ''
    })
    alert('Permission granted successfully!')
  }

  const handleRevokePermission = (fileId: string, permissionId: string) => {
    setFilePermissions(prev => ({
      ...prev,
      [fileId]: prev[fileId]?.filter(p => p.id !== permissionId) || []
    }))

    // Log the permission revocation
    const permission = filePermissions[fileId]?.find(p => p.id === permissionId)
    if (permission) {
      const auditLog: AuditLog = {
        id: `audit-${Date.now()}`,
        timestamp: new Date().toISOString(),
        userId: 'user-1',
        userName: 'John Doe',
        userEmail: 'john@example.com',
        action: 'permission_revoked',
        resourceType: 'permission',
        resourceId: permissionId,
        resourceName: selectedFileForPermissions?.name || 'Unknown',
        details: `Permission revoked for ${permission.userEmail}`,
        ipAddress: '192.168.1.100',
        userAgent: navigator.userAgent,
        severity: 'warning',
        success: true,
        metadata: { revokedFrom: permission.userEmail }
      }

      setAuditLogs(prev => [auditLog, ...prev])
    }

    alert('Permission revoked successfully!')
  }

  const handleCreateAccessGroup = () => {
    // Implementation for creating access groups
    alert('Access group creation feature coming soon!')
  }

  // Audit Logging Handlers
  const addAuditLog = (log: Omit<AuditLog, 'id' | 'timestamp'>) => {
    const newLog: AuditLog = {
      ...log,
      id: `audit-${Date.now()}`,
      timestamp: new Date().toISOString()
    }
    setAuditLogs(prev => [newLog, ...prev])
  }

  const getFilteredAuditLogs = () => {
    let filtered = auditLogs

    if (auditFilters.dateRange !== 'custom') {
      const now = new Date()
      let startDate: Date

      switch (auditFilters.dateRange) {
        case 'today':
          startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate())
          break
        case 'yesterday':
          startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1)
          break
        case 'week':
          startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7)
          break
        case 'month':
          startDate = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate())
          break
        default:
          startDate = new Date(0)
      }

      filtered = filtered.filter(log => new Date(log.timestamp) >= startDate)
    } else if (auditFilters.startDate && auditFilters.endDate) {
      filtered = filtered.filter(log => {
        const logDate = new Date(log.timestamp)
        const start = new Date(auditFilters.startDate!)
        const end = new Date(auditFilters.endDate!)
        return logDate >= start && logDate <= end
      })
    }

    if (auditFilters.action) {
      filtered = filtered.filter(log => log.action === auditFilters.action)
    }

    if (auditFilters.severity) {
      filtered = filtered.filter(log => log.severity === auditFilters.severity)
    }

    if (auditFilters.userId) {
      filtered = filtered.filter(log => log.userId === auditFilters.userId)
    }

    if (auditFilters.success !== undefined) {
      filtered = filtered.filter(log => log.success === auditFilters.success)
    }

    return filtered
  }

  const exportAuditLogs = () => {
    const filteredLogs = getFilteredAuditLogs()
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Timestamp,User,Action,Resource,Details,IP Address,Severity,Success\n" +
      filteredLogs.map(log => 
        `${new Date(log.timestamp).toLocaleString()},${log.userName},${log.action},${log.resourceName},${log.details},${log.ipAddress},${log.severity},${log.success}`
      ).join("\n")
    
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", "audit_logs.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Enhanced encryption handlers with audit logging
  const handleEncryptFileWithAudit = async () => {
    if (!selectedFile || !encryptionPassword || encryptionPassword !== confirmPassword) {
      alert('Please fill all fields and ensure passwords match')
      return
    }

    try {
      const { encryptedData, iv, salt } = await encryptFile(selectedFile, encryptionPassword, selectedAlgorithm)
      
      // Create new encrypted file entry
      const newEncryptedFile: EncryptedFile = {
        id: Date.now(),
        name: selectedFile.name,
        type: selectedFile.type || 'unknown',
        size: `${(selectedFile.size / 1024 / 1024).toFixed(1)}MB`,
        lastModified: 'Just now',
        sharedWith: 'Private',
        fileType: 'pdf', // Default, could be determined from file extension
        icon: FileText,
        encryptionKeyId: encryptionKeys[0].id,
        encryptionLevel: '256-bit',
        algorithm: selectedAlgorithm,
        iv: Array.from(iv).map(b => b.toString(16).padStart(2, '0')).join(''),
        salt,
        isEncrypted: true,
        encryptedSize: `${(encryptedData.byteLength / 1024 / 1024).toFixed(1)}MB`,
        decryptionStatus: 'locked',
        accessCount: 0,
        securityScore: Math.floor(Math.random() * 20) + 80 // Random score between 80-100
      }
      
      setEncryptedFiles(prev => [newEncryptedFile, ...prev])
      setShowEncryptionModal(false)
      setEncryptionPassword('')
      setConfirmPassword('')
      setSelectedFile(null)
      
      // Add audit log
      addAuditLog({
        userId: 'user-1',
        userName: 'John Doe',
        userEmail: 'john@example.com',
        action: 'file_encrypted',
        resourceType: 'file',
        resourceId: newEncryptedFile.id.toString(),
        resourceName: newEncryptedFile.name,
        details: `File encrypted using ${selectedAlgorithm} algorithm`,
        ipAddress: '192.168.1.100',
        userAgent: navigator.userAgent,
        severity: 'info',
        success: true,
        metadata: { algorithm: selectedAlgorithm, keyId: encryptionKeys[0].id }
      })
      
      alert('File encrypted successfully!')
    } catch (error) {
      // Add failed audit log
      addAuditLog({
        userId: 'user-1',
        userName: 'John Doe',
        userEmail: 'john@example.com',
        action: 'file_encrypted',
        resourceType: 'file',
        resourceId: 'unknown',
        resourceName: selectedFile?.name || 'Unknown',
        details: `Encryption failed: ${error instanceof Error ? error.message : String(error)}`,
        ipAddress: '192.168.1.100',
        userAgent: navigator.userAgent,
        severity: 'error',
        success: false,
        metadata: { error: error instanceof Error ? error.message : String(error) }
      })
      
      alert('Encryption failed: ' + (error instanceof Error ? error.message : String(error)))
    }
  }

  const handleDecryptFileWithAudit = async (file: EncryptedFile, password: string) => {
    const decryptedData = await decryptFile(file, password)
    
    if (decryptedData) {
      // Add successful decryption audit log
      addAuditLog({
        userId: 'user-1',
        userName: 'John Doe',
        userEmail: 'john@example.com',
        action: 'file_decrypted',
        resourceType: 'file',
        resourceId: file.id.toString(),
        resourceName: file.name,
        details: 'File decrypted successfully',
        ipAddress: '192.168.1.100',
        userAgent: navigator.userAgent,
        severity: 'info',
        success: true,
        metadata: { algorithm: file.algorithm, keyId: file.encryptionKeyId }
      })
      
      return decryptedData
    } else {
      // Add failed decryption audit log
      addAuditLog({
        userId: 'user-1',
        userName: 'John Doe',
        userEmail: 'john@example.com',
        action: 'file_decrypted',
        resourceType: 'file',
        resourceId: file.id.toString(),
        resourceName: file.name,
        details: 'Decryption failed - incorrect password',
        ipAddress: '192.168.1.100',
        userAgent: navigator.userAgent,
        severity: 'warning',
        success: false,
        metadata: { algorithm: file.algorithm, keyId: file.encryptionKeyId }
      })
      
      return null
    }
  }

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
                  <button 
                    onClick={() => setActiveTab('overview')}
                    className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                  >
                    View All
                  </button>
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
                <button 
                  onClick={() => setActiveFilter(activeFilter === 'all' ? 'documents' : 'all')}
                  className="text-gray-400 hover:text-gray-600"
                >
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
                          <button 
                            onClick={() => setShowFileDetailsModal(file)}
                            className="text-gray-400 hover:text-gray-600"
                          >
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
                <button 
                  onClick={() => setShowAccessControlModal(true)}
                  className="text-sm text-gray-600 hover:text-gray-800"
                >
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
          {/* Encryption Overview */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Encrypted Documents</h2>
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Lock className="h-4 w-4" />
                  <span>End-to-end encrypted</span>
                </div>
                  <button
                    onClick={() => setShowEncryptionModal(true)}
                    className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Encrypt New File
                  </button>
              </div>
            </div>
          </div>

            {/* Enhanced Encryption Stats */}
          <div className="p-6 border-b border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                  <div className="text-2xl font-bold text-primary-600">{encryptedFiles.length}</div>
                <div className="text-sm text-gray-600">Encrypted Files</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">256-bit</div>
                <div className="text-sm text-gray-600">AES Encryption</div>
              </div>
              <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {Math.round(encryptedFiles.reduce((acc, file) => acc + file.securityScore, 0) / encryptedFiles.length)}%
              </div>
                  <div className="text-sm text-gray-600">Avg Security Score</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{encryptionKeys.length}</div>
                  <div className="text-sm text-gray-600">Active Keys</div>
                </div>
            </div>
          </div>

            {/* Encryption Controls */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setShowKeyManagementModal(true)}
                    className="text-sm text-gray-600 hover:text-gray-800 flex items-center gap-2"
                  >
                    <Key className="h-4 w-4" />
                    Manage Keys
                  </button>
                  <button
                    onClick={() => setShowEncryptionSettingsModal(true)}
                    className="text-sm text-gray-600 hover:text-gray-800 flex items-center gap-2"
                  >
                    <Settings className="h-4 w-4" />
                    Settings
                  </button>
                  <button
                    onClick={() => setShowAccessControlModal(true)}
                    className="text-sm text-gray-600 hover:text-gray-800 flex items-center gap-2"
                  >
                    <UserCheck className="h-4 w-4" />
                    Access Control
                  </button>
                  <button
                    onClick={() => setShowAuditLogModal(true)}
                    className="text-sm text-gray-600 hover:text-gray-800 flex items-center gap-2"
                  >
                    <Clock className="h-4 w-4" />
                    Audit Logs
                  </button>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Shield className="h-4 w-4 text-green-600" />
                  <span>Military-grade encryption active</span>
                </div>
              </div>
            </div>

            {/* Enhanced Encrypted Files Table */}
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
                        <span>Encryption Details</span>
                      <ChevronDown className="h-3 w-3" />
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center space-x-1">
                        <span>Security Status</span>
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
                        <span>Permissions</span>
                        <ChevronDown className="h-3 w-3" />
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center space-x-1">
                        <span>Actions</span>
                        <ChevronDown className="h-3 w-3" />
                      </div>
                    </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                  {encryptedFiles.map((file) => (
                  <tr key={file.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8">
                          {getFileIcon(file.fileType)}
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">{file.name}</div>
                            <div className="text-xs text-gray-500">{file.encryptedSize}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className="space-y-1">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                            {file.algorithm}
                      </span>
                          <div className="text-xs text-gray-500">
                            Key: {encryptionKeys.find(k => k.id === file.encryptionKeyId)?.name}
                          </div>
                        </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className="space-y-1">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            file.decryptionStatus === 'unlocked' 
                              ? 'bg-green-100 text-green-800' 
                              : file.decryptionStatus === 'error'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {file.decryptionStatus === 'unlocked' ? 'Unlocked' : 
                             file.decryptionStatus === 'error' ? 'Error' : 'Locked'}
                      </span>
                          <div className="text-xs text-gray-500">
                            Score: {file.securityScore}/100
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="space-y-1">
                          <div>{file.lastModified}</div>
                          {file.lastDecrypted && (
                            <div className="text-xs text-gray-400">
                              Decrypted: {new Date(file.lastDecrypted).toISOString().split('T')[0]}
                            </div>
                          )}
                        </div>
                    </td>
                                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-gray-500">
                              {filePermissions[file.id.toString()]?.length || 0} users
                            </span>
                            <button
                              onClick={() => {
                                setSelectedFileForPermissions(file)
                                setShowPermissionModal(true)
                              }}
                              className="text-blue-600 hover:text-blue-700 text-xs"
                            >
                              Manage
                            </button>
                          </div>
                          {filePermissions[file.id.toString()]?.slice(0, 2).map((perm) => (
                            <div key={perm.id} className="flex items-center space-x-2">
                              <span className="text-xs text-gray-600">{perm.userName}</span>
                              <span className={`text-xs px-1 py-0.5 rounded ${
                                perm.userRole === 'owner' ? 'bg-red-100 text-red-800' :
                                perm.userRole === 'admin' ? 'bg-orange-100 text-orange-800' :
                                perm.userRole === 'editor' ? 'bg-blue-100 text-blue-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {perm.userRole}
                              </span>
                            </div>
                          ))}
                          {filePermissions[file.id.toString()]?.length > 2 && (
                            <span className="text-xs text-gray-400">
                              +{filePermissions[file.id.toString()]!.length - 2} more
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          {file.decryptionStatus === 'locked' ? (
                            <button
                              onClick={() => handleDecryptFile(file)}
                              className="text-blue-600 hover:text-blue-700 flex items-center gap-1"
                            >
                              <Eye className="h-4 w-4" />
                              Decrypt
                            </button>
                          ) : (
                            <button
                              onClick={() => handleDecryptFile(file)}
                              className="text-green-600 hover:text-blue-700 flex items-center gap-1"
                            >
                              <Eye className="h-4 w-4" />
                              Decrypt
                            </button>
                          )}
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

          {/* Encryption Progress Indicator */}
          {(encryptionStatus.isEncrypting || encryptionStatus.isDecrypting) && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <RefreshCw className="h-4 w-4 text-blue-600 animate-spin" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900">
                    {encryptionStatus.isEncrypting ? 'Encrypting File...' : 'Decrypting File...'}
                  </div>
                  <div className="text-xs text-gray-500">{encryptionStatus.currentOperation}</div>
                </div>
                <div className="text-sm font-medium text-gray-900">{encryptionStatus.progress}%</div>
              </div>
              <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${encryptionStatus.progress}%` }}
                ></div>
          </div>
            </div>
          )}
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

            <p className="text-gray-600 mb-6">
              Are you sure you want to delete "{showDeleteModal.name}"? This action cannot be undone.
            </p>

            <div className="flex justify-end space-x-3">
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
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Encryption Modal */}
      {showEncryptionModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 relative">
            <button onClick={() => setShowEncryptionModal(false)} className="absolute right-4 top-4 text-gray-400 hover:text-gray-600">
              <X className="h-5 w-5" />
            </button>
            
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
              <Lock className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">Encrypt New File</h3>
            <p className="text-sm text-gray-600 mb-6 text-center">
              Secure your file with military-grade AES-256 encryption
            </p>
            
            <div className="space-y-4">
              {/* File Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select File</label>
                <input
                  type="file"
                  onChange={handleFileSelect}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                {selectedFile && (
                  <p className="text-xs text-gray-500 mt-1">
                    Selected: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(1)}MB)
                  </p>
                )}
                </div>
              
              {/* Algorithm Selection */}
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Encryption Algorithm</label>
                <select
                  value={selectedAlgorithm}
                  onChange={(e) => setSelectedAlgorithm(e.target.value as 'AES-256-GCM' | 'AES-256-CBC')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="AES-256-GCM">AES-256-GCM (Recommended)</option>
                  <option value="AES-256-CBC">AES-256-CBC</option>
                </select>
                </div>
              
              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Encryption Password</label>
                <input
                  type="password"
                  value={encryptionPassword}
                  onChange={(e) => setEncryptionPassword(e.target.value)}
                  placeholder="Enter strong password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="mt-6 flex space-x-3">
              <button
                onClick={() => setShowEncryptionModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleEncryptFile}
                disabled={!selectedFile || !encryptionPassword || encryptionPassword !== confirmPassword}
                className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Encrypt File
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Decrypt Modal */}
      {showDecryptModal && selectedEncryptedFile && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 relative">
            <button onClick={() => setShowDecryptModal(false)} className="absolute right-4 top-4 text-gray-400 hover:text-gray-600">
              <X className="h-5 w-5" />
            </button>
            
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <Eye className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">Decrypt File</h3>
            <p className="text-sm text-gray-600 mb-6 text-center">
              Enter the password to decrypt "{selectedEncryptedFile.name}"
            </p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Decryption Password</label>
                <input
                  type="password"
                  value={decryptPassword}
                  onChange={(e) => setDecryptPassword(e.target.value)}
                  placeholder="Enter encryption password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-600">
                  <p><strong>File:</strong> {selectedEncryptedFile.name}</p>
                  <p><strong>Algorithm:</strong> {selectedEncryptedFile.algorithm}</p>
                  <p><strong>Security Score:</strong> {selectedEncryptedFile.securityScore}/100</p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex space-x-3">
              <button
                onClick={() => setShowDecryptModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDecrypt}
                disabled={!decryptPassword}
                className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Decrypt File
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Key Management Modal */}
      {showKeyManagementModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl p-6 relative">
            <button onClick={() => setShowKeyManagementModal(false)} className="absolute right-4 top-4 text-gray-400 hover:text-gray-600">
              <X className="h-5 w-5" />
            </button>
            
            <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
              <Key className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">Encryption Key Management</h3>
            <p className="text-sm text-gray-600 mb-6 text-center">
              Manage your encryption keys and security settings
            </p>
            
            {/* Create New Key */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h4 className="text-lg font-medium text-gray-900 mb-3">Create New Key</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Key Name</label>
                  <input
                    type="text"
                    value={keyName}
                    onChange={(e) => setKeyName(e.target.value)}
                    placeholder="Enter key name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Algorithm</label>
                  <select
                    value={selectedAlgorithm}
                    onChange={(e) => setSelectedAlgorithm(e.target.value as 'AES-256-GCM' | 'AES-256-CBC')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="AES-256-GCM">AES-256-GCM</option>
                    <option value="AES-256-CBC">AES-256-CBC</option>
                  </select>
                </div>
              </div>
              <button
                onClick={handleCreateNewKey}
                disabled={!keyName}
                className="mt-3 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create Key
              </button>
            </div>
            
            {/* Existing Keys */}
            <div>
              <h4 className="text-lg font-medium text-gray-900 mb-3">Existing Keys</h4>
              <div className="space-y-3">
                {encryptionKeys.map((key) => (
                  <div key={key.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{key.name}</p>
                      <p className="text-sm text-gray-600">
                        {key.algorithm} • Created: {key.createdAt} • Last used: {key.lastUsed}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        key.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {key.isActive ? 'Active' : 'Inactive'}
                      </span>
                      <button
                        onClick={() => handleRotateKey(key.id)}
                        className="text-blue-600 hover:text-blue-700 text-sm"
                      >
                        Rotate
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Encryption Settings Modal */}
      {showEncryptionSettingsModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 relative">
            <button onClick={() => setShowEncryptionSettingsModal(false)} className="absolute right-4 top-4 text-gray-400 hover:text-gray-600">
              <X className="h-5 w-5" />
            </button>
            
            <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-4">
              <Settings className="h-8 w-8 text-orange-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">Encryption Settings</h3>
            <p className="text-sm text-gray-600 mb-6 text-center">
              Configure your encryption preferences and security policies
            </p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Default Algorithm</label>
                <select
                  value={encryptionSettings.defaultAlgorithm}
                  onChange={(e) => setEncryptionSettings({...encryptionSettings, defaultAlgorithm: e.target.value as 'AES-256-GCM' | 'AES-256-CBC'})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="AES-256-GCM">AES-256-GCM (Recommended)</option>
                  <option value="AES-256-CBC">AES-256-CBC</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Key Rotation (days)</label>
                <input
                  type="number"
                  value={encryptionSettings.keyRotationDays}
                  onChange={(e) => setEncryptionSettings({...encryptionSettings, keyRotationDays: parseInt(e.target.value)})}
                  min="30"
                  max="365"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-700">Require Password on Decrypt</label>
                  <p className="text-xs text-gray-500">Always prompt for password when decrypting files</p>
                </div>
                <input
                  type="checkbox"
                  checked={encryptionSettings.requirePasswordOnDecrypt}
                  onChange={(e) => setEncryptionSettings({...encryptionSettings, requirePasswordOnDecrypt: e.target.checked})}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Auto-lock After (minutes)</label>
                <input
                  type="number"
                  value={encryptionSettings.autoLockAfterMinutes}
                  onChange={(e) => setEncryptionSettings({...encryptionSettings, autoLockAfterMinutes: parseInt(e.target.value)})}
                  min="5"
                  max="1440"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-700">Enable Audit Logging</label>
                  <p className="text-xs text-gray-500">Log all encryption/decryption activities</p>
                </div>
                <input
                  type="checkbox"
                  checked={encryptionSettings.enableAuditLogging}
                  onChange={(e) => setEncryptionSettings({...encryptionSettings, enableAuditLogging: e.target.checked})}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
              </div>
            </div>
            
            <div className="mt-6 flex space-x-3">
              <button
                onClick={() => setShowEncryptionSettingsModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateEncryptionSettings}
                className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
              >
                Save Settings
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Access Control Modal */}
      {showAccessControlModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
          <div className="bg-white rounded-2xl w-full max-w-4xl p-6 relative">
            <button onClick={() => setShowAccessControlModal(false)} className="absolute right-4 top-4 text-gray-400 hover:text-gray-600">
              <X className="h-5 w-5" />
            </button>
            
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
              <UserCheck className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">Access Control Management</h3>
            <p className="text-sm text-gray-600 mb-6 text-center">
              Manage file permissions and access groups for enhanced security
            </p>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* File Permissions */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-lg font-medium text-gray-900 mb-3">File Permissions</h4>
                <div className="space-y-3">
                  {encryptedFiles.slice(0, 5).map((file) => (
                    <div key={file.id} className="flex items-center justify-between p-3 bg-white rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{file.name}</p>
                        <p className="text-sm text-gray-600">
                          {filePermissions[file.id.toString()]?.length || 0} users have access
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedFileForPermissions(file)
                          setShowPermissionModal(true)
                        }}
                        className="text-blue-600 hover:text-blue-700 text-sm"
                      >
                        Manage
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Access Groups */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-lg font-medium text-gray-900 mb-3">Access Groups</h4>
                <div className="space-y-3">
                  {accessGroups.map((group) => (
                    <div key={group.id} className="p-3 bg-white rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium text-gray-900">{group.name}</p>
                        <span className="text-xs text-gray-500">{group.members.length} members</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{group.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {Object.entries(group.permissions).map(([perm, enabled]) => (
                          <span key={perm} className={`text-xs px-2 py-1 rounded ${
                            enabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                          }`}>
                            {perm}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={handleCreateAccessGroup}
                    className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-700"
                  >
                    <Plus className="h-4 w-4 mx-auto mb-1" />
                    Create New Group
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Permission Management Modal */}
      {showPermissionModal && selectedFileForPermissions && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl p-6 relative">
            <button onClick={() => setShowPermissionModal(false)} className="absolute right-4 top-4 text-gray-400 hover:text-gray-600">
              <X className="h-5 w-5" />
            </button>
            
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <UserCheck className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">Manage Permissions</h3>
            <p className="text-sm text-gray-600 mb-6 text-center">
              Control access to "{selectedFileForPermissions.name}"
            </p>
            
            {/* Current Permissions */}
            <div className="mb-6">
              <h4 className="text-lg font-medium text-gray-900 mb-3">Current Permissions</h4>
              <div className="space-y-3">
                {filePermissions[selectedFileForPermissions.id.toString()]?.map((permission) => (
                  <div key={permission.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{permission.userName}</p>
                      <p className="text-sm text-gray-600">{permission.userEmail}</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {Object.entries(permission.permissions).map(([perm, enabled]) => (
                          <span key={perm} className={`text-xs px-2 py-1 rounded ${
                            enabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                          }`}>
                            {perm}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`text-xs px-2 py-1 rounded ${
                        permission.userRole === 'owner' ? 'bg-red-100 text-red-800' :
                        permission.userRole === 'admin' ? 'bg-orange-100 text-orange-800' :
                        permission.userRole === 'editor' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {permission.userRole}
                      </span>
                      <button
                        onClick={() => handleRevokePermission(selectedFileForPermissions.id.toString(), permission.id)}
                        className="text-red-600 hover:text-red-700 text-sm"
                      >
                        Revoke
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Grant New Permission */}
            <div className="border-t pt-6">
              <h4 className="text-lg font-medium text-gray-900 mb-3">Grant New Permission</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">User Email</label>
                  <input
                    type="email"
                    value={permissionForm.userEmail}
                    onChange={(e) => setPermissionForm({...permissionForm, userEmail: e.target.value})}
                    placeholder="user@example.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                  <select
                    value={permissionForm.userRole}
                    onChange={(e) => setPermissionForm({...permissionForm, userRole: e.target.value as any})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="viewer">Viewer</option>
                    <option value="editor">Editor</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>
              
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Permissions</label>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {Object.entries(permissionForm.permissions).map(([perm, enabled]) => (
                    <label key={perm} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={enabled}
                        onChange={(e) => setPermissionForm({
                          ...permissionForm,
                          permissions: {
                            ...permissionForm.permissions,
                            [perm]: e.target.checked
                          }
                        })}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700 capitalize">{perm}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Expires At (Optional)</label>
                <input
                  type="date"
                  value={permissionForm.expiresAt}
                  onChange={(e) => setPermissionForm({...permissionForm, expiresAt: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="mt-6 flex space-x-3">
              <button
                onClick={() => setShowPermissionModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleGrantPermission}
                disabled={!permissionForm.userEmail}
                className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Grant Permission
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Audit Log Modal */}
      {showAuditLogModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
          <div className="bg-white rounded-2xl w-full max-w-6xl p-6 relative">
            <button onClick={() => setShowAuditLogModal(false)} className="absolute right-4 top-4 text-gray-400 hover:text-gray-600">
              <X className="h-5 w-5" />
            </button>
            
            <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
              <Clock className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">Audit Logs</h3>
            <p className="text-sm text-gray-600 mb-6 text-center">
              Monitor all file access and modification activities
            </p>
            
            {/* Filters */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h4 className="text-lg font-medium text-gray-900 mb-3">Filters</h4>
              <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                  <select
                    value={auditFilters.dateRange}
                    onChange={(e) => setAuditFilters({...auditFilters, dateRange: e.target.value as any})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="today">Today</option>
                    <option value="yesterday">Yesterday</option>
                    <option value="week">Last 7 days</option>
                    <option value="month">Last 30 days</option>
                    <option value="custom">Custom</option>
                  </select>
                </div>
                
                {auditFilters.dateRange === 'custom' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                      <input
                        type="date"
                        value={auditFilters.startDate || ''}
                        onChange={(e) => setAuditFilters({...auditFilters, startDate: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                      <input
                        type="date"
                        value={auditFilters.endDate || ''}
                        onChange={(e) => setAuditFilters({...auditFilters, endDate: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                  </>
                )}
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Action</label>
                  <select
                    value={auditFilters.action}
                    onChange={(e) => setAuditFilters({...auditFilters, action: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">All Actions</option>
                    <option value="file_encrypted">File Encrypted</option>
                    <option value="file_decrypted">File Decrypted</option>
                    <option value="permission_granted">Permission Granted</option>
                    <option value="permission_revoked">Permission Revoked</option>
                    <option value="access_denied">Access Denied</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Severity</label>
                  <select
                    value={auditFilters.severity}
                    onChange={(e) => setAuditFilters({...auditFilters, severity: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">All Severities</option>
                    <option value="info">Info</option>
                    <option value="warning">Warning</option>
                    <option value="error">Error</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Success</label>
                  <select
                    value={auditFilters.success === undefined ? '' : auditFilters.success.toString()}
                    onChange={(e) => setAuditFilters({...auditFilters, success: e.target.value === '' ? undefined : e.target.value === 'true'})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">All</option>
                    <option value="true">Success</option>
                    <option value="false">Failed</option>
                  </select>
                </div>
              </div>
              
              <div className="mt-4 flex justify-between items-center">
                <button
                  onClick={() => setAuditFilters({
                    dateRange: 'week',
                    action: '',
                    severity: '',
                    userId: '',
                    success: undefined
                  })}
                  className="text-sm text-gray-600 hover:text-gray-800"
                >
                  Clear Filters
                </button>
                <button
                  onClick={exportAuditLogs}
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export CSV
                </button>
              </div>
            </div>

            {/* Audit Logs Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resource</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP Address</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Severity</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {getFilteredAuditLogs().slice(0, 20).map((log) => (
                    <tr key={log.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        {new Date(log.timestamp).toLocaleString()}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{log.userName}</div>
                          <div className="text-xs text-gray-500">{log.userEmail}</div>
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                          {log.action.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{log.resourceName}</td>
                      <td className="px-4 py-3 text-sm text-gray-600 max-w-xs truncate">{log.details}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{log.ipAddress}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          log.severity === 'critical' ? 'bg-red-100 text-red-800' :
                          log.severity === 'error' ? 'bg-orange-100 text-orange-800' :
                          log.severity === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {log.severity}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          log.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {log.success ? 'Success' : 'Failed'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-6 text-center text-sm text-gray-500">
              Showing {Math.min(getFilteredAuditLogs().length, 20)} of {getFilteredAuditLogs().length} logs
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Documents

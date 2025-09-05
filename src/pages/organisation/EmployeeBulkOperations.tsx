import React, { useState, useRef } from 'react'
import { 
  Upload, 
  Download, 
  Users, 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  X, 
  Trash2, 
  Shield, 
  Mail, 
  Clock,
  Eye,
  Edit,
  RefreshCw,
  FileSpreadsheet,
  AlertTriangle,
  Check,
  XCircle
} from 'lucide-react'

interface BulkOperation {
  id: string
  type: 'import' | 'export' | 'update' | 'delete' | 'verify'
  status: 'pending' | 'processing' | 'completed' | 'failed'
  description: string
  recordsCount: number
  createdAt: string
  completedAt?: string
  errorMessage?: string
}

interface ImportResult {
  totalRows: number
  successfulRows: number
  failedRows: number
  errors: Array<{
    row: number
    field: string
    message: string
  }>
  employees: Array<{
    firstName: string
    lastName: string
    email: string
    department: string
    position: string
    status: 'success' | 'error'
    errors?: string[]
  }>
}

const EmployeeBulkOperations = () => {
  const [activeTab, setActiveTab] = useState<'import' | 'export' | 'history'>('import')
  const [showImportModal, setShowImportModal] = useState(false)
  const [showExportModal, setShowExportModal] = useState(false)
  const [showBulkActionModal, setShowBulkActionModal] = useState(false)
  const [selectedEmployees, setSelectedEmployees] = useState<number[]>([])
  const [bulkAction, setBulkAction] = useState<'verify' | 'update' | 'delete' | 'notify'>('verify')
  
  const [importFile, setImportFile] = useState<File | null>(null)
  const [importResult, setImportResult] = useState<ImportResult | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [exportFormat, setExportFormat] = useState<'csv' | 'excel' | 'pdf'>('csv')
  const [exportFilters, setExportFilters] = useState({
    department: 'all',
    status: 'all',
    dateRange: 'all'
  })

  const fileInputRef = useRef<HTMLInputElement>(null)

  const mockBulkOperations: BulkOperation[] = [
    {
      id: '1',
      type: 'import',
      status: 'completed',
      description: 'Employee Import - Q1 2024',
      recordsCount: 25,
      createdAt: '2024-01-15T10:30:00Z',
      completedAt: '2024-01-15T10:35:00Z'
    },
    {
      id: '2',
      type: 'export',
      status: 'completed',
      description: 'Employee Export - All Departments',
      recordsCount: 150,
      createdAt: '2024-01-14T14:20:00Z',
      completedAt: '2024-01-14T14:22:00Z'
    },
    {
      id: '3',
      type: 'verify',
      status: 'processing',
      description: 'Bulk Verification - Engineering Team',
      recordsCount: 12,
      createdAt: '2024-01-16T09:15:00Z'
    },
    {
      id: '4',
      type: 'import',
      status: 'failed',
      description: 'Employee Import - Marketing Team',
      recordsCount: 8,
      createdAt: '2024-01-13T16:45:00Z',
      errorMessage: 'Invalid email format in row 3'
    }
  ]

  const mockEmployees = [
    { id: 1, name: 'Sarah Johnson', email: 'sarah.johnson@company.com', department: 'Engineering', status: 'completed' },
    { id: 2, name: 'Michael Chen', email: 'michael.chen@company.com', department: 'Marketing', status: 'pending' },
    { id: 3, name: 'Emily Davis', email: 'emily.davis@company.com', department: 'HR', status: 'failed' },
    { id: 4, name: 'David Wilson', email: 'david.wilson@company.com', department: 'Finance', status: 'expired' },
    { id: 5, name: 'Lisa Wang', email: 'lisa.wang@company.com', department: 'Engineering', status: 'completed' },
    { id: 6, name: 'Robert Brown', email: 'robert.brown@company.com', department: 'Sales', status: 'pending' }
  ]

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setImportFile(file)
    }
  }

  const processImport = async () => {
    if (!importFile) return

    setIsProcessing(true)
    
    // Simulate CSV processing
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    // Mock import result
    const result: ImportResult = {
      totalRows: 10,
      successfulRows: 8,
      failedRows: 2,
      errors: [
        { row: 3, field: 'email', message: 'Invalid email format' },
        { row: 7, field: 'department', message: 'Department does not exist' }
      ],
      employees: [
        { firstName: 'John', lastName: 'Doe', email: 'john.doe@company.com', department: 'Engineering', position: 'Developer', status: 'success' },
        { firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@company.com', department: 'Marketing', position: 'Manager', status: 'success' },
        { firstName: 'Bob', lastName: 'Johnson', email: 'invalid-email', department: 'HR', position: 'Specialist', status: 'error', errors: ['Invalid email format'] },
        { firstName: 'Alice', lastName: 'Brown', email: 'alice.brown@company.com', department: 'Finance', position: 'Analyst', status: 'success' },
        { firstName: 'Charlie', lastName: 'Wilson', email: 'charlie.wilson@company.com', department: 'InvalidDept', position: 'Manager', status: 'error', errors: ['Department does not exist'] }
      ]
    }
    
    setImportResult(result)
    setIsProcessing(false)
  }

  const handleExport = async () => {
    setIsProcessing(true)
    
    // Simulate export processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsProcessing(false)
    setShowExportModal(false)
    
    // In a real app, this would trigger a download
    alert(`Export completed! ${exportFormat.toUpperCase()} file downloaded.`)
  }

  const handleBulkAction = async () => {
    setIsProcessing(true)
    
    // Simulate bulk action processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsProcessing(false)
    setShowBulkActionModal(false)
    setSelectedEmployees([])
    
    alert(`Bulk ${bulkAction} completed for ${selectedEmployees.length} employees!`)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'processing':
        return <RefreshCw className="w-4 h-4 text-blue-600 animate-spin" />
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-600" />
      default:
        return <Clock className="w-4 h-4 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'processing':
        return 'bg-blue-100 text-blue-800'
      case 'failed':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'import', name: 'Import', icon: Upload },
            { id: 'export', name: 'Export', icon: Download },
            { id: 'history', name: 'History', icon: Clock }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon className="w-4 h-4 mr-2" />
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Import Tab */}
      {activeTab === 'import' && (
        <div className="space-y-6">
          {/* Import Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Upload className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">CSV Import</h3>
                  <p className="text-sm text-gray-600">Import employees from CSV file</p>
                </div>
              </div>
              <button
                onClick={() => setShowImportModal(true)}
                className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                <Upload className="w-4 h-4 mr-2" />
                Import CSV
              </button>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <FileText className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">Template Download</h3>
                  <p className="text-sm text-gray-600">Download CSV template</p>
                </div>
              </div>
              <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                <Download className="w-4 h-4 mr-2" />
                Download Template
              </button>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">Bulk Actions</h3>
                  <p className="text-sm text-gray-600">Perform actions on selected employees</p>
                </div>
              </div>
              <button
                onClick={() => setShowBulkActionModal(true)}
                className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                <Users className="w-4 h-4 mr-2" />
                Bulk Actions
              </button>
            </div>
          </div>

          {/* Employee Selection Table */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Select Employees for Bulk Actions</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left">
                      <input
                        type="checkbox"
                        checked={selectedEmployees.length === mockEmployees.length}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedEmployees(mockEmployees.map(emp => emp.id))
                          } else {
                            setSelectedEmployees([])
                          }
                        }}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Employee
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Department
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mockEmployees.map((employee) => (
                    <tr key={employee.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={selectedEmployees.includes(employee.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedEmployees([...selectedEmployees, employee.id])
                            } else {
                              setSelectedEmployees(selectedEmployees.filter(id => id !== employee.id))
                            }
                          }}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                          <div className="text-sm text-gray-500">{employee.email}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {employee.department}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          employee.status === 'completed' ? 'bg-green-100 text-green-800' :
                          employee.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          employee.status === 'failed' ? 'bg-red-100 text-red-800' :
                          'bg-orange-100 text-orange-800'
                        }`}>
                          {employee.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-900">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="text-gray-600 hover:text-gray-900">
                            <Edit className="w-4 h-4" />
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

      {/* Export Tab */}
      {activeTab === 'export' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Export Employees</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Export Format</label>
                <select
                  value={exportFormat}
                  onChange={(e) => setExportFormat(e.target.value as any)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="csv">CSV</option>
                  <option value="excel">Excel</option>
                  <option value="pdf">PDF</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                <select
                  value={exportFilters.department}
                  onChange={(e) => setExportFilters({...exportFilters, department: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Departments</option>
                  <option value="engineering">Engineering</option>
                  <option value="marketing">Marketing</option>
                  <option value="hr">HR</option>
                  <option value="finance">Finance</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={exportFilters.status}
                  onChange={(e) => setExportFilters({...exportFilters, status: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Statuses</option>
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                  <option value="failed">Failed</option>
                  <option value="expired">Expired</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                <select
                  value={exportFilters.dateRange}
                  onChange={(e) => setExportFilters({...exportFilters, dateRange: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Time</option>
                  <option value="last30">Last 30 Days</option>
                  <option value="last90">Last 90 Days</option>
                  <option value="lastyear">Last Year</option>
                </select>
              </div>
            </div>
            
            <div className="mt-6">
              <button
                onClick={handleExport}
                disabled={isProcessing}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Exporting...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 mr-2" />
                    Export Data
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* History Tab */}
      {activeTab === 'history' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Bulk Operations History</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Operation
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Records
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mockBulkOperations.map((operation) => (
                    <tr key={operation.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {operation.type === 'import' && <Upload className="w-4 h-4 text-blue-600 mr-2" />}
                          {operation.type === 'export' && <Download className="w-4 h-4 text-green-600 mr-2" />}
                          {operation.type === 'verify' && <Shield className="w-4 h-4 text-purple-600 mr-2" />}
                          {operation.type === 'update' && <Edit className="w-4 h-4 text-orange-600 mr-2" />}
                          {operation.type === 'delete' && <Trash2 className="w-4 h-4 text-red-600 mr-2" />}
                          <span className="text-sm font-medium text-gray-900 capitalize">
                            {operation.type}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {operation.description}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {operation.recordsCount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {getStatusIcon(operation.status)}
                          <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(operation.status)}`}>
                            {operation.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(operation.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900">
                          <Eye className="w-4 h-4" />
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

      {/* Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Import Employees</h2>
              <button 
                onClick={() => setShowImportModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {!importResult ? (
                <>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <FileSpreadsheet className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-lg font-medium text-gray-900 mb-2">Upload CSV File</p>
                    <p className="text-sm text-gray-600 mb-4">
                      Select a CSV file with employee data. Make sure it follows the required format.
                    </p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".csv"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mx-auto"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Choose File
                    </button>
                  </div>
                  
                  {importFile && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <FileSpreadsheet className="w-5 h-5 text-gray-600 mr-2" />
                          <span className="text-sm font-medium text-gray-900">{importFile.name}</span>
                        </div>
                        <span className="text-sm text-gray-500">
                          {(importFile.size / 1024).toFixed(1)} KB
                        </span>
                      </div>
                    </div>
                  )}
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-blue-600 mr-2 mt-0.5" />
                      <div className="text-sm text-blue-800">
                        <p className="font-medium mb-1">Required CSV Format:</p>
                        <ul className="list-disc list-inside space-y-1">
                          <li>First Name, Last Name, Email (required)</li>
                          <li>Department, Position, Phone (optional)</li>
                          <li>Maximum file size: 10MB</li>
                          <li>Supported formats: CSV, Excel</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="space-y-6">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                      <h3 className="text-lg font-semibold text-green-900">Import Complete!</h3>
                    </div>
                    <p className="text-sm text-green-800 mt-1">
                      {importResult.successfulRows} of {importResult.totalRows} employees imported successfully.
                    </p>
                  </div>
                  
                  {importResult.failedRows > 0 && (
                    <div className="bg-red-50 p-4 rounded-lg">
                      <div className="flex items-center">
                        <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
                        <h3 className="text-lg font-semibold text-red-900">Import Errors</h3>
                      </div>
                      <p className="text-sm text-red-800 mt-1">
                        {importResult.failedRows} rows failed to import. Please review the errors below.
                      </p>
                    </div>
                  )}
                  
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900">Import Results</h4>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-green-50 p-3 rounded-lg text-center">
                        <div className="text-2xl font-bold text-green-600">{importResult.successfulRows}</div>
                        <div className="text-sm text-green-800">Successful</div>
                      </div>
                      <div className="bg-red-50 p-3 rounded-lg text-center">
                        <div className="text-2xl font-bold text-red-600">{importResult.failedRows}</div>
                        <div className="text-sm text-red-800">Failed</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg text-center">
                        <div className="text-2xl font-bold text-gray-600">{importResult.totalRows}</div>
                        <div className="text-sm text-gray-800">Total</div>
                      </div>
                    </div>
                  </div>
                  
                  {importResult.errors.length > 0 && (
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Error Details</h4>
                      <div className="space-y-2">
                        {importResult.errors.map((error, index) => (
                          <div key={index} className="bg-red-50 p-3 rounded-lg">
                            <p className="text-sm text-red-800">
                              <span className="font-medium">Row {error.row}:</span> {error.message}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            <div className="flex justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50">
              <button
                onClick={() => {
                  setShowImportModal(false)
                  setImportFile(null)
                  setImportResult(null)
                }}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                {importResult ? 'Close' : 'Cancel'}
              </button>
              {importFile && !importResult && (
                <button
                  onClick={processImport}
                  disabled={isProcessing}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {isProcessing ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Import
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Bulk Action Modal */}
      {showBulkActionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Bulk Actions</h2>
              <button 
                onClick={() => setShowBulkActionModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Action</label>
                <select
                  value={bulkAction}
                  onChange={(e) => setBulkAction(e.target.value as any)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="verify">Initiate Verification</option>
                  <option value="update">Update Information</option>
                  <option value="notify">Send Notification</option>
                  <option value="delete">Remove Employees</option>
                </select>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">
                  This action will be performed on <span className="font-medium">{selectedEmployees.length}</span> selected employees.
                </p>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50">
              <button
                onClick={() => setShowBulkActionModal(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleBulkAction}
                disabled={isProcessing || selectedEmployees.length === 0}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Execute Action
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default EmployeeBulkOperations

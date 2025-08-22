import { FileText, Upload, Eye, Download, Trash2, Lock } from 'lucide-react'

const Documents = () => {
  const documents = [
    {
      id: 1,
      name: 'NIN Slip',
      type: 'NIN',
      size: '2.3 MB',
      uploadedAt: '2024-01-15',
      status: 'verified',
      fileType: 'PDF',
    },
    {
      id: 2,
      name: 'International Passport',
      type: 'Passport',
      size: '1.8 MB',
      uploadedAt: '2024-01-20',
      status: 'pending',
      fileType: 'JPG',
    },
    {
      id: 3,
      name: 'University Certificate',
      type: 'Certificate',
      size: '3.1 MB',
      uploadedAt: '2024-01-10',
      status: 'verified',
      fileType: 'PDF',
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return <span className="px-2 py-1 text-xs font-medium bg-success-100 text-success-800 rounded-full">Verified</span>
      case 'pending':
        return <span className="px-2 py-1 text-xs font-medium bg-warning-100 text-warning-800 rounded-full">Pending</span>
      case 'rejected':
        return <span className="px-2 py-1 text-xs font-medium bg-danger-100 text-danger-800 rounded-full">Rejected</span>
      default:
        return <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">Uploaded</span>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Document Vault</h1>
          <p className="text-gray-600">Securely store and manage your identity documents</p>
        </div>
        <button className="btn-primary">
          <Upload className="h-4 w-4 mr-2" />
          Upload Document
        </button>
      </div>

      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Your Documents</h2>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Lock className="h-4 w-4" />
            <span>End-to-end encrypted</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Document
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Size
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Uploaded
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {documents.map((doc) => (
                <tr key={doc.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-lg bg-primary-100 flex items-center justify-center">
                          <FileText className="h-5 w-5 text-primary-600" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{doc.name}</div>
                        <div className="text-sm text-gray-500">{doc.fileType}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {doc.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {doc.size}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(doc.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {doc.uploadedAt}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="text-primary-600 hover:text-primary-900">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900">
                        <Download className="h-4 w-4" />
                      </button>
                      <button className="text-danger-600 hover:text-danger-900">
                        <Trash2 className="h-4 w-4" />
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
  )
}

export default Documents

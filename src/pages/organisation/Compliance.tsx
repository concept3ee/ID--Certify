import { Shield, CheckCircle, Clock, AlertTriangle, FileText, Download } from 'lucide-react'

const Compliance = () => {
  const complianceItems = [
    {
      id: 1,
      name: 'AML Compliance',
      status: 'compliant',
      lastAudit: '2024-01-15',
      nextAudit: '2024-02-15',
      score: 95,
    },
    {
      id: 2,
      name: 'KYC Verification',
      status: 'pending',
      lastAudit: '2024-01-10',
      nextAudit: '2024-01-25',
      score: 78,
    },
    {
      id: 3,
      name: 'Data Protection',
      status: 'compliant',
      lastAudit: '2024-01-05',
      nextAudit: '2024-02-05',
      score: 92,
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Compliance Management</h1>
        <p className="text-gray-600">Monitor and manage regulatory compliance requirements</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {complianceItems.map((item) => (
          <div key={item.id} className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                item.status === 'compliant' 
                  ? 'bg-success-100 text-success-800' 
                  : 'bg-warning-100 text-warning-800'
              }`}>
                {item.status}
              </span>
            </div>
            
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Compliance Score</p>
                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        item.score >= 90 ? 'bg-success-500' : 
                        item.score >= 70 ? 'bg-warning-500' : 'bg-danger-500'
                      }`}
                      style={{ width: `${item.score}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{item.score}%</span>
                </div>
              </div>
              
              <div className="text-sm text-gray-600">
                <p>Last Audit: {item.lastAudit}</p>
                <p>Next Audit: {item.nextAudit}</p>
              </div>
              
              <div className="flex space-x-2">
                <button className="btn-secondary text-sm flex-1">
                  <FileText className="h-4 w-4 mr-1" />
                  View Report
                </button>
                <button className="btn-secondary text-sm">
                  <Download className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Compliance

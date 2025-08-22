import { FileText, Code, Copy, ExternalLink } from 'lucide-react'

const Documentation = () => {
  const endpoints = [
    {
      method: 'POST',
      path: '/register',
      description: 'Register a new user and get verification ID',
      parameters: ['email', 'name', 'userType'],
    },
    {
      method: 'POST',
      path: '/verify',
      description: 'Verify identity documents',
      parameters: ['documentType', 'documentData', 'userId'],
    },
    {
      method: 'POST',
      path: '/biobank/enroll',
      description: 'Enroll user in biometric verification',
      parameters: ['userId', 'biometricData'],
    },
    {
      method: 'GET',
      path: '/trust-score/{id}',
      description: 'Get user trust score',
      parameters: ['userId'],
    },
  ]

  const codeExample = `curl -X POST https://api.idcertify.com/verify \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "documentType": "NIN",
    "documentData": "12345678901",
    "userId": "user_123"
  }'`

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">API Documentation</h1>
        <p className="text-gray-600">Complete API reference and integration guides</p>
      </div>

      {/* Quick Start */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Start</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-2">1. Get your API Key</h3>
            <p className="text-sm text-gray-600">Generate an API key from your dashboard to authenticate requests.</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-2">2. Make your first request</h3>
            <p className="text-sm text-gray-600">Use the verification endpoint to verify identity documents.</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-2">3. Handle responses</h3>
            <p className="text-sm text-gray-600">Process verification results and trust scores in your application.</p>
          </div>
        </div>
      </div>

      {/* API Endpoints */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">API Endpoints</h2>
        <div className="space-y-4">
          {endpoints.map((endpoint, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-2">
                <span className={`px-2 py-1 text-xs font-medium rounded ${
                  endpoint.method === 'GET' ? 'bg-green-100 text-green-800' :
                  endpoint.method === 'POST' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {endpoint.method}
                </span>
                <code className="text-sm font-mono text-gray-900">{endpoint.path}</code>
              </div>
              <p className="text-sm text-gray-600 mb-2">{endpoint.description}</p>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-500">Parameters:</span>
                <div className="flex space-x-1">
                  {endpoint.parameters.map((param) => (
                    <span key={param} className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                      {param}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Code Example */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Code Example</h2>
        <div className="bg-gray-900 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">cURL</span>
            <button className="text-gray-400 hover:text-white">
              <Copy className="h-4 w-4" />
            </button>
          </div>
          <pre className="text-sm text-gray-300 overflow-x-auto">
            <code>{codeExample}</code>
          </pre>
        </div>
      </div>

      {/* SDKs */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">SDKs & Libraries</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Code className="h-5 w-5 text-blue-600" />
              <h3 className="font-medium text-gray-900">JavaScript</h3>
            </div>
            <p className="text-sm text-gray-600 mb-2">Official JavaScript SDK for Node.js and browsers</p>
            <button className="text-sm text-primary-600 hover:text-primary-700">
              View Documentation <ExternalLink className="h-3 w-3 inline ml-1" />
            </button>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Code className="h-5 w-5 text-green-600" />
              <h3 className="font-medium text-gray-900">Python</h3>
            </div>
            <p className="text-sm text-gray-600 mb-2">Official Python SDK for easy integration</p>
            <button className="text-sm text-primary-600 hover:text-primary-700">
              View Documentation <ExternalLink className="h-3 w-3 inline ml-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Documentation

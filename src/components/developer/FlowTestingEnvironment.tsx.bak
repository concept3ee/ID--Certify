import React, { useState, useEffect } from 'react'
import { 
  Play, 
  Pause, 
  Square, 
  RotateCcw, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Clock,
  Eye,
  Download,
  Upload,
  Settings,
  Bug,
  Zap,
  Target,
  BarChart3,
  FileText,
  Camera,
  Shield,
  Users,
  Building,
  CreditCard,
  Mail,
  Activity,
  TrendingUp,
  AlertCircle,
  Info,
  ExternalLink,
  Copy,
  Save,
  RefreshCw
} from 'lucide-react'

interface TestStep {
  id: string
  name: string
  type: string
  status: 'pending' | 'running' | 'completed' | 'failed' | 'skipped'
  startTime?: number
  endTime?: number
  duration?: number
  result?: any
  errors?: string[]
  warnings?: string[]
  logs: TestLog[]
}

interface TestLog {
  id: string
  timestamp: number
  level: 'info' | 'warning' | 'error' | 'debug'
  message: string
  data?: any
}

interface TestResult {
  id: string
  flowId: string
  flowName: string
  status: 'running' | 'completed' | 'failed' | 'cancelled'
  startTime: number
  endTime?: number
  duration?: number
  steps: TestStep[]
  summary: {
    totalSteps: number
    completedSteps: number
    failedSteps: number
    skippedSteps: number
    successRate: number
    averageStepTime: number
  }
  performance: {
    totalTime: number
    averageStepTime: number
    slowestStep: string
    fastestStep: string
    memoryUsage: number
    cpuUsage: number
  }
  issues: {
    errors: number
    warnings: number
    suggestions: string[]
  }
}

interface FlowTestingEnvironmentProps {
  flow: {
    id: string
    name: string
    nodes: any[]
    connections: any[]
  }
  onClose: () => void
}

const FlowTestingEnvironment: React.FC<FlowTestingEnvironmentProps> = ({
  flow,
  onClose
}) => {
  const [testResult, setTestResult] = useState<TestResult | null>(null)
  const [isRunning, setIsRunning] = useState(false)
  const [currentStep, setCurrentStep] = useState<string | null>(null)
  const [testMode, setTestMode] = useState<'simulation' | 'live' | 'stress'>('simulation')
  const [testData, setTestData] = useState<any>({})
  const [showLogs, setShowLogs] = useState(true)
  const [showPerformance, setShowPerformance] = useState(false)
  const [autoSave, setAutoSave] = useState(true)
  const [testHistory, setTestHistory] = useState<TestResult[]>([])

  useEffect(() => {
    loadTestHistory()
  }, [])

  const loadTestHistory = async () => {
    // Mock data - in real app, this would come from API
    const mockHistory: TestResult[] = [
      {
        id: 'test_001',
        flowId: flow.id,
        flowName: flow.name,
        status: 'completed',
        startTime: Date.now() - 3600000,
        endTime: Date.now() - 3300000,
        duration: 300000,
        steps: [
          {
            id: 'step_1',
            name: 'Document Upload',
            type: 'document-upload',
            status: 'completed',
            startTime: Date.now() - 3600000,
            endTime: Date.now() - 3550000,
            duration: 50000,
            result: { success: true, confidence: 0.95 },
            logs: [
              { id: '1', timestamp: Date.now() - 3600000, level: 'info', message: 'Step started' },
              { id: '2', timestamp: Date.now() - 3550000, level: 'info', message: 'Step completed successfully' }
            ]
          }
        ],
        summary: {
          totalSteps: 3,
          completedSteps: 3,
          failedSteps: 0,
          skippedSteps: 0,
          successRate: 100,
          averageStepTime: 100000
        },
        performance: {
          totalTime: 300000,
          averageStepTime: 100000,
          slowestStep: 'Document Upload',
          fastestStep: 'Face Matching',
          memoryUsage: 45.2,
          cpuUsage: 23.1
        },
        issues: {
          errors: 0,
          warnings: 1,
          suggestions: ['Consider optimizing document processing time']
        }
      }
    ]
    setTestHistory(mockHistory)
  }

  const startTest = async () => {
    setIsRunning(true)
    setCurrentStep(null)
    
    const newTestResult: TestResult = {
      id: `test_${Date.now()}`,
      flowId: flow.id,
      flowName: flow.name,
      status: 'running',
      startTime: Date.now(),
      steps: flow.nodes.map(node => ({
        id: node.id,
        name: node.data.title,
        type: node.type,
        status: 'pending',
        logs: []
      })),
      summary: {
        totalSteps: flow.nodes.length,
        completedSteps: 0,
        failedSteps: 0,
        skippedSteps: 0,
        successRate: 0,
        averageStepTime: 0
      },
      performance: {
        totalTime: 0,
        averageStepTime: 0,
        slowestStep: '',
        fastestStep: '',
        memoryUsage: 0,
        cpuUsage: 0
      },
      issues: {
        errors: 0,
        warnings: 0,
        suggestions: []
      }
    }

    setTestResult(newTestResult)

    // Simulate test execution
    for (let i = 0; i < flow.nodes.length; i++) {
      const node = flow.nodes[i]
      setCurrentStep(node.id)
      
      // Update step status to running
      setTestResult(prev => {
        if (!prev) return prev
        const updatedSteps = prev.steps.map(step => 
          step.id === node.id 
            ? { ...step, status: 'running' as const, startTime: Date.now() }
            : step
        )
        return { ...prev, steps: updatedSteps }
      })

      // Simulate step execution time
      await new Promise(resolve => setTimeout(resolve, Math.random() * 2000 + 1000))

      // Update step status to completed/failed
      const success = Math.random() > 0.1 // 90% success rate
      setTestResult(prev => {
        if (!prev) return prev
        const updatedSteps = prev.steps.map(step => 
          step.id === node.id 
            ? { 
                ...step, 
                status: success ? 'completed' as const : 'failed' as const,
                endTime: Date.now(),
                duration: Date.now() - (step.startTime || Date.now()),
                result: success ? { success: true, confidence: Math.random() * 0.3 + 0.7 } : null,
                errors: success ? [] : ['Simulated error for testing'],
                logs: [
                  ...step.logs,
                  { 
                    id: `${step.id}_log_${Date.now()}`, 
                    timestamp: Date.now(), 
                    level: 'info', 
                    message: success ? 'Step completed successfully' : 'Step failed with error'
                  }
                ]
              }
            : step
        )
        
        const completedSteps = updatedSteps.filter(s => s.status === 'completed').length
        const failedSteps = updatedSteps.filter(s => s.status === 'failed').length
        const successRate = (completedSteps / updatedSteps.length) * 100

        return {
          ...prev,
          steps: updatedSteps,
          summary: {
            ...prev.summary,
            completedSteps,
            failedSteps,
            successRate
          }
        }
      })
    }

    // Complete test
    setTestResult(prev => {
      if (!prev) return prev
      const endTime = Date.now()
      const duration = endTime - prev.startTime
      const completedSteps = prev.steps.filter(s => s.status === 'completed').length
      const failedSteps = prev.steps.filter(s => s.status === 'failed').length
      
      return {
        ...prev,
        status: failedSteps > 0 ? 'failed' : 'completed',
        endTime,
        duration,
        summary: {
          ...prev.summary,
          completedSteps,
          failedSteps,
          successRate: (completedSteps / prev.steps.length) * 100,
          averageStepTime: duration / prev.steps.length
        },
        performance: {
          ...prev.performance,
          totalTime: duration,
          averageStepTime: duration / prev.steps.length,
          slowestStep: prev.steps.reduce((slowest, step) => 
            (step.duration || 0) > (slowest.duration || 0) ? step : slowest
          ).name,
          fastestStep: prev.steps.reduce((fastest, step) => 
            (step.duration || Infinity) < (fastest.duration || Infinity) ? step : fastest
          ).name,
          memoryUsage: Math.random() * 50 + 20,
          cpuUsage: Math.random() * 30 + 10
        }
      }
    })

    setIsRunning(false)
    setCurrentStep(null)
  }

  const stopTest = () => {
    setIsRunning(false)
    setCurrentStep(null)
    setTestResult(prev => prev ? { ...prev, status: 'cancelled' } : null)
  }

  const resetTest = () => {
    setTestResult(null)
    setCurrentStep(null)
    setIsRunning(false)
  }

  const getStepIcon = (type: string) => {
    switch (type) {
      case 'document-upload':
        return <FileText className="h-4 w-4" />
      case 'face-match':
        return <Camera className="h-4 w-4" />
      case 'liveness-check':
        return <Eye className="h-4 w-4" />
      case 'data-collection':
        return <Users className="h-4 w-4" />
      case 'approval':
        return <Shield className="h-4 w-4" />
      case 'webhook':
        return <Zap className="h-4 w-4" />
      case 'notification':
        return <Mail className="h-4 w-4" />
      default:
        return <Target className="h-4 w-4" />
    }
  }

  const getStepStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-600" />
      case 'running':
        return <Clock className="h-4 w-4 text-blue-600 animate-spin" />
      case 'pending':
        return <Clock className="h-4 w-4 text-gray-400" />
      case 'skipped':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-400" />
    }
  }

  const getLogLevelColor = (level: string) => {
    switch (level) {
      case 'error':
        return 'text-red-600 bg-red-50'
      case 'warning':
        return 'text-yellow-600 bg-yellow-50'
      case 'info':
        return 'text-blue-600 bg-blue-50'
      case 'debug':
        return 'text-gray-600 bg-gray-50'
      default:
        return 'text-gray-600 bg-gray-50'
    }
  }

  const formatDuration = (ms: number) => {
    if (ms < 1000) return `${ms}ms`
    if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`
    return `${(ms / 60000).toFixed(1)}m`
  }

  const exportTestResults = () => {
    if (!testResult) return
    
    const data = {
      testId: testResult.id,
      flowName: testResult.flowName,
      status: testResult.status,
      duration: testResult.duration,
      summary: testResult.summary,
      performance: testResult.performance,
      steps: testResult.steps.map(step => ({
        name: step.name,
        type: step.type,
        status: step.status,
        duration: step.duration,
        result: step.result,
        errors: step.errors
      }))
    }
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `test-results-${testResult.id}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="fixed inset-0 bg-gray-900 z-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-semibold text-gray-900">Flow Testing Environment</h1>
          <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
            {flow.name}
          </span>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={exportTestResults}
            disabled={!testResult}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            <Download className="h-4 w-4" />
            <span>Export Results</span>
          </button>
          
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Test Controls */}
        <div className="w-80 bg-white border-r border-gray-200 p-6 overflow-y-auto">
          <div className="space-y-6">
            {/* Test Mode */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Test Configuration</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Test Mode
                  </label>
                  <select
                    value={testMode}
                    onChange={(e) => setTestMode(e.target.value as any)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="simulation">Simulation</option>
                    <option value="live">Live Test</option>
                    <option value="stress">Stress Test</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Test Data
                  </label>
                  <textarea
                    value={JSON.stringify(testData, null, 2)}
                    onChange={(e) => {
                      try {
                        setTestData(JSON.parse(e.target.value))
                      } catch (error) {
                        // Invalid JSON, keep current value
                      }
                    }}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                    placeholder="Enter test data as JSON..."
                  />
                </div>
              </div>
            </div>

            {/* Test Controls */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Test Controls</h3>
              <div className="flex items-center space-x-2">
                {!isRunning ? (
                  <button
                    onClick={startTest}
                    className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Play className="h-4 w-4" />
                    <span>Start Test</span>
                  </button>
                ) : (
                  <button
                    onClick={stopTest}
                    className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <Square className="h-4 w-4" />
                    <span>Stop Test</span>
                  </button>
                )}
                
                <button
                  onClick={resetTest}
                  disabled={isRunning}
                  className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  <RotateCcw className="h-4 w-4" />
                  <span>Reset</span>
                </button>
              </div>
            </div>

            {/* Test Summary */}
            {testResult && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Test Summary</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Status</span>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      testResult.status === 'completed' ? 'bg-green-100 text-green-800' :
                      testResult.status === 'failed' ? 'bg-red-100 text-red-800' :
                      testResult.status === 'running' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {testResult.status}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Duration</span>
                    <span className="text-sm font-medium text-gray-900">
                      {testResult.duration ? formatDuration(testResult.duration) : 'N/A'}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Success Rate</span>
                    <span className="text-sm font-medium text-gray-900">
                      {testResult.summary.successRate.toFixed(1)}%
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Completed Steps</span>
                    <span className="text-sm font-medium text-gray-900">
                      {testResult.summary.completedSteps}/{testResult.summary.totalSteps}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Performance Metrics */}
            {testResult && testResult.performance && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Performance</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Memory Usage</span>
                    <span className="text-sm font-medium text-gray-900">
                      {testResult.performance.memoryUsage.toFixed(1)}%
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">CPU Usage</span>
                    <span className="text-sm font-medium text-gray-900">
                      {testResult.performance.cpuUsage.toFixed(1)}%
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Slowest Step</span>
                    <span className="text-sm font-medium text-gray-900">
                      {testResult.performance.slowestStep}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Tabs */}
          <div className="bg-white border-b border-gray-200 px-6 py-3">
            <div className="flex items-center space-x-6">
              <button
                onClick={() => setShowLogs(true)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  showLogs ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Test Logs
              </button>
              <button
                onClick={() => setShowLogs(false)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  !showLogs ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Performance
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {showLogs ? (
              <div className="p-6">
                {testResult ? (
                  <div className="space-y-4">
                    {/* Steps */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Test Steps</h3>
                      <div className="space-y-3">
                        {testResult.steps.map((step) => (
                          <div
                            key={step.id}
                            className={`p-4 border rounded-lg ${
                              currentStep === step.id ? 'border-blue-500 bg-blue-50' :
                              step.status === 'completed' ? 'border-green-200 bg-green-50' :
                              step.status === 'failed' ? 'border-red-200 bg-red-50' :
                              'border-gray-200 bg-white'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center space-x-3">
                                {getStepIcon(step.type)}
                                <span className="font-medium text-gray-900">{step.name}</span>
                                {getStepStatusIcon(step.status)}
                              </div>
                              <div className="flex items-center space-x-4 text-sm text-gray-600">
                                {step.duration && (
                                  <span>{formatDuration(step.duration)}</span>
                                )}
                                <span className="capitalize">{step.status}</span>
                              </div>
                            </div>
                            
                            {step.result && (
                              <div className="mt-2 p-2 bg-white rounded border">
                                <pre className="text-xs text-gray-600">
                                  {JSON.stringify(step.result, null, 2)}
                                </pre>
                              </div>
                            )}
                            
                            {step.errors && step.errors.length > 0 && (
                              <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded">
                                <div className="text-sm text-red-800">
                                  {step.errors.map((error, index) => (
                                    <div key={index} className="flex items-center">
                                      <XCircle className="h-4 w-4 mr-2" />
                                      {error}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                            
                            {/* Logs */}
                            {step.logs.length > 0 && (
                              <div className="mt-3">
                                <h4 className="text-sm font-medium text-gray-700 mb-2">Logs</h4>
                                <div className="space-y-1">
                                  {step.logs.map((log) => (
                                    <div
                                      key={log.id}
                                      className={`p-2 rounded text-xs ${getLogLevelColor(log.level)}`}
                                    >
                                      <div className="flex items-center justify-between">
                                        <span className="font-medium">{log.level.toUpperCase()}</span>
                                        <span className="text-gray-500">
                                          {new Date(log.timestamp).toLocaleTimeString()}
                                        </span>
                                      </div>
                                      <div className="mt-1">{log.message}</div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Bug className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No test results</h3>
                    <p className="text-gray-600">Start a test to see the results here.</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-6">
                {testResult ? (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900">Performance Analysis</h3>
                    
                    {/* Performance Charts */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-white p-6 rounded-lg border border-gray-200">
                        <h4 className="text-md font-medium text-gray-900 mb-4">Step Duration</h4>
                        <div className="space-y-3">
                          {testResult.steps.map((step) => (
                            <div key={step.id} className="flex items-center justify-between">
                              <span className="text-sm text-gray-600">{step.name}</span>
                              <div className="flex items-center space-x-2">
                                <div className="w-24 bg-gray-200 rounded-full h-2">
                                  <div
                                    className="bg-blue-600 h-2 rounded-full"
                                    style={{
                                      width: `${step.duration ? (step.duration / Math.max(...testResult.steps.map(s => s.duration || 0))) * 100 : 0}%`
                                    }}
                                  ></div>
                                </div>
                                <span className="text-sm text-gray-900 w-12 text-right">
                                  {step.duration ? formatDuration(step.duration) : 'N/A'}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="bg-white p-6 rounded-lg border border-gray-200">
                        <h4 className="text-md font-medium text-gray-900 mb-4">Resource Usage</h4>
                        <div className="space-y-4">
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm text-gray-600">Memory Usage</span>
                              <span className="text-sm font-medium text-gray-900">
                                {testResult.performance.memoryUsage.toFixed(1)}%
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-green-600 h-2 rounded-full"
                                style={{ width: `${testResult.performance.memoryUsage}%` }}
                              ></div>
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm text-gray-600">CPU Usage</span>
                              <span className="text-sm font-medium text-gray-900">
                                {testResult.performance.cpuUsage.toFixed(1)}%
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-600 h-2 rounded-full"
                                style={{ width: `${testResult.performance.cpuUsage}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Issues and Suggestions */}
                    {testResult.issues.suggestions.length > 0 && (
                      <div className="bg-white p-6 rounded-lg border border-gray-200">
                        <h4 className="text-md font-medium text-gray-900 mb-4">Optimization Suggestions</h4>
                        <div className="space-y-2">
                          {testResult.issues.suggestions.map((suggestion, index) => (
                            <div key={index} className="flex items-start space-x-2">
                              <Info className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-gray-700">{suggestion}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No performance data</h3>
                    <p className="text-gray-600">Run a test to see performance metrics here.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FlowTestingEnvironment

import React, { useState, useRef } from 'react'
import { 
  Plus,
  Trash2,
  Copy,
  Save,
  Play,
  Pause,
  Settings,
  Eye,
  Download,
  Upload,
  ArrowRight,
  ArrowDown,
  ArrowUp,
  Users,
  User,
  Building,
  Shield,
  CreditCard,
  FileText,
  Bell,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Zap,
  Brain,
  Target,
  Activity,
  BarChart3,
  Lock,
  Unlock,
  Edit,
  MoreVertical,
  Search,
  Filter,
  RefreshCw
} from 'lucide-react'

// Types
interface WorkflowNode {
  id: string
  type: 'start' | 'approval' | 'notification' | 'verification' | 'document' | 'escalation' | 'condition' | 'end'
  name: string
  description: string
  position: { x: number; y: number }
  size: { width: number; height: number }
  config: {
    assignee?: string
    assigneeType?: 'user' | 'role' | 'department'
    conditions?: any
    timeout?: number
    isRequired?: boolean
    parallel?: boolean
    escalationRules?: any
    notificationSettings?: any
  }
  connections: string[]
}

interface WorkflowConnection {
  id: string
  from: string
  to: string
  condition?: string
  label?: string
}

interface WorkflowTemplate {
  id: string
  name: string
  description: string
  category: 'financial' | 'healthcare' | 'education' | 'hr' | 'compliance' | 'custom'
  industry: string
  nodes: WorkflowNode[]
  connections: WorkflowConnection[]
  estimatedTime: number
  complexity: 'simple' | 'medium' | 'complex'
  tags: string[]
  usage: number
  rating: number
}

interface SmartSuggestion {
  id: string
  type: 'optimization' | 'automation' | 'integration' | 'compliance'
  title: string
  description: string
  impact: 'low' | 'medium' | 'high'
  effort: 'low' | 'medium' | 'high'
  aiConfidence: number
  suggestedAction: string
}

const WorkflowDesigner: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  const [draggedNode, setDraggedNode] = useState<string | null>(null)
  const [showTemplates, setShowTemplates] = useState(false)
  const [showSmartSuggestions, setShowSmartSuggestions] = useState(false)
  const [workflowName, setWorkflowName] = useState('')
  const [workflowDescription, setWorkflowDescription] = useState('')
  const [workflowCategory, setWorkflowCategory] = useState('custom')
  const [isDesignMode, setIsDesignMode] = useState(true)
  const [zoom, setZoom] = useState(1)
  const canvasRef = useRef<HTMLDivElement>(null)

  // Workflow nodes state
  const [nodes, setNodes] = useState<WorkflowNode[]>([
    {
      id: 'start-1',
      type: 'start',
      name: 'Start',
      description: 'Workflow initiation point',
      position: { x: 100, y: 100 },
      size: { width: 120, height: 60 },
      config: {},
      connections: ['approval-1']
    },
    {
      id: 'approval-1',
      type: 'approval',
      name: 'Initial Review',
      description: 'First level approval',
      position: { x: 300, y: 100 },
      size: { width: 150, height: 80 },
      config: {
        assignee: 'Manager',
        assigneeType: 'role',
        isRequired: true,
        timeout: 24
      },
      connections: ['end-1']
    },
    {
      id: 'end-1',
      type: 'end',
      name: 'End',
      description: 'Workflow completion',
      position: { x: 500, y: 100 },
      size: { width: 120, height: 60 },
      config: {},
      connections: []
    }
  ])

  const [connections, setConnections] = useState<WorkflowConnection[]>([
    {
      id: 'conn-1',
      from: 'start-1',
      to: 'approval-1',
      label: 'Initiate'
    },
    {
      id: 'conn-2',
      from: 'approval-1',
      to: 'end-1',
      label: 'Complete'
    }
  ])

  // Industry templates
  const templates: WorkflowTemplate[] = [
    {
      id: 'fin-1',
      name: 'Financial Transaction Approval',
      description: 'Multi-level approval for financial transactions',
      category: 'financial',
      industry: 'Banking',
      nodes: [
        { id: 'start', type: 'start', name: 'Transaction Request', description: '', position: { x: 50, y: 50 }, size: { width: 120, height: 60 }, config: {}, connections: ['dept-approval'] },
        { id: 'dept-approval', type: 'approval', name: 'Department Approval', description: '', position: { x: 250, y: 50 }, size: { width: 150, height: 80 }, config: { assignee: 'Department Head', assigneeType: 'role' }, connections: ['finance-review'] },
        { id: 'finance-review', type: 'approval', name: 'Finance Review', description: '', position: { x: 450, y: 50 }, size: { width: 150, height: 80 }, config: { assignee: 'Finance Manager', assigneeType: 'role' }, connections: ['exec-approval'] },
        { id: 'exec-approval', type: 'approval', name: 'Executive Approval', description: '', position: { x: 650, y: 50 }, size: { width: 150, height: 80 }, config: { assignee: 'CFO', assigneeType: 'role' }, connections: ['end'] },
        { id: 'end', type: 'end', name: 'Complete', description: '', position: { x: 850, y: 50 }, size: { width: 120, height: 60 }, config: {}, connections: [] }
      ],
      connections: [],
      estimatedTime: 3,
      complexity: 'medium',
      tags: ['finance', 'approval', 'multi-level'],
      usage: 156,
      rating: 4.8
    },
    {
      id: 'hr-1',
      name: 'Employee Onboarding',
      description: 'Complete employee onboarding workflow',
      category: 'hr',
      industry: 'General',
      nodes: [
        { id: 'start', type: 'start', name: 'New Employee', description: '', position: { x: 50, y: 50 }, size: { width: 120, height: 60 }, config: {}, connections: ['hr-review'] },
        { id: 'hr-review', type: 'approval', name: 'HR Review', description: '', position: { x: 250, y: 50 }, size: { width: 150, height: 80 }, config: { assignee: 'HR Manager', assigneeType: 'role' }, connections: ['it-setup'] },
        { id: 'it-setup', type: 'verification', name: 'IT Setup', description: '', position: { x: 450, y: 50 }, size: { width: 150, height: 80 }, config: { assignee: 'IT Department', assigneeType: 'department' }, connections: ['final-approval'] },
        { id: 'final-approval', type: 'approval', name: 'Final Approval', description: '', position: { x: 650, y: 50 }, size: { width: 150, height: 80 }, config: { assignee: 'Department Head', assigneeType: 'role' }, connections: ['end'] },
        { id: 'end', type: 'end', name: 'Complete', description: '', position: { x: 850, y: 50 }, size: { width: 120, height: 60 }, config: {}, connections: [] }
      ],
      connections: [],
      estimatedTime: 2,
      complexity: 'simple',
      tags: ['hr', 'onboarding', 'employee'],
      usage: 89,
      rating: 4.6
    },
    {
      id: 'health-1',
      name: 'Patient Verification',
      description: 'HIPAA-compliant patient verification workflow',
      category: 'healthcare',
      industry: 'Healthcare',
      nodes: [
        { id: 'start', type: 'start', name: 'Patient Registration', description: '', position: { x: 50, y: 50 }, size: { width: 120, height: 60 }, config: {}, connections: ['identity-verify'] },
        { id: 'identity-verify', type: 'verification', name: 'Identity Verification', description: '', position: { x: 250, y: 50 }, size: { width: 150, height: 80 }, config: { assignee: 'Verification System', assigneeType: 'user' }, connections: ['privacy-check'] },
        { id: 'privacy-check', type: 'compliance', name: 'Privacy Compliance', description: '', position: { x: 450, y: 50 }, size: { width: 150, height: 80 }, config: { assignee: 'Privacy Officer', assigneeType: 'role' }, connections: ['medical-review'] },
        { id: 'medical-review', type: 'approval', name: 'Medical Review', description: '', position: { x: 650, y: 50 }, size: { width: 150, height: 80 }, config: { assignee: 'Medical Staff', assigneeType: 'role' }, connections: ['end'] },
        { id: 'end', type: 'end', name: 'Complete', description: '', position: { x: 850, y: 50 }, size: { width: 120, height: 60 }, config: {}, connections: [] }
      ],
      connections: [],
      estimatedTime: 1.5,
      complexity: 'complex',
      tags: ['healthcare', 'hipaa', 'patient', 'compliance'],
      usage: 234,
      rating: 4.9
    }
  ]

  // Smart suggestions
  const smartSuggestions: SmartSuggestion[] = [
    {
      id: 'suggestion-1',
      type: 'optimization',
      title: 'Parallel Processing Opportunity',
      description: 'Steps 2 and 3 can run in parallel, reducing processing time by 40%',
      impact: 'high',
      effort: 'low',
      aiConfidence: 0.92,
      suggestedAction: 'Enable parallel processing for HR Review and IT Setup'
    },
    {
      id: 'suggestion-2',
      type: 'automation',
      title: 'Auto-approval for Low-Risk Cases',
      description: 'Automatically approve requests under $1,000 to reduce manual workload',
      impact: 'medium',
      effort: 'medium',
      aiConfidence: 0.87,
      suggestedAction: 'Add conditional logic for automatic approval'
    },
    {
      id: 'suggestion-3',
      type: 'integration',
      title: 'Slack Notification Integration',
      description: 'Add Slack notifications to improve response times',
      impact: 'medium',
      effort: 'low',
      aiConfidence: 0.95,
      suggestedAction: 'Integrate Slack webhook for real-time notifications'
    },
    {
      id: 'suggestion-4',
      type: 'compliance',
      title: 'GDPR Compliance Check',
      description: 'Add GDPR compliance verification for EU data processing',
      impact: 'high',
      effort: 'medium',
      aiConfidence: 0.89,
      suggestedAction: 'Add GDPR compliance step before data processing'
    }
  ]

  const nodeTypes = [
    { type: 'approval', name: 'Approval', icon: CheckCircle, color: 'bg-blue-500' },
    { type: 'notification', name: 'Notification', icon: Bell, color: 'bg-green-500' },
    { type: 'verification', name: 'Verification', icon: Shield, color: 'bg-purple-500' },
    { type: 'document', name: 'Document', icon: FileText, color: 'bg-orange-500' },
    { type: 'escalation', name: 'Escalation', icon: AlertTriangle, color: 'bg-red-500' },
    { type: 'condition', name: 'Condition', icon: Target, color: 'bg-yellow-500' }
  ]

  const getNodeIcon = (type: string) => {
    const nodeType = nodeTypes.find(nt => nt.type === type)
    return nodeType ? nodeType.icon : CheckCircle
  }

  const getNodeColor = (type: string) => {
    const nodeType = nodeTypes.find(nt => nt.type === type)
    return nodeType ? nodeType.color : 'bg-gray-500'
  }

  const handleNodeDrag = (nodeId: string, position: { x: number; y: number }) => {
    setNodes(prev => prev.map(node => 
      node.id === nodeId ? { ...node, position } : node
    ))
  }

  const addNode = (type: string) => {
    const newNode: WorkflowNode = {
      id: `${type}-${Date.now()}`,
      type: type as any,
      name: `${type.charAt(0).toUpperCase() + type.slice(1)} Step`,
      description: `New ${type} step`,
      position: { x: 200 + Math.random() * 200, y: 200 + Math.random() * 200 },
      size: { width: 150, height: 80 },
      config: {
        assignee: 'User',
        assigneeType: 'user',
        isRequired: true,
        timeout: 24
      },
      connections: []
    }
    setNodes(prev => [...prev, newNode])
  }

  const deleteNode = (nodeId: string) => {
    setNodes(prev => prev.filter(node => node.id !== nodeId))
    setConnections(prev => prev.filter(conn => conn.from !== nodeId && conn.to !== nodeId))
  }

  const applyTemplate = (template: WorkflowTemplate) => {
    setNodes(template.nodes)
    setConnections(template.connections)
    setWorkflowName(template.name)
    setWorkflowDescription(template.description)
    setWorkflowCategory(template.category)
    setShowTemplates(false)
  }

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'simple': return 'bg-green-100 text-green-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'complex': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Toolbar */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Workflow Name"
                value={workflowName}
                onChange={(e) => setWorkflowName(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <input
                type="text"
                placeholder="Description"
                value={workflowDescription}
                onChange={(e) => setWorkflowDescription(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <select
                value={workflowCategory}
                onChange={(e) => setWorkflowCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="custom">Custom</option>
                <option value="financial">Financial</option>
                <option value="healthcare">Healthcare</option>
                <option value="education">Education</option>
                <option value="hr">HR</option>
                <option value="compliance">Compliance</option>
              </select>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowTemplates(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Templates</span>
            </button>
            <button
              onClick={() => setShowSmartSuggestions(true)}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center space-x-2"
            >
              <Brain className="w-4 h-4" />
              <span>AI Suggestions</span>
            </button>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center space-x-2">
              <Save className="w-4 h-4" />
              <span>Save</span>
            </button>
            <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 flex items-center space-x-2">
              <Play className="w-4 h-4" />
              <span>Test</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Node Palette */}
        <div className="w-64 bg-white border-r border-gray-200 p-4">
          <h3 className="font-semibold text-gray-900 mb-4">Workflow Elements</h3>
          <div className="space-y-2">
            {nodeTypes.map((nodeType) => (
              <button
                key={nodeType.type}
                onClick={() => addNode(nodeType.type)}
                className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg border border-gray-200"
              >
                <div className={`w-8 h-8 ${nodeType.color} rounded-lg flex items-center justify-center`}>
                  <nodeType.icon className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-900">{nodeType.name}</span>
              </button>
            ))}
          </div>

          <div className="mt-6">
            <h4 className="font-medium text-gray-900 mb-3">Quick Actions</h4>
            <div className="space-y-2">
              <button className="w-full flex items-center space-x-2 p-2 text-sm text-gray-600 hover:bg-gray-50 rounded">
                <Copy className="w-4 h-4" />
                <span>Duplicate Workflow</span>
              </button>
              <button className="w-full flex items-center space-x-2 p-2 text-sm text-gray-600 hover:bg-gray-50 rounded">
                <Upload className="w-4 h-4" />
                <span>Import Workflow</span>
              </button>
              <button className="w-full flex items-center space-x-2 p-2 text-sm text-gray-600 hover:bg-gray-50 rounded">
                <Download className="w-4 h-4" />
                <span>Export Workflow</span>
              </button>
            </div>
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 relative overflow-hidden">
          <div
            ref={canvasRef}
            className="w-full h-full relative bg-gray-50"
            style={{ transform: `scale(${zoom})` }}
          >
            {/* Grid Background */}
            <div className="absolute inset-0 opacity-20" style={{
              backgroundImage: `
                linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px'
            }} />

            {/* Connections */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {connections.map((connection) => {
                const fromNode = nodes.find(n => n.id === connection.from)
                const toNode = nodes.find(n => n.id === connection.to)
                if (!fromNode || !toNode) return null

                const fromX = fromNode.position.x + fromNode.size.width / 2
                const fromY = fromNode.position.y + fromNode.size.height / 2
                const toX = toNode.position.x + toNode.size.width / 2
                const toY = toNode.position.y + toNode.size.height / 2

                return (
                  <g key={connection.id}>
                    <path
                      d={`M ${fromX} ${fromY} L ${toX} ${toY}`}
                      stroke="#6B7280"
                      strokeWidth="2"
                      fill="none"
                      markerEnd="url(#arrowhead)"
                    />
                    {connection.label && (
                      <text
                        x={(fromX + toX) / 2}
                        y={(fromY + toY) / 2 - 5}
                        textAnchor="middle"
                        className="text-xs fill-gray-600"
                      >
                        {connection.label}
                      </text>
                    )}
                  </g>
                )
              })}
              <defs>
                <marker
                  id="arrowhead"
                  markerWidth="10"
                  markerHeight="7"
                  refX="9"
                  refY="3.5"
                  orient="auto"
                >
                  <polygon
                    points="0 0, 10 3.5, 0 7"
                    fill="#6B7280"
                  />
                </marker>
              </defs>
            </svg>

            {/* Nodes */}
            {nodes.map((node) => {
              const Icon = getNodeIcon(node.type)
              const colorClass = getNodeColor(node.type)
              
              return (
                <div
                  key={node.id}
                  className={`absolute border-2 rounded-lg cursor-move ${
                    selectedNode === node.id ? 'border-blue-500 shadow-lg' : 'border-gray-300'
                  }`}
                  style={{
                    left: node.position.x,
                    top: node.position.y,
                    width: node.size.width,
                    height: node.size.height,
                    backgroundColor: 'white'
                  }}
                  onClick={() => setSelectedNode(node.id)}
                  draggable
                  onDragStart={() => setDraggedNode(node.id)}
                  onDragEnd={(e) => {
                    if (draggedNode) {
                      const rect = canvasRef.current?.getBoundingClientRect()
                      if (rect) {
                        const x = (e.clientX - rect.left) / zoom
                        const y = (e.clientY - rect.top) / zoom
                        handleNodeDrag(draggedNode, { x, y })
                      }
                    }
                    setDraggedNode(null)
                  }}
                >
                  <div className="p-3 h-full flex flex-col">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className={`w-6 h-6 ${colorClass} rounded flex items-center justify-center`}>
                        <Icon className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-sm font-medium text-gray-900 truncate">{node.name}</span>
                    </div>
                    <p className="text-xs text-gray-600 flex-1">{node.description}</p>
                    {node.config.assignee && (
                      <div className="text-xs text-gray-500 mt-1">
                        → {node.config.assignee}
                      </div>
                    )}
                  </div>
                  
                  {/* Node Actions */}
                  {selectedNode === node.id && (
                    <div className="absolute -top-8 left-0 flex space-x-1">
                      <button
                        onClick={() => deleteNode(node.id)}
                        className="w-6 h-6 bg-red-500 text-white rounded flex items-center justify-center hover:bg-red-600"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                      <button className="w-6 h-6 bg-blue-500 text-white rounded flex items-center justify-center hover:bg-blue-600">
                        <Edit className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Zoom Controls */}
          <div className="absolute bottom-4 right-4 flex flex-col space-y-2">
            <button
              onClick={() => setZoom(prev => Math.min(prev + 0.1, 2))}
              className="w-8 h-8 bg-white border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
            <span className="text-xs text-center text-gray-600">{Math.round(zoom * 100)}%</span>
            <button
              onClick={() => setZoom(prev => Math.max(prev - 0.1, 0.5))}
              className="w-8 h-8 bg-white border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50"
            >
              <ArrowDown className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Templates Modal */}
      {showTemplates && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Workflow Templates</h2>
              <button
                onClick={() => setShowTemplates(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates.map((template) => (
                <div key={template.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900">{template.name}</h3>
                      <p className="text-sm text-gray-600">{template.industry}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getComplexityColor(template.complexity)}`}>
                      {template.complexity}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-4">{template.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Steps:</span>
                      <span className="font-medium">{template.nodes.length}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Est. Time:</span>
                      <span className="font-medium">{template.estimatedTime} days</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Usage:</span>
                      <span className="font-medium">{template.usage} times</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Rating:</span>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="font-medium">{template.rating}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {template.tags.map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => applyTemplate(template)}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                  >
                    Use Template
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Smart Suggestions Modal */}
      {showSmartSuggestions && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">AI-Powered Suggestions</h2>
              <button
                onClick={() => setShowSmartSuggestions(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              {smartSuggestions.map((suggestion) => (
                <div key={suggestion.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        suggestion.type === 'optimization' ? 'bg-blue-100' :
                        suggestion.type === 'automation' ? 'bg-green-100' :
                        suggestion.type === 'integration' ? 'bg-purple-100' :
                        'bg-orange-100'
                      }`}>
                        {suggestion.type === 'optimization' ? <Zap className="w-4 h-4 text-blue-600" /> :
                         suggestion.type === 'automation' ? <Brain className="w-4 h-4 text-green-600" /> :
                         suggestion.type === 'integration' ? <Activity className="w-4 h-4 text-purple-600" /> :
                         <Shield className="w-4 h-4 text-orange-600" />}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{suggestion.title}</h3>
                        <p className="text-sm text-gray-600">{suggestion.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(suggestion.impact)}`}>
                          {suggestion.impact} impact
                        </span>
                        <span className="text-xs text-gray-500">
                          {Math.round(suggestion.aiConfidence * 100)}% confidence
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-3 mb-3">
                    <p className="text-sm text-gray-700">
                      <strong>Suggested Action:</strong> {suggestion.suggestedAction}
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm">
                      Apply Suggestion
                    </button>
                    <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 text-sm">
                      Learn More
                    </button>
                    <button className="text-gray-400 hover:text-gray-600 text-sm">
                      Dismiss
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default WorkflowDesigner

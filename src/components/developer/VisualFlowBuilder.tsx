import React, { useState, useCallback } from 'react'
import { 
  Plus, 
  Save, 
  Play, 
  Settings, 
  Trash2, 
  Copy, 
  Eye,
  Download,
  Upload,
  FileText,
  Camera,
  Shield,
  CheckCircle,
  AlertTriangle,
  Clock,
  Users,
  Building,
  CreditCard,
  Fingerprint,
  MapPin,
  Phone,
  Mail,
  Calendar,
  ArrowRight,
  ArrowDown,
  Zap,
  Target,
  Layers
} from 'lucide-react'

interface FlowNode {
  id: string
  type: 'start' | 'end' | 'document-upload' | 'face-match' | 'liveness-check' | 'data-collection' | 'approval' | 'conditional' | 'webhook' | 'notification'
  position: { x: number; y: number }
  data: {
    title: string
    description?: string
    config: any
    validation?: any
    ui?: any
  }
  connections: string[]
}

interface FlowConnection {
  id: string
  source: string
  target: string
  condition?: string
  label?: string
}

interface VisualFlowBuilderProps {
  initialFlow?: {
    nodes: FlowNode[]
    connections: FlowConnection[]
  }
  onSave: (flow: { nodes: FlowNode[]; connections: FlowConnection[] }) => void
  onTest: (flow: { nodes: FlowNode[]; connections: FlowConnection[] }) => void
  onClose: () => void
}

const VisualFlowBuilder: React.FC<VisualFlowBuilderProps> = ({
  initialFlow,
  onSave,
  onTest,
  onClose
}) => {
  const [nodes, setNodes] = useState<FlowNode[]>(initialFlow?.nodes || [])
  const [connections, setConnections] = useState<FlowConnection[]>(initialFlow?.connections || [])
  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  const [draggedNode, setDraggedNode] = useState<string | null>(null)
  const [showNodePalette, setShowNodePalette] = useState(false)
  const [flowName, setFlowName] = useState('New Verification Flow')
  const [flowDescription, setFlowDescription] = useState('')
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })

  // Node types with their configurations
  const nodeTypes = [
    {
      type: 'document-upload',
      title: 'Document Upload',
      description: 'Collect and verify identity documents',
      icon: FileText,
      color: 'bg-blue-500',
      config: {
        allowedTypes: ['passport', 'drivers-license', 'national-id', 'utility-bill'],
        maxFileSize: '10MB',
        requiredFields: ['document-type', 'document-number'],
        validation: {
          ocr: true,
          authenticity: true,
          expiry: true
        }
      }
    },
    {
      type: 'face-match',
      title: 'Face Matching',
      description: 'Match face with document photo',
      icon: Camera,
      color: 'bg-green-500',
      config: {
        confidence: 0.8,
        liveness: true,
        quality: 'high',
        timeout: 30
      }
    },
    {
      type: 'liveness-check',
      title: 'Liveness Detection',
      description: 'Verify the person is real and present',
      icon: Eye,
      color: 'bg-purple-500',
      config: {
        actions: ['blink', 'smile', 'turn-head'],
        duration: 10,
        attempts: 3
      }
    },
    {
      type: 'data-collection',
      title: 'Data Collection',
      description: 'Collect additional user information',
      icon: Users,
      color: 'bg-orange-500',
      config: {
        fields: [
          { name: 'full-name', type: 'text', required: true },
          { name: 'email', type: 'email', required: true },
          { name: 'phone', type: 'tel', required: false }
        ]
      }
    },
    {
      type: 'approval',
      title: 'Manual Approval',
      description: 'Human review and approval step',
      icon: CheckCircle,
      color: 'bg-yellow-500',
      config: {
        reviewers: [],
        timeout: 24,
        escalation: true
      }
    },
    {
      type: 'conditional',
      title: 'Conditional Logic',
      description: 'Branch based on conditions',
      icon: Target,
      color: 'bg-indigo-500',
      config: {
        conditions: [
          { field: 'document-type', operator: 'equals', value: 'passport' },
          { field: 'confidence-score', operator: 'greater-than', value: 0.9 }
        ]
      }
    },
    {
      type: 'webhook',
      title: 'Webhook',
      description: 'Send data to external service',
      icon: Zap,
      color: 'bg-red-500',
      config: {
        url: '',
        method: 'POST',
        headers: {},
        retry: 3
      }
    },
    {
      type: 'notification',
      title: 'Notification',
      description: 'Send notification to user',
      icon: Mail,
      color: 'bg-teal-500',
      config: {
        type: 'email',
        template: 'verification-complete',
        recipients: ['user']
      }
    }
  ]

  const addNode = useCallback((type: string, position: { x: number; y: number }) => {
    const nodeType = nodeTypes.find(nt => nt.type === type)
    if (!nodeType) return

    const newNode: FlowNode = {
      id: `node-${Date.now()}`,
      type: type as any,
      position,
      data: {
        title: nodeType.title,
        description: nodeType.description,
        config: { ...nodeType.config }
      },
      connections: []
    }

    setNodes(prev => [...prev, newNode])
    setShowNodePalette(false)
  }, [])

  const updateNode = useCallback((nodeId: string, updates: Partial<FlowNode>) => {
    setNodes(prev => prev.map(node => 
      node.id === nodeId ? { ...node, ...updates } : node
    ))
  }, [])

  const deleteNode = useCallback((nodeId: string) => {
    setNodes(prev => prev.filter(node => node.id !== nodeId))
    setConnections(prev => prev.filter(conn => 
      conn.source !== nodeId && conn.target !== nodeId
    ))
    setSelectedNode(null)
  }, [])

  const addConnection = useCallback((sourceId: string, targetId: string) => {
    const newConnection: FlowConnection = {
      id: `conn-${Date.now()}`,
      source: sourceId,
      target: targetId
    }
    setConnections(prev => [...prev, newConnection])
  }, [])

  const deleteConnection = useCallback((connectionId: string) => {
    setConnections(prev => prev.filter(conn => conn.id !== connectionId))
  }, [])

  const handleSave = () => {
    onSave({ nodes, connections })
  }

  const handleTest = () => {
    onTest({ nodes, connections })
  }

  const getNodeIcon = (type: string) => {
    const nodeType = nodeTypes.find(nt => nt.type === type)
    return nodeType ? nodeType.icon : FileText
  }

  const getNodeColor = (type: string) => {
    const nodeType = nodeTypes.find(nt => nt.type === type)
    return nodeType ? nodeType.color : 'bg-gray-500'
  }

  return (
    <div className="fixed inset-0 bg-gray-900 z-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-semibold text-gray-900">Visual Flow Builder</h1>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={flowName}
              onChange={(e) => setFlowName(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Flow name"
            />
            <input
              type="text"
              value={flowDescription}
              onChange={(e) => setFlowDescription(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Flow description"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowNodePalette(!showNodePalette)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Add Step</span>
          </button>
          
          <button
            onClick={handleTest}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Play className="h-4 w-4" />
            <span>Test Flow</span>
          </button>
          
          <button
            onClick={handleSave}
            className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Save className="h-4 w-4" />
            <span>Save Flow</span>
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
        {/* Node Palette */}
        {showNodePalette && (
          <div className="w-80 bg-white border-r border-gray-200 p-4 overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Steps</h3>
            <div className="space-y-2">
              {nodeTypes.map((nodeType) => {
                const Icon = nodeType.icon
                return (
                  <div
                    key={nodeType.type}
                    className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => addNode(nodeType.type, { x: 100, y: 100 })}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 ${nodeType.color} rounded-lg flex items-center justify-center`}>
                        <Icon className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{nodeType.title}</h4>
                        <p className="text-sm text-gray-500">{nodeType.description}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Canvas */}
        <div className="flex-1 relative bg-gray-50 overflow-hidden">
          <div 
            className="w-full h-full relative"
            style={{
              transform: `scale(${zoom}) translate(${pan.x}px, ${pan.y}px)`,
              transformOrigin: '0 0'
            }}
          >
            {/* Grid Background */}
            <div className="absolute inset-0 opacity-20">
              <svg width="100%" height="100%">
                <defs>
                  <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e5e7eb" strokeWidth="1"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>

            {/* Connections */}
            <svg className="absolute inset-0 pointer-events-none">
              {connections.map((connection) => {
                const sourceNode = nodes.find(n => n.id === connection.source)
                const targetNode = nodes.find(n => n.id === connection.target)
                if (!sourceNode || !targetNode) return null

                const startX = sourceNode.position.x + 100
                const startY = sourceNode.position.y + 50
                const endX = targetNode.position.x
                const endY = targetNode.position.y + 50

                return (
                  <g key={connection.id}>
                    <path
                      d={`M ${startX} ${startY} Q ${(startX + endX) / 2} ${startY - 50} ${endX} ${endY}`}
                      stroke="#6b7280"
                      strokeWidth="2"
                      fill="none"
                      markerEnd="url(#arrowhead)"
                    />
                    {connection.label && (
                      <text
                        x={(startX + endX) / 2}
                        y={startY - 60}
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
                    fill="#6b7280"
                  />
                </marker>
              </defs>
            </svg>

            {/* Nodes */}
            {nodes.map((node) => {
              const Icon = getNodeIcon(node.type)
              const colorClass = getNodeColor(node.type)
              const isSelected = selectedNode === node.id

              return (
                <div
                  key={node.id}
                  className={`absolute w-48 bg-white border-2 rounded-lg shadow-lg cursor-move ${
                    isSelected ? 'border-blue-500' : 'border-gray-200'
                  }`}
                  style={{
                    left: node.position.x,
                    top: node.position.y
                  }}
                  onClick={() => setSelectedNode(node.id)}
                  onMouseDown={(e) => {
                    setDraggedNode(node.id)
                    e.preventDefault()
                  }}
                >
                  <div className="p-4">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className={`w-8 h-8 ${colorClass} rounded-lg flex items-center justify-center`}>
                        <Icon className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 text-sm">{node.data.title}</h4>
                        {node.data.description && (
                          <p className="text-xs text-gray-500">{node.data.description}</p>
                        )}
                      </div>
                    </div>
                    
                    {isSelected && (
                      <div className="flex items-center space-x-2 pt-2 border-t border-gray-200">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            // Open node configuration
                          }}
                          className="p-1 text-gray-400 hover:text-gray-600"
                        >
                          <Settings className="h-4 w-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            // Duplicate node
                          }}
                          className="p-1 text-gray-400 hover:text-gray-600"
                        >
                          <Copy className="h-4 w-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            deleteNode(node.id)
                          }}
                          className="p-1 text-gray-400 hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Canvas Controls */}
          <div className="absolute bottom-4 right-4 flex items-center space-x-2">
            <button
              onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}
              className="p-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              -
            </button>
            <span className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm">
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={() => setZoom(Math.min(2, zoom + 0.1))}
              className="p-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              +
            </button>
          </div>
        </div>

        {/* Properties Panel */}
        {selectedNode && (
          <div className="w-80 bg-white border-l border-gray-200 p-4 overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Step Configuration</h3>
            {(() => {
              const node = nodes.find(n => n.id === selectedNode)
              if (!node) return null

              return (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Step Name
                    </label>
                    <input
                      type="text"
                      value={node.data.title}
                      onChange={(e) => updateNode(selectedNode, {
                        data: { ...node.data, title: e.target.value }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      value={node.data.description || ''}
                      onChange={(e) => updateNode(selectedNode, {
                        data: { ...node.data, description: e.target.value }
                      })}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Type-specific configuration */}
                  {node.type === 'document-upload' && (
                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-900">Document Settings</h4>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Allowed Document Types
                        </label>
                        <div className="space-y-2">
                          {['passport', 'drivers-license', 'national-id', 'utility-bill'].map((type) => (
                            <label key={type} className="flex items-center">
                              <input
                                type="checkbox"
                                checked={node.data.config.allowedTypes?.includes(type) || false}
                                onChange={(e) => {
                                  const allowedTypes = node.data.config.allowedTypes || []
                                  const newTypes = e.target.checked
                                    ? [...allowedTypes, type]
                                    : allowedTypes.filter((t: string) => t !== type)
                                  updateNode(selectedNode, {
                                    data: {
                                      ...node.data,
                                      config: { ...node.data.config, allowedTypes: newTypes }
                                    }
                                  })
                                }}
                                className="mr-2"
                              />
                              <span className="text-sm text-gray-700 capitalize">
                                {type.replace('-', ' ')}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {node.type === 'face-match' && (
                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-900">Face Matching Settings</h4>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Confidence Threshold
                        </label>
                        <input
                          type="range"
                          min="0.5"
                          max="1"
                          step="0.1"
                          value={node.data.config.confidence || 0.8}
                          onChange={(e) => updateNode(selectedNode, {
                            data: {
                              ...node.data,
                              config: { ...node.data.config, confidence: parseFloat(e.target.value) }
                            }
                          })}
                          className="w-full"
                        />
                        <span className="text-sm text-gray-500">
                          {(node.data.config.confidence || 0.8) * 100}%
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )
            })()}
          </div>
        )}
      </div>
    </div>
  )
}

export default VisualFlowBuilder

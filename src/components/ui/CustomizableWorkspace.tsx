import { useState, useEffect } from 'react'
import { 
  Settings, 
  Layout, 
  Palette, 
  Eye, 
  EyeOff, 
  Save, 
  RotateCcw,
  Grid,
  List,
  Columns,
  Maximize,
  Minimize
} from 'lucide-react'

interface WorkspaceConfig {
  layout: 'grid' | 'list' | 'compact'
  theme: 'light' | 'dark' | 'auto'
  density: 'comfortable' | 'compact' | 'spacious'
  sidebar: 'expanded' | 'collapsed' | 'hidden'
  animations: boolean
  sounds: boolean
  notifications: boolean
  customColors: {
    primary: string
    secondary: string
    accent: string
  }
  widgets: {
    quickActions: boolean
    recentActivity: boolean
    smartRecommendations: boolean
    contextualHelp: boolean
    performanceMetrics: boolean
  }
}

interface CustomizableWorkspaceProps {
  onConfigChange?: (config: WorkspaceConfig) => void
  initialConfig?: Partial<WorkspaceConfig>
}

const CustomizableWorkspace = ({ 
  onConfigChange, 
  initialConfig 
}: CustomizableWorkspaceProps) => {
  const [config, setConfig] = useState<WorkspaceConfig>({
    layout: 'grid',
    theme: 'light',
    density: 'comfortable',
    sidebar: 'expanded',
    animations: true,
    sounds: true,
    notifications: true,
    customColors: {
      primary: '#2563eb',
      secondary: '#64748b',
      accent: '#f59e0b'
    },
    widgets: {
      quickActions: true,
      recentActivity: true,
      smartRecommendations: true,
      contextualHelp: true,
      performanceMetrics: true
    },
    ...initialConfig
  })

  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<'layout' | 'appearance' | 'widgets' | 'preferences'>('layout')

  useEffect(() => {
    onConfigChange?.(config)
  }, [config, onConfigChange])

  const updateConfig = (updates: Partial<WorkspaceConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }))
  }

  const resetConfig = () => {
    setConfig({
      layout: 'grid',
      theme: 'light',
      density: 'comfortable',
      sidebar: 'expanded',
      animations: true,
      sounds: true,
      notifications: true,
      customColors: {
        primary: '#2563eb',
        secondary: '#64748b',
        accent: '#f59e0b'
      },
      widgets: {
        quickActions: true,
        recentActivity: true,
        smartRecommendations: true,
        contextualHelp: true,
        performanceMetrics: true
      }
    })
  }

  const saveConfig = () => {
    localStorage.setItem('workspace-config', JSON.stringify(config))
    // Show success notification
    console.log('Workspace configuration saved!')
  }

  const tabs = [
    { id: 'layout', label: 'Layout', icon: Layout },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'widgets', label: 'Widgets', icon: Grid },
    { id: 'preferences', label: 'Preferences', icon: Settings }
  ]

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 bg-gray-800 hover:bg-gray-900 text-white p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-105 z-50"
        title="Customize Workspace"
      >
        <Settings className="h-6 w-6" />
      </button>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Customize Workspace</h2>
              <p className="text-gray-600">Personalize your dashboard experience</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              ×
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex space-x-1 p-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-96">
          {activeTab === 'layout' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Layout Style</h3>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { id: 'grid', label: 'Grid', icon: Grid, description: 'Card-based layout' },
                    { id: 'list', label: 'List', icon: List, description: 'Compact list view' },
                    { id: 'compact', label: 'Compact', icon: Columns, description: 'Dense information' }
                  ].map((layout) => (
                    <button
                      key={layout.id}
                      onClick={() => updateConfig({ layout: layout.id as any })}
                      className={`p-4 border-2 rounded-lg transition-all ${
                        config.layout === layout.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <layout.icon className="h-8 w-8 mx-auto mb-2" />
                      <div className="font-medium">{layout.label}</div>
                      <div className="text-sm text-gray-500">{layout.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Density</h3>
                <div className="space-y-3">
                  {[
                    { id: 'spacious', label: 'Spacious', description: 'More whitespace, easier to read' },
                    { id: 'comfortable', label: 'Comfortable', description: 'Balanced spacing' },
                    { id: 'compact', label: 'Compact', description: 'More information per screen' }
                  ].map((density) => (
                    <label key={density.id} className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="density"
                        value={density.id}
                        checked={config.density === density.id}
                        onChange={() => updateConfig({ density: density.id as any })}
                        className="text-blue-600"
                      />
                      <div>
                        <div className="font-medium">{density.label}</div>
                        <div className="text-sm text-gray-500">{density.description}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Theme</h3>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { id: 'light', label: 'Light', description: 'Clean and bright' },
                    { id: 'dark', label: 'Dark', description: 'Easy on the eyes' },
                    { id: 'auto', label: 'Auto', description: 'Follows system' }
                  ].map((theme) => (
                    <button
                      key={theme.id}
                      onClick={() => updateConfig({ theme: theme.id as any })}
                      className={`p-4 border-2 rounded-lg transition-all ${
                        config.theme === theme.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="font-medium">{theme.label}</div>
                      <div className="text-sm text-gray-500">{theme.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Custom Colors</h3>
                <div className="grid grid-cols-3 gap-4">
                  {Object.entries(config.customColors).map(([key, value]) => (
                    <div key={key}>
                      <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                        {key} Color
                      </label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="color"
                          value={value}
                          onChange={(e) => updateConfig({
                            customColors: { ...config.customColors, [key]: e.target.value }
                          })}
                          className="w-12 h-8 rounded border border-gray-300"
                        />
                        <input
                          type="text"
                          value={value}
                          onChange={(e) => updateConfig({
                            customColors: { ...config.customColors, [key]: e.target.value }
                          })}
                          className="flex-1 px-3 py-1 border border-gray-300 rounded text-sm"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'widgets' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Dashboard Widgets</h3>
                <div className="space-y-4">
                  {Object.entries(config.widgets).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <div className="font-medium capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </div>
                        <div className="text-sm text-gray-500">
                          {key === 'quickActions' && 'Show quick action buttons'}
                          {key === 'recentActivity' && 'Display recent activity feed'}
                          {key === 'smartRecommendations' && 'Show AI-powered recommendations'}
                          {key === 'contextualHelp' && 'Display contextual help system'}
                          {key === 'performanceMetrics' && 'Show performance metrics'}
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={value}
                          onChange={(e) => updateConfig({
                            widgets: { ...config.widgets, [key]: e.target.checked }
                          })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'preferences' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">User Experience</h3>
                <div className="space-y-4">
                  {[
                    { key: 'animations', label: 'Enable Animations', description: 'Smooth transitions and micro-interactions' },
                    { key: 'sounds', label: 'Enable Sounds', description: 'Audio feedback for actions' },
                    { key: 'notifications', label: 'Enable Notifications', description: 'Desktop and browser notifications' }
                  ].map((pref) => (
                    <div key={pref.key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <div className="font-medium">{pref.label}</div>
                        <div className="text-sm text-gray-500">{pref.description}</div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={config[pref.key as keyof WorkspaceConfig] as boolean}
                          onChange={(e) => updateConfig({ [pref.key]: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <button
              onClick={resetConfig}
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Reset to Default</span>
            </button>
            <div className="flex space-x-3">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={saveConfig}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Save className="h-4 w-4" />
                <span>Save Configuration</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustomizableWorkspace

import { useState, useEffect, createContext, useContext } from 'react'
import { 
  Eye, 
  EyeOff, 
  Volume2, 
  VolumeX, 
  Keyboard, 
  MousePointer,
  Contrast,
  Type,
  ZoomIn,
  ZoomOut,
  RotateCcw
} from 'lucide-react'

interface AccessibilityConfig {
  highContrast: boolean
  largeText: boolean
  reducedMotion: boolean
  screenReader: boolean
  keyboardNavigation: boolean
  focusIndicators: boolean
  colorBlindSupport: boolean
  zoomLevel: number
  soundEnabled: boolean
  voiceGuidance: boolean
}

interface AccessibilityContextType {
  config: AccessibilityConfig
  updateConfig: (updates: Partial<AccessibilityConfig>) => void
  resetConfig: () => void
  announceToScreenReader: (message: string) => void
  playSound: (type: 'success' | 'error' | 'warning' | 'info') => void
}

const AccessibilityContext = createContext<AccessibilityContextType | null>(null)

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext)
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider')
  }
  return context
}

interface AccessibilityProviderProps {
  children: React.ReactNode
}

export const AccessibilityProvider = ({ children }: AccessibilityProviderProps) => {
  const [config, setConfig] = useState<AccessibilityConfig>({
    highContrast: false,
    largeText: false,
    reducedMotion: false,
    screenReader: false,
    keyboardNavigation: true,
    focusIndicators: true,
    colorBlindSupport: false,
    zoomLevel: 100,
    soundEnabled: true,
    voiceGuidance: false
  })

  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Load saved configuration
    const savedConfig = localStorage.getItem('accessibility-config')
    if (savedConfig) {
      setConfig(JSON.parse(savedConfig))
    }

    // Check for system preferences
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setConfig(prev => ({ ...prev, reducedMotion: true }))
    }

    if (window.matchMedia('(prefers-contrast: high)').matches) {
      setConfig(prev => ({ ...prev, highContrast: true }))
    }
  }, [])

  useEffect(() => {
    // Apply accessibility styles
    const root = document.documentElement
    
    if (config.highContrast) {
      root.classList.add('high-contrast')
    } else {
      root.classList.remove('high-contrast')
    }

    if (config.largeText) {
      root.classList.add('large-text')
    } else {
      root.classList.remove('large-text')
    }

    if (config.reducedMotion) {
      root.classList.add('reduced-motion')
    } else {
      root.classList.remove('reduced-motion')
    }

    if (config.colorBlindSupport) {
      root.classList.add('colorblind-support')
    } else {
      root.classList.remove('colorblind-support')
    }

    // Apply zoom level
    root.style.fontSize = `${config.zoomLevel}%`

    // Save configuration
    localStorage.setItem('accessibility-config', JSON.stringify(config))
  }, [config])

  const updateConfig = (updates: Partial<AccessibilityConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }))
  }

  const resetConfig = () => {
    setConfig({
      highContrast: false,
      largeText: false,
      reducedMotion: false,
      screenReader: false,
      keyboardNavigation: true,
      focusIndicators: true,
      colorBlindSupport: false,
      zoomLevel: 100,
      soundEnabled: true,
      voiceGuidance: false
    })
  }

  const announceToScreenReader = (message: string) => {
    if (config.screenReader) {
      const announcement = document.createElement('div')
      announcement.setAttribute('aria-live', 'polite')
      announcement.setAttribute('aria-atomic', 'true')
      announcement.className = 'sr-only'
      announcement.textContent = message
      document.body.appendChild(announcement)
      
      setTimeout(() => {
        document.body.removeChild(announcement)
      }, 1000)
    }
  }

  const playSound = (type: 'success' | 'error' | 'warning' | 'info') => {
    if (config.soundEnabled) {
      // Create audio context for sound feedback
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)
      
      // Different frequencies for different types
      const frequencies = {
        success: 800,
        error: 400,
        warning: 600,
        info: 500
      }
      
      oscillator.frequency.setValueAtTime(frequencies[type], audioContext.currentTime)
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2)
      
      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.2)
    }
  }

  const contextValue: AccessibilityContextType = {
    config,
    updateConfig,
    resetConfig,
    announceToScreenReader,
    playSound
  }

  return (
    <AccessibilityContext.Provider value={contextValue}>
      {children}
      
      {/* Accessibility Controls */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-105"
          title="Accessibility Settings"
          aria-label="Open accessibility settings"
        >
          <Eye className="h-6 w-6" />
        </button>
      </div>

      {/* Accessibility Panel */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Accessibility Settings</h2>
                  <p className="text-gray-600">Customize your experience for better accessibility</p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Close accessibility settings"
                >
                  ×
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-96">
              <div className="space-y-6">
                {/* Visual Settings */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Visual Settings</h3>
                  <div className="space-y-4">
                    {[
                      { key: 'highContrast', label: 'High Contrast', description: 'Increase contrast for better visibility', icon: Contrast },
                      { key: 'largeText', label: 'Large Text', description: 'Increase text size for better readability', icon: Type },
                      { key: 'colorBlindSupport', label: 'Color Blind Support', description: 'Use patterns and shapes instead of just colors', icon: Eye },
                      { key: 'focusIndicators', label: 'Focus Indicators', description: 'Show clear focus indicators for keyboard navigation', icon: MousePointer }
                    ].map((setting) => (
                      <div key={setting.key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <setting.icon className="h-5 w-5 text-gray-600" />
                          <div>
                            <div className="font-medium">{setting.label}</div>
                            <div className="text-sm text-gray-500">{setting.description}</div>
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={config[setting.key as keyof AccessibilityConfig] as boolean}
                            onChange={(e) => updateConfig({ [setting.key]: e.target.checked })}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Zoom Level */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Zoom Level</h3>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => updateConfig({ zoomLevel: Math.max(75, config.zoomLevel - 25) })}
                      className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                      aria-label="Decrease zoom"
                    >
                      <ZoomOut className="h-4 w-4" />
                    </button>
                    <span className="text-lg font-medium min-w-[60px] text-center">
                      {config.zoomLevel}%
                    </span>
                    <button
                      onClick={() => updateConfig({ zoomLevel: Math.min(200, config.zoomLevel + 25) })}
                      className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                      aria-label="Increase zoom"
                    >
                      <ZoomIn className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Motion and Sound */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Motion & Sound</h3>
                  <div className="space-y-4">
                    {[
                      { key: 'reducedMotion', label: 'Reduce Motion', description: 'Minimize animations and transitions', icon: EyeOff },
                      { key: 'soundEnabled', label: 'Sound Feedback', description: 'Play sounds for actions and notifications', icon: Volume2 },
                      { key: 'voiceGuidance', label: 'Voice Guidance', description: 'Audio descriptions for screen elements', icon: Volume2 }
                    ].map((setting) => (
                      <div key={setting.key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <setting.icon className="h-5 w-5 text-gray-600" />
                          <div>
                            <div className="font-medium">{setting.label}</div>
                            <div className="text-sm text-gray-500">{setting.description}</div>
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={config[setting.key as keyof AccessibilityConfig] as boolean}
                            onChange={(e) => updateConfig({ [setting.key]: e.target.checked })}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Keyboard Navigation */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Keyboard Navigation</h3>
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3 mb-3">
                      <Keyboard className="h-5 w-5 text-gray-600" />
                      <div>
                        <div className="font-medium">Keyboard Shortcuts</div>
                        <div className="text-sm text-gray-500">Use keyboard shortcuts for faster navigation</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex justify-between">
                        <span>Navigate:</span>
                        <kbd className="px-2 py-1 bg-gray-100 rounded">Tab</kbd>
                      </div>
                      <div className="flex justify-between">
                        <span>Select:</span>
                        <kbd className="px-2 py-1 bg-gray-100 rounded">Enter</kbd>
                      </div>
                      <div className="flex justify-between">
                        <span>Close:</span>
                        <kbd className="px-2 py-1 bg-gray-100 rounded">Esc</kbd>
                      </div>
                      <div className="flex justify-between">
                        <span>Help:</span>
                        <kbd className="px-2 py-1 bg-gray-100 rounded">F1</kbd>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AccessibilityContext.Provider>
  )
}

// CSS for accessibility features
export const accessibilityStyles = `
  .high-contrast {
    --tw-bg-opacity: 1;
    --tw-text-opacity: 1;
    filter: contrast(150%);
  }

  .large-text {
    font-size: 1.125rem;
  }

  .large-text h1 { font-size: 2.5rem; }
  .large-text h2 { font-size: 2rem; }
  .large-text h3 { font-size: 1.75rem; }
  .large-text h4 { font-size: 1.5rem; }
  .large-text h5 { font-size: 1.25rem; }
  .large-text h6 { font-size: 1.125rem; }

  .reduced-motion * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }

  .colorblind-support .bg-red-500::after {
    content: "●";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-size: 0.75rem;
  }

  .colorblind-support .bg-green-500::after {
    content: "✓";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-size: 0.75rem;
  }

  .colorblind-support .bg-yellow-500::after {
    content: "!";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: black;
    font-size: 0.75rem;
    font-weight: bold;
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  /* Focus indicators */
  .focus-visible:focus {
    outline: 2px solid #3b82f6;
    outline-offset: 2px;
  }

  /* High contrast focus */
  .high-contrast .focus-visible:focus {
    outline: 3px solid #000;
    outline-offset: 3px;
  }
`

export default AccessibilityProvider

import React, { useState, useEffect } from 'react'
import { 
  Palette, 
  Upload, 
  Download, 
  Eye, 
  Save, 
  RotateCcw, 
  Copy, 
  Check,
  Image,
  Type,
  Layout,
  Globe,
  Smartphone,
  Monitor,
  Tablet,
  Settings,
  Code,
  FileText,
  Zap,
  Shield,
  Lock,
  Unlock,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Info
} from 'lucide-react'

interface BrandingConfig {
  id: string
  name: string
  description: string
  isActive: boolean
  isDefault: boolean
  createdAt: string
  updatedAt: string
  
  // Visual Branding
  logo: {
    url: string
    width: number
    height: number
    alt: string
    position: 'top-left' | 'top-center' | 'top-right'
  }
  favicon: {
    url: string
    sizes: string[]
  }
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    surface: string
    text: string
    textSecondary: string
    success: string
    warning: string
    error: string
    info: string
  }
  
  // Typography
  typography: {
    fontFamily: string
    headingFont: string
    bodyFont: string
    fontSize: {
      xs: string
      sm: string
      base: string
      lg: string
      xl: string
      '2xl': string
      '3xl': string
    }
    fontWeight: {
      light: number
      normal: number
      medium: number
      semibold: number
      bold: number
    }
  }
  
  // Layout & Spacing
  layout: {
    borderRadius: string
    spacing: {
      xs: string
      sm: string
      md: string
      lg: string
      xl: string
    }
    shadows: {
      sm: string
      md: string
      lg: string
      xl: string
    }
  }
  
  // Custom CSS
  customCSS: string
  
  // Domain & URLs
  domain: string
  customDomain: string
  
  // Features
  features: {
    hideBranding: boolean
    customFooter: boolean
    customHeader: boolean
    customLoadingScreen: boolean
    customErrorPages: boolean
    customSuccessPages: boolean
  }
  
  // Compliance
  compliance: {
    gdpr: boolean
    ccpa: boolean
    soc2: boolean
    iso27001: boolean
  }
}

interface WhiteLabelingSystemProps {
  onSave: (config: BrandingConfig) => void
  onPreview: (config: BrandingConfig) => void
  onExport: (config: BrandingConfig) => void
  onClose: () => void
}

const WhiteLabelingSystem: React.FC<WhiteLabelingSystemProps> = ({
  onSave,
  onPreview,
  onExport,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'visual' | 'typography' | 'layout' | 'advanced' | 'preview'>('visual')
  const [config, setConfig] = useState<BrandingConfig>({
    id: 'default',
    name: 'Default Branding',
    description: 'Default IDCertify branding',
    isActive: true,
    isDefault: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    
    logo: {
      url: '/logo.png',
      width: 120,
      height: 40,
      alt: 'IDCertify Logo',
      position: 'top-left'
    },
    favicon: {
      url: '/favicon.ico',
      sizes: ['16x16', '32x32', '48x48']
    },
    colors: {
      primary: '#3B82F6',
      secondary: '#8B5CF6',
      accent: '#F59E0B',
      background: '#FFFFFF',
      surface: '#F8FAFC',
      text: '#1F2937',
      textSecondary: '#6B7280',
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444',
      info: '#3B82F6'
    },
    typography: {
      fontFamily: 'Inter, system-ui, sans-serif',
      headingFont: 'Inter, system-ui, sans-serif',
      bodyFont: 'Inter, system-ui, sans-serif',
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem'
      },
      fontWeight: {
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700
      }
    },
    layout: {
      borderRadius: '0.5rem',
      spacing: {
        xs: '0.25rem',
        sm: '0.5rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem'
      },
      shadows: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
      }
    },
    customCSS: '',
    domain: 'idcertify.com',
    customDomain: '',
    features: {
      hideBranding: false,
      customFooter: false,
      customHeader: false,
      customLoadingScreen: false,
      customErrorPages: false,
      customSuccessPages: false
    },
    compliance: {
      gdpr: true,
      ccpa: true,
      soc2: true,
      iso27001: true
    }
  })

  const [isPreviewMode, setIsPreviewMode] = useState(false)
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')
  const [isGeneratingCode, setIsGeneratingCode] = useState(false)

  const colorPresets = [
    {
      name: 'Default Blue',
      colors: {
        primary: '#3B82F6',
        secondary: '#8B5CF6',
        accent: '#F59E0B'
      }
    },
    {
      name: 'Professional Green',
      colors: {
        primary: '#10B981',
        secondary: '#059669',
        accent: '#F59E0B'
      }
    },
    {
      name: 'Corporate Purple',
      colors: {
        primary: '#8B5CF6',
        secondary: '#7C3AED',
        accent: '#F59E0B'
      }
    },
    {
      name: 'Modern Orange',
      colors: {
        primary: '#F59E0B',
        secondary: '#D97706',
        accent: '#8B5CF6'
      }
    },
    {
      name: 'Elegant Gray',
      colors: {
        primary: '#6B7280',
        secondary: '#4B5563',
        accent: '#F59E0B'
      }
    }
  ]

  const fontPresets = [
    { name: 'Inter', value: 'Inter, system-ui, sans-serif' },
    { name: 'Roboto', value: 'Roboto, sans-serif' },
    { name: 'Open Sans', value: 'Open Sans, sans-serif' },
    { name: 'Lato', value: 'Lato, sans-serif' },
    { name: 'Montserrat', value: 'Montserrat, sans-serif' },
    { name: 'Poppins', value: 'Poppins, sans-serif' },
    { name: 'Source Sans Pro', value: 'Source Sans Pro, sans-serif' },
    { name: 'Nunito', value: 'Nunito, sans-serif' }
  ]

  const updateConfig = (updates: Partial<BrandingConfig>) => {
    setConfig(prev => ({
      ...prev,
      ...updates,
      updatedAt: new Date().toISOString()
    }))
  }

  const updateColors = (colorUpdates: Partial<BrandingConfig['colors']>) => {
    setConfig(prev => ({
      ...prev,
      colors: { ...prev.colors, ...colorUpdates }
    }))
  }

  const applyColorPreset = (preset: typeof colorPresets[0]) => {
    updateColors(preset.colors)
  }

  const generateEmbedCode = () => {
    setIsGeneratingCode(true)
    
    // Simulate code generation
    setTimeout(() => {
      const embedCode = `
<!-- IDCertify Verification Widget -->
<div id="idcertify-widget" 
     data-api-key="your-api-key"
     data-flow-id="your-flow-id"
     data-branding='${JSON.stringify(config)}'>
</div>

<script src="https://cdn.idcertify.com/widget.js"></script>
<script>
  IDCertify.init({
    apiKey: 'your-api-key',
    flowId: 'your-flow-id',
    branding: ${JSON.stringify(config, null, 2)},
    onComplete: function(result) {
      console.log('Verification completed:', result);
    },
    onError: function(error) {
      console.error('Verification error:', error);
    }
  });
</script>
      `.trim()
      
      // Copy to clipboard
      navigator.clipboard.writeText(embedCode)
      setIsGeneratingCode(false)
    }, 1000)
  }

  const generateSDKCode = (platform: 'react' | 'vue' | 'angular' | 'vanilla') => {
    const codeTemplates = {
      react: `
import { IDCertifyWidget } from '@idcertify/react-sdk';

function VerificationPage() {
  return (
    <IDCertifyWidget
      apiKey="your-api-key"
      flowId="your-flow-id"
      branding={${JSON.stringify(config, null, 6)}}
      onComplete={(result) => console.log('Complete:', result)}
      onError={(error) => console.error('Error:', error)}
    />
  );
}
      `,
      vue: `
<template>
  <IDCertifyWidget
    :api-key="apiKey"
    :flow-id="flowId"
    :branding="branding"
    @complete="onComplete"
    @error="onError"
  />
</template>

<script>
import { IDCertifyWidget } from '@idcertify/vue-sdk';

export default {
  components: { IDCertifyWidget },
  data() {
    return {
      apiKey: 'your-api-key',
      flowId: 'your-flow-id',
      branding: ${JSON.stringify(config, null, 6)}
    };
  },
  methods: {
    onComplete(result) { console.log('Complete:', result); },
    onError(error) { console.error('Error:', error); }
  }
};
</script>
      `,
      angular: `
import { Component } from '@angular/core';
import { IDCertifyService } from '@idcertify/angular-sdk';

@Component({
  selector: 'app-verification',
  template: \`
    <idcertify-widget
      [apiKey]="apiKey"
      [flowId]="flowId"
      [branding]="branding"
      (complete)="onComplete($event)"
      (error)="onError($event)">
    </idcertify-widget>
  \`
})
export class VerificationComponent {
  apiKey = 'your-api-key';
  flowId = 'your-flow-id';
  branding = ${JSON.stringify(config, null, 6)};
  
  onComplete(result: any) { console.log('Complete:', result); }
  onError(error: any) { console.error('Error:', error); }
}
      `,
      vanilla: `
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="https://cdn.idcertify.com/widget.css">
</head>
<body>
  <div id="verification-container"></div>
  
  <script src="https://cdn.idcertify.com/widget.js"></script>
  <script>
    IDCertify.render({
      container: '#verification-container',
      apiKey: 'your-api-key',
      flowId: 'your-flow-id',
      branding: ${JSON.stringify(config, null, 6)},
      onComplete: (result) => console.log('Complete:', result),
      onError: (error) => console.error('Error:', error)
    });
  </script>
</body>
</html>
      `
    }
    
    return codeTemplates[platform]
  }

  const renderPreview = () => {
    return (
      <div className={`bg-white rounded-lg border-2 border-dashed border-gray-300 p-8 ${
        previewDevice === 'mobile' ? 'max-w-sm mx-auto' :
        previewDevice === 'tablet' ? 'max-w-2xl mx-auto' :
        'w-full'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div 
              className="w-8 h-8 rounded"
              style={{ backgroundColor: config.colors.primary }}
            ></div>
            <span 
              className="font-semibold"
              style={{ 
                color: config.colors.text,
                fontFamily: config.typography.headingFont
              }}
            >
              {config.name}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Monitor className={`h-4 w-4 ${previewDevice === 'desktop' ? 'text-blue-600' : 'text-gray-400'}`} />
            <Tablet className={`h-4 w-4 ${previewDevice === 'tablet' ? 'text-blue-600' : 'text-gray-400'}`} />
            <Smartphone className={`h-4 w-4 ${previewDevice === 'mobile' ? 'text-blue-600' : 'text-gray-400'}`} />
          </div>
        </div>

        {/* Verification Form Preview */}
        <div 
          className="rounded-lg p-6 mb-6"
          style={{ 
            backgroundColor: config.colors.surface,
            borderRadius: config.layout.borderRadius
          }}
        >
          <h2 
            className="text-xl font-semibold mb-4"
            style={{ 
              color: config.colors.text,
              fontFamily: config.typography.headingFont
            }}
          >
            Identity Verification
          </h2>
          
          <div className="space-y-4">
            <div>
              <label 
                className="block text-sm font-medium mb-2"
                style={{ color: config.colors.textSecondary }}
              >
                Full Name
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
                style={{ 
                  borderRadius: config.layout.borderRadius,
                  borderColor: config.colors.primary,
                  '--tw-ring-color': config.colors.primary
                } as any}
                placeholder="Enter your full name"
              />
            </div>
            
            <div>
              <label 
                className="block text-sm font-medium mb-2"
                style={{ color: config.colors.textSecondary }}
              >
                Email Address
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
                style={{ 
                  borderRadius: config.layout.borderRadius,
                  borderColor: config.colors.primary,
                  '--tw-ring-color': config.colors.primary
                } as any}
                placeholder="Enter your email"
              />
            </div>
            
            <button
              className="w-full py-2 px-4 rounded-md font-medium text-white"
              style={{ 
                backgroundColor: config.colors.primary,
                borderRadius: config.layout.borderRadius
              }}
            >
              Start Verification
            </button>
          </div>
        </div>

        {/* Footer */}
        {!config.features.hideBranding && (
          <div className="text-center text-sm" style={{ color: config.colors.textSecondary }}>
            Powered by IDCertify
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-gray-900 z-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-semibold text-gray-900">White-Labeling System</h1>
          <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
            {config.name}
          </span>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={() => onPreview(config)}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Eye className="h-4 w-4" />
            <span>Preview</span>
          </button>
          
          <button
            onClick={generateEmbedCode}
            disabled={isGeneratingCode}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
          >
            {isGeneratingCode ? (
              <RefreshCw className="h-4 w-4 animate-spin" />
            ) : (
              <Code className="h-4 w-4" />
            )}
            <span>Generate Code</span>
          </button>
          
          <button
            onClick={() => onSave(config)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Save className="h-4 w-4" />
            <span>Save</span>
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
        {/* Sidebar */}
        <div className="w-80 bg-white border-r border-gray-200 p-6 overflow-y-auto">
          <div className="space-y-6">
            {/* Tabs */}
            <div className="space-y-2">
              {[
                { id: 'visual', name: 'Visual Branding', icon: Palette },
                { id: 'typography', name: 'Typography', icon: Type },
                { id: 'layout', name: 'Layout & Spacing', icon: Layout },
                { id: 'advanced', name: 'Advanced', icon: Settings },
                { id: 'preview', name: 'Preview', icon: Eye }
              ].map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{tab.name}</span>
                  </button>
                )
              })}
            </div>

            {/* Quick Actions */}
            <div className="pt-6 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Quick Actions</h3>
              <div className="space-y-2">
                <button
                  onClick={() => onExport(config)}
                  className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg"
                >
                  <Download className="h-4 w-4" />
                  <span>Export Config</span>
                </button>
                <button
                  onClick={() => setConfig({
                    ...config,
                    colors: {
                      ...config.colors,
                      primary: '#3B82F6',
                      secondary: '#8B5CF6',
                      accent: '#F59E0B'
                    }
                  })}
                  className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg"
                >
                  <RotateCcw className="h-4 w-4" />
                  <span>Reset to Default</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {activeTab === 'visual' && (
            <div className="p-6 space-y-6">
              <h2 className="text-lg font-semibold text-gray-900">Visual Branding</h2>
              
              {/* Logo Upload */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-md font-medium text-gray-900 mb-4">Logo & Favicon</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Logo
                    </label>
                    <div className="flex items-center space-x-4">
                      <div className="w-24 h-16 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                        <Image className="h-8 w-8 text-gray-400" />
                      </div>
                      <div>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                          <Upload className="h-4 w-4 mr-2 inline" />
                          Upload Logo
                        </button>
                        <p className="text-xs text-gray-500 mt-1">PNG, JPG, SVG up to 2MB</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Logo Position
                    </label>
                    <select
                      value={config.logo.position}
                      onChange={(e) => updateConfig({
                        logo: { ...config.logo, position: e.target.value as any }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="top-left">Top Left</option>
                      <option value="top-center">Top Center</option>
                      <option value="top-right">Top Right</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Color Presets */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-md font-medium text-gray-900 mb-4">Color Presets</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {colorPresets.map((preset) => (
                    <button
                      key={preset.name}
                      onClick={() => applyColorPreset(preset)}
                      className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition-colors"
                    >
                      <div className="flex space-x-2 mb-2">
                        <div 
                          className="w-6 h-6 rounded-full"
                          style={{ backgroundColor: preset.colors.primary }}
                        ></div>
                        <div 
                          className="w-6 h-6 rounded-full"
                          style={{ backgroundColor: preset.colors.secondary }}
                        ></div>
                        <div 
                          className="w-6 h-6 rounded-full"
                          style={{ backgroundColor: preset.colors.accent }}
                        ></div>
                      </div>
                      <p className="text-sm font-medium text-gray-900">{preset.name}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Colors */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-md font-medium text-gray-900 mb-4">Custom Colors</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {Object.entries(config.colors).map(([key, value]) => (
                    <div key={key}>
                      <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="color"
                          value={value}
                          onChange={(e) => updateColors({ [key]: e.target.value })}
                          className="w-12 h-8 border border-gray-300 rounded cursor-pointer"
                        />
                        <input
                          type="text"
                          value={value}
                          onChange={(e) => updateColors({ [key]: e.target.value })}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'typography' && (
            <div className="p-6 space-y-6">
              <h2 className="text-lg font-semibold text-gray-900">Typography</h2>
              
              {/* Font Selection */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-md font-medium text-gray-900 mb-4">Font Family</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Primary Font
                    </label>
                    <select
                      value={config.typography.fontFamily}
                      onChange={(e) => updateConfig({
                        typography: { ...config.typography, fontFamily: e.target.value }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {fontPresets.map((font) => (
                        <option key={font.value} value={font.value}>
                          {font.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Heading Font
                    </label>
                    <select
                      value={config.typography.headingFont}
                      onChange={(e) => updateConfig({
                        typography: { ...config.typography, headingFont: e.target.value }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {fontPresets.map((font) => (
                        <option key={font.value} value={font.value}>
                          {font.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Font Sizes */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-md font-medium text-gray-900 mb-4">Font Sizes</h3>
                <div className="space-y-4">
                  {Object.entries(config.typography.fontSize).map(([key, value]) => (
                    <div key={key}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {key.toUpperCase()}
                      </label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={value}
                          onChange={(e) => updateConfig({
                            typography: {
                              ...config.typography,
                              fontSize: { ...config.typography.fontSize, [key]: e.target.value }
                            }
                          })}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <span 
                          className="text-sm"
                          style={{ 
                            fontSize: value,
                            fontFamily: config.typography.fontFamily
                          }}
                        >
                          Sample Text
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'layout' && (
            <div className="p-6 space-y-6">
              <h2 className="text-lg font-semibold text-gray-900">Layout & Spacing</h2>
              
              {/* Border Radius */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-md font-medium text-gray-900 mb-4">Border Radius</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Border Radius
                    </label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={config.layout.borderRadius}
                        onChange={(e) => updateConfig({
                          layout: { ...config.layout, borderRadius: e.target.value }
                        })}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <div 
                        className="w-12 h-8 bg-blue-500"
                        style={{ borderRadius: config.layout.borderRadius }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Spacing */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-md font-medium text-gray-900 mb-4">Spacing</h3>
                <div className="space-y-4">
                  {Object.entries(config.layout.spacing).map(([key, value]) => (
                    <div key={key}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {key.toUpperCase()}
                      </label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={value}
                          onChange={(e) => updateConfig({
                            layout: {
                              ...config.layout,
                              spacing: { ...config.layout.spacing, [key]: e.target.value }
                            }
                          })}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <div 
                          className="w-8 h-8 bg-gray-200"
                          style={{ margin: value }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'advanced' && (
            <div className="p-6 space-y-6">
              <h2 className="text-lg font-semibold text-gray-900">Advanced Settings</h2>
              
              {/* Custom CSS */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-md font-medium text-gray-900 mb-4">Custom CSS</h3>
                <textarea
                  value={config.customCSS}
                  onChange={(e) => updateConfig({ customCSS: e.target.value })}
                  rows={10}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                  placeholder="/* Add your custom CSS here */"
                />
              </div>

              {/* Features */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-md font-medium text-gray-900 mb-4">Features</h3>
                <div className="space-y-4">
                  {Object.entries(config.features).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <label className="text-sm font-medium text-gray-700 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </label>
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) => updateConfig({
                          features: { ...config.features, [key]: e.target.checked }
                        })}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Domain Settings */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-md font-medium text-gray-900 mb-4">Domain Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Custom Domain
                    </label>
                    <input
                      type="text"
                      value={config.customDomain}
                      onChange={(e) => updateConfig({ customDomain: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="your-domain.com"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'preview' && (
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Live Preview</h2>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setPreviewDevice('desktop')}
                    className={`p-2 rounded ${previewDevice === 'desktop' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'}`}
                  >
                    <Monitor className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setPreviewDevice('tablet')}
                    className={`p-2 rounded ${previewDevice === 'tablet' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'}`}
                  >
                    <Tablet className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setPreviewDevice('mobile')}
                    className={`p-2 rounded ${previewDevice === 'mobile' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'}`}
                  >
                    <Smartphone className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              {renderPreview()}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default WhiteLabelingSystem

import React, { useState } from 'react'
import { 
  Palette, 
  Image, 
  Type, 
  Upload, 
  Trash2, 
  Eye, 
  Download, 
  Copy,
  CheckCircle,
  X,
  Plus,
  Settings,
  Globe,
  Smartphone
} from 'lucide-react'

interface BrandAsset {
  id: string
  name: string
  type: 'logo' | 'icon' | 'banner' | 'favicon'
  url: string
  size: string
  format: string
  isActive: boolean
}

interface ColorScheme {
  id: string
  name: string
  primary: string
  secondary: string
  accent: string
  background: string
  text: string
  isActive: boolean
}

interface Typography {
  id: string
  name: string
  headingFont: string
  bodyFont: string
  fontSize: string
  lineHeight: string
  isActive: boolean
}

const Branding = () => {
  const [brandAssets, setBrandAssets] = useState<BrandAsset[]>([
    {
      id: '1',
      name: 'Primary Logo',
      type: 'logo',
      url: '/logo-primary.png',
      size: '200x80px',
      format: 'PNG',
      isActive: true
    },
    {
      id: '2',
      name: 'App Icon',
      type: 'icon',
      url: '/app-icon.png',
      size: '512x512px',
      format: 'PNG',
      isActive: true
    },
    {
      id: '3',
      name: 'Banner Image',
      type: 'banner',
      url: '/banner.png',
      size: '1200x400px',
      format: 'PNG',
      isActive: false
    }
  ])

  const [colorSchemes] = useState<ColorScheme[]>([
    {
      id: '1',
      name: 'Default Theme',
      primary: '#DC2626',
      secondary: '#1F2937',
      accent: '#3B82F6',
      background: '#FFFFFF',
      text: '#111827',
      isActive: true
    },
    {
      id: '2',
      name: 'Dark Theme',
      primary: '#EF4444',
      secondary: '#374151',
      accent: '#60A5FA',
      background: '#111827',
      text: '#F9FAFB',
      isActive: false
    },
    {
      id: '3',
      name: 'Corporate Blue',
      primary: '#1E40AF',
      secondary: '#1F2937',
      accent: '#3B82F6',
      background: '#FFFFFF',
      text: '#111827',
      isActive: false
    }
  ])

  const [typography] = useState<Typography[]>([
    {
      id: '1',
      name: 'Modern Sans',
      headingFont: 'Inter',
      bodyFont: 'Inter',
      fontSize: '16px',
      lineHeight: '1.6',
      isActive: true
    },
    {
      id: '2',
      name: 'Classic Serif',
      headingFont: 'Merriweather',
      bodyFont: 'Source Sans Pro',
      fontSize: '16px',
      lineHeight: '1.7',
      isActive: false
    }
  ])

  const [showUploadModal, setShowUploadModal] = useState(false)
  const [showColorModal, setShowColorModal] = useState(false)
  const [showTypographyModal, setShowTypographyModal] = useState(false)
  const [selectedAsset, setSelectedAsset] = useState<BrandAsset | null>(null)

  const handleUploadAsset = () => {
    setShowUploadModal(true)
  }

  const handleDeleteAsset = (id: string) => {
    if (window.confirm('Are you sure you want to delete this asset?')) {
      setBrandAssets(prev => prev.filter(asset => asset.id !== id))
    }
  }

  const handleToggleAsset = (id: string) => {
    setBrandAssets(prev => prev.map(asset => 
      asset.id === id ? { ...asset, isActive: !asset.isActive } : asset
    ))
  }

  const handleCopyColor = (color: string) => {
    navigator.clipboard.writeText(color)
    // Show temporary success message
    alert('Color copied to clipboard!')
  }

  const handleDownloadAsset = (asset: BrandAsset) => {
    // Simulate download
    alert(`Downloading ${asset.name}`)
  }

  const getAssetIcon = (type: string) => {
    switch (type) {
      case 'logo': return <Image className="h-5 w-5 text-blue-600" />
      case 'icon': return <Smartphone className="h-5 w-5 text-green-600" />
      case 'banner': return <Globe className="h-5 w-5 text-purple-600" />
      case 'favicon': return <Globe className="h-5 w-5 text-orange-600" />
      default: return <Image className="h-5 w-5 text-gray-600" />
    }
  }

  const getAssetTypeColor = (type: string) => {
    switch (type) {
      case 'logo': return 'bg-blue-100 text-blue-800'
      case 'icon': return 'bg-green-100 text-green-800'
      case 'banner': return 'bg-purple-100 text-purple-800'
      case 'favicon': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Branding</h1>
          <p className="text-gray-600">Customize your brand appearance and visual identity</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={handleUploadAsset}
            className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2"
          >
            <Upload className="h-4 w-4" />
            Upload Asset
          </button>
        </div>
      </div>

      {/* Brand Assets */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Brand Assets</h2>
          <p className="text-sm text-gray-600">Manage your logos, icons, and visual elements</p>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {brandAssets.map((asset) => (
              <div key={asset.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      {getAssetIcon(asset.type)}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-medium text-gray-900">{asset.name}</h3>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getAssetTypeColor(asset.type)}`}>
                          {asset.type.charAt(0).toUpperCase() + asset.type.slice(1)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">{asset.size} • {asset.format}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleToggleAsset(asset.id)}
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        asset.isActive 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {asset.isActive ? 'Active' : 'Inactive'}
                    </button>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="w-full h-32 bg-gray-100 rounded-lg flex items-center justify-center mb-3">
                    <img 
                      src={asset.url} 
                      alt={asset.name}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleDownloadAsset(asset)}
                      className="text-blue-600 hover:text-blue-700 p-1"
                    >
                      <Download className="h-4 w-4" />
                    </button>
                    <button className="text-gray-600 hover:text-gray-700 p-1">
                      <Eye className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <button
                    onClick={() => handleDeleteAsset(asset.id)}
                    className="text-red-600 hover:text-red-700 p-1"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Color Schemes */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Color Schemes</h2>
              <p className="text-sm text-gray-600">Define your brand colors and themes</p>
            </div>
            <button
              onClick={() => setShowColorModal(true)}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              Create New Theme
            </button>
          </div>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            {colorSchemes.map((scheme) => (
              <div key={scheme.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-gray-900">{scheme.name}</h3>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    scheme.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {scheme.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
                
                <div className="grid grid-cols-5 gap-3 mb-4">
                  <div className="text-center">
                    <div 
                      className="w-12 h-12 rounded-lg border border-gray-200 mb-2 cursor-pointer"
                      style={{ backgroundColor: scheme.primary }}
                      onClick={() => handleCopyColor(scheme.primary)}
                    />
                    <p className="text-xs text-gray-600">Primary</p>
                    <p className="text-xs font-mono text-gray-500">{scheme.primary}</p>
                  </div>
                  
                  <div className="text-center">
                    <div 
                      className="w-12 h-12 rounded-lg border border-gray-200 mb-2 cursor-pointer"
                      style={{ backgroundColor: scheme.secondary }}
                      onClick={() => handleCopyColor(scheme.secondary)}
                    />
                    <p className="text-xs text-gray-600">Secondary</p>
                    <p className="text-xs font-mono text-gray-500">{scheme.secondary}</p>
                  </div>
                  
                  <div className="text-center">
                    <div 
                      className="w-12 h-12 rounded-lg border border-gray-200 mb-2 cursor-pointer"
                      style={{ backgroundColor: scheme.accent }}
                      onClick={() => handleCopyColor(scheme.accent)}
                    />
                    <p className="text-xs text-gray-600">Accent</p>
                    <p className="text-xs font-mono text-gray-500">{scheme.accent}</p>
                  </div>
                  
                  <div className="text-center">
                    <div 
                      className="w-12 h-12 rounded-lg border border-gray-200 mb-2 cursor-pointer"
                      style={{ backgroundColor: scheme.background }}
                      onClick={() => handleCopyColor(scheme.background)}
                    />
                    <p className="text-xs text-gray-600">Background</p>
                    <p className="text-xs font-mono text-gray-500">{scheme.background}</p>
                  </div>
                  
                  <div className="text-center">
                    <div 
                      className="w-12 h-12 rounded-lg border border-gray-200 mb-2 cursor-pointer"
                      style={{ backgroundColor: scheme.text }}
                      onClick={() => handleCopyColor(scheme.text)}
                    />
                    <p className="text-xs text-gray-600">Text</p>
                    <p className="text-xs font-mono text-gray-500">{scheme.text}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    Edit
                  </button>
                  <button className="text-gray-600 hover:text-gray-700 text-sm font-medium">
                    Preview
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Typography */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Typography</h2>
              <p className="text-sm text-gray-600">Configure fonts and text styling</p>
            </div>
            <button
              onClick={() => setShowTypographyModal(true)}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              Create New Style
            </button>
          </div>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            {typography.map((style) => (
              <div key={style.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-gray-900">{style.name}</h3>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    style.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {style.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Heading Font</h4>
                    <p className="text-sm text-gray-600" style={{ fontFamily: style.headingFont }}>
                      {style.headingFont} - The quick brown fox jumps over the lazy dog
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Body Font</h4>
                    <p className="text-sm text-gray-600" style={{ fontFamily: style.bodyFont }}>
                      {style.bodyFont} - The quick brown fox jumps over the lazy dog
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Font Size</h4>
                    <p className="text-sm text-gray-600">{style.fontSize}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Line Height</h4>
                    <p className="text-sm text-gray-600">{style.lineHeight}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    Edit
                  </button>
                  <button className="text-gray-600 hover:text-gray-700 text-sm font-medium">
                    Preview
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upload Asset Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 relative">
            <button onClick={() => setShowUploadModal(false)} className="absolute right-4 top-4 text-gray-400 hover:text-gray-600">
              <X className="h-5 w-5" />
            </button>
            
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
              <Upload className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">Upload Brand Asset</h3>
            <p className="text-sm text-gray-600 mb-6 text-center">
              Add new visual elements to your brand
            </p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Asset Name</label>
                <input
                  type="text"
                  placeholder="e.g., Primary Logo, App Icon"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Asset Type</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                  <option value="logo">Logo</option>
                  <option value="icon">Icon</option>
                  <option value="banner">Banner</option>
                  <option value="favicon">Favicon</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Upload File</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Drag and drop your file here, or click to browse</p>
                  <p className="text-xs text-gray-500 mt-1">PNG, JPG, SVG up to 10MB</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex space-x-3">
              <button
                onClick={() => setShowUploadModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                Upload Asset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Branding

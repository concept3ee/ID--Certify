import React, { useState, useEffect } from 'react'
import { 
  Smartphone, 
  Download, 
  Code, 
  Copy, 
  Play, 
  Settings, 
  FileText, 
  Package,
  Terminal,
  Globe,
  Shield,
  Zap,
  CheckCircle,
  AlertCircle,
  Info,
  ExternalLink,
  RefreshCw,
  Eye,
  BookOpen,
  MessageSquare,
  Star,
  TrendingUp,
  Users,
  Building,
  CreditCard,
  Lock,
  Unlock,
  Wifi,
  WifiOff,
  Camera,
  Mic,
  MapPin,
  Fingerprint,
  User,
  FileImage,
  Upload,
  Check,
  X,
  ArrowRight,
  ChevronDown,
  ChevronRight
} from 'lucide-react'

interface SDKPlatform {
  id: string
  name: string
  icon: React.ComponentType<any>
  description: string
  version: string
  size: string
  downloads: number
  rating: number
  features: string[]
  requirements: string[]
  installation: string
  documentation: string
  examples: string[]
  support: boolean
}

interface MobileSDKIntegrationProps {
  onGenerateCode: (platform: string, config: any) => void
  onDownloadSDK: (platform: string) => void
  onViewDocs: (platform: string) => void
  onClose: () => void
}

const MobileSDKIntegration: React.FC<MobileSDKIntegrationProps> = ({
  onGenerateCode,
  onDownloadSDK,
  onViewDocs,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'ios' | 'android' | 'react-native' | 'flutter' | 'xamarin'>('overview')
  const [selectedPlatform, setSelectedPlatform] = useState<string>('')
  const [isGeneratingCode, setIsGeneratingCode] = useState(false)
  const [generatedCode, setGeneratedCode] = useState<string>('')
  const [showCodePreview, setShowCodePreview] = useState(false)
  const [sdkConfig, setSdkConfig] = useState({
    apiKey: '',
    flowId: '',
    environment: 'sandbox',
    features: {
      camera: true,
      microphone: true,
      location: false,
      biometrics: true,
      nfc: false
    },
    ui: {
      theme: 'light',
      language: 'en',
      customColors: false
    },
    security: {
      encryption: true,
      certificatePinning: true,
      jailbreakDetection: true
    }
  })

  const platforms: SDKPlatform[] = [
    {
      id: 'ios',
      name: 'iOS SDK',
      icon: Smartphone,
      description: 'Native iOS SDK for iPhone and iPad applications',
      version: '2.1.0',
      size: '2.4 MB',
      downloads: 15420,
      rating: 4.8,
      features: [
        'Native iOS integration',
        'Face ID / Touch ID support',
        'Camera and document capture',
        'Liveness detection',
        'Offline capability',
        'Swift and Objective-C support'
      ],
      requirements: [
        'iOS 12.0+',
        'Xcode 12.0+',
        'Swift 5.0+ or Objective-C'
      ],
      installation: 'CocoaPods, Swift Package Manager, or manual',
      documentation: '/docs/ios-sdk',
      examples: ['Basic integration', 'Custom UI', 'Biometric auth'],
      support: true
    },
    {
      id: 'android',
      name: 'Android SDK',
      icon: Smartphone,
      description: 'Native Android SDK for mobile applications',
      version: '2.1.0',
      size: '3.1 MB',
      downloads: 18930,
      rating: 4.7,
      features: [
        'Native Android integration',
        'Fingerprint / Face unlock',
        'Camera and document capture',
        'Liveness detection',
        'Offline capability',
        'Kotlin and Java support'
      ],
      requirements: [
        'Android API 21+',
        'Android Studio 4.0+',
        'Kotlin 1.5+ or Java 8+'
      ],
      installation: 'Gradle, Maven, or manual',
      documentation: '/docs/android-sdk',
      examples: ['Basic integration', 'Custom UI', 'Biometric auth'],
      support: true
    },
    {
      id: 'react-native',
      name: 'React Native SDK',
      icon: Code,
      description: 'Cross-platform SDK for React Native applications',
      version: '1.8.0',
      size: '1.9 MB',
      downloads: 12340,
      rating: 4.6,
      features: [
        'Cross-platform support',
        'React Native integration',
        'TypeScript support',
        'Camera and document capture',
        'Biometric authentication',
        'Customizable UI components'
      ],
      requirements: [
        'React Native 0.60+',
        'Node.js 14+',
        'TypeScript 4.0+'
      ],
      installation: 'npm or yarn',
      documentation: '/docs/react-native-sdk',
      examples: ['Basic integration', 'Custom components', 'Navigation'],
      support: true
    },
    {
      id: 'flutter',
      name: 'Flutter SDK',
      icon: Code,
      description: 'Cross-platform SDK for Flutter applications',
      version: '1.5.0',
      size: '2.2 MB',
      downloads: 9870,
      rating: 4.5,
      features: [
        'Cross-platform support',
        'Flutter integration',
        'Dart language support',
        'Camera and document capture',
        'Biometric authentication',
        'Material Design components'
      ],
      requirements: [
        'Flutter 2.0+',
        'Dart 2.12+',
        'Android Studio / VS Code'
      ],
      installation: 'pub.dev',
      documentation: '/docs/flutter-sdk',
      examples: ['Basic integration', 'Custom widgets', 'State management'],
      support: true
    },
    {
      id: 'xamarin',
      name: 'Xamarin SDK',
      icon: Code,
      description: 'Cross-platform SDK for Xamarin applications',
      version: '1.2.0',
      size: '2.8 MB',
      downloads: 4560,
      rating: 4.3,
      features: [
        'Cross-platform support',
        'Xamarin.Forms integration',
        'C# language support',
        'Camera and document capture',
        'Biometric authentication',
        'Native performance'
      ],
      requirements: [
        'Xamarin.Forms 4.0+',
        'Visual Studio 2019+',
        'C# 8.0+'
      ],
      installation: 'NuGet package manager',
      documentation: '/docs/xamarin-sdk',
      examples: ['Basic integration', 'Custom renderers', 'Dependency injection'],
      support: false
    }
  ]

  const generateCodeForPlatform = async (platform: string) => {
    setIsGeneratingCode(true)
    setSelectedPlatform(platform)
    
    // Simulate code generation
    setTimeout(() => {
      const codeTemplates = {
        ios: `
import IDCertifySDK

class VerificationViewController: UIViewController {
    override func viewDidLoad() {
        super.viewDidLoad()
        
        let config = IDCertifyConfig(
            apiKey: "${sdkConfig.apiKey}",
            flowId: "${sdkConfig.flowId}",
            environment: .${sdkConfig.environment}
        )
        
        config.features = IDCertifyFeatures(
            camera: ${sdkConfig.features.camera},
            microphone: ${sdkConfig.features.microphone},
            location: ${sdkConfig.features.location},
            biometrics: ${sdkConfig.features.biometrics}
        )
        
        config.security = IDCertifySecurity(
            encryption: ${sdkConfig.security.encryption},
            certificatePinning: ${sdkConfig.security.certificatePinning},
            jailbreakDetection: ${sdkConfig.security.jailbreakDetection}
        )
        
        IDCertify.shared.startVerification(
            from: self,
            config: config,
            completion: { result in
                switch result {
                case .success(let verificationResult):
                    print("Verification successful: \\(verificationResult)")
                case .failure(let error):
                    print("Verification failed: \\(error)")
                }
            }
        )
    }
}
        `,
        android: `
import com.idcertify.sdk.IDCertify
import com.idcertify.sdk.IDCertifyConfig
import com.idcertify.sdk.IDCertifyFeatures
import com.idcertify.sdk.IDCertifySecurity

class VerificationActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        val config = IDCertifyConfig.Builder()
            .setApiKey("${sdkConfig.apiKey}")
            .setFlowId("${sdkConfig.flowId}")
            .setEnvironment(IDCertifyConfig.Environment.${sdkConfig.environment.toUpperCase()})
            .build()
        
        val features = IDCertifyFeatures.Builder()
            .setCameraEnabled(${sdkConfig.features.camera})
            .setMicrophoneEnabled(${sdkConfig.features.microphone})
            .setLocationEnabled(${sdkConfig.features.location})
            .setBiometricsEnabled(${sdkConfig.features.biometrics})
            .build()
        
        val security = IDCertifySecurity.Builder()
            .setEncryptionEnabled(${sdkConfig.security.encryption})
            .setCertificatePinningEnabled(${sdkConfig.security.certificatePinning})
            .setJailbreakDetectionEnabled(${sdkConfig.security.jailbreakDetection})
            .build()
        
        IDCertify.startVerification(
            this,
            config,
            features,
            security,
            object : IDCertify.VerificationCallback {
                override fun onSuccess(result: VerificationResult) {
                    Log.d("IDCertify", "Verification successful: \$result")
                }
                
                override fun onError(error: IDCertifyError) {
                    Log.e("IDCertify", "Verification failed: \$error")
                }
            }
        )
    }
}
        `,
        'react-native': `
import React, { useEffect } from 'react';
import { View, Alert } from 'react-native';
import IDCertify from '@idcertify/react-native-sdk';

const VerificationScreen = () => {
  useEffect(() => {
    const startVerification = async () => {
      try {
        const config = {
          apiKey: '${sdkConfig.apiKey}',
          flowId: '${sdkConfig.flowId}',
          environment: '${sdkConfig.environment}',
          features: {
            camera: ${sdkConfig.features.camera},
            microphone: ${sdkConfig.features.microphone},
            location: ${sdkConfig.features.location},
            biometrics: ${sdkConfig.features.biometrics}
          },
          security: {
            encryption: ${sdkConfig.security.encryption},
            certificatePinning: ${sdkConfig.security.certificatePinning},
            jailbreakDetection: ${sdkConfig.security.jailbreakDetection}
          }
        };

        const result = await IDCertify.startVerification(config);
        console.log('Verification successful:', result);
      } catch (error) {
        console.error('Verification failed:', error);
        Alert.alert('Error', 'Verification failed');
      }
    };

    startVerification();
  }, []);

  return <View />;
};

export default VerificationScreen;
        `,
        flutter: `
import 'package:idcertify_flutter/idcertify_flutter.dart';

class VerificationPage extends StatefulWidget {
  @override
  _VerificationPageState createState() => _VerificationPageState();
}

class _VerificationPageState extends State<VerificationPage> {
  @override
  void initState() {
    super.initState();
    _startVerification();
  }

  Future<void> _startVerification() async {
    try {
      final config = IDCertifyConfig(
        apiKey: '${sdkConfig.apiKey}',
        flowId: '${sdkConfig.flowId}',
        environment: IDCertifyEnvironment.${sdkConfig.environment},
        features: IDCertifyFeatures(
          camera: ${sdkConfig.features.camera},
          microphone: ${sdkConfig.features.microphone},
          location: ${sdkConfig.features.location},
          biometrics: ${sdkConfig.features.biometrics},
        ),
        security: IDCertifySecurity(
          encryption: ${sdkConfig.security.encryption},
          certificatePinning: ${sdkConfig.security.certificatePinning},
          jailbreakDetection: ${sdkConfig.security.jailbreakDetection},
        ),
      );

      final result = await IDCertify.startVerification(config);
      print('Verification successful: \$result');
    } catch (error) {
      print('Verification failed: \$error');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Verification')),
      body: Center(child: CircularProgressIndicator()),
    );
  }
}
        `,
        xamarin: `
using IDCertify.Xamarin;

public partial class VerificationPage : ContentPage
{
    public VerificationPage()
    {
        InitializeComponent();
        StartVerification();
    }

    private async void StartVerification()
    {
        try
        {
            var config = new IDCertifyConfig
            {
                ApiKey = "${sdkConfig.apiKey}",
                FlowId = "${sdkConfig.flowId}",
                Environment = IDCertifyEnvironment.${sdkConfig.environment},
                Features = new IDCertifyFeatures
                {
                    Camera = ${sdkConfig.features.camera.toString().toLowerCase()},
                    Microphone = ${sdkConfig.features.microphone.toString().toLowerCase()},
                    Location = ${sdkConfig.features.location.toString().toLowerCase()},
                    Biometrics = ${sdkConfig.features.biometrics.toString().toLowerCase()}
                },
                Security = new IDCertifySecurity
                {
                    Encryption = ${sdkConfig.security.encryption.toString().toLowerCase()},
                    CertificatePinning = ${sdkConfig.security.certificatePinning.toString().toLowerCase()},
                    JailbreakDetection = ${sdkConfig.security.jailbreakDetection.toString().toLowerCase()}
                }
            };

            var result = await IDCertify.StartVerificationAsync(config);
            System.Diagnostics.Debug.WriteLine($"Verification successful: {result}");
        }
        catch (Exception ex)
        {
            System.Diagnostics.Debug.WriteLine($"Verification failed: {ex.Message}");
        }
    }
}
        `
      }
      
      setGeneratedCode(codeTemplates[platform as keyof typeof codeTemplates] || '')
      setIsGeneratingCode(false)
      setShowCodePreview(true)
    }, 1500)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCode)
  }

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'ios':
      case 'android':
        return <Smartphone className="h-5 w-5" />
      case 'react-native':
      case 'flutter':
      case 'xamarin':
        return <Code className="h-5 w-5" />
      default:
        return <Package className="h-5 w-5" />
    }
  }

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'ios':
        return 'bg-gray-100 text-gray-800'
      case 'android':
        return 'bg-green-100 text-green-800'
      case 'react-native':
        return 'bg-blue-100 text-blue-800'
      case 'flutter':
        return 'bg-cyan-100 text-cyan-800'
      case 'xamarin':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="fixed inset-0 bg-gray-900 z-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-semibold text-gray-900">Mobile SDK Integration</h1>
          <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
            Cross-Platform
          </span>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={() => onViewDocs(selectedPlatform)}
            disabled={!selectedPlatform}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            <BookOpen className="h-4 w-4" />
            <span>Documentation</span>
          </button>
          
          <button
            onClick={() => onDownloadSDK(selectedPlatform)}
            disabled={!selectedPlatform}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
          >
            <Download className="h-4 w-4" />
            <span>Download SDK</span>
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
            {/* Platform Tabs */}
            <div className="space-y-2">
              {[
                { id: 'overview', name: 'Overview', icon: Globe },
                { id: 'ios', name: 'iOS SDK', icon: Smartphone },
                { id: 'android', name: 'Android SDK', icon: Smartphone },
                { id: 'react-native', name: 'React Native', icon: Code },
                { id: 'flutter', name: 'Flutter SDK', icon: Code },
                { id: 'xamarin', name: 'Xamarin SDK', icon: Code }
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

            {/* SDK Configuration */}
            {activeTab !== 'overview' && (
              <div className="pt-6 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-900 mb-3">SDK Configuration</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      API Key
                    </label>
                    <input
                      type="text"
                      value={sdkConfig.apiKey}
                      onChange={(e) => setSdkConfig(prev => ({ ...prev, apiKey: e.target.value }))}
                      className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="your-api-key"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Flow ID
                    </label>
                    <input
                      type="text"
                      value={sdkConfig.flowId}
                      onChange={(e) => setSdkConfig(prev => ({ ...prev, flowId: e.target.value }))}
                      className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="your-flow-id"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Environment
                    </label>
                    <select
                      value={sdkConfig.environment}
                      onChange={(e) => setSdkConfig(prev => ({ ...prev, environment: e.target.value }))}
                      className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="sandbox">Sandbox</option>
                      <option value="production">Production</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {activeTab === 'overview' && (
            <div className="p-6 space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Mobile SDK Overview</h2>
                <p className="text-gray-600">
                  Integrate IDCertify verification into your mobile applications with our comprehensive SDKs.
                  Choose from native iOS/Android or cross-platform solutions.
                </p>
              </div>

              {/* Platform Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {platforms.map((platform) => {
                  const Icon = platform.icon
                  return (
                    <div
                      key={platform.id}
                      className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer"
                      onClick={() => setActiveTab(platform.id as any)}
                    >
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Icon className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{platform.name}</h3>
                          <p className="text-sm text-gray-500">v{platform.version}</p>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-4">{platform.description}</p>
                      
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <span>{platform.size}</span>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span>{platform.rating}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          {platform.downloads.toLocaleString()} downloads
                        </span>
                        {platform.support && (
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                            Supported
                          </span>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Features Comparison */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Feature Comparison</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Feature</th>
                        {platforms.map((platform) => (
                          <th key={platform.id} className="text-center py-3 px-4 font-medium text-gray-900">
                            {platform.name}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        'Native Performance',
                        'Camera Capture',
                        'Biometric Auth',
                        'Offline Support',
                        'Custom UI',
                        'TypeScript Support'
                      ].map((feature) => (
                        <tr key={feature} className="border-b border-gray-100">
                          <td className="py-3 px-4 text-sm text-gray-700">{feature}</td>
                          {platforms.map((platform) => (
                            <td key={platform.id} className="text-center py-3 px-4">
                              <CheckCircle className="h-4 w-4 text-green-600 mx-auto" />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab !== 'overview' && (
            <div className="p-6 space-y-6">
              {(() => {
                const platform = platforms.find(p => p.id === activeTab)
                if (!platform) return null

                const Icon = platform.icon
                return (
                  <>
                    {/* Platform Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="p-3 bg-blue-100 rounded-lg">
                          <Icon className="h-8 w-8 text-blue-600" />
                        </div>
                        <div>
                          <h2 className="text-xl font-semibold text-gray-900">{platform.name}</h2>
                          <p className="text-gray-600">{platform.description}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <span className={`px-3 py-1 text-sm font-medium rounded-full ${getPlatformColor(platform.id)}`}>
                          v{platform.version}
                        </span>
                        {platform.support && (
                          <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                            <CheckCircle className="h-4 w-4 inline mr-1" />
                            Supported
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Platform Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <div className="flex items-center">
                          <Package className="h-5 w-5 text-gray-400" />
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-600">Size</p>
                            <p className="text-lg font-semibold text-gray-900">{platform.size}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <div className="flex items-center">
                          <Download className="h-5 w-5 text-gray-400" />
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-600">Downloads</p>
                            <p className="text-lg font-semibold text-gray-900">
                              {platform.downloads.toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <div className="flex items-center">
                          <Star className="h-5 w-5 text-yellow-400" />
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-600">Rating</p>
                            <p className="text-lg font-semibold text-gray-900">{platform.rating}/5</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <div className="flex items-center">
                          <Shield className="h-5 w-5 text-gray-400" />
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-600">Security</p>
                            <p className="text-lg font-semibold text-gray-900">Enterprise</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Features</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {platform.features.map((feature, index) => (
                          <div key={index} className="flex items-center space-x-3">
                            <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                            <span className="text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Requirements */}
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Requirements</h3>
                      <div className="space-y-2">
                        {platform.requirements.map((requirement, index) => (
                          <div key={index} className="flex items-center space-x-3">
                            <Info className="h-4 w-4 text-blue-600 flex-shrink-0" />
                            <span className="text-gray-700">{requirement}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Installation */}
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Installation</h3>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">Installation Method</span>
                          <Copy className="h-4 w-4 text-gray-400 cursor-pointer" />
                        </div>
                        <code className="text-sm text-gray-800 font-mono">
                          {platform.installation}
                        </code>
                      </div>
                    </div>

                    {/* Code Generation */}
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Generate Integration Code</h3>
                      <div className="space-y-4">
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                          <div className="flex items-center">
                            <AlertCircle className="h-5 w-5 text-yellow-600 mr-2" />
                            <span className="text-sm text-yellow-800">
                              Make sure to configure your API key and Flow ID before generating code.
                            </span>
                          </div>
                        </div>
                        
                        <button
                          onClick={() => generateCodeForPlatform(platform.id)}
                          disabled={isGeneratingCode || !sdkConfig.apiKey || !sdkConfig.flowId}
                          className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isGeneratingCode ? (
                            <RefreshCw className="h-5 w-5 animate-spin" />
                          ) : (
                            <Code className="h-5 w-5" />
                          )}
                          <span>
                            {isGeneratingCode ? 'Generating Code...' : 'Generate Integration Code'}
                          </span>
                        </button>
                      </div>
                    </div>

                    {/* Code Preview */}
                    {showCodePreview && generatedCode && (
                      <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold text-gray-900">Generated Code</h3>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={copyToClipboard}
                              className="flex items-center space-x-2 px-3 py-1 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors"
                            >
                              <Copy className="h-4 w-4" />
                              <span>Copy</span>
                            </button>
                            <button
                              onClick={() => setShowCodePreview(false)}
                              className="p-1 text-gray-400 hover:text-gray-600"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                        
                        <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                          <pre className="text-sm text-gray-100">
                            <code>{generatedCode}</code>
                          </pre>
                        </div>
                      </div>
                    )}
                  </>
                )
              })()}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MobileSDKIntegration

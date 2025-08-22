import { Shield, ArrowRight } from 'lucide-react'
import { useTour } from '@/contexts/TourContext'

interface WelcomeModalProps {
  isOpen: boolean
  onClose: () => void
  userType: 'individual' | 'organisation' | 'developer'
}

const WelcomeModal = ({ isOpen, onClose, userType }: WelcomeModalProps) => {
  const { startTourAfterNavigation } = useTour()

  if (!isOpen) return null
  console.log('WelcomeModal rendering with isOpen:', isOpen, 'userType:', userType)

  const getWelcomeContent = () => {
    switch (userType) {
      case 'individual':
        return {
          title: 'Welcome to IDCertify!',
          subtitle: 'Your personal identity verification platform',
          features: [
            'Secure identity verification',
            'Document management',
            'Trust score tracking',
            'Digital wallet for credentials'
          ]
        }
      case 'organisation':
        return {
          title: 'Welcome to IDCertify!',
          subtitle: 'Enterprise identity verification platform',
          features: [
            'Team verification management',
            'Corporate document center',
            'Organization trust scoring',
            'Partner credential sharing'
          ]
        }
      case 'developer':
        return {
          title: 'Welcome to IDCertify!',
          subtitle: 'Developer identity verification platform',
          features: [
            'API key management',
            'Verification endpoints',
            'Document upload API',
            'Digital wallet integration'
          ]
        }
      default:
        return {
          title: 'Welcome to IDCertify!',
          subtitle: 'Identity verification platform',
          features: [
            'Secure verification',
            'Document management',
            'Trust scoring',
            'Digital credentials'
          ]
        }
    }
  }

  const content = getWelcomeContent()

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
      <div className="bg-white rounded-lg max-w-md w-full overflow-hidden shadow-2xl border-4 border-red-500">
        {/* Modal Header */}
        <div className="p-6 text-center border-b border-gray-200">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="h-8 w-8 text-primary-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {content.title}
          </h2>
          <p className="text-gray-600">
            {content.subtitle}
          </p>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          <p className="text-gray-600 mb-4">
            Get started with your {userType} dashboard and explore the key features:
          </p>
          <ul className="space-y-2">
            {content.features.map((feature, index) => (
              <li key={index} className="flex items-center text-sm text-gray-600">
                <div className="w-2 h-2 bg-primary-600 rounded-full mr-3"></div>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Modal Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors font-medium"
            >
              Skip Tour
            </button>
            <button
              onClick={() => { onClose(); startTourAfterNavigation(userType); }}
              className="flex-1 bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2"
            >
              <span>Take Tour</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WelcomeModal

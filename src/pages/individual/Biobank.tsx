import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  BarChart3,
  CheckCircle,
  AlertCircle,
  Clock,
  Search,
  Filter,
  ArrowDownWideNarrow,
  Download,
  Eye,
  FileText,
  MapPin,
  Building2,
  CreditCard,
  Briefcase,
  Phone,
  Mail
} from 'lucide-react'

type BioStatus = 'completed' | 'pending' | 'failed' | 'issues'

interface BioItem {
  id: string
  date: string
  type: 'Job' | 'Address' | 'BVN' | 'NIN' | 'Passport' | 'Education' | 'Driver License' | 'Immigration Verification' | 'FIRS Verification'
  action: 'Submitted' | 'Verified' | 'Declined' | 'Expired'
  status: BioStatus
  impact: number
  by: string
}

const Biobank = () => {
  const navigate = useNavigate()
  const [activeMainTab, setActiveMainTab] = useState<'biodata' | 'logs'>('biodata')
  const [activeView, setActiveView] = useState<'table' | 'timeline'>('table')
  const [statusFilter, setStatusFilter] = useState<string>('')
  const [searchTerm, setSearchTerm] = useState('')

  const bioItems: BioItem[] = [
    { id: '1', date: '2024-08-26', type: 'Job', action: 'Submitted', status: 'pending', impact: 12, by: 'Self' },
    { id: '2', date: '2024-08-27', type: 'Passport', action: 'Verified', status: 'completed', impact: 12, by: 'Platform AI' },
    { id: '3', date: '2024-08-28', type: 'Driver License', action: 'Declined', status: 'failed', impact: 0, by: 'Adekunle Ajayi' },
    { id: '4', date: '2024-08-29', type: 'Immigration Verification', action: 'Expired', status: 'issues', impact: -14, by: 'Admin' },
    { id: '5', date: '2024-08-30', type: 'Address', action: 'Submitted', status: 'pending', impact: 12, by: 'Self' },
    { id: '6', date: '2024-08-31', type: 'FIRS Verification', action: 'Verified', status: 'completed', impact: 12, by: 'Ayomide Ikenna' }
  ]

  const getStatusPill = (status: BioStatus) => {
    const base = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium'
    if (status === 'completed') return <span className={`${base} bg-success-100 text-success-800`}><CheckCircle className="h-3 w-3 mr-1"/>COMPLETED</span>
    if (status === 'pending') return <span className={`${base} bg-warning-100 text-warning-800`}><Clock className="h-3 w-3 mr-1"/>PENDING</span>
    if (status === 'issues') return <span className={`${base} bg-danger-100 text-danger-800`}><AlertCircle className="h-3 w-3 mr-1"/>ISSUES</span>
    return <span className={`${base} bg-danger-100 text-danger-800`}><AlertCircle className="h-3 w-3 mr-1"/>FAILED</span>
  }

  const filtered = bioItems.filter(i =>
    (!statusFilter || i.status === statusFilter) &&
    (searchTerm.trim() === '' || i.type.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  // Bio data cards
  type CardStatus = 'verified' | 'pending' | 'issue' | 'not_verified'
  interface BioCard {
    id: string
    title: string
    description: string
    status: CardStatus
    recommended?: boolean
    href?: string
  }

  const bioCards: BioCard[] = [
    { id: 'addr', title: 'Address Verification', description: 'Unlimited users, unlimited individual data and access to all features.', status: 'not_verified', recommended: true, href: '/individual/verification' },
    { id: 'job', title: 'Job Verification', description: 'Unlimited users, unlimited individual data and access to all features.', status: 'pending', recommended: true, href: '/individual/verification/status' },
    { id: 'nin', title: 'NIN', description: 'Unlimited users, unlimited individual data and access to all features.', status: 'not_verified', href: '/individual/verification' },
    { id: 'bvn', title: 'BVN', description: 'Unlimited users, unlimited individual data and access to all features.', status: 'issue', href: '/individual/verification/status' },
    { id: 'passport', title: 'Passport', description: 'Unlimited users, unlimited individual data and access to all features.', status: 'verified', href: '/individual/verification/history' },
    { id: 'edu', title: 'Education Verification', description: 'Unlimited users, unlimited individual data and access to all features.', status: 'not_verified', recommended: true, href: '/individual/verification' }
  ]

  const renderCardStatus = (status: CardStatus) => {
    const common = 'text-[11px] px-2 py-0.5 rounded-full inline-flex items-center whitespace-nowrap'
    switch (status) {
      case 'verified':
        return <span className={`${common} bg-green-100 text-green-700`}>Verified</span>
      case 'pending':
        return <span className={`${common} bg-yellow-100 text-yellow-700`}>Pending</span>
      case 'issue':
        return <span className={`${common} bg-red-100 text-red-700`}>Issue</span>
      default:
        return <span className={`${common} bg-gray-100 text-gray-600`}>Not Verified</span>
    }
  }

  const onCardDetails = (card: BioCard) => {
    if (card.status === 'not_verified') {
      navigate('/individual/verification', { state: { preset: card.title } })
    } else if (card.href) {
      navigate(card.href)
    }
  }

  return (
    <div className="space-y-6">
      {/* Section Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-3">
          {/* Section Header Row - Title, Centered Navigation, and Action Button */}
          <div className="flex items-center">
            {/* Left Side - Title Only */}
            <div className="flex items-center flex-shrink-0">
              <h1 className="text-xl font-bold text-gray-900">BioBank</h1>
            </div>

            {/* Center - Navigation Tabs with Trust Score Styling */}
            <div className="flex-1 flex justify-center">
              <div className="bg-gray-100 rounded-lg p-1">
                <nav className="flex space-x-1">
                  <button
                    onClick={() => setActiveMainTab('biodata')}
                    className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                      activeMainTab === 'biodata'
                        ? 'bg-white text-gray-900 shadow-sm font-bold'
                        : 'text-gray-500 hover:text-gray-700 font-medium'
                    }`}
                  >
                    <span>Bio Data</span>
                  </button>
                  <button
                    onClick={() => setActiveMainTab('logs')}
                    className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                      activeMainTab === 'logs'
                        ? 'bg-white text-gray-900 shadow-sm font-bold'
                        : 'text-gray-500 hover:text-gray-700 font-medium'
                    }`}
                  >
                    <span>History / Log</span>
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      {activeMainTab === 'biodata' ? (
        <div className="px-6 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="text-sm text-gray-600">Completed</div>
              <div className="mt-2 text-2xl font-bold text-gray-900">12</div>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="text-sm text-gray-600">Pending</div>
              <div className="mt-2 text-2xl font-bold text-gray-900">2</div>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="text-sm text-gray-600">Not Done</div>
              <div className="mt-2 text-2xl font-bold text-gray-900">24</div>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="text-sm text-gray-600">Issues</div>
              <div className="mt-2 text-2xl font-bold text-gray-900">4</div>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="text-sm text-gray-600">Trust Score</div>
              <div className="mt-2 text-2xl font-bold text-primary-600">720</div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input value={searchTerm} onChange={e=>setSearchTerm(e.target.value)} placeholder="Search by Name, Commodity" className="pl-9 pr-3 py-2 border border-gray-300 rounded-md text-sm w-64" />
              </div>
              <select value={statusFilter} onChange={e=>setStatusFilter(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-md text-sm">
                <option value="">Status</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
                <option value="issues">Issues</option>
              </select>
            </div>
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {bioCards.map((card) => (
              <div key={card.id} className="bg-white border border-gray-200 rounded-xl p-5 md:p-6 shadow-sm hover:shadow transition">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-red-100 flex-shrink-0" />
                  <div className="min-w-0 w-full">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-gray-900 truncate">{card.title}</span>
                      {card.recommended && (
                        <span className="text-[11px] px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 whitespace-nowrap">Recommended</span>
                      )}
                    </div>
                    <div className="mt-2">{renderCardStatus(card.status)}</div>
                    <p className="text-xs text-gray-500 mt-2 leading-5">{card.description}</p>
                    <button onClick={() => onCardDetails(card)} className="mt-3 text-xs font-medium text-primary-700 hover:underline">Details</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="px-6 space-y-4">
          {/* View Switch */}
          <div className="flex items-center space-x-2">
            <button onClick={()=>setActiveView('table')} className={`px-4 py-2 rounded-md ${activeView==='table' ? 'bg-primary-600 text-white' : 'bg-white border border-gray-200 text-gray-700'}`}>Table View</button>
            <button onClick={()=>setActiveView('timeline')} className={`px-4 py-2 rounded-md ${activeView==='timeline' ? 'bg-primary-600 text-white' : 'bg-white border border-gray-200 text-gray-700'}`}>Timeline</button>
          </div>

          {activeView === 'table' ? (
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Verification Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Impact</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">By</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filtered.map((row)=> (
                      <tr key={row.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{new Date(row.date).toLocaleDateString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.type}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{row.action}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{getStatusPill(row.status)}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded-full text-xs ${row.impact>=0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{row.impact >= 0 ? `+${row.impact}` : row.impact}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-primary-700">{row.by}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
              {filtered.map((item)=> (
                <div key={item.id} className="relative pl-10">
                  <div className="absolute left-0 top-2 w-3 h-3 rounded-full bg-gray-300" />
                  <div className="text-xs text-gray-500 mb-1">{new Date(item.date).toLocaleDateString()}</div>
                  <div className="text-sm text-gray-900"><span className="font-medium">{item.by}</span> • {item.action} {item.type}</div>
                  <div className="mt-1 flex items-center space-x-3">
                    {getStatusPill(item.status)}
                    <span className={`px-2 py-1 rounded-full text-xs ${item.impact>=0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{item.impact >= 0 ? `+${item.impact}` : item.impact}</span>
                    <button className="text-xs text-primary-700">View detail pages</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Biobank

import React, { useState } from 'react'
import { 
  ArrowLeft,
  Download,
  CheckCircle,
  Clock,
  AlertTriangle,
  Info,
  ChevronRight,
  X,
  User
} from 'lucide-react'

interface BackgroundCheckDetailsPageProps {
  backgroundCheck: any
  onClose: () => void
}

const BackgroundCheckDetailsPage: React.FC<BackgroundCheckDetailsPageProps> = ({ 
  backgroundCheck, 
  onClose 
}) => {
  const [selectedCategory, setSelectedCategory] = useState('criminalRecord')
  const [selectedSubTab, setSelectedSubTab] = useState('criminalHistory')

  // Mock detailed data for the background check
  const backgroundCheckData = {
    id: 'ID284787822',
    candidate: {
      name: 'Nene Oyinda Afamefuna',
      email: 'NeneAfamefuna@gmail.com',
      profileImage: '/api/placeholder/80/80',
      score: 830
    },
    completionDate: 'Mar 23, 2025',
    identityVerified: true,
    consentProvided: 'Mar 12, 2025 18:34:12',
    flaggedIssues: 2,
    categories: {
      personalIdentity: {
        name: 'Personal & Identity Information',
        status: 'completed',
        subTabs: {
          address: {
            name: 'Address',
            data: {
              address: 'No 6 Ajanaku Street, Opebi',
              city: 'Ikeja',
              lga: 'Ikeja L.G.A',
              state: 'Lagos',
              timeline: 'From Jun, 2019 to now'
            }
          },
          bvn: {
            name: 'BVN Check',
            data: {
              bvnMatched: true,
              timeline: 'From Jun, 2019 to now'
            }
          },
          nin: {
            name: 'NIN Check',
            data: {
              ninMatched: true,
              timeline: 'From Jun, 2019 to now'
            }
          },
          frsc: {
            name: 'FRSC History',
            data: {
              licenseNumber: 'A63787827',
              stateIssued: 'Lagos',
              dateIssued: 'Jun 12, 2024',
              expiryDate: 'Jun 11, 2026',
              status: 'Restricted',
              violations: [
                {
                  violation: 'Driving 75km on a 45km road and 2 more offenses',
                  date: 'Oct 22, 2024',
                  points: '3points'
                },
                {
                  violation: 'Driving 75km on a 45km road and 2 more offenses',
                  date: 'Oct 22, 2024',
                  points: '3points'
                }
              ],
              timeline: 'From Jun, 2019 to now'
            }
          },
          stateResidency: {
            name: 'State Residency',
            data: {
              residency: 'Lagos State',
              timeline: 'From Jun, 2019 to now'
            }
          },
          nameChange: {
            name: 'Name change',
            data: {
              nameChange: 'None',
              timeline: 'From Jun, 2019 to now'
            }
          },
          email: {
            name: 'Email',
            data: {
              phoneMatch: true,
              status: 'Registered',
              timeline: 'From Jun, 2019 to now'
            }
          }
        }
      },
      criminalRecord: {
        name: 'Criminal Record Check',
        status: 'inProgress',
        subTabs: {
          criminalHistory: {
            name: 'Criminal History',
            data: {
              status: 'In Progress',
              timeline: 'From Jun, 2019 to now',
              progress: '65%',
              checks: [
                { name: 'Federal Database Search', status: 'completed', result: 'Clear' },
                { name: 'State Database Search', status: 'inProgress', result: 'Pending' },
                { name: 'County Records Search', status: 'pending', result: 'Pending' },
                { name: 'International Search', status: 'pending', result: 'Pending' }
              ]
            }
          },
          courtRecords: {
            name: 'Court Records',
            data: {
              status: 'In Progress',
              timeline: 'From Jun, 2019 to now',
              records: [
                { court: 'Lagos High Court', caseNumber: 'HC/L/1234/2023', status: 'No Records Found', date: 'Mar 15, 2025' },
                { court: 'Ikeja Magistrate Court', caseNumber: 'MC/I/5678/2022', status: 'No Records Found', date: 'Mar 15, 2025' }
              ]
            }
          },
          sexOffender: {
            name: 'Sex Offender Registry',
            data: {
              status: 'Completed',
              timeline: 'From Jun, 2019 to now',
              result: 'Clear',
              lastChecked: 'Mar 15, 2025'
            }
          }
        }
      },
      financialCredit: {
        name: 'Financial & Credit History',
        status: 'completed',
        subTabs: {
          creditReport: {
            name: 'Credit Report',
            data: {
              creditScore: 720,
              rating: 'Good',
              timeline: 'From Jun, 2019 to now',
              summary: {
                totalAccounts: 5,
                activeAccounts: 3,
                delinquentAccounts: 0,
                creditUtilization: '25%'
              }
            }
          },
          bankVerification: {
            name: 'Bank Verification',
            data: {
              status: 'Verified',
              timeline: 'From Jun, 2019 to now',
              banks: [
                { name: 'First Bank of Nigeria', accountType: 'Savings', status: 'Active', verified: true },
                { name: 'Guaranty Trust Bank', accountType: 'Current', status: 'Active', verified: true }
              ]
            }
          },
          loanHistory: {
            name: 'Loan History',
            data: {
              status: 'Clear',
              timeline: 'From Jun, 2019 to now',
              loans: [
                { type: 'Personal Loan', amount: '₦500,000', status: 'Paid Off', date: '2023' },
                { type: 'Car Loan', amount: '₦2,000,000', status: 'Current', date: '2024' }
              ]
            }
          }
        }
      },
      fraudDetection: {
        name: 'Fraud & Anti-Fraud Detection',
        status: 'completed',
        subTabs: {
          identityFraud: {
            name: 'Identity Fraud Check',
            data: {
              status: 'Clear',
              timeline: 'From Jun, 2019 to now',
              checks: [
                { type: 'Identity Theft', result: 'No Issues Found', confidence: 'High' },
                { type: 'Synthetic Identity', result: 'No Issues Found', confidence: 'High' },
                { type: 'Account Takeover', result: 'No Issues Found', confidence: 'High' }
              ]
            }
          },
          watchlist: {
            name: 'Watchlist Check',
            data: {
              status: 'Clear',
              timeline: 'From Jun, 2019 to now',
              lists: [
                { name: 'OFAC Sanctions List', result: 'Clear', date: 'Mar 15, 2025' },
                { name: 'PEP List', result: 'Clear', date: 'Mar 15, 2025' },
                { name: 'Adverse Media', result: 'Clear', date: 'Mar 15, 2025' }
              ]
            }
          },
          deviceFingerprint: {
            name: 'Device Fingerprint',
            data: {
              status: 'Verified',
              timeline: 'From Jun, 2019 to now',
              device: {
                type: 'Mobile',
                os: 'iOS 17.2',
                location: 'Lagos, Nigeria',
                riskScore: 'Low'
              }
            }
          }
        }
      },
      education: {
        name: 'Education Verification',
        status: 'inconsistent',
        subTabs: {
          degreeVerification: {
            name: 'Degree Verification',
            data: {
              status: 'Inconsistent',
              timeline: 'From Jun, 2019 to now',
              degrees: [
                { 
                  institution: 'University of Lagos', 
                  degree: 'Bachelor of Science in Computer Science', 
                  year: '2018',
                  status: 'Verified',
                  issue: null
                },
                { 
                  institution: 'Lagos Business School', 
                  degree: 'Master of Business Administration', 
                  year: '2020',
                  status: 'Inconsistent',
                  issue: 'Graduation date mismatch - records show 2021'
                }
              ]
            }
          },
          transcriptVerification: {
            name: 'Transcript Verification',
            data: {
              status: 'Partial',
              timeline: 'From Jun, 2019 to now',
              transcripts: [
                { institution: 'University of Lagos', status: 'Verified', gpa: '3.8/4.0' },
                { institution: 'Lagos Business School', status: 'Pending', gpa: null }
              ]
            }
          },
          certificationCheck: {
            name: 'Professional Certifications',
            data: {
              status: 'Inconsistent',
              timeline: 'From Jun, 2019 to now',
              certifications: [
                { name: 'AWS Certified Solutions Architect', status: 'Verified', expiry: '2025-12-15' },
                { name: 'PMP Certification', status: 'Expired', expiry: '2023-06-10' }
              ]
            }
          }
        }
      },
      employment: {
        name: 'Employment History Verification',
        status: 'flagged',
        subTabs: {
          employmentHistory: {
            name: 'Employment History',
            data: {
              status: 'Flagged',
              timeline: 'From Jun, 2019 to now',
              flagReason: 'Employment gap and salary discrepancy detected',
              employers: [
                { 
                  company: 'Tech Solutions Ltd', 
                  position: 'Senior Software Engineer',
                  duration: '2022-2024',
                  status: 'Verified',
                  salary: '₦450,000/month'
                },
                { 
                  company: 'Digital Innovations Inc', 
                  position: 'Software Developer',
                  duration: '2020-2022',
                  status: 'Flagged',
                  salary: '₦350,000/month',
                  issue: 'Salary claimed (₦500,000) differs from records (₦350,000)'
                },
                { 
                  company: 'StartupXYZ', 
                  position: 'Junior Developer',
                  duration: '2019-2020',
                  status: 'Unverifiable',
                  salary: '₦200,000/month',
                  issue: 'Company no longer exists, unable to verify'
                }
              ]
            }
          },
          referenceCheck: {
            name: 'Reference Check',
            data: {
              status: 'Flagged',
              timeline: 'From Jun, 2019 to now',
              references: [
                { 
                  name: 'John Adebayo', 
                  position: 'Team Lead', 
                  company: 'Tech Solutions Ltd',
                  status: 'Positive',
                  rating: '4.5/5'
                },
                { 
                  name: 'Sarah Johnson', 
                  position: 'HR Manager', 
                  company: 'Digital Innovations Inc',
                  status: 'Negative',
                  rating: '2.0/5',
                  issue: 'Reported attendance issues and missed deadlines'
                }
              ]
            }
          },
          backgroundGap: {
            name: 'Background Gap Analysis',
            data: {
              status: 'Flagged',
              timeline: 'From Jun, 2019 to now',
              gaps: [
                { period: 'Jan 2020 - Mar 2020', duration: '3 months', explanation: 'Career break for personal development' },
                { period: 'Jun 2019 - Dec 2019', duration: '6 months', explanation: 'Job search period after graduation' }
              ]
            }
          }
        }
      },
      medical: {
        name: 'Medical History',
        status: 'flagged',
        subTabs: {
          medicalRecords: {
            name: 'Medical Records',
            data: {
              status: 'Flagged',
              timeline: 'From Jun, 2019 to now',
              flagReason: 'Pre-existing medical condition disclosed',
              conditions: [
                { 
                  condition: 'Hypertension', 
                  status: 'Controlled',
                  medication: 'Amlodipine 5mg daily',
                  lastCheckup: '2024-12-15'
                },
                { 
                  condition: 'Diabetes Type 2', 
                  status: 'Well Managed',
                  medication: 'Metformin 500mg twice daily',
                  lastCheckup: '2024-12-15'
                }
              ]
            }
          },
          drugTest: {
            name: 'Drug Test',
            data: {
              status: 'Flagged',
              timeline: 'From Jun, 2019 to now',
              flagReason: 'Prescription medication detected',
              results: [
                { substance: 'Amphetamines', result: 'Positive', explanation: 'Prescribed ADHD medication' },
                { substance: 'Cannabis', result: 'Negative', explanation: null },
                { substance: 'Cocaine', result: 'Negative', explanation: null },
                { substance: 'Opiates', result: 'Negative', explanation: null }
              ]
            }
          },
          fitnessAssessment: {
            name: 'Fitness Assessment',
            data: {
              status: 'Clear',
              timeline: 'From Jun, 2019 to now',
              assessment: {
                overallFitness: 'Good',
                bmi: '24.5',
                bloodPressure: '130/85',
                heartRate: '72 bpm',
                restrictions: 'None'
              }
            }
          }
        }
      },
      socialMedia: {
        name: 'Social Media Verification',
        status: 'flagged',
        subTabs: {
          socialProfiles: {
            name: 'Social Media Profiles',
            data: {
              status: 'Flagged',
              timeline: 'From Jun, 2019 to now',
              flagReason: 'Inappropriate content and privacy concerns detected',
              platforms: [
                { 
                  platform: 'LinkedIn', 
                  status: 'Verified',
                  username: 'nene.afamefuna',
                  followers: '1,250',
                  issues: null
                },
                { 
                  platform: 'Twitter', 
                  status: 'Flagged',
                  username: '@nene_afam',
                  followers: '3,200',
                  issues: 'Inappropriate political comments and offensive language'
                },
                { 
                  platform: 'Facebook', 
                  status: 'Private',
                  username: 'Nene Afamefuna',
                  followers: 'Unknown',
                  issues: 'Profile set to private, unable to verify content'
                },
                { 
                  platform: 'Instagram', 
                  status: 'Flagged',
                  username: '@nene_afamefuna',
                  followers: '850',
                  issues: 'Inappropriate photos and questionable lifestyle content'
                }
              ]
            }
          },
          contentAnalysis: {
            name: 'Content Analysis',
            data: {
              status: 'Flagged',
              timeline: 'From Jun, 2019 to now',
              analysis: {
                riskLevel: 'Medium',
                inappropriateContent: 12,
                politicalContent: 8,
                professionalContent: 45,
                overallSentiment: 'Mixed'
              }
            }
          },
          reputationScore: {
            name: 'Reputation Score',
            data: {
              status: 'Below Average',
              timeline: 'From Jun, 2019 to now',
              score: 6.2,
              factors: [
                { factor: 'Professional Content', score: 8.5, weight: 'High' },
                { factor: 'Inappropriate Content', score: 3.2, weight: 'High' },
                { factor: 'Engagement Quality', score: 7.1, weight: 'Medium' },
                { factor: 'Privacy Settings', score: 4.0, weight: 'Medium' }
              ]
            }
          }
        }
      },
      association: {
        name: 'Association Verification',
        status: 'flagged',
        subTabs: {
          professionalAssociations: {
            name: 'Professional Associations',
            data: {
              status: 'Flagged',
              timeline: 'From Jun, 2019 to now',
              flagReason: 'Membership in controversial organization detected',
              associations: [
                { 
                  name: 'Nigerian Computer Society', 
                  status: 'Active',
                  membershipType: 'Professional',
                  since: '2019',
                  issues: null
                },
                { 
                  name: 'Lagos Tech Meetup', 
                  status: 'Active',
                  membershipType: 'Community',
                  since: '2020',
                  issues: null
                },
                { 
                  name: 'Controversial Political Group', 
                  status: 'Former Member',
                  membershipType: 'Political',
                  since: '2021',
                  issues: 'Former member of organization with questionable activities'
                }
              ]
            }
          },
          businessAssociations: {
            name: 'Business Associations',
            data: {
              status: 'Clear',
              timeline: 'From Jun, 2019 to now',
              associations: [
                { 
                  name: 'Lagos Chamber of Commerce', 
                  status: 'Active',
                  role: 'Member',
                  since: '2022'
                },
                { 
                  name: 'Nigerian Software Developers Association', 
                  status: 'Active',
                  role: 'Board Member',
                  since: '2023'
                }
              ]
            }
          },
          socialAssociations: {
            name: 'Social Associations',
            data: {
              status: 'Flagged',
              timeline: 'From Jun, 2019 to now',
              flagReason: 'Association with individuals of questionable character',
              associations: [
                { 
                  name: 'University Alumni Association', 
                  status: 'Active',
                  role: 'Member',
                  since: '2018'
                },
                { 
                  name: 'Local Sports Club', 
                  status: 'Active',
                  role: 'Member',
                  since: '2020'
                },
                { 
                  name: 'Questionable Social Circle', 
                  status: 'Associated',
                  role: 'Friend',
                  since: '2021',
                  issues: 'Known association with individuals involved in financial misconduct'
                }
              ]
            }
          }
        }
      }
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'inProgress':
        return <Clock className="h-4 w-4 text-blue-600" />
      case 'inconsistent':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      case 'flagged':
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      default:
        return <Info className="h-4 w-4 text-gray-600" />
    }
  }

  const getStatusBadge = (status: string) => {
    const baseClasses = "inline-flex items-center px-3 py-1.5 text-xs font-bold rounded-full uppercase tracking-wide"
    switch (status) {
      case 'completed':
        return `${baseClasses} bg-green-100 text-green-800 border border-green-200`
      case 'inProgress':
        return `${baseClasses} bg-blue-100 text-blue-800 border border-blue-200`
      case 'inconsistent':
        return `${baseClasses} bg-yellow-100 text-yellow-800 border border-yellow-200`
      case 'flagged':
        return `${baseClasses} bg-red-100 text-red-800 border border-red-200`
      default:
        return `${baseClasses} bg-gray-100 text-gray-800 border border-gray-200`
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completed'
      case 'inProgress':
        return 'In Progress'
      case 'inconsistent':
        return 'Inconsistent'
      case 'flagged':
        return 'Flagged'
      default:
        return 'Unknown'
    }
  }

  // Render functions for each category
  const renderPersonalIdentityContent = (subTab: any) => {
    if (selectedSubTab === 'address') {
      return (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-sm font-medium text-gray-600">ADDRESS:</span>
              <p className="text-sm text-gray-900">{subTab.data.address}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600">CITY:</span>
              <p className="text-sm text-gray-900">{subTab.data.city}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600">L.G.A:</span>
              <p className="text-sm text-gray-900">{subTab.data.lga}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600">STATE:</span>
              <p className="text-sm text-gray-900">{subTab.data.state}</p>
            </div>
          </div>
        </div>
      )
    }
    
    if (selectedSubTab === 'bvn') {
      return (
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <CheckCircle className="h-6 w-6 text-green-600" />
            <div>
              <span className="text-sm font-medium text-gray-600">BVN MATCHED:</span>
              <p className="text-sm text-gray-900">Yes</p>
            </div>
          </div>
        </div>
      )
    }
    
    if (selectedSubTab === 'nin') {
      return (
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <CheckCircle className="h-6 w-6 text-green-600" />
            <div>
              <span className="text-sm font-medium text-gray-600">NIN MATCHED:</span>
              <p className="text-sm text-gray-900">Yes</p>
            </div>
          </div>
        </div>
      )
    }
    
    if (selectedSubTab === 'frsc') {
      return (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-sm font-medium text-gray-600">LICENSE NUMBER:</span>
              <p className="text-sm text-gray-900">{subTab.data.licenseNumber}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600">STATE ISSUED:</span>
              <p className="text-sm text-gray-900">{subTab.data.stateIssued}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600">DATE ISSUE:</span>
              <p className="text-sm text-gray-900">{subTab.data.dateIssued}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600">EXPIRY DATE:</span>
              <p className="text-sm text-gray-900">{subTab.data.expiryDate}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600">STATUS:</span>
              <p className="text-sm text-gray-900">{subTab.data.status}</p>
            </div>
          </div>

          {subTab.data.violations && subTab.data.violations.length > 0 && (
            <div className="border-t border-gray-200 pt-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">
                Violation ({subTab.data.violations.length})
              </h4>
              <div className="space-y-4">
                {subTab.data.violations.map((violation: any, index: number) => (
                  <div key={index} className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <span className="text-sm font-medium text-gray-600">VIOLATION:</span>
                        <p className="text-sm text-gray-900">{violation.violation}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-600">VIOLATION DATE:</span>
                        <p className="text-sm text-gray-900">{violation.date}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-600">POINTS:</span>
                        <p className="text-sm text-gray-900">{violation.points}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )
    }
    
    if (selectedSubTab === 'stateResidency') {
      return (
        <div className="space-y-4">
          <div>
            <span className="text-sm font-medium text-gray-600">RESIDENCY:</span>
            <p className="text-sm text-gray-900">{subTab.data.residency}</p>
          </div>
        </div>
      )
    }
    
    if (selectedSubTab === 'nameChange') {
      return (
        <div className="space-y-4">
          <div>
            <span className="text-sm font-medium text-gray-600">NAME CHANGE:</span>
            <p className="text-sm text-gray-900">{subTab.data.nameChange}</p>
          </div>
        </div>
      )
    }
    
    if (selectedSubTab === 'email') {
      return (
        <div className="space-y-4">
          <div>
            <span className="text-sm font-medium text-gray-600">STATUS:</span>
            <p className="text-sm text-gray-900">{subTab.data.status}</p>
          </div>
          <div className="flex items-center space-x-3">
            <CheckCircle className="h-6 w-6 text-green-600" />
            <div>
              <span className="text-sm font-medium text-gray-600">PHONE MATCH:</span>
              <p className="text-sm text-gray-900">Yes</p>
            </div>
          </div>
        </div>
      )
    }
    
    return null
  }

  const renderCriminalRecordContent = (subTab: any) => {
    if (selectedSubTab === 'criminalHistory') {
      return (
        <div className="space-y-8">
          <div className="flex items-center justify-between p-6 bg-blue-50 rounded-xl border border-blue-200">
            <div className="flex items-center space-x-4">
              <Clock className="h-8 w-8 text-blue-600" />
              <div>
                <span className="text-sm font-bold text-gray-600 uppercase tracking-wide">STATUS</span>
                <p className="text-lg font-bold text-gray-900">{subTab.data.status}</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-sm font-bold text-gray-600 uppercase tracking-wide">PROGRESS</span>
              <p className="text-lg font-bold text-gray-900">{subTab.data.progress}</p>
            </div>
          </div>
          
          <div className="space-y-6">
            <h4 className="text-xl font-bold text-gray-900 tracking-tight">Criminal History Checks</h4>
            <div className="space-y-4">
              {subTab.data.checks.map((check: any, index: number) => (
                <div key={index} className="flex items-center justify-between p-6 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="flex items-center space-x-4">
                    {check.status === 'completed' ? (
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    ) : check.status === 'inProgress' ? (
                      <Clock className="h-6 w-6 text-blue-600" />
                    ) : (
                      <AlertTriangle className="h-6 w-6 text-gray-400" />
                    )}
                    <span className="font-semibold text-gray-900">{check.name}</span>
                  </div>
                  <span className={`text-sm font-bold px-3 py-1 rounded-full ${
                    check.status === 'completed' ? 'bg-green-100 text-green-800' : 
                    check.status === 'inProgress' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {check.result}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    }
    
    if (selectedSubTab === 'courtRecords') {
      return (
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <Clock className="h-6 w-6 text-blue-600" />
            <div>
              <span className="text-sm font-medium text-gray-600">STATUS:</span>
              <p className="text-sm text-gray-900">{subTab.data.status}</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900">Court Records Search</h4>
            {subTab.data.records.map((record: any, index: number) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm font-medium text-gray-600">COURT:</span>
                    <p className="text-sm text-gray-900">{record.court}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">CASE NUMBER:</span>
                    <p className="text-sm text-gray-900">{record.caseNumber}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">STATUS:</span>
                    <p className="text-sm text-gray-900">{record.status}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">DATE:</span>
                    <p className="text-sm text-gray-900">{record.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    }
    
    if (selectedSubTab === 'sexOffender') {
      return (
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <CheckCircle className="h-6 w-6 text-green-600" />
            <div>
              <span className="text-sm font-medium text-gray-600">STATUS:</span>
              <p className="text-sm text-gray-900">{subTab.data.status}</p>
            </div>
          </div>
          <div>
            <span className="text-sm font-medium text-gray-600">RESULT:</span>
            <p className="text-sm text-gray-900">{subTab.data.result}</p>
          </div>
          <div>
            <span className="text-sm font-medium text-gray-600">LAST CHECKED:</span>
            <p className="text-sm text-gray-900">{subTab.data.lastChecked}</p>
          </div>
        </div>
      )
    }
    
    return null
  }

  // Financial & Credit History Render Functions
  const renderFinancialCreditContent = (subTab: any, selectedSubTab: string) => {
    if (selectedSubTab === 'creditReport') {
      return (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-6 w-6 text-green-600" />
              <div>
                <span className="text-sm font-medium text-gray-600">STATUS:</span>
                <p className="text-sm text-gray-900">Completed</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-sm font-medium text-gray-600">CREDIT SCORE:</span>
              <p className="text-2xl font-bold text-green-600">{subTab.data.creditScore}</p>
              <p className="text-sm text-gray-600">{subTab.data.rating}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <span className="text-sm font-medium text-gray-600">TOTAL ACCOUNTS:</span>
              <p className="text-lg font-semibold text-gray-900">{subTab.data.summary.totalAccounts}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <span className="text-sm font-medium text-gray-600">ACTIVE ACCOUNTS:</span>
              <p className="text-lg font-semibold text-gray-900">{subTab.data.summary.activeAccounts}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <span className="text-sm font-medium text-gray-600">DELINQUENT:</span>
              <p className="text-lg font-semibold text-gray-900">{subTab.data.summary.delinquentAccounts}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <span className="text-sm font-medium text-gray-600">UTILIZATION:</span>
              <p className="text-lg font-semibold text-gray-900">{subTab.data.summary.creditUtilization}</p>
            </div>
          </div>
        </div>
      )
    }
    
    if (selectedSubTab === 'bankVerification') {
      return (
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <CheckCircle className="h-6 w-6 text-green-600" />
            <div>
              <span className="text-sm font-medium text-gray-600">STATUS:</span>
              <p className="text-sm text-gray-900">{subTab.data.status}</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900">Bank Accounts</h4>
            {subTab.data.banks.map((bank: any, index: number) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm font-medium text-gray-600">BANK:</span>
                    <p className="text-sm text-gray-900">{bank.name}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">ACCOUNT TYPE:</span>
                    <p className="text-sm text-gray-900">{bank.accountType}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">STATUS:</span>
                    <p className="text-sm text-gray-900">{bank.status}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">VERIFIED:</span>
                    <p className="text-sm text-gray-900">{bank.verified ? 'Yes' : 'No'}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    }
    
    if (selectedSubTab === 'loanHistory') {
      return (
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <CheckCircle className="h-6 w-6 text-green-600" />
            <div>
              <span className="text-sm font-medium text-gray-600">STATUS:</span>
              <p className="text-sm text-gray-900">{subTab.data.status}</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900">Loan History</h4>
            {subTab.data.loans.map((loan: any, index: number) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm font-medium text-gray-600">LOAN TYPE:</span>
                    <p className="text-sm text-gray-900">{loan.type}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">AMOUNT:</span>
                    <p className="text-sm text-gray-900">{loan.amount}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">STATUS:</span>
                    <p className="text-sm text-gray-900">{loan.status}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">DATE:</span>
                    <p className="text-sm text-gray-900">{loan.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    }
    
    return null
  }

  // Fraud & Anti-Fraud Detection Render Functions
  const renderFraudDetectionContent = (subTab: any, selectedSubTab: string) => {
    if (selectedSubTab === 'identityFraud') {
      return (
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <CheckCircle className="h-6 w-6 text-green-600" />
            <div>
              <span className="text-sm font-medium text-gray-600">STATUS:</span>
              <p className="text-sm text-gray-900">{subTab.data.status}</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900">Identity Fraud Checks</h4>
            {subTab.data.checks.map((check: any, index: number) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="font-medium">{check.type}</span>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-900">{check.result}</p>
                  <p className="text-xs text-gray-500">Confidence: {check.confidence}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    }
    
    if (selectedSubTab === 'watchlist') {
      return (
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <CheckCircle className="h-6 w-6 text-green-600" />
            <div>
              <span className="text-sm font-medium text-gray-600">STATUS:</span>
              <p className="text-sm text-gray-900">{subTab.data.status}</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900">Watchlist Checks</h4>
            {subTab.data.lists.map((list: any, index: number) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="font-medium">{list.name}</span>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-900">{list.result}</p>
                  <p className="text-xs text-gray-500">{list.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    }
    
    if (selectedSubTab === 'deviceFingerprint') {
      return (
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <CheckCircle className="h-6 w-6 text-green-600" />
            <div>
              <span className="text-sm font-medium text-gray-600">STATUS:</span>
              <p className="text-sm text-gray-900">{subTab.data.status}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-sm font-medium text-gray-600">DEVICE TYPE:</span>
              <p className="text-sm text-gray-900">{subTab.data.device.type}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600">OPERATING SYSTEM:</span>
              <p className="text-sm text-gray-900">{subTab.data.device.os}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600">LOCATION:</span>
              <p className="text-sm text-gray-900">{subTab.data.device.location}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600">RISK SCORE:</span>
              <p className="text-sm text-gray-900">{subTab.data.device.riskScore}</p>
            </div>
          </div>
        </div>
      )
    }
    
    return null
  }

  // Education Verification Render Functions
  const renderEducationContent = (subTab: any, selectedSubTab: string) => {
    if (selectedSubTab === 'degreeVerification') {
      return (
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="h-6 w-6 text-yellow-600" />
            <div>
              <span className="text-sm font-medium text-gray-600">STATUS:</span>
              <p className="text-sm text-gray-900">{subTab.data.status}</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900">Degree Verification</h4>
            {subTab.data.degrees.map((degree: any, index: number) => (
              <div key={index} className={`p-4 rounded-lg ${
                degree.status === 'Verified' ? 'bg-green-50 border border-green-200' : 
                degree.status === 'Inconsistent' ? 'bg-yellow-50 border border-yellow-200' : 
                'bg-gray-50 border border-gray-200'
              }`}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm font-medium text-gray-600">INSTITUTION:</span>
                    <p className="text-sm text-gray-900">{degree.institution}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">DEGREE:</span>
                    <p className="text-sm text-gray-900">{degree.degree}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">YEAR:</span>
                    <p className="text-sm text-gray-900">{degree.year}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">STATUS:</span>
                    <p className="text-sm text-gray-900">{degree.status}</p>
                  </div>
                </div>
                {degree.issue && (
                  <div className="mt-3 p-3 bg-yellow-100 rounded-lg">
                    <span className="text-sm font-medium text-yellow-800">ISSUE:</span>
                    <p className="text-sm text-yellow-700">{degree.issue}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )
    }
    
    if (selectedSubTab === 'transcriptVerification') {
      return (
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <Clock className="h-6 w-6 text-blue-600" />
            <div>
              <span className="text-sm font-medium text-gray-600">STATUS:</span>
              <p className="text-sm text-gray-900">{subTab.data.status}</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900">Transcript Verification</h4>
            {subTab.data.transcripts.map((transcript: any, index: number) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm font-medium text-gray-600">INSTITUTION:</span>
                    <p className="text-sm text-gray-900">{transcript.institution}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">STATUS:</span>
                    <p className="text-sm text-gray-900">{transcript.status}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">GPA:</span>
                    <p className="text-sm text-gray-900">{transcript.gpa || 'N/A'}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    }
    
    if (selectedSubTab === 'certificationCheck') {
      return (
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="h-6 w-6 text-yellow-600" />
            <div>
              <span className="text-sm font-medium text-gray-600">STATUS:</span>
              <p className="text-sm text-gray-900">{subTab.data.status}</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900">Professional Certifications</h4>
            {subTab.data.certifications.map((cert: any, index: number) => (
              <div key={index} className={`p-4 rounded-lg ${
                cert.status === 'Verified' ? 'bg-green-50 border border-green-200' : 
                cert.status === 'Expired' ? 'bg-red-50 border border-red-200' : 
                'bg-gray-50 border border-gray-200'
              }`}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm font-medium text-gray-600">CERTIFICATION:</span>
                    <p className="text-sm text-gray-900">{cert.name}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">STATUS:</span>
                    <p className="text-sm text-gray-900">{cert.status}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">EXPIRY:</span>
                    <p className="text-sm text-gray-900">{cert.expiry}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    }
    
    return null
  }

  // Employment History Verification Render Functions
  const renderEmploymentContent = (subTab: any, selectedSubTab: string) => {
    if (selectedSubTab === 'employmentHistory') {
      return (
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="h-6 w-6 text-red-600" />
            <div>
              <span className="text-sm font-medium text-gray-600">STATUS:</span>
              <p className="text-sm text-gray-900">{subTab.data.status}</p>
            </div>
          </div>
          
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <span className="text-sm font-medium text-red-800">FLAG REASON:</span>
            <p className="text-sm text-red-700">{subTab.data.flagReason}</p>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900">Employment History</h4>
            {subTab.data.employers.map((employer: any, index: number) => (
              <div key={index} className={`p-4 rounded-lg ${
                employer.status === 'Verified' ? 'bg-green-50 border border-green-200' : 
                employer.status === 'Flagged' ? 'bg-yellow-50 border border-yellow-200' : 
                'bg-red-50 border border-red-200'
              }`}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm font-medium text-gray-600">COMPANY:</span>
                    <p className="text-sm text-gray-900">{employer.company}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">POSITION:</span>
                    <p className="text-sm text-gray-900">{employer.position}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">DURATION:</span>
                    <p className="text-sm text-gray-900">{employer.duration}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">SALARY:</span>
                    <p className="text-sm text-gray-900">{employer.salary}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">STATUS:</span>
                    <p className="text-sm text-gray-900">{employer.status}</p>
                  </div>
                </div>
                {employer.issue && (
                  <div className="mt-3 p-3 bg-yellow-100 rounded-lg">
                    <span className="text-sm font-medium text-yellow-800">ISSUE:</span>
                    <p className="text-sm text-yellow-700">{employer.issue}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )
    }
    
    if (selectedSubTab === 'referenceCheck') {
      return (
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="h-6 w-6 text-red-600" />
            <div>
              <span className="text-sm font-medium text-gray-600">STATUS:</span>
              <p className="text-sm text-gray-900">{subTab.data.status}</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900">Reference Checks</h4>
            {subTab.data.references.map((ref: any, index: number) => (
              <div key={index} className={`p-4 rounded-lg ${
                ref.status === 'Positive' ? 'bg-green-50 border border-green-200' : 
                'bg-red-50 border border-red-200'
              }`}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm font-medium text-gray-600">NAME:</span>
                    <p className="text-sm text-gray-900">{ref.name}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">POSITION:</span>
                    <p className="text-sm text-gray-900">{ref.position}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">COMPANY:</span>
                    <p className="text-sm text-gray-900">{ref.company}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">RATING:</span>
                    <p className="text-sm text-gray-900">{ref.rating}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">STATUS:</span>
                    <p className="text-sm text-gray-900">{ref.status}</p>
                  </div>
                </div>
                {ref.issue && (
                  <div className="mt-3 p-3 bg-red-100 rounded-lg">
                    <span className="text-sm font-medium text-red-800">ISSUE:</span>
                    <p className="text-sm text-red-700">{ref.issue}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )
    }
    
    if (selectedSubTab === 'backgroundGap') {
      return (
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="h-6 w-6 text-red-600" />
            <div>
              <span className="text-sm font-medium text-gray-600">STATUS:</span>
              <p className="text-sm text-gray-900">{subTab.data.status}</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900">Background Gap Analysis</h4>
            {subTab.data.gaps.map((gap: any, index: number) => (
              <div key={index} className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm font-medium text-gray-600">PERIOD:</span>
                    <p className="text-sm text-gray-900">{gap.period}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">DURATION:</span>
                    <p className="text-sm text-gray-900">{gap.duration}</p>
                  </div>
                  <div className="col-span-2">
                    <span className="text-sm font-medium text-gray-600">EXPLANATION:</span>
                    <p className="text-sm text-gray-900">{gap.explanation}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    }
    
    return null
  }

  // Medical History Render Functions
  const renderMedicalContent = (subTab: any, selectedSubTab: string) => {
    if (selectedSubTab === 'medicalRecords') {
      return (
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="h-6 w-6 text-red-600" />
            <div>
              <span className="text-sm font-medium text-gray-600">STATUS:</span>
              <p className="text-sm text-gray-900">{subTab.data.status}</p>
            </div>
          </div>
          
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <span className="text-sm font-medium text-red-800">FLAG REASON:</span>
            <p className="text-sm text-red-700">{subTab.data.flagReason}</p>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900">Medical Conditions</h4>
            {subTab.data.conditions.map((condition: any, index: number) => (
              <div key={index} className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm font-medium text-gray-600">CONDITION:</span>
                    <p className="text-sm text-gray-900">{condition.condition}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">STATUS:</span>
                    <p className="text-sm text-gray-900">{condition.status}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">MEDICATION:</span>
                    <p className="text-sm text-gray-900">{condition.medication}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">LAST CHECKUP:</span>
                    <p className="text-sm text-gray-900">{condition.lastCheckup}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    }
    
    if (selectedSubTab === 'drugTest') {
      return (
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="h-6 w-6 text-red-600" />
            <div>
              <span className="text-sm font-medium text-gray-600">STATUS:</span>
              <p className="text-sm text-gray-900">{subTab.data.status}</p>
            </div>
          </div>
          
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <span className="text-sm font-medium text-red-800">FLAG REASON:</span>
            <p className="text-sm text-red-700">{subTab.data.flagReason}</p>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900">Drug Test Results</h4>
            {subTab.data.results.map((result: any, index: number) => (
              <div key={index} className={`p-4 rounded-lg ${
                result.result === 'Negative' ? 'bg-green-50 border border-green-200' : 
                'bg-yellow-50 border border-yellow-200'
              }`}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm font-medium text-gray-600">SUBSTANCE:</span>
                    <p className="text-sm text-gray-900">{result.substance}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">RESULT:</span>
                    <p className="text-sm text-gray-900">{result.result}</p>
                  </div>
                  {result.explanation && (
                    <div className="col-span-2">
                      <span className="text-sm font-medium text-gray-600">EXPLANATION:</span>
                      <p className="text-sm text-gray-900">{result.explanation}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    }
    
    if (selectedSubTab === 'fitnessAssessment') {
      return (
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <CheckCircle className="h-6 w-6 text-green-600" />
            <div>
              <span className="text-sm font-medium text-gray-600">STATUS:</span>
              <p className="text-sm text-gray-900">{subTab.data.status}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <span className="text-sm font-medium text-gray-600">OVERALL FITNESS:</span>
              <p className="text-lg font-semibold text-gray-900">{subTab.data.assessment.overallFitness}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <span className="text-sm font-medium text-gray-600">BMI:</span>
              <p className="text-lg font-semibold text-gray-900">{subTab.data.assessment.bmi}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <span className="text-sm font-medium text-gray-600">BLOOD PRESSURE:</span>
              <p className="text-lg font-semibold text-gray-900">{subTab.data.assessment.bloodPressure}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <span className="text-sm font-medium text-gray-600">HEART RATE:</span>
              <p className="text-lg font-semibold text-gray-900">{subTab.data.assessment.heartRate}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <span className="text-sm font-medium text-gray-600">RESTRICTIONS:</span>
              <p className="text-lg font-semibold text-gray-900">{subTab.data.assessment.restrictions}</p>
            </div>
          </div>
        </div>
      )
    }
    
    return null
  }

  // Social Media Verification Render Functions
  const renderSocialMediaContent = (subTab: any, selectedSubTab: string) => {
    if (selectedSubTab === 'socialProfiles') {
      return (
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="h-6 w-6 text-red-600" />
            <div>
              <span className="text-sm font-medium text-gray-600">STATUS:</span>
              <p className="text-sm text-gray-900">{subTab.data.status}</p>
            </div>
          </div>
          
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <span className="text-sm font-medium text-red-800">FLAG REASON:</span>
            <p className="text-sm text-red-700">{subTab.data.flagReason}</p>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900">Social Media Profiles</h4>
            {subTab.data.platforms.map((platform: any, index: number) => (
              <div key={index} className={`p-4 rounded-lg ${
                platform.status === 'Verified' ? 'bg-green-50 border border-green-200' : 
                platform.status === 'Flagged' ? 'bg-red-50 border border-red-200' : 
                'bg-yellow-50 border border-yellow-200'
              }`}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm font-medium text-gray-600">PLATFORM:</span>
                    <p className="text-sm text-gray-900">{platform.platform}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">USERNAME:</span>
                    <p className="text-sm text-gray-900">{platform.username}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">FOLLOWERS:</span>
                    <p className="text-sm text-gray-900">{platform.followers}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">STATUS:</span>
                    <p className="text-sm text-gray-900">{platform.status}</p>
                  </div>
                </div>
                {platform.issues && (
                  <div className="mt-3 p-3 bg-red-100 rounded-lg">
                    <span className="text-sm font-medium text-red-800">ISSUES:</span>
                    <p className="text-sm text-red-700">{platform.issues}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )
    }
    
    if (selectedSubTab === 'contentAnalysis') {
      return (
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="h-6 w-6 text-red-600" />
            <div>
              <span className="text-sm font-medium text-gray-600">STATUS:</span>
              <p className="text-sm text-gray-900">{subTab.data.status}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <span className="text-sm font-medium text-gray-600">RISK LEVEL:</span>
              <p className="text-lg font-semibold text-gray-900">{subTab.data.analysis.riskLevel}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <span className="text-sm font-medium text-gray-600">INAPPROPRIATE:</span>
              <p className="text-lg font-semibold text-gray-900">{subTab.data.analysis.inappropriateContent}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <span className="text-sm font-medium text-gray-600">POLITICAL:</span>
              <p className="text-lg font-semibold text-gray-900">{subTab.data.analysis.politicalContent}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <span className="text-sm font-medium text-gray-600">PROFESSIONAL:</span>
              <p className="text-lg font-semibold text-gray-900">{subTab.data.analysis.professionalContent}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <span className="text-sm font-medium text-gray-600">SENTIMENT:</span>
              <p className="text-lg font-semibold text-gray-900">{subTab.data.analysis.overallSentiment}</p>
            </div>
          </div>
        </div>
      )
    }
    
    if (selectedSubTab === 'reputationScore') {
      return (
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="h-6 w-6 text-red-600" />
            <div>
              <span className="text-sm font-medium text-gray-600">STATUS:</span>
              <p className="text-sm text-gray-900">{subTab.data.status}</p>
            </div>
          </div>
          
          <div className="text-center">
            <span className="text-sm font-medium text-gray-600">REPUTATION SCORE:</span>
            <p className="text-4xl font-bold text-red-600">{subTab.data.score}</p>
            <p className="text-sm text-gray-600">Below Average</p>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900">Score Factors</h4>
            {subTab.data.factors.map((factor: any, index: number) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-medium text-gray-600">{factor.factor}:</span>
                    <p className="text-sm text-gray-900">Weight: {factor.weight}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-gray-900">{factor.score}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    }
    
    return null
  }

  // Association Verification Render Functions
  const renderAssociationContent = (subTab: any, selectedSubTab: string) => {
    if (selectedSubTab === 'professionalAssociations') {
      return (
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="h-6 w-6 text-red-600" />
            <div>
              <span className="text-sm font-medium text-gray-600">STATUS:</span>
              <p className="text-sm text-gray-900">{subTab.data.status}</p>
            </div>
          </div>
          
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <span className="text-sm font-medium text-red-800">FLAG REASON:</span>
            <p className="text-sm text-red-700">{subTab.data.flagReason}</p>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900">Professional Associations</h4>
            {subTab.data.associations.map((association: any, index: number) => (
              <div key={index} className={`p-4 rounded-lg ${
                association.issues ? 'bg-red-50 border border-red-200' : 
                'bg-green-50 border border-green-200'
              }`}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm font-medium text-gray-600">ASSOCIATION:</span>
                    <p className="text-sm text-gray-900">{association.name}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">STATUS:</span>
                    <p className="text-sm text-gray-900">{association.status}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">TYPE:</span>
                    <p className="text-sm text-gray-900">{association.membershipType}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">SINCE:</span>
                    <p className="text-sm text-gray-900">{association.since}</p>
                  </div>
                </div>
                {association.issues && (
                  <div className="mt-3 p-3 bg-red-100 rounded-lg">
                    <span className="text-sm font-medium text-red-800">ISSUES:</span>
                    <p className="text-sm text-red-700">{association.issues}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )
    }
    
    if (selectedSubTab === 'businessAssociations') {
      return (
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <CheckCircle className="h-6 w-6 text-green-600" />
            <div>
              <span className="text-sm font-medium text-gray-600">STATUS:</span>
              <p className="text-sm text-gray-900">{subTab.data.status}</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900">Business Associations</h4>
            {subTab.data.associations.map((association: any, index: number) => (
              <div key={index} className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm font-medium text-gray-600">ASSOCIATION:</span>
                    <p className="text-sm text-gray-900">{association.name}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">STATUS:</span>
                    <p className="text-sm text-gray-900">{association.status}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">ROLE:</span>
                    <p className="text-sm text-gray-900">{association.role}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">SINCE:</span>
                    <p className="text-sm text-gray-900">{association.since}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    }
    
    if (selectedSubTab === 'socialAssociations') {
      return (
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="h-6 w-6 text-red-600" />
            <div>
              <span className="text-sm font-medium text-gray-600">STATUS:</span>
              <p className="text-sm text-gray-900">{subTab.data.status}</p>
            </div>
          </div>
          
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <span className="text-sm font-medium text-red-800">FLAG REASON:</span>
            <p className="text-sm text-red-700">{subTab.data.flagReason}</p>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900">Social Associations</h4>
            {subTab.data.associations.map((association: any, index: number) => (
              <div key={index} className={`p-4 rounded-lg ${
                association.issues ? 'bg-red-50 border border-red-200' : 
                'bg-green-50 border border-green-200'
              }`}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm font-medium text-gray-600">ASSOCIATION:</span>
                    <p className="text-sm text-gray-900">{association.name}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">STATUS:</span>
                    <p className="text-sm text-gray-900">{association.status}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">ROLE:</span>
                    <p className="text-sm text-gray-900">{association.role}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">SINCE:</span>
                    <p className="text-sm text-gray-900">{association.since}</p>
                  </div>
                </div>
                {association.issues && (
                  <div className="mt-3 p-3 bg-red-100 rounded-lg">
                    <span className="text-sm font-medium text-red-800">ISSUES:</span>
                    <p className="text-sm text-red-700">{association.issues}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )
    }
    
    return null
  }

  const renderDetailContent = () => {
    const category = backgroundCheckData.categories[selectedCategory as keyof typeof backgroundCheckData.categories]
    if (!category || !category.subTabs) {
      return (
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="text-gray-400 mb-2">
              {getStatusIcon(category?.status || 'unknown')}
            </div>
            <p className="text-gray-500">
              {getStatusText(category?.status || 'unknown')} - 
              Details coming soon
            </p>
          </div>
        </div>
      )
    }

    const subTab = category.subTabs[selectedSubTab as keyof typeof category.subTabs]
    if (!subTab) {
      return (
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="text-gray-400 mb-2">
              {getStatusIcon(category.status)}
            </div>
            <p className="text-gray-500">
              {getStatusText(category.status)} - 
              Details coming soon
            </p>
          </div>
        </div>
      )
    }

    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-900 tracking-tight">{subTab.name}</h3>
          <span className="text-sm text-gray-500 font-medium">{subTab.data.timeline}</span>
        </div>

        {/* Personal & Identity Information */}
        {selectedCategory === 'personalIdentity' && renderPersonalIdentityContent(subTab)}
        
        {/* Criminal Record Check */}
        {selectedCategory === 'criminalRecord' && renderCriminalRecordContent(subTab)}
        
        {/* Financial & Credit History */}
        {selectedCategory === 'financialCredit' && renderFinancialCreditContent(subTab, selectedSubTab)}
        
        {/* Fraud & Anti-Fraud Detection */}
        {selectedCategory === 'fraudDetection' && renderFraudDetectionContent(subTab, selectedSubTab)}
        
        {/* Education Verification */}
        {selectedCategory === 'education' && renderEducationContent(subTab, selectedSubTab)}
        
        {/* Employment History Verification */}
        {selectedCategory === 'employment' && renderEmploymentContent(subTab, selectedSubTab)}
        
        {/* Medical History */}
        {selectedCategory === 'medical' && renderMedicalContent(subTab, selectedSubTab)}
        
        {/* Social Media Verification */}
        {selectedCategory === 'socialMedia' && renderSocialMediaContent(subTab, selectedSubTab)}
        
        {/* Association Verification */}
        {selectedCategory === 'association' && renderAssociationContent(subTab, selectedSubTab)}
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-white z-[9999] overflow-y-auto">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="text-sm font-medium">Background Check Report</span>
            </button>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Report Header */}
      <div className="bg-red-600 text-white px-8 py-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Background Check Report</h1>
          </div>
          <div className="flex items-center space-x-6">
            <button className="bg-white text-red-600 px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 hover:bg-gray-50 transition-colors duration-200 shadow-sm">
              <Download className="h-4 w-4" />
              <span>Download Full Report</span>
            </button>
            <div className="text-right">
              <div className="text-sm opacity-90 font-medium">IDCERTIFY NO</div>
              <div className="text-xl font-bold">{backgroundCheckData.id}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Candidate Summary */}
      <div className="bg-white px-8 py-8 border-b border-gray-200">
        <div className="flex items-start space-x-8">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center border-2 border-gray-200">
            <User className="h-12 w-12 text-gray-500" />
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-4 mb-3">
              <h2 className="text-3xl font-bold text-gray-900 tracking-tight">{backgroundCheckData.candidate.name}</h2>
              <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold">
                {backgroundCheckData.candidate.score}
              </div>
            </div>
            <p className="text-gray-600 mb-6 text-lg">{backgroundCheckData.candidate.email}</p>
            <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold inline-flex items-center space-x-2">
              <CheckCircle className="h-4 w-4" />
              <span>Completed</span>
            </div>
          </div>
          <div className="text-right">
            <div className="grid grid-cols-2 gap-8 text-sm">
              <div className="space-y-1">
                <div className="text-gray-500 font-medium text-xs uppercase tracking-wide">COMPLETION DATE</div>
                <div className="font-semibold text-gray-900">{backgroundCheckData.completionDate}</div>
              </div>
              <div className="space-y-1">
                <div className="text-gray-500 font-medium text-xs uppercase tracking-wide">IDENTITY VERIFIED</div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="font-semibold text-gray-900">Yes</span>
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-gray-500 font-medium text-xs uppercase tracking-wide">CONSENT PROVIDED</div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="font-semibold text-gray-900">{backgroundCheckData.consentProvided}</span>
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-gray-500 font-medium text-xs uppercase tracking-wide">FLAGGED</div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="font-semibold text-gray-900">{backgroundCheckData.flaggedIssues} ISSUES</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex min-h-screen">
        {/* Left Panel - Categories */}
        <div className="w-1/3 bg-gray-50 border-r border-gray-200 p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Background Check Categories</h3>
          <div className="space-y-3">
            {Object.entries(backgroundCheckData.categories).map(([key, category]: [string, any]) => (
              <button
                key={key}
                onClick={() => {
                  setSelectedCategory(key)
                  // Set first sub-tab as default when switching categories
                  if (category.subTabs) {
                    setSelectedSubTab(Object.keys(category.subTabs)[0])
                  }
                }}
                className={`w-full flex items-center justify-between p-4 rounded-xl text-left transition-all duration-200 ${
                  selectedCategory === key 
                    ? 'bg-white border-2 border-gray-200 shadow-md' 
                    : 'hover:bg-white hover:shadow-sm border border-transparent'
                }`}
              >
                <div className="flex items-center space-x-4">
                  {getStatusIcon(category.status)}
                  <span className="text-sm font-semibold text-gray-900">{category.name}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={getStatusBadge(category.status)}>
                    {getStatusText(category.status)}
                  </span>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Panel - Details */}
        <div className="flex-1 bg-white p-8">
          {selectedCategory && backgroundCheckData.categories[selectedCategory as keyof typeof backgroundCheckData.categories]?.subTabs && (
            <>
              {/* Category Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-4">
                  <h3 className="text-2xl font-bold text-gray-900 tracking-tight">
                    {backgroundCheckData.categories[selectedCategory as keyof typeof backgroundCheckData.categories].name}
                  </h3>
                  <span className={getStatusBadge(backgroundCheckData.categories[selectedCategory as keyof typeof backgroundCheckData.categories].status)}>
                    {getStatusText(backgroundCheckData.categories[selectedCategory as keyof typeof backgroundCheckData.categories].status)}
                  </span>
                </div>
              </div>

              {/* Sub-tabs */}
              <div className="border-b border-gray-200 mb-8">
                <nav className="-mb-px flex space-x-8">
                  {Object.entries(backgroundCheckData.categories[selectedCategory as keyof typeof backgroundCheckData.categories].subTabs).map(([key, subTab]: [string, any]) => (
                    <button
                      key={key}
                      onClick={() => setSelectedSubTab(key)}
                      className={`py-3 px-1 border-b-2 font-semibold text-sm transition-colors duration-200 ${
                        selectedSubTab === key
                          ? 'border-red-500 text-red-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {subTab.name}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Detail Content */}
              <div className="min-h-96">
                {renderDetailContent()}
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  )
}

export default BackgroundCheckDetailsPage

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
import MobileTable from '../ui/MobileTable'
import MobileModal from '../ui/MobileModal'
import { generateCreditReportPDF } from '../../utils/pdfGenerator'

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
      profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&h=150&q=80',
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
        name: 'Credit Profile Report',
        status: 'completed',
        subTabs: {
          personalDetails: {
            name: 'Personal Details',
            data: {
              status: 'Verified',
              timeline: 'From Jun, 2019 to now',
              details: {
                firstCentralReferenceNumber: '1387342',
                surname: 'Afamefuna',
                firstName: 'Nene Oyinda',
                otherNames: '',
                uniqueTrackingNumber: '',
                dateOfBirth: '17/04/1990',
                gender: 'Female',
                maritalStatus: 'Single',
                nationality: 'Nigerian',
                noOfDependants: 0,
                nationalIdNumber: 'LO568819382',
                bankVerificationNumber: '22144154780',
                driversLicenseNumber: '',
                pencomId: '',
                passportNumber: 'A50237867',
                otherIdNumber: '',
                latestResidentialAddress: 'No 6 Ajanaku Street, Opebi, Ikeja, Lagos',
                latestPostalAddress: 'NA',
                homeTelephone: '08035351815',
                workTelephone: '08033205377',
                mobileNumber: '08098033211',
                emailAddress: 'NeneAfamefuna@gmail.com',
                currentEmployer: 'Tech Solutions Ltd',
                propertyOwnershipType: 'Rented'
              }
            }
          },
          delinquencyInformation: {
            name: 'Delinquency Information',
            data: {
              status: 'Clear',
              timeline: 'From Jun, 2019 to now',
              highestDelinquency: {
                subscriberName: 'First Bank Plc Lagos',
                accountNumber: '2011289357',
                yearMonth: '20250630',
                daysInArrears: '2125'
              },
              delinquencies: [
                { type: 'Payment Default', status: 'None', date: null },
                { type: 'Late Payment', status: 'None', date: null }
              ]
            }
          },
          creditAccountSummary: {
            name: 'Credit Account Summary',
            data: {
              status: 'Good',
              timeline: 'From Jun, 2019 to now',
              summary: {
                totalMonthlyInstallments: { naira: '640,289.00', usd: '0.00' },
                totalOutstandingDebt: { naira: '144,591.00', usd: '0.00' },
                totalAccountsInArrears: { count1: '3', count2: '0' },
                totalArrearAmount: { naira: '144,591.00', usd: '0.00' },
                totalAccountsInGoodStanding: { count1: '40', count2: '2' },
                totalAccountsTaken: { count1: '42', count2: '0' }
              },
              judgements: {
                totalNumberOfJudgements: { count1: '0', count2: '0' },
                totalJudgementAmount: { naira: '0', usd: '0' },
                dateOfLastJudgement: { count1: '-', count2: '-' }
              },
              dishonouredCheques: {
                totalNumberOfDishonouredCheques: { count1: '0', count2: '0' },
                totalAmountOfDishonouredCheques: { naira: '0.00', usd: '0.00' },
                dateOfLastBouncedCheque: { count1: '', count2: '' }
              },
              utilities: {
                totalNumberOfUtilities: { count1: '', count2: '' },
                totalAmountOfUtilities: { naira: '', usd: '' },
                dateOfLastUtility: { count1: '', count2: '' }
              }
            }
          },
          creditAccountRating: {
            name: 'Credit Account Rating',
            data: {
              status: 'Good',
              timeline: 'From Jun, 2019 to now',
              rating: {
                overallRating: 'A',
                creditScore: 720,
                riskLevel: 'Low',
                ratingDate: '2024-12-15',
                previousRating: 'B+',
                ratingHistory: [
                  { date: '2024-12-15', rating: 'A', score: 720 },
                  { date: '2024-09-15', rating: 'B+', score: 680 },
                  { date: '2024-06-15', rating: 'B', score: 650 },
                  { date: '2024-03-15', rating: 'B-', score: 620 }
                ],
                ratingFactors: {
                  paymentHistory: { score: 95, weight: 'High', impact: 'Positive' },
                  creditUtilization: { score: 85, weight: 'High', impact: 'Positive' },
                  creditHistory: { score: 80, weight: 'Medium', impact: 'Positive' },
                  newCredit: { score: 70, weight: 'Medium', impact: 'Neutral' },
                  creditMix: { score: 75, weight: 'Low', impact: 'Positive' }
                },
                riskAssessment: {
                  probabilityOfDefault: '2.5%',
                  expectedLoss: '₦15,000',
                  riskCategory: 'Low Risk',
                  recommendation: 'Approve'
                }
              }
            }
          },
          creditAgreementsSummary: {
            name: 'Credit Agreements Summary',
            data: {
              status: 'Active',
              timeline: 'From Jun, 2019 to now',
              agreements: [
                {
                  subscriberName: 'Guaranty Trust Bank Plc',
                  accountNumber: '023603530530010059000',
                  currency: 'NGN',
                  availedLimit: '0.00',
                  outstandingBalance: '0.00',
                  instalmentAmount: '14,500.00',
                  arrearAmount: '0.00',
                  facilityClassification: 'Performing',
                  accountStatus: 'Open'
                },
                {
                  subscriberName: 'Branch International Financial Services Limited',
                  accountNumber: '0449325435',
                  currency: 'NGN',
                  availedLimit: '25,000.00',
                  outstandingBalance: '0.00',
                  instalmentAmount: '0.00',
                  arrearAmount: '0.00',
                  facilityClassification: 'Performing',
                  accountStatus: 'Closed'
                },
                {
                  subscriberName: 'Access Bank Plc Lagos',
                  accountNumber: '0697011114',
                  currency: 'NGN',
                  availedLimit: '0.00',
                  outstandingBalance: '0.00',
                  instalmentAmount: '0.00',
                  arrearAmount: '0.00',
                  facilityClassification: 'Performing',
                  accountStatus: 'Closed'
                }
              ]
            }
          },
          creditAgreements: {
            name: 'Credit Agreements',
            data: {
              status: 'Active',
              timeline: 'From Jun, 2019 to now',
              agreements: [
                { type: 'Credit Card', amount: '₦500,000', status: 'Active', date: '2023' },
                { type: 'Personal Loan', amount: '₦1,000,000', status: 'Active', date: '2024' }
              ]
            }
          },
          guarantorDetails: {
            name: 'Guarantor Details',
            data: {
              status: 'Available',
              timeline: 'From Jun, 2019 to now',
              summary: {
                numberOfAccountsRequiringGuarantors: 0,
                numberOfGuarantorsSecured: 0
              },
              latestGuarantor: {
                surname: 'Adebayo',
                otherNames: 'Oluwaseun Michael',
                nationalIdNumber: 'NGN12345678901',
                pencomId: 'PEN123456789',
                driversLicenseNumber: 'DL123456789',
                passportNumber: 'A12345678',
                otherIdNumber: 'OTH123456789',
                dateOfBirth: '15/03/1985',
                homeTelephone: '08012345678',
                workTelephone: '08087654321',
                mobileNumber: '08098765432'
              }
            }
          },
          collateralInformation: {
            name: 'Collateral Information',
            data: {
              status: 'Available',
              timeline: 'From Jun, 2019 to now',
              collaterals: [
                {
                  supplierName: 'First Bank of Nigeria Plc',
                  loanSecurityStatus: 'Active',
                  collateralType: 'Real Estate Property',
                  collateralDetails: 'Residential property located at 15 Victoria Island, Lagos. Property value: ₦25,000,000. Title deed registered.'
                },
                {
                  supplierName: 'Guaranty Trust Bank Plc',
                  loanSecurityStatus: 'Active',
                  collateralType: 'Motor Vehicle',
                  collateralDetails: '2019 Toyota Camry with registration number ABC123XY. Vehicle value: ₦8,500,000. Insurance and registration current.'
                },
                {
                  supplierName: 'Access Bank Plc',
                  loanSecurityStatus: 'Released',
                  collateralType: 'Fixed Deposit',
                  collateralDetails: 'Fixed deposit account with Access Bank. Original amount: ₦3,000,000. Released on completion of loan repayment.'
                }
              ]
            }
          },
          dishonouredChequeInformation: {
            name: 'Dishonoured Cheque Information',
            data: {
              status: 'Clear',
              timeline: 'From Jun, 2019 to now',
              cheques: [
                {
                  dateChequeIssued: '2024-03-15',
                  dateChequeDishonoured: '2024-03-18',
                  issuingBank: 'First Bank of Nigeria Plc',
                  amount: '₦150,000.00'
                },
                {
                  dateChequeIssued: '2024-01-22',
                  dateChequeDishonoured: '2024-01-25',
                  issuingBank: 'Guaranty Trust Bank Plc',
                  amount: '₦75,000.00'
                }
              ]
            }
          },
          companyDirectorshipSummary: {
            name: 'Company Directorship Summary',
            data: {
              status: 'Active',
              timeline: 'From Jun, 2019 to now',
              summary: {
                totalNumberOfCompanyDirectorships: 3
              },
              directorships: [
                {
                  companyName: 'Tech Solutions Ltd',
                  position: 'Managing Director',
                  appointmentDate: '2020-03-15',
                  status: 'Active',
                  companyRegistrationNumber: 'RC1234567',
                  shareholding: '60%'
                },
                {
                  companyName: 'Innovation Hub Ltd',
                  position: 'Non-Executive Director',
                  appointmentDate: '2021-08-22',
                  status: 'Active',
                  companyRegistrationNumber: 'RC2345678',
                  shareholding: '25%'
                },
                {
                  companyName: 'Digital Ventures Ltd',
                  position: 'Executive Director',
                  appointmentDate: '2022-01-10',
                  status: 'Resigned',
                  companyRegistrationNumber: 'RC3456789',
                  shareholding: '0%'
                }
              ]
            }
          },
          enquiryHistory: {
            name: 'Enquiry History in Last 12 Months',
            data: {
              status: 'Normal',
              timeline: 'From Jun, 2019 to now',
              enquiries: [
                {
                  enquiryDate: '23/09/2025 12:15:27',
                  nameOfEnquirer: 'Hills Harvest Microfinance Bank - Oluwatosin Owolabi',
                  enquirerPhoneNumber: '',
                  reasonForEnquiry: 'Reviewing of existing credit facilities.'
                },
                {
                  enquiryDate: '15/08/2024 09:30:15',
                  nameOfEnquirer: 'First Bank of Nigeria Plc - Credit Department',
                  enquirerPhoneNumber: '08012345678',
                  reasonForEnquiry: 'Credit facility application review.'
                },
                {
                  enquiryDate: '02/07/2024 14:45:33',
                  nameOfEnquirer: 'Guaranty Trust Bank Plc - Risk Assessment',
                  enquirerPhoneNumber: '08087654321',
                  reasonForEnquiry: 'Loan application processing.'
                },
                {
                  enquiryDate: '18/06/2024 11:20:45',
                  nameOfEnquirer: 'Access Bank Plc - Credit Analysis',
                  enquirerPhoneNumber: '08098765432',
                  reasonForEnquiry: 'Credit limit increase request.'
                }
              ]
            }
          },
          identificationHistory: {
            name: 'Identification History',
            data: {
              status: 'Verified',
              timeline: 'From Jun, 2019 to now',
              identifications: [
                {
                  bureauUpdateDate: '2024-03-15',
                  identificationType: 'National ID Card',
                  identificationDetails: 'NGN12345678901 - Issued by NIMC, Lagos State. Status: Active and Verified.'
                },
                {
                  bureauUpdateDate: '2024-02-28',
                  identificationType: 'Driver\'s License',
                  identificationDetails: 'DL123456789 - Issued by FRSC, Lagos State. Valid until 2029-02-28.'
                },
                {
                  bureauUpdateDate: '2024-01-20',
                  identificationType: 'International Passport',
                  identificationDetails: 'A12345678 - Issued by NIS, Lagos State. Valid until 2034-01-20.'
                },
                {
                  bureauUpdateDate: '2023-12-10',
                  identificationType: 'Bank Verification Number (BVN)',
                  identificationDetails: '22144154780 - Registered with CBN. Status: Active and Verified.'
                },
                {
                  bureauUpdateDate: '2023-11-05',
                  identificationType: 'PENCOM ID',
                  identificationDetails: 'PEN123456789 - Registered with PENCOM. Status: Active.'
                }
              ]
            }
          },
          addressHistory: {
            name: 'Address History',
            data: {
              status: 'Verified',
              timeline: 'From Jun, 2019 to now',
              addresses: [
                {
                  bureauUpdate: '30/05/2019',
                  address: 'Residential',
                  addressLine1: '1 SOLA OLAMIDE STREET AHYMADIYAH BUS STOP OJOKORO',
                  addressLine2: '',
                  addressLine3: '',
                  addressLine4: ''
                },
                {
                  bureauUpdate: '29/12/2022',
                  address: 'Residential',
                  addressLine1: '1 sola olamide close otunba runsewe estate Ifakoljaiye',
                  addressLine2: '',
                  addressLine3: '',
                  addressLine4: 'Lagos'
                },
                {
                  bureauUpdate: '29/07/2024',
                  address: 'Residential',
                  addressLine1: '1sola olamide close runsewe estate ahmadiyaijaiye ojokorol',
                  addressLine2: '',
                  addressLine3: '',
                  addressLine4: ''
                },
                {
                  bureauUpdate: '29/07/2014',
                  address: 'Residential',
                  addressLine1: '1 SOLA OLAMIDE CLOSE OFF OTUNBA RUNSEWE EST',
                  addressLine2: 'AHMADIYA BUSTOP IJAIYE IJOKORO',
                  addressLine3: '99',
                  addressLine4: '15'
                },
                {
                  bureauUpdate: '28/01/2022',
                  address: 'Residential',
                  addressLine1: 'Ifako Ijaiye Ojokoro Nigeria',
                  addressLine2: '8 Shola Olamide Close',
                  addressLine3: 'Ojokoro',
                  addressLine4: 'Lagos'
                },
                {
                  bureauUpdate: '29/07/2014',
                  address: 'Postal',
                  addressLine1: 'NA',
                  addressLine2: '',
                  addressLine3: '',
                  addressLine4: ''
                }
              ]
            }
          },
          employmentHistory: {
            name: 'Employment History',
            data: {
              status: 'Verified',
              timeline: 'From Jun, 2019 to now',
              employments: [
                {
                  bureauUpdateDate: '2024-03-15',
                  company: 'Tech Solutions Ltd',
                  occupation: 'Software Engineer'
                },
                {
                  bureauUpdateDate: '2023-08-22',
                  company: 'Digital Innovations Inc',
                  occupation: 'Senior Developer'
                },
                {
                  bureauUpdateDate: '2022-12-10',
                  company: 'First Bank of Nigeria Plc',
                  occupation: 'IT Specialist'
                },
                {
                  bureauUpdateDate: '2021-06-15',
                  company: 'Guaranty Trust Bank Plc',
                  occupation: 'Systems Analyst'
                },
                {
                  bureauUpdateDate: '2020-01-20',
                  company: 'Access Bank Plc',
                  occupation: 'Junior Developer'
                }
              ]
            }
          },
          telephoneHistory: {
            name: 'Telephone History',
            data: {
              status: 'Verified',
              timeline: 'From Jun, 2019 to now',
              telephones: [
                {
                  homeTelephone: {
                    bureauUpdateDate: '15/05/2025',
                    telephoneNumber: '08035351815'
                  },
                  workTelephone: {
                    bureauUpdateDate: '19/07/2025',
                    telephoneNumber: '08033205377'
                  },
                  mobileNumber: {
                    bureauUpdateDate: '01/09/2025',
                    telephoneNumber: '08098033211'
                  }
                },
                {
                  homeTelephone: {
                    bureauUpdateDate: '21/02/2025',
                    telephoneNumber: '08098033211'
                  },
                  workTelephone: {
                    bureauUpdateDate: '15/05/2025',
                    telephoneNumber: '08035351815'
                  },
                  mobileNumber: {
                    bureauUpdateDate: '19/07/2025',
                    telephoneNumber: '08033205377'
                  }
                },
                {
                  homeTelephone: {
                    bureauUpdateDate: '17/02/2021',
                    telephoneNumber: '2348098033211'
                  },
                  workTelephone: {
                    bureauUpdateDate: '21/02/2025',
                    telephoneNumber: '08098033211'
                  },
                  mobileNumber: {
                    bureauUpdateDate: '15/05/2025',
                    telephoneNumber: '08035351815'
                  }
                }
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

  // Credit Profile Report Render Functions
  const renderFinancialCreditContent = (subTab: any, selectedSubTab: string) => {
    if (selectedSubTab === 'personalDetails') {
      return (
        <div className="space-y-6">
          {/* Header Section */}
          <div className="bg-orange-50 border-l-4 border-orange-500 p-4">
            <h3 className="text-lg font-bold text-orange-800">Personal Details</h3>
            <p className="text-sm italic text-orange-700 mt-1">This section includes the consumer's demographic informations.</p>
            <div className="mt-2">
              <span className="text-sm font-bold text-gray-900">PERSONAL DETAILS SUMMARY: {subTab.data.details.firstName} {subTab.data.details.surname}</span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <CheckCircle className="h-6 w-6 text-green-600" />
            <div>
              <span className="text-sm font-medium text-gray-600">STATUS:</span>
              <p className="text-sm text-gray-900">{subTab.data.status}</p>
            </div>
          </div>
          
          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-4">
              <div className="bg-gray-50 p-3 rounded">
                <span className="text-sm font-medium text-gray-600">FirstCentral Reference Number:</span>
                <p className="text-sm text-gray-900 font-medium">{subTab.data.details.firstCentralReferenceNumber}</p>
              </div>
              <div className="bg-white p-3 rounded">
                <span className="text-sm font-medium text-gray-600">Surname:</span>
                <p className="text-sm text-gray-900 font-medium">{subTab.data.details.surname}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <span className="text-sm font-medium text-gray-600">First Name:</span>
                <p className="text-sm text-gray-900 font-medium">{subTab.data.details.firstName}</p>
              </div>
              <div className="bg-white p-3 rounded">
                <span className="text-sm font-medium text-gray-600">Date of Birth:</span>
                <p className="text-sm text-gray-900 font-medium">{subTab.data.details.dateOfBirth}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <span className="text-sm font-medium text-gray-600">Marital Status:</span>
                <p className="text-sm text-gray-900 font-medium">{subTab.data.details.maritalStatus || 'Not specified'}</p>
              </div>
              <div className="bg-white p-3 rounded">
                <span className="text-sm font-medium text-gray-600">National ID Number:</span>
                <p className="text-sm text-gray-900 font-medium">{subTab.data.details.nationalIdNumber}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <span className="text-sm font-medium text-gray-600">Driver's License Number:</span>
                <p className="text-sm text-gray-900 font-medium">{subTab.data.details.driversLicenseNumber || 'Not specified'}</p>
              </div>
              <div className="bg-white p-3 rounded">
                <span className="text-sm font-medium text-gray-600">Other ID Number:</span>
                <p className="text-sm text-gray-900 font-medium">{subTab.data.details.otherIdNumber || 'Not specified'}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <span className="text-sm font-medium text-gray-600">Latest Residential Address:</span>
                <p className="text-sm text-gray-900 font-medium">{subTab.data.details.latestResidentialAddress}</p>
              </div>
              <div className="bg-white p-3 rounded">
                <span className="text-sm font-medium text-gray-600">Home Telephone:</span>
                <p className="text-sm text-gray-900 font-medium">{subTab.data.details.homeTelephone}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <span className="text-sm font-medium text-gray-600">Current Employer:</span>
                <p className="text-sm text-gray-900 font-medium">{subTab.data.details.currentEmployer || 'Not specified'}</p>
              </div>
              <div className="bg-white p-3 rounded">
                <span className="text-sm font-medium text-gray-600">Email Address:</span>
                <p className="text-sm text-gray-900 font-medium">{subTab.data.details.emailAddress || 'Not specified'}</p>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div className="bg-gray-50 p-3 rounded">
                <span className="text-sm font-medium text-gray-600">Unique Tracking Number:</span>
                <p className="text-sm text-gray-900 font-medium">{subTab.data.details.uniqueTrackingNumber || 'Not specified'}</p>
              </div>
              <div className="bg-white p-3 rounded">
                <span className="text-sm font-medium text-gray-600">Other Names:</span>
                <p className="text-sm text-gray-900 font-medium">{subTab.data.details.otherNames || 'Not specified'}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <span className="text-sm font-medium text-gray-600">Bank Verification Number (BVN):</span>
                <p className="text-sm text-gray-900 font-medium">{subTab.data.details.bankVerificationNumber}</p>
              </div>
              <div className="bg-white p-3 rounded">
                <span className="text-sm font-medium text-gray-600">Gender:</span>
                <p className="text-sm text-gray-900 font-medium">{subTab.data.details.gender}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <span className="text-sm font-medium text-gray-600">No. of Dependants:</span>
                <p className="text-sm text-gray-900 font-medium">{subTab.data.details.noOfDependants}</p>
              </div>
              <div className="bg-white p-3 rounded">
                <span className="text-sm font-medium text-gray-600">PENCOM ID:</span>
                <p className="text-sm text-gray-900 font-medium">{subTab.data.details.pencomId || 'Not specified'}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <span className="text-sm font-medium text-gray-600">Passport Number:</span>
                <p className="text-sm text-gray-900 font-medium">{subTab.data.details.passportNumber}</p>
              </div>
              <div className="bg-white p-3 rounded">
                <span className="text-sm font-medium text-gray-600">Nationality:</span>
                <p className="text-sm text-gray-900 font-medium">{subTab.data.details.nationality}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <span className="text-sm font-medium text-gray-600">Latest Postal Address:</span>
                <p className="text-sm text-gray-900 font-medium">{subTab.data.details.latestPostalAddress}</p>
              </div>
              <div className="bg-white p-3 rounded">
                <span className="text-sm font-medium text-gray-600">Work Telephone:</span>
                <p className="text-sm text-gray-900 font-medium">{subTab.data.details.workTelephone}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <span className="text-sm font-medium text-gray-600">Property Ownership Type:</span>
                <p className="text-sm text-gray-900 font-medium">{subTab.data.details.propertyOwnershipType || 'Not specified'}</p>
              </div>
              <div className="bg-white p-3 rounded">
                <span className="text-sm font-medium text-gray-600">Mobile Number:</span>
                <p className="text-sm text-gray-900 font-medium">{subTab.data.details.mobileNumber}</p>
              </div>
            </div>
          </div>
        </div>
      )
    }
    
    if (selectedSubTab === 'delinquencyInformation') {
      return (
        <div className="space-y-6">
          {/* Header Section */}
          <div className="bg-orange-50 border-l-4 border-orange-500 p-4">
            <h3 className="text-lg font-bold text-orange-800">Delinquency Information</h3>
            <p className="text-sm italic text-orange-700 mt-1">This section includes the Customer's Highest Delinquency information.</p>
          </div>

          <div className="flex items-center space-x-3">
            <CheckCircle className="h-6 w-6 text-green-600" />
            <div>
              <span className="text-sm font-medium text-gray-600">STATUS:</span>
              <p className="text-sm text-gray-900">{subTab.data.status}</p>
            </div>
          </div>
          
          {/* Highest Delinquency Information */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="border-b border-gray-200 p-4">
              <h4 className="text-lg font-semibold text-gray-900">Highest Delinquency Details</h4>
            </div>
            <div className="p-4 space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-sm font-bold text-gray-700">Subscriber Name:</span>
                <span className="text-sm text-gray-900">{subTab.data.highestDelinquency.subscriberName}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-sm font-bold text-gray-700">Account Number:</span>
                <span className="text-sm text-gray-900">{subTab.data.highestDelinquency.accountNumber}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-sm font-bold text-gray-700">Year/Month:</span>
                <span className="text-sm text-gray-900">{subTab.data.highestDelinquency.yearMonth}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm font-bold text-gray-700">Days in Arrears:</span>
                <span className="text-sm text-gray-900">{subTab.data.highestDelinquency.daysInArrears}</span>
              </div>
            </div>
          </div>

          {/* Additional Delinquency Records */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900">Other Delinquency Records</h4>
            {subTab.data.delinquencies.map((delinquency: any, index: number) => (
              <div key={index} className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm font-medium text-gray-600">TYPE:</span>
                    <p className="text-sm text-gray-900">{delinquency.type}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">STATUS:</span>
                    <p className="text-sm text-gray-900">{delinquency.status}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    }
    
    if (selectedSubTab === 'creditAccountSummary') {
      return (
        <div className="space-y-6">
          {/* Header Section */}
          <div className="bg-orange-50 border-l-4 border-orange-500 p-4">
            <h3 className="text-lg font-bold text-orange-800">Credit Account Summary</h3>
            <p className="text-sm italic text-orange-700 mt-1">This section includes a summary of all aggregated credit and loan informations.</p>
          </div>

          <div className="flex items-center space-x-3">
            <CheckCircle className="h-6 w-6 text-green-600" />
            <div>
              <span className="text-sm font-medium text-gray-600">STATUS:</span>
              <p className="text-sm text-gray-900">{subTab.data.status}</p>
            </div>
          </div>
          
          {/* Credit Account Summary Table */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-200">Category/Description</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700 border-r border-gray-200">Dates/Counts</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700 border-r border-gray-200">(=N=)</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">(US$)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {/* General Credit Summary */}
                  <tr className="bg-white">
                    <td className="px-4 py-3 text-sm text-gray-900 border-r border-gray-200">Total Monthly Installments</td>
                    <td className="px-4 py-3 text-sm text-gray-900 text-center border-r border-gray-200">-</td>
                    <td className="px-4 py-3 text-sm text-gray-900 text-right border-r border-gray-200">{subTab.data.summary.totalMonthlyInstallments.naira}</td>
                    <td className="px-4 py-3 text-sm text-gray-900 text-right">{subTab.data.summary.totalMonthlyInstallments.usd}</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900 border-r border-gray-200">Total Outstanding Debt</td>
                    <td className="px-4 py-3 text-sm text-gray-900 text-center border-r border-gray-200">-</td>
                    <td className="px-4 py-3 text-sm text-gray-900 text-right border-r border-gray-200">{subTab.data.summary.totalOutstandingDebt.naira}</td>
                    <td className="px-4 py-3 text-sm text-gray-900 text-right">{subTab.data.summary.totalOutstandingDebt.usd}</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="px-4 py-3 text-sm text-gray-900 border-r border-gray-200">Total Number of Accounts in Arrears</td>
                    <td className="px-4 py-3 text-sm text-gray-900 text-center border-r border-gray-200">{subTab.data.summary.totalAccountsInArrears.count1} / {subTab.data.summary.totalAccountsInArrears.count2}</td>
                    <td className="px-4 py-3 text-sm text-gray-900 text-right border-r border-gray-200">-</td>
                    <td className="px-4 py-3 text-sm text-gray-900 text-right">-</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900 border-r border-gray-200">Total Arrear Amount</td>
                    <td className="px-4 py-3 text-sm text-gray-900 text-center border-r border-gray-200">-</td>
                    <td className="px-4 py-3 text-sm text-gray-900 text-right border-r border-gray-200">{subTab.data.summary.totalArrearAmount.naira}</td>
                    <td className="px-4 py-3 text-sm text-gray-900 text-right">{subTab.data.summary.totalArrearAmount.usd}</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="px-4 py-3 text-sm text-gray-900 border-r border-gray-200">Total Number of Accounts in Good Standing</td>
                    <td className="px-4 py-3 text-sm text-gray-900 text-center border-r border-gray-200">{subTab.data.summary.totalAccountsInGoodStanding.count1} / {subTab.data.summary.totalAccountsInGoodStanding.count2}</td>
                    <td className="px-4 py-3 text-sm text-gray-900 text-right border-r border-gray-200">-</td>
                    <td className="px-4 py-3 text-sm text-gray-900 text-right">-</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900 border-r border-gray-200">Total Number of Accounts Taken</td>
                    <td className="px-4 py-3 text-sm text-gray-900 text-center border-r border-gray-200">{subTab.data.summary.totalAccountsTaken.count1} / {subTab.data.summary.totalAccountsTaken.count2}</td>
                    <td className="px-4 py-3 text-sm text-gray-900 text-right border-r border-gray-200">-</td>
                    <td className="px-4 py-3 text-sm text-gray-900 text-right">-</td>
                  </tr>

                  {/* Judgements Section */}
                  <tr className="bg-white">
                    <td className="px-4 py-3 text-sm font-semibold text-gray-900 border-r border-gray-200">Judgements</td>
                    <td className="px-4 py-3 text-sm text-gray-900 text-center border-r border-gray-200">-</td>
                    <td className="px-4 py-3 text-sm text-gray-900 text-right border-r border-gray-200">-</td>
                    <td className="px-4 py-3 text-sm text-gray-900 text-right">-</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900 border-r border-gray-200">Total Number of Judgements</td>
                    <td className="px-4 py-3 text-sm text-gray-900 text-center border-r border-gray-200">{subTab.data.judgements.totalNumberOfJudgements.count1} / {subTab.data.judgements.totalNumberOfJudgements.count2}</td>
                    <td className="px-4 py-3 text-sm text-gray-900 text-right border-r border-gray-200">-</td>
                    <td className="px-4 py-3 text-sm text-gray-900 text-right">-</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="px-4 py-3 text-sm text-gray-900 border-r border-gray-200">Total Judgement Amount</td>
                    <td className="px-4 py-3 text-sm text-gray-900 text-center border-r border-gray-200">-</td>
                    <td className="px-4 py-3 text-sm text-gray-900 text-right border-r border-gray-200">{subTab.data.judgements.totalJudgementAmount.naira}</td>
                    <td className="px-4 py-3 text-sm text-gray-900 text-right">{subTab.data.judgements.totalJudgementAmount.usd}</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900 border-r border-gray-200">Date of Last Judgement</td>
                    <td className="px-4 py-3 text-sm text-gray-900 text-center border-r border-gray-200">{subTab.data.judgements.dateOfLastJudgement.count1} / {subTab.data.judgements.dateOfLastJudgement.count2}</td>
                    <td className="px-4 py-3 text-sm text-gray-900 text-right border-r border-gray-200">-</td>
                    <td className="px-4 py-3 text-sm text-gray-900 text-right">-</td>
                  </tr>

                  {/* Dishonoured Cheques Section */}
                  <tr className="bg-white">
                    <td className="px-4 py-3 text-sm font-semibold text-gray-900 border-r border-gray-200">Dishonoured Cheques</td>
                    <td className="px-4 py-3 text-sm text-gray-900 text-center border-r border-gray-200">-</td>
                    <td className="px-4 py-3 text-sm text-gray-900 text-right border-r border-gray-200">-</td>
                    <td className="px-4 py-3 text-sm text-gray-900 text-right">-</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900 border-r border-gray-200">Total Number of Dishonoured Cheques</td>
                    <td className="px-4 py-3 text-sm text-gray-900 text-center border-r border-gray-200">{subTab.data.dishonouredCheques.totalNumberOfDishonouredCheques.count1} / {subTab.data.dishonouredCheques.totalNumberOfDishonouredCheques.count2}</td>
                    <td className="px-4 py-3 text-sm text-gray-900 text-right border-r border-gray-200">-</td>
                    <td className="px-4 py-3 text-sm text-gray-900 text-right">-</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="px-4 py-3 text-sm text-gray-900 border-r border-gray-200">Total Amount of Dishonoured Cheques</td>
                    <td className="px-4 py-3 text-sm text-gray-900 text-center border-r border-gray-200">-</td>
                    <td className="px-4 py-3 text-sm text-gray-900 text-right border-r border-gray-200">{subTab.data.dishonouredCheques.totalAmountOfDishonouredCheques.naira}</td>
                    <td className="px-4 py-3 text-sm text-gray-900 text-right">{subTab.data.dishonouredCheques.totalAmountOfDishonouredCheques.usd}</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900 border-r border-gray-200">Date of Last Bounced Cheque</td>
                    <td className="px-4 py-3 text-sm text-gray-900 text-center border-r border-gray-200">{subTab.data.dishonouredCheques.dateOfLastBouncedCheque.count1} {subTab.data.dishonouredCheques.dateOfLastBouncedCheque.count2}</td>
                    <td className="px-4 py-3 text-sm text-gray-900 text-right border-r border-gray-200">-</td>
                    <td className="px-4 py-3 text-sm text-gray-900 text-right">-</td>
                  </tr>

                  {/* Utilities Section */}
                  <tr className="bg-white">
                    <td className="px-4 py-3 text-sm font-semibold text-gray-900 border-r border-gray-200">Utilities</td>
                    <td className="px-4 py-3 text-sm text-gray-900 text-center border-r border-gray-200">-</td>
                    <td className="px-4 py-3 text-sm text-gray-900 text-right border-r border-gray-200">-</td>
                    <td className="px-4 py-3 text-sm text-gray-900 text-right">-</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900 border-r border-gray-200">Total Number of Utilities</td>
                    <td className="px-4 py-3 text-sm text-gray-900 text-center border-r border-gray-200">{subTab.data.utilities.totalNumberOfUtilities.count1} {subTab.data.utilities.totalNumberOfUtilities.count2}</td>
                    <td className="px-4 py-3 text-sm text-gray-900 text-right border-r border-gray-200">-</td>
                    <td className="px-4 py-3 text-sm text-gray-900 text-right">-</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="px-4 py-3 text-sm text-gray-900 border-r border-gray-200">Total Amount of Utilities</td>
                    <td className="px-4 py-3 text-sm text-gray-900 text-center border-r border-gray-200">-</td>
                    <td className="px-4 py-3 text-sm text-gray-900 text-right border-r border-gray-200">{subTab.data.utilities.totalAmountOfUtilities.naira}</td>
                    <td className="px-4 py-3 text-sm text-gray-900 text-right">{subTab.data.utilities.totalAmountOfUtilities.usd}</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900 border-r border-gray-200">Date of Last Utility</td>
                    <td className="px-4 py-3 text-sm text-gray-900 text-center border-r border-gray-200">{subTab.data.utilities.dateOfLastUtility.count1} {subTab.data.utilities.dateOfLastUtility.count2}</td>
                    <td className="px-4 py-3 text-sm text-gray-900 text-right border-r border-gray-200">-</td>
                    <td className="px-4 py-3 text-sm text-gray-900 text-right">-</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )
    }
    
    if (selectedSubTab === 'creditAccountRating') {
      return (
        <div className="space-y-6">
          {/* Header Section */}
          <div className="bg-orange-50 border-l-4 border-orange-500 p-4">
            <h3 className="text-lg font-bold text-orange-800">Credit Account Rating</h3>
            <p className="text-sm italic text-orange-700 mt-1">This section includes comprehensive credit rating and risk assessment information.</p>
          </div>

          <div className="flex items-center space-x-3">
            <CheckCircle className="h-6 w-6 text-green-600" />
            <div>
              <span className="text-sm font-medium text-gray-600">STATUS:</span>
              <p className="text-sm text-gray-900">{subTab.data.status}</p>
            </div>
          </div>
          
          {/* Overall Rating Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border border-green-200">
              <span className="text-sm font-medium text-gray-600">OVERALL RATING</span>
              <p className="text-3xl font-bold text-green-600 mt-2">{subTab.data.rating.overallRating}</p>
              <p className="text-xs text-gray-500 mt-1">Current Rating</p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
              <span className="text-sm font-medium text-gray-600">CREDIT SCORE</span>
              <p className="text-3xl font-bold text-blue-600 mt-2">{subTab.data.rating.creditScore}</p>
              <p className="text-xs text-gray-500 mt-1">Out of 850</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg border border-purple-200">
              <span className="text-sm font-medium text-gray-600">RISK LEVEL</span>
              <p className="text-lg font-semibold text-purple-600 mt-2">{subTab.data.rating.riskLevel}</p>
              <p className="text-xs text-gray-500 mt-1">Risk Category</p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg border border-orange-200">
              <span className="text-sm font-medium text-gray-600">RATING DATE</span>
              <p className="text-lg font-semibold text-orange-600 mt-2">{subTab.data.rating.ratingDate}</p>
              <p className="text-xs text-gray-500 mt-1">Last Updated</p>
            </div>
          </div>

          {/* Rating History */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <h4 className="text-lg font-semibold text-gray-900">Rating History</h4>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
                    <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Rating</th>
                    <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Score</th>
                    <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Change</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {subTab.data.rating.ratingHistory.map((history: any, index: number) => {
                    const isCurrent = index === 0;
                    const previousScore = index < subTab.data.rating.ratingHistory.length - 1 ? 
                      subTab.data.rating.ratingHistory[index + 1].score : null;
                    const change = previousScore ? history.score - previousScore : 0;
                    
                    return (
                      <tr key={index} className={isCurrent ? 'bg-green-50' : 'bg-white'}>
                        <td className="px-6 py-4 text-sm text-gray-900">{history.date}</td>
                        <td className="px-6 py-4 text-center">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
                            isCurrent ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {history.rating}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center text-sm text-gray-900">{history.score}</td>
                        <td className="px-6 py-4 text-center">
                          {change !== 0 && (
                            <span className={`text-sm font-medium ${
                              change > 0 ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {change > 0 ? '+' : ''}{change}
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Rating Factors */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <h4 className="text-lg font-semibold text-gray-900">Rating Factors</h4>
            </div>
            <div className="p-6 space-y-4">
              {Object.entries(subTab.data.rating.ratingFactors).map(([factor, data]: [string, any]) => (
                <div key={factor} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-semibold text-gray-900 capitalize">
                        {factor.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        data.impact === 'Positive' ? 'bg-green-100 text-green-800' :
                        data.impact === 'Negative' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {data.impact}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        data.weight === 'High' ? 'bg-blue-100 text-blue-800' :
                        data.weight === 'Medium' ? 'bg-orange-100 text-orange-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {data.weight} Weight
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          data.score >= 80 ? 'bg-green-500' :
                          data.score >= 60 ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`}
                        style={{ width: `${data.score}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-semibold text-gray-900 w-12 text-right">{data.score}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Risk Assessment */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <h4 className="text-lg font-semibold text-gray-900">Risk Assessment</h4>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <span className="text-sm font-medium text-gray-600">Probability of Default</span>
                  <p className="text-2xl font-bold text-red-600 mt-2">{subTab.data.rating.riskAssessment.probabilityOfDefault}</p>
                </div>
                <div className="text-center">
                  <span className="text-sm font-medium text-gray-600">Expected Loss</span>
                  <p className="text-2xl font-bold text-orange-600 mt-2">{subTab.data.rating.riskAssessment.expectedLoss}</p>
                </div>
                <div className="text-center">
                  <span className="text-sm font-medium text-gray-600">Risk Category</span>
                  <p className="text-lg font-semibold text-purple-600 mt-2">{subTab.data.rating.riskAssessment.riskCategory}</p>
                </div>
                <div className="text-center">
                  <span className="text-sm font-medium text-gray-600">Recommendation</span>
                  <p className="text-lg font-semibold text-green-600 mt-2">{subTab.data.rating.riskAssessment.recommendation}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
    
    if (selectedSubTab === 'creditAgreementsSummary') {
      return (
        <div className="space-y-6">
          {/* Header Section */}
          <div className="bg-orange-50 border-l-4 border-orange-500 p-4">
            <h3 className="text-lg font-bold text-orange-800">Credit Agreements Summary</h3>
            <p className="text-sm italic text-orange-700 mt-1">This section includes a Summarized payment behaviour of all credit agreements as reported by the Credit Providers</p>
          </div>

          {/* Non-Performing Notice */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-red-800">
                  NON PERFORMING: Loans/Facility that is more than 90 days in arrears
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <CheckCircle className="h-6 w-6 text-green-600" />
            <div>
              <span className="text-sm font-medium text-gray-600">STATUS:</span>
              <p className="text-sm text-gray-900">{subTab.data.status}</p>
            </div>
          </div>
          
          {/* Credit Agreements Summary Table - Mobile Optimized */}
          <MobileTable
            data={subTab.data.agreements}
            columns={[
              {
                key: 'subscriberName',
                label: 'Subscriber Name',
                width: 'min-w-[200px]',
                render: (value) => (
                  <div className="max-w-xs">
                    <p className="font-medium">{value}</p>
                  </div>
                )
              },
              {
                key: 'accountNumber',
                label: 'Account Number',
                width: 'min-w-[180px]',
                render: (value) => (
                  <span className="font-mono text-sm">{value}</span>
                )
              },
              {
                key: 'currency',
                label: 'Currency',
                width: 'min-w-[80px]',
                render: (value) => (
                  <span className="text-center font-semibold">{value}</span>
                )
              },
              {
                key: 'availedLimit',
                label: 'Availed Limit',
                width: 'min-w-[120px]',
                render: (value) => (
                  <span className="text-right font-mono">{value}</span>
                )
              },
              {
                key: 'outstandingBalance',
                label: 'Outstanding Balance',
                width: 'min-w-[140px]',
                render: (value) => (
                  <span className="text-right font-mono">{value}</span>
                )
              },
              {
                key: 'instalmentAmount',
                label: 'Instalment Amount',
                width: 'min-w-[130px]',
                render: (value) => (
                  <span className="text-right font-mono">{value}</span>
                )
              },
              {
                key: 'arrearAmount',
                label: 'Arrear Amount',
                width: 'min-w-[120px]',
                render: (value) => (
                  <span className="text-right font-mono">{value}</span>
                )
              },
              {
                key: 'facilityClassification',
                label: 'Facility Classification',
                width: 'min-w-[150px]',
                render: (value) => (
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    value === 'Performing' ? 'bg-green-100 text-green-800' :
                    value === 'Non-Performing' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {value}
                  </span>
                )
              },
              {
                key: 'accountStatus',
                label: 'Account Status',
                width: 'min-w-[120px]',
                render: (value) => (
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    value === 'Open' ? 'bg-blue-100 text-blue-800' :
                    value === 'Closed' ? 'bg-gray-100 text-gray-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {value}
                  </span>
                )
              }
            ]}
            onRowClick={(agreement) => {
              setSelectedAgreement(agreement)
              setShowAgreementModal(true)
            }}
            maxHeight="max-h-96"
            showCardView={true}
            cardViewBreakpoint="md"
          />

          {/* Summary Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <span className="text-sm font-medium text-gray-600">TOTAL AGREEMENTS:</span>
              <p className="text-lg font-semibold text-gray-900">{subTab.data.agreements.length}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <span className="text-sm font-medium text-gray-600">OPEN ACCOUNTS:</span>
              <p className="text-lg font-semibold text-gray-900">
                {subTab.data.agreements.filter((a: any) => a.accountStatus === 'Open').length}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <span className="text-sm font-medium text-gray-600">CLOSED ACCOUNTS:</span>
              <p className="text-lg font-semibold text-gray-900">
                {subTab.data.agreements.filter((a: any) => a.accountStatus === 'Closed').length}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <span className="text-sm font-medium text-gray-600">PERFORMING:</span>
              <p className="text-lg font-semibold text-gray-900">
                {subTab.data.agreements.filter((a: any) => a.facilityClassification === 'Performing').length}
              </p>
            </div>
          </div>
        </div>
      )
    }
    
    if (selectedSubTab === 'creditAgreements') {
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
            <h4 className="text-lg font-semibold text-gray-900">Credit Agreements</h4>
            {subTab.data.agreements.map((agreement: any, index: number) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm font-medium text-gray-600">TYPE:</span>
                    <p className="text-sm text-gray-900">{agreement.type}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">AMOUNT:</span>
                    <p className="text-sm text-gray-900">{agreement.amount}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">STATUS:</span>
                    <p className="text-sm text-gray-900">{agreement.status}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">DATE:</span>
                    <p className="text-sm text-gray-900">{agreement.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    }
    
    if (selectedSubTab === 'guarantorDetails') {
      return (
        <div className="space-y-6">
          {/* Header Section */}
          <div className="bg-orange-50 border-l-4 border-orange-500 p-4">
            <h3 className="text-lg font-bold text-orange-800">Guarantor Details</h3>
            <p className="text-sm italic text-orange-700 mt-1">This section includes an aggregate of Guarantor provided on Credit/Loan application.</p>
          </div>

          <div className="flex items-center space-x-3">
            <CheckCircle className="h-6 w-6 text-green-600" />
            <div>
              <span className="text-sm font-medium text-gray-600">STATUS:</span>
              <p className="text-sm text-gray-900">{subTab.data.status}</p>
            </div>
          </div>
          
          {/* Guarantor Summary */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <h4 className="text-lg font-semibold text-gray-900">Guarantor Summary</h4>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-sm font-medium text-gray-700">Number of Accounts Requiring Guarantors:</span>
                  <span className="text-sm font-semibold text-gray-900">{subTab.data.summary.numberOfAccountsRequiringGuarantors}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-sm font-medium text-gray-700">Number of Guarantors Secured:</span>
                  <span className="text-sm font-semibold text-gray-900">{subTab.data.summary.numberOfGuarantorsSecured}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Latest Guarantor Details */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-orange-50 border-l-4 border-orange-500 p-4">
              <h4 className="text-lg font-bold text-orange-800">Latest Guarantor Details</h4>
              <p className="text-sm italic text-orange-700 mt-1">This section includes the details of the latest Guarantor used on Credit/Loan application.</p>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-sm font-medium text-gray-700 bg-gray-50 px-3 py-2 rounded">Surname:</span>
                    <span className="text-sm text-gray-900 bg-white px-3 py-2 rounded border">{subTab.data.latestGuarantor.surname}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-sm font-medium text-gray-700 bg-gray-50 px-3 py-2 rounded">National ID Number:</span>
                    <span className="text-sm text-gray-900 bg-white px-3 py-2 rounded border">{subTab.data.latestGuarantor.nationalIdNumber}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-sm font-medium text-gray-700 bg-gray-50 px-3 py-2 rounded">Driver's License Number:</span>
                    <span className="text-sm text-gray-900 bg-white px-3 py-2 rounded border">{subTab.data.latestGuarantor.driversLicenseNumber}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-sm font-medium text-gray-700 bg-gray-50 px-3 py-2 rounded">Other ID Number:</span>
                    <span className="text-sm text-gray-900 bg-white px-3 py-2 rounded border">{subTab.data.latestGuarantor.otherIdNumber}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-sm font-medium text-gray-700 bg-gray-50 px-3 py-2 rounded">Home Telephone:</span>
                    <span className="text-sm text-gray-900 bg-white px-3 py-2 rounded border">{subTab.data.latestGuarantor.homeTelephone}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-sm font-medium text-gray-700 bg-gray-50 px-3 py-2 rounded">Mobile Number:</span>
                    <span className="text-sm text-gray-900 bg-white px-3 py-2 rounded border">{subTab.data.latestGuarantor.mobileNumber}</span>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-sm font-medium text-gray-700 bg-gray-50 px-3 py-2 rounded">Other Names:</span>
                    <span className="text-sm text-gray-900 bg-white px-3 py-2 rounded border">{subTab.data.latestGuarantor.otherNames}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-sm font-medium text-gray-700 bg-gray-50 px-3 py-2 rounded">PENCOM ID:</span>
                    <span className="text-sm text-gray-900 bg-white px-3 py-2 rounded border">{subTab.data.latestGuarantor.pencomId}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-sm font-medium text-gray-700 bg-gray-50 px-3 py-2 rounded">Passport Number:</span>
                    <span className="text-sm text-gray-900 bg-white px-3 py-2 rounded border">{subTab.data.latestGuarantor.passportNumber}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-sm font-medium text-gray-700 bg-gray-50 px-3 py-2 rounded">Date of Birth:</span>
                    <span className="text-sm text-gray-900 bg-white px-3 py-2 rounded border">{subTab.data.latestGuarantor.dateOfBirth}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-sm font-medium text-gray-700 bg-gray-50 px-3 py-2 rounded">Work Telephone:</span>
                    <span className="text-sm text-gray-900 bg-white px-3 py-2 rounded border">{subTab.data.latestGuarantor.workTelephone}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
    
    if (selectedSubTab === 'collateralInformation') {
      return (
        <div className="space-y-6">
          {/* Header Section */}
          <div className="bg-orange-50 border-l-4 border-orange-500 p-4">
            <h3 className="text-lg font-bold text-orange-800">Collateral Information</h3>
            <p className="text-sm italic text-orange-700 mt-1">This sections includes collateral details as reported by the Credit Providers.</p>
          </div>

          <div className="flex items-center space-x-3">
            <CheckCircle className="h-6 w-6 text-green-600" />
            <div>
              <span className="text-sm font-medium text-gray-600">STATUS:</span>
              <p className="text-sm text-gray-900">{subTab.data.status}</p>
            </div>
          </div>
          
          {/* Collateral Information Table */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-200">Supplier Name</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700 border-r border-gray-200">Loan Security Status</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700 border-r border-gray-200">Collateral Type</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Collateral Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {subTab.data.collaterals.map((collateral: any, index: number) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 text-sm text-gray-900 border-r border-gray-200">
                        <div className="max-w-xs">
                          <p className="font-medium">{collateral.supplierName}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center border-r border-gray-200">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          collateral.loanSecurityStatus === 'Active' ? 'bg-green-100 text-green-800' :
                          collateral.loanSecurityStatus === 'Released' ? 'bg-blue-100 text-blue-800' :
                          collateral.loanSecurityStatus === 'Forfeited' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {collateral.loanSecurityStatus}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center text-sm text-gray-900 border-r border-gray-200">
                        {collateral.collateralType}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        <div className="max-w-md">
                          <p className="text-sm leading-relaxed">{collateral.collateralDetails}</p>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Summary Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <span className="text-sm font-medium text-gray-600">TOTAL COLLATERALS:</span>
              <p className="text-lg font-semibold text-gray-900">{subTab.data.collaterals.length}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <span className="text-sm font-medium text-gray-600">ACTIVE COLLATERALS:</span>
              <p className="text-lg font-semibold text-gray-900">
                {subTab.data.collaterals.filter((c: any) => c.loanSecurityStatus === 'Active').length}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <span className="text-sm font-medium text-gray-600">RELEASED COLLATERALS:</span>
              <p className="text-lg font-semibold text-gray-900">
                {subTab.data.collaterals.filter((c: any) => c.loanSecurityStatus === 'Released').length}
              </p>
            </div>
          </div>
        </div>
      )
    }
    
    if (selectedSubTab === 'dishonouredChequeInformation') {
      return (
        <div className="space-y-6">
          {/* Header Section */}
          <div className="bg-orange-50 border-l-4 border-orange-500 p-4">
            <h3 className="text-lg font-bold text-orange-800">Dishonoured Cheque Information</h3>
            <p className="text-sm italic text-orange-700 mt-1">This section includes the consumer's bounced cheques information.</p>
          </div>

          <div className="flex items-center space-x-3">
            <CheckCircle className="h-6 w-6 text-green-600" />
            <div>
              <span className="text-sm font-medium text-gray-600">STATUS:</span>
              <p className="text-sm text-gray-900">{subTab.data.status}</p>
            </div>
          </div>
          
          {/* Dishonoured Cheque Information Table */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-200">Date Cheque Issued</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-200">Date Cheque Dishonoured</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-200">Issuing Bank</th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {subTab.data.cheques.map((cheque: any, index: number) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 text-sm text-gray-900 border-r border-gray-200">
                        {cheque.dateChequeIssued}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 border-r border-gray-200">
                        {cheque.dateChequeDishonoured}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 border-r border-gray-200">
                        <div className="max-w-xs">
                          <p className="font-medium">{cheque.issuingBank}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-right">
                        <span className="font-semibold text-red-600">{cheque.amount}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Summary Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <span className="text-sm font-medium text-gray-600">TOTAL DISHONOURED CHEQUES:</span>
              <p className="text-lg font-semibold text-gray-900">{subTab.data.cheques.length}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <span className="text-sm font-medium text-gray-600">TOTAL AMOUNT:</span>
              <p className="text-lg font-semibold text-red-600">
                ₦{subTab.data.cheques.reduce((total: number, cheque: any) => {
                  const amount = parseFloat(cheque.amount.replace(/[₦,]/g, ''));
                  return total + amount;
                }, 0).toLocaleString('en-NG', { minimumFractionDigits: 2 })}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <span className="text-sm font-medium text-gray-600">STATUS:</span>
              <p className="text-lg font-semibold text-gray-900">{subTab.data.status}</p>
            </div>
          </div>
        </div>
      )
    }
    
    if (selectedSubTab === 'companyDirectorshipSummary') {
      return (
        <div className="space-y-6">
          {/* Header Section */}
          <div className="bg-orange-50 border-l-4 border-orange-500 p-4">
            <h3 className="text-lg font-bold text-orange-800">Company Directorship Summary</h3>
            <p className="text-sm italic text-orange-700 mt-1">This section includes a summary of directorships held information.</p>
          </div>

          <div className="flex items-center space-x-3">
            <CheckCircle className="h-6 w-6 text-green-600" />
            <div>
              <span className="text-sm font-medium text-gray-600">STATUS:</span>
              <p className="text-sm text-gray-900">{subTab.data.status}</p>
            </div>
          </div>
          
          {/* Summary Section */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <h4 className="text-lg font-semibold text-gray-900">Directorship Summary</h4>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-sm font-medium text-gray-700">Total Number of Company Directorships:</span>
                <span className="text-sm font-semibold text-gray-900">{subTab.data.summary.totalNumberOfCompanyDirectorships}</span>
              </div>
            </div>
          </div>

          {/* Directorships Details */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <h4 className="text-lg font-semibold text-gray-900">Directorship Details</h4>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-200">Company Name</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700 border-r border-gray-200">Position</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700 border-r border-gray-200">Appointment Date</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700 border-r border-gray-200">Status</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700 border-r border-gray-200">Registration Number</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Shareholding</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {subTab.data.directorships.map((directorship: any, index: number) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 text-sm text-gray-900 border-r border-gray-200">
                        <div className="max-w-xs">
                          <p className="font-medium">{directorship.companyName}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center text-sm text-gray-900 border-r border-gray-200">
                        {directorship.position}
                      </td>
                      <td className="px-4 py-3 text-center text-sm text-gray-900 border-r border-gray-200">
                        {directorship.appointmentDate}
                      </td>
                      <td className="px-4 py-3 text-center border-r border-gray-200">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          directorship.status === 'Active' ? 'bg-green-100 text-green-800' :
                          directorship.status === 'Resigned' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {directorship.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center text-sm text-gray-900 border-r border-gray-200 font-mono">
                        {directorship.companyRegistrationNumber}
                      </td>
                      <td className="px-4 py-3 text-center text-sm text-gray-900">
                        <span className="font-semibold">{directorship.shareholding}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Summary Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <span className="text-sm font-medium text-gray-600">ACTIVE DIRECTORShips:</span>
              <p className="text-lg font-semibold text-gray-900">
                {subTab.data.directorships.filter((d: any) => d.status === 'Active').length}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <span className="text-sm font-medium text-gray-600">RESIGNED DIRECTORShips:</span>
              <p className="text-lg font-semibold text-gray-900">
                {subTab.data.directorships.filter((d: any) => d.status === 'Resigned').length}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <span className="text-sm font-medium text-gray-600">TOTAL COMPANIES:</span>
              <p className="text-lg font-semibold text-gray-900">{subTab.data.directorships.length}</p>
            </div>
          </div>
        </div>
      )
    }
    
    if (selectedSubTab === 'enquiryHistory') {
      return (
        <div className="space-y-6">
          {/* Header Section */}
          <div className="bg-orange-50 border-l-4 border-orange-500 p-4">
            <h3 className="text-lg font-bold text-orange-800">Enquiry History in Last 12 Months</h3>
            <p className="text-sm italic text-orange-700 mt-1">This section includes a list of organisations or credit providers who have requested a Credit Report of this consumer.</p>
          </div>

          <div className="flex items-center space-x-3">
            <CheckCircle className="h-6 w-6 text-green-600" />
            <div>
              <span className="text-sm font-medium text-gray-600">STATUS:</span>
              <p className="text-sm text-gray-900">{subTab.data.status}</p>
            </div>
          </div>
          
          {/* Enquiry History Table */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-200">Enquiry Date</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-200">Name of Enquirer</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-200">Enquirer Phone Number</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Reason for Enquiry</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {subTab.data.enquiries.map((enquiry: any, index: number) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 text-sm text-gray-900 border-r border-gray-200">
                        <span className="font-mono">{enquiry.enquiryDate}</span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 border-r border-gray-200">
                        <div className="max-w-xs">
                          <p className="font-medium">{enquiry.nameOfEnquirer}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 border-r border-gray-200">
                        {enquiry.enquirerPhoneNumber || <span className="text-gray-400 italic">Not provided</span>}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        <div className="max-w-md">
                          <p className="text-sm leading-relaxed">{enquiry.reasonForEnquiry}</p>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Summary Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <span className="text-sm font-medium text-gray-600">TOTAL ENQUIRIES:</span>
              <p className="text-lg font-semibold text-gray-900">{subTab.data.enquiries.length}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <span className="text-sm font-medium text-gray-600">LATEST ENQUIRY:</span>
              <p className="text-lg font-semibold text-gray-900">
                {subTab.data.enquiries[0]?.enquiryDate.split(' ')[0] || 'N/A'}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <span className="text-sm font-medium text-gray-600">STATUS:</span>
              <p className="text-lg font-semibold text-gray-900">{subTab.data.status}</p>
            </div>
          </div>
        </div>
      )
    }
    
    if (selectedSubTab === 'identificationHistory') {
      return (
        <div className="space-y-6">
          {/* Header Section */}
          <div className="bg-orange-50 border-l-4 border-orange-500 p-4">
            <h3 className="text-lg font-bold text-orange-800">Identification History</h3>
            <p className="text-sm italic text-orange-700 mt-1">This section includes a list of all Identification means presented on the Credit/Loan applications.</p>
          </div>

          <div className="flex items-center space-x-3">
            <CheckCircle className="h-6 w-6 text-green-600" />
            <div>
              <span className="text-sm font-medium text-gray-600">STATUS:</span>
              <p className="text-sm text-gray-900">{subTab.data.status}</p>
            </div>
          </div>
          
          {/* Identification History Table */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-200">Bureau Update Date</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-200">Identification Type</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Identification Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {subTab.data.identifications.map((identification: any, index: number) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 text-sm text-gray-900 border-r border-gray-200">
                        <span className="font-mono">{identification.bureauUpdateDate}</span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 border-r border-gray-200">
                        <div className="max-w-xs">
                          <p className="font-medium">{identification.identificationType}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        <div className="max-w-md">
                          <p className="text-sm leading-relaxed">{identification.identificationDetails}</p>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Summary Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <span className="text-sm font-medium text-gray-600">TOTAL IDENTIFICATIONS:</span>
              <p className="text-lg font-semibold text-gray-900">{subTab.data.identifications.length}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <span className="text-sm font-medium text-gray-600">LATEST UPDATE:</span>
              <p className="text-lg font-semibold text-gray-900">
                {subTab.data.identifications[0]?.bureauUpdateDate || 'N/A'}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <span className="text-sm font-medium text-gray-600">STATUS:</span>
              <p className="text-lg font-semibold text-gray-900">{subTab.data.status}</p>
            </div>
          </div>
        </div>
      )
    }
    
    if (selectedSubTab === 'addressHistory') {
      return (
        <div className="space-y-6">
          {/* Header Section */}
          <div className="bg-orange-50 border-l-4 border-orange-500 p-4">
            <h3 className="text-lg font-bold text-orange-800">Address History</h3>
            <p className="text-sm italic text-orange-700 mt-1">This section includes a list of all Address Information presented on the Credit/Loan applications.</p>
          </div>

          <div className="flex items-center space-x-3">
            <CheckCircle className="h-6 w-6 text-green-600" />
            <div>
              <span className="text-sm font-medium text-gray-600">STATUS:</span>
              <p className="text-sm text-gray-900">{subTab.data.status}</p>
            </div>
          </div>
          
          {/* Address History Table */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-200">Bureau Update</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-200">Address</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-200">Address Line 1</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-200">Address Line 2</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-200">Address Line 3</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Address Line 4</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {subTab.data.addresses.map((address: any, index: number) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 text-sm text-gray-900 border-r border-gray-200">
                        <span className="font-mono">{address.bureauUpdate}</span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 border-r border-gray-200">
                        <span className="font-medium">{address.address}</span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 border-r border-gray-200">
                        <div className="max-w-xs">
                          <p className="text-sm leading-relaxed">{address.addressLine1}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 border-r border-gray-200">
                        <div className="max-w-xs">
                          <p className="text-sm leading-relaxed">{address.addressLine2 || ''}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 border-r border-gray-200">
                        <div className="max-w-xs">
                          <p className="text-sm leading-relaxed">{address.addressLine3 || ''}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        <div className="max-w-xs">
                          <p className="text-sm leading-relaxed">{address.addressLine4 || ''}</p>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Summary Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <span className="text-sm font-medium text-gray-600">TOTAL ADDRESSES:</span>
              <p className="text-lg font-semibold text-gray-900">{subTab.data.addresses.length}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <span className="text-sm font-medium text-gray-600">LATEST UPDATE:</span>
              <p className="text-lg font-semibold text-gray-900">
                {subTab.data.addresses[0]?.bureauUpdate || 'N/A'}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <span className="text-sm font-medium text-gray-600">STATUS:</span>
              <p className="text-lg font-semibold text-gray-900">{subTab.data.status}</p>
            </div>
          </div>
        </div>
      )
    }
    
    if (selectedSubTab === 'employmentHistory') {
      return (
        <div className="space-y-6">
          {/* Header Section */}
          <div className="bg-orange-50 border-l-4 border-orange-500 p-4">
            <h3 className="text-lg font-bold text-orange-800">Employment History</h3>
            <p className="text-sm italic text-orange-700 mt-1">This section includes a list of all Employment Information presented on the Credit/Loan applications.</p>
          </div>

          <div className="flex items-center space-x-3">
            <CheckCircle className="h-6 w-6 text-green-600" />
            <div>
              <span className="text-sm font-medium text-gray-600">STATUS:</span>
              <p className="text-sm text-gray-900">{subTab.data.status}</p>
            </div>
          </div>
          
          {/* Employment History Table */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-200">Bureau Update Date</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-200">Company</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Occupation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {subTab.data.employments.map((employment: any, index: number) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 text-sm text-gray-900 border-r border-gray-200">
                        <span className="font-mono">{employment.bureauUpdateDate}</span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 border-r border-gray-200">
                        <div className="max-w-xs">
                          <p className="font-medium">{employment.company}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        <div className="max-w-xs">
                          <p className="text-sm leading-relaxed">{employment.occupation}</p>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Summary Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <span className="text-sm font-medium text-gray-600">TOTAL EMPLOYMENTS:</span>
              <p className="text-lg font-semibold text-gray-900">{subTab.data.employments.length}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <span className="text-sm font-medium text-gray-600">LATEST UPDATE:</span>
              <p className="text-lg font-semibold text-gray-900">
                {subTab.data.employments[0]?.bureauUpdateDate || 'N/A'}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <span className="text-sm font-medium text-gray-600">STATUS:</span>
              <p className="text-lg font-semibold text-gray-900">{subTab.data.status}</p>
            </div>
          </div>
        </div>
      )
    }
    
    if (selectedSubTab === 'telephoneHistory') {
      return (
        <div className="space-y-6">
          {/* Header Section */}
          <div className="bg-orange-50 border-l-4 border-orange-500 p-4">
            <h3 className="text-lg font-bold text-orange-800">Telephone History</h3>
            <p className="text-sm italic text-orange-700 mt-1">This section includes a list of all Contact Information presented on the Credit/Loan applications.</p>
          </div>

          <div className="flex items-center space-x-3">
            <CheckCircle className="h-6 w-6 text-green-600" />
            <div>
              <span className="text-sm font-medium text-gray-600">STATUS:</span>
              <p className="text-sm text-gray-900">{subTab.data.status}</p>
            </div>
          </div>
          
          {/* Telephone History Table */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-200">Home Telephone</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-200">Work Telephone</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Mobile Number</th>
                  </tr>
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-200">Bureau Update Date</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-200">Bureau Update Date</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Bureau Update Date</th>
                  </tr>
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-200">Telephone Number</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-200">Telephone Number</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Telephone Number</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {subTab.data.telephones.map((telephone: any, index: number) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 text-sm text-gray-900 border-r border-gray-200">
                        <div className="space-y-2">
                          <div>
                            <span className="font-mono text-xs text-gray-600">Bureau Update Date:</span>
                            <p className="font-mono text-sm">{telephone.homeTelephone.bureauUpdateDate}</p>
                          </div>
                          <div>
                            <span className="font-mono text-xs text-gray-600">Telephone Number:</span>
                            <p className="font-mono text-sm">{telephone.homeTelephone.telephoneNumber}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 border-r border-gray-200">
                        <div className="space-y-2">
                          <div>
                            <span className="font-mono text-xs text-gray-600">Bureau Update Date:</span>
                            <p className="font-mono text-sm">{telephone.workTelephone.bureauUpdateDate}</p>
                          </div>
                          <div>
                            <span className="font-mono text-xs text-gray-600">Telephone Number:</span>
                            <p className="font-mono text-sm">{telephone.workTelephone.telephoneNumber}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        <div className="space-y-2">
                          <div>
                            <span className="font-mono text-xs text-gray-600">Bureau Update Date:</span>
                            <p className="font-mono text-sm">{telephone.mobileNumber.bureauUpdateDate}</p>
                          </div>
                          <div>
                            <span className="font-mono text-xs text-gray-600">Telephone Number:</span>
                            <p className="font-mono text-sm">{telephone.mobileNumber.telephoneNumber}</p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Summary Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <span className="text-sm font-medium text-gray-600">TOTAL RECORDS:</span>
              <p className="text-lg font-semibold text-gray-900">{subTab.data.telephones.length}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <span className="text-sm font-medium text-gray-600">LATEST UPDATE:</span>
              <p className="text-lg font-semibold text-gray-900">
                {subTab.data.telephones[0]?.mobileNumber?.bureauUpdateDate || 'N/A'}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <span className="text-sm font-medium text-gray-600">STATUS:</span>
              <p className="text-lg font-semibold text-gray-900">{subTab.data.status}</p>
            </div>
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
          <h3 className="text-xl font-bold text-gray-900 tracking-tight">{(subTab as any).name}</h3>
          <span className="text-sm text-gray-500 font-medium">{(subTab as any).data.timeline}</span>
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

  const [isScrolledToTop, setIsScrolledToTop] = useState(true)
  const [selectedAgreement, setSelectedAgreement] = useState<any>(null)
  const [showAgreementModal, setShowAgreementModal] = useState(false)

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = e.currentTarget.scrollTop
    setIsScrolledToTop(scrollTop <= 10)
  }

  const handleDownloadCreditReport = async () => {
    try {
      const pdf = await generateCreditReportPDF(backgroundCheckData)
      pdf.save(`Credit_Profile_Report_${backgroundCheckData.id}_${new Date().toISOString().split('T')[0]}.pdf`)
    } catch (error) {
      console.error('Error generating PDF:', error)
      alert('Error generating PDF. Please try again.')
    }
  }

  return (
    <div className="fixed inset-0 bg-white z-[9999] flex flex-col">
      {/* Mobile Header */}
      <div className="flex-shrink-0 bg-white border-b border-gray-200 px-4 sm:px-8 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <button
              onClick={onClose}
              className="flex items-center space-x-1 sm:space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 touch-manipulation"
              style={{ minWidth: '44px', minHeight: '44px' }}
            >
              <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="text-xs sm:text-sm font-medium hidden sm:inline">Background Check Report</span>
              <span className="text-xs sm:text-sm font-medium sm:hidden">Report</span>
            </button>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-2 touch-manipulation"
            style={{ minWidth: '44px', minHeight: '44px' }}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Mobile Report Header */}
      <div className="flex-shrink-0 bg-red-600 text-white px-4 sm:px-8 py-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-6">
            <h1 className="text-lg sm:text-xl font-bold tracking-tight">Background Check Report</h1>
            <div className="flex items-center space-x-2">
              <div className="text-xs opacity-90 font-medium">IDCERTIFY NO</div>
              <div className="text-sm font-bold">{backgroundCheckData.id}</div>
            </div>
          </div>
          <button 
            onClick={handleDownloadCreditReport}
            className="bg-white text-red-600 px-3 py-2 rounded-md font-semibold flex items-center justify-center space-x-2 hover:bg-gray-50 transition-colors duration-200 shadow-sm text-xs touch-manipulation self-start sm:self-auto"
            style={{ minWidth: '44px', minHeight: '44px' }}>
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Download Report</span>
            <span className="sm:hidden">Download</span>
          </button>
        </div>
      </div>

      {/* Mobile Candidate Summary */}
      <div className="flex-shrink-0 bg-white px-4 sm:px-8 py-3 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
          {/* Profile & Basic Info */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full border-2 border-gray-200 overflow-hidden flex-shrink-0">
              <img
                src={backgroundCheckData.candidate.profileImage || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&h=150&q=80'}
                alt={backgroundCheckData.candidate.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback to User icon if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    parent.innerHTML = '<div class="w-full h-full bg-gray-100 flex items-center justify-center"><svg class="h-8 w-8 sm:h-12 sm:w-12 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg></div>';
                  }
                }}
              />
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-3">
                <h2 className="text-base sm:text-lg font-bold text-gray-900 truncate">{backgroundCheckData.candidate.name}</h2>
                <div className="flex items-center space-x-2">
                  <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">
                    {backgroundCheckData.candidate.score}
                  </div>
                  <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold inline-flex items-center space-x-1">
                    <CheckCircle className="h-3 w-3" />
                    <span>Completed</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 text-xs sm:text-sm mt-1 truncate">{backgroundCheckData.candidate.email}</p>
            </div>
          </div>

          {/* Status Details - Mobile Stacked */}
          <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-6">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 flex-shrink-0" />
              <div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">COMPLETION</div>
                <div className="text-xs sm:text-sm font-semibold text-gray-900">{backgroundCheckData.completionDate}</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 flex-shrink-0" />
              <div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">IDENTITY</div>
                <div className="text-xs sm:text-sm font-semibold text-gray-900">Verified</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></div>
              <div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">FLAGGED</div>
                <div className="text-xs sm:text-sm font-semibold text-gray-900">{backgroundCheckData.flaggedIssues} Issues</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Category Navigation */}
      <div className="lg:hidden flex-shrink-0 bg-gray-50 border-b border-gray-200 px-4 py-3">
        <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
          {Object.entries(backgroundCheckData.categories).map(([key, category]: [string, any]) => (
            <button
              key={key}
              onClick={() => {
                setSelectedCategory(key)
                if (category.subTabs) {
                  setSelectedSubTab(Object.keys(category.subTabs)[0])
                }
              }}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 touch-manipulation ${
                selectedCategory === key 
                  ? 'bg-white text-gray-900 shadow-sm border border-gray-200' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-white'
              }`}
              style={{ minWidth: '44px', minHeight: '44px' }}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex w-full max-w-full overflow-hidden">
        {/* Desktop Left Panel - Categories */}
        <div className="hidden lg:block w-1/4 bg-gray-50 border-r border-gray-200 p-4 flex-shrink-0">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Background Check Categories</h3>
          <div className="space-y-3">
            {Object.entries(backgroundCheckData.categories).map(([key, category]: [string, any]) => (
              <button
                key={key}
                onClick={() => {
                  setSelectedCategory(key)
                  if (category.subTabs) {
                    setSelectedSubTab(Object.keys(category.subTabs)[0])
                  }
                }}
                className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-all duration-200 ${
                  selectedCategory === key 
                    ? 'bg-white border-2 border-gray-200 shadow-md' 
                    : 'hover:bg-white hover:shadow-sm border border-transparent'
                }`}
              >
                <div className="flex-1 min-w-0 flex items-center">
                  <span className="text-sm font-semibold text-gray-900 leading-tight break-words">{category.name}</span>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400 flex-shrink-0 ml-2" />
              </button>
            ))}
          </div>
        </div>

        {/* Mobile/Desktop Content Panel */}
        <div className="flex-1 bg-white p-4 sm:p-6 min-w-0 overflow-y-auto" onScroll={handleScroll}>
          {selectedCategory && backgroundCheckData.categories[selectedCategory as keyof typeof backgroundCheckData.categories]?.subTabs && (
            <>
              {/* Mobile Category Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 space-y-3 sm:space-y-0">
                <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight">
                    {backgroundCheckData.categories[selectedCategory as keyof typeof backgroundCheckData.categories].name}
                  </h3>
                  <span className={getStatusBadge(backgroundCheckData.categories[selectedCategory as keyof typeof backgroundCheckData.categories].status)}>
                    {getStatusText(backgroundCheckData.categories[selectedCategory as keyof typeof backgroundCheckData.categories].status)}
                  </span>
                </div>
                {selectedCategory === 'financialCredit' && (
                  <button 
                    onClick={handleDownloadCreditReport}
                    className="bg-red-600 text-white px-3 py-2 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:bg-red-700 transition-colors duration-200 shadow-sm text-xs sm:text-sm touch-manipulation self-start sm:self-auto"
                    style={{ minWidth: '44px', minHeight: '44px' }}>
                    <Download className="h-4 w-4" />
                    <span className="hidden sm:inline">Download Credit Report</span>
                    <span className="sm:hidden">Download</span>
                  </button>
                )}
              </div>

              {/* Sub-tabs */}
              <div className="border-b border-gray-200 mb-4 sm:mb-6 w-full">
                <style>{`
                  .nav-scroll::-webkit-scrollbar {
                    display: none;
                  }
                `}</style>
                <div className="w-full overflow-hidden">
                  <nav className="-mb-px flex space-x-2 sm:space-x-4 overflow-x-auto nav-scroll pb-1" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    {Object.entries(backgroundCheckData.categories[selectedCategory as keyof typeof backgroundCheckData.categories].subTabs).map(([key, subTab]: [string, any]) => (
                      <button
                        key={key}
                        onClick={() => setSelectedSubTab(key)}
                        className={`py-2 px-3 border-b-2 font-semibold text-xs sm:text-sm transition-colors duration-200 whitespace-nowrap flex-shrink-0 min-w-fit touch-manipulation ${
                          selectedSubTab === key
                            ? 'border-red-500 text-red-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                        style={{ minWidth: '44px', minHeight: '44px' }}
                      >
                        {subTab.name}
                      </button>
                    ))}
                  </nav>
                </div>
              </div>

              {/* Detail Content */}
              <div className="min-h-64">
                {renderDetailContent()}
              </div>
            </>
          )}

        </div>
      </div>

      {/* Credit Agreement Details Modal - Mobile Optimized */}
      {showAgreementModal && selectedAgreement && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                Credit Agreement: {selectedAgreement.subscriberName}
              </h2>
              <button
                onClick={() => setShowAgreementModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6">
              <p>Modal content will be implemented here</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default BackgroundCheckDetailsPage

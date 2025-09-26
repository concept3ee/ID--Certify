import React, { useState } from 'react'
import { Download } from 'lucide-react'
import { generateCreditReportPDF } from '../../utils/pdfGenerator'

// Sample data for testing PDF generation
const sampleCreditReportData = {
  id: 'ID284787822',
  candidate: {
    name: 'Nene Oyinda Afamefuna',
    email: 'NeneAfamefuna@gmail.com',
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&h=150&q=80',
    score: 830
  },
  completionDate: 'Mar 23, 2025',
  categories: {
    financialCredit: {
      name: 'Credit Profile Report',
      status: 'Completed',
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
            totalAccounts: 3,
            activeAccounts: 2,
            closedAccounts: 1,
            totalOutstanding: '₦1,250,000.00'
          }
        },
        creditAccountRating: {
          name: 'Credit Account Rating',
          data: {
            overallRating: 'A',
            creditScore: 720,
            riskLevel: 'Low',
            ratingDate: '2024-12-15',
            ratingHistory: [
              { date: '2024-12-15', rating: 'A', score: 720 },
              { date: '2024-11-15', rating: 'A-', score: 710 },
              { date: '2024-10-15', rating: 'B+', score: 680 }
            ]
          }
        },
        creditAgreementsSummary: {
          name: 'Credit Agreements Summary',
          data: {
            status: 'Active',
            agreements: [
              {
                subscriberName: 'First Bank of Nigeria',
                accountNumber: '1234567890',
                outstandingBalance: '₦750,000.00',
                facilityClassification: 'Performing',
                accountStatus: 'Open'
              },
              {
                subscriberName: 'Access Bank',
                accountNumber: '0987654321',
                outstandingBalance: '₦500,000.00',
                facilityClassification: 'Performing',
                accountStatus: 'Open'
              }
            ]
          }
        }
      }
    }
  }
}

const PDFTestButton: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false)

  const handleTestPDF = async () => {
    if (isGenerating) return
    
    setIsGenerating(true)
    try {
      const pdf = await generateCreditReportPDF(sampleCreditReportData)
      const filename = `Test_Credit_Profile_Report_${new Date().toISOString().split('T')[0]}.pdf`
      pdf.save(filename)
      console.log('Test PDF generated successfully:', filename)
    } catch (error) {
      console.error('Error generating test PDF:', error)
      alert('Error generating test PDF. Please check the console for details.')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={handleTestPDF}
        disabled={isGenerating}
        className={`px-4 py-2 rounded-lg font-semibold flex items-center space-x-2 shadow-lg transition-all duration-200 ${
          isGenerating 
            ? 'bg-gray-400 text-gray-200 cursor-not-allowed' 
            : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-xl'
        }`}
      >
        {isGenerating ? (
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-200 border-t-white"></div>
        ) : (
          <Download className="h-4 w-4" />
        )}
        <span>
          {isGenerating ? 'Generating...' : 'Test PDF'}
        </span>
      </button>
    </div>
  )
}

export default PDFTestButton

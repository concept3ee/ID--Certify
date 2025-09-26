import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

interface CreditReportData {
  candidate: {
    name: string
    email: string
    profileImage?: string
    score: number | string
  }
  id: string
  completionDate: string
  categories: {
    [key: string]: {
      name: string
      status: string
      subTabs: {
        [key: string]: {
          name: string
          data: any
        }
      }
    }
  }
}

export const generateCreditReportPDF = async (reportData: CreditReportData) => {
  try {
    const pdf = new jsPDF('p', 'mm', 'a4')
    const pageWidth = pdf.internal.pageSize.getWidth()
    const pageHeight = pdf.internal.pageSize.getHeight()
    let yPosition = 20

  // Helper function to add text with word wrapping
  const addText = (text: string, x: number, y: number, maxWidth: number, fontSize: number = 10, color: string = '#000000') => {
    try {
      pdf.setFontSize(fontSize)
      pdf.setTextColor(color)
      const safeText = String(text || 'N/A')
      const lines = pdf.splitTextToSize(safeText, maxWidth)
      pdf.text(lines, x, y)
      return y + (lines.length * fontSize * 0.4)
    } catch (error) {
      console.warn('Error adding text to PDF:', error)
      return y + fontSize * 0.4
    }
  }

  // Helper function to add a line
  const addLine = (x1: number, y1: number, x2: number, y2: number, color: string = '#E5E7EB') => {
    pdf.setDrawColor(color)
    pdf.line(x1, y1, x2, y2)
  }

  // Helper function to add a rectangle
  const addRect = (x: number, y: number, width: number, height: number, fillColor?: string, strokeColor: string = '#E5E7EB') => {
    if (fillColor) {
      pdf.setFillColor(fillColor)
      pdf.rect(x, y, width, height, 'F')
    }
    pdf.setDrawColor(strokeColor)
    pdf.rect(x, y, width, height, 'S')
  }

  // Helper function to check if we need a new page
  const checkNewPage = (requiredSpace: number) => {
    if (yPosition + requiredSpace > pageHeight - 20) {
      pdf.addPage()
      yPosition = 20
      return true
    }
    return false
  }

  // Header Section
  pdf.setFillColor(220, 38, 38) // Red background
  pdf.rect(0, 0, pageWidth, 30, 'F')
  
  // Company Logo/Title
  pdf.setTextColor(255, 255, 255)
  pdf.setFontSize(20)
  pdf.setFont('helvetica', 'bold')
  pdf.text('iDCERTIFY', 20, 15)
  
  // Report Title
  pdf.setFontSize(16)
  pdf.text('Credit Profile Report', 20, 25)
  
  // Report ID
  pdf.setFontSize(10)
  pdf.text(`Report ID: ${reportData.id}`, pageWidth - 60, 15)
  pdf.text(`Generated: ${new Date().toLocaleDateString()}`, pageWidth - 60, 20)
  pdf.text(`Valid Until: ${new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}`, pageWidth - 60, 25)

  yPosition = 40

  // Candidate Information Section
  pdf.setFillColor(249, 250, 251) // Light gray background
  pdf.rect(10, yPosition, pageWidth - 20, 25, 'F')
  
  pdf.setTextColor(0, 0, 0)
  pdf.setFontSize(14)
  pdf.setFont('helvetica', 'bold')
  pdf.text('Candidate Information', 15, yPosition + 8)
  
  yPosition += 15
  pdf.setFontSize(10)
  pdf.setFont('helvetica', 'normal')
  pdf.text(`Name: ${reportData.candidate.name}`, 15, yPosition)
  pdf.text(`Email: ${reportData.candidate.email}`, 15, yPosition + 5)
  pdf.text(`Score: ${String(reportData.candidate.score)}`, 15, yPosition + 10)
  pdf.text(`Completion Date: ${reportData.completionDate}`, pageWidth - 80, yPosition)
  pdf.text(`Status: Completed`, pageWidth - 80, yPosition + 5)

  yPosition += 25

  // Credit Profile Report Section
  const creditCategory = reportData.categories.financialCredit
  if (creditCategory) {
    // Section Header
    pdf.setFillColor(239, 68, 68) // Red background
    pdf.rect(10, yPosition, pageWidth - 20, 15, 'F')
    
    pdf.setTextColor(255, 255, 255)
    pdf.setFontSize(14)
    pdf.setFont('helvetica', 'bold')
    pdf.text('Credit Profile Report', 15, yPosition + 10)
    
    yPosition += 20

    // Status
    pdf.setTextColor(0, 0, 0)
    pdf.setFontSize(12)
    pdf.setFont('helvetica', 'bold')
    pdf.text('Status: ', 15, yPosition)
    pdf.setTextColor(34, 197, 94) // Green
    pdf.text(creditCategory.status, 35, yPosition)
    
    yPosition += 15

    // Process each sub-tab
    for (const [subTabKey, subTab] of Object.entries(creditCategory.subTabs)) {
      checkNewPage(30)
      
      // Sub-tab Header
      pdf.setFillColor(243, 244, 246) // Light gray
      pdf.rect(10, yPosition, pageWidth - 20, 12, 'F')
      
      pdf.setTextColor(0, 0, 0)
      pdf.setFontSize(12)
      pdf.setFont('helvetica', 'bold')
      pdf.text(subTab.name, 15, yPosition + 8)
      
      yPosition += 15

      // Add content based on sub-tab type
      switch (subTabKey) {
        case 'personalDetails':
          yPosition = addPersonalDetails(pdf, subTab.data, yPosition, pageWidth, addText, addLine, addRect, checkNewPage)
          break
        case 'delinquencyInformation':
          yPosition = addDelinquencyInfo(pdf, subTab.data, yPosition, pageWidth, addText, addLine, addRect, checkNewPage)
          break
        case 'creditAccountSummary':
          yPosition = addCreditAccountSummary(pdf, subTab.data, yPosition, pageWidth, addText, addLine, addRect, checkNewPage)
          break
        case 'creditAccountRating':
          yPosition = addCreditAccountRating(pdf, subTab.data, yPosition, pageWidth, addText, addLine, addRect, checkNewPage)
          break
        case 'creditAgreementsSummary':
          yPosition = addCreditAgreementsSummary(pdf, subTab.data, yPosition, pageWidth, addText, addLine, addRect, checkNewPage)
          break
        case 'creditAgreements':
          yPosition = addCreditAgreements(pdf, subTab.data, yPosition, pageWidth, addText, addLine, addRect, checkNewPage)
          break
        case 'guarantorDetails':
          yPosition = addGuarantorDetails(pdf, subTab.data, yPosition, pageWidth, addText, addLine, addRect, checkNewPage)
          break
        case 'collateralInformation':
          yPosition = addCollateralInfo(pdf, subTab.data, yPosition, pageWidth, addText, addLine, addRect, checkNewPage)
          break
        case 'dishonouredChequeInformation':
          yPosition = addDishonouredChequeInfo(pdf, subTab.data, yPosition, pageWidth, addText, addLine, addRect, checkNewPage)
          break
        case 'companyDirectorshipSummary':
          yPosition = addCompanyDirectorshipSummary(pdf, subTab.data, yPosition, pageWidth, addText, addLine, addRect, checkNewPage)
          break
        case 'enquiryHistory':
          yPosition = addEnquiryHistory(pdf, subTab.data, yPosition, pageWidth, addText, addLine, addRect, checkNewPage)
          break
        case 'identificationHistory':
          yPosition = addIdentificationHistory(pdf, subTab.data, yPosition, pageWidth, addText, addLine, addRect, checkNewPage)
          break
        case 'addressHistory':
          yPosition = addAddressHistory(pdf, subTab.data, yPosition, pageWidth, addText, addLine, addRect, checkNewPage)
          break
        case 'employmentHistory':
          yPosition = addEmploymentHistory(pdf, subTab.data, yPosition, pageWidth, addText, addLine, addRect, checkNewPage)
          break
        case 'telephoneHistory':
          yPosition = addTelephoneHistory(pdf, subTab.data, yPosition, pageWidth, addText, addLine, addRect, checkNewPage)
          break
        default:
          yPosition = addGenericContent(pdf, subTab.data, yPosition, pageWidth, addText, addLine, addRect, checkNewPage)
      }
      
      yPosition += 10
    }
  }

  // Footer
  const totalPages = pdf.getNumberOfPages()
  for (let i = 1; i <= totalPages; i++) {
    pdf.setPage(i)
    pdf.setFontSize(8)
    pdf.setTextColor(107, 114, 128) // Gray
    pdf.text('iDCERTIFY Credit Profile Report', 20, pageHeight - 10)
    pdf.text(`Page ${i} of ${totalPages}`, pageWidth - 30, pageHeight - 10)
    pdf.text('This report is confidential and for authorized use only.', 20, pageHeight - 5)
  }

    return pdf
  } catch (error) {
    console.error('Error in PDF generation:', error)
    throw new Error('Failed to generate PDF. Please try again.')
  }
}

// Helper functions for different content types
const addPersonalDetails = (pdf: jsPDF, data: any, yPos: number, pageWidth: number, addText: any, addLine: any, addRect: any, checkNewPage: any) => {
  let y = yPos
  
  // Extract details from the nested structure
  const details = data?.details || {}
  
  const personalInfo = [
    { label: 'Full Name', value: `${details.firstName || ''} ${details.surname || ''}`.trim() || 'N/A' },
    { label: 'Date of Birth', value: details.dateOfBirth || 'N/A' },
    { label: 'Gender', value: details.gender || 'N/A' },
    { label: 'Marital Status', value: details.maritalStatus || 'N/A' },
    { label: 'Nationality', value: details.nationality || 'N/A' },
    { label: 'BVN', value: details.bankVerificationNumber || 'N/A' },
    { label: 'NIN', value: details.nationalIdNumber || 'N/A' },
    { label: 'Passport Number', value: details.passportNumber || 'N/A' },
    { label: 'Email Address', value: details.emailAddress || 'N/A' },
    { label: 'Mobile Number', value: details.mobileNumber || 'N/A' },
    { label: 'Current Employer', value: details.currentEmployer || 'N/A' },
    { label: 'Residential Address', value: details.latestResidentialAddress || 'N/A' }
  ]
  
  personalInfo.forEach(detail => {
    checkNewPage(10)
    y = addText(`${detail.label}: ${detail.value}`, 15, y, pageWidth - 30)
    y += 5
  })
  
  return y
}

const addDelinquencyInfo = (pdf: jsPDF, data: any, yPos: number, pageWidth: number, addText: any, addLine: any, addRect: any, checkNewPage: any) => {
  let y = yPos
  
  y = addText(`Status: ${data.status || 'No Delinquency'}`, 15, y, pageWidth - 30, 12, data.status === 'Clear' ? '#059669' : '#DC2626')
  y += 5
  
  if (data.highestDelinquency) {
    y = addText(`Highest Delinquency:`, 15, y, pageWidth - 30, 10, '#000000')
    y += 5
    y = addText(`  Subscriber: ${data.highestDelinquency.subscriberName || 'N/A'}`, 20, y, pageWidth - 40, 9, '#6B7280')
    y += 5
    y = addText(`  Account: ${data.highestDelinquency.accountNumber || 'N/A'}`, 20, y, pageWidth - 40, 9, '#6B7280')
    y += 5
    y = addText(`  Days in Arrears: ${data.highestDelinquency.daysInArrears || '0'}`, 20, y, pageWidth - 40, 9, '#6B7280')
    y += 5
  }
  
  if (data.delinquencies && data.delinquencies.length > 0) {
    y = addText(`Delinquency History:`, 15, y, pageWidth - 30, 10, '#000000')
    y += 5
    data.delinquencies.forEach((delinquency: any, index: number) => {
      checkNewPage(15)
      y = addText(`${index + 1}. ${delinquency.type}: ${delinquency.status}`, 20, y, pageWidth - 40, 9, '#6B7280')
      y += 5
    })
  }
  
  return y
}

const addCreditAccountSummary = (pdf: jsPDF, data: any, yPos: number, pageWidth: number, addText: any, addLine: any, addRect: any, checkNewPage: any) => {
  let y = yPos
  
  // Summary cards
  const cardWidth = (pageWidth - 50) / 4
  const cardHeight = 20
  
  const summaries = [
    { title: 'Total Accounts', value: data.totalAccounts || '0' },
    { title: 'Active Accounts', value: data.activeAccounts || '0' },
    { title: 'Closed Accounts', value: data.closedAccounts || '0' },
    { title: 'Total Outstanding', value: data.totalOutstanding || '₦0.00' }
  ]
  
  summaries.forEach((summary, index) => {
    const x = 15 + (index * (cardWidth + 5))
    addRect(x, y, cardWidth, cardHeight, '#F3F4F6')
    addText(summary.title, x + 5, y + 8, cardWidth - 10, 8, '#6B7280')
    addText(summary.value, x + 5, y + 15, cardWidth - 10, 10, '#000000')
  })
  
  y += cardHeight + 10
  
  // Add account details if available
  if (data.accounts && data.accounts.length > 0) {
    y = addText('Account Details:', 15, y, pageWidth - 30, 10, '#000000')
    y += 5
    
    data.accounts.forEach((account: any, index: number) => {
      checkNewPage(25)
      addRect(10, y, pageWidth - 20, 20, '#F9FAFB')
      addText(`Account ${index + 1}: ${account.subscriberName || 'N/A'}`, 15, y + 8, pageWidth - 30, 10, '#000000')
      addText(`Number: ${account.accountNumber || 'N/A'}`, 15, y + 15, pageWidth - 30, 9, '#6B7280')
      y += 25
    })
  }
  
  return y
}

const addCreditAccountRating = (pdf: jsPDF, data: any, yPos: number, pageWidth: number, addText: any, addLine: any, addRect: any, checkNewPage: any) => {
  let y = yPos
  
  // Rating cards
  const cardWidth = (pageWidth - 50) / 4
  const cardHeight = 25
  
  const ratings = [
    { title: 'Overall Rating', value: data.overallRating || 'A', color: '#059669' },
    { title: 'Credit Score', value: data.creditScore || '720', color: '#2563EB' },
    { title: 'Risk Level', value: data.riskLevel || 'Low', color: '#7C3AED' },
    { title: 'Rating Date', value: data.ratingDate || '2024-12-15', color: '#EA580C' }
  ]
  
  ratings.forEach((rating, index) => {
    const x = 15 + (index * (cardWidth + 5))
    addRect(x, y, cardWidth, cardHeight, '#F3F4F6')
    addText(rating.title, x + 5, y + 8, cardWidth - 10, 8, '#6B7280')
    addText(rating.value, x + 5, y + 15, cardWidth - 10, 12, rating.color)
  })
  
  y += cardHeight + 15
  
  // Rating History
  if (data.ratingHistory && data.ratingHistory.length > 0) {
    y = addText('Rating History:', 15, y, pageWidth - 30, 12, '#000000')
    y += 5
    
    data.ratingHistory.forEach((history: any) => {
      checkNewPage(10)
      y = addText(`${history.date}: ${history.rating} (${history.score})`, 20, y, pageWidth - 40)
      y += 5
    })
  }
  
  return y
}

const addCreditAgreementsSummary = (pdf: jsPDF, data: any, yPos: number, pageWidth: number, addText: any, addLine: any, addRect: any, checkNewPage: any) => {
  let y = yPos
  
  y = addText(`Status: ${data.status || 'Active'}`, 15, y, pageWidth - 30, 12, '#059669')
  y += 10
  
  // Summary statistics
  const stats = [
    { label: 'Total Agreements', value: data.agreements?.length || '0' },
    { label: 'Open Accounts', value: data.agreements?.filter((a: any) => a.accountStatus === 'Open').length || '0' },
    { label: 'Non-Performing', value: data.agreements?.filter((a: any) => a.facilityClassification === 'Non-Performing').length || '0' },
    { label: 'Total Outstanding', value: data.agreements?.reduce((sum: number, a: any) => sum + parseFloat(a.outstandingBalance.replace(/,/g, '')), 0).toLocaleString('en-NG', { style: 'currency', currency: 'NGN' }) || '₦0.00' }
  ]
  
  stats.forEach(stat => {
    checkNewPage(10)
    y = addText(`${stat.label}: ${stat.value}`, 15, y, pageWidth - 30)
    y += 5
  })
  
  // Add agreement details if available
  if (data.agreements && data.agreements.length > 0) {
    y += 5
    y = addText('Agreement Details:', 15, y, pageWidth - 30, 10, '#000000')
    y += 5
    
    data.agreements.forEach((agreement: any, index: number) => {
      checkNewPage(30)
      addRect(10, y, pageWidth - 20, 25, '#F9FAFB')
      addText(`Agreement ${index + 1}: ${agreement.subscriberName || 'N/A'}`, 15, y + 8, pageWidth - 30, 10, '#000000')
      addText(`Account: ${agreement.accountNumber || 'N/A'}`, 15, y + 15, pageWidth - 30, 9, '#6B7280')
      addText(`Balance: ${agreement.outstandingBalance || 'N/A'}`, 15, y + 22, pageWidth - 30, 9, '#6B7280')
      y += 30
    })
  }
  
  return y
}

const addCreditAgreements = (pdf: jsPDF, data: any, yPos: number, pageWidth: number, addText: any, addLine: any, addRect: any, checkNewPage: any) => {
  let y = yPos
  
  if (data.agreements && data.agreements.length > 0) {
    data.agreements.forEach((agreement: any, index: number) => {
      checkNewPage(30)
      
      addRect(10, y, pageWidth - 20, 25, '#F9FAFB')
      addText(`Agreement ${index + 1}: ${agreement.subscriberName}`, 15, y + 8, pageWidth - 30, 10, '#000000')
      addText(`Account: ${agreement.accountNumber}`, 15, y + 15, pageWidth - 30, 9, '#6B7280')
      addText(`Balance: ${agreement.outstandingBalance}`, 15, y + 22, pageWidth - 30, 9, '#6B7280')
      
      y += 30
    })
  }
  
  return y
}

const addGuarantorDetails = (pdf: jsPDF, data: any, yPos: number, pageWidth: number, addText: any, addLine: any, addRect: any, checkNewPage: any) => {
  let y = yPos
  
  if (data.guarantors && data.guarantors.length > 0) {
    data.guarantors.forEach((guarantor: any, index: number) => {
      checkNewPage(25)
      
      addRect(10, y, pageWidth - 20, 20, '#F9FAFB')
      addText(`Guarantor ${index + 1}: ${guarantor.name}`, 15, y + 8, pageWidth - 30, 10, '#000000')
      addText(`Relationship: ${guarantor.relationship}`, 15, y + 15, pageWidth - 30, 9, '#6B7280')
      
      y += 25
    })
  } else {
    y = addText('No guarantor information available', 15, y, pageWidth - 30)
  }
  
  return y
}

const addCollateralInfo = (pdf: jsPDF, data: any, yPos: number, pageWidth: number, addText: any, addLine: any, addRect: any, checkNewPage: any) => {
  let y = yPos
  
  if (data.collaterals && data.collaterals.length > 0) {
    data.collaterals.forEach((collateral: any, index: number) => {
      checkNewPage(25)
      
      addRect(10, y, pageWidth - 20, 20, '#F9FAFB')
      addText(`Collateral ${index + 1}: ${collateral.type}`, 15, y + 8, pageWidth - 30, 10, '#000000')
      addText(`Value: ${collateral.value}`, 15, y + 15, pageWidth - 30, 9, '#6B7280')
      
      y += 25
    })
  } else {
    y = addText('No collateral information available', 15, y, pageWidth - 30)
  }
  
  return y
}

const addDishonouredChequeInfo = (pdf: jsPDF, data: any, yPos: number, pageWidth: number, addText: any, addLine: any, addRect: any, checkNewPage: any) => {
  let y = yPos
  
  y = addText(`Total Dishonoured Cheques: ${data.totalCount || '0'}`, 15, y, pageWidth - 30)
  y += 5
  y = addText(`Total Amount: ${data.totalAmount || '₦0.00'}`, 15, y, pageWidth - 30)
  y += 5
  y = addText(`Status: ${data.status || 'Clear'}`, 15, y, pageWidth - 30, 12, data.status === 'Clear' ? '#059669' : '#DC2626')
  
  return y
}

const addCompanyDirectorshipSummary = (pdf: jsPDF, data: any, yPos: number, pageWidth: number, addText: any, addLine: any, addRect: any, checkNewPage: any) => {
  let y = yPos
  
  if (data.directorships && data.directorships.length > 0) {
    data.directorships.forEach((directorship: any, index: number) => {
      checkNewPage(25)
      
      addRect(10, y, pageWidth - 20, 20, '#F9FAFB')
      addText(`Company ${index + 1}: ${directorship.companyName}`, 15, y + 8, pageWidth - 30, 10, '#000000')
      addText(`Position: ${directorship.position}`, 15, y + 15, pageWidth - 30, 9, '#6B7280')
      
      y += 25
    })
  } else {
    y = addText('No directorship information available', 15, y, pageWidth - 30)
  }
  
  return y
}

const addEnquiryHistory = (pdf: jsPDF, data: any, yPos: number, pageWidth: number, addText: any, addLine: any, addRect: any, checkNewPage: any) => {
  let y = yPos
  
  y = addText(`Total Enquiries (Last 12 Months): ${data.enquiries?.length || 0}`, 15, y, pageWidth - 30)
  y += 10
  
  if (data.enquiries && data.enquiries.length > 0) {
    data.enquiries.forEach((enquiry: any, index: number) => {
      checkNewPage(25)
      
      addRect(10, y, pageWidth - 20, 22, '#F9FAFB')
      addText(`${enquiry.enquiryDate || 'N/A'}: ${enquiry.nameOfEnquirer || 'N/A'}`, 15, y + 8, pageWidth - 30, 10, '#000000')
      addText(`Phone: ${enquiry.enquirerPhoneNumber || 'N/A'}`, 15, y + 15, pageWidth - 30, 9, '#6B7280')
      addText(`Reason: ${enquiry.reasonForEnquiry || 'N/A'}`, 15, y + 22, pageWidth - 30, 9, '#6B7280')
      
      y += 25
    })
  } else {
    y = addText('No enquiries found in the last 12 months.', 15, y, pageWidth - 30, 10, '#6B7280')
  }
  
  return y
}

const addIdentificationHistory = (pdf: jsPDF, data: any, yPos: number, pageWidth: number, addText: any, addLine: any, addRect: any, checkNewPage: any) => {
  let y = yPos
  
  if (data.identifications && data.identifications.length > 0) {
    data.identifications.forEach((id: any, index: number) => {
      checkNewPage(30)
      
      addRect(10, y, pageWidth - 20, 25, '#F9FAFB')
      addText(`ID ${index + 1}: ${id.identificationType || 'N/A'}`, 15, y + 8, pageWidth - 30, 10, '#000000')
      addText(`Update Date: ${id.bureauUpdateDate || 'N/A'}`, 15, y + 15, pageWidth - 30, 9, '#6B7280')
      addText(`Details: ${id.identificationDetails || 'N/A'}`, 15, y + 22, pageWidth - 30, 9, '#6B7280')
      
      y += 30
    })
  } else {
    y = addText('No identification history available', 15, y, pageWidth - 30)
  }
  
  return y
}

const addAddressHistory = (pdf: jsPDF, data: any, yPos: number, pageWidth: number, addText: any, addLine: any, addRect: any, checkNewPage: any) => {
  let y = yPos
  
  if (data.addresses && data.addresses.length > 0) {
    data.addresses.forEach((address: any, index: number) => {
      checkNewPage(35)
      
      addRect(10, y, pageWidth - 20, 30, '#F9FAFB')
      addText(`Address ${index + 1}: ${address.address || 'N/A'}`, 15, y + 8, pageWidth - 30, 10, '#000000')
      addText(`Update Date: ${address.bureauUpdate || 'N/A'}`, 15, y + 15, pageWidth - 30, 9, '#6B7280')
      
      // Combine address lines
      const fullAddress = [
        address.addressLine1,
        address.addressLine2,
        address.addressLine3,
        address.addressLine4
      ].filter(line => line && line.trim()).join(', ')
      
      addText(`Full Address: ${fullAddress || 'N/A'}`, 15, y + 22, pageWidth - 30, 9, '#6B7280')
      
      y += 35
    })
  } else {
    y = addText('No address history available', 15, y, pageWidth - 30)
  }
  
  return y
}

const addEmploymentHistory = (pdf: jsPDF, data: any, yPos: number, pageWidth: number, addText: any, addLine: any, addRect: any, checkNewPage: any) => {
  let y = yPos
  
  if (data.employments && data.employments.length > 0) {
    data.employments.forEach((employment: any, index: number) => {
      checkNewPage(35)
      
      addRect(10, y, pageWidth - 20, 30, '#F9FAFB')
      addText(`Employment ${index + 1}: ${employment.company || 'N/A'}`, 15, y + 8, pageWidth - 30, 10, '#000000')
      addText(`Position: ${employment.occupation || 'N/A'}`, 15, y + 15, pageWidth - 30, 9, '#6B7280')
      addText(`Update Date: ${employment.bureauUpdateDate || 'N/A'}`, 15, y + 22, pageWidth - 30, 9, '#6B7280')
      
      y += 35
    })
  } else if (data.employers && data.employers.length > 0) {
    // Handle alternative data structure
    data.employers.forEach((employment: any, index: number) => {
      checkNewPage(40)
      
      addRect(10, y, pageWidth - 20, 35, '#F9FAFB')
      addText(`Employment ${index + 1}: ${employment.company || 'N/A'}`, 15, y + 8, pageWidth - 30, 10, '#000000')
      addText(`Position: ${employment.position || 'N/A'}`, 15, y + 15, pageWidth - 30, 9, '#6B7280')
      addText(`Duration: ${employment.duration || 'N/A'}`, 15, y + 22, pageWidth - 30, 9, '#6B7280')
      addText(`Salary: ${employment.salary || 'N/A'}`, 15, y + 29, pageWidth - 30, 9, '#6B7280')
      
      y += 40
    })
  } else {
    y = addText('No employment history available', 15, y, pageWidth - 30)
  }
  
  return y
}

const addTelephoneHistory = (pdf: jsPDF, data: any, yPos: number, pageWidth: number, addText: any, addLine: any, addRect: any, checkNewPage: any) => {
  let y = yPos
  
  if (data.telephones && data.telephones.length > 0) {
    data.telephones.forEach((telephone: any, index: number) => {
      checkNewPage(40)
      
      addRect(10, y, pageWidth - 20, 35, '#F9FAFB')
      addText(`Telephone Record ${index + 1}:`, 15, y + 8, pageWidth - 30, 10, '#000000')
      
      if (telephone.homeTelephone) {
        addText(`Home: ${telephone.homeTelephone.telephoneNumber || 'N/A'} (Updated: ${telephone.homeTelephone.bureauUpdateDate || 'N/A'})`, 20, y + 15, pageWidth - 40, 9, '#6B7280')
      }
      if (telephone.workTelephone) {
        addText(`Work: ${telephone.workTelephone.telephoneNumber || 'N/A'} (Updated: ${telephone.workTelephone.bureauUpdateDate || 'N/A'})`, 20, y + 22, pageWidth - 40, 9, '#6B7280')
      }
      if (telephone.mobileNumber) {
        addText(`Mobile: ${telephone.mobileNumber.telephoneNumber || 'N/A'} (Updated: ${telephone.mobileNumber.bureauUpdateDate || 'N/A'})`, 20, y + 29, pageWidth - 40, 9, '#6B7280')
      }
      
      y += 40
    })
  } else if (data.phoneNumbers && data.phoneNumbers.length > 0) {
    // Handle alternative data structure
    data.phoneNumbers.forEach((phone: any, index: number) => {
      checkNewPage(25)
      
      addRect(10, y, pageWidth - 20, 20, '#F9FAFB')
      addText(`Phone ${index + 1}: ${phone.number || 'N/A'}`, 15, y + 8, pageWidth - 30, 10, '#000000')
      addText(`Period: ${phone.startDate || 'N/A'} - ${phone.endDate || 'Current'}`, 15, y + 15, pageWidth - 30, 9, '#6B7280')
      
      y += 25
    })
  } else {
    y = addText('No telephone history available', 15, y, pageWidth - 30)
  }
  
  return y
}

const addGenericContent = (pdf: jsPDF, data: any, yPos: number, pageWidth: number, addText: any, addLine: any, addRect: any, checkNewPage: any) => {
  let y = yPos
  
  if (typeof data === 'object' && data !== null) {
    Object.entries(data).forEach(([key, value]) => {
      checkNewPage(10)
      y = addText(`${key}: ${value}`, 15, y, pageWidth - 30)
      y += 5
    })
  } else {
    y = addText(String(data), 15, y, pageWidth - 30)
  }
  
  return y
}

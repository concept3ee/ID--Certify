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
    const addText = (text: string, x: number, y: number, maxWidth: number, fontSize: number = 10, color: string = '#000000', align: string = 'left') => {
      try {
        pdf.setFontSize(fontSize)
        pdf.setTextColor(color)
        const safeText = String(text || 'N/A')
        const lines = pdf.splitTextToSize(safeText, maxWidth)
        pdf.text(lines, x, y, { align: align as any })
        return y + (lines.length * fontSize * 0.4)
      } catch (error) {
        console.warn('Error adding text to PDF:', error)
        return y + fontSize * 0.4
      }
    }

    // Helper function to add a line
    const addLine = (x1: number, y1: number, x2: number, y2: number, color: string = '#E5E7EB', width: number = 0.5) => {
      pdf.setDrawColor(color)
      pdf.setLineWidth(width)
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
    
    // Section Title
    pdf.setFontSize(14)
    pdf.setFont('helvetica', 'bold')
    pdf.setTextColor('#FF8C00') // Orange color
    pdf.text('Candidate Information', 15, yPosition + 8)
    
    yPosition += 15
    
    // Candidate Details in two columns
    const leftColX = 15
    const rightColX = pageWidth / 2 + 10
    const rowHeight = 6
    
    // Left Column
    pdf.setFontSize(10)
    pdf.setFont('helvetica', 'normal')
    pdf.setTextColor('#374151') // Dark gray
    
    pdf.setFont('helvetica', 'bold')
    pdf.text('Name:', leftColX, yPosition)
    pdf.setFont('helvetica', 'normal')
    pdf.text(reportData.candidate.name, leftColX + 20, yPosition)
    
    pdf.setFont('helvetica', 'bold')
    pdf.text('Email:', leftColX, yPosition + rowHeight)
    pdf.setFont('helvetica', 'normal')
    pdf.text(reportData.candidate.email, leftColX + 20, yPosition + rowHeight)
    
    // Right Column
    pdf.setFont('helvetica', 'bold')
    pdf.text('Score:', rightColX, yPosition)
    pdf.setFont('helvetica', 'normal')
    pdf.text(String(reportData.candidate.score), rightColX + 20, yPosition)
    
    pdf.setFont('helvetica', 'bold')
    pdf.text('Completion Date:', rightColX, yPosition + rowHeight)
    pdf.setFont('helvetica', 'normal')
    pdf.text(reportData.completionDate, rightColX + 20, yPosition + rowHeight)
    
    yPosition += 20

    // Render Credit Profile Report sections
    const creditProfileCategory = reportData.categories['financialCredit']
    if (creditProfileCategory && creditProfileCategory.subTabs) {
      for (const subTabKey of Object.keys(creditProfileCategory.subTabs)) {
        const subTab = creditProfileCategory.subTabs[subTabKey]
        if (!subTab || !subTab.data) continue

        checkNewPage(30)
        
        // Section Title
        pdf.setFontSize(14)
        pdf.setFont('helvetica', 'bold')
        pdf.setTextColor('#FF8C00') // Orange color
        pdf.text(subTab.name, 15, yPosition)
        
        yPosition += 10

        // Render different sections based on type
        switch (subTabKey) {
          case 'personalDetails':
            yPosition = renderPersonalDetails(pdf, subTab.data, yPosition, pageWidth, addText, addLine, addRect, checkNewPage)
            break
          case 'delinquencyInformation':
            yPosition = renderDelinquencyInfo(pdf, subTab.data, yPosition, pageWidth, addText, addLine, addRect, checkNewPage)
            break
          case 'creditAccountSummary':
            yPosition = renderCreditAccountSummary(pdf, subTab.data, yPosition, pageWidth, addText, addLine, addRect, checkNewPage)
            break
          case 'creditAccountRating':
            yPosition = renderCreditAccountRating(pdf, subTab.data, yPosition, pageWidth, addText, addLine, addRect, checkNewPage)
            break
          case 'creditAgreementsSummary':
            yPosition = renderCreditAgreementsSummary(pdf, subTab.data, yPosition, pageWidth, addText, addLine, addRect, checkNewPage)
            break
          case 'creditAgreements':
            yPosition = renderCreditAgreements(pdf, subTab.data, yPosition, pageWidth, addText, addLine, addRect, checkNewPage)
            break
          case 'enquiryHistory':
            yPosition = renderEnquiryHistory(pdf, subTab.data, yPosition, pageWidth, addText, addLine, addRect, checkNewPage)
            break
          case 'identificationHistory':
            yPosition = renderIdentificationHistory(pdf, subTab.data, yPosition, pageWidth, addText, addLine, addRect, checkNewPage)
            break
          case 'addressHistory':
            yPosition = renderAddressHistory(pdf, subTab.data, yPosition, pageWidth, addText, addLine, addRect, checkNewPage)
            break
          case 'employmentHistory':
            yPosition = renderEmploymentHistory(pdf, subTab.data, yPosition, pageWidth, addText, addLine, addRect, checkNewPage)
            break
          case 'telephoneHistory':
            yPosition = renderTelephoneHistory(pdf, subTab.data, yPosition, pageWidth, addText, addLine, addRect, checkNewPage)
            break
          default:
            yPosition = renderGenericContent(pdf, subTab.data, yPosition, pageWidth, addText, addLine, addRect, checkNewPage)
            break
        }
        
        yPosition += 15 // Space after each section
      }
    }

    // Update total pages and add footers
    const totalPages = pdf.getNumberOfPages()
    for (let i = 1; i <= totalPages; i++) {
      pdf.setPage(i)
      addFooter(i, totalPages, pageWidth, pageHeight, addText, pdf)
    }

    return pdf
  } catch (error) {
    console.error('Error in PDF generation:', error)
    throw new Error('Failed to generate PDF. Please try again.')
  }
}

// Footer function
const addFooter = (pageNumber: number, totalPages: number, pageWidth: number, pageHeight: number, addText: any, pdf: jsPDF) => {
  pdf.setFontSize(8)
  pdf.setTextColor('#6B7280')
  pdf.text('iDCERTIFY Credit Profile Report', 20, pageHeight - 10)
  pdf.text(`Page ${pageNumber} of ${totalPages}`, pageWidth - 30, pageHeight - 10)
  pdf.text('This report is confidential and for authorized use only.', 20, pageHeight - 5)
}

// Personal Details Section
const renderPersonalDetails = (pdf: jsPDF, data: any, yPos: number, pageWidth: number, addText: any, addLine: any, addRect: any, checkNewPage: any) => {
  let y = yPos
  
  const details = data?.details || {}
  
  // Two-column layout
  const leftColX = 15
  const rightColX = pageWidth / 2 + 10
  const rowHeight = 6
  
  const leftColumnData = [
    { label: 'Full Name', value: `${details.firstName || ''} ${details.surname || ''}`.trim() || 'N/A' },
    { label: 'Date of Birth', value: details.dateOfBirth || 'N/A' },
    { label: 'Gender', value: details.gender || 'N/A' },
    { label: 'Marital Status', value: details.maritalStatus || 'N/A' },
    { label: 'Nationality', value: details.nationality || 'N/A' },
    { label: 'BVN', value: details.bankVerificationNumber || 'N/A' },
    { label: 'NIN', value: details.nationalIdNumber || 'N/A' },
    { label: 'Passport Number', value: details.passportNumber || 'N/A' }
  ]
  
  const rightColumnData = [
    { label: 'Email Address', value: details.emailAddress || 'N/A' },
    { label: 'Mobile Number', value: details.mobileNumber || 'N/A' },
    { label: 'Home Phone', value: details.homeTelephone || 'N/A' },
    { label: 'Work Phone', value: details.workTelephone || 'N/A' },
    { label: 'Current Employer', value: details.currentEmployer || 'N/A' },
    { label: 'Residential Address', value: details.latestResidentialAddress || 'N/A' },
    { label: 'Postal Address', value: details.latestPostalAddress || 'N/A' },
    { label: 'Property Ownership', value: details.propertyOwnershipType || 'N/A' }
  ]
  
  // Render left column
  leftColumnData.forEach((item, index) => {
    checkNewPage(10)
    const isEven = index % 2 === 0
    if (isEven) {
      addRect(leftColX - 5, y - 2, pageWidth / 2 - 15, rowHeight + 2, '#F9FAFB')
    }
    
    pdf.setFontSize(10)
    pdf.setFont('helvetica', 'bold')
    pdf.setTextColor('#374151')
    pdf.text(`${item.label}:`, leftColX, y)
    
    pdf.setFont('helvetica', 'normal')
    pdf.setTextColor('#6B7280')
    addText(item.value, leftColX + 35, y, pageWidth / 2 - 50)
    
    y += rowHeight
  })
  
  // Reset y for right column
  y = yPos
  
  // Render right column
  rightColumnData.forEach((item, index) => {
    checkNewPage(10)
    const isEven = index % 2 === 0
    if (isEven) {
      addRect(rightColX - 5, y - 2, pageWidth / 2 - 15, rowHeight + 2, '#F9FAFB')
    }
    
    pdf.setFontSize(10)
    pdf.setFont('helvetica', 'bold')
    pdf.setTextColor('#374151')
    pdf.text(`${item.label}:`, rightColX, y)
    
    pdf.setFont('helvetica', 'normal')
    pdf.setTextColor('#6B7280')
    addText(item.value, rightColX + 35, y, pageWidth / 2 - 50)
    
    y += rowHeight
  })
  
  return Math.max(y, yPos + leftColumnData.length * rowHeight)
}

// Delinquency Information Section
const renderDelinquencyInfo = (pdf: jsPDF, data: any, yPos: number, pageWidth: number, addText: any, addLine: any, addRect: any, checkNewPage: any) => {
  let y = yPos
  
  // Status
  pdf.setFontSize(12)
  pdf.setFont('helvetica', 'bold')
  pdf.setTextColor(data.status === 'Clear' ? '#059669' : '#DC2626')
  pdf.text(`Status: ${data.status || 'No Delinquency'}`, 15, y)
  y += 8
  
  if (data.highestDelinquency) {
    pdf.setFontSize(10)
    pdf.setFont('helvetica', 'bold')
    pdf.setTextColor('#374151')
    pdf.text('Highest Delinquency:', 15, y)
    y += 6
    
    pdf.setFont('helvetica', 'normal')
    pdf.setTextColor('#6B7280')
    pdf.text(`  Subscriber: ${data.highestDelinquency.subscriberName || 'N/A'}`, 20, y)
    y += 5
    pdf.text(`  Account: ${data.highestDelinquency.accountNumber || 'N/A'}`, 20, y)
    y += 5
    pdf.text(`  Days in Arrears: ${data.highestDelinquency.daysInArrears || '0'}`, 20, y)
    y += 8
  }
  
  if (data.delinquencies && data.delinquencies.length > 0) {
    pdf.setFontSize(10)
    pdf.setFont('helvetica', 'bold')
    pdf.setTextColor('#374151')
    pdf.text('Delinquency History:', 15, y)
    y += 6
    
    data.delinquencies.forEach((delinquency: any, index: number) => {
      checkNewPage(10)
      pdf.setFont('helvetica', 'normal')
      pdf.setTextColor('#6B7280')
      pdf.text(`${index + 1}. ${delinquency.type}: ${delinquency.status}`, 20, y)
      y += 5
    })
  }
  
  return y
}

// Credit Account Summary Section
const renderCreditAccountSummary = (pdf: jsPDF, data: any, yPos: number, pageWidth: number, addText: any, addLine: any, addRect: any, checkNewPage: any) => {
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
  
  return y
}

// Credit Account Rating Section
const renderCreditAccountRating = (pdf: jsPDF, data: any, yPos: number, pageWidth: number, addText: any, addLine: any, addRect: any, checkNewPage: any) => {
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
  
  return y
}

// Credit Agreements Summary Section
const renderCreditAgreementsSummary = (pdf: jsPDF, data: any, yPos: number, pageWidth: number, addText: any, addLine: any, addRect: any, checkNewPage: any) => {
  let y = yPos
  
  pdf.setFontSize(12)
  pdf.setFont('helvetica', 'bold')
  pdf.setTextColor('#059669')
  pdf.text(`Status: ${data.status || 'Active'}`, 15, y)
  y += 10
  
  // Summary statistics
  const stats = [
    { label: 'Total Agreements', value: data.agreements?.length || '0' },
    { label: 'Open Accounts', value: data.agreements?.filter((a: any) => a.accountStatus === 'Open').length || '0' },
    { label: 'Non-Performing', value: data.agreements?.filter((a: any) => a.facilityClassification === 'Non-Performing').length || '0' }
  ]
  
  stats.forEach(stat => {
    checkNewPage(10)
    pdf.setFontSize(10)
    pdf.setFont('helvetica', 'normal')
    pdf.setTextColor('#374151')
    pdf.text(`${stat.label}: ${stat.value}`, 15, y)
    y += 5
  })
  
  return y
}

// Credit Agreements Section (Detailed)
const renderCreditAgreements = (pdf: jsPDF, data: any, yPos: number, pageWidth: number, addText: any, addLine: any, addRect: any, checkNewPage: any) => {
  let y = yPos
  
  if (data.agreements && data.agreements.length > 0) {
    data.agreements.forEach((agreement: any, index: number) => {
      checkNewPage(60)
      
      // Agreement Title
      pdf.setFontSize(12)
      pdf.setFont('helvetica', 'bold')
      pdf.setTextColor('#374151')
      pdf.text(`Details of Credit Agreement with "${agreement.subscriberName || 'N/A'}" for Account Number: ${agreement.accountNumber || 'N/A'}`, 15, y)
      y += 10
      
      // Account Information Section
      pdf.setFontSize(14)
      pdf.setFont('helvetica', 'bold')
      pdf.setTextColor('#FF8C00')
      pdf.text('Account Information', 15, y)
      y += 8
      
      // Two-column layout for account info
      const leftColX = 15
      const rightColX = pageWidth / 2 + 10
      const rowHeight = 6
      
      const leftColumnData = [
        { label: 'Subscriber Name', value: agreement.subscriberName || 'N/A' },
        { label: 'Effective Date', value: agreement.effectiveDate || 'N/A' },
        { label: 'Type of Credit Facility', value: agreement.typeOfCreditFacility || 'N/A' },
        { label: 'Credit / Debit', value: agreement.creditDebit || 'N/A' },
        { label: 'Current Balance', value: agreement.currentBalance || 'N/A' },
        { label: 'Arrear Amount', value: agreement.arrearAmount || 'N/A' },
        { label: 'Facility Classification', value: agreement.facilityClassification || 'N/A' },
        { label: 'Account Status', value: agreement.accountStatus || 'N/A' },
        { label: 'Repayment Frequency', value: agreement.repaymentFrequency || 'N/A' }
      ]
      
      const rightColumnData = [
        { label: 'Account Number', value: agreement.accountNumber || 'N/A' },
        { label: 'Bureau Updated Date', value: agreement.bureauUpdatedDate || 'N/A' },
        { label: 'Currency', value: agreement.currency || 'N/A' },
        { label: 'Loan Amount/Credit Limit', value: agreement.loanAmount || 'N/A' },
        { label: 'Instalment Amount', value: agreement.instalmentAmount || 'N/A' },
        { label: 'Expiry Date', value: agreement.expiryDate || 'N/A' },
        { label: 'Last Payment Date', value: agreement.lastPaymentDate || 'N/A' },
        { label: 'Loan Duration', value: agreement.loanDuration || 'N/A' }
      ]
      
      // Render left column
      leftColumnData.forEach((item, itemIndex) => {
        const isEven = itemIndex % 2 === 0
        if (isEven) {
          addRect(leftColX - 5, y - 2, pageWidth / 2 - 15, rowHeight + 2, '#F9FAFB')
        }
        
        pdf.setFontSize(10)
        pdf.setFont('helvetica', 'bold')
        pdf.setTextColor('#374151')
        pdf.text(`${item.label}:`, leftColX, y)
        
        pdf.setFont('helvetica', 'normal')
        pdf.setTextColor('#6B7280')
        addText(item.value, leftColX + 35, y, pageWidth / 2 - 50)
        
        y += rowHeight
      })
      
      // Reset y for right column
      let rightY = yPos + 18
      
      // Render right column
      rightColumnData.forEach((item, itemIndex) => {
        const isEven = itemIndex % 2 === 0
        if (isEven) {
          addRect(rightColX - 5, rightY - 2, pageWidth / 2 - 15, rowHeight + 2, '#F9FAFB')
        }
        
        pdf.setFontSize(10)
        pdf.setFont('helvetica', 'bold')
        pdf.setTextColor('#374151')
        pdf.text(`${item.label}:`, rightColX, rightY)
        
        pdf.setFont('helvetica', 'normal')
        pdf.setTextColor('#6B7280')
        addText(item.value, rightColX + 35, rightY, pageWidth / 2 - 50)
        
        rightY += rowHeight
      })
      
      y = Math.max(y, rightY) + 10
      
      // 24 Months Payment History Section
      pdf.setFontSize(14)
      pdf.setFont('helvetica', 'bold')
      pdf.setTextColor('#FF8C00')
      pdf.text('24 Months Payment History', 15, y)
      y += 8
      
      // Payment history grid
      const months = [
        'SEP 2025', 'AUG 2025', 'JUL 2025', 'JUN 2025', 'MAY 2025', 'APR 2025',
        'MAR 2025', 'FEB 2025', 'JAN 2025', 'DEC 2024', 'NOV 2024', 'OCT 2024',
        'SEP 2024', 'AUG 2024', 'JUL 2024', 'JUN 2024', 'MAY 2024', 'APR 2024',
        'MAR 2024', 'FEB 2024', 'JAN 2024', 'DEC 2023', 'NOV 2023', 'OCT 2023'
      ]
      
      const cellWidth = (pageWidth - 40) / 12
      const cellHeight = 8
      
      // Render months in two rows
      for (let row = 0; row < 2; row++) {
        for (let col = 0; col < 12; col++) {
          const monthIndex = row * 12 + col
          if (monthIndex >= months.length) break
          
          const x = 15 + (col * cellWidth)
          const currentY = y + (row * (cellHeight + 8))
          
          // Month header
          pdf.setFontSize(8)
          pdf.setFont('helvetica', 'normal')
          pdf.setTextColor('#374151')
          pdf.text(months[monthIndex], x + 2, currentY + 4)
          
          // Status cell
          const status = Math.random() > 0.5 ? 'OK' : 'ND' // Random status for demo
          const statusColor = status === 'OK' ? '#059669' : '#3B82F6'
          const textColor = status === 'OK' ? '#FFFFFF' : '#1F2937'
          
          addRect(x, currentY + 5, cellWidth - 2, cellHeight, statusColor)
          pdf.setTextColor(textColor)
          pdf.setFont('helvetica', 'bold')
          pdf.text(status, x + cellWidth/2 - 2, currentY + 9, { align: 'center' })
        }
      }
      
      y += 25
    })
  }
  
  return y
}

// Enquiry History Section
const renderEnquiryHistory = (pdf: jsPDF, data: any, yPos: number, pageWidth: number, addText: any, addLine: any, addRect: any, checkNewPage: any) => {
  let y = yPos
  
  pdf.setFontSize(12)
  pdf.setFont('helvetica', 'bold')
  pdf.setTextColor('#374151')
  pdf.text(`Total Enquiries (Last 12 Months): ${data.enquiries?.length || 0}`, 15, y)
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
    addText('No enquiries found in the last 12 months.', 15, y, pageWidth - 30, 10, '#6B7280')
    y += 10
  }
  
  return y
}

// Identification History Section
const renderIdentificationHistory = (pdf: jsPDF, data: any, yPos: number, pageWidth: number, addText: any, addLine: any, addRect: any, checkNewPage: any) => {
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
    addText('No identification history available', 15, y, pageWidth - 30)
    y += 10
  }
  
  return y
}

// Address History Section
const renderAddressHistory = (pdf: jsPDF, data: any, yPos: number, pageWidth: number, addText: any, addLine: any, addRect: any, checkNewPage: any) => {
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
    addText('No address history available', 15, y, pageWidth - 30)
    y += 10
  }
  
  return y
}

// Employment History Section
const renderEmploymentHistory = (pdf: jsPDF, data: any, yPos: number, pageWidth: number, addText: any, addLine: any, addRect: any, checkNewPage: any) => {
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
    addText('No employment history available', 15, y, pageWidth - 30)
    y += 10
  }
  
  return y
}

// Telephone History Section
const renderTelephoneHistory = (pdf: jsPDF, data: any, yPos: number, pageWidth: number, addText: any, addLine: any, addRect: any, checkNewPage: any) => {
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
    addText('No telephone history available', 15, y, pageWidth - 30)
    y += 10
  }
  
  return y
}

// Generic Content Section
const renderGenericContent = (pdf: jsPDF, data: any, yPos: number, pageWidth: number, addText: any, addLine: any, addRect: any, checkNewPage: any) => {
  let y = yPos
  
  // Render key-value pairs
  Object.entries(data).forEach(([key, value], index) => {
    checkNewPage(10)
    pdf.setFontSize(10)
    pdf.setFont('helvetica', 'bold')
    pdf.setTextColor('#374151')
    pdf.text(`${key}:`, 15, y)
    
    pdf.setFont('helvetica', 'normal')
    pdf.setTextColor('#6B7280')
    addText(String(value || 'N/A'), 15 + 50, y, pageWidth - 70)
    y += 6
  })
  
  return y
}
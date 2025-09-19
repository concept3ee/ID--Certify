import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import BackgroundCheckRequestForm from '../../components/organisation/BackgroundCheckRequestForm'

const BackgroundCheckRequest = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  
  const handleSave = (requestData: any) => {
    console.log('Saving request:', requestData)
    // In a real app, this would save to the backend
    navigate('/background-check')
  }

  const handleClose = () => {
    navigate('/background-check')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <BackgroundCheckRequestForm
        requestId={id}
        onSave={handleSave}
        onClose={handleClose}
      />
    </div>
  )
}

export default BackgroundCheckRequest

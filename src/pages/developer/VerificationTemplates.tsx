import React from 'react'
import { DeveloperUser } from '../../types'

interface VerificationTemplatesProps {
  user: DeveloperUser
}

const VerificationTemplates: React.FC<VerificationTemplatesProps> = ({ user }) => {
  console.log('VerificationTemplates component rendering with user:', user)
  
  // Ensure verificationTemplates exists, provide empty array as fallback
  const verificationTemplates = user?.verificationTemplates || []
  
  console.log('verificationTemplates:', verificationTemplates)

  return (
    <div style={{ padding: '20px', backgroundColor: '#f0f9ff', border: '2px solid #3b82f6', borderRadius: '8px' }}>
      <h1 style={{ color: '#1e40af', fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>
        🔧 FLOW BUILDER DEBUG MODE
      </h1>
      
      <div style={{ backgroundColor: 'white', padding: '16px', borderRadius: '8px', marginBottom: '16px' }}>
        <h2 style={{ color: '#374151', marginBottom: '12px' }}>Component Status:</h2>
        <p><strong>✅ Component is rendering!</strong></p>
        <p><strong>User:</strong> {user ? 'Present' : 'Missing'}</p>
        <p><strong>User Name:</strong> {user?.name || 'N/A'}</p>
        <p><strong>User Type:</strong> {user?.userType || 'N/A'}</p>
        <p><strong>Templates Count:</strong> {verificationTemplates.length}</p>
      </div>

      <div style={{ backgroundColor: 'white', padding: '16px', borderRadius: '8px' }}>
        <h2 style={{ color: '#374151', marginBottom: '12px' }}>Templates Data:</h2>
        {verificationTemplates.length > 0 ? (
          <ul style={{ listStyle: 'disc', paddingLeft: '20px' }}>
            {verificationTemplates.map((template, index) => (
              <li key={template.id} style={{ marginBottom: '8px', color: '#374151' }}>
                <strong>{template.name}</strong> - {template.description}
                <br />
                <small style={{ color: '#6b7280' }}>
                  Fields: {template.fields.length} | Usage: {template.usageCount} | Active: {template.isActive ? 'Yes' : 'No'}
                </small>
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ color: '#6b7280' }}>No templates found</p>
        )}
      </div>

      <div style={{ backgroundColor: '#fef3c7', padding: '16px', borderRadius: '8px', marginTop: '16px' }}>
        <h3 style={{ color: '#92400e', marginBottom: '8px' }}>⚠️ Debug Information:</h3>
        <p style={{ color: '#92400e', fontSize: '14px' }}>
          If you can see this message, the component is working correctly. 
          The issue might be with the complex UI elements or modal overlays.
        </p>
      </div>
    </div>
  )
}

export default VerificationTemplates
import React, { useState } from 'react'
import { VerificationTemplate, RequestedData } from '../../types'
import { Plus, Trash2, Save, Eye, Settings, FileText, Calendar, CheckSquare, Upload } from 'lucide-react'

interface VerificationTemplateBuilderProps {
  template?: VerificationTemplate
  onSave: (template: Omit<VerificationTemplate, 'id' | 'developerId' | 'createdAt' | 'updatedAt'>) => void
  onCancel: () => void
}

const VerificationTemplateBuilder: React.FC<VerificationTemplateBuilderProps> = ({
  template,
  onSave,
  onCancel
}) => {
  const [name, setName] = useState(template?.name || '')
  const [description, setDescription] = useState(template?.description || '')
  const [costPerVerification, setCostPerVerification] = useState(template?.costPerVerification || 0)
  const [fields, setFields] = useState<RequestedData[]>(template?.fields || [])
  const [isActive, setIsActive] = useState(template?.isActive ?? true)

  const addField = () => {
    const newField: RequestedData = {
      field: `field_${fields.length + 1}`,
      label: '',
      type: 'text',
      required: false,
      description: '',
      options: []
    }
    setFields([...fields, newField])
  }

  const updateField = (index: number, field: Partial<RequestedData>) => {
    const updatedFields = [...fields]
    updatedFields[index] = { ...updatedFields[index], ...field }
    setFields(updatedFields)
  }

  const removeField = (index: number) => {
    setFields(fields.filter((_, i) => i !== index))
  }

  const addOption = (fieldIndex: number) => {
    const updatedFields = [...fields]
    if (!updatedFields[fieldIndex].options) {
      updatedFields[fieldIndex].options = []
    }
    updatedFields[fieldIndex].options!.push('')
    setFields(updatedFields)
  }

  const updateOption = (fieldIndex: number, optionIndex: number, value: string) => {
    const updatedFields = [...fields]
    if (updatedFields[fieldIndex].options) {
      updatedFields[fieldIndex].options![optionIndex] = value
      setFields(updatedFields)
    }
  }

  const removeOption = (fieldIndex: number, optionIndex: number) => {
    const updatedFields = [...fields]
    if (updatedFields[fieldIndex].options) {
      updatedFields[fieldIndex].options!.splice(optionIndex, 1)
      setFields(updatedFields)
    }
  }

  const handleSave = () => {
    if (!name.trim()) {
      alert('Template name is required')
      return
    }

    if (fields.length === 0) {
      alert('At least one field is required')
      return
    }

    const templateData = {
      name: name.trim(),
      description: description.trim(),
      fields,
      isActive,
      costPerVerification,
      usageCount: template?.usageCount || 0
    }

    onSave(templateData)
  }

  const getFieldIcon = (type: string) => {
    switch (type) {
      case 'text': return <FileText className="w-4 h-4" />
      case 'date': return <Calendar className="w-4 h-4" />
      case 'select': return <Settings className="w-4 h-4" />
      case 'boolean': return <CheckSquare className="w-4 h-4" />
      case 'file': return <Upload className="w-4 h-4" />
      default: return <FileText className="w-4 h-4" />
    }
  }

  return (
    <div className="bg-white rounded-lg border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          {template ? 'Edit Template' : 'Create New Template'}
        </h2>
        <div className="flex items-center space-x-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
          >
            <Save className="w-4 h-4 mr-2 inline" />
            Save Template
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Template Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter template name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cost per Verification ($)
            </label>
            <input
              type="number"
              value={costPerVerification}
              onChange={(e) => setCostPerVerification(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0.00"
              min="0"
              step="0.01"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Describe what this template is used for..."
          />
        </div>

        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700">Active (available for use)</span>
        </div>

        {/* Fields Section */}
        <div className="border-t pt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Verification Fields</h3>
            <button
              onClick={addField}
              className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Field
            </button>
          </div>

          <div className="space-y-4">
            {fields.map((field, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    {getFieldIcon(field.type)}
                    <span className="text-sm font-medium text-gray-700">
                      Field {index + 1}
                    </span>
                  </div>
                  <button
                    onClick={() => removeField(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Field Label *
                    </label>
                    <input
                      type="text"
                      value={field.label}
                      onChange={(e) => updateField(index, { label: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Full Name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Field Type
                    </label>
                    <select
                      value={field.type}
                      onChange={(e) => updateField(index, { type: e.target.value as any })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="text">Text</option>
                      <option value="date">Date</option>
                      <option value="select">Select</option>
                      <option value="boolean">Boolean</option>
                      <option value="file">File Upload</option>
                    </select>
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <input
                    type="text"
                    value={field.description || ''}
                    onChange={(e) => updateField(index, { description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Optional description for this field"
                  />
                </div>

                <div className="mt-4 flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={field.required}
                    onChange={(e) => updateField(index, { required: e.target.checked })}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Required field</span>
                </div>

                {/* Options for select type */}
                {field.type === 'select' && (
                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Options
                      </label>
                      <button
                        onClick={() => addOption(index)}
                        className="text-sm text-blue-600 hover:text-blue-700"
                      >
                        <Plus className="w-4 h-4 inline mr-1" />
                        Add Option
                      </button>
                    </div>
                    <div className="space-y-2">
                      {field.options?.map((option, optionIndex) => (
                        <div key={optionIndex} className="flex items-center space-x-2">
                          <input
                            type="text"
                            value={option}
                            onChange={(e) => updateOption(index, optionIndex, e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder={`Option ${optionIndex + 1}`}
                          />
                          <button
                            onClick={() => removeOption(index, optionIndex)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {fields.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Eye className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>No fields added yet. Click "Add Field" to get started.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default VerificationTemplateBuilder

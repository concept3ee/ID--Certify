import React, { useState } from 'react'
import { ChevronDown, ChevronUp, Eye, MoreVertical } from 'lucide-react'

interface MobileTableColumn {
  key: string
  label: string
  width?: string
  render?: (value: any, row: any) => React.ReactNode
  sortable?: boolean
}

interface MobileTableProps {
  data: any[]
  columns: MobileTableColumn[]
  onRowClick?: (row: any) => void
  className?: string
  maxHeight?: string
  showCardView?: boolean
  cardViewBreakpoint?: 'sm' | 'md' | 'lg'
}

const MobileTable: React.FC<MobileTableProps> = ({
  data,
  columns,
  onRowClick,
  className = '',
  maxHeight = 'max-h-96',
  showCardView = true,
  cardViewBreakpoint = 'md'
}) => {
  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set())

  const handleSort = (columnKey: string) => {
    if (sortColumn === columnKey) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortColumn(columnKey)
      setSortDirection('asc')
    }
  }

  const sortedData = React.useMemo(() => {
    if (!sortColumn) return data

    return [...data].sort((a, b) => {
      const aVal = a[sortColumn]
      const bVal = b[sortColumn]
      
      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1
      return 0
    })
  }, [data, sortColumn, sortDirection])

  const toggleRowExpansion = (rowId: string) => {
    const newExpanded = new Set(expandedRows)
    if (newExpanded.has(rowId)) {
      newExpanded.delete(rowId)
    } else {
      newExpanded.add(rowId)
    }
    setExpandedRows(newExpanded)
  }

  const renderCardView = (row: any, index: number) => {
    const rowId = row.id || index.toString()
    const isExpanded = expandedRows.has(rowId)
    const primaryColumns = columns.slice(0, 2)
    const secondaryColumns = columns.slice(2)

    return (
      <div
        key={rowId}
        className="bg-white border border-gray-200 rounded-lg mb-3 shadow-sm hover:shadow-md transition-shadow"
      >
        {/* Primary Information */}
        <div
          className="p-4 cursor-pointer"
          onClick={() => onRowClick?.(row)}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              {primaryColumns.map((column) => (
                <div key={column.key} className="mb-2 last:mb-0">
                  <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {column.label}
                  </div>
                  <div className="text-sm font-medium text-gray-900 truncate">
                    {column.render ? column.render(row[column.key], row) : row[column.key]}
                  </div>
                </div>
              ))}
            </div>
            
            {secondaryColumns.length > 0 && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  toggleRowExpansion(rowId)
                }}
                className="ml-4 p-2 text-gray-400 hover:text-gray-600 transition-colors touch-manipulation"
                style={{ minWidth: '44px', minHeight: '44px' }}
              >
                {isExpanded ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </button>
            )}
          </div>
        </div>

        {/* Expanded Details */}
        {isExpanded && secondaryColumns.length > 0 && (
          <div className="border-t border-gray-100 p-4 bg-gray-50">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {secondaryColumns.map((column) => (
                <div key={column.key}>
                  <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                    {column.label}
                  </div>
                  <div className="text-sm text-gray-900">
                    {column.render ? column.render(row[column.key], row) : row[column.key]}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  const renderTableView = () => (
    <div className={`overflow-x-auto ${maxHeight} overflow-y-auto`}>
      <table className="w-full">
        <thead className="bg-gray-50 sticky top-0 z-10">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className={`px-4 py-3 text-left text-xs font-semibold text-gray-700 border-r border-gray-200 ${
                  column.width || 'min-w-[120px]'
                } ${column.sortable ? 'cursor-pointer hover:bg-gray-100' : ''}`}
                onClick={() => column.sortable && handleSort(column.key)}
              >
                <div className="flex items-center space-x-1">
                  <span>{column.label}</span>
                  {column.sortable && sortColumn === column.key && (
                    <span className="text-blue-600">
                      {sortDirection === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {sortedData.map((row, index) => (
            <tr
              key={row.id || index}
              className="hover:bg-blue-50 cursor-pointer transition-colors duration-150"
              onClick={() => onRowClick?.(row)}
            >
              {columns.map((column) => (
                <td
                  key={column.key}
                  className="px-4 py-3 text-sm text-gray-900 border-r border-gray-200"
                >
                  {column.render ? column.render(row[column.key], row) : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  return (
    <div className={`bg-white border border-gray-200 rounded-lg overflow-hidden ${className}`}>
      {showCardView ? (
        <div className={`${cardViewBreakpoint}:hidden`}>
          <div className="p-4">
            {sortedData.map((row, index) => renderCardView(row, index))}
          </div>
        </div>
      ) : null}
      
      <div className={`hidden ${cardViewBreakpoint}:block`}>
        {renderTableView()}
      </div>
    </div>
  )
}

export default MobileTable

'use client';

import { useState } from 'react';
import { Filter, X, Download } from 'lucide-react';
import { useExpenses } from '@/contexts/ExpenseContext';
import { EXPENSE_CATEGORIES, ExpenseCategory } from '@/types/expense';
import { exportToCSV } from '@/utils/storage';

export default function ExpenseFilters() {
  const { filters, setFilters, clearFilters, expenses } = useExpenses();
  const [isOpen, setIsOpen] = useState(false);
  const [localFilters, setLocalFilters] = useState(filters);

  const handleApplyFilters = () => {
    setFilters(localFilters);
    setIsOpen(false);
  };

  const handleClearFilters = () => {
    const emptyFilters = {};
    setLocalFilters(emptyFilters);
    clearFilters();
    setIsOpen(false);
  };

  const handleExport = () => {
    exportToCSV(expenses);
  };

  const hasActiveFilters = Object.keys(filters).some(key => 
    filters[key as keyof typeof filters] !== undefined && 
    filters[key as keyof typeof filters] !== ''
  );

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center space-x-3">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
            hasActiveFilters
              ? 'bg-primary-50 border-primary-200 text-primary-700'
              : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
        >
          <Filter className="h-4 w-4" />
          <span>Filters</span>
          {hasActiveFilters && (
            <span className="bg-primary-600 text-white text-xs px-2 py-1 rounded-full">
              {Object.keys(filters).filter(key => filters[key as keyof typeof filters]).length}
            </span>
          )}
        </button>

        {hasActiveFilters && (
          <button
            onClick={handleClearFilters}
            className="flex items-center space-x-1 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="h-4 w-4" />
            <span className="text-sm">Clear</span>
          </button>
        )}
      </div>

      <button
        onClick={handleExport}
        className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
      >
        <Download className="h-4 w-4" />
        <span>Export CSV</span>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                value={localFilters.category || ''}
                onChange={(e) => setLocalFilters(prev => ({
                  ...prev,
                  category: e.target.value as ExpenseCategory || undefined
                }))}
                className="input-field"
              >
                <option value="">All Categories</option>
                {EXPENSE_CATEGORIES.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                type="date"
                value={localFilters.startDate || ''}
                onChange={(e) => setLocalFilters(prev => ({
                  ...prev,
                  startDate: e.target.value || undefined
                }))}
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <input
                type="date"
                value={localFilters.endDate || ''}
                onChange={(e) => setLocalFilters(prev => ({
                  ...prev,
                  endDate: e.target.value || undefined
                }))}
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Search
              </label>
              <input
                type="text"
                value={localFilters.searchTerm || ''}
                onChange={(e) => setLocalFilters(prev => ({
                  ...prev,
                  searchTerm: e.target.value || undefined
                }))}
                placeholder="Search description..."
                className="input-field"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-4">
            <button
              onClick={() => setIsOpen(false)}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              onClick={handleApplyFilters}
              className="btn-primary"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
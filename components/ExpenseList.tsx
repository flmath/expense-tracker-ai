'use client';

import { useMemo, useState } from 'react';
import { Edit2, Trash2, Calendar, Tag } from 'lucide-react';
import { useExpenses } from '@/contexts/ExpenseContext';
import { formatCurrency } from '@/utils/currency';
import { formatDate, isDateInRange } from '@/utils/date';
import { Expense } from '@/types/expense';
import EditExpenseModal from './EditExpenseModal';

export default function ExpenseList() {
  const { expenses, filters, deleteExpense } = useExpenses();
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

  const filteredExpenses = useMemo(() => {
    return expenses.filter(expense => {
      // Category filter
      if (filters.category && expense.category !== filters.category) {
        return false;
      }

      // Date range filter
      if (!isDateInRange(expense.date, filters.startDate, filters.endDate)) {
        return false;
      }

      // Search filter
      if (filters.searchTerm) {
        const searchLower = filters.searchTerm.toLowerCase();
        return expense.description.toLowerCase().includes(searchLower) ||
               expense.category.toLowerCase().includes(searchLower);
      }

      return true;
    }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [expenses, filters]);

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      deleteExpense(id);
    }
  };

  if (filteredExpenses.length === 0) {
    return (
      <div className="card text-center py-12">
        <div className="text-gray-400 mb-4">
          <Calendar className="h-12 w-12 mx-auto" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No expenses found</h3>
        <p className="text-gray-500">
          {expenses.length === 0 
            ? "Start by adding your first expense!" 
            : "Try adjusting your filters to see more expenses."}
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4">
        {filteredExpenses.map((expense) => (
          <div key={expense.id} className="card hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-medium text-gray-900">
                    {expense.description}
                  </h3>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                    <Tag className="h-3 w-3 mr-1" />
                    {expense.category}
                  </span>
                </div>
                <div className="flex items-center text-sm text-gray-500 space-x-4">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(expense.date)}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">
                    {formatCurrency(expense.amount)}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setEditingExpense(expense)}
                    className="p-2 text-gray-400 hover:text-primary-600 transition-colors"
                    title="Edit expense"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(expense.id)}
                    className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                    title="Delete expense"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editingExpense && (
        <EditExpenseModal
          expense={editingExpense}
          isOpen={!!editingExpense}
          onClose={() => setEditingExpense(null)}
        />
      )}
    </>
  );
}
'use client';

import { useMemo } from 'react';
import { TrendingUp, Calendar, PieChart, DollarSign } from 'lucide-react';
import { useExpenses } from '@/contexts/ExpenseContext';
import { formatCurrency } from '@/utils/currency';
import { getCurrentMonth, isDateInRange } from '@/utils/date';
import { ExpenseCategory } from '@/types/expense';

export default function Dashboard() {
  const { expenses } = useExpenses();

  const stats = useMemo(() => {
    const currentMonth = getCurrentMonth();
    const currentMonthExpenses = expenses.filter(expense =>
      isDateInRange(expense.date, currentMonth.start.toISOString().split('T')[0], currentMonth.end.toISOString().split('T')[0])
    );

    const totalSpending = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const monthlySpending = currentMonthExpenses.reduce((sum, expense) => sum + expense.amount, 0);

    const categoryTotals = expenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {} as Record<ExpenseCategory, number>);

    const topCategory = Object.entries(categoryTotals).reduce(
      (max, [category, amount]) => amount > max.amount ? { category, amount } : max,
      { category: 'None', amount: 0 }
    );

    return {
      totalSpending,
      monthlySpending,
      totalExpenses: expenses.length,
      topCategory: topCategory.category !== 'None' ? topCategory : null,
      categoryTotals
    };
  }, [expenses]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Spending</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(stats.totalSpending)}
              </p>
            </div>
            <div className="bg-primary-100 p-3 rounded-full">
              <DollarSign className="h-6 w-6 text-primary-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">This Month</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(stats.monthlySpending)}
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <Calendar className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Expenses</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats.totalExpenses}
              </p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Top Category</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats.topCategory?.category || 'None'}
              </p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <PieChart className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {Object.keys(stats.categoryTotals).length > 0 && (
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Spending by Category</h3>
          <div className="space-y-3">
            {Object.entries(stats.categoryTotals)
              .sort(([, a], [, b]) => b - a)
              .map(([category, amount]) => {
                const percentage = (amount / stats.totalSpending) * 100;
                return (
                  <div key={category} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-primary-500 rounded-full"></div>
                      <span className="text-sm font-medium text-gray-700">{category}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-primary-500 h-2 rounded-full"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-semibold text-gray-900 w-16 text-right">
                        {formatCurrency(amount)}
                      </span>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}
'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { ExpenseProvider } from '@/contexts/ExpenseContext';
import Header from '@/components/Header';
import Dashboard from '@/components/Dashboard';
import ExpenseForm from '@/components/ExpenseForm';
import ExpenseFilters from '@/components/ExpenseFilters';
import ExpenseList from '@/components/ExpenseList';

function ExpenseTracker() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
              <p className="text-gray-600">Track and manage your expenses</p>
            </div>
            <button
              onClick={() => setIsFormOpen(true)}
              className="btn-primary flex items-center space-x-2"
            >
              <Plus className="h-5 w-5" />
              <span>Add Expense</span>
            </button>
          </div>
          
          <Dashboard />
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-900">Recent Expenses</h3>
          </div>
          
          <div className="relative">
            <ExpenseFilters />
          </div>
          
          <ExpenseList />
        </div>
      </main>

      <ExpenseForm 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
      />
    </div>
  );
}

export default function Home() {
  return (
    <ExpenseProvider>
      <ExpenseTracker />
    </ExpenseProvider>
  );
}
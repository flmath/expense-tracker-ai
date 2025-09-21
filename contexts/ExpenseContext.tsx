'use client';

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { Expense, ExpenseFilters } from '@/types/expense';
import { saveExpenses, loadExpenses } from '@/utils/storage';

interface ExpenseState {
  expenses: Expense[];
  filters: ExpenseFilters;
  loading: boolean;
}

type ExpenseAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_EXPENSES'; payload: Expense[] }
  | { type: 'ADD_EXPENSE'; payload: Expense }
  | { type: 'UPDATE_EXPENSE'; payload: Expense }
  | { type: 'DELETE_EXPENSE'; payload: string }
  | { type: 'SET_FILTERS'; payload: ExpenseFilters };

interface ExpenseContextType extends ExpenseState {
  addExpense: (expense: Omit<Expense, 'id' | 'createdAt'>) => void;
  updateExpense: (expense: Expense) => void;
  deleteExpense: (id: string) => void;
  setFilters: (filters: ExpenseFilters) => void;
  clearFilters: () => void;
}

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

const expenseReducer = (state: ExpenseState, action: ExpenseAction): ExpenseState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_EXPENSES':
      return { ...state, expenses: action.payload, loading: false };
    case 'ADD_EXPENSE':
      return { ...state, expenses: [...state.expenses, action.payload] };
    case 'UPDATE_EXPENSE':
      return {
        ...state,
        expenses: state.expenses.map(expense =>
          expense.id === action.payload.id ? action.payload : expense
        )
      };
    case 'DELETE_EXPENSE':
      return {
        ...state,
        expenses: state.expenses.filter(expense => expense.id !== action.payload)
      };
    case 'SET_FILTERS':
      return { ...state, filters: action.payload };
    default:
      return state;
  }
};

export const ExpenseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(expenseReducer, {
    expenses: [],
    filters: {},
    loading: true
  });

  useEffect(() => {
    const expenses = loadExpenses();
    dispatch({ type: 'SET_EXPENSES', payload: expenses });
  }, []);

  useEffect(() => {
    if (!state.loading) {
      saveExpenses(state.expenses);
    }
  }, [state.expenses, state.loading]);

  const addExpense = (expenseData: Omit<Expense, 'id' | 'createdAt'>) => {
    const expense: Expense = {
      ...expenseData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    dispatch({ type: 'ADD_EXPENSE', payload: expense });
  };

  const updateExpense = (expense: Expense) => {
    dispatch({ type: 'UPDATE_EXPENSE', payload: expense });
  };

  const deleteExpense = (id: string) => {
    dispatch({ type: 'DELETE_EXPENSE', payload: id });
  };

  const setFilters = (filters: ExpenseFilters) => {
    dispatch({ type: 'SET_FILTERS', payload: filters });
  };

  const clearFilters = () => {
    dispatch({ type: 'SET_FILTERS', payload: {} });
  };

  return (
    <ExpenseContext.Provider
      value={{
        ...state,
        addExpense,
        updateExpense,
        deleteExpense,
        setFilters,
        clearFilters
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenses = () => {
  const context = useContext(ExpenseContext);
  if (context === undefined) {
    throw new Error('useExpenses must be used within an ExpenseProvider');
  }
  return context;
};
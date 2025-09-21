# Expense Tracker

A modern, professional expense tracking web application built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

### Core Functionality
- ✅ Add expenses with date, amount, category, and description
- ✅ View expenses in a clean, organized list
- ✅ Filter expenses by date range, category, and search term
- ✅ Dashboard with spending summaries and analytics
- ✅ Edit and delete existing expenses
- ✅ Export expenses to CSV format
- ✅ Data persistence using localStorage

### Categories
- Food
- Transportation
- Entertainment
- Shopping
- Bills
- Other

### Dashboard Analytics
- Total spending across all time
- Current month spending
- Total number of expenses
- Top spending category
- Visual spending breakdown by category

### User Experience
- Modern, clean interface with professional design
- Fully responsive (desktop and mobile)
- Form validation with error messages
- Loading states and visual feedback
- Intuitive navigation and user experience
- Real-time filtering and search

## Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **State Management**: React Context + useReducer
- **Data Persistence**: localStorage

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser** and navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
npm start
```

## How to Use

### Adding Expenses
1. Click the "Add Expense" button in the top right
2. Fill in the expense details:
   - Amount (required, must be > 0)
   - Category (required, select from dropdown)
   - Description (required)
   - Date (required, defaults to today)
3. Click "Add Expense" to save

### Viewing and Managing Expenses
- All expenses are displayed in the "Recent Expenses" section
- Expenses are sorted by date (newest first)
- Use the edit icon to modify an expense
- Use the trash icon to delete an expense (with confirmation)

### Filtering Expenses
1. Click the "Filters" button above the expense list
2. Set any combination of:
   - Category filter
   - Date range (start and/or end date)
   - Search term (searches description and category)
3. Click "Apply Filters"
4. Use "Clear" to remove all filters

### Dashboard Analytics
The dashboard shows:
- **Total Spending**: Sum of all expenses
- **This Month**: Current month spending
- **Total Expenses**: Count of all expenses
- **Top Category**: Category with highest spending
- **Category Breakdown**: Visual chart showing spending by category

### Exporting Data
- Click the "Export CSV" button to download all expenses as a CSV file
- File includes: Date, Category, Description, Amount
- Filename format: `expenses-YYYY-MM-DD.csv`

## Project Structure

```
├── app/
│   ├── globals.css          # Global styles and Tailwind utilities
│   ├── layout.tsx           # Root layout component
│   └── page.tsx             # Main page component
├── components/
│   ├── Dashboard.tsx        # Analytics dashboard
│   ├── EditExpenseModal.tsx # Edit expense modal
│   ├── ExpenseFilters.tsx   # Filtering interface
│   ├── ExpenseForm.tsx      # Add expense form
│   ├── ExpenseList.tsx      # Expense list display
│   └── Header.tsx           # App header
├── contexts/
│   └── ExpenseContext.tsx   # Global state management
├── types/
│   └── expense.ts           # TypeScript type definitions
└── utils/
    ├── currency.ts          # Currency formatting utilities
    ├── date.ts              # Date handling utilities
    └── storage.ts           # localStorage utilities
```

## Key Features Explained

### State Management
- Uses React Context with useReducer for global state
- Automatic localStorage persistence
- Type-safe actions and state updates

### Form Validation
- Real-time validation with error messages
- Required field validation
- Amount validation (must be positive number)
- Date validation

### Responsive Design
- Mobile-first approach
- Responsive grid layouts
- Touch-friendly interface
- Optimized for all screen sizes

### Data Persistence
- All data stored in browser localStorage
- Automatic save on every change
- Data persists between browser sessions
- Export functionality for backup

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance Features

- Client-side rendering for fast interactions
- Efficient filtering and sorting
- Minimal re-renders with proper React optimization
- Lightweight bundle size

## Future Enhancements

Potential features for future versions:
- Cloud data synchronization
- Receipt photo uploads
- Budget tracking and alerts
- Advanced analytics and charts
- Multi-currency support
- Recurring expense templates
- Data import from bank statements

## Contributing

This is a demo application. For production use, consider:
- Adding user authentication
- Implementing a backend API
- Adding data validation on the server
- Implementing proper error handling
- Adding unit and integration tests

## License

This project is for demonstration purposes.
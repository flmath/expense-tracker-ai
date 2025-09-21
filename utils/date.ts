import { format, startOfMonth, endOfMonth, isWithinInterval, parseISO } from 'date-fns';

export const formatDate = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, 'MMM dd, yyyy');
};

export const formatDateInput = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, 'yyyy-MM-dd');
};

export const getCurrentMonth = () => {
  const now = new Date();
  return {
    start: startOfMonth(now),
    end: endOfMonth(now)
  };
};

export const isDateInRange = (date: string, startDate?: string, endDate?: string): boolean => {
  if (!startDate && !endDate) return true;
  
  const targetDate = parseISO(date);
  
  if (startDate && endDate) {
    return isWithinInterval(targetDate, {
      start: parseISO(startDate),
      end: parseISO(endDate)
    });
  }
  
  if (startDate) {
    return targetDate >= parseISO(startDate);
  }
  
  if (endDate) {
    return targetDate <= parseISO(endDate);
  }
  
  return true;
};
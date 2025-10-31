import { useCallback, useState } from 'react';
export type CalendarViewMode = 'month' | 'week';
export const useCalendar = (initialDate?: string, initialView: CalendarViewMode = 'month') => {
  const init = initialDate ? new Date(initialDate) : new Date();
  const [currentDate, setCurrentDate] = useState<Date>(init);
  const [view, setView] = useState<CalendarViewMode>(initialView);

  const goToNext = useCallback(() => {
    setCurrentDate(d => view === 'month' ? new Date(d.getFullYear(), d.getMonth() + 1, 1) : new Date(d.getFullYear(), d.getMonth(), d.getDate() + 7));
  }, [view]);

  const goToPrevious = useCallback(() => {
    setCurrentDate(d => view === 'month' ? new Date(d.getFullYear(), d.getMonth() - 1, 1) : new Date(d.getFullYear(), d.getMonth(), d.getDate() - 7));
  }, [view]);

  const goToToday = useCallback(() => setCurrentDate(new Date()), []);

  return { currentDate, view, setView, setCurrentDate, goToNext, goToPrevious, goToToday };
};

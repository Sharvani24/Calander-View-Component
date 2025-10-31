import React from 'react';
import { CalendarEvent } from '../components/Calendar/CalendarView.types';

export const useEventManager = (initial: CalendarEvent[] = []) => {
  const [events, setEvents] = React.useState<CalendarEvent[]>(initial);

  const add = (ev: CalendarEvent) => setEvents(prev => [ev, ...prev]);
  const update = (id: string, updates: Partial<CalendarEvent>) => setEvents(prev => prev.map(e => e.id === id ? { ...e, ...updates } : e));
  const del = (id: string) => setEvents(prev => prev.filter(e => e.id !== id));

  const eventsForDay = (day: Date) => {
    return events.filter(e => {
      const s = new Date(e.startDate);
      const same = s.getFullYear() === day.getFullYear() && s.getMonth() === day.getMonth() && s.getDate() === day.getDate();
      return same;
    });
  };

  return { events, setEvents, add, update, del, eventsForDay };
};

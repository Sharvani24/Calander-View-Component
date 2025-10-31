import React from 'react';
import { getCalendarGrid } from '../../utils/date.utils';
import { CalendarCell } from './CalendarCell';
import { CalendarEvent } from './CalendarView.types';

interface Props {
  date: Date;
  events: CalendarEvent[];
  onDayClick: (d: Date) => void;
  onEventClick: (e: CalendarEvent) => void;
}

export const MonthView: React.FC<Props> = ({ date, events, onDayClick, onEventClick }) => {
  const grid = React.useMemo(() => getCalendarGrid(date), [date]);
  const currentMonth = date.getMonth();

  const eventsByDay = React.useMemo(() => {
    const map = new Map<string, CalendarEvent[]>();
    events.forEach(ev => {
      const d = new Date(ev.startDate);
      const key = d.toISOString().slice(0,10);
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(ev);
    });
    return map;
  }, [events]);

  return (
    <div>
      <div className="grid grid-cols-7 gap-px bg-neutral-200 rounded-t">
        {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => (
          <div key={d} className="bg-white text-center py-2 text-sm font-medium">{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-px bg-neutral-200">
        {grid.map((d) => {
          const key = d.toISOString().slice(0,10);
          const dayEvents = eventsByDay.get(key) || [];
          return (
            <div key={key} className="bg-white">
              <CalendarCell date={d} events={dayEvents} currentMonth={currentMonth} onDayClick={onDayClick} onEventClick={onEventClick} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

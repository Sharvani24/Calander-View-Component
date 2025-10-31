import React from 'react';
import { CalendarEvent } from './CalendarView.types';

interface Props {
  startDate: Date;
  events: CalendarEvent[];
  onEventClick: (e: CalendarEvent) => void;
}

export const WeekView: React.FC<Props> = ({ startDate, events, onEventClick }) => {
  // very basic week view: columns for each day, show events list
  const days = Array.from({length:7}, (_,i)=> new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()+i));
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
    <div className="grid grid-cols-7 gap-2">
      {days.map(day => {
        const key = day.toISOString().slice(0,10);
        const dayEvents = eventsByDay.get(key) || [];
        return (
          <div key={key} className="bg-white p-2 rounded border">
            <div className="text-sm font-medium mb-2">{day.toLocaleDateString(undefined, { weekday: 'short', day: 'numeric' })}</div>
            <div className="space-y-2">
              {dayEvents.map(ev => (
                <button key={ev.id} onClick={()=>onEventClick(ev)} className="text-sm p-2 rounded" style={{backgroundColor: ev.color || '#3b82f6'}}>{ev.title}</button>
              ))}
              {dayEvents.length === 0 && <div className="text-xs text-neutral-500">No events</div>}
            </div>
          </div>
        );
      })}
    </div>
  );
};

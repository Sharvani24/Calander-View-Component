import React, { useCallback, useMemo } from 'react';
import { CalendarEvent } from './CalendarView.types';
import { isToday, formatMonthYear } from '../../utils/date.utils';

interface Props {
  date: Date;
  events: CalendarEvent[];
  currentMonth: number;
  onDayClick: (d: Date) => void;
  onEventClick: (e: CalendarEvent) => void;
}

export const CalendarCell: React.FC<Props> = React.memo(({ date, events, currentMonth, onDayClick, onEventClick }) => {
  const grayOut = date.getMonth() !== currentMonth;
  const today = isToday(date);
  const dayNum = date.getDate();
  const shown = useMemo(() => events.slice(0, 3), [events]);

  const onKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') onDayClick(date);
  }, [date, onDayClick]);

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`${formatMonthYear(date)} ${date.getDate()}, ${date.getFullYear()}. ${events.length} events.`}
      onKeyDown={onKeyDown}
      onClick={() => onDayClick(date)}
      className={`border border-neutral-200 h-32 p-2 hover:bg-neutral-50 transition-colors cursor-pointer ${grayOut ? 'text-neutral-400' : 'text-neutral-900'}`}
    >
      <div className="flex justify-between items-start mb-1">
        <span className="text-sm font-medium">{!today ? dayNum : ''}</span>
        {today && <span className="w-6 h-6 bg-primary-500 rounded-full text-white text-xs flex items-center justify-center">{dayNum}</span>}
      </div>

      <div className="space-y-1 overflow-hidden">
        {shown.map(ev => (
          <button
            key={ev.id}
            onClick={(e) => { e.stopPropagation(); onEventClick(ev); }}
            className="text-xs px-2 py-1 rounded truncate block w-full text-left"
            style={{ backgroundColor: ev.color || '#3b82f6' }}
            aria-label={`${ev.title}.`}
          >
            {ev.title}
          </button>
        ))}

        {events.length > 3 && (
          <button className="text-xs text-primary-600 hover:underline" onClick={(e) => { e.stopPropagation(); onDayClick(date); }}>
            +{events.length - 3} more
          </button>
        )}
      </div>
    </div>
  );
});
CalendarCell.displayName = 'CalendarCell';

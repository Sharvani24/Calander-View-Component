import React from 'react';
import { CalendarViewProps, CalendarEvent } from './CalendarView.types';
import { useCalendar } from '../../hooks/useCalendar';
import { MonthView } from './MonthView';
import { WeekView } from './WeekView';
import { EventModal } from './EventModal';

export const CalendarView: React.FC<CalendarViewProps> = ({ events, onEventAdd, onEventUpdate, onEventDelete, initialView='month', initialDate }) => {
  const { currentDate, view, setView, goToNext, goToPrevious, goToToday, setCurrentDate } = useCalendar(initialDate, initialView);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [editing, setEditing] = React.useState<CalendarEvent | undefined>(undefined);

  const handleDayClick = (d: Date) => {
    // open add modal with date prefilled
    const isoStart = new Date(d.getFullYear(), d.getMonth(), d.getDate(), new Date().getHours(), 0).toISOString().slice(0,16);
    setEditing({ id: '', title: '', startDate: isoStart, endDate: new Date(new Date().getTime()+30*60000).toISOString().slice(0,16) });
    setModalOpen(true);
  };

  const handleEventClick = (ev: CalendarEvent) => {
    setEditing(ev);
    setModalOpen(true);
  };

  const save = (ev: CalendarEvent) => {
    if (ev.id.startsWith('evt-') && events.find(e=>e.id===ev.id)) {
      onEventUpdate(ev.id, ev);
    } else if (ev.id && events.find(e=>e.id===ev.id)) {
      onEventUpdate(ev.id, ev);
    } else {
      onEventAdd(ev);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <button className="px-3 py-1 border rounded" onClick={goToPrevious}>Prev</button>
          <button className="px-3 py-1 border rounded" onClick={goToToday}>Today</button>
          <button className="px-3 py-1 border rounded" onClick={goToNext}>Next</button>
        </div>

        <div className="flex items-center gap-2">
          <div className="text-lg font-semibold">{currentDate.toLocaleString(undefined, { month: 'long', year: 'numeric' })}</div>
          <select value={view} onChange={e=>setView(e.target.value as any)} className="border rounded p-1">
            <option value="month">Month</option>
            <option value="week">Week</option>
          </select>
        </div>
      </div>

      <div>
        {view === 'month' ? (
          <MonthView date={currentDate} events={events} onDayClick={handleDayClick} onEventClick={handleEventClick} />
        ) : (
          <WeekView startDate={currentDate} events={events} onEventClick={handleEventClick} />
        )}
      </div>

      <EventModal
        open={modalOpen}
        initial={editing}
        onClose={()=>setModalOpen(false)}
        onSave={(ev)=>save(ev)}
        onDelete={(id)=>{ onEventDelete(id); setModalOpen(false); }}
      />
    </div>
  );
});

import React from 'react'
import { CalendarView } from './components/Calendar/CalendarView'
import { sampleEvents } from './data/sampleEvents'

export default function CalendarViewDemo() {
  const [events, setEvents] = React.useState(sampleEvents)

  const handleAdd = (ev: any) => setEvents(prev => [ev, ...prev])
  const handleUpdate = (id: string, updates: any) => setEvents(prev => prev.map(e => e.id === id ? { ...e, ...updates } : e))
  const handleDelete = (id: string) => setEvents(prev => prev.filter(e => e.id !== id))

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Calendar Component Demo</h1>
      <CalendarView
        events={events}
        onEventAdd={handleAdd}
        onEventUpdate={handleUpdate}
        onEventDelete={handleDelete}
        initialView="month"
      />
    </div>
  )
}

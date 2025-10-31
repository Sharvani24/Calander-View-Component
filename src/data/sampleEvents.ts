export const sampleEvents = [
  {
    id: 'evt-1',
    title: 'Team Standup',
    description: 'Daily sync',
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 9, 0).toISOString(),
    endDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 9, 30).toISOString(),
    color: '#3b82f6',
    category: 'Meeting',
  },
  {
    id: 'evt-2',
    title: 'Design Review',
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 14, 0).toISOString(),
    endDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 15, 30).toISOString(),
    color: '#10b981',
    category: 'Design',
  },
  {
    id: 'evt-3',
    title: 'Client Presentation',
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()+1, 10, 0).toISOString(),
    endDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()+1, 11, 30).toISOString(),
    color: '#f59e0b',
    category: 'Meeting',
  },
]

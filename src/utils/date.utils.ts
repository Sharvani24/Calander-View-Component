export const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

export const startOfMonth = (d: Date) => new Date(d.getFullYear(), d.getMonth(), 1);
export const getCalendarGrid = (date: Date): Date[] => {
  const first = startOfMonth(date);
  const startDay = first.getDay(); // 0-6
  const gridStart = new Date(first);
  gridStart.setDate(first.getDate() - startDay);
  const grid: Date[] = [];
  for (let i = 0; i < 42; i++) {
    grid.push(new Date(gridStart.getFullYear(), gridStart.getMonth(), gridStart.getDate() + i));
  }
  return grid;
};
export const formatMonthYear = (d: Date) => d.toLocaleString(undefined, { month: 'long', year: 'numeric' });
export const isToday = (d: Date) => isSameDay(d, new Date());

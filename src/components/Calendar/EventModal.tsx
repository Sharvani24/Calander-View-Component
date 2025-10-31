import React from 'react';
import { CalendarEvent } from './CalendarView.types';

interface Props {
  open: boolean;
  initial?: Partial<CalendarEvent>;
  onClose: () => void;
  onSave: (ev: CalendarEvent) => void;
  onDelete?: (id: string) => void;
}

export const EventModal: React.FC<Props> = ({ open, initial, onClose, onSave, onDelete }) => {
  const [title, setTitle] = React.useState(initial?.title || '');
  const [desc, setDesc] = React.useState(initial?.description || '');
  const [start, setStart] = React.useState(initial?.startDate ? initial.startDate : new Date().toISOString().slice(0,16));
  const [end, setEnd] = React.useState(initial?.endDate ? initial.endDate : new Date(Date.now() + 30*60000).toISOString().slice(0,16));
  const [color, setColor] = React.useState(initial?.color || '#3b82f6');

  React.useEffect(() => {
    if (open) {
      setTitle(initial?.title || '');
      setDesc(initial?.description || '');
      setStart(initial?.startDate ? initial.startDate : new Date().toISOString().slice(0,16));
      setEnd(initial?.endDate ? initial.endDate : new Date(Date.now() + 30*60000).toISOString().slice(0,16));
      setColor(initial?.color || '#3b82f6');
    }
  }, [open, initial]);

  if (!open) return null;

  const save = () => {
    if (!title.trim()) return alert('Title required');
    const id = initial?.id || `evt-${Date.now()}`;
    onSave({
      id,
      title: title.trim(),
      description: desc.trim(),
      startDate: start,
      endDate: end,
      color,
      category: initial?.category
    });
    onClose();
  };

  return (
    <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="bg-white rounded-xl shadow-modal p-6 w-full max-w-lg z-10">
        <h2 id="modal-title" className="text-lg font-semibold mb-2">{initial?.id ? 'Edit Event' : 'Add Event'}</h2>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium">Title</label>
            <input maxLength={100} value={title} onChange={e=>setTitle(e.target.value)} className="mt-1 block w-full border rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea maxLength={500} value={desc} onChange={e=>setDesc(e.target.value)} className="mt-1 block w-full border rounded p-2" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm font-medium">Start</label>
              <input type="datetime-local" value={start} onChange={e=>setStart(e.target.value)} className="mt-1 block w-full border rounded p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium">End</label>
              <input type="datetime-local" value={end} onChange={e=>setEnd(e.target.value)} className="mt-1 block w-full border rounded p-2" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium">Color</label>
            <input type="color" value={color} onChange={e=>setColor(e.target.value)} className="mt-1 h-10 w-16 p-0 border rounded" />
          </div>

          <div className="flex justify-end gap-2">
            {initial?.id && onDelete && <button className="px-3 py-2 rounded bg-red-500 text-white" onClick={()=>{onDelete(initial.id); onClose();}}>Delete</button>}
            <button className="px-3 py-2 rounded border" onClick={onClose}>Cancel</button>
            <button className="px-3 py-2 rounded bg-primary-600 text-white" onClick={save}>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};

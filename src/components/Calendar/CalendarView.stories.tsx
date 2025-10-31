import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { CalendarView } from './CalendarView';
import { sampleEvents } from '../../data/sampleEvents';

const meta: Meta<typeof CalendarView> = {
  title: 'Components/Calendar/CalendarView',
  component: CalendarView,
};
export default meta;
type Story = StoryObj<typeof CalendarView>;

export const Default: Story = {
  args: {
    events: sampleEvents,
    onEventAdd: (ev) => { console.log('add', ev) },
    onEventUpdate: (id, updates) => { console.log('update', id, updates) },
    onEventDelete: (id) => { console.log('delete', id) },
    initialView: 'month'
  }
};

export const Empty: Story = {
  args: {
    events: [],
    onEventAdd: ()=>{},
    onEventUpdate: ()=>{},
    onEventDelete: ()=>{},
    initialView: 'month'
  }
};

export const WeekView: Story = {
  args: {
    events: sampleEvents,
    onEventAdd: ()=>{},
    onEventUpdate: ()=>{},
    onEventDelete: ()=>{},
    initialView: 'week'
  }
};

export const ManyEvents: Story = {
  args: {
    events: Array.from({length: 25}, (_,i)=>({
      id: 'many-'+i,
      title: 'Event '+i,
      startDate: new Date(new Date().getFullYear(), new Date().getMonth(), (i%28)+1, 9, 0).toISOString(),
      endDate: new Date(new Date().getFullYear(), new Date().getMonth(), (i%28)+1, 10, 0).toISOString(),
      color: ['#3b82f6','#10b981','#f59e0b','#8b5cf6'][i%4],
    })),
    onEventAdd: ()=>{},
    onEventUpdate: ()=>{},
    onEventDelete: ()=>{},
    initialView: 'month'
  }
};

export const Interactive: Story = {
  args: {
    events: sampleEvents,
    onEventAdd: (ev) => { alert('Add: '+JSON.stringify(ev)) },
    onEventUpdate: (id, updates) => { alert('Update: '+id) },
    onEventDelete: (id) => { alert('Delete: '+id) },
    initialView: 'month'
  }
};

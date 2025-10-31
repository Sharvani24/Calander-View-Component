import React from 'react'
import { createRoot } from 'react-dom/client'
import './styles/globals.css'
import CalendarViewDemo from './App'

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CalendarViewDemo />
  </React.StrictMode>
)

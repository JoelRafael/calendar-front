import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';
import { CalendarApp } from './CalendarApp';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CalendarApp/>
  </React.StrictMode>
);

reportWebVitals();

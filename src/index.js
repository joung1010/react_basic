import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AooProfile from './basic/AppProfile';
import reportWebVitals from './reportWebVitals';
import AppCounter from "./basic/AppCounter";
import AppProduct from "./basic/AppProduct";
import AppXY from "./AppXY";
import AppMentor from "./AppMentor";
import AppMentors from "./AppMentors";
import AppMentorsImmer from "./AppMentorsImmer";
import AppForm from "./AppForm";
import AppWrap from "./AppWrap";
import AppCard from "./AppCard";
import AppTheme from "./AppTheme";
import AppMentorsButton from "./AppMentorsButton";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppProduct/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

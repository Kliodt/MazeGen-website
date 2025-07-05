import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// styles
import './index.css';
import './styles/buttons.css';
import './styles/headers.css';
import './styles/sliders.css';
import './styles/separators.css';
import './styles/textinput.css';
import './styles/radio.css';

// pages
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/profile' element={<ProfilePage/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);







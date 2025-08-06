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
import SimpleMazePage from './pages/SimpleMazePage';
import Error404Page from './pages/Error404Page';
import AuthProvider from './components/auth-provider/AuthProvider';
import BasicLayout from './layouts/BasicLayout';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>

    <AuthProvider>

      <BrowserRouter>
        <BasicLayout>
          <Routes>


            <Route path='/' element={<HomePage/>}/>
            <Route path='/profile' element={<ProfilePage/>}/>
            <Route path='/maze/:mazeId' element={<SimpleMazePage/>}/>
            <Route path='*' element={<Error404Page/>}/>
            {/* todo: use Link (from react router) instead of <a> to go to a different page */}

          </Routes>
        </BasicLayout>
      </BrowserRouter>

    </AuthProvider>

  </React.StrictMode>
);







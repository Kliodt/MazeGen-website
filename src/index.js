import '@ant-design/v5-patch-for-react-19';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// styles
import './index.css';
import './styles/buttons.css';
import './styles/headers.css';
import './styles/radio.css';
import './styles/separators.css';
import './styles/sliders.css';
import './styles/textinput.css';

import AuthProvider from './components/auth-provider/AuthProvider';
import HeaderAndBodyLayout from './layouts/HeaderAndBodyLayout';
import Error404Page from './pages/Error404Page';
import GeneratorPage from './pages/GeneratorPage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import MazePage from './pages/SimpleMazePage';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <AuthProvider>
            <BrowserRouter>
                <HeaderAndBodyLayout>
                    <Routes>
                        <Route path='/' element={<HomePage />} />
                        <Route path='/generate' element={<GeneratorPage />} />
                        <Route path='/profile' element={<ProfilePage />} />
                        <Route path='/maze/:mazeId' element={<MazePage />} />
                        <Route path='*' element={<Error404Page />} />
                    </Routes>
                </HeaderAndBodyLayout>
            </BrowserRouter>
        </AuthProvider>
    </React.StrictMode>
);

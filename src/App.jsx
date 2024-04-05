import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import './css/style.css';

import './charts/ChartjsConfig';

// Import pages
import Dashboard from './pages/Dashboard';
import Home from './pages/Home'
import FormComponent from './components/Form';
import { LoginForm } from './components/Login';
import { SignUpForm } from './components/Login';
import { locations } from './components/location';
import ProfilePage from './components/Profile';
function App() {

  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        <Route exact  path="/" element={<Home />} />
      <Route   path="/report" element={<FormComponent locationData={locations} />} />
      <Route   path="/login" element={<LoginForm />} />
      <Route   path="/signup" element={<SignUpForm />} />
        <Route path="/admin" element={<Dashboard />} />
        <Route path='/profile' element= {<ProfilePage/>}/>
      </Routes>
    </>
  );
}

export default App;

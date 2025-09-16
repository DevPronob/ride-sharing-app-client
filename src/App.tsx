

import './App.css'
import Home from './pages/Home'
import CommonLayout from './components/layout/CommonLayout'
import { Outlet } from 'react-router-dom'
import { useEffect } from 'react';
import "leaflet/dist/leaflet.css"


function App() {
  useEffect(() => {
    // Debug cookie presence
    console.log('Current Cookies:', document.cookie);
  }, []);

  return (
    <>
    <CommonLayout>
<Outlet/>
    </CommonLayout>

    </>
  )
}

export default App

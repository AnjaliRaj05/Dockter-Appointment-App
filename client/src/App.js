import {BrowserRouter,Routes,Route} from 'react-router-dom'
import './App.css';
import React from 'react';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Register from './pages/Register';
import { useSelector } from 'react-redux';
import Spinner from './Components/Spinner';
import ProtectedRoute from './Components/ProtectedRoute';
import PublicRoute from './Components/PublicRoute';
import ApplyDoctor from './pages/ApplyDoctor';
import NotificationPage from './pages/NotificationPage';
import Users from './pages/admin/Users';
import Doctors from './pages/admin/Doctors';
import Profile from './pages/doctor/Profile';
import BookingPage from './pages/BookingPage';
import AppointmentPage from './pages/AppointmentPage';
import DoctorAppointments from './pages/doctor/DoctorAppointments';
// import Demo from './Components/Demo';
function App() {
  // 
  const {loading}=useSelector(state => state.alerts)
  return (
    
      <>
      <BrowserRouter>
      {loading ?( <Spinner/>
      ):(
    <Routes>
    <Route path='/' element ={<ProtectedRoute> <Homepage/> </ProtectedRoute> } />
    <Route path='/apply-docter' element ={<ProtectedRoute> <ApplyDoctor/> </ProtectedRoute> } />

    <Route path='/admin/users' element ={<ProtectedRoute> <Users/> </ProtectedRoute> } />
    <Route path='/admin/doctors' element ={<ProtectedRoute> <Doctors/> </ProtectedRoute> } />
    <Route path='/doctor/profile/:id' element ={<ProtectedRoute> <Profile/> </ProtectedRoute> } />
    <Route path='/doctor/book-appointment/:doctorId' element ={<ProtectedRoute> <BookingPage/> </ProtectedRoute> } />
    <Route path='/notification' element ={<ProtectedRoute> <NotificationPage/> </ProtectedRoute> } />
    <Route path='/login' element={ <PublicRoute> <Login/> </PublicRoute> }/>
    <Route path='/register' element={<PublicRoute> <Register/> </PublicRoute>  }/> 
    <Route path= '/appointements' element={<ProtectedRoute> <AppointmentPage/> </ProtectedRoute>  }/> 
    <Route path= '/doctor-appointments' element={<ProtectedRoute> <DoctorAppointments/> </ProtectedRoute>  }/> 
    <Route path='/' element ={<ProtectedRoute> <Homepage/> </ProtectedRoute> } />
    {/* <Route path="/demo" element={ <Demo/>}/> */}
   </Routes> 
    
    )}
      
    
      </BrowserRouter>
     
      </>
  );
}

export default App;

import React, { useEffect, useState } from 'react'
import Layout from '../Components/Layout';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { DatePicker, TimePicker, message } from 'antd';
import moment from 'moment';
import dimg from '../../src/Components/apdoctor.png'
import { useDispatch ,useSelector} from 'react-redux';
import { hideLoading, showLoading } from '../redux/features/alertSlice';
const BookingPage = () => {
    const {user} = useSelector(state=>state.user)
    const params =useParams();
    const dispatch=useDispatch();
    const [doctors,setDoctors] =useState([]);
    const [date,setDate] = useState([]);
    const[time,setTime] = useState([]);
    const [availableTime,setAvailableTime] = useState([]);
  // login user data
  const getUserData=async()=>{
try{
   const res= await  axios.post('/api/v1/doctor/getDoctorById',
   { doctorId:params.doctorId},
    { 
        headers: {
        Authorization:"Bearer " + localStorage.getItem("token"),
        },
   
   },
   );
   
    if(res.data.success){
      setDoctors(res.data.data);
    }
} catch(error){
  console.log(error);
}
  };

//===============handleBooking function=======
const handleBooking =async()=>{
  try{ 
    setAvailableTime(true);
    if(!date && !time){
     return alert("Date and Time Required");
    }
     dispatch(showLoading());
      const res= await axios.post('/api/v1/user/book-appointment',
      {
        doctorId:params.doctorId,
        userId:user._id,
        doctorInfo:doctors,
        userInfo:user,
        date:date,
        time:time
      },{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      dispatch(hideLoading());
      if(res.data.success){
        message.success(res.data.message);
      }
  } catch(error){
    dispatch(hideLoading())
    console.log(error);
  }
}
//==========handleBooking================================
//handle to check CGECKavailablity
const handleAvailablity = async()=>{
  try{
    dispatch(showLoading());
    const res = await axios.post('/api/v1/user/booking-availbility',
    {doctorId: params.doctorId,date,time},
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
    ); dispatch(hideLoading());
    if(res.data.success)
    {
    setAvailableTime(true);
    console.log(availableTime);
  message.success(res.data.message)
    }else{
     message.error(res.data.message)
    }
  }catch(error){
     dispatch(hideLoading());
     console.log(error);
    }
  };

  useEffect(()=>{
  getUserData();
  },[])
  return (
    <>
    <Layout>
      <div className="appointment-container-box">
      <div className='appointment-container2'>
        {doctors && ( 
        <div className='appointment-container1'>
        <h4>
         Dr.{doctors.firstName} {doctors.lastName}
         </h4>
       <h4>Experience:{doctors.experience}</h4>
       <h4>Specialization:{doctors.specialization}</h4>
       <h4>Fees :{doctors.feesPerConsulation}</h4>
       
       {/* <h4>Timings:{doctors.timings[0]-doctors.timings[1]}</h4> */}
       <h4>Timings :{doctors.timings}</h4>
   <div className='appointment-container3'>
    <DatePicker className='m-2' format="DD-MM-YYYY"
     onChange={(value) => {
      setAvailableTime(false)
     setDate(moment(value).format('DD-MM-YYYY'))
    } 
    } 
    />
    <TimePicker className='m-2' format="HH:mm"
     onChange={(value) => {
      setAvailableTime(false)
     
      setTime(moment(value).format('HH:mm'));
      setAvailableTime(true);
      
      }} />

    <button className ="btn btn-primary m-2" onClick={handleAvailablity}>check Availablity</button>
    {!availableTime && (
     <button className ="btn btn-dark m-2" onClick={handleBooking}>Book Now</button>
    )}
   
   </div>
   </div>

        )}

    
      </div>
      </div>
    </Layout>
    </>
  )
}

export default BookingPage

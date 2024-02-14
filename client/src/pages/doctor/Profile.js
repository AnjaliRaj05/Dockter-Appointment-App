import React,{useEffect, useState} from 'react';
import moment from 'moment';
import docimg from '../../Components/docotrimg.png'
import Layout from '../../Components/Layout'
import { useParams,useNavigate } from 'react-router-dom'
import axios from 'axios';
import { Col, Form, Input, Row, TimePicker, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { showLoading,hideLoading } from '../../redux/features/alertSlice';
const Profile = () => {
    const {user} =useSelector((state) =>state.user)
    const [doctor,setDoctor]=useState(null);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const params =useParams();

    // to  upadte doctor profile
    const handleFinish =async(values)=>{
      //console.log(values)
      try{
         dispatch(showLoading());
        
         const res =await axios.post("/api/v1/doctor/updateProfile",
         {
           ...values,
            userId: user._id,
         
            timings:[
        moment(values.timings[0]).format("HH:mm"),
        moment(values.timings[1]).format("HH:mm"),
      ],
     // timings: values.timings.map(time => moment(time).format("HH:mm")), // Format timings
    },
    {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
         });
         dispatch(hideLoading());
         if(res.data.success){
          message.success(res.data.message)
          navigate('/');
         }else{
          message.error(res.data.success)
         }
      } catch(error){
            dispatch(hideLoading());
            console.log(error);
            message.error('something went wrong');
      }
  };
  //
    //getDoctor  Details
    const getDoctorInfo =async() =>{
        try{
        const res = await axios.post('/api/v1/doctor/getDoctorInfo',
        {userId:params.id}, 
        { 
            headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          
        })
        if(res.data.success){
            setDoctor(res.data.data)
        }

    }catch(error){
        console.log(error);
        
    }}
    useEffect(()=>{
    getDoctorInfo();
    },[])
  return (
   <Layout>
    <div className="ff-page">
      
        <div className="outside-form">  
        <div> 
        <img src={docimg} />
        <h1 className="doct-text">Manage Profile</h1>
        </div>
        
        {doctor &&(
        <Form layout='vertical' onFinish={handleFinish} className='main-form' initialValues={
          {
            ...doctor,
            timings:[
             
             moment(doctor.timings[0]).format,("HH:mm"),
             moment(doctor.timings[1]).format,("HH:mm"),
           ],
          timings: doctor.timings.map(time => moment(time, "HH:mm")), // Parse timings
           }} 
         > 
        <div className="left-left-prt">
          <div className='left-part'>
          <h6 className='text-center'>Personal Detail:</h6>
          <Col gutter={20}>   
              <Col xs={42} md ={42} lg={20}>
              <Form.Item label ='First Name' name= 'firstName' required rules={[{required: true}]}>
               <Input type="text" placeholder="your first name"/>
              </Form.Item>
              </Col>
              <Col xs={24} md ={24} lg={20}>
              <Form.Item label ='Last Name' name='lastName' required rules={[{required: true}]}>
               <Input type="text" placeholder="your last name"/>
              </Form.Item>
              </Col>
  
              <Col xs={24} md ={24} lg={20}>
              <Form.Item label ='Phone number' name='phone' required rules={[{required: true}]}>
               <Input type="text" placeholder="your mobile"/>
              </Form.Item>
              </Col>
  
              <Col xs={24} md ={24} lg={20}>
              <Form.Item label ='Email' name= 'email' required rules={[{required: true}]}>
               <Input type="text" placeholder="your email"/>
              </Form.Item>
              </Col>
              <Col xs={24} md ={24} lg={20}>
              <Form.Item label ='Website' name='website'>
               <Input type="text" placeholder="your webiste"/>
              </Form.Item>
              </Col>
              <Col xs={24} md ={24} lg={20}>
              <Form.Item label ='Address' name='address' required rules={[{required: true}]}>
               <Input type="text" placeholder="Enter Address"/>
              </Form.Item>
              </Col>
          </Col>
          </div>
          </div>
          <div className="right-right-prt">
          <div className='right-part'>
          <h6 className='text-center'>Professional Details:</h6> 
           <Col gutter={20}>
               
                <Col xs={24} md ={24} lg={20}>
               <Form.Item label ='specialization' name='specialization' required rules={[{required: true}]}>
               <Input type="text" placeholder="Enter your specialization"/>
              </Form.Item>
              </Col>
              <Col xs={24} md ={24} lg={20}>
              <Form.Item label = 'Experience' name='experience' required rules={[{required: true}]}>
               <Input type="text" placeholder="Enter your  experience"/>
              </Form.Item>
              </Col>
              <Col xs={24} md ={24} lg={20}>
              <Form.Item label = 'FeesPerConsulation' name= 'feesPerConsulation' required rules={[{required: true}]}>
               <Input type="text" placeholder="Enter your  feesPerConsulation"/>
              </Form.Item>
              </Col>
              <Col xs={24} md ={24} lg={20}>
              <Form.Item label ='Timings' name= "timings" required >
               <TimePicker.RangePicker format= "HH:mm"
               
               />
              </Form.Item>
              </Col>
              <Col>
              
          
               <button className="f-bottom " type="Submit"> Update</button>
             
           
              </Col>
  
          </Col>
          </div>
          </div>
         <div>
         
          </div> 
         
       </Form> 
        )}
       </div> 
       
      </div>
        
   </Layout>
  )
}

export default Profile

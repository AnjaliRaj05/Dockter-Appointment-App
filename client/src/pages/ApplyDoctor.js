import React from 'react'
import Layout from '../Components/Layout';
import '../Components/demo.css';
import docimg from '../Components/docotrimg.png';
import { Col, Form, Input, Row, TimePicker, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { showLoading,hideLoading } from '../redux/features/alertSlice';
import axios from 'axios';
import moment from 'moment';
const ApplyDoctor = () => {
  const {user} =useSelector((state)=>state.user)
  //const timings = ["09:00", "12:00"];
    const dispatch = useDispatch()
    const navigate =useNavigate()

    const handleFinish =async(values)=>{
        try{
           dispatch(showLoading());   
          const res =await axios.post("/api/v1/user/apply-docter",{ 
            ...values,
             userId: user._id,
             timings:[
             moment(values.timings[0]).format("HH:mm"),
             moment(values.timings[1]).format("HH:mm"),
           ],
          },

           {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
           })
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
  return (
    <div className="doctor-form">
      <Layout>
         <div className="ff-page">
      <div className="outside-form">  
      <div> 
        <img src={docimg} />
      <h1 className="doct-text">Apply As a Doctor</h1>
      </div>
      <Form layout='vertical' onFinish={handleFinish} className='main-form' > 
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
             <Form.Item label ='Specialization' name='specialization' required rules={[{required: true}]}>
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
             <Input type="text" placeholder="Enter your feesPerConsulation"/>
            </Form.Item>
            </Col>
            <Col xs={24} md ={24} lg={20}>
            {/* <Form.Item label ='Timings' name='timings' required >
             <TimePicker.RangePicker format="HH:mm"
             de={timings.map(time =>moment(time,"HH:mm"))} 
             />
            </Form.Item> */}
            <Form.Item  label ='Timings' name = "timings" required>
            <TimePicker.RangePicker format="HH:mm" />
            </Form.Item>
            
            </Col>
            <Col>
             <button className="f-bottom " type="submit"> Submit</button>
            </Col>
        </Col>
        </div>
        </div>
       <div>
       
        </div> 
       
     </Form> 
    
     </div> 
     
    </div>
      </Layout>
      </div>
    // </div>
  )
}

export default ApplyDoctor;

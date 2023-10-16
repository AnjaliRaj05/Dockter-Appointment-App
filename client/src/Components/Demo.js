import React from 'react';
import './demo.css';
import { Form, Input,message,Col,Row,TimePicker } from "antd";
const Demo = () => {
 const handleFinish = () => {}
  return (
    
    <div className="ff-page">
    <h1 className="text-center">Apply As a Doctor</h1>
     <div className="outside-form">  
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
            <Form.Item label ='last Name' name='lastName' required rules={[{required: true}]}>
             <Input type="text" placeholder="your last name"/>
            </Form.Item>
            </Col>

            <Col xs={24} md ={24} lg={20}>
            <Form.Item label ='phone number' name='phone' required rules={[{required: true}]}>
             <Input type="text" placeholder="your mobile"/>
            </Form.Item>
            </Col>

            <Col xs={24} md ={24} lg={20}>
            <Form.Item label ='Email' name= 'email' required rules={[{required: true}]}>
             <Input type="text" placeholder="your email"/>
            </Form.Item>
            </Col>
            <Col xs={24} md ={24} lg={20}>
            <Form.Item label ='website' name='website'>
             <Input type="text" placeholder="your webiste"/>
            </Form.Item>
            </Col>
            <Col xs={24} md ={24} lg={20}>
            <Form.Item label ='address' name='address' required rules={[{required: true}]}>
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
            <Form.Item label = 'feesPerConsulation' name= 'feesPerConsulation' required rules={[{required: true}]}>
             <Input type="text" placeholder="Enter your  feesPerConsulation"/>
            </Form.Item>
            </Col>
            <Col xs={24} md ={24} lg={20}>
            <Form.Item label ='timings' name= 'timings' required >
             <TimePicker.RangePicker format="HH:mm"/>
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
  )
}

export default Demo

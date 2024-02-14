import React,{useEffect,useState} from 'react';
import axios from 'axios';
import Layout from './../Components/Layout';
import { Row } from 'antd';
import DoctorList from '../Components/DoctorList';
const Homepage = () => {
  const [doctors,setDoctors] =useState([])
  // login user data
  const getUserData=async()=>{
try{
   const res= await axios.get('/api/v1/user/getAllDoctors',
   {
    headers: {
      Authorization:"Bearer "+localStorage.getItem("token"),
      },
    }
    );
    if(res.data.success){
      setDoctors(res.data.data);
    }
} catch(error){
  console.log(error);
}
  };
  useEffect(()=>{
  getUserData()
  },[])
  return (
   
    <Layout>
    <h1 className="text-center">List Of Active Doctors</h1>
    <Row>
    {doctors && doctors.map((doctor)=>(
      <DoctorList doctor ={doctor}/>
    ))}
    </Row>
    </Layout>
    
    
  );
};

export default Homepage;

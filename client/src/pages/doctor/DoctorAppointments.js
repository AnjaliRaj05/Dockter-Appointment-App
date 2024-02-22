import React, { useEffect, useState } from 'react'
import Layout from '../../Components/Layout'
import moment from 'moment';
import axios from 'axios';
import { Table, message } from 'antd';

export default function DoctorAppointments() {
    const [appointments,setAppointments]=useState([]);
    const getAppointments = async()=>{
      try{
      const res = await axios.get('/api/v1/doctor//doctor-appointments',{
          headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
      });
      if(res.data.success){
        
          setAppointments(res.data.data);
      }
     } catch (error){
       console.log(error);
      }
    };
    useEffect(()=>{
      getAppointments();
    },[]);
    const handleStatus =async(record,status)=>{
    try{
   const res = await axios.post('/api/v1/doctor/update-status',{appointmentsId:record._id,status},
    {
      headers:{
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  }
  );
  if (res.data.success){
    message.success(res.data.message);
    getAppointments();
  }
    }catch(error){
     console.log(error);
     message.error('something went wrong');
    }
    };
    const columns =[
        {
            title :"ID",
            dataIndex: "_id",
        },
        // {
        //   title: "Patient Name",
        //   dataIndex: "userInfo",
        //   render: (text, record) => {
        //     //console.log(record);
        //    console.log('Patient Info:', record.userInfo);
        //     // return <span>{record.userInfo.name}</span>;
        //     return record.userInfo.name;

        //   },
        // },
        {
          title: 'Patient Name',
          dataIndex: 'userInfo',
          render: (text, record) => {
              return record.userInfo.name;
          },
      },
        
        // {
        //     title :"Phone",
        //     dataIndex: "phone",
        //     render:(text,record)=>(
        //         <span>
        //             {record.doctorId.phone}
        //         </span>
        //     ),
        // },
        {
            title :"Date and Time",
            dataIndex: "date",
            render:(text,record)=>(
              
                <span>
                  
                    {moment(record.date).format("DD-MM-YYYY")} &nbsp;
                    {moment(record.time).format("HH:mm")} 
                </span>
            ),
        },
        {
            title :"Status",
            dataIndex: "status",   
        },
        {
          title:'Actions',
          dataIndex:'actions',
          render:(text,record)=>(
            <div className="d-flex">
             {record.status === "pending" &&(
             <div className='d-flex'>
              <button className="btn btn-success" onClick={()=> handleStatus(record,'approved')}>Approved</button>
              <button className="btn btn-danger ms2" onClick={()=> handleStatus(record,'reject')}>Reject</button>
             </div>

             )} 
            </div>
          ),
        },
      ];
  return (
    <Layout>
      <h1>Appointments List</h1>
      
      <Table columns={columns} dataSource={appointments} />
    </Layout>
  );
};

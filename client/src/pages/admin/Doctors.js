// import React,{useEffect,useState} from 'react'
// import Layout from '../../Components/Layout';
// import axios from 'axios'
// import { Table, message } from 'antd';

// const Doctors = () => {
//   const [doctors ,setDoctors] = useState([]);
//   //getusers
//   const getDoctors = async()=>{
//     try{
//       const res= await axios.get('/api/v1/admin/getAllDoctors',{
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });
//       if(res.data.success)
//       {
//         setDoctors(res.data.data);
//       }
//     }catch(error){
//        console.error(error);
//     }
//   };
//   // handle account
// const handleAccountStatus =async (record,status) => {
// try{
  
//   const res = await axios.post('/api/v1/admin/update-status',
//   { 
//   doctorId: record._id,
//      userId: record.userId,
//      status:status
//     },
//   {
//     headers: {
//     Authorization:`Bearer ${localStorage.getItem("token")}`,
//     }
//   });
//   // it the API call was successful (res.data.suceess is true)
//   if(res.data.success){
//     message.success(res.data.message);
//     window.location.reload();

//   }
//   else{
//     message.error(res.data.message || "Unknown error occurred");
//   }
// } catch(error)
// { 
  
//   message.error("Something went wrong okkk",error);
//   message.error("Something went wrong. Please try again later.");
// }

//   };
//   useEffect(()=>{
//     getDoctors();
//   },[]);

//   const columns=[{
//     title: 'Name',
//     dataIndex:'name',
//     render:(text,record)=>(
//       <span>{record.firstName} {record.lastName}</span>
//     )
//   },
// {
//   title: 'Status',
//   dataIndex:'status',

// },
// {
//   title: 'phone',
//   dataIndex:'phone',
// },

// {
//   title:'Actions',
//   dataIndex:'actions',
//   render:(text,record)=>(
//     <div className="d-flex">
//       {record.status ==='pending' ? (
//       <button className="btn btn-success" 
//       onClick={()=>handleAccountStatus(record,'approved')}>Approve</button>
//     ):(

//       <button
//       className="btn btn-danger"
//       onClick={() => handleAccountStatus(record, 'rejected')}
//     >
//       Reject
//     </button>
//     )}
     
//     </div>
//   ),
// },
// ];
//   return (
//     <Layout>
//       <h1>List of Doctors </h1>
//       <Table columns={columns} dataSource={doctors}/>
//     </Layout>
//   );
// };

// export default Doctors

import React, { useEffect, useState } from 'react';
import Layout from '../../Components/Layout';
import axios from 'axios';
import { Table, message } from 'antd';

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);

  // Function to fetch doctors data
  const getDoctors = async () => {
    try {
      const res = await axios.get('/api/v1/admin/getAllDoctors', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.error(error);
      message.error('Failed to fetch doctors data. Please try again later.');
    }
  };

  // Function to handle account status
  const handleAccountStatus = async (record, status) => {
    try {
      const res = await axios.post('/api/v1/admin/changeAccountstatus', {
        doctorId: record._id,
        userId: record.userId,
        status: status
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      });

      if (res.data.success) {
        message.success(res.data.message);
        getDoctors(); // Reload doctors data after status update
      } else {
        message.error(res.data.message || "Unknown error occurred");
      }
    } catch (error) {
      console.error(error);
      message.error("Something went wrong. Please try again later.");
    }
  };
  

  useEffect(() => {
    getDoctors();
  }, []);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (text, record) => (
        <span>{record.firstName} {record.lastName}</span>
      )
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (text, record) => (
        <div className="d-flex">
          {record.status === 'pending' ? (
            <button className="btn btn-success" onClick={() => handleAccountStatus(record, 'approved')}>Approve 
           
            </button>
            
          ) : (
            <button className="btn btn-danger" onClick={() => handleAccountStatus(record, 'rejected')}>Reject</button>
          )}
          
        </div>
        
      ),
      
    },
  ];

  return (
    <Layout>
      <h1>List of Doctors</h1>
      <Table columns={columns} dataSource={doctors} />
    </Layout>
  );
};

export default Doctors;

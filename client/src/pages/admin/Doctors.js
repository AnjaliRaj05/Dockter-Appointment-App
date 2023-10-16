import React,{useEffect,useState} from 'react'
import Layout from '../../Components/Layout';
import axios from 'axios'
import { Table, message } from 'antd';

const Doctors = () => {
  const [doctors ,setDoctors] = useState([]);
  //getusers
  const getDoctors = async()=>{
    try{
      const res= await axios.get('/api/v1/admin/getAllDoctors',{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if(res.data.success)
      {
        setDoctors(res.data.data);
      }
    }catch(error){
       console.error(error);
    }
  };
  // handle account
const handleAccountStatus =async (record,status) => {
try{
  // send a POST request to the API endpoint
  const res = await axios.post('/api/v1/admin/update-status',
  { 
  doctorId: record._id,
     userId: record.userId,
     status:status
    },
  {
    headers: {
    Authorization:`Bearer ${localStorage.getItem("token")}`,
    }
  });
  // it the API call was successful (res.data.suceess is true)
  if(res.data.success){
    // display a message notification and reload the page
    message.success(res.data.message);
    window.location.reload();

  }
} catch(error)
{ 
  //console.error("Error:", error);
  message.error("Something went wrong okkk");
}

  };
  useEffect(()=>{
    getDoctors();
  },[]);
  // antd table col
  const columns=[{
    title: 'Name',
    dataIndex:'name',
    render:(text,record)=>(
      <span>{record.firstName} {record.lastName}</span>
    )
  },
{
  title: 'Status',
  dataIndex:'status',

},
{
  title: 'phone',
  dataIndex:'phone',
},

{
  title:'Actions',
  dataIndex:'actions',
  render:(text,record)=>(
    <div className="d-flex">
      {record.status ==='pending' ? (
      <button className="btn btn-success" 
      onClick={()=>handleAccountStatus(record,'approved')}>Approve</button>
    ):(
      <button className="btn btn-danger">Reject</button>
    )}
     
    </div>
  ),
},
];
  return (
    <Layout>
      <h1>Doctors list All Doctors</h1>
      <Table columns={columns} dataSource={doctors}/>
    </Layout>
  );
};

export default Doctors

import React,{useEffect,useState} from 'react'
import Layout from '../../Components/Layout'
import axios from 'axios'
import { Table } from 'antd';
const Users = () => {
  const [users ,setUsers] = useState([]);
  //getusers
  const getUsers = async()=>{
    try{
      const res= await axios.get('/api/v1/admin/getAllUsers',{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if(res.data.success)
      {
        setUsers(res.data.data);
      }
    }catch(error){
       console.error(error);
    }
  };
  useEffect(()=>{
    getUsers();
  },[]);

  // const blockUsers = async(userId)=>{
  //   try {
  //     // Send a request to the server to block the user
  //     const res = await axios.post('/api/v1/admin/blockUser', { userId }, {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem('token')}`,
  //       },
  //     });
  //     if (res.data.success) {
  //       console.log('User blocked successfully.');
  //       // Optionally, update the user list or perform other actions
  //       getUsers();
  //     } else {
  //       console.error('Failed to block user:', res.data.message);
  //     }
  //   } catch (error) {
  //     console.error('An error occurred:', error);
  //   }
  // }
  // antd table col
  const columns=[{
    title: 'Name',
    dataIndex:'name',
  },
{
  title: 'Email',
  dataIndex:'email',

},

{
  title: 'Doctors',
   dataIndex:'isDoctor',
   render:(text,record)=>(
    <span>{record.isDoctor ? 'yes':'No'}</span>
   )
},
// {
//   title:'Actions',
//   dataIndex:'actions',
//   render:(text,record)=>(
//     <div className="d-flex">
//   <button className="btn btn-danger" onClick={() => blockUsers(record.userId)}>Block</button>
//     </div>
//   ),
// },
];
  return (
    <Layout>
      <h1 className="text-center m-2">All Users List</h1>
      <Table columns={columns} dataSource={users}/>
      

    </Layout>
  )
}

export default Users

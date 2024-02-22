import React from 'react'
import Layout from '../Components/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { Tabs, message } from 'antd';
import { showLoading,hideLoading } from '../redux/features/alertSlice';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
const NotificationPage = () => {
   const dispatch =useDispatch()
   const navigate = useNavigate()
   const {user} =useSelector((state)=>state.user);

   const handleMarkAllread= async()=>{
    try{
       dispatch(showLoading());
       const res =await axios.post('/api/v1/user//get-all-notification',
       {userId:user._id},
       {
         headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
       }
       )
       dispatch(hideLoading());
       if(res.data.success){
        window.location.reload();
         message.success(res.data.message)
       }else{
         message.error(res.data.message)
       }
    } catch(error){
      dispatch(hideLoading());
      console.log(error)
      message.error('something went wrong');
    }
   };
   const handleDeleteAllread= async()=>{
try{
  dispatch(showLoading());
  const res = await axios.post('/api/v1/user/delete-all-notification',{userId:user._id},
  {
   headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }
  )
  dispatch(hideLoading());
  if(res.data.success) {
   message.success(res.data.message);
  }else{
   message.error(res.data.message);
  }
} catch(error){
  console.log(error);
  message.error('Something went wrong in notification');
}
};
  return (
     <Layout>
        <h4 className="p-3 text-center">Notification Page</h4>
        <Tabs>
         <Tabs.TabPane tab="unRead" key={0}>
            <div className="d-flex justify-content-end ">
               <button><h4 className='p-2' onClick={handleMarkAllread}>
                  Mark All Read
                  </h4>
                  </button>
                  
            </div>

             {user && user.Notification.map((NotificationMsgs)=>(
               <div className="card" 

               style={{cursor:'pointer'}} key={NotificationMsgs._id} >
               <div className='card-text' onClick={()=>navigate(NotificationMsgs.onClickPath)}>
               {NotificationMsgs.message}
               </div>
               </div>
             ))}     
         </Tabs.TabPane>

         <Tabs.TabPane tab="Read" key={1}>
            <div className="d-flex justify-content-end">
               <h4 className='p-2 text-primary' style={{cursor:'pointer'}}onClick={handleDeleteAllread}>
                  Delete All Read
                  </h4>
            </div>
         {/*  */}
         {user && user.seennotification.map((NotificationMsgs)=>(
               <div className="card" 

               style={{cursor:'pointer'}} key={NotificationMsgs._id} >
               <div className='card-text' onClick={()=>navigate(NotificationMsgs.onClickPath)}>
               {NotificationMsgs.message}
               </div>
               </div>
             ))}  

         </Tabs.TabPane>
        </Tabs>
     </Layout>
      
   
  )
}

export default NotificationPage;

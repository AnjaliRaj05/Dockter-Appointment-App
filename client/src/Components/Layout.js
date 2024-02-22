import React from 'react'
import '../Components/layoutstyle.css';
import { adminMenu, userMenu } from '../Data/data';
import { Link, useLocation, useNavigate,  } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { Badge, message } from 'antd';
const Layout = ({children}) => {

const {user}=useSelector((state) => state.user);
const location = useLocation();
const navigate =useNavigate();

// console.log("User:", user);
// logout function
const handleLogout=() => {
    localStorage.clear()
    message.success('Logout Successfully');
    navigate('/login');
    
}
//===========doctor menu===========//
 const doctorMenu=[
    // {
    //  name:'Home',
    //  path:'/',
    //  icon:"fa-solid fa-house",
    // } ,
    {
     name:'Appointements',
     path:'/doctor-appointments',
     icon:'fa-solid fa-list',
    },
    
    {
     name:'Profile',
     path: `/doctor/profile/${user && user.user_id}`,
  
     icon:'fa-solid fa-user',
 
    }, 
    
 ];
//===========doctor menu ==========//
// rendering menu  list
// Corrected property name to match the user object
// console.log("Doctor Menu:", doctorMenu);
const SidebarMenu = user && (user.isAdmin ? adminMenu : (user.isDoctor ? doctorMenu : userMenu));
//const SidebarMenu = user && (user.isAdmin ? adminMenu : (user.isdoctor ? doctorMenu : userMenu));

// 
  return (
    <div className="main"> 
        <div className="layout">
            <div className="sidebar">
                <div className="logo">
                    <h4>DOCTOR APP</h4>
                    <hr/>
                    </div>
                <div className="menu">
                    {SidebarMenu && SidebarMenu.map((menu) =>{
                    const isActive = location.pathname === menu.path;
                    return (
                        <>
                        <div className={`menu-item ${isActive && 'active'}`}>

                      <i className={menu.icon}></i>
                      <Link to ={menu.path}>{menu.name} </Link>
                        </div>
                        </>
                    );
                })}

                <div className={`menu-item `} onClick={handleLogout}>
               <i className="fa-solid fa-right-from-bracket"></i>
               <Link to = '/login'>LogOut </Link>
              </div>
                </div>
            </div>
            <div className="content">
                <div className="header">
                <div className="header-content" style ={{cursor:"pointer"}}>
                   
                    <Badge count ={user && user.Notification.length}
                     onClick={() =>{navigate('/notification')
                     }}>
                        {/* <Avatar shape='square' size ='large' /> */}
                        <i className ="fa-solid fa-bell"></i> 
                    </Badge>

                   
                 <Link to ='/profile'>{user && user.name}</Link>
                 </div>

                   
                    </div>
                    <div className="body">{children}</div>
                </div>
                
                </div>
               </div>
      
    
  );
};

export default Layout

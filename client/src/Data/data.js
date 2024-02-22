
// admin
export const adminMenu=[
   
   // {
   //  name:'Home',
   //  path:'/',
   //  icon:"fa-solid fa-house",
   // } ,
   {
    name:'Doctors',
    path:'/admin/doctors',
    icon:'fa-solid fa-user',
   },
   {
      name:'Users',
      path:'/admin/users',
      icon:'fa-solid fa-user',
  
     },
   // {
   //  name:'Profile',
   //  path:'/Profile',
   //  icon:'fa-solid fa-user',

   // },
  
];
// user menu

export const userMenu=[
   
   {
    name:'Home',
    path:'/',
    icon:"fa-solid fa-house",
   } ,
   // {
   //  name:'Appointements',
   //  path:'/appointements',
   //  icon:'fa-solid fa-list',
   // },
   {
    name:'Apply Doctor',
    path:'/apply-docter',
    icon:'fa-solid fa-user',
   },
   
   // {
   //  name:'Profile',
   //  path:'/doctor/profile/:id',
   //  icon:'fa-solid fa-user',

   // },
   
  
];


// Doctor menu
export const doctorMenu=[
   
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
   //  path: `/doctor/profile/${user && user.user_id}`,
   path: '/doctor/profile',
    icon:'fa-solid fa-user',

   }, 
   
];
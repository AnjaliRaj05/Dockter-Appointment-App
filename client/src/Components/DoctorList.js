import React from 'react'
import { useNavigate } from 'react-router-dom';
const DoctorList = ({doctor}) => {
    const navigate =useNavigate();
    const mystyle= {
      color:'black',
      backgroundColor:'#bae8e8',
      boxShadow: '1px 2px 9px gray'
    }
  return (
    <>
     <div className='card m-2' style={{cursor:"pointer"}} onClick={()=>navigate(`/doctor/book-appointment/${doctor._id}`)}>
    <div className='card-header text-center' style={{backgroundColor:"#272343",color:"white",fontFamily:'sans-serif'}}>
      Dr.{doctor.firstName} {doctor.lastName}
    </div>
    <div className='card-body' style= {mystyle}>
     <p style={{fontFamily:'sans-serif'}}>
        <b>Specialization: </b>{doctor.specialization}
     </p>
     <p>
     <b>Experience: </b>{doctor.experience}
     </p>
     <p>
     <b>Fees Per Consulatation:</b>{doctor.feesPerConsulation}
     </p>
     <p>
        <b>Timings</b> {doctor.timings[0]} - {doctor.timings[1]}
     </p>
    </div>
    </div>
    </>
  )
}

export default DoctorList

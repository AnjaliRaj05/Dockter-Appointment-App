// import React, { useEffect, useState } from 'react';
// import Layout from '../Components/Layout';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { DatePicker, TimePicker, message } from 'antd';
// import pic from '../Components/applogo.png';
// import moment from 'moment';
// import { useDispatch, useSelector } from 'react-redux';
// import { hideLoading, showLoading } from '../redux/features/alertSlice';

// const BookingPage = () => {
//   const { user } = useSelector((state) => state.user);
//   const params = useParams();
//   const dispatch = useDispatch();
//   const [doctors, setDoctors] = useState([]);
//   const [date, setDate] = useState(null);
//   const [time, setTime] = useState(null);
//   const [availableTime, setAvailableTime] = useState(false);

//   const getUserData = async () => {
//     try {
//       const res = await axios.post(
//         '/api/v1/doctor/getDoctorById',
//         { doctorId: params.doctorId },
//         {
//           headers: {
//             Authorization: 'Bearer ' + localStorage.getItem('token'),
//           },
//         }
//       );

//       if (res.data.success) {
//         setDoctors(res.data.data);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleBooking = async () => {
//     try {
//       if (!date || !time) {
//         return alert('Date and Time Required');
//       }

//       dispatch(showLoading());
//       const res = await axios.post(
//         '/api/v1/user/book-appointment',
//         {
//           doctorId: params.doctorId,
//           userId: user._id,
//           doctorInfo: doctors,
//           userInfo: user,
//           date: date,
//           time: time,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`,
//           },
//         }
//       );

//       dispatch(hideLoading());

//       if (res.data.success) {
//         message.success(res.data.message);
//       }
//     } catch (error) {
//       dispatch(hideLoading());
//       console.log(error);
//     }
//   };

//   const handleAvailability = async () => {
//     try {
//       dispatch(showLoading());
//       const res = await axios.post(
//         '/api/v1/user/booking-availability',
//         { doctorId: params.doctorId, date, time },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`,
//           },
//         }
//       );

//       dispatch(hideLoading());

//       if (res.data.success) {
//         setAvailableTime(true);
//         message.success(res.data.message);
//       } else {
//         setAvailableTime(false);
//         message.error(res.data.message);
//       }
//     } catch (error) {
//       dispatch(hideLoading());
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getUserData();
//   }, []);

//   return (
//     <>
//       <Layout>
//         <div className="appointment-container-box">
//         <div className="appointment-container1">
//         <img src={pic}></img>
//         </div>
//         <div className="appointment-container2">
//         {doctors && (
//          <div>
//                 <h4>Dr.{doctors.firstName} {doctors.lastName}</h4>
//                 <h4>Experience:{doctors.experience}</h4>
//                 <h4>Specialization:{doctors.specialization}</h4>
//                 <h4>Fees :{doctors.feesPerConsulation}</h4>
//                 <h4>Timings :{doctors.timings}</h4>

//                 <DatePicker
//                     className="m-2"
//                     format="DD-MM-YYYY"
//                     onChange={(value) => {
//                       setAvailableTime(false);
//                       setDate(moment(value).format('DD-MM-YYYY'));
//                     }}
//                   />
//                   <TimePicker
//                     className="m-2"
//                     format="HH:mm"
//                     onChange={(value) => {
//                       setAvailableTime(false);
//                       setTime(moment(value).format('HH:mm'));
//                     }}
//                   />

//                   <button className="btn btn-primary m-2" onClick={handleAvailability}>
//                     Check Availability
//                   </button>
//                   {!availableTime && (
//                     <button className="btn btn-dark m-2" onClick={handleBooking}>
//                       Book Now
//                     </button>
//                      </div>
       
//         )}
       
//           }
//           </div>
//         </div>
        
//       </Layout>
//     </>
//   );
// };

// export default BookingPage;
import React, { useEffect, useState } from 'react';
import Layout from '../Components/Layout';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { DatePicker, TimePicker, message } from 'antd';
import pic from '../Components/applogo.png';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoading, showLoading } from '../redux/features/alertSlice';

const BookingPage = () => {
  const { user } = useSelector((state) => state.user);
  const params = useParams();
  const dispatch = useDispatch();
  const [doctors, setDoctors] = useState([]);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [availableTime, setAvailableTime] = useState(false);

  const getUserData = async () => {
    try {
      const res = await axios.post(
        '/api/v1/doctor/getDoctorById',
        { doctorId: params.doctorId },
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        }
      );

      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleBooking = async () => {
    try {
      if (!date || !time) {
        return alert('Date and Time Required');
      }

      dispatch(showLoading());
      const res = await axios.post(
        '/api/v1/user/book-appointment',
        {
          doctorId: params.doctorId,
          userId: user._id,
          doctorInfo: doctors,
          userInfo: user,
          date: date,
          time: time,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      dispatch(hideLoading());

      if (res.data.success) {
        message.success(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  const handleAvailability = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        '/api/v1/user/booking-availability',
        { doctorId: params.doctorId, date, time },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      dispatch(hideLoading());

      if (res.data.success) {
        setAvailableTime(true);
        message.success(res.data.message);
      } else {
        setAvailableTime(false);
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
      <Layout>
        <div className="appointment-container-box">
          <div className="appointment-container1">
            <img src={pic} alt="Doctor" />
          </div>
          <div className="appointment-container2">
            {doctors && (
              <div>
                <div className="txt-cnter">
                  {/* <h1>{moment().format('dddd')} </h1> */}
                <h4>Dr.{doctors.firstName} {doctors.lastName}</h4>
                <h4>Experience: {doctors.experience}</h4>
                <h4>Specialization: {doctors.specialization}</h4>
                <h4>Fees: {doctors.feesPerConsulation}</h4>
                <h4>Timings: {doctors.timings}</h4>&nbsp;
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                <DatePicker
                  className="m-2"
                  format="DD-MM-YYYY"
                  onChange={(value) => {
                    setAvailableTime(false);
                    setDate(moment(value).format('DD-MM-YYYY'));
                  }}
                />
                <TimePicker
                  className="m-2"
                  format="HH:mm"
                  onChange={(value) => {
                    setAvailableTime(false);
                    setTime(moment(value).format('HH:mm'));
                  }}
                />
                 
                <button className="btn btn-primary m-2" onClick={handleAvailability}>
                  Check Availability
                </button>
                {!availableTime && (
                  <button className="btn btn-dark m-2" onClick={handleBooking}>
                    Book Now
                  </button>

                )}
               </div>
              </div>
            )}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default BookingPage;

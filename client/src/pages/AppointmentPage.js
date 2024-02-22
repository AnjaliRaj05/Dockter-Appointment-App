
import React, { useEffect, useState } from 'react';
import Layout from '../Components/Layout';
import axios from 'axios';
import moment from 'moment';
import { Table } from 'antd';

const AppointmentPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [user, setUser] = useState({
   // _id: '64e4e7568ac7f5865ef1a534',
   // userId: user._id
    // ... other user properties
  });

  const getAppointments = async (userId) => {
    try {
      // const res = await axios.get('/api/v1/user/user-appointmentslist', {
      //   headers: {
      //     Authorization: `Bearer ${localStorage.getItem('token')}`,
      //   },
      //   params: {
      //    // userId: user._id,
      //     // userId: user._id
      //   },
      // });
      const res = await axios.get('/api/v1/user/user-appointmentslist',{
    // const res = await axios.get(`/api/v1/user/user-appointmentslist`{
      //const res = await axios.get(`/api/v1/user/user-appointmentslist`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        params: {
         userId: userId,
         timestamp: new Date().getTime()
        },
      });
      
      console.log('API Response:', res.data);
      if (res.data.success) {
        console.log('Data from Server:', res.data.data);
        setAppointments(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // setUser({
    //   //id: '64e4e7568ac7f5865',
    //   // userId: user._id
    // });
    const userId = '64e4e7568ac7f5865';
    getAppointments(user._Id);
  }, [user.id]);

  const columns = [
    {
      title: 'ID',
      dataIndex: '_id',
    },
    {
      title: 'Name',
      dataIndex: 'doctorId',
      render: (text, record) => {
        console.log('Doctor Record:', record);
        return (
          <span>
            {record.doctorId.firstName} {record.doctorId.lastName}
          </span>
        );
      },
    },
    {
      title: 'Phone',
      dataIndex: 'doctorId',
      render: (text, record) => {
        console.log('Doctor Record:', record);
        return (
          <span>
            {record.doctorId.phone}
          </span>
        );
      },
    },
    {
      title: 'Date and Time',
      dataIndex: 'date',
      render: (text, record) => (
        <span>
          {moment(record.date).format('DD-MM-YYYY HH:mm:ss')} &nbsp;
          {moment(record.time).format('HH:mm')}
        </span>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
  ];

  return (
    <Layout>
      <h1>Appointments List </h1>
      <Table columns={columns} dataSource={appointments} />
    </Layout>
  );
};

export default AppointmentPage;


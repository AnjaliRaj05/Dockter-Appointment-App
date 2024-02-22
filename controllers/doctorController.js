const appointmentModel = require('../models/appointmentModel');
const doctorModel =require('../models/doctorModel');
const userModel = require('../models/userModel');
const getDoctorInfoController =async(req,res)=>{
    try{
const doctor = await doctorModel.findOne({userId: req.body.userId });
res.status(200).send({
    success:true,
    message:'doctor data fetched successfully',
    data:doctor,

});

} catch(error){ 
  console.log(error);
  res.status(500).send({
    success:false,
    error,
    message:'Error fetching in doctor profile',
  });
}
};
const updateProfileController =async(req,res)=>{
try{
   const doctor = await doctorModel.findOneAndUpdate({userId: req.body.userId},
    req.body );
    res.status(201).send({
      success:true,
      message:'doctor data updated',
      data:doctor,
  
  });
}catch(error){
  console.log(error);
  res.status(500).send({
    success:false,
    error,
    message:'Error fetching in doctor profile',
  });
}
}
// get single doctoor controller 
const getDoctorByIdController =async(req,res)=>{
try{
  const doctor = await doctorModel.findOne({_id:req.body.doctorId});
  res.status(200).send({
    success:true,
    message:'Single Doctor Info feched successfully',
    data:doctor,
  })
}catch(error){
  console.log(error);
  res.status(500).send({
    success:false,
    error,
    message:'Error fetching in single doctor profile',
  });
}
}
const doctorAppointmentsController =async(req, res)=>{
  try{
    const doctor = await doctorModel.findOne({userId:req.body.userId});
    const appointments = await appointmentModel.find({
      doctorId:doctor._id,
    });
    res.status(200).send({
      success:true,
      message:'Doctors Appointments feched sucessfully',
      data: appointments,
    });
  }
    catch(error){
      console.log(error);
      res.status(500).send({
        success:false,
        error,
        message:'Error in Doctor Appointments',
      });
    
  }
  };

const updateStatusController =async(req,res)=>{
try{
const {appointmentsId,status} = req.body
const appointments = await appointmentModel.findByIdAndUpdate(appointmentsId,{status})
const user = await userModel.findOne({_id:appointments.userId});
 const notification =  user.Notification;
  notification.push({
      type:"status-updated",
      message: `your appointments has been  ${status}`,
      onclickPath:"/doctor-appointments",
    }); 
    await user.save();
    res.status(200).send({
      success:true,
      message:"appoinment status updated",
    })
}catch (error){
console.log(error);
res.status(500).send({
  success:false,
  error,
  message:'Error in update status'
})
}
};
module.exports={getDoctorInfoController,updateProfileController,getDoctorByIdController,doctorAppointmentsController,updateStatusController};
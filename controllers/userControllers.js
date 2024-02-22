const userModel=require('../models/userModel')
const bcrypt = require('bcryptjs');
const jwt =require('jsonwebtoken');
const doctorModel = require('../models/doctorModel');
const appointmentModel =require('../models/appointmentModel');
const moment = require('moment');
const registerController = async (req, res) => {
  try {
    const exisitingUser = await userModel.findOne({ email: req.body.email });
    if (exisitingUser) {
      return res
        .status(200)
        .send({ message: "User Already Exist", success: false });
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const newUser = new userModel(req.body);
    await newUser.save();
    res.status(201).send({ message: "Register Sucessfully", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Register Controller ${error.message}`,
    });
  }
};
const loginController = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    console.log('user not found' ,user);
    if (!user) {
      return res
        .status(200)
        .send({ message: "user not found", success: false });
        
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res
        .status(200)
        .send({ message: "Invalid EMail or Password", success: false });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d"})
    res.status(200).send({ message: "Login Success", success: true, token });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: `Error in Login CTRL ${error.message}` });
  }
};

const authController = async (req, res) => {
  try {
    const user = await userModel.findById({ _id: req.body.userId });
    user.password =undefined;
    if (!user) {
      return res.status(200).send({
        message: "user not found",
        success: false,
      });
    } else {
      res.status(200).send({
        success: true,
        data:user
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "auth error",
      success: false,
      error,
    });
  }
}; 
// apply doctor
const applyDoctorController =async(req, res)=>{
  console.log("request Body:",req.body);
  try{
     const newDoctor =await doctorModel({...req.body, status:'pending'});
     console.log("new doctor data before",newDoctor);
     await newDoctor.save();
     const savedDoctor = await doctorModel.findById(newDoctor._id);
     console.log("new doctor data after save:", savedDoctor);

     const adminUser =await userModel.findOne({isAdmin:true});
     const Notification = adminUser.Notification || [];

     Notification.push({
      type:"apply-doctor-request",
      message: `${newDoctor.firstName} ${newDoctor.lastName} Has Applied For a Doctor Account`,
      data:{
        doctorId:newDoctor._id,
        name:newDoctor.firstName + " " + newDoctor.lastName,
        onclickPath: "/admin/doctors"
      },
     });
     await userModel.findByIdAndUpdate(adminUser._id,{Notification});
     res.status(201).send({
      success:true,
      message:"Doctor Accounnt Successfully applied",
     });
  } catch(error)
  {
  console.log(error); // log detailed error for debugging
  res.status(500).send({
    success:false,
    message: "Error while Applying for Doctor",
    error:error.message,
  });
  }
};

//get notofication controller 
const getAllNotificationrController = async(req,res)=>{
  try{
  const user = await userModel.findOne({_id:req.body.userId});
  const seennotification = user.seennotification;
  const Notification  =user.Notification ;
  seennotification.push(...Notification );
  user.Notification =[];
  user.seennotification=Notification ;
  const updatedUser=await user.save();
  res.status(200).send({
    success:true,
    message:"all notification marked as read",
    data:updatedUser,
  });
 
  } catch(error){
  console.log(error); // log detailed error for debugging
  res.status(500).send({
    message:'Error in notification',
    success:false,
    error,
  })
  
  }
}
// delete function controller 
const deleteAllNotificationrController =async(req,res)=>{
try{
   const user =await userModel.findOne({_id: req.body.userId});
   user.Notification=[];
   user.seennotification=[];
   const updateUser=await user.save();
   updateUser.password =undefined;
   res.status(200).send({
    success: true,
    message: 'Notification deleted successfully',
    data:updateUser,
   })

}catch(error){
 console.log(error);
 res.status(500).send({
  success:false,
  message:'unable to delete all notification',
  error
 })
}
};
const getALLDoctorsController = async(req, res)=>{
try{
   const doctors = await doctorModel.find({status:'approved'}) //object
   res.status(200).send({
    success:true,
    message:'Doctors Lists Fetched Successfully',
    data:doctors,
   });
}catch(error){
  console.log(error);
  res.status(500).send({
   success:false,
   message:'Error while fetching Doctors',
   error
  });
 }
}; 
const bookAppointmentController=async(req,res)=>{
  try{
    req.body.date= moment(req.body.date,'DD-MM-YYYY').toISOString();
    req.body.time= moment(req.body.time,'HH:mm').toISOString();
    req.body.status = 'pending';
    const newAppointment = new appointmentModel(req.body);
    await newAppointment.save();
    const user = await userModel.findOne({_id: req.body.doctorInfo.userId});
    user.Notification.push({
      type:"New-appointment-request",
      message: `A New Appointment Request From ${req.body.userInfo.name}`,
      onclickPath:"/user/appointments",
    }); 
    await user.save();
    res.status(200).send({
      success:true,
      message:"appointment booked successfully",
    });
  }catch(error){
    console.log(error);
    res.status(500).send({
     success:false,
     message:'Error while booking appointment',
     error
    });
   }
}
const bookingAvaililityController =async(req,res)=>{
try{
  const date =moment(req.params.date,'DD-MM-YYYY').toISOString();
  const fromtime = moment(req.params.time,'HH:mm').subtract(1,'hours').toISOString();
  const totime = moment(req.params.time,'HH:mm').add(1,'hours').toISOString();
  const doctorId =req.body.doctorId
  const appointments = await appointmentModel.find({doctorId,
    date,
    time:{
      $gte:fromtime, $lte:totime
    }
  })
  if(appointments.length > 0)
  {
   return res.status(200).send({
    message:'Appointments are not avaiable at this time',
    success:true,
   }) 
  } else{
    return res.status(200).send({
      success:true,
      message:'Appointment are available'
    })
  }
}catch(error){
console.log(error);
res.status(500).send({
  success:false,
  message:'Error while fetching booking availability',
  error
 });
}
}

const appointmentsListController = async(req,res)=>
{
  try{
   const userId = req.query.userId;
   console.log('Received request for user ID:', userId);
   const appointments = await appointmentModel.find({
    userId: userId,
   });
   console.log('Appointments found:', appointments);
   res.status(200).send({
    success:true,
    message:'Users Appointments Fetch Successfully',
    data: appointments,
   });
  }catch(error){
    console.log(error);
    res.status(500).send({
      success:false,
      error,
      message:'Error in user appointments'
    })
  }
}


module.exports={loginController,registerController,authController,applyDoctorController,getAllNotificationrController,deleteAllNotificationrController,getALLDoctorsController,bookAppointmentController,bookingAvaililityController,appointmentsListController};
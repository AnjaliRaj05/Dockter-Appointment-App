const doctorModel=require('../models/doctorModel');
const userModel=require('../models/userModel');
const getAllUsersControllers = async(req,res)=>{
  try{
    const users =await userModel.find({});
    res.status(200).send({
        success: true,
        message:'users data list',
        data: users,
    });
  } catch(error)
  {
    console.log(error);
    res.status(500).send({
        success: false,
        message:'error  while fetching users',
        error,
    });
  }
};

const getAllDoctorsControllers=async(req, res)=>{
  try{
    const doctors =await doctorModel.find({});
    res.status(200).send({
        success: true,
        message:'Doctors data list feched suceessfully',
        data: doctors,
    });
  } catch(error){
    console.log(error);
    res.status(500).send({
        success: false,
        message:'error  while feching doctors data',
        error,
    });
  }
};

const changeAccountStatusControllers=async(req, res)=>{
try{
    const {doctorId,status}= req.body;
    const doctor = await doctorModel.findByIdAndUpdate(doctorId,{status});
    const user =await userModel.findOne({_id:doctor.userId});

    const   Notification =user.Notification;
    Notification.push({
      type:"doctor-account-request-updated",
      message:`your Doctor Account Request Has ${status}`,
      onclickPath: "/notification",
//check the path later it is wrong witten ig
    });
  
    user.isDoctor = status === 'approved' ? true : false;
    await user.save();
    res.status(201).send({
      success: true,
      message:'Account status updated',
      data:doctor,
    });

} catch(error){
  console.log(error);
  res.status(500).send({
    success: false,
    message:'error while changing account status',
    error
  });
}
};

  const blockUserControllers = async (req, res) => {

    
  };
module.exports={getAllDoctorsControllers,getAllUsersControllers,changeAccountStatusControllers,blockUserControllers};

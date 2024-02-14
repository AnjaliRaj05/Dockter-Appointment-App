const mongoose = require('mongoose')
const connectDB=async()=>{
 try{
 await mongoose.connect(process.env.MONGO_URL);
 console.log("mongodb connected ${mongoose.connection.host}")
    }catch(error){
   console.log('mongo db connected ${error}')
    }
};

module.exports=connectDB;
// const express = require('express');
// //const colors = require('colors');
// const morgan = require('morgan');
// const dotenv = require('dotenv');
// const connectDB = require('./config/db');
// // dotenv

// dotenv.config();
// connectDB();

// const app = express();
// // middlewares
// app.use(express.json())
// app.use(morgan('dev'));

// //routes
// app.use("/api/v1/user",require("./routes/userRoutes"));
// const PORT = process.env.PORT || 5000;

// app.listen(PORT,()=>{
//     console.log(`Node Server Running IN ${process.env.DEV_MODE} ModeON Port ${process.env.PORT}`.bgBlue.white);
//     // console.log("running on:PORT number:",PORT);
    
    
// })


const express = require('express');
const dotenv = require('dotenv');
const colors=require('colors');
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();
connectDB();
// connect database

const app = express();
// middleware 
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
// routing 

app.use("/api/v1/user", require("./routes/userRoutes"));
app.use("/api/v1/admin",require("./routes/adminRoutes"));
app.use("/api/v1/doctor",require("./routes/doctorRoutes"));

const PORT=process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Node Server Running IN ${process.env.DEV_MODE} ModeON Port ${process.env.PORT}`.bgBlue.white);
})


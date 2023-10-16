const express =require('express');

const { loginController, registerController, authController,
     applyDoctorController, getAllNotificationrController,
     deleteAllNotificationrController, getALLDoctorsController, 
     bookAppointmentController,
     bookingAvaililityController,
     appointmentsListController} = require('../controllers/userControllers');
const authMiddleware = require('../middlewares/authMiddleware');
const router=express.Router();

router.post('/login',loginController);
router.post('/register',registerController);
// auth post
router.post('/getUserData',authMiddleware,authController);

// apply doctor  post
router.post('/apply-docter',authMiddleware,applyDoctorController);

// for notification  post
router.post('/get-all-notification',authMiddleware,getAllNotificationrController);

// to delete notification
router.post('/delete-all-notification',authMiddleware,deleteAllNotificationrController);
//GET ALL DOCTOR in HOMEPAGE ROUTE
router.get('/getAllDoctors',authMiddleware,getALLDoctorsController);
//BOOK APPOINTEMNET
router.post('/book-appointment',authMiddleware,bookAppointmentController);

// Booking availablity
router.post('/booking-availbility',authMiddleware,bookingAvaililityController);
// Appointments List 
router.get('/user-appointmentslist',authMiddleware,appointmentsListController);
module.exports=router;
const express =require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { getAllDoctorsControllers, getAllUsersControllers, changeAccountStatusControllers, } = require('../controllers/adminControllers');
const router=express.Router()

//GET METHOD || USERS 
router.get('/getAllUsers',authMiddleware,getAllUsersControllers);
//GET METHOD || DOCOTORS
router.get('/getAllDoctors',authMiddleware,getAllDoctorsControllers);
// POST ACCOUNT STATUS
router.post('/changeAccountstatus',authMiddleware,changeAccountStatusControllers);

module.exports=router;
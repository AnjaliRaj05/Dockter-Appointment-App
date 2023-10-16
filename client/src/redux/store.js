import { configureStore } from '@reduxjs/toolkit';
import { alertSlice } from './features/alertSlice';
import { userSlice } from './features/userSlice';


export default configureStore({
    reducer:{
      alerts: alertSlice.reducer,
      // for getting user name in page
    user:userSlice.reducer,
        
    },
})
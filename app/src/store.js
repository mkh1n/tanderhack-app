import { configureStore } from '@reduxjs/toolkit';
import messagesReducer from './slices/messagesSlice';
import contractReducer from './slices/contractSlice';
export default configureStore({
  reducer: {
    messages: messagesReducer,
    contract: contractReducer,
  },
});

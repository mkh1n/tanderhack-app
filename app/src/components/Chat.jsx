import { useEffect } from 'react';
import Messages from './Messages';
import axios from 'axios';
import routes from '../routes';
import { setMessages } from '../slices/messagesSlice';
import { useDispatch } from 'react-redux';

const Chat = () => {
  const dispatch = useDispatch()
  const fetchMessages = async (dispatch) => {
      const res = await axios.get(routes.messagesPath());
      dispatch(setMessages(res.data))
      return res.data;
  };
  useEffect(()=>{
    fetchMessages(dispatch);
  }, []);

  return <Messages/>
}
export default Chat;
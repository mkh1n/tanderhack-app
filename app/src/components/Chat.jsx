import { useEffect } from 'react';
import Messages from './Messages';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import routes from '../routes';
import { setMessages } from '../slices/messagesSlice';

const Chat = () => {
  const dispatch = useDispatch();

  const fetchMessages = async (dispatch) => {
      const res = await axios.get(routes.messagesPath());
      dispatch(setMessages(res.data)); /* eslint-disable-line */
      return res.data;
  };
  useEffect(()=>{
    fetchMessages(dispatch)
  }, [])
  return <Messages/>
}
export default Chat;
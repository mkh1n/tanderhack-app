import { useEffect } from 'react';
import Messages from './Messages';
import axios from 'axios';
import routes from '../routes';

const Chat = () => {
  const fetchMessages = async () => {
      const res = await axios.get(routes.messagesPath());
      return res.data;
  };
  useEffect(()=>{
    fetchMessages();
  }, []);

  return <Messages/>
}
export default Chat;
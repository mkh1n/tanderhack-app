import { useDispatch, useSelector } from 'react-redux';
import { Col } from 'react-bootstrap';
import { useRef, useEffect } from 'react';
import Message from './Message';
import MessagesForm from './MessagesForm';
import { selectMessages } from '../slices/messagesSlice';
import { selectSelectedChapter, setSelectedChapter } from '../slices/contractSlice';
import routes from '../routes';
import axios from 'axios';
import { setMessages } from '../slices/messagesSlice';

const fetchMessages = async (dispatch) => {
  const res = await axios.get(routes.messagesPath());
  dispatch(setMessages(res.data));
  return res.data;
}
const Messages = () => {
  const messages = useSelector(selectMessages);
  const selectedChapter = useSelector(selectSelectedChapter);
  const container = useRef(null);
  const bottomRef = useRef(null);
  const dispatch = useDispatch();

  const Scroll = () => {
    const { scrollTop } = container.current;
    if (scrollTop >= -200) {
      container.current?.scrollTo(0, 0);
    }
  };

  useEffect(() => {
    Scroll();
  }, [messages]);

  useEffect(() => {
    fetchMessages(dispatch)
    bottomRef.current?.scrollIntoView();
  }, []);

  console.log(messages)
  const messagesList = messages.map((message) => (
    <Message
      username={message.username}
      body={message.body}
      id={message.id}
      options={message.options}
      key={message.id}
    />
  ));
  messagesList.reverse();

  return (
    <Col className="p-0 h-100" id="chat">
      <div id="messagesHeader">
        <svg
          id="headerIcon"
          xmlns="http://www.w3.org/2000/svg" className="SvgUse__SubTaskItemContainer-sc-15td9ev-0 dEBNhw ui inline image pointing" width="25" height="26"><defs><svg viewBox="0 0 25 26" xmlns="http://www.w3.org/2000/svg" id="qa"><path d="M20.85 10.13v-.923c0-2.208-.796-4.26-2.238-5.783-1.479-1.563-3.512-2.42-5.73-2.42h-.775c-2.218 0-4.251.857-5.73 2.42C4.935 4.947 4.14 7 4.14 9.207v.923c-1.75.116-3.142 1.548-3.142 3.297v1.442c0 1.82 1.51 3.303 3.363 3.303h1.894a.612.612 0 00.616-.605v-6.842a.612.612 0 00-.616-.605h-.883v-.913c0-3.988 2.896-6.993 6.73-6.993h.776c3.84 0 6.73 3.005 6.73 6.993v.913h-.883a.612.612 0 00-.616.605v6.837c0 .333.278.605.616.605h.863c-.252 3.156-2.464 3.887-3.491 4.054a2.163 2.163 0 00-2.059-1.467h-1.54c-1.191 0-2.161.953-2.161 2.122s.97 2.128 2.16 2.128h1.546a2.16 2.16 0 002.085-1.563 5.9 5.9 0 002.09-.7c1.113-.641 2.433-1.947 2.607-4.579 1.761-.106 3.158-1.543 3.158-3.298v-1.442c.005-1.744-1.381-3.181-3.132-3.292zM5.648 16.957H4.37c-1.176 0-2.13-.938-2.13-2.093v-1.442c0-1.154.954-2.092 2.13-2.092h1.278v5.627zm8.394 6.837h-1.545c-.514 0-.93-.409-.93-.913s.416-.912.93-.912h1.545c.513 0 .93.408.93.912s-.417.913-.93.913zm8.712-8.93c0 1.155-.955 2.093-2.13 2.093h-1.279V11.33h1.279c1.175 0 2.13.938 2.13 2.092v1.442z" fill="#264b82"></path></svg></defs><g stroke="#264B82" fill="none"><path d="M20.85 10.13v-.923c0-2.208-.796-4.26-2.238-5.783-1.479-1.563-3.512-2.42-5.73-2.42h-.775c-2.218 0-4.251.857-5.73 2.42C4.935 4.947 4.14 7 4.14 9.207v.923c-1.75.116-3.142 1.548-3.142 3.297v1.442c0 1.82 1.51 3.303 3.363 3.303h1.894a.612.612 0 00.616-.605v-6.842a.612.612 0 00-.616-.605h-.883v-.913c0-3.988 2.896-6.993 6.73-6.993h.776c3.84 0 6.73 3.005 6.73 6.993v.913h-.883a.612.612 0 00-.616.605v6.837c0 .333.278.605.616.605h.863c-.252 3.156-2.464 3.887-3.491 4.054a2.163 2.163 0 00-2.059-1.467h-1.54c-1.191 0-2.161.953-2.161 2.122s.97 2.128 2.16 2.128h1.546a2.16 2.16 0 002.085-1.563 5.9 5.9 0 002.09-.7c1.113-.641 2.433-1.947 2.607-4.579 1.761-.106 3.158-1.543 3.158-3.298v-1.442c.005-1.744-1.381-3.181-3.132-3.292zM5.648 16.957H4.37c-1.176 0-2.13-.938-2.13-2.093v-1.442c0-1.154.954-2.092 2.13-2.092h1.278v5.627zm8.394 6.837h-1.545c-.514 0-.93-.409-.93-.913s.416-.912.93-.912h1.545c.513 0 .93.408.93.912s-.417.913-.93.913zm8.712-8.93c0 1.155-.955 2.093-2.13 2.093h-1.279V11.33h1.279c1.175 0 2.13.938 2.13 2.092v1.442z" fill="#264b82"></path></g>
        </svg>
        <h4>Чат-бот</h4>
      </div>
      <div id="messages-box" className="chat-messages overflow-auto h-100 messagesPadding" ref={container}>
        {messagesList}
        <div
          ref={bottomRef}
          style={{ position: 'absolute' }}
        />
      </div>
      <div id="selectedChapter" className={selectedChapter.length !== 0 ? '' : 'hide'}>
          {selectedChapter}
          <svg id="closeSelectedChapter" 
          onClick={()=>dispatch(setSelectedChapter(""))}xmlns="http://www.w3.org/2000/svg" fill="#000000" width="800" height="800" viewBox="0 0 32 32">
              <path d="M18.8,16l5.5-5.5c0.8-0.8,0.8-2,0-2.8l0,0C24,7.3,23.5,7,23,7c-0.5,0-1,0.2-1.4,0.6L16,13.2l-5.5-5.5  c-0.8-0.8-2.1-0.8-2.8,0C7.3,8,7,8.5,7,9.1s0.2,1,0.6,1.4l5.5,5.5l-5.5,5.5C7.3,21.9,7,22.4,7,23c0,0.5,0.2,1,0.6,1.4  C8,24.8,8.5,25,9,25c0.5,0,1-0.2,1.4-0.6l5.5-5.5l5.5,5.5c0.8,0.8,2.1,0.8,2.8,0c0.8-0.8,0.8-2.1,0-2.8L18.8,16z"></path>
          </svg>
        </div>
      <MessagesForm />
    </Col>
  );
};

export default Messages;

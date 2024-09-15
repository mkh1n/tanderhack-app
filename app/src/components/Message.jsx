import { Anchorme } from 'react-anchorme';
import axios from 'axios';
import routes from '../routes';

const Message = ({
  // eslint-disable-next-line react/prop-types
  username, body, options
}) => {
  const isMessageMine = username === 'you';
  // eslint-disable-next-line react/prop-types
  const lines = body.split('\n').map((line, index) => (
    <div key={index}><Anchorme target="_blank">{line}</Anchorme></div>
  ));

  const handleButtonClick = (messageText) => async () => {
    const newMessage = {
      username: "you",
      id: (new Date()).getTime(),
      body: messageText,
    }
    const res = await axios.post(routes.messagesPath(), newMessage);
    
    return res.data;
  }

  const renderButtons = () => {
    if (options) {
      return <div className='messageButtonsHolder'>
        {
          // eslint-disable-next-line react/prop-types
          options.map((option) => {
            return <div key={(new Date()).getTime()} 
              className='messageButton' 
              onClick={handleButtonClick(option.text)}>
                {option.text}
              </div>
          })
        }
      </div>
    }
  }
  return (
    <div className="messageHolder">
      <div className={`d-flex justify-content-between align-items-end text-break message
    ${isMessageMine ? ' fromMe' : ''}`}
      >
        <>
          <div className="usernameBlock">
            {isMessageMine ? "Вы" : "Помощник"}
          </div>
          <div className="innerMessage">
            {lines}
          </div>
        </>
      </div>
      {renderButtons()}
    </div>

  );
};

export default Message;

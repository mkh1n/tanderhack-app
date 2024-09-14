import { Anchorme } from 'react-anchorme';
import { useDispatch } from 'react-redux';
import { postMessage } from './MessagesForm';
const Message = ({
  // eslint-disable-next-line react/prop-types
  username, body, options
}) => {
  const isMessageMine = username === 'you';
  const dispatch = useDispatch()
  // eslint-disable-next-line react/prop-types
  const lines = body.split('\n').map((line, index) => (
    <div key={index}><Anchorme target="_blank">{line}</Anchorme></div>
  ));

  const handleButtonClick = (messageText) => () => {
    const newMessage = {
      username: "you",
      id: (new Date()).getTime(),
      body: messageText,
    }
    postMessage(dispatch, newMessage)
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
            {isMessageMine ? "Вы" : username}
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

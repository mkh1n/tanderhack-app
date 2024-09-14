/* eslint-disable no-useless-catch */
import { Anchorme } from 'react-anchorme';
import { useDispatch } from 'react-redux';

const Message = ({
  // eslint-disable-next-line react/prop-types
  username, body, id
}) => {
  const isMessageMine = username === 'you';
  const dispatch = useDispatch()
  console.log(id, body)/* eslint-disable-line */
  // eslint-disable-next-line react/prop-types
  const lines = body.split('\n').map((line, index) => (
    // eslint-disable-next-line react/no-array-index-key
    <div key={index}><Anchorme target="_blank">{line}</Anchorme></div>
  ));

  const handleButtonClick = (messageText) => () => {
    const newMessage = {
      username: "you",
      id: (new Date()).getTime(),
      body: messageText,
    }
    dispatch(addMessage(newMessage))
  }

  const renderButtons = (message) => {
    if (message.hasButtons) {
      return <div className='messageButtonsHolder'>
        {
          message.buttons.map((button) => {
            return <div key={(new Date()).getTime()} 
              className='messageButton' 
              onClick={handleButtonClick(button.text)}>
                {button.text}
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

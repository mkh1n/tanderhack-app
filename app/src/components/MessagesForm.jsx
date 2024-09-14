import { useFormik } from 'formik';
import { useState, useEffect, useRef } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import {Form, Button} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addMessage } from '../slices/messagesSlice';
// import routes from '../../routes';

const postMessage = async (dispatch, newMessage) => {
  // const res = await axios.post(routes.messagesPath(), newMessage, {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // });
  // return res.data;
  dispatch(addMessage(newMessage)); /* eslint-disable-line */

};

const MessageForm = () => {
  const bodyEl = document.body;
  const [isSending, setIsSending] = useState(false);
  const formRef = useRef(null);
  const [isMobileKeyboard, setIsMobileKeyboard] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const dispatch = useDispatch();
  // eslint-disable-next-line consistent-return
  useEffect(() => { /* eslint-disable-line */
    if ('virtualKeyboard' in navigator) {
      navigator.virtualKeyboard.overlaysContent = true; /* eslint-disable-line */

      const updateKeyboardHeight = () => {
        const { height } = navigator.virtualKeyboard.boundingRect;
        setKeyboardHeight(height); /* eslint-disable-line */
        setIsMobileKeyboard(height !== 0); /* eslint-disable-line */
      };

      navigator.virtualKeyboard.addEventListener('geometrychange', updateKeyboardHeight); /* eslint-disable-line */

      return () => {
        navigator.virtualKeyboard.removeEventListener('geometrychange', updateKeyboardHeight); /* eslint-disable-line */
      };
    }
  }, []);

  useEffect(() => { /* eslint-disable-line */
    const updateBodyHeight = () => {
      const maxHeight = window.innerHeight;
      bodyEl.style.height = `${maxHeight - keyboardHeight}px`; /* eslint-disable-line */
    };

    updateBodyHeight(); /* eslint-disable-line */

    window.addEventListener('resize', updateBodyHeight); /* eslint-disable-line */
    return () => {
      window.removeEventListener('resize', updateBodyHeight); /* eslint-disable-line */
    };
  }, [bodyEl.style, keyboardHeight]);

  const f = useFormik({
    onSubmit: (values) => {
      if (values.messageText === '') { /* empty */ } else { /* eslint-disable-line */
        setIsSending(true); /* eslint-disable-line */
        const newMessage = {
          body: values.messageText,
          username: "you",
          id: (new Date()).getTime()
        };
        values.messageText = ''; /* eslint-disable-line */
        postMessage(dispatch, newMessage).then(() => { /* eslint-disable-line */
          setIsSending(false); /* eslint-disable-line */
          formRef.current.focus(); /* eslint-disable-line */
        });
      }
    },
    initialValues: {
      messageText: '',
    },
  });

  useEffect(() => { /* eslint-disable-line */
    if (!isSending) { /* eslint-disable-line */
      formRef.current?.focus(); /* eslint-disable-line */
    }
  }, [isSending]);


  const handleChange = (event) => {
    if (!isSending) { /* eslint-disable-line */
      const { value } = event.target;
      const updatedValue = value.replace(/^\s+/, '');
      f.setFieldValue('messageText', updatedValue); /* eslint-disable-line */
    } else { /* eslint-disable-line */
      f.setFieldValue(''); /* eslint-disable-line */
    }
  };

  const addNewLine = () => {
    if (f.values.messageText !== '') { /* eslint-disable-line */
      f.setFieldValue('messageText', `${f.values.messageText}\n`); /* eslint-disable-line */
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); /* eslint-disable-line */
    f.handleSubmit(e); /* eslint-disable-line */
  };

  // eslint-disable-next-line consistent-return
  const onKeyDown = (event) => {
    if (event.shiftKey && event.key === 'Enter') { /* eslint-disable-line */
      event.preventDefault(); /* eslint-disable-line */
      addNewLine(); /* eslint-disable-line */
    } else if (event.key === 'Enter') {
      event.preventDefault(); /* eslint-disable-line */
      return isMobileKeyboard ? addNewLine() : handleSubmit(event);
    }
  };

  return (
    <div className="messagesPadding" id="sendInputHolder">
      <Form id="sendForm">
        <TextareaAutosize
          name="messageText"
          aria-label="Новое сообщение"
          placeholder="Введите сообщение"
          className="border-0"
          id="sendInput"
          style={{ resize: 'none' }}
          rows={1}
          onKeyDown={onKeyDown}
          value={isSending ? '' : f.values.messageText}
          ref={formRef}
          onChange={handleChange}
        />
        <Button
          id="sendButton"
          className="btn btn-group-vertical"
          onMouseDown={handleSubmit}
          disabled={f.values.messageText.length === 0}
        >
            <svg id="sendIcon" className={f.values.messageText.length === 0 ? "disabled":""}xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
            <path d="M2.42953 0.134164L23.4553 10.706C23.6678 10.8127 23.8472 10.9805 23.9729 11.1899C24.0985 11.3993 24.1651 11.6418 24.1651 11.8894C24.1651 12.137 24.0985 12.3795 23.9729 12.5889C23.8472 12.7984 23.6678 12.9661 23.4553 13.0728L2.42953 23.6446C2.21398 23.7532 1.97332 23.7943 1.73617 23.7632C1.49901 23.7321 1.27536 23.63 1.09181 23.4691C0.908264 23.3082 0.772551 23.0952 0.70082 22.8555C0.629089 22.6159 0.62436 22.3596 0.687195 22.1171L3.34161 11.8894L0.687195 1.66166C0.62436 1.41925 0.629089 1.16295 0.70082 0.923281C0.772551 0.683608 0.908264 0.470644 1.09181 0.309728C1.27536 0.148812 1.49901 0.0467188 1.73617 0.0155944C1.97332 -0.0155299 2.21398 0.0256255 2.42953 0.134164ZM2.27485 1.80119L4.69276 11.1246L15.6118 11.1257C15.7928 11.1257 15.9676 11.1947 16.104 11.3199C16.2403 11.4451 16.3288 11.618 16.3532 11.8065L16.3602 11.9125C16.3602 12.1026 16.2947 12.2863 16.1758 12.4296C16.0569 12.5729 15.8927 12.6661 15.7136 12.692L15.6118 12.6993H4.68079L2.27585 21.9776L22.3396 11.8894L2.27485 1.80119Z" fill="#AEB0B0"></path>
            </svg>
        </Button>
      </Form>
    </div>
  );
};

export default MessageForm;

import { addMessage } from './slices/messagesSlice';
import store from './store';
// import { setContract, setCurrentContractId, setContractList, setSelectedChapter } from './slices/contractSlice';
import { io } from 'socket.io-client';

let socket;
let isSubscribed = false;

const subscribeToSocketEvents = () => {
  console.log(isSubscribed)
  if (!isSubscribed) {
    socket = io("wss://api.tanderhack.ru/sockets")
    socket.on('connect', () => {
      console.log('Socket connected');
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });

    socket.on('newMessage', (payload) => {
      store.dispatch(addMessage(payload));
    });

    // socket = new WebSocket("wss://api.tanderhack.ru/ws");

    // socket.onopen = () => {
    //   console.log('Socket connected');
    // };

    // socket.onclose = () => {
    //   console.log('Socket disconnected'); 
    // };

    // socket.onmessage = (event) => {
    //   console.log(`Получено сообщение: ${event.data}`);
    //   const data = JSON.parse(event.data);
    //   console.log(data)
    //   if (data.type === 'getContract') {
    //     store.dispatch(setContract(data.payload.contract));
    //     store.dispatch(setCurrentContractId(data.payload.currentContracId));

    //   } else if (data.type === 'addMessage') {
    //     store.dispatch(addMessage(data.payload));
    //     store.dispatch(setSelectedChapter(""));

    //   } else if (data.type === 'getContractList') {
    //     store.dispatch(setContractList(data.payload));
    //   }
    // };

    // socket.onerror = (error) => {
    //   console.error('Socket error:', error);
    // };

    isSubscribed = true;
  }
};

export default subscribeToSocketEvents;

import { createSlice } from '@reduxjs/toolkit';

const initialState = [{
  id: 121212,
  body: "Введите номер вашего договора.",
  username: "Помощник",
}];

const slice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessages: (state, { payload }) => {
      state.splice(0, state.length, ...payload); /* eslint-disable-line */
    },
    addMessage: (state, { payload }) => {
      state.push(payload); /* eslint-disable-line */
    },
  },
});

export const {
  setMessages, addMessage, removeMessage, editMessage,
} = slice.actions;

export default slice.reducer;

export const selectMessages = (state) => state.messages;

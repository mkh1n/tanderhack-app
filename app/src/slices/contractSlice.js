import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  contract: {},
  currentContractId: null,
  selectedChapter: '',
  contractList: {}
}

const slice = createSlice({
  name: 'contract',
  initialState,
  reducers: {
    setContract: (state, { payload }) => {
      state.contract = payload
    },
    setCurrentContractId: (state, { payload }) => {
      state.currentContractId = payload
    },
    setSelectedChapter: (state, { payload }) => {
      state.selectedChapter = payload;
    },
    setContractList: (state, { payload }) => {
      state.contractList = payload;
    }
  },
});

export const {
  setContract,
  setCurrentContractId, 
  setSelectedChapter,
  setContractList
} = slice.actions;

export default slice.reducer;

export const selectContract = (state) => state.contract.contract;
export const selectCurrentContractId = (state) => state.contract.currentContractId;
export const selectSelectedChapter = (state) => state.contract.selectedChapter;
export const selectContractList = (state) => state.contract.contractList;



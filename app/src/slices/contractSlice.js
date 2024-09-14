import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  contractData: {},
  contractId: '',
  selectedChapter: '',
}

const slice = createSlice({
  name: 'contract',
  initialState,
  reducers: {
    setContract: (state, { payload }) => {
      state.contractData = payload
    },
    setContractId: (state, { payload }) => {
      state.contractId = payload
    },
    setSelectedChapter: (state, { payload }) => {
      state.selectedChapter = payload;
    }
  },
});

export const {
  setContract,
  setContractId, 
  setSelectedChapter
} = slice.actions;

export default slice.reducer;

export const selectContract = (state) => state.contract.contractData;
export const selectContractId = (state) => state.contract.contractid;
export const selectSelectedChapter = (state) => state.contract.selectedChapter;



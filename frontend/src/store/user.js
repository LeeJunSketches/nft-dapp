import { createSlice } from '@reduxjs/toolkit'

export const slice = createSlice({
  name: 'user',
  initialState: {
    wallet: null,
  },
  reducers: {
    setWallet: (state, action) => {
      state.wallet = action.payload
    }
  }
})

export const { setWallet } = slice.actions;
export default slice.reducer;
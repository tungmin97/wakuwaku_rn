import { createSlice } from '@reduxjs/toolkit';
import { SetUserProps } from 'src/types/authTypes';

type Props = {
  currentUser: {
    data: () => SetUserProps;
  } | null;
};
const initialState: Props = {
  currentUser: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setCurrentUser(state, action) {
      return { ...state, currentUser: action.payload };
    },
  },
});

export const { setCurrentUser } = usersSlice.actions;

export default usersSlice.reducer;

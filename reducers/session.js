import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	value: {id: null, username: null, firstname: null},
};

export const sessionSlice = createSlice({
	name: 'session',
	initialState,
	reducers: {
		login: (state, action) => {
			state.value.id = action.payload.id;
			state.value.username = action.payload.username;
			state.value.firstname = action.payload.firstname;
		  },
		  logout: (state) => {
			state.value.id = null;
			state.value.username = null;
			state.value.firstname = null;
		  },
		
	},
});

export const { login, logout } = sessionSlice.actions;
export default sessionSlice.reducer;

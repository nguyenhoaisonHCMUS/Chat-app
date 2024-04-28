import { INIT_USER_DATA } from '@/initialData';
import { UserType } from '@/types';
import {createSlice} from '@reduxjs/toolkit';

type CurrentUser ={
    user: UserType;
    accessToken: string;
}

const INIT_CURRENT_USER = {
    user: INIT_USER_DATA,
    accessToken: '',
}

interface AuthState {
    currentUser: CurrentUser;
    isLoggedIn: boolean;
    err: boolean;
}

const initialState: AuthState = {
    currentUser: INIT_CURRENT_USER,
    isLoggedIn: false,
    err: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess(state, action) {
            state.isLoggedIn = true;
            state.currentUser = action.payload;
            state.err = false;
        },
        logout(state) {
            state.isLoggedIn = false;
            state.err = false;
            state.currentUser = INIT_CURRENT_USER;
        },
        loginFailed(state) {
            state.isLoggedIn = false;
            state.err = false;
        },
    },
});

export const { loginSuccess, loginFailed, logout } = authSlice.actions;

export default authSlice.reducer;
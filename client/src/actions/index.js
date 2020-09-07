import axios from '../axios/axios';
import { FETCH_USER, LOGIN, LOGOUT } from './types';

export const fetchUser = () => async (dispatch) => {
    try {
        const res = await axios.get('/admin/profile');
        console.log('in fetch user action');
        console.log(res.data);
        dispatch({ type: FETCH_USER, payload: res.data });
    } catch (err) {
        dispatch({ type: FETCH_USER, payload: null });
    }
};

export const login = (username, password) => async (dispatch) => {
    try {
        const res = await axios.post('/admin/login', { username, password });
        console.log(res.data.admin);
        dispatch({ type: LOGIN, payload: res.data.admin });
    } catch (err) {
        dispatch({ type: LOGIN, payload: null });
    }
};

export const logout = () => async (dispatch) => {
    await axios.post('/admin/logout');
    dispatch({ type: LOGOUT, payload: false });
};

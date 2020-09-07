import axios from '../axios/axios';
import { FETCH_USER, LOGOUT } from './types';

export const fetchUser = () => async (dispatch) => {
    try {
        const res = await axios.get('/admin/profile');
        dispatch({ type: FETCH_USER, payload: res.data });
    } catch (err) {
        dispatch({ type: FETCH_USER, payload: null });
    }
};

export const logout = () => async (dispatch) => {
    await axios.post('/admin/logout');
    dispatch({ type: LOGOUT, payload: false });
};

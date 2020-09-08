import axios from '../axios/axios';
import { FETCH_USER, LOGIN, LOGOUT, UPDATE_ROUTE } from './types';

export const fetchUser = () => async (dispatch) => {
    try {
        const res = await axios.get('/admin/profile');
        dispatch({ type: FETCH_USER, payload: res.data });
    } catch (err) {
        dispatch({ type: FETCH_USER, payload: null });
    }
};

export const login = (username, password, history) => async (dispatch) => {
    try {
        const res = await axios.post('/admin/login', { username, password });
        dispatch({ type: LOGIN, payload: res.data.admin });
        history.push('/');
    } catch (err) {
        dispatch({ type: LOGIN, payload: null });
    }
};

export const logout = (history) => async (dispatch) => {
    try {
        await axios.post('/admin/logout');
        dispatch({ type: LOGOUT, payload: false });
        history.push('/');
    } catch (err) {}
};

export const updateRoute = (route) => {
    return {
        type: UPDATE_ROUTE,
        payload: route,
    };
};

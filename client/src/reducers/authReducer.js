import { FETCH_USER, LOGIN, LOGOUT } from '../actions/types';

export default function (state = null, action) {
    switch (action.type) {
        case FETCH_USER:
            return action.payload || false;
        case LOGIN:
            return action.payload || false;
        case LOGOUT:
            return action.payload;
        default:
            return state;
    }
}

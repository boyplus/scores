import { FETCH_USER, LOGOUT } from '../actions/types';

export default function (state = null, action) {
    switch (action.type) {
        case FETCH_USER:
            return action.payload || false;
        case LOGOUT:
            return action.payload;
        default:
            return state;
    }
}

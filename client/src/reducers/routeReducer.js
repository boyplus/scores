import { UPDATE_ROUTE } from '../actions/types';

const INITIAL_STATE = { route: '/' };
export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case UPDATE_ROUTE:
            return { ...state, route: action.payload };
        default:
            return state;
    }
}

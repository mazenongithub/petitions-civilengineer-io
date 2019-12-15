import { ALLUSERS } from '../actions/types';

export default function (state = {}, action) {
    //console.log(action.payload, action.type);
    switch (action.type) {
        case ALLUSERS:
            return action.payload;
        default:
            return state;
    }
}
import { MYUSERMODEL } from '../actions/types';

export default function (state = {}, action) {
    //console.log(action.payload, action.type);
    switch (action.type) {
        case MYUSERMODEL:
            return action.payload;
        default:
            return state;
    }
}
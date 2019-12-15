
import { MYUSERMODEL, ALLUSERS } from './types';
export const reduxUser = (myusermodel) => async dispatch => {
    dispatch({ type: MYUSERMODEL, payload: myusermodel })
}
export const reduxAllUsers = (allusers) => async dispatch => {
    dispatch({ type: ALLUSERS, payload: allusers })
}
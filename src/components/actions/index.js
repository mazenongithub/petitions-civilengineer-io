
import { MYUSERMODEL } from './types';
export const reduxUser = (myusermodel) => async dispatch => {
    dispatch({ type: MYUSERMODEL, payload: myusermodel })
}
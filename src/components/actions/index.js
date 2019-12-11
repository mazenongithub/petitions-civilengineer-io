
import { MYUSERMODEL } from './types';
export const searchProviders = (myusermodel) => async dispatch => {
    dispatch({ type: MYUSERMODEL, payload: myusermodel })
}
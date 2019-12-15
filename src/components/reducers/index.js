import { combineReducers } from 'redux';
import myusermodel from './myusermodelreducer';
import allusers from './alluserreducer';
export default combineReducers({
    myusermodel,
    allusers
})
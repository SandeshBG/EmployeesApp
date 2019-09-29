import {loginReducer} from './loginReducer';
import {combineReducers} from 'redux';

export const reducers = combineReducers({
    loginState: loginReducer
});
import {LOGIN_ACTIONS} from './actions';
import {config} from '../../constants';

export function login(params){
    if(params.username === config.username && params.password == config.password){
        return {
            type: LOGIN_ACTIONS.LOGIN_SUCCESS,
            message: "You have successfully signed in"
        };
    }else{
        return {
            type: LOGIN_ACTIONS.LOGIN_FAILED,
            message: "You have entered incorrect login credentials"
        };
    }
}

export function logout(){
    return {
        type: LOGIN_ACTIONS.INITIAL_STATE,
        message: ""
    };
}
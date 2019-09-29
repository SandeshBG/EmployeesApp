import {LOGIN_ACTIONS} from '../actions/actions';

const initialState = {
    type: LOGIN_ACTIONS.INITIAL_STATE,
    message: ""
}

export function loginReducer(state=initialState,action){
    if(action.type === LOGIN_ACTIONS.LOGIN_SUCCESS || action.type === LOGIN_ACTIONS.LOGIN_FAILED || 
        action.type === LOGIN_ACTIONS.INITIAL_STATE){
        return Object.assign({},state,action);
    }else{
        return state;
    }
}
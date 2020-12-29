import {
    LOADING_USERDATA,
    USERDATA_SUCCESS,
    USERDATA_FAIL,
    USERUPDATE_SUCCESS,
    USERUPDATE_FAIL,
    LOADING_USERORDERS,
    USERORDERS_SUCCESS,
    USERORDERS_FAIL,
    USERORDERS_RESET,
    USERDATA_RESET,
    LOADING_USERLIST,
    USERLIST_SUCCESS,
    USERLIST_FAIL,
    LOADING_USERDELETE,
    USERDELETE_SUCCESS,
    USERDELETE_FAIL
} from '../types';

function authReducer(currentState, action) {
    switch (action.type) {        
        case LOADING_USERDATA:
        case LOADING_USERORDERS:
        case LOADING_USERLIST:
        case LOADING_USERDELETE:
            return {
                ...currentState,
                loading: true
            }
        case USERDATA_SUCCESS:
        case USERUPDATE_SUCCESS:
            return {
                ...currentState,
                userProfile: action.payload.userProfile,
                loading: false
            }
        case USERDATA_SUCCESS:
          return {
            ...currentState,
            loading: false
          }
        case USERDATA_FAIL:
        case USERUPDATE_FAIL:
        case USERORDERS_FAIL: 
        case USERLIST_FAIL:
        case USERDELETE_FAIL:
            return {
                ...currentState,
                loading: false,
                error: action.payload.error
            }
       case USERDATA_RESET:
         return {
            ...currentState,
            user: null
         }
        case USERORDERS_SUCCESS:
          return {
            ...currentState,
            orders: action.payload.orders,
            loading: false
          }
        case USERORDERS_RESET:
          return {
            ...currentState,
            orders: []
          }
        case USERLIST_SUCCESS:
          return {
            ...currentState,
            users: action.payload.users,
            loading: false
          }
        default:
            return currentState;
    }
}

export default authReducer;
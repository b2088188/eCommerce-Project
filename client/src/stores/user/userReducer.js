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
    USERDATA_RESET
} from '../types';

function authReducer(currentState, action) {
    switch (action.type) {
        case LOADING_USERDATA:
        case LOADING_USERORDERS:
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
        case USERDATA_FAIL:
        case USERUPDATE_FAIL:
        case USERORDERS_FAIL: 
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
        default:
            return currentState;
    }
}

export default authReducer;
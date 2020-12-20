import {
LOADING_USERDATA,
USERDATA_SUCCESS,
USERDATA_FAIL,
USERUPDATE_SUCCESS,
USERUPDATE_FAIL
} from '../types';

function authReducer(currentState, action) {
	switch(action.type) {
       case LOADING_USERDATA: 
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
        return {
        	...currentState,
        	loading: false,
        	error: action.payload.error
        }
      default:
       return currentState;
	}
}

export default authReducer;
import {
LOADING_USERDATA,
USERDATA_SUCCESS,
USERDATA_FAIL
} from '../types';

function authReducer(currentState, action) {
	switch(action.type) {
       case LOADING_USERDATA: 
         return {
       	...currentState,
       	loading: true
       }
      case USERDATA_SUCCESS:
        return {
        	...currentState,
        	userProfile: action.payload.userProfile,
          loading: false
        }
      case USERDATA_FAIL: 
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
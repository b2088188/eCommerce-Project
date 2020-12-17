import {
LOADING_AUTH,
AUTH_SUCCESS,
AUTH_FAIL,
LOGOUT_SUCCESS
} from '../types';

function authReducer(currentState, action) {
	switch(action.type) {
       case LOADING_AUTH: 
         return {
       	...currentState,
       	loading: true
       }
      case AUTH_SUCCESS:
        return {
        	...currentState,
        	user: action.payload.user,
        	token: action.payload.token,
          isAuthenticated: true
        }
      case AUTH_FAIL: 
        return {
        	...currentState,
        	loading: false,
        	error: action.payload.error
        }
      case LOGOUT_SUCCESS:
        return {
        	...currentState,
        	user: null,
        	token: null,        	
          isAuthenticated: null,
        	error:null
        }
	}
}

export default authReducer;
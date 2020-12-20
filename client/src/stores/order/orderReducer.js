import {
LOADING_ORDER,
ORDER_SUCCESS,
ORDER_FAIL
} from '../types';

function orderReducer(currentState, action) {
	switch(action.type) {
		case LOADING_ORDER:
		  return {
		  	...currentState,
		  	loading: true
		  }
		case ORDER_SUCCESS:
		  return {
		  	...currentState,
		  	order: action.payload.order,
		  	status: 'success',
		  	loading: false
		  }
		case ORDER_FAIL:
		  return {
		  	...currentState,
		  	error: action.payload.error,
		  	loading: false
		  }
		default:
		  return currentState;
	}
}

export default orderReducer;
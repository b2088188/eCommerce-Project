import {
LOADING_PRODUCT,
PRODUCT_SUCCESS,
PRODUCT_FAIL} from '../types';

function productReducer(currentState, action) {
	switch(action.type) {
		case LOADING_PRODUCT:
		  return {
		  	...currentState,
		  	loading: true
		  }
		case PRODUCT_SUCCESS:
		  return {
		  	...currentState,
		  	product: action.payload.product,
		  	loading: false
		  }
		case PRODUCT_FAIL:
		  return {
		  	...currentState,
		  	loading: false,
		  	error: action.payload.error
		  }
		default:
		  return currentState;
	}
}

export default productReducer;
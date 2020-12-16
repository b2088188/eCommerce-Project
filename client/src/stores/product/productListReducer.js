import {
LOADING_PRODUCTS,
PRODUCTS_SUCCESS,
PRODUCTS_FAIL,
LOADING_PRODUCT,
PRODUCT_SUCCESS,
PRODUCT_FAIL
} from '../types';

function productListReducer(currentState, action) {
	switch(action.type) {
		case LOADING_PRODUCTS:
		  return {
		  	...currentState,
		  	loading: true
		  }
		case PRODUCTS_SUCCESS:
		  return {
		  	...currentState,
		  	products: action.payload.products,
		  	loading: false
		  }
		case PRODUCTS_FAIL:
		  return {
		  	...currentState,
		  	loading: false,
		  	error: action.payload.error
		  }
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

export default productListReducer;
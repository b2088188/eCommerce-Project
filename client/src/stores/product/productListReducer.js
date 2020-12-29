import * as R from 'ramda';
import {
LOADING_PRODUCTS,
PRODUCTS_SUCCESS,
PRODUCTS_FAIL,
LOADING_PRODUCT,
PRODUCT_SUCCESS,
PRODUCT_FAIL,
LOADING_PRODUCTDELETE,
PRODUCTDELETE_SUCCESS,
PRODUCTDELETE_FAIL
} from '../types';


 
function productListReducer(currentState, action) {
	switch(action.type) {
		case LOADING_PRODUCTS:
		case LOADING_PRODUCT:
		case LOADING_PRODUCTDELETE:
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
		  case PRODUCT_SUCCESS:
		  return {
		  	...currentState,
		  	product: action.payload.product,
		  	loading: false
		  }		
		 case PRODUCTDELETE_SUCCESS:
        	return {
        		...currentState,
        		products: R.reject(el => el._id === action.payload.id, currentState.products),
        		loading: false
        	}
		case PRODUCTS_FAIL:
		case PRODUCT_FAIL:
		case PRODUCTDELETE_FAIL:
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
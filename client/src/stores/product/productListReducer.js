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
PRODUCTDELETE_FAIL,
LOADING_PRODUCTCREATE,
PRODUCTCREATE_SUCCESS,
PRODUCTCREATE_FAIL,
PRODUCTCREATE_RESET,
LOADING_PRODUCTUPDATE,
PRODUCTUPDATE_SUCCESS,
PRODUCTUPDATE_FAIL,
PRODUCTUPDATE_RESET
} from '../types';


 
function productListReducer(currentState, action) {
	switch(action.type) {
		case LOADING_PRODUCTS:
		case LOADING_PRODUCT:
		case LOADING_PRODUCTDELETE:
		case LOADING_PRODUCTCREATE:
		case LOADING_PRODUCTUPDATE:
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
		  case PRODUCTUPDATE_SUCCESS:
		  return {
		  	...currentState,
		  	statusUpdate: 'success',
		  	product: action.payload.product,
		  	loading: false
		  }		
		 case PRODUCTCREATE_SUCCESS:
		   return {
		   	...currentState,
		   	statusCreate: 'success',
		   	createdProduct: action.payload.product,
		   	products: [...currentState.products, action.payload.product],
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
		case PRODUCTCREATE_FAIL:
		case PRODUCTUPDATE_FAIL:
		  return {
		  	...currentState,
		  	loading: false,
		  	error: action.payload.error
		  }		
		case PRODUCTCREATE_RESET:
			return {
				...currentState,
				statusCreate: null
			}
		case PRODUCTUPDATE_RESET:
			return {
				...currentState,
				statusUpdate: null
			}
		default:
		  return currentState;
	}
}

export default productListReducer;
import * as R from 'ramda';
import {
    LOADING_PRODUCT,
    PRODUCT_SUCCESS,
    PRODUCT_FAIL,
    LOADING_PRODUCTDELETE,
    PRODUCTDELETE_SUCCESS,
    PRODUCTDELETE_FAIL
} from '../types';

function productReducer(currentState, action) {
    switch (action.type) {
        case LOADING_PRODUCT:
        case LOADING_PRODUCTDELETE:
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
        case PRODUCTDELETE_SUCCESS:
        	return {
        		...currentState,
        		products: R.reject(el => el._id === action.payload.id, currentState.products)
        	}
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

export default productReducer;
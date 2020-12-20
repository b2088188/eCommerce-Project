import * as R from 'ramda';
import {
ADD_CARTITEM,
REMOVE_CARTITEM,
CHANGE_QUANTITY,
CALCULATE_TOTALQTYANDPRICE,
CALCULATE_ITEMPRICE,
CALCULATE_TAXPRICE,
SAVE_ADDRESS,
SAVE_PAYMENTMETHOD
} from '../types';

function cartReducer(currentState, action) {
	switch(action.type) {
	    case ADD_CARTITEM:	      
	      return {
	      	...currentState,
	      	cartItems: R.uniqBy(R.prop('_id'), [...currentState.cartItems, action.payload.item])
	      }		
	    case CHANGE_QUANTITY:
	    const index = R.findIndex(R.propEq('_id', action.payload.id))(currentState.cartItems);
	      return {
	      	...currentState,
	      	cartItems: R.update(index, {...currentState.cartItems[index], ...{quantity: action.payload.quantity}}, currentState.cartItems)
	      }
	    case CALCULATE_TOTALQTYANDPRICE:	    
        const itemsPrice = +(currentState.cartItems.reduce((acc, cur) => acc + cur.quantity * cur.price, 0).toFixed(2));
    	const shippingPrice = itemsPrice > 100 ? 0 : 100;
    	const taxPrice = +((0.15 * itemsPrice).toFixed(2));
	      return {
	      	...currentState,
	      	itemsPrice,
	      	shippingPrice,
	      	taxPrice,
	      	totalPrice: itemsPrice + shippingPrice + taxPrice,
	      	totalQuantity: currentState.cartItems.reduce((acc, cur) => acc + cur.quantity, 0)
	      }
	    case REMOVE_CARTITEM:
	      return {
	      	...currentState,
	      	cartItems: R.reject(R.propEq('_id', action.payload.id), currentState.cartItems)
	      }
	    case SAVE_ADDRESS:
	      return {
	      	...currentState,
	      	shippingAddress: action.payload.address
	      }	   
	    case SAVE_PAYMENTMETHOD:
	      return {
	      	...currentState,
	      	paymentMethod: action.payload.data
	      }
		default:
		  return currentState;
	}
}

export default cartReducer;
import * as R from 'ramda';
import {
ADD_CARTITEM,
REMOVE_CARTITEM,
CHANGE_QUANTITY,
CALCULATE_QTYANDPRICE,
SAVE_ADDRESS 
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
	    case CALCULATE_QTYANDPRICE:
	      return {
	      	...currentState,
	      	totalQuantity: currentState.cartItems.reduce((acc, cur) => acc + cur.quantity, 0),
	      	totalPrice: currentState.cartItems.reduce((acc, cur) => acc + cur.quantity * cur.price, 0).toFixed(2)
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
		default:
		  return currentState;
	}
}

export default cartReducer;
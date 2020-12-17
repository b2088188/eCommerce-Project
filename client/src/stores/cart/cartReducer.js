import {
ADD_CARTITEM,
REMOVE_CARTITEM
} from '../types';

function cartReducer(currentState, action) {
	switch(action.type) {
	    case ADD_CARTITEM:	      
	      return {
	      	...currentState,
	      	cartItems: [...currentState.cartItems, action.payload.item]
	      }		
		default:
		  return currentState;
	}
}

export default cartReducer;
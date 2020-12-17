import * as R from 'ramda';
import React, {useReducer} from 'react';
import {CartProvider} from './cartContext';
import cartReducer from './cartReducer';
import {
ADD_CARTITEM,
REMOVE_CARTITEM
} from '../types';
import axios from 'axios';

const InitialState = {
	cartItems: JSON.parse(localStorage.getItem('cartItems')) || [],
	loading: null,
	error: null
}

const CartStore = ({
	children
}) => {
	const [state, dispatch] = useReducer(cartReducer, InitialState);

    async function addToCart(id, quantity) {
    	try {    	
    	const {data} = await axios.get(`/api/v1/products/${id}`);
    	    	
    	dispatch({
    		type: ADD_CARTITEM,
    		payload: {
    			item: {
    				...R.pick(['_id', 'name', 'image', 'price', 'countInStock'], data.data.product), 
    				...{quantity}
    			}      
    		}
    	})
    	//localStorage.setItem('cartItems', JSON.stringify(state.cartItems));    	      
    	}
    	catch(err) {
    	        
    	}    			
    }

	const value = {
        cartItems: state.cartItems,
        loading: state.loading,
        error: state.error,
        addToCart
	}

	return (
      <CartProvider value = {value}>
      	{children}
      </CartProvider>
		)
}

export default CartStore;
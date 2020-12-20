import * as R from 'ramda';
import React, {useReducer} from 'react';
import {CartProvider} from './cartContext';
import cartReducer from './cartReducer';
import {
ADD_CARTITEM,
REMOVE_CARTITEM,
CHANGE_QUANTITY,
CALCULATE_QTYANDPRICE,
SAVE_ADDRESS 
} from '../types';
import axios from 'axios';

const InitialState = {
	cartItems: JSON.parse(localStorage.getItem('cartItems')) || [],
	totalPrice: 0,
	totalQuantity: 0,
	shippingAddress: null,
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
    	dispatch({type: CALCULATE_QTYANDPRICE});
    	//localStorage.setItem('cartItems', JSON.stringify(state.cartItems));    	      
    	}
    	catch(err) {
    	        
    	}    			
    }

    function changeQuantity(id, quantity) {
    	dispatch({
    		type: CHANGE_QUANTITY,
    		payload: {
    			id,
    			quantity
    		}
    	})
    	dispatch({type: CALCULATE_QTYANDPRICE});
    }

    function removeFromCart(id) {
    	dispatch({
    		type: REMOVE_CARTITEM,
    		payload: {
    			id
    		}
    	})
    }

    async function saveShippingAddress(values) {
    	try {
    	   dispatch({
    	   	type: SAVE_ADDRESS,
    	   	payload: {
    	   		address: values
    	   	}
    	   })   
    	}
    	catch(err) {
    	        
    	}
    			
    }


	const value = {
        cartItems: state.cartItems,
        loading: state.loading,
        error: state.error,
        totalPrice: state.totalPrice,
	    totalQuantity: state.totalQuantity,
	    shippingAddress: state.shippingAddress,
        addToCart,
        changeQuantity,
        removeFromCart,
        saveShippingAddress
	}

	return (
      <CartProvider value = {value}>
      	{children}
      </CartProvider>
		)
}

export default CartStore;
import * as R from 'ramda';
import React, {useReducer} from 'react';
import {CartProvider} from './cartContext';
import cartReducer from './cartReducer';
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
import axios from 'axios';

const InitialState = {
	cartItems: JSON.parse(localStorage.getItem('cartItems')) || [],
	totalPrice: 0,
	totalQuantity: 0,
    itemsPrice: 0,
    taxPrice: 0,
    shippingPrice: 0,
	shippingAddress: null,
	paymentMethod: null,
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
    	calcPriceAndQty();
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
    	calcPriceAndQty();
    }

    function removeFromCart(id) {
    	dispatch({
    		type: REMOVE_CARTITEM,
    		payload: {
    			id
    		}
    	})
    }

    function calcPriceAndQty() {
        dispatch({type: CALCULATE_TOTALQTYANDPRICE});
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

    async function savePaymentMethod(values) {
    	try {
    	   dispatch({
    	   	type: SAVE_PAYMENTMETHOD,
    	   	payload: {
    	   		data: values
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
        itemsPrice: state.itemsPrice,
        shippingPrice: state.shippingPrice,
        taxPrice: state.taxPrice,
        totalPrice: state.totalPrice,
	    totalQuantity: state.totalQuantity,
	    shippingAddress: state.shippingAddress,
	    paymentMethod: state.paymentMethod,
        addToCart,
        changeQuantity,
        removeFromCart,
        saveShippingAddress,
        savePaymentMethod
	}

	return (
      <CartProvider value = {value}>
      	{children}
      </CartProvider>
		)
}

export default CartStore;
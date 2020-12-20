import React, {useReducer} from 'react';
import {OrderProvider} from './orderContext';
import orderReducer from './orderReducer';
import axios from 'axios';
import {
LOADING_ORDER,
ORDER_SUCCESS,
ORDER_FAIL
} from '../types';

const InitialState = {
	order: [],
	status: null,
	loading: null,
	error: null
}

const OrderStore = ({
	children
}) => {
	const [state, dispatch] = useReducer(orderReducer, InitialState);

    async function addOrder(order) {
    	try {
    	   dispatch({type: LOADING_ORDER});
    	   const {data: {data}} = await axios.post('/api/v1/orders', order);
    	   dispatch({
    	   	type: ORDER_SUCCESS,
    	   	payload: {
    	   		order: data.order
    	   	}
    	   })
    	}
    	catch({response: {data}}) {
    	   dispatch({
    	   	type: ORDER_FAIL,
    	   	payload: {
    	   		error: data.message
    	   	}
    	   })     
    	}
    			
    }

 const value = {
    order: state.order,
    status: state.status,
    loading: state.loading,
    error: state.error,
    addOrder
 }

	return (
     <OrderProvider value = {value}>
     	{children}
     </OrderProvider>
		)
}

export default OrderStore;
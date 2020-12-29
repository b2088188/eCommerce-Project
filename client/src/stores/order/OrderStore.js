import * as R from 'ramda';
import React, {useReducer} from 'react';
import {OrderProvider} from './orderContext';
import orderReducer from './orderReducer';
import axios from 'axios';
import {
LOADING_ORDERCREATE,
ORDERCREATE_SUCCESS,
ORDERCREATE_FAIL,
LOADING_ORDERDETAIL,
ORDERDETAIL_SUCCESS,
ORDERDETAIL_FAIL,
LOADING_ORDERPAID,
ORDERPAID_SUCCESS,
ORDERPAID_FAIL,
ORDERPAID_RESET
} from '../types';

const InitialState = {
   orderItems: [],
   shippingAddress: null,
	orders: [],   
   currentOrder: null,
	createStatus: null,
   paidStatus: null,
	loading: null,
	error: null
}

const OrderStore = ({
	children
}) => {
	const [state, dispatch] = useReducer(orderReducer, InitialState);

    async function addOrder(order) {
    	try {
    	   dispatch({type: LOADING_ORDERCREATE});
         order.orderItems = order.orderItems.map(el => R.omit(['_id'], {...el, ...{product: R.prop('_id', el)}}));         
    	   const {data: {data}} = await axios.post('/api/v1/orders', order);
         console.log(data)
    	   dispatch({
    	   	type: ORDERCREATE_SUCCESS,
    	   	payload: {
    	   		order: data.order
    	   	}
    	   })
    	}
    	catch({response: {data}}) {
    	   dispatch({
    	   	type: ORDERCREATE_FAIL,
    	   	payload: {
    	   		error: data.message
    	   	}
    	   })     
    	}
    }

    async function getOrder(id) {
       try {
          const {data: {data}} = await axios.get(`/api/v1/orders/${id}`);   
          dispatch({
            type: ORDERDETAIL_SUCCESS,
            payload: {
               order: data.order
            }
          })
       }
       catch({response: {data}}) {
           dispatch({
            type: ORDERDETAIL_FAIL,
            payload: {
               error: data.message
            }
           })
       }
    }

        async function payOrder(orderId, paymentResult) {
       try {
          const {data: {data}} = await axios.post(`/api/v1/orders/${orderId}/pay`, paymentResult);   
          dispatch({
            type: ORDERPAID_SUCCESS,
            payload: {
               order: data.order
            }
          })
       }
       catch({response: {data}}) {
           dispatch({
            type: ORDERPAID_FAIL,
            payload: {
               error: data.message
            }
           })
       }
    }

    function payReset() {
       dispatch({type: ORDERPAID_RESET});
    }

 const value = {
    orders: state.orders,
    currentOrder: state.currentOrder,
    createStatus: state.createStatus,
    paidStatus: state.paidStatus,
    loading: state.loading,
    error: state.error,
    addOrder,
    getOrder,
    payOrder,
    payReset
 }

	return (
     <OrderProvider value = {value}>
     	{children}
     </OrderProvider>
		)
}

export default OrderStore;
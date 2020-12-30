import * as R from 'ramda';
import React, { useReducer, useCallback } from 'react';
import { ProductProvider } from './productContext';
import productListReducer from './productListReducer';
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
import axios from 'axios';

const InitialState = {
    products: [],
    product: null,
    createdProduct: null,
    loading: null,
    error: null,
    statusCreate: null,
    statusUpdate: null
}

const ProductStore = ({
    children
}) => {
    const [state, dispatch] = useReducer(productListReducer, InitialState);

    const getAllProducts = useCallback(async function(query) {
        try {
            dispatch({ type: LOADING_PRODUCTS });
            const { data: {data} } = await axios.get(`/api/v1/products/?${query ? 'name='+query : ''}`);
            console.log(data.products)
            dispatch({
                type: PRODUCTS_SUCCESS,
                payload: {
                    products: data.products
                }
            })
        } catch ({ response: { data } }) {
            dispatch({
                type: PRODUCTS_FAIL,
                payload: {
                    error: data.message
                }
            })
        }
    }, [])

    async function getProduct(id) {
        try {
            dispatch({ type: LOADING_PRODUCT });
            const { data } = await axios.get(`/api/v1/products/${id}`);
            dispatch({
                type: PRODUCT_SUCCESS,
                payload: {
                    product: data.data.product
                }
            })
        } catch ({ response: { data } }) {
            dispatch({
                type: PRODUCT_FAIL,
                payload: {
                    error: data.message
                }
            })
        }
    }

    async function createProduct(values) {
        try {
            dispatch({ type: LOADING_PRODUCTCREATE })
            const {data: {data}} = await axios.post('/api/v1/products', values);            
            dispatch({
                type: PRODUCTCREATE_SUCCESS,
                payload: {
                    product: data.product
                }
            })
        } catch ({ response: { data } }) {
            dispatch({
                type: PRODUCTCREATE_FAIL,
                payload: {
                    error: data.message
                }
            })
        }
    }

    function resetStatus(type) {
        if(type === 'create')
        dispatch({type: PRODUCTCREATE_RESET})
        if(type === 'update')
        dispatch({type: PRODUCTUPDATE_RESET})
    }

   const updateProduct  = R.curry(async function (id, values) {
           try {
               dispatch({ type: LOADING_PRODUCTUPDATE })
               const formData = new FormData();
               const fields = Object.keys(values);
               fields.forEach(el => {
                if(el ==='image')
                return formData.append('image', values[el][0])
                formData.append(el, values[el]);
               })
               const product = await axios.patch(`/api/v1/products/${id}`, formData);
               dispatch({
                   type: PRODUCTUPDATE_SUCCESS,
                   payload: {
                       product
                   }
               })
           } catch ({ response: { data } }) {
               dispatch({
                   type: PRODUCTUPDATE_FAIL,
                   payload: {
                       error: data.message
                   }
               })
           }
       }, 2);


    async function deleteProduct(id) {
        try {
            dispatch({ type: LOADING_PRODUCTDELETE })
            await axios.delete(`/api/v1/products/${id}`);
            dispatch({
                type: PRODUCTDELETE_SUCCESS,
                payload: {
                    id
                }
            })
        } catch ({ response: { data } }) {
            dispatch({
                type: PRODUCT_FAIL,
                payload: {
                    error: data.message
                }
            })
        }
    }

    const value = {
        products: state.products,
        product: state.product,
        createdProduct: state.createdProduct,
        loading: state.loading,
        error: state.error,
        statusCreate: state.statusCreate,
        statusUpdate: state.statusUpdate,
        getAllProducts,
        getProduct,
        createProduct,
        updateProduct,
        deleteProduct,
        resetStatus
    }

    return (
        <ProductProvider value = {value}>
        {children}
      </ProductProvider>
    )
}

export default ProductStore;
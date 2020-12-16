import React, { useReducer } from 'react';
import { ProductProvider } from './productContext';
import productListReducer from './productListReducer';
import {
    LOADING_PRODUCTS,
    PRODUCTS_SUCCESS,
    PRODUCTS_FAIL,
    LOADING_PRODUCT,
    PRODUCT_SUCCESS,
    PRODUCT_FAIL
} from '../types';
import axios from 'axios';

const InitialState = {
    products: [],
    product: null,
    loading: null,
    error: null
}

const ProductStore = ({
    children
}) => {
    const [state, dispatch] = useReducer(productListReducer, InitialState);

    async function getAllProducts() {
        try {
            dispatch({ type: LOADING_PRODUCTS });
            const { data } = await axios.get('/api/v1/products');
            dispatch({
                type: PRODUCTS_SUCCESS,
                payload: {
                    products: data.data.products
                }
            })
        } catch (err) {
            dispatch({
                type: PRODUCTS_FAIL,
                payload: {
                    error: err.response.data.message
                }
            })
        }
    }

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
        } catch (err) {
            dispatch({
                type: PRODUCT_FAIL,
                payload: {
                    error: err.response.data.message
                }
            })
        }
    }

    const value = {
        products: state.products,
        product: state.product,
        loading: state.loading,
        error: state.error,
        getAllProducts,
        getProduct
    }

    return (
        <ProductProvider value = {value}>
      	{children}
      </ProductProvider>
    )
}

export default ProductStore;
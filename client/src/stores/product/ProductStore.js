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
    PRODUCTDELETE_FAIL
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

    const getAllProducts = useCallback(async function () {
            try {
                dispatch({ type: LOADING_PRODUCTS });
                const { data } = await axios.get('/api/v1/products');
                dispatch({
                    type: PRODUCTS_SUCCESS,
                    payload: {
                        products: data.data.products
                    }
                })
            } catch ({response: {data}}) {
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
        } catch ({response: {data}}) {
            dispatch({
                type: PRODUCT_FAIL,
                payload: {
                    error: data.message
                }
            })
        }
    }

    async function deleteProduct(id) {
        try {
              dispatch({type: LOADING_PRODUCTDELETE})
              await axios.delete(`/api/v1/products/${id}`);
              dispatch({
                type: PRODUCTDELETE_SUCCESS,
                payload: {
                    id
                }
              })
        }
        catch({response: {data}}) {
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
        loading: state.loading,
        error: state.error,
        getAllProducts,
        getProduct,
        deleteProduct
    }

    return (
        <ProductProvider value = {value}>
      	{children}
      </ProductProvider>
    )
}

export default ProductStore;
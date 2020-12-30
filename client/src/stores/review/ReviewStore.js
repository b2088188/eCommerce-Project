import * as R from 'ramda';
 import React, {useReducer} from 'react';
 import {ReviewProvider} from './reviewContext';
 import reviewReducer from './reviewReducer';
 import axios from 'axios';
import {
	LOADING_REVIEWCREATE,
REVIEWCREATE_SUCCESS,
REVIEWCREATE_FAIL,
REVIEWCREATE_RESET,
LOADING_REVIEWLIST,
REVIEWLIST_SUCCESS,
REVIEWLIST_FAIL
} from '../types';

const InitialState = {
    reviews: [],
	loading: null,
	error: null
}

 const ReviewStore = ({
 	children
 }) => {
 	const [state, dispatch] = useReducer(reviewReducer, InitialState);


 	const createReviewOnProduct = R.curry(async function (productId, values) {
             try {
                dispatch({type: LOADING_REVIEWCREATE})
                const {data: {data}} = await axios.post(`/api/v1/products/${productId}/reviews`, values);
                dispatch({
                    type: REVIEWCREATE_SUCCESS,
                payload: {
                    review: data.review
                }                
                })
             }
             catch({response: {data}}) {
                 dispatch({
                     type: REVIEWCREATE_FAIL,
                     payload: {
                         error: data.message
                     }
                 })    
             }                 
         })

    async function getReview(productId) {
        try {
            dispatch({type: LOADING_REVIEWLIST});
            const {data: {data}} = await axios.get(`/api/v1/products/${productId}/reviews`);
            dispatch({
                type: REVIEWLIST_SUCCESS,
                payload: {
                    reviews: data.reviews
                }
            })
        }
        catch({response: {data}}) {
            dispatch({
                type: REVIEWLIST_FAIL,
                payload: {
                    error: data.message
                }
            })    
        }               
    }

const value = {
reviews: state.reviews,
loading: state.loading,
error: state.error,
createReviewOnProduct,
getReview
}

 	return (
 		<ReviewProvider value = {value}>
 			{children}
 		</ReviewProvider>
 		)
 }

 export default ReviewStore;
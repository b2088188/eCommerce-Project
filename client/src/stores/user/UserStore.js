import * as R from 'ramda';
import React, { useReducer } from 'react';
import { UserProvider } from './userContext';
import userReducer from './userReducer';
import {
    LOADING_USERDATA,
    USERDATA_SUCCESS,
    USERDATA_FAIL,
    LOADING_USERUPDATE,
    USERUPDATE_SUCCESS,
    USERUPDATE_FAIL,
    LOADING_USERORDERS,
    USERORDERS_SUCCESS,
    USERORDERS_FAIL,
    USERORDERS_RESET,
    USERDATA_RESET    
} from '../types';
import axios from 'axios';

const InitialState = {
    userProfile: null,
    orders: [],
    loading: null,
    error: null
}

const UserStore = ({
    children
}) => {
    const [state, dispatch] = useReducer(userReducer, InitialState);

    async function getUserProfile() {
        try {
            dispatch({ type: LOADING_USERDATA });
            const { data: { data } } = await axios.get('/api/v1/users/profile');
            dispatch({
                type: USERDATA_SUCCESS,
                payload: {
                    userProfile: data.user
                }
            })
        } catch ({ response: { data } }) {
            dispatch({
                type: USERDATA_FAIL,
                payload: {
                    error: data.message
                }
            })
        }
    }

    async function updateUserProfile(values) {
        try {
            const { data: { data } } = await axios.patch('/api/v1/users/profile', values);
            dispatch({
                type: USERUPDATE_SUCCESS,
                payload: {
                    userProfile: data.user
                }
            })
        } catch ({ response: { data } }) {
            dispatch({
                type: USERUPDATE_FAIL,
                payload: {
                    error: data.message
                }
            })
        }
    }

    async function getUserOrders() {
        try {
           const {data: {data}} = await axios.get('/api/v1/users/myorders');
           dispatch({
            type: USERORDERS_SUCCESS,
            payload: {
                orders: data.orders
            }
           })
        }
        catch({response: {data}}) {
            dispatch({
                type: USERORDERS_FAIL,
                payload: {
                    error: data.message
                }
            })    
        }
    }

    function resetUser() {
        dispatch({type: USERORDERS_RESET})
    dispatch({type: USERDATA_RESET})
    }

    const value = {
        userProfile: state.userProfile,
        orders: state.orders,
        loading: state.loading,
        error: state.error,
        getUserProfile,
        updateUserProfile,
        getUserOrders,
        resetUser
    }

    return (
        <UserProvider value = {value}>
        {children}
      </UserProvider>
    )
}

export default UserStore;
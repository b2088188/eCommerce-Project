import * as R from 'ramda';
import React, { useReducer, useCallback } from 'react';
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
    USERDATA_RESET,
    LOADING_USERLIST,
    USERLIST_SUCCESS,
    USERLIST_FAIL,
    LOADING_USERDELETE,
    USERDELETE_SUCCESS,
    USERDELETE_FAIL
} from '../types';
import axios from 'axios';

const InitialState = {
    userProfile: null,
    orders: [],
    loading: null,
    error: null,
    users: []
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

    const getAllUsers = useCallback(async function () {
            try {
                  dispatch({type: LOADING_USERLIST});
                  const {data: {data}} = await axios.get('/api/v1/users');
                  dispatch({
                    type: USERLIST_SUCCESS,
                    payload: {
                        users: data.users
                    }
                  })
            }
            catch({response: {data}}) {
                    dispatch({
                    type: USERLIST_FAIL,
                    payload: {
                        error: data.message
                    }
                })    
            }
        }, []);

    async function deleteUser(id) {
        try {
            await axios.delete(`/api/v1/users/${id}`);              
        }
        catch({response: {data}}) {
           dispatch({
            type: USERDELETE_FAIL,
            payload: {
                error: data.error
            }
           })     
        }                
    }

    const value = {
        userProfile: state.userProfile,
        orders: state.orders,
        loading: state.loading,
        error: state.error,
        users: state.users,
        getUserProfile,
        updateUserProfile,
        getUserOrders,
        resetUser,
        getAllUsers
    }

    return (
        <UserProvider value = {value}>
        {children}
      </UserProvider>
    )
}

export default UserStore;
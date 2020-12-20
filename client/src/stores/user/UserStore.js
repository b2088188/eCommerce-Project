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
    USERUPDATE_FAIL
} from '../types';
import axios from 'axios';

const InitialState = {
    userProfile: null,
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
        }
        catch({ response: { data } }) {
                dispatch({
                type: USERUPDATE_FAIL,
                payload: {
                    error: data.message
                }
            })
        }                
    }

    const value = {
        userProfile: state.userProfile,
        loading: state.loading,
        error: state.error,
        getUserProfile,
        updateUserProfile
    }

    return (
        <UserProvider value = {value}>
        {children}
      </UserProvider>
    )
}

export default UserStore;
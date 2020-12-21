import * as R from 'ramda';
import React, { useReducer } from 'react';
import { AuthProvider } from './authContext';
import authReducer from './authReducer';
import {
    LOADING_AUTH,
    AUTH_SUCCESS,
    AUTH_FAIL,
    LOGOUT_SUCCESS    
} from '../types';
import axios from 'axios';

const InitialState = {
    user: null,
    token: null,
    isAuthenticated: null,
    loading: null,
    error: null
}

const AuthStore = ({
    children
}) => {
    const [state, dispatch] = useReducer(authReducer, InitialState);

    const userAuthHandle = R.curry(async function(action, values) {
        try {
            dispatch({ type: LOADING_AUTH });
            const { data: { data } } = await axios.post(`/api/v1/users/${action}`, values)
            dispatch({
                type: AUTH_SUCCESS,
                payload: {
                    user: data.user,
                    token: data.token
                }
            });
        } catch ({ response: { data } }) {
            dispatch({
                type: AUTH_FAIL,
                payload: {
                    error: data.message
                }
            })
        }
    }, 2);


    function logout() {
        dispatch({ type: LOGOUT_SUCCESS });
    }

    const value = {
        user: state.user,
        token: state.token,
        isAuth: state.isAuthenticated,
        loading: state.loading,
        error: state.error,
        userAuthHandle,
        logout
    }

    return (
        <AuthProvider value = {value}>
        {children}
      </AuthProvider>
    )
}

export default AuthStore;
import * as R from 'ramda';
import React, { useReducer } from 'react';
import { UserProvider } from './userContext';
import userReducer from './userReducer';
import {
    LOADING_USERDATA,
    USERDATA_SUCCESS,
    USERDATA_FAIL
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
            dispatch({type: LOADING_USERDATA});
           const {data: {data}} = await axios.get('/api/v1/users/profile');
           dispatch({
            type: USERDATA_SUCCESS,
            payload: {
                userProfile: data.user
            }
           })
        }
        catch({response: {data}}) {
           console.log(data.message);
        }
    }

    const value = {
        userProfile: state.userProfile,
        loading: state.loading,
        error: state.error,
        getUserProfile
    }

    return (
        <UserProvider value = {value}>
        {children}
      </UserProvider>
    )
}

export default UserStore;
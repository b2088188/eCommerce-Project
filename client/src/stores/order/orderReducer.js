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

function orderReducer(currentState, action) {
    switch (action.type) {
        case LOADING_ORDERCREATE:
        case LOADING_ORDERDETAIL:
            return {
                ...currentState,
                loading: true
            }
        case ORDERCREATE_SUCCESS:
            return {
                ...currentState,
                orders: [...currentState.orders, action.payload.order],
                createStatus: 'success',
                loading: false
            }
        case ORDERCREATE_FAIL:
        case ORDERDETAIL_FAIL:
        case ORDERPAID_FAIL:
            return {
                ...currentState,
                error: action.payload.error,
                loading: false
            }
        case ORDERDETAIL_SUCCESS:
            return {
                ...currentState,
                currentOrder: action.payload.order
            }
        case ORDERPAID_SUCCESS:
            return {
                ...currentState,
                paidStatus: 'success',
                currentOrder: action.payload.order
            }
        case ORDERPAID_RESET:
            return {};
        default:
            return currentState;
    }
}

export default orderReducer;
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
    ORDERPAID_RESET,
    LOADING_ORDERLIST,
    ORDERLIST_SUCCESS,
    ORDERLIST_FAIL,
    LOADING_ORDERDELIVER,
    ORDERDELIVER_SUCCESS,
    ORDERDELIVER_FAIL,
    ORDERDELIVER_RESET
} from '../types';




function orderReducer(currentState, action) {
    switch (action.type) {
        case LOADING_ORDERCREATE:
        case LOADING_ORDERDETAIL:
        case LOADING_ORDERLIST:
        case LOADING_ORDERDELIVER:
            return {
                ...currentState,
                loading: true
            }
        case ORDERCREATE_SUCCESS:
            return {
                ...currentState,
                orders: [...currentState.orders, action.payload.order],
                currentOrder: action.payload.order,
                createStatus: 'success',
                loading: false
            }
        case ORDERLIST_SUCCESS:
            return {
                ...currentState,
                orders: action.payload.orders,
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
        case ORDERDELIVER_SUCCESS:
            return {
                ...currentState,
                currentOrder: action.payload.order,
                deliveredStatus: 'success'
            }
        case ORDERCREATE_FAIL:
        case ORDERDETAIL_FAIL:
        case ORDERPAID_FAIL:
        case ORDERLIST_FAIL:
        case ORDERDELIVER_FAIL:
            return {
                ...currentState,
                error: action.payload.error,
                loading: false
            }
        case ORDERPAID_RESET:
        case ORDERDELIVER_RESET:
            return {};
        default:
            return currentState;
    }
}

export default orderReducer;
import {createContext} from 'react';

const OrderContext = createContext();

export const OrderProvider = OrderContext.Provider;

export default OrderContext;
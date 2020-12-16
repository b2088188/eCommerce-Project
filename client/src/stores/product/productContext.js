import {createContext} from 'react';

const ProductContext = createContext();

export const ProductProvider = ProductContext.Provider;

export default ProductContext;
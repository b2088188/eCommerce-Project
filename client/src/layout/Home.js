import React, {useEffect, useContext, Fragment} from 'react';
import ProductContext from '../stores/product/productContext';
import {Row, Col} from 'react-bootstrap';
import Product from '../components/productView/Product';
import Spinner from '../utils/Spinner';
import Message from '../utils/Message';

const Home = () => {
    const {products, getAllProducts, loading, error} = useContext(ProductContext);

    useEffect(() => {
       getAllProducts();
    }, [])

    

    function renderProducts(list) {
    	return list.map(function generateItem(product) {
    		return (
              <Col sm = {12} md = {6} lg = {4} xl = {3} key = {product._id}>
              	<Product product = {product}/>
              </Col>
    			)
    	})
    }

	return (
      <Fragment>
      	<h1>Latest Products</h1>
        {loading ? <Spinner /> : error ? <Message variant = "danger ">{error}</Message> : (
        <Row>
            {renderProducts(products)}
        </Row>
            )}      	
      </Fragment>
		)
}

export default Home;
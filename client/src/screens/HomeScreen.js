import React, {Fragment} from 'react';
import {Row, Col} from 'react-bootstrap';
import Product from '../components/productView/Product';
import products from '../products';

const HomeScreen = () => {
	
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
      	<Row>
      		{renderProducts(products)}
      	</Row>
      </Fragment>
		)
}

export default HomeScreen;
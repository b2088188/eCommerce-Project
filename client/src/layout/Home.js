import React, {useState, useEffect, Fragment} from 'react';
import {Row, Col} from 'react-bootstrap';
import Product from '../components/productView/Product';
import axios from 'axios';

const Home = () => {
	const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
       async function fetchProducts() {
           const {data} = await axios.get('/api/v1/products');
           setProducts(data.data.products)
       }
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
      	<Row>
      		{renderProducts(products)}
      	</Row>
      </Fragment>
		)
}

export default Home;
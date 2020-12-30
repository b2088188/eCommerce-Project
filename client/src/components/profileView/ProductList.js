import React, { useEffect, useContext, Fragment } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../stores/auth/authContext';
import ProductContext from '../../stores/product/productContext';
import { useForm } from 'react-hook-form';
import { Table, Button, Row, Col } from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import Message from '../../utils/Message';
import Spinner from '../../utils/Spinner';
import FormContainer from '../../utils/FormContainer';


const ProductList = ({
	history,
	match
}) => {
	const {products, loading, error, statusCreate, createdProduct, resetStatus, getAllProducts, createProduct, deleteProduct} = useContext(ProductContext);
	const {user} = useContext(AuthContext);

    useEffect(() => {
    	if(user.role !== 'admin')
    		return history.push('/login')
    	getAllProducts();
    }, [getAllProducts, user, history])

    useEffect(() => {
    	if(statusCreate){    		
    		history.push(`/admin/productedit/${createdProduct._id}`);    	
    		resetStatus('create');
    	}
    }, [statusCreate])

    function createProductHandler() {
			createProduct({
				name: "Airpods Wireless Bluetooth Headphones",
			   user: "5fea8adccd111f05ac729b67",
			    image: "/assets/airpods.jpg",
			    brand: "Apple",
			    category: "Electronics",
			    description: "Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working",
			    price: "89.99",
			    countInStock: 3
			});
	}

	function deleteProductHandler(id) {
		return function () {
			deleteProduct(id)
		}
	}

	function renderProductList(list) {
		return list.map(function generateItem(product) { 
			return (
				<tr key = {product._id}>
					<td>{product._id}</td>
					<td>{product.name}</td>
					<td>${product.price}</td>
					<td>{product.category}</td>
					<td>{product.brand}</td>
					<td>
						<LinkContainer to = {`/admin/productedit/${product._id}`}>
							<Button variant = 'light' className = 'btn-sm'>
								<i className="fas fa-edit"></i>
							</Button>
						</LinkContainer>
						    <Button variant = 'danger' className = 'btn-sm' onClick = {deleteProductHandler(product._id)}>
						    	<i className="fas fa-trash"></i>
						    </Button>
					</td>
				</tr>
				)
		})
	}

	return (
     <Fragment>
     	<Row className="align-items-center">
     		<Col>
     			<h1>Products</h1>
     		</Col>
     		<Col className = 'text-right'>
     			<Button className = 'my-3' onClick = {createProductHandler}>
     				<i className = 'fas fa-plus'></i> Create Product
     			</Button>
     		</Col>
     	</Row>
     	{loading ? 
     	 <Spinner /> :
     	 error ? 
     	 <Message variant = 'danger'>{error}</Message> :
     	 (
     	 	<Table striped bordered hover responsive className = 'table-sm'>
     	 		<thead>
     	 			<tr>
     	 				<th>ID</th>
     	 				<th>NAME</th>
     	 				<th>PRICE</th>
     	 				<th>CATEGORY</th>
     	 				<th>BRAND</th>
     	 				<th></th>
     	 			</tr>
     	 		</thead>
     	 		<tbody>
     	 			{renderProductList(products)}
     	 		</tbody>
     	 	</Table>
     	 )
     	 }
     </Fragment>			
		)
}

export default ProductList;
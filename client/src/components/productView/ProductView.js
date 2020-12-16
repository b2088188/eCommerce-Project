import React, {useState, useEffect, Fragment} from 'react';
import {Link} from 'react-router-dom';
import {Row, Col, Image, ListGroup, Card, Button} from 'react-bootstrap';
import RatingView from '../ratingView/RatingView';
import axios from 'axios';

const ProductView = ({
	match
}) => {
    const [product, setProduct] = useState({});

    useEffect(() => {
    	fetchProduct();
      async function fetchProduct() {
      	const {data} = await axios.get(`/api/v1/products/${match.params.id}`);
      	setProduct(data.data.product);
      }
    }, [])

	return (
      <Fragment>
      	<Link className="btn btn-dark my-3" to = "/">Go Back</Link>
      	<Row>
      		<Col md = {6}>
      			<Image src = {product.image} alt = {product.name} fluid />
      		</Col>
      		<Col md = {3}>
      			<ListGroup variant = "flush">
      				<ListGroup.Item>
      					<h2>{product.name}</h2>
      				</ListGroup.Item>
      				<ListGroup.Item>
      					<RatingView value = {product.rating} numReviews = {product.numReviews} />
      				</ListGroup.Item>
      				<ListGroup.Item>
      					Price: ${product.price}
      				</ListGroup.Item>
      				<ListGroup.Item>
      					Description: ${product.description}
      				</ListGroup.Item>
      			</ListGroup>
      		</Col>
      		<Col md = {3}>
      			<Card>
      				<ListGroup variant = "flush">
      					<ListGroup.Item>
      						<Row>
      							<Col>
      								Price:
      							</Col>
      							<Col>
      								<strong>${product.price}</strong>
      							</Col>
      						</Row>
      					</ListGroup.Item>
      					<ListGroup.Item>
      						<Row>
      							<Col>
      								Status:
      							</Col>
      							<Col>
      								{product.countInStock>0 ? 'In Stock' : 'Out of Stock'}
      							</Col>
      						</Row>
      					</ListGroup.Item>
      					<ListGroup.Item>
      						<Button className = "btn-block" type = "button" disabled = {product.countInStock<1}>
      							Add To Cart
      						</Button>
      					</ListGroup.Item>
      				</ListGroup>
      			</Card>
      		</Col>
      	</Row>
      </Fragment>
		)
}

export default ProductView;
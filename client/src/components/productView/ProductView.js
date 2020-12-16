import React, {useEffect, useContext, Fragment} from 'react';
import ProductContext from '../../stores/product/productContext';
import {Link} from 'react-router-dom';
import {Row, Col, Image, ListGroup, Card, Button} from 'react-bootstrap';
import RatingView from '../ratingView/RatingView';
import Spinner from '../../utils/Spinner';
import Message from '../../utils/Message';

const ProductView = ({
	match
}) => {
   const {getProduct, product, loading, error} = useContext(ProductContext);

    useEffect(() => {
    	getProduct(match.params.id);
    }, [match.params.id])

    if(loading || !product)
        return <Spinner />
    if(error)
        return <Message variant = "danger">{error}</Message>

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
      					<RatingView value = {product.ratingsAverage} numReviews = {product.ratingsQuantity} />
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
import './productview.scss';
import React from 'react';
import {Card} from 'react-bootstrap';
import Rating from '../ratingView/RatingView';

const Product = ({
	product
}) => {
	
	return (
      <Card className = "my-3 p-3 rounded">
      	 <a href = {`/product/${product._id}`}>
      	 	<Card.Img src = {product.image} variant = "top" />
      	 </a>
      	 <Card.Body>
      	 	<Card.Title as = "div">
      	 	<strong>{product.name}</strong>
      	 	</Card.Title>
      	 	<Card.Text as = "div">
      	 		<Rating value = {product.rating} numReviews = {product.numReviews}  />
      	 	</Card.Text>
      	 	<Card.Text as = "h3" className = "product__price">
      	 		${product.price}
      	 	</Card.Text>
      	 </Card.Body>
      </Card>
		)
}

export default Product;
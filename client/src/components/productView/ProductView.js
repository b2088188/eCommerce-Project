import React, {useState, useEffect, useContext, Fragment} from 'react';
import AuthContext from '../../stores/auth/authContext';
import ProductContext from '../../stores/product/productContext';
import ReviewContext from '../../stores/review/reviewContext';
import {Link} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import {Row, Col, Image, ListGroup, Card, Button, Form} from 'react-bootstrap';
import RatingView from '../ratingView/RatingView';
import Spinner from '../../utils/Spinner';
import Message from '../../utils/Message';

const ProductView = ({
	match,
    history
}) => {
    const {user} = useContext(AuthContext);
   const {getProduct, product, loading, error} = useContext(ProductContext);
   const {reviews ,createReviewOnProduct, getReview, loading: loadingReview, error: errReview} = useContext(ReviewContext);
   const [quantity, setQuantity] = useState(1);
   const {register, handleSubmit, errors} = useForm();
    useEffect(() => {
    	getProduct(match.params.id);
        getReview(match.params.id);
    }, [match.params.id])

   function addToCartHandler() {
       history.push(`/cart/${match.params.id}?qty=${quantity}`);
   }

   function renderReviews(list) {
       return list.map(function generateItem(review) {        
           return (
            <ListGroup.Item key = {review._id}>                
                <RatingView value = {review.rating} />
                <p>{review.createdAt}</p>
            </ListGroup.Item>
            )
       })
   }

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
                        {product.countInStock>0 && (
                          <ListGroup.Item>
                              <Row>
                                  <Col>Quantity</Col>
                                  <Col>
                                      <Form.Control as = "select" value = {quantity} onChange = {(e) => setQuantity(e.target.value)}>
                                          {[...Array(product.countInStock).keys()].map(el => <option key = {el+1} value = {el+1}>{el+1}</option>)}
                                      </Form.Control>
                                  </Col>
                              </Row>
                          </ListGroup.Item>
                            )}
      					<ListGroup.Item>
      						<Button className = "btn-block" type = "button" disabled = {product.countInStock<1} onClick = {addToCartHandler}>
      							Add To Cart
      						</Button>
      					</ListGroup.Item>
      				</ListGroup>
      			</Card>
      		</Col>
      	</Row>
        <Row>
            <Col md = {6}>
                <h2>Reviews</h2>
                {reviews.length<1 && <Message>No Reviews</Message>}
                {loadingReview && <Spinner />}
                <ListGroup variant = 'flush'>
                    {renderReviews(reviews)}
                    <ListGroup.Item>
                        <h2>Write a Customer</h2>
                        {user ? 
                        (
                         <Form onSubmit = {handleSubmit(createReviewOnProduct(match.params.id))}>
                             <Form.Group controlId = 'rating'>
                                 <Form.Label>Rating</Form.Label>
                                 <Form.Control as = 'select' name = 'rating' ref = {register({
                                    required: 'A review must have a rating value'
                                    })}>
                                     <option value = ''>Select ...</option>
                                     <option value = '1'>1 - Poor</option>
                                     <option value = '2'>2 - Fair</option>
                                     <option value = '3'>3 - Ok</option>
                                     <option value = '4'>4 - Good</option>
                                     <option value = '5'>5 - Perfect</option>
                                 </Form.Control>
                             </Form.Group>
                             <Form.Group controlId = 'review'>
                                 <Form.Label>Review</Form.Label>
                                 <Form.Control as = 'textarea' name = 'review' ref = {register({
                                    required: 'A review must have a comment'
                                    })}>
                                 </Form.Control>
                             </Form.Group>
                             <Button type = 'submit' variant = 'primary'>
                                 Submit
                             </Button>
                         </Form>
                        ) :
                        <Message>Please <Link to = '/login'>Sign In</Link> to write a review</Message>}
                    </ListGroup.Item>
                </ListGroup>
            </Col>
        </Row>
      </Fragment>
		)
}

export default ProductView;
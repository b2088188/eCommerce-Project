import React, {useContext, useEffect} from 'react';
import {Link} from 'react-router-dom';
import CartContext from '../../stores/cart/cartContext';
import OrderContext from '../../stores/order/orderContext';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import Message from '../../utils/Message';
import CheckOutView from './CheckOutView';

const PlaceOrderView = ({
  history
}) => {
	const {shippingAddress, paymentMethod, cartItems, itemsPrice, shippingPrice, taxPrice, totalPrice} = useContext(CartContext);
  const {createStatus, currentOrder, loading, error, addOrder} = useContext(OrderContext);   
   useEffect(() => {
     if(createStatus === 'success'){
       history.push(`/order/${currentOrder._id}`)     
     }
   }, [createStatus, history])

    function placeOrderHandler(e) {
    	addOrder({
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice
      })
    }

    function renderOrderItems(list) {
    	return list.map(function generateItem(item, i) {
    		return (
            <ListGroup.Item key = {i}>
            	<Row>
            		<Col md = {1}>
            			<Image src = {item.image} alt = {item.name} fluid rounded />
            		</Col>
            		<Col>
            			<Link to = {`/products/${item._id}`}>{item.name}</Link>
            		</Col>
            		<Col md = {4}>
            			{item.quantity} x ${item.price} = ${item.quantity * item.price}
            		</Col>
            	</Row>
            </ListGroup.Item>
    			)
    	})
    }

	return (
     <>
     	<CheckOutView step1 step2 step3 step4 />
     	<Row>
     			<Col md = {8}>
     				<ListGroup variant = 'flush'>
     					<ListGroup.Item>
     						<h2>Shipping</h2>
     						<p>
     						<strong>Address:</strong>
                               {shippingAddress.address}, {shippingAddress.city}, {shippingAddress.postalCode}, {shippingAddress.country}
     						</p>
     					</ListGroup.Item>
     					<ListGroup.Item>
     						<h2>Payment Method</h2>
     						<strong>Method: </strong>
     						{paymentMethod}
     					</ListGroup.Item>
     					<ListGroup.Item>
     						<h2>Order Items</h2>
     						{cartItems.length<1 ? (<Message>Your cart is empty</Message>) : 
                                                                    (
                                                                      <ListGroup variant = 'flush'>
                                                                      	{renderOrderItems(cartItems)}
                                                                      </ListGroup>
                                                                    	)
     						}
     					</ListGroup.Item>
     				</ListGroup>
     			</Col>
                          <Col md = {4}>
                  <Card>
                    <ListGroup variant = 'flush'>
                    <ListGroup.Item>
                      <h2>Order Summary</h2>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Items</Col>
                        <Col>${itemsPrice}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Tax</Col>
                        <Col>${taxPrice}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Total</Col>
                        <Col>${totalPrice}</Col>
                      </Row>
                    </ListGroup.Item>  
                    <ListGroup.Item>
                      {error && <Message variant = 'danger' error = {error} />}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Button type = "button" className = "btn-block" disabled = {cartItems.length < 1}
                                      onClick = {placeOrderHandler}>
                        Place Order
                      </Button>
                    </ListGroup.Item>                 
                    </ListGroup>
                  </Card>
                </Col>
     	</Row>
     </>
		)
}

export default PlaceOrderView;
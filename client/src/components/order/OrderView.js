import React, {useState, useContext, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {PayPalButton} from 'react-paypal-button-v2';
import AuthContext from '../../stores/auth/authContext';
import OrderContext from '../../stores/order/orderContext';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import Message from '../../utils/Message';
import Spinner from '../../utils/Spinner';
import axios from 'axios';

const OrderView = ({
  match,
  history
}) => {
  const [sdkReady, setSdkReady] = useState(false);
  const {paidStatus, deliveredStatus, currentOrder, loading, error, getOrder, payOrder, deliverOrder, statusReset} = useContext(OrderContext);
  const {user} = useContext(AuthContext);
   useEffect(() => {
      const addPayPalScript = async function () {
          const {data: {data}} = await axios.get('/api/v1/config/paypal');
          const script = document.createElement('script');
          script.type = 'text/javascript';
          script.src = `https://www.paypal.com/sdk/js?client-id=${data.clientId}`;
          script.async = true;
          script.onload = () => {setSdkReady(true)};
          document.body.appendChild(script);
        }

     if(!currentOrder || paidStatus ==='success' || deliveredStatus === 'success'){      
      statusReset();
      getOrder(match.params.id)     
     }
     else if(!currentOrder.isPaid){
       if(!window.paypal)
         addPayPalScript();
       else
       setSdkReady(true);
     }
   }, [match.params.id, currentOrder, paidStatus, deliveredStatus])


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

    function successPayHandler(paymentResult) {
      payOrder(match.params.id, paymentResult)
    }

    function successDeliverHandler(orderId) {
      return function () {        
        deliverOrder(orderId)
      }
    }

  if(loading)
    return <Spinner />

  if(error)
    return <Message variant = 'danger'>{error}</Message> 

  if(!currentOrder)
    return null;


	return (
     <>
     <h1>Order {currentOrder._id}</h1>  
     	<Row>
     			<Col md = {8}>
     				<ListGroup variant = 'flush'>
     					<ListGroup.Item>
     						<h2>Shipping</h2>
                <p><strong>Name: </strong>{currentOrder.user.name}</p>
                <p><strong>Email: </strong><a href = {`mailto:${currentOrder.user.email}`}>{currentOrder.user.email}</a></p>
     						<p>
     						<strong>Address:</strong>
                               {currentOrder.shippingAddress.address}, {currentOrder.shippingAddress.city}, {currentOrder.shippingAddress.postalCode}, {currentOrder.shippingAddress.country}
     						</p>
                {currentOrder.isDelivered ? 
                  <Message variant = 'success'>Delivered On {currentOrder.deleveredAt}</Message> : 
                  <Message variant = 'danger'>Not Delivered</Message>}
     					</ListGroup.Item>
     					<ListGroup.Item>
     						<h2>Payment Method</h2>
                <p>                  
     						<strong>Method: </strong>
     						{currentOrder.paymentMethod}
                </p>
                {currentOrder.isPaid ? 
                  <Message variant = 'success'>Paid On {currentOrder.paidAt}</Message> : 
                  <Message variant = 'danger'>Not Paid</Message>}
     					</ListGroup.Item>
     					<ListGroup.Item>
     						<h2>Order Items</h2>
     						{currentOrder.orderItems.length<1 ? (<Message>Your cart is empty</Message>) : 
                                                                    (
                                                                      <ListGroup variant = 'flush'>
                                                                      	{renderOrderItems(currentOrder.orderItems)}
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
                        <Col>${currentOrder.itemsPrice}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Shipping</Col>
                        <Col>${currentOrder.shippingPrice}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Tax</Col>
                        <Col>${currentOrder.taxPrice}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Total</Col>
                        <Col>${currentOrder.totalPrice}</Col>
                      </Row>
                    </ListGroup.Item>  
                       {!currentOrder.isPaid && (
                         <ListGroup.Item>
                          {loading && <Spinner />}
                           {!sdkReady ? 
                            <Spinner/> :
                            <PayPalButton amount = {currentOrder.totalPrice} onSuccess = {successPayHandler} />}
                         </ListGroup.Item>
                        )}
                        {currentOrder.isPaid && !currentOrder.isDelivered &&
                        (
                          <ListGroup.Item>
                            <Button type = 'button' className = 'btn btn-block' onClick = {successDeliverHandler(currentOrder._id)}>
                              Mark as Delivered
                            </Button>
                          </ListGroup.Item>
                          )}                          
                    </ListGroup>
                  </Card>
                </Col>
     	</Row>
     </>
		)
}

export default OrderView;
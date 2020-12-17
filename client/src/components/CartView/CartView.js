import React, {useEffect, useContext} from 'react';
import {Link} from 'react-router-dom';
import CartContext from '../../stores/cart/cartContext';
import {Row, Col, ListGroup, Image, Form, Button, Card} from 'react-bootstrap';
import Message from '../../utils/Message';


const CartView = ({
	match,
	location,
	history
}) => {
	const {cartItems, totalPrice, totalQuantity, addToCart, changeQuantity, removeFromCart} = useContext(CartContext);
	const productId = match.params.id;
	const quantity = location.search ? +location.search.split('=')[1] : 1;
    
    useEffect(() => {
       if(productId)
       	addToCart(productId, quantity)
    }, [productId])



    function checkOutClick(e) {
    	history.push('/login?redirect=shipping');
    }

    function renderCartList(list) {
    	return list.map(function generateItem(item) {
    		return (
              <ListGroup.Item key = {item._id}>
              	<Row>
              		<Col md = {2}>
              			<Image src = {item.image} alt = {item.name} fluid rounded />
              		</Col>
              		<Col md = {3}>
              			<Link to = {`/products/${item._id}`}>
              				{item.name}
              			</Link>
              		</Col>
              		<Col md = {2}>
              			${item.price}
              		</Col>
              		<Col md = {2}>
              			<Form.Control as = "select" value = {item.quantity} onChange = {(e) => changeQuantity(item._id, +e.target.value)}>
                                          {[...Array(item.countInStock).keys()].map(el => <option key = {el+1} value = {el+1}>{el+1}</option>)}
                        </Form.Control>
              		</Col>
              		<Col md = {2}>
              		<Button type = "button" variant = "light" onClick = {() => removeFromCart(item._id)}>
              			<i className="fas fa-trash"></i>
              		</Button>              			
              		</Col>
              	</Row>
              </ListGroup.Item>
    			)
    	})
    }

	return (
     <Row>
     	<Col md = {8}>
     		<h1 style = {{fontSize: '3rem', padding: '1rem'}}>Shopping Cart</h1>
     		{cartItems.length<1 ? <Message>Your cart is empty<Link to = "/">Go Back</Link></Message> : 
     			<ListGroup variant = "flush">
     				{renderCartList(cartItems)}
     			</ListGroup>
            }
     	</Col>
     	<Col md = {4}>
     		<Card>
     			<ListGroup variant = "flush">
     				<ListGroup.Item>
     					<h2 style = {{fontSize: '2rem', padding: '1rem'}}>Subtotal ({totalQuantity}) items</h2>
     					${totalPrice}
     				</ListGroup.Item>
     				<ListGroup.Item type = "button" className="btn-block" disabled = {cartItems.length<1} onClick = {checkOutClick}>
     					Proceed To Check Out
     				</ListGroup.Item>
     			</ListGroup>
     		</Card>
     	</Col>
     </Row>
		)
}

export default CartView;
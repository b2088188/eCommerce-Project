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
	const {cartItems, addToCart} = useContext(CartContext);
	const productId = match.params.id;
	const quantity = location.search ? +location.search.split('=')[1] : 1;
    
    useEffect(() => {
       if(productId)
       	addToCart(productId, quantity)
    }, [productId])

	return (
     <div>
     	
     </div>
		)
}

export default CartView;
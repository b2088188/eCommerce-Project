import React, {useContext} from 'react';
import CartContext from '../../stores/cart/cartContext';
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import FormContainer from '../../utils/FormContainer';
import CheckOutView from '../checkOutView/CheckOutView';

const ShippingView = ({
	history
}) => {
	const {shippingAddress, saveShippingAddress} = useContext(CartContext);
	const {register, handleSubmit, errors} = useForm();

    function onSubmit(values) {
    	saveShippingAddress(values);
    	history.push('/payment');
    }

	return (
     <FormContainer>
     <CheckOutView step1 step2 />
     	<h1>Shipping</h1>
     	<Form onSubmit = {handleSubmit(onSubmit)}>
     		 <Form.Group controlId = "name">     
		        <Form.Label>Address</Form.Label>            
		            <Form.Control type = "text" placeholder = "Enter Name" name = "address" ref = {register({
		                required: 'You must specify a address',
		            })}>                
		            </Form.Control>
            </Form.Group>
             <Form.Group controlId = "city">     
		        <Form.Label>City</Form.Label>            
		            <Form.Control type = "text" placeholder = "Enter Name" name = "city" ref = {register({
		                required: 'You must specify a city',
		            })}>                
		            </Form.Control>
            </Form.Group>
             <Form.Group controlId = "postalCode">     
		        <Form.Label>PostalCode</Form.Label>            
		            <Form.Control type = "text" placeholder = "Enter Name" name = "postalCode" ref = {register({
		                required: 'You must specify a postalCode',
		            })}>                
		            </Form.Control>
            </Form.Group>
            <Form.Group controlId = "country">     
		        <Form.Label>Country</Form.Label>            
		            <Form.Control type = "text" placeholder = "Enter Name" name = "country" ref = {register({
		                required: 'You must specify a country',
		            })}>                
		            </Form.Control>
            </Form.Group>
            <Button type = "submit" variant = 'primary'>
            	Continue
            </Button>
     	</Form>
     </FormContainer>
		)
}

export default ShippingView;
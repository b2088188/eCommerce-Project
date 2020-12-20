import React, {useState, useContext} from 'react';
import CartContext from '../../stores/cart/cartContext';
import { useForm } from 'react-hook-form';
import { Form, Button, Col } from 'react-bootstrap';
import FormContainer from '../../utils/FormContainer';
import CheckOutView from './CheckOutView';

const PaymentView = ({
	history
}) => {
	const {shippingAddress, savePaymentMethod} = useContext(CartContext);
	const [paymentMethod, setPaymentMethod] = useState('Paypal');

    if(!shippingAddress)
    	history.push('/shipping');

    function onSubmit(e) {
    	e.preventDefault();
    	savePaymentMethod(paymentMethod);
    	history.push('/placeorder');
    }

	return (
     <FormContainer>
     <CheckOutView step1 step2 step3 />
     	<h1>Payment Method</h1>
     	<Form onSubmit = {onSubmit}>
     		 <Form.Group>
     		 	<Form.Label as = 'legend'>Select Method</Form.Label>
     		 <Col>
     		 	<Form.Check type = 'radio' label = 'Paypal or Credit Card' id = 'Paypal' name = 'paymentMethod' value = 'Paypal' checked 
     		 	                          onChange = {(e) => setPaymentMethod(e.target.value)}>     		 		
     		 	</Form.Check>
     		 </Col>
     		</Form.Group>
            <Button type = "submit" variant = 'primary'>
            	Continue
            </Button>
     	</Form>
     </FormContainer>
		)
}

export default PaymentView;
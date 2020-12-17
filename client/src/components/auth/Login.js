import React, {useEffect, useContext} from 'react';
import {Link} from 'react-router-dom';
import AuthContext from '../../stores/auth/authContext';
import {useForm} from 'react-hook-form';
import {Form, Button, Row, Col} from 'react-bootstrap';
import Message from '../../utils/Message';
import Spinner from '../../utils/Spinner';
import FormContainer from '../../utils/FormContainer';

const Login = ({
	history,
	location
}) => {
	const {userAuthHandle, isAuth, loading, error} = useContext(AuthContext);
    const {register, handleSubmit, errors} = useForm();
    const redirect = location.search?.split('=')[1] || '/';

   useEffect(() => {
      if(isAuth)
      	history.push(redirect);
   }, [history, isAuth, redirect])



    return (
      <FormContainer>
      	<h1>Sign In</h1>
      	{error && <Message variant = "danger" >{error}</Message>}
      	{loading && <Spinner />}
      	<Form onSubmit = {handleSubmit(userAuthHandle('login'))}>
      		<Form.Group controlId = "email">
      			<Form.Label>Email Address</Form.Label>
      			<Form.Control type = "text" placeholder = "Enter Email" name = "email" ref = {register({
              required: 'You must specify an email',
               pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
               }
      		})}></Form.Control>
      		</Form.Group>
      		<Form.Group controlId = "password">      	
            <Form.Label>Password</Form.Label>		
      		<Form.Control type = "password" placeholder = "Enter Password" name = "password" ref = {register({
      			required: 'You must specify a password',
      		})}>      			
      		</Form.Control>
      		</Form.Group>
      		<Button type = "submit" variant = "primary">
      			Sign In
      		</Button>
      	</Form>
      	<Row className = "py-3">
      		<Col>
      			New Customer? <Link to = {redirect ? `/signup?redirect=${redirect}` : '/signup'}>Register</Link>
      		</Col>
      	</Row>
      </FormContainer>
    	)
}
//minLength: [8, 'Password must have at least 8 characters']
export default Login;
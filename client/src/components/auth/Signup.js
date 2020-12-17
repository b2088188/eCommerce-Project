import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../stores/auth/authContext';
import { useForm } from 'react-hook-form';
import { Form, Button, Row, Col } from 'react-bootstrap';
import Message from '../../utils/Message';
import Spinner from '../../utils/Spinner';
import FormContainer from '../../utils/FormContainer';

const SignUp = ({
    history,
    location
}) => {
    const { userAuthHandle, isAuth, loading, error } = useContext(AuthContext);
    const { register, handleSubmit, errors } = useForm();
    const redirect = location.search?.split('=')[1] || '/';

    useEffect(() => {
        if (isAuth)
            history.push(redirect);
    }, [history, isAuth, redirect])

   function renderErrorMessage(errors) {
    return Object.values(errors).map((el,i) => {
        return (
         <Message variant = "danger" key = {i}>
            {el.message}  
        </Message>
            )
    })
   }

    return (
        <FormContainer>
        <h1>Sign Up</h1>
        {Object.values(errors).length>0 && renderErrorMessage(errors)}
        {loading && <Spinner />}
        <Form onSubmit = {handleSubmit(userAuthHandle('signup'))}>
        <Form.Group controlId = "name">     
        <Form.Label>Name</Form.Label>            
            <Form.Control type = "text" placeholder = "Enter Name" name = "name" ref = {register({
                required: 'You must specify a name',
            })}>                
            </Form.Control>
            </Form.Group>
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
                required: 'You must specify a password'
            })}>                
            </Form.Control>
            </Form.Group>
            <Form.Group controlId = "passwordConfirm">      
            <Form.Label>Password Confirm</Form.Label>           
            <Form.Control type = "password" placeholder = "Enter Password" name = "passwordConfirm" ref = {register({
                required: 'You must confirm your password'
            })}>                
            </Form.Control>
            </Form.Group>
            <Button type = "submit" variant = "primary">
                Sign In
            </Button>
        </Form>
        <Row className = "py-3">
            <Col>
                Have an Account?{' '}<Link to = {redirect ? `/login?redirect=${redirect}` : '/login'}>Login</Link>
            </Col>
        </Row>
      </FormContainer>
    )
}
//minLength: [8, 'Password must have at least 8 characters']
export default SignUp;
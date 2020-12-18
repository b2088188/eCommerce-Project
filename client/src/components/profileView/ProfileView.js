import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../../stores/user/userContext';
import { useForm } from 'react-hook-form';
import { Form, Button, Row, Col } from 'react-bootstrap';
import Message from '../../utils/Message';
import Spinner from '../../utils/Spinner';


const ProfileView = ({
    history,
    location
}) => {
    const { loading, error, getUserProfile, userProfile } = useContext(UserContext);
    const { register, handleSubmit, errors } = useForm();


    useEffect(() => {
            getUserProfile();
    }, [])

    function renderErrorMessage(errors) {
        return Object.values(errors).map((el, i) => {
            return (
                <Message variant = "danger" key = {i}>
            {el.message}  
        </Message>
            )
        })
    }

    return (
        <Row>            
        <Col md = {3}>
        <h2>User Profile</h2>
         {Object.values(errors).length>0 && renderErrorMessage(errors)}
         {loading && <Spinner />}
         <Form onSubmit = {handleSubmit}>
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
            <Button type = "submit" variant = "primary">
                Save Changes
            </Button>
                </Form>
             </Col>
             <Col md = {9}>
             </Col> 
        </Row>
    )
}
export default ProfileView;
//minLength: [8, 'Password must have at least 8 characters']
// <Form.Group controlId = "password">        
//             <Form.Label>Password</Form.Label>         
//             <Form.Control type = "password" placeholder = "Enter Password" name = "password" ref = {register({
//                 required: 'You must specify a password'
//             })}>                
//             </Form.Control>
//             </Form.Group>
//             <Form.Group controlId = "passwordConfirm">      
//             <Form.Label>Password Confirm</Form.Label>           
//             <Form.Control type = "password" placeholder = "Enter Password" name = "passwordConfirm" ref = {register({
//                 required: 'You must confirm your password'
//             })}>                
//             </Form.Control>
//             </Form.Group>
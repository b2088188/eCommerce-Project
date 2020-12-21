import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../../stores/user/userContext';
import { useForm } from 'react-hook-form';
import { Form, Button, Row, Col, Table } from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import Message from '../../utils/Message';
import Spinner from '../../utils/Spinner';


const ProfileView = ({
    history,
    location
}) => {
    const { loading, error, getUserProfile, userProfile, updateUserProfile, getUserOrders, orders } = useContext(UserContext);
    const { register, handleSubmit, errors } = useForm();


    useEffect(() => {
            getUserProfile();
            getUserOrders();
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

    function renderOrderList(list) {
        return list.map(function generateOrder(order) {
            return (
            <tr key = {order._id}>
                <td>{order._id}</td>
                <td>{order.createdAt.slice(0, 10)}</td>
                <td>{order.totalPrice}</td>
                <td>{order.isPaid ? order.paidAt.slice(0 ,10) : <i className = "fas fa-times" style = {{color: 'red'}}></i>}</td>
                <td>{order.isDelivered ? order.deliveredAt.slice(0 ,11) : <i className = "fas fa-times" style = {{color: 'red'}}></i>}</td>
                <td>
                    <LinkContainer to = {`/order/${order._id}`}>
                        <Button className = "btn-sm" variant = 'light'>
                            Details
                        </Button>
                    </LinkContainer>
                </td>
            </tr>
                )
        })
    }

    return (
        <Row>            
        <Col md = {3}>
        <h2>User Profile</h2>
         {Object.values(errors).length>0 && renderErrorMessage(errors)}
         {loading && <Spinner />}
         <Form onSubmit = {handleSubmit(updateUserProfile)}>
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
             <h2>My Orders</h2>
             {loading ? 
              <Spinner /> :
              error ? (<Message variant = 'danger'>{error}</Message>) :
               <Table striped bordered hover responsive className = "table-sm"> 
               <tr>
                   <td>Id</td>
                   <td>Date</td>
                   <td>Total</td>
                   <td>Paid</td>
                   <td>Delivered</td>
                   <th></th>
               </tr>
               <tbody>
                   {renderOrderList(orders)}
               </tbody>
               </Table> }
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
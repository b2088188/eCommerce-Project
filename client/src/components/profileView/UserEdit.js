import React, { useEffect, useContext, Fragment } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../stores/auth/authContext';
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import Message from '../../utils/Message';
import Spinner from '../../utils/Spinner';
import FormContainer from '../../utils/FormContainer';

const UserEdit = ({
    history,
    match
}) => {
     const {register, handleSubmit, errors} = useForm();

    useEffect(() => {
       //Fetching user if didn't have it

        //If update success push back to User List
    }, [])

    function onSubmit(values) {
        //Update User   
    }

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
        <Fragment>            
        <Link to = '/admin/userlist' className = 'btn btn-light my-3'>Go Back</Link>
        <FormContainer>
        <h1>Edit User</h1>
        {/*Object.values(errors).length>0 && renderErrorMessage(errors)*/}
        {/*loading && <Spinner />*/}
        <Form onSubmit = {handleSubmit(onSubmit)}>
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
            <Form.Group controlId = "isadmin">        
            <Form.Check type = "checkbox" label = 'is Admin' name = "isadmin" ref = {register({
                required: 'Placeholder'
            })}>                
            </Form.Check>
            </Form.Group>
            <Button type = "submit" variant = "primary">
                Update
            </Button>
        </Form>
      </FormContainer>
        </Fragment>
    )
}
//minLength: [8, 'Password must have at least 8 characters']
export default UserEdit; 
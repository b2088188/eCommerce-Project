import * as R from 'ramda';
import React, { useEffect, useContext, Fragment } from 'react';
import ProductContext from '../../stores/product/productContext';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import Message from '../../utils/Message';
import Spinner from '../../utils/Spinner';
import FormContainer from '../../utils/FormContainer';

const ProductEdit = ({
    history,
    match
}) => {
    const {product, loading, error, statusUpdate, resetStatus, getProduct, updateProduct} = useContext(ProductContext);
    const {register, handleSubmit, errors} = useForm();

    useEffect(() => {
        //Clear Create Success State

       //Fetch Product Data
       getProduct(match.params.id)
        //Set Input to data value

       //If update success, push to Product List
    }, [match.params.id])

    useEffect(() => {
        if(statusUpdate === 'success'){            
            history.push('/admin/productlist');
            resetStatus('update');
        }        
    }, [statusUpdate, resetStatus, history])



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
        <Link to = '/admin/productlist' className = 'btn btn-light my-3'>Go Back</Link>
        <FormContainer>
        <h1>Edit Product</h1>
        {Object.values(errors).length>0 && renderErrorMessage(errors)}
        {loading && <Spinner />}
        <Form onSubmit = {handleSubmit(updateProduct(match.params.id))}>
        <Form.Group controlId = "name">     
        <Form.Label>Name</Form.Label>            
            <Form.Control type = "text" placeholder = "Enter Name" name = "name" ref = {register({
                required: 'You must specify a name'
            })}>                
            </Form.Control>
            </Form.Group>
             <Form.Group controlId = "price">     
            <Form.Label>Price</Form.Label>            
            <Form.Control type = "number" placeholder = "Enter Price" name = "price" ref = {register({
                required: 'You must specify a price'
            })}>                
            </Form.Control>
            </Form.Group>
             <Form.Group controlId = "image">     
            <Form.Label>Image</Form.Label>            
            {/* {<Form.Control type = "text" placeholder = "Enter Image" name = "image" ref = {register({ */}
            {/*                 required: 'You must specify a image' */}
            {/*             })}>                 */}
            {/*             </Form.Control>} */}
            <Form.File name = 'image' label = 'Choose File' custom ref = {register}>                
            </Form.File>
            </Form.Group>
             <Form.Group controlId = "brand">     
        <Form.Label>Brand</Form.Label>            
            <Form.Control type = "text" placeholder = "Enter Brand" name = "brand" ref = {register({
                required: 'You must specify a brand'
            })}>                
            </Form.Control>
            </Form.Group>
             <Form.Group controlId = "category">     
        <Form.Label>Category</Form.Label>            
            <Form.Control type = "text" placeholder = "Enter Category" name = "category" ref = {register({
                required: 'You must specify a category'
            })}>                
            </Form.Control>
            </Form.Group>
             <Form.Group controlId = "countInStock">     
        <Form.Label>Count In Stock</Form.Label>            
            <Form.Control type = "number" placeholder = "Enter Count In Stock" name = "countInStock" ref = {register}>                
            </Form.Control>
            </Form.Group>
             <Form.Group controlId = "description">     
        <Form.Label>Description</Form.Label>            
            <Form.Control type = "text" placeholder = "Enter Description" name = "description" ref = {register({
                required: 'You must specify a description'
            })}>                
            </Form.Control>
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
export default ProductEdit; 
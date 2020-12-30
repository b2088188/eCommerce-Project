import React, { useEffect, useContext, Fragment } from 'react';
import { Link } from 'react-router-dom';
import OrderContext from '../../stores/order/orderContext';
import AuthContext from '../../stores/auth/authContext';
import { useForm } from 'react-hook-form';
import { Table, Button } from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import Message from '../../utils/Message';
import Spinner from '../../utils/Spinner';
import FormContainer from '../../utils/FormContainer';


const OrderList = ({
	history
}) => {
	const {orders, loading, error, getAllOrders} = useContext(OrderContext);
	const {user} = useContext(AuthContext);

    useEffect(() => {
    	getAllOrders();
    }, [getAllOrders])


	function renderUserList(list) {
		return list.map(function generateItem(order) { 
			return (
				<tr key = {order._id}>
					<td>{order._id}</td>
					<td>{order.user?.name}</td>
					<td>{order.createdAt}</td>
					<td>${order.totalPrice}</td>
					<td>
						{order.isPaid ?
						(order.paidAt) : 
						(<i className="fas fa-times" style = {{color: 'red'}}></i>)}
					</td>
					<td>
						{order.isDelivered ?
						(order.deliveredAt) : 
						(<i className="fas fa-times" style = {{color: 'red'}}></i>)}
					</td>
					<td>
						<LinkContainer to = {`/order/${order._id}`}>
							<Button variant = 'light' className = 'btn-sm'>
								Details
							</Button>
						</LinkContainer>
					</td>
				</tr>
				)
		})
	}

	return (
     <Fragment>
     	<h1>Orders</h1>
     	{loading ? 
     	 <Spinner /> :
     	 error ? 
     	 <Message variant = 'danger'>{error}</Message> :
     	 (
     	 	<Table>
     	 		<thead>
     	 			<tr>
     	 				<th>ID</th>
     	 				<th>USER</th>
     	 				<th>DATE</th>
     	 				<th>TOTALPRICE</th>
     	 				<th>PAID</th>
     	 				<th>DELIVERED</th>
     	 				<th></th>
     	 			</tr>
     	 		</thead>
     	 		<tbody>
     	 			{renderUserList(orders)}
     	 		</tbody>
     	 	</Table>
     	 )
     	 }
     </Fragment>			
		)
}

export default OrderList;
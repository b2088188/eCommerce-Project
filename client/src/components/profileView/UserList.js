import React, { useEffect, useContext, Fragment } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../stores/auth/authContext';
import UserContext from '../../stores/user/userContext';
import { useForm } from 'react-hook-form';
import { Table, Button } from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import Message from '../../utils/Message';
import Spinner from '../../utils/Spinner';
import FormContainer from '../../utils/FormContainer';


const UserList = ({
	history
}) => {
	const {userProfile, users, loading, error, getAllUsers} = useContext(UserContext);
	const {user} = useContext(AuthContext);

    useEffect(() => {
    	if(user && user.role === 'admin')
  		return getAllUsers();
  	    history.push('/login');
    }, [history, user, getAllUsers])

	function deleteUserHandler(id) {
		return function () {
			
		}
	}

	function renderUserList(list) {
		return list.map(function generateItem(user) { 
			return (
				<tr key = {user._id}>
					<td>{user._id}</td>
					<td>{user.name}</td>
					<td><a href = {`mailto:${user.email}`}>{user.email}</a></td>
					<td><i className = 'fas fa-check' style = {{color: 'green'}}></i></td>
					<td>
						<LinkContainer to = {`/admin/useredit/${user._id}`}>
							<Button variant = 'light' className = 'btn-sm'>
								<i className="fas fa-edit"></i>
							</Button>
						</LinkContainer>
						    <Button variant = 'danger' className = 'btn-sm' onClick = {deleteUserHandler(user._id)}>
						    	<i className="fas fa-trash"></i>
						    </Button>
					</td>
				</tr>
				)
		})
	}

	return (
     <Fragment>
     	<h1>Users</h1>
     	{loading ? 
     	 <Spinner /> :
     	 error ? 
     	 <Message variant = 'danger'>{error}</Message> :
     	 (
     	 	<Table>
     	 		<thead>
     	 			<tr>
     	 				<th>ID</th>
     	 				<th>NAME</th>
     	 				<th>EMAIL</th>
     	 				<th>ADMIN</th>
     	 				<th></th>
     	 			</tr>
     	 		</thead>
     	 		<tbody>
     	 			{renderUserList(users)}
     	 		</tbody>
     	 	</Table>
     	 )
     	 }
     </Fragment>			
		)
}

export default UserList;
import React, { useContext } from 'react';
import AuthContext from '../stores/auth/authContext';
import UserContext from '../stores/user/userContext';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import Search from './Search';

const Header = () => {
    const { isAuth, user, logout } = useContext(AuthContext);
    const {resetUser} = useContext(UserContext);
  function logoutClick() {
      logout();
      resetUser();
  }

    return (
        <header>
   <Navbar bg="dark" variant = "dark" expand="lg" collapseOnSelect>
   <Container>   
   <LinkContainer to = "/">     
  <Navbar.Brand>eCommerce</Navbar.Brand>
   </LinkContainer> 
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
  <Search />
    <Nav className="ml-auto">
      <LinkContainer to = "/cart">      
      <Nav.Link ><i className = "fas fa-shopping-cart"></i> Cart</Nav.Link>
    </LinkContainer>    
      {user ? (<NavDropdown title = {user.name} id = "username">
                      <LinkContainer to = "/profile">
                          <NavDropdown.Item>Profile</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Item onClick = {logoutClick}>
                          Logout
                      </NavDropdown.Item>
                  </NavDropdown>) :
                  (
                    <LinkContainer to = "/login">       
                          <Nav.Link ><i className = "fas fa-user"></i>Sign In</Nav.Link>    
                    </LinkContainer>    
                  )}
              {user && user.role === 'admin' && 
               (<NavDropdown title = {user.role} id = "adminmenu">
                      <LinkContainer to = "/admin/userlist">
                          <NavDropdown.Item>Users</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to = "/admin/productlist">
                          <NavDropdown.Item>Products</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to = "/admin/orderlist">
                          <NavDropdown.Item>Orders</NavDropdown.Item>
                      </LinkContainer>
                  </NavDropdown>)}
    </Nav>
  </Navbar.Collapse>
   </Container>
</Navbar>
      </header>
    )
}

export default Header;
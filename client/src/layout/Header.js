import React, { useContext } from 'react';
import AuthContext from '../stores/auth/authContext';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';

const Header = () => {
    const { isAuth, user, logout } = useContext(AuthContext);

  function logoutClick() {
      logout();
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
    </Nav>
  </Navbar.Collapse>
   </Container>
</Navbar>
      </header>
    )
}

export default Header;
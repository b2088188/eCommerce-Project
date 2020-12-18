import './App.scss';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Container} from 'react-bootstrap';
import AuthStore from './stores/auth/AuthStore';
import UserStore from './stores/user/UserStore';
import ProductStore from './stores/product/ProductStore';
import CartStore from './stores/cart/CartStore';
import Header from './layout/Header';
import Footer from './layout/Footer';
import Home from './layout/Home';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import ProductView from './components/productView/ProductView';
import CartView from './components/CartView/CartView';
import ProfileView from './components/profileView/ProfileView';

const App = ()=> {
  return (
    <AuthStore>
    <UserStore>      
    <ProductStore>    
    <CartStore>      
    <Router>      
      <Header />
      <main className = "py-3">
      <Container>        
         <Route path = "/login" exact component = {Login} />
         <Route path = "/signup" exact component = {Signup} />
         <Route path = "/profile" exact component = {ProfileView} />
        <Route path = "/products/:id" exact component = {ProductView} />
        <Route path = "/cart/:id?" exact component = {CartView} />
        <Route path = "/" exact component = {Home} />
      </Container>
      </main>
      <Footer />
    </Router>
    </CartStore>
    </ProductStore>
    </UserStore>
    </AuthStore>
  );
}

export default App;

import './App.scss';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Container} from 'react-bootstrap';
import AuthStore from './stores/auth/AuthStore';
import UserStore from './stores/user/UserStore';
import ProductStore from './stores/product/ProductStore';
import CartStore from './stores/cart/CartStore';
import PrivateRoute from './routes/PrivateRoute';
import Header from './layout/Header';
import Footer from './layout/Footer';
import Home from './layout/Home';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import ProductView from './components/productView/ProductView';
import CartView from './components/CartView/CartView';
import ProfileView from './components/profileView/ProfileView';
import ShippingView from './components/shippingView/ShippingView';

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
         <Route path = "/shipping" exact component = {ShippingView} />
         <Route path = "/login" exact component = {Login} />
         <Route path = "/signup" exact component = {Signup} />
         <PrivateRoute path = "/profile" exact component = {ProfileView} />
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

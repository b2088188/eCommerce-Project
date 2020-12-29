import './App.scss';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Container} from 'react-bootstrap';
import AuthStore from './stores/auth/AuthStore';
import UserStore from './stores/user/UserStore';
import ProductStore from './stores/product/ProductStore';
import CartStore from './stores/cart/CartStore';
import OrderStore from './stores/order/OrderStore';
import PrivateRoute from './routes/PrivateRoute';
import Header from './layout/Header';
import Footer from './layout/Footer';
import Home from './layout/Home';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import ProductView from './components/productView/ProductView';
import CartView from './components/CartView/CartView';
import ProfileView from './components/profileView/ProfileView';
import ShippingView from './components/order/ShippingView';
import PaymentView from './components/order/PaymentView';
import PlaceOrderView from './components/order/PlaceOrderView';
import OrderView from './components/order/OrderView';
import UserList from './components/profileView/UserList';
import ProductList from './components/profileView/ProductList';
import UserEdit from './components/profileView/UserEdit';
import ProductEdit from './components/profileView/ProductEdit';

const App = ()=> {
  return (
    <AuthStore>
    <UserStore>      
    <ProductStore>    
    <CartStore>  
    <OrderStore>    
    <Router>      
      <Header />
      <main className = "py-3">
      <Container>        
         <Route path = "/shipping" exact component = {ShippingView} />
         <Route path = "/payment" exact component = {PaymentView} />
         <Route path = "/placeorder" exact component = {PlaceOrderView} />
         <Route path = "/order/:id" exact component = {OrderView} />
         <Route path = "/login" exact component = {Login} />
         <Route path = "/signup" exact component = {Signup} />
         <PrivateRoute path = "/profile" exact component = {ProfileView} />
        <Route path = "/products/:id" exact component = {ProductView} />
        <Route path = "/cart/:id?" exact component = {CartView} />
        <Route path = '/admin/userlist' exact component = {UserList} />
        <Route path = '/admin/productlist' exact component = {ProductList} />
        <Route path = '/admin/useredit/:id' exact component = {UserEdit} />
        <Route path = '/admin/productedit/:id' exact component = {ProductEdit} />
        <Route path = "/" exact component = {Home} />
      </Container>
      </main>
      <Footer />
    </Router>
    </OrderStore>    
    </CartStore>
    </ProductStore>
    </UserStore>
    </AuthStore>
  );
}

export default App;

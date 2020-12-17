import './App.scss';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Container} from 'react-bootstrap';
import ProductStore from './stores/product/ProductStore';
import CartStore from './stores/cart/CartStore';
import Header from './layout/Header';
import Footer from './layout/Footer';
import Home from './layout/Home';
import ProductView from './components/productView/ProductView';
import CartView from './components/CartView/CartView';

const App = ()=> {
  return (
    <ProductStore>    
    <CartStore>      
    <Router>      
      <Header />
      <main className = "py-3">
      <Container>        
        <Route path = "/" exact component = {Home} />
        <Route path = "/products/:id" exact component = {ProductView} />
        <Route path = "/cart/:id?" exact component = {CartView} />
      </Container>
      </main>
      <Footer />
    </Router>
    </CartStore>
    </ProductStore>
  );
}

export default App;

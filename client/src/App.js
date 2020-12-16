import './App.scss';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Container} from 'react-bootstrap';
import ProductStore from './stores/product/ProductStore';
import Header from './layout/Header';
import Footer from './layout/Footer';
import Home from './layout/Home';
import ProductView from './components/productView/ProductView';

const App = ()=> {
  return (
    <ProductStore>    
    <Router>      
      <Header />
      <main className = "py-3">
      <Container>        
        <Route path = "/" exact component = {Home} />
        <Route path = "/products/:id" exact component = {ProductView} />
      </Container>
      </main>
      <Footer />
    </Router>
    </ProductStore>
  );
}

export default App;

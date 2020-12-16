import './App.css';
import {Container} from 'react-bootstrap';
import Header from './layout/Header';
import Footer from './layout/Footer';

const App = ()=> {
  return (
    <div className="App">
      <Header />
      <main className = "py-3">
      <Container>        
        <h1>Welcome</h1>
      </Container>
      </main>
      <Footer />
    </div>
  );
}

export default App;

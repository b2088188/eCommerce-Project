import './App.scss';
import {Container} from 'react-bootstrap';
import Header from './layout/Header';
import Footer from './layout/Footer';
import HomeScreen from './screens/HomeScreen';

const App = ()=> {
  return (
    <div className="App">
      <Header />
      <main className = "py-3">
      <Container>        
        <HomeScreen />
      </Container>
      </main>
      <Footer />
    </div>
  );
}

export default App;

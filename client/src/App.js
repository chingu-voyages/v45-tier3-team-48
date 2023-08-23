import './App.css';
import FrontendRoutes from './Routes';
import Navbar from './components/shared/NavBar';
import Footer from './components/shared/Footer';
import {BrowserRouter} from 'react-router-dom';

function App() {
  return (
    <div className="App">

      <BrowserRouter> 
        <Navbar/>
        <FrontendRoutes/>
        <Footer/>
      </BrowserRouter>

    </div>
  );
}

export default App;

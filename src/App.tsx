import 'normalize.css';
import './App.css';
import Footer from './components/Footer/Footer';
import MainBlock from './components/MainBlock/MainBlock';
import { BrowserRouter } from 'react-router-dom';
import HeaderContainer from './components/Header/HeaderContainer';

function App() {
  return (
    // <BrowserRouter basename={process.env.PUBLIC_URL}>
    <BrowserRouter>
      <div className='App'>
        <HeaderContainer />
        <MainBlock />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;

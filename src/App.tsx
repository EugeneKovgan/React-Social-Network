import 'antd/dist/reset.css';
import 'normalize.css';
import './App.css';
import Footer from './components/Footer/Footer';
import MainBlock from './components/MainBlock/MainBlock';
import { BrowserRouter } from 'react-router-dom';
import { Header } from './components/Header/Header';

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Header />
        <MainBlock />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;

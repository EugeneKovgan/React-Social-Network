import './App.css';
import logo from './assets/img/avatar.jpg';

const App = () => {
  return (
    <div className='App'>
      <header className='header'>
        <img src={logo} alt='logo' />
      </header>
      <nav className='nav'>
        <ul className='nav-list'>
          <li className='nav-list__item'>
            <a href='#'>Profile</a>
          </li>
          <li className='nav-list__item'>
            <a href='#'>Messages</a>
          </li>
          <li className='nav-list__item'>
            <a href='#'>Profile</a>{' '}
          </li>
        </ul>
      </nav>
      <main className='content'>content</main>
      <footer className='footer'>footer</footer>
    </div>
  );
};

export default App;

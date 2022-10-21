import styles from './Header.module.css';
import logo from '../../assets/svg/logo_thyme.svg';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className='container'>
        <div className={styles.header_container}>
          <a href='#'>
            <img className='svg-scale' src={logo} alt='logo' />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;

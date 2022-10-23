import styles from './Header.module.css';
import logo from '../../assets/svg/logo_thyme.svg';
import avatar from '../../assets/img/avatar.jpg';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className='container'>
        <a href='#'>
          <img className={styles.logo} src={logo} alt='logo' />
        </a>
        <img className={styles.avatar} src={avatar} alt='avatar' />
      </div>
    </header>
  );
};

export default Header;

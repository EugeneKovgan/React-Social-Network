import styles from './Header.module.css';
import logo from '../../assets/svg/logo_thyme.svg';
import avatar from '../../assets/img/avatar.jpg';
import { NavLink } from 'react-router-dom';

export type MapPropsType = {
  isAuth: boolean;
  login: string | null;
};

export type DispatchPropsType = {
  logout: () => void;
};

const Header: React.FC<MapPropsType & DispatchPropsType> = ({ isAuth, login, logout }) => {
  return (
    <header className={styles.header}>
      <div className='container'>
        <NavLink to='/profile'>
          <img className={styles.logo} src={logo} alt='logo' />
        </NavLink>
        <div className={styles.profileBlock}>
          <NavLink to='/profile'>
            <p>
              {isAuth ? (
                <span className={styles.loginBlock}>
                  <span>{login}</span>
                  <span className={styles.logOut} onClick={logout}>
                    logout
                  </span>
                </span>
              ) : (
                'login'
              )}
            </p>
          </NavLink>
          <NavLink to='/profile'>
            <img className={styles.avatar} src={avatar} alt='avatar' />
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Header;

import styles from './Header.module.css';
import logo from '../../assets/svg/logo_thyme.svg';
import avatar from '../../assets/img/avatar.jpg';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/auth-reducer';
import { selectIsAuth, selectIsLogin } from '../redux/auth-selectors';
import { AppDispatch } from '../redux/redux-store';

export const Header: React.FC = () => {
  const isAuth = useSelector(selectIsAuth);
  const login = useSelector(selectIsLogin);
  const dispatch: AppDispatch = useDispatch();
  const logoutCallback = () => {
    dispatch(logout());
  };

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
                  <span className={styles.logOut} onClick={logoutCallback}>
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

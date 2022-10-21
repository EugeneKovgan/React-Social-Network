import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.nav_list}>
        <li className={styles.nav_list__item}>
          <a href='#'>Profile</a>
        </li>
        <li className={styles.nav_list__item}>
          <a href='#'>Messages</a>
        </li>
        <li className={styles.nav_list__item}>
          <a href='#'>Profile</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

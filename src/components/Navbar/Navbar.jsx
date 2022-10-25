import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.nav_list}>
        <li className={styles.nav_list__item}>
          <a href="/profile">Profile</a>
        </li>
        <li className={styles.nav_list__item}>
          <a href="/dialogs">Messages</a>
        </li>
        <br />
        <li className={styles.nav_list__item}>
          <a href="/news">News</a>
        </li>
        <li className={styles.nav_list__item}>
          <a href="/music">Music</a>
        </li>
        <li className={styles.nav_list__item}>
          <a href="/settings">Settings</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

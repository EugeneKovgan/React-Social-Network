import styles from "./Navbar.module.css";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.nav_list}>
        <li className={styles.nav_list__item}>
          <NavLink
            to="/profile"
            className={(navData) =>
              navData.isActive ? styles.active : styles.nav_list__item
            }
          >
            Profile
          </NavLink>
        </li>
        <li className={styles.nav_list__item}>
          <NavLink
            to="/dialogs"
            className={(navData) =>
              navData.isActive ? styles.active : styles.nav_list__item
            }
          >
            Messages
          </NavLink>
        </li>

        <br />

        <li className={styles.nav_list__item}>
          <NavLink
            to="/news"
            className={(navData) =>
              navData.isActive ? styles.active : styles.nav_list__item
            }
          >
            News
          </NavLink>
        </li>
        <li className={styles.nav_list__item}>
          <NavLink
            to="/music"
            className={(navData) =>
              navData.isActive ? styles.active : styles.nav_list__item
            }
          >
            Music
          </NavLink>
        </li>
        <li className={styles.nav_list__item}>
          <NavLink
            to="/settings"
            className={(navData) =>
              navData.isActive ? styles.active : styles.nav_list__item
            }
          >
            Settings
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

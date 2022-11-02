import styles from "./Header.module.css";
import logo from "../../assets/svg/logo_thyme.svg";
import avatar from "../../assets/img/avatar.jpg";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className="container">
        <NavLink to="/profile">
          <img className={styles.logo} src={logo} alt="logo" />
        </NavLink>
        <NavLink to="/profile">
          <img className={styles.avatar} src={avatar} alt="avatar" />
        </NavLink>
      </div>
    </header>
  );
};

export default Header;

import styles from "./Preloader.module.css";
import loader from "../../assets/svg/loader.svg";
import React from "react";

const Preloader = () => {
  return <div className={styles.mainBlockForLoader}>
    <img className={styles.loader} src={loader} alt="loader" />
  </div>;
};

export default Preloader;
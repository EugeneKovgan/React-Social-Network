import styles from "./MainBlock.module.css";
import Navbar from "../Navbar/Navbar";
import Content from "../Content/Content";

const MainBlock = () => {
  return (
    <div className={styles.mainBlock}>
      <Navbar />
      <Content />
    </div>
  );
};

export default MainBlock;

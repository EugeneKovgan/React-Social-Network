import styles from "./MainBlock.module.css";
import Navbar from "../Navbar/Navbar";
import Content from "../Content/Content";

const MainBlock = ({ store }) => {
  return (
    <div className={styles.mainBlock}>
      <Navbar />
      <Content store={store} />
    </div>
  );
};

export default MainBlock;

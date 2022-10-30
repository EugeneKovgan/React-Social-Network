import styles from "./MainBlock.module.css";
import Navbar from "../Navbar/Navbar";
import Content from "../Content/Content";

const MainBlock = ({ dialogsData }) => {
  return (
    <div className={styles.mainBlock}>
      <Navbar />
      <Content dialogsData={dialogsData} />
    </div>
  );
};

export default MainBlock;

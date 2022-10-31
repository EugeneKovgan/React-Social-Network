import styles from "./MainBlock.module.css";
import Navbar from "../Navbar/Navbar";
import Content from "../Content/Content";
import { updateNewPostText } from "../redux/state";

const MainBlock = ({ dialogsData, addPost }) => {
  return (
    <div className={styles.mainBlock}>
      <Navbar />
      <Content
        dialogsData={dialogsData}
        addPost={addPost}
        updateNewPostText={updateNewPostText}
      />
    </div>
  );
};

export default MainBlock;

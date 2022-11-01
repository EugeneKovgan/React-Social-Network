import styles from "./MainBlock.module.css";
import Navbar from "../Navbar/Navbar";
import Content from "../Content/Content";
import { updateNewPostText } from "../redux/state";

const MainBlock = ({ state, dispatch}) => {
  return (
    <div className={styles.mainBlock}>
      <Navbar />
      <Content
          state={state}
          dispatch={dispatch}
      />
    </div>
  );
};

export default MainBlock;

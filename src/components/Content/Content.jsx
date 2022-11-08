import styles from "./Content.module.css";
import Profile from "../Profile/Profile";
import News from "../News/News";
import Music from "../Music/Music";
import Settings from "../Settings/Settings";
import { Route, Routes } from "react-router-dom";
import DialogsContainer from "../Dialogs/DialogsContainer";

const Content = () => {
  return (
    <div className={styles.content}>
      <Routes>
        <Route path="/profile" element={<Profile />} />
        <Route path="/dialogs/*" element={<DialogsContainer />} />
        <Route path="/news" element={<News />} />
        <Route path="/music" element={<Music />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </div>
  );
};
export default Content;

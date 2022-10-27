import styles from "./Content.module.css";
import Dialogs from "../Dialogs/Dialogs";
import Profile from "../Profile/Profile";
import News from "../News/News";
import Music from "../Music/Music";
import Settings from "../Settings/Settings";
import { Route, Routes } from "react-router-dom";

const Content = () => {
  return (
    <div className={styles.content}>
      {/*content*/}
      <Routes>
        <Route path="/profile" element={<Profile />} />
        <Route path="/dialogs/*" element={<Dialogs />} /> {/*messages*/}
        <Route path="/news" element={<News />} />
        <Route path="/music" element={<Music />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </div>
  );
};
export default Content;

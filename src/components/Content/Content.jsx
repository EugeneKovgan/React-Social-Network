import styles from "./Content.module.css";
import Profile from "../Profile/Profile";
import News from "../News/News";
import Music from "../Music/Music";
import Settings from "../Settings/Settings";
import { Route, Routes } from "react-router-dom";
import Dialogs from "../Dialogs/Dialog";

const Content = ({ state, dispatch }) => {
  return (
    <div className={styles.content}>
      <Routes>
        <Route
          path="/profile"
          element={
            <Profile
                state={state}
                dispatch={dispatch}
            />
          }
        />
        <Route
          path="/dialogs/*"
          element={<Dialogs state={state} />}
        />
        <Route path="/news" element={<News />} />
        <Route path="/music" element={<Music />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </div>
  );
};
export default Content;

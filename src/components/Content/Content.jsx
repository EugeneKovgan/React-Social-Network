import styles from "./Content.module.css";
import News from "../News/News";
import Music from "../Music/Music";
import Settings from "../Settings/Settings";
import {Route, Routes} from "react-router-dom";
import DialogsContainer from "../Dialogs/DialogsContainer";
import UsersContainer from "../Users/UsersContainer";
import ProfileContainer from "../Profile/ProfileContainer";

const Content = () => {
    return (
        <div className={styles.content}>
            <Routes>
                <Route path="/profile" element={<ProfileContainer/>}>
                    <Route path=":userId" element={<ProfileContainer/>}/>
                </Route>
                <Route path="/dialogs/*" element={<DialogsContainer/>}/>
                <Route path="/users/*" element={<UsersContainer/>}/>
                <Route path="/news" element={<News/>}/>
                <Route path="/music" element={<Music/>}/>
                <Route path="/settings" element={<Settings/>}/>
            </Routes>
        </div>
    );
};
export default Content;

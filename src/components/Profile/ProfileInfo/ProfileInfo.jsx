import styles from "./ProfileInfo.module.css";
import photo from "../../../assets/img/avatar.jpg";
import Preloader from "../../Preloader/Preloader";

const ProfileInfo = (props) => {

    if (!props.profile)
        return <Preloader/>
    return (
        <div className={styles.ProfileInfo}>
            <img src={photo} alt="photo"/>
            name= {props.profile.fullName} + description
        </div>
    );

};

export default ProfileInfo;

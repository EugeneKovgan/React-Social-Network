import styles from "./ProfileInfo.module.css";
import photo from "../../../assets/img/avatar.jpg";
import Preloader from "../../Preloader/Preloader";
import ProfileStatusHooks from "./ProfileStatusHooks";
import { useState } from "react";
import ProfileInfoBlock from "./ProfileInfoBlock";
import ProfileInfoBlockForm from "./ProfileInfoBlockForm";

const ProfileInfo = ({ updateStatus, profile, status, isOwner, savePhoto, saveProfile }) => {
  let [editMode, setEditMode] = useState(false);

  const activateEditMode = () => {
    setEditMode(true);
  };

  const onMainPhotoSelected = (e) => {
    if (e.target.files.length) {
      console.log("photo");
      savePhoto(e.target.files[0]);
    }
  };

  const onSubmit = (formData) => {
    console.log(formData);
    saveProfile(formData);
    // login(formData.email, formData.password, formData.rememberMe);
  };

  if (!profile) return <Preloader />;
  return (
    <div className={styles.ProfileInfo}>
      <ProfileStatusHooks
        updateStatus={updateStatus}
        isOwner={isOwner}
        status={status}
      />
      <img src={profile.photos.small || photo} alt="photo" />
      {isOwner ? <input className={styles.files_btn} onChange={onMainPhotoSelected} type="file" /> : ""}
      {editMode ? <ProfileInfoBlockForm
          profile={profile}
          onSubmit={onSubmit}
        /> :
        <ProfileInfoBlock
          profile={profile}
          isOwner={isOwner}
          activateEditMode={activateEditMode}
        />}
    </div>
  );
};

export default ProfileInfo;

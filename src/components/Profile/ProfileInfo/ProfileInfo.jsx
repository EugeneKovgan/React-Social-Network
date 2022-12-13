import styles from "./ProfileInfo.module.css";
import photo from "../../../assets/img/avatar.jpg";
import Preloader from "../../Preloader/Preloader";
import ProfileStatusHooks from "./ProfileStatusHooks";

const ProfileInfo = ({ updateStatus, profile, status, isOwner, savePhoto }) => {

  const onMainPhotoSelected = (e) => {
    if (e.target.files.length) {
      console.log("photo");
      savePhoto(e.target.files[0]);
    }

  };
  if (!profile) return <Preloader />;
  return (
    <div className={styles.ProfileInfo}>
      <ProfileStatusHooks
        updateStatus={updateStatus}
        status={
          status
          // "Дублируешь? Ты го$ноко&ер! Оторвать тебе руку! Ты больше не самурай!"
        }
      />
      <img src={profile.photos.small || photo} alt="photo" />
      {isOwner ? <input onChange={onMainPhotoSelected} type="file" /> : ""}

      <div className={styles.infoblock}>
        <p>{profile.fullName}</p>
        <p>{profile.aboutMe}</p>
        <p>{profile.contacts.facebook}</p>
        <p>id: {profile.userId}</p>
      </div>
    </div>
  );
};

export default ProfileInfo;

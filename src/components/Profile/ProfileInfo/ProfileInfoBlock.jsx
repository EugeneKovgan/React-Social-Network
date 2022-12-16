import styles from "./ProfileInfo.module.css";

const ProfileInfoBlock = ({ profile, activateEditMode, isOwner }) => {
  return (
    <div className={styles.infoblock}>
      <p>{profile.fullName}</p>
      <p>{profile.aboutMe}</p>

      <div className={styles.contacts}>
        {Object.keys(profile.contacts).map((key) => {
          return <Contacts key={key} contactTitle={key} contactInfo={profile.contacts[key]} />;
        })}
      </div>

      <p>Looking for a job: {profile.lookingForAJob ? "yes" : "no"}</p>
      <p>looking for a job description: {profile.lookingForAJobDescription}</p>
      <p>id: {profile.userId}</p>

      {isOwner ? <button onClick={activateEditMode} className={styles.edit_btn}>edit</button> : ""}
    </div>
  );
};

const Contacts = ({ contactTitle, contactInfo }) => {
  return <p> {contactTitle}: {contactInfo}</p>;
};

export default ProfileInfoBlock;
import styles from './ProfileInfo.module.css';
import { ContactType, ProfileType } from '../../../types/types';

type ProfileInfoBlockType = {
  profile: ProfileType;
  activateEditMode: () => void;
  isOwner: boolean;
};

const ProfileInfoBlock: React.FC<ProfileInfoBlockType> = ({ profile, activateEditMode, isOwner }) => {
  return (
    <div className={styles.infoblock}>
      <p>{profile.fullName}</p>
      <p>{profile.aboutMe}</p>

      <div className={styles.contacts}>
        {Object.keys(profile.contacts).map((key) => {
          return <Contacts key={key} contactTitle={key} contactInfo={profile.contacts[key as keyof ContactType]} />;
        })}
      </div>

      <p>Looking for a job: {profile.lookingForAJob ? 'yes' : 'no'}</p>
      <p>looking for a job description: {profile.lookingForAJobDescription}</p>
      <p>id: {profile.userId}</p>

      {isOwner ? (
        <button onClick={activateEditMode} className={styles.edit_btn}>
          edit
        </button>
      ) : (
        ''
      )}
    </div>
  );
};

type ContactsType = {
  contactTitle: string;
  contactInfo: string;
};
const Contacts: React.FC<ContactsType> = ({ contactTitle, contactInfo }) => {
  return (
    <p>
      {' '}
      {contactTitle}: {contactInfo}
    </p>
  );
};

export default ProfileInfoBlock;

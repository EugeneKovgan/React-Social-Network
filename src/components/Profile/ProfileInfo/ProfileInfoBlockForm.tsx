import styles from './ProfileInfo.module.css';
// @ts-ignore
import { Form, Field, InjectedFormProps } from 'react-final-form';
import { Input } from '../../utils/validators';
import { ProfileType } from '../../../types/types';

const reactFinalForm =
  ({ form, ...config }: any) =>
  (component: any) =>
  (props: any) =>
    <Form {...config} {...props} component={component} />;

type PropsType = { profile: ProfileType };

const ProfileInfoBlockForm: React.FC<InjectedFormProps<ProfileType & PropsType> & PropsType> = ({
  handleSubmit,
  profile,
  error,
}) => {
  return (
    <form onSubmit={handleSubmit} className={!error ? styles.infoblock : styles.commonErrors}>
      <Field component={Input} type={'text'} placeholder={'full name'} name={'fullName'} />

      <Field component={Input} type={'text'} name={'aboutMe'} placeholder={'about me'} />

      <div className={styles.contacts}>
        {Object.keys(profile.contacts).map((key) => {
          return <Field component={Input} type={'text'} name={`contacts.${key}`} key={key} placeholder={key} />;
        })}
      </div>

      <p>
        Looking for a job:
        <Field component={'input'} type={'checkbox'} name={'lookingForAJob'} />
      </p>

      <Field
        component={Input}
        type={'text'}
        placeholder={'Looking for a job description'}
        name={'LookingForAJobDescription'}
      />
      <div>{error}</div>
      <button className={styles.edit_btn}>save</button>
    </form>
  );
};

const ProfileInfoBlockReduxForm = reactFinalForm({
  form: 'edit-profile',
})(ProfileInfoBlockForm);

export default ProfileInfoBlockReduxForm;

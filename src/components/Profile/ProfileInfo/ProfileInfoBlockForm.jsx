import styles from "./ProfileInfo.module.css";
import { Field, reduxForm } from "redux-form";
import { Input, requiredField } from "../../utils/validators";

const ProfileInfoBlockForm = ({ handleSubmit, profile, error }) => {
  return (
    <form onSubmit={handleSubmit}
          className={!error ? styles.infoblock : styles.commonErrors}>
      <Field
        component={Input}
        type={"text"}
        placeholder={"full name"}
        name={"fullName"}
      />

      <Field
        component={Input}
        type={"text"}
        name={"aboutMe"}
        placeholder={"about me"}
      />

      <div className={styles.contacts}>
        {Object.keys(profile.contacts).map((key) => {
          return (
            <Field
              component={Input}
              type={"text"}
              name={`contacts.${key}`}
              key={key}
              placeholder={key}
            />);
        })}
      </div>

      <p>Looking for a job:
        <Field
          component={"input"}
          type={"checkbox"}
          name={"lookingForAJob"}
        />
      </p>

      <Field
        component={Input}
        type={"text"}
        placeholder={"Looking for a job description"}
        name={"LookingForAJobDescription"}
      />
      <div>{error}</div>
      <button className={styles.edit_btn}>save</button>
    </form>
  );
};

const ProfileInfoBlockReduxForm = reduxForm({
  // form: "edit-profile", enableReinitialize: true, destroyOnUnmount: false
  form: "edit-profile"
})(ProfileInfoBlockForm);

export default ProfileInfoBlockReduxForm;
import styles from "./ProfileInfo.module.css";
import { Field, reduxForm } from "redux-form";
import { Input } from "../../utils/validators";

const ProfileInfoBlockForm = ({ handleSubmit, profile }) => {
  return (
    <form onSubmit={handleSubmit} className={styles.infoblock}>
      <Field
        component={Input}
        type={"text"}
        placeholder={"full name"}
        name={"fullName"}
        require={require}
      />

      <Field
        component={Input}
        type={"text"}
        name={"aboutMe"}
        placeholder={"about me"}
        require={require}
      />

      <p>Looking for a job:
        <Field
          component={"input"}
          type={"checkbox"}
          name={"lookingForAJob"}
          require={require} />
      </p>

      <Field
        component={Input}
        type={"text"}
        placeholder={"Looking for a job description"}
        name={"LookingForAJobDescription"}
        require={require} />

      <button className={styles.edit_btn}>save</button>
    </form>
  );
};

const ProfileInfoBlockReduxForm = reduxForm({
  // form: "edit-profile", enableReinitialize: true, destroyOnUnmount: false
  form: "edit-profile"
})(ProfileInfoBlockForm);

export default ProfileInfoBlockReduxForm;
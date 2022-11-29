import styles from "./Login.module.css";
import { Field, reduxForm } from "redux-form";

const LoginForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit} className={styles.form}>
      <Field
        component={"input"}
        type={"text"}
        placeholder={"login"}
        name={"login"}
      />
      <Field
        component={"input"}
        type={"text"}
        placeholder={"password"}
        name={"password"}
      />
      <Field component={"input"} type={"checkbox"} name={"rememberMe"} />
      <button>submit</button>
    </form>
  );
};

const LoginReduxForm = reduxForm({
  form: "login",
})(LoginForm);

const Login = (props) => {
  const onSubmit = (formData) => {
    console.log(formData);
  };
  return (
    <div className={styles.formBlock}>
      <LoginReduxForm onSubmit={onSubmit} />
    </div>
  );
};

export default Login;

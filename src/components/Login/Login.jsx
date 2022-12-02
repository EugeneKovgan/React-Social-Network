import styles from "./Login.module.css";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { login } from "../redux/auth-reducer";
import { NavLink } from "react-router-dom";
import { Input } from "../utils/validators";

const LoginForm = (props) => {
  return (
    <form
      onSubmit={props.handleSubmit}
      className={!props.error ? styles.form : styles.commonErrors}
    >
      <Field
        component={Input}
        type={"text"}
        placeholder={"email"}
        name={"email"}
      />
      <Field
        component={Input}
        type={"password"}
        placeholder={"password"}
        name={"password"}
      />

      <Field component={"input"} type={"checkbox"} name={"rememberMe"} />
      <div>{props.error}</div>
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
    props.login(formData.email, formData.password, formData.rememberMe);
  };

  if (props.isAuth) {
    return <NavLink to="/profile" />;
  }

  return (
    <div className={styles.formBlock}>
      <LoginReduxForm onSubmit={onSubmit} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, { login })(Login);

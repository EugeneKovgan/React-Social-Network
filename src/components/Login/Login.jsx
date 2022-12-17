import styles from "./Login.module.css";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { login } from "../redux/auth-reducer";
import { NavLink } from "react-router-dom";
import { Input } from "../utils/validators";

const LoginForm = ({ handleSubmit, error, captchaURL }) => {
  return (
    <form
      onSubmit={handleSubmit}
      className={!error ? styles.form : styles.commonErrors}
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

      <Field component={"input"}
             type={"checkbox"}
             name={"rememberMe"} />

      {captchaURL ? <img src={captchaURL} alt="captcha" /> : ""}
      {captchaURL ? <Field
        component={Input}
        type={"text"}
        placeholder={"symbol from image"}
        name={"captcha"}
      /> : ""}


      <div>{error}</div>
      <button>submit</button>
    </form>
  );
};

const LoginReduxForm = reduxForm({
  form: "login"
})(LoginForm);

const Login = ({ login, isAuth, captchaURL }) => {
  const onSubmit = (formData) => {
    // console.log(formData);
    login(formData.email, formData.password, formData.rememberMe, formData.captcha);
  };

  if (isAuth) {
    return <NavLink to="/profile" />;
  }

  return (
    <div className={styles.formBlock}>
      <LoginReduxForm
        onSubmit={onSubmit}
        captchaURL={captchaURL}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  captchaURL: state.auth.captchaURL,
  isAuth: state.auth.isAuth
});

export default connect(mapStateToProps, { login })(Login);

import styles from './Login.module.css';
// @ts-ignore
import { Form, Field, InjectedFormProps } from 'react-final-form';
import { connect } from 'react-redux';
import { login } from '../redux/auth-reducer';
import { NavLink } from 'react-router-dom';
import { Input } from '../utils/validators';
import { AppStateType } from '../redux/redux-store';
import React from 'react';

const reactFinalForm =
  ({ form, ...config }: any) =>
  (component: any) =>
  (props: any) =>
    <Form {...config} {...props} component={component} />;

type LoginFormOwnProps = { captchaURL: string | null };

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType & LoginFormOwnProps> & LoginFormOwnProps> = ({
  handleSubmit,
  error,
  captchaURL,
}) => {
  return (
    <form onSubmit={handleSubmit} className={!error ? styles.form : styles.commonErrors}>
      <Field component={Input} type={'text'} placeholder={'email'} name={'email'} />
      <Field component={Input} type={'password'} placeholder={'password'} name={'password'} />
      <Field component={'input'} type={'checkbox'} name={'rememberMe'} />
      {captchaURL ? <img src={captchaURL} alt='captcha' /> : ''}
      {captchaURL ? <Field component={Input} type={'text'} placeholder={'symbol from image'} name={'captcha'} /> : ''}

      <div>{error}</div>
      <button>submit</button>
    </form>
  );
};

const LoginReduxForm = reactFinalForm({
  form: 'login',
})(LoginForm);

type MapStateToPropsType = { captchaURL: string | null; isAuth: boolean };
type MapDispatchToPropsType = {
  login: (email: string, password: string, rememberMe: boolean, captcha: string) => void;
};

type LoginFormValuesType = { email: string; password: string; rememberMe: boolean; captcha: string };

const Login: React.FC<MapStateToPropsType & MapDispatchToPropsType> = ({ login, isAuth, captchaURL }) => {
  const onSubmit = (formData: LoginFormValuesType) => {
    login(formData.email, formData.password, formData.rememberMe, formData.captcha);
  };

  if (isAuth) {
    return <NavLink to='/profile' />;
  }

  return (
    <div className={styles.formBlock}>
      <LoginReduxForm onSubmit={onSubmit} captchaURL={captchaURL} />
    </div>
  );
};

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
  captchaURL: state.auth.captchaURL,
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, { login })(Login);

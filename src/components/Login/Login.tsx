import styles from './Login.module.css';
// @ts-ignore
import { Form, Field, InjectedFormProps } from 'react-final-form';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Input } from '../utils/validators';
import { AppDispatch, AppStateType } from '../redux/redux-store';
import React from 'react';
import { login } from '../redux/auth-reducer';

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

type LoginFormValuesType = { email: string; password: string; rememberMe: boolean; captcha: string };

export const LoginPage: React.FC = () => {
  const captchaURL = useSelector((state: AppStateType) => state.auth.captchaURL);
  const isAuth = useSelector((state: AppStateType) => state.auth.isAuth);
  const dispatch: AppDispatch = useDispatch();

  const onSubmit = (formData: LoginFormValuesType) => {
    dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha));
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

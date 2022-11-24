import { Component } from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import { setAuthUserData } from '../redux/auth-reducer';
import { userAPI } from '../../api/api';

class HeaderContainer extends Component {
  componentDidMount() {
    console.log('HeaderContainer_componentDidMount');
    userAPI.getAuthMe().then((response) => {
      if (response.resultCode === 0) {
        let { id, login, email } = response.data;
        this.props.setAuthUserData(id, email, login);
        // console.log(`id=${id}`);
      }
    });
  }

  render() {
    return <Header {...this.props} />;
  }
}

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  login: state.auth.login,
});

export default connect(mapStateToProps, { setAuthUserData })(HeaderContainer);

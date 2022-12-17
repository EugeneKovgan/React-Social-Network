import styles from "./ProfileInfo.module.css";
import { Component, createRef } from "react";

class ProfileStatus extends Component {
  state = {
    editMode: false,
    status: this.props.status,
  };

  activateEditMode = () => {
    this.setState({
      editMode: true,
    });
  };

  deActivateEditMode = () => {
    this.setState({
      editMode: false,
    });
    this.props.updateStatus(this.state.status);
  };

  onStatusChange = (e) => {
    this.setState({ status: e.currentTarget.value });
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("ProfileStatus_componentDidUpdate");
    if (prevProps.status !== this.props.status) {
      this.setState({ status: this.props.status });
    }
  }

  render() {
    console.log("ProfileStatus_render");
    return (
      <div className={styles.ProfileInfo}>
        <div className={styles.statusBlock}>
          {!this.state.editMode === true ? (
            <p onDoubleClick={this.activateEditMode}>
              {this.props.status || "no status"}
            </p>
          ) : (
            <input
              onChange={this.onStatusChange}
              autoFocus={true}
              onBlur={this.deActivateEditMode}
              value={this.state.status}
            />
          )}
        </div>
      </div>
    );
  }
}

export default ProfileStatus;

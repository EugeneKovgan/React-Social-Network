import styles from "./ProfileInfo.module.css";
import { Component } from "react";

class ProfileStatus extends Component {
  state = {
    editMode: false,
  };

  activateEditMode() {
    this.setState({
      editMode: true,
    });
  }

  deActivateEditMode() {
    this.setState({
      editMode: false,
    });
  }

  render() {
    return (
      <div className={styles.ProfileInfo}>
        <div className={styles.statusBlock}>
          {!this.state.editMode === true ? (
            <p onDoubleClick={this.activateEditMode.bind(this)}>
              {this.props.status}
            </p>
          ) : (
            <input
              autoFocus={true}
              onBlur={this.deActivateEditMode.bind(this)}
              value={this.props.status}
            />
          )}
        </div>
      </div>
    );
  }
}

export default ProfileStatus;

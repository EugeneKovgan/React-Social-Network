// @ts-ignore
import styles from './ProfileInfo.module.css';
import { ChangeEvent, Component, createRef } from 'react';

type PropsType = { status: string; updateStatus: (newStatus: string) => void };
type StateType = { editMode: boolean; status: string };

class ProfileStatus extends Component<PropsType, StateType> {
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

  onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ status: e.currentTarget.value });
  };

  componentDidUpdate(prevProps: PropsType, prevState: StateType) {
    console.log('ProfileStatus_componentDidUpdate');
    if (prevProps.status !== this.props.status) {
      this.setState({ status: this.props.status });
    }
  }

  render() {
    console.log('ProfileStatus_render');
    return (
      <div className={styles.ProfileInfo}>
        <div className={styles.statusBlock}>
          {!this.state.editMode === true ? (
            <p onDoubleClick={this.activateEditMode}>{this.props.status || 'no status'}</p>
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

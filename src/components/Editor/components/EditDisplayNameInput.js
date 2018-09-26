import React from "react";
import "../../../styles/Login.css";

/**-------Props-------
 */

//TODO editUserData: restyle the input and document the props
class EditDisplayNameInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.initialValue,
      waiting: false,
      submitting: false,
    };
  }

  onSubmit = e => {
    e.preventDefault();
    if (this.state.value <= 1 || this.state.value >= 20) {
      //set error message in profile panel
      return;
    }
    this.props.submitEdit(this.state.value);
  };

  onChange = value => this.setState({ value });

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input
            className="login-form-input"
            disabled={this.state.waiting}
            placeholder="Display Name"
            value={this.state.value}
            onChange={e => this.onChange(e.target.value)}
          />
          <br />
        </form>
      </div>
    );
  }
}

export default EditDisplayNameInput;

import React from "react";
import defaultPic from "../../../img/defaultProfile.png";
import firebase from "firebase";
import Filter from "../../../../node_modules/bad-words/lib/badwords.js";

/**--------Props--------
 * handleOnSizeChange: function to be called when the panel is resized
 * handleOnVisibleChange: function to be called when the panel is collapsed or opened
 * panelVisible: boolean to determine if the panel should be open or not
 * size: number? representing the pixel width of the panel
 */

const filter = new Filter();

class ProfilePanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prevWidth: 0,
      width: this.props.width,
      isHovering: false,
      editing: false,
      name: "",
    };
  }

  componentDidUpdate() {}

  handleEditClick = () => {
    this.setState(prevState => {
      return { editing: true };
    });
  };

  onChange = e => {
    this.setState({ name: e.target.value });
  };

  checkInputs = () => {
    const name = this.state.name;
    if (filter.isProfane(name)) {
      return true;
    }
  };

  onSubmit = e => {
    e.preventDefault();
    let badInputs = this.checkInputs();

    if (badInputs) {
      this.setState({ name: "", isHovering: true, editing: false });
    }
  };

  renderMainContent = () => (
    <div className="panel">
      <div className="panel-collapse-button">
        <div />
        <div onClick={this.props.handleOnVisibleChange}>&larr;</div>{" "}
        {/*character is leftward facing arrow*/}
      </div>
      <div className="panel-content">
        <img
          className="panel-image"
          src={this.props.photoURL ? this.props.photoURL + "?height=800" : defaultPic}
          alt="Your profile"
        />{" "}
        {/*if there's a photourl, use it, otherwise use the default image (the ?height=500 to make sure the picture sent is resized to 500px tall*/}
        <div className="name-container">
          {!this.state.editing && (
            <div
              className="panel-name"
              onMouseEnter={() => this.setState({ isHovering: true })}
              onMouseLeave={() => this.setState({ isHovering: false })}
            >
              {this.props.displayName || "Joe Bruin"}{" "}
              {this.state.isHovering && <button onClick={this.handleEditClick} />}
            </div>
          )}
          {this.state.editing && (
            <form onMouseLeave={this.handleMouseHover} onSubmit={this.onSubmit}>
              <input
                className="panel-edit"
                placeHolder={this.props.displayName}
                onChange={this.onChange}
                onSubmit={this.onSubmit}
                value={this.state.name}
              />
            </form>
          )}{" "}
        </div>
        {/*if there's no displayName, use the default name "Joe Bruin"*/}
        <div className="panel-options">
          <ul className="panel-options-list">
            <li className="panel-options-item">Profile</li> {/** @todo relocate to Profile page*/}
            <li className="panel-options-item">Sketches</li> {/** @todo relocate to sketches page*/}
            <li className="panel-options-item" onClick={() => firebase.auth().signOut()}>
              Sign Out
            </li>
          </ul>
        </div>
      </div>
      <div className="editor-footer">
        <img className="editor-footer-image" src="img/tla-footer.png" alt="footer" />
      </div>
    </div>
  );

  render() {
    const { panelStyle } = this.props;

    return <div style={panelStyle}>{this.renderMainContent()}</div>;
  }
}

export default ProfilePanel;

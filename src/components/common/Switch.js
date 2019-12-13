import React from "react";

import "styles/Switch.scss";

/**
 * Generic switch component. Props are as follows:
 * @param {boolean} [on] - whether the switch is set to the "on" position or not; optional prop, defaults to false
 * @param {function} onToggle - function to be called when switch is toggled. Has a single parameter (bool) that holds whether the switch is in the "on" position (true) or not (false)
 * @param {JSX} onImg (optional): (JSX) element to be displayed on switch body when set to "on"
 * @param {JSX} offImg (optional): (JSX) element to be displayed on switch body when set to "off"
 */
export default class Switch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      on: !this.props.on ? false : this.props.on,
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.on !== prevProps.on) {
      this.setState({
        on: this.props.on,
      });
    }
  }

  onSwitchChange = () => {
    this.props.onToggle(!this.state.on);
    this.setState({
      on: !this.state.on,
    });
  };

  render() {
    let switchedClass = this.state.on ? " switch-on" : "";

    return (
      <label className="switch">
        <input className="switch-input" type="checkbox" onChange={this.onSwitchChange} />
        <span className={"switch-body" + switchedClass}>
          {this.state.on ? this.props.onImg : this.props.offImg}
        </span>
        <span className={"switch-handle" + switchedClass}></span>
      </label>
    );
  }
}

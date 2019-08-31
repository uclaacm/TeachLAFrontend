import React from "react";
import "../../../styles/Classes.css";

/**-------Props-------
 * waiting: boolean that greys out the button if there is no input
 * data: value inside the input
 * onChange: function to call when there is new input
 */

export default ({ waiting, data, onChange }) => {
  let button = waiting ? (
    <button className="join-class-button" disabled>
      Join
    </button>
  ) : (
    <button className="join-class-button">Join</button>
  );

  return (
    <div className="join-class">
      <div className="join-class-text">Join a class:</div>
      <input
        className="join-class-input"
        placeholder="EnterClassCode"
        value={data}
        onChange={e => onChange(e.target.value)}
        spellcheck="false"
      />
      {button}
    </div>
  );
};

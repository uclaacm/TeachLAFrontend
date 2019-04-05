import React from "react";
import { CODE_AND_OUTPUT, CODE_ONLY, OUTPUT_ONLY } from "../constants";
import Radio from "../../common/Radio.js";

/**-------Props--------
 * runCode: function to be called when button is pressed
 */
const EditorRadio = props => {
  let options = [];
  if (!props.isSmall) options.push({ display: "Both", value: CODE_AND_OUTPUT });
  options = options.concat([
    { display: "Code", value: CODE_ONLY },
    { display: "Output", value: OUTPUT_ONLY },
  ]);

  return (
    <Radio
      options={options}
      defaultSelected={props.viewMode}
      containerStyle={{ height: "40px" }}
      handleClick={props.updateViewMode}
    />
  );
};

export default EditorRadio;

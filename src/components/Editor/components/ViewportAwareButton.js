import React from "react";
import { Button } from "reactstrap";

/**-------Props--------
 * isSmall: dictates display of anything marked with className '.viewport-aware'
 * ...    : any props you would pass to a reactstrap button
 */
const ViewportAwareButton = props => {
  // eliminate viewport aware children if small.
  let { children, ...remainder } = props;
  if (props.isSmall)
    children = Array.from(props.children).filter(
      child => !child.props.className.split(" ").includes("viewport-aware"),
    );

  return <Button children={children} {...remainder} />;
};

export default ViewportAwareButton;

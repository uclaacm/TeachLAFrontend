import React from "react";
import TLAFooter from "../../img/tla-footer.png";

// const styles = {
//   container: {
//     position:"absolute",
//     bottom:"0px",
//     width:"100%",
//     bottom:"0px",
//     height: "10vh",                             /*calc used to do arithmetic*/
//     backgroundColor: "#473d5d",
//     textAlign:"center",
//     alignItems: "center",
//   },
//   image: {
//     height: "100%",
//   }
// }

export default props => (
  <div className="login-footer">
    <img className="login-footer-image" src={TLAFooter} alt="TEACH LA" />
  </div>
);

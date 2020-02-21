import React from "react";
import { RingLoader } from "react-spinners";
import "styles/Loading.scss";
import { GH_REPO_NAME } from "../constants";

/*
	Props:
		bgColor: string representing the color of the background of the img (can be hex color, rgb(r, g, b, a), or color name)
		textColor: string representing the color of the text in the button (can be hex color, rgb(r, g, b, a), or color name)
		imgSrc: string representing the location of the img used as the icon (can be in the form of URL, path location, or data representing image)
		textPadding: string representing padding to the left of the text, i.e. distance from the img (give px units)
*/

class Loading extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showText: false,
      timer: 0,
    };
  }
  componentDidMount = () => {
    this.setState.timer = setTimeout(() => {
      this.setState({ showText: true });
    }, 2000);
  };

  componentWillUnmount = () => {
    clearTimeout(this.setState.timer);
  };

  render = () => {
    return (
      <div className="Loading">
        <div className="Loading-title">Loading</div>
        <RingLoader color={"#171124"} size={250} loading={true} />
        {this.state.showText && (
          <p className="Loading-page-text" style={{ color: "white" }}>
            Looks like loading is taking a bit long! If it takes too long, submit an issue on{" "}
            <span> </span>
            <a href={`${GH_REPO_NAME}/issues`} className="Loading-link-text">
              Github
            </a>
            .
          </p>
        )}
      </div>
    );
  };
}

export default Loading;

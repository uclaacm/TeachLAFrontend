import React from "react";
import { RingLoader } from "react-spinners";
import "styles/Loading.scss";

/*
	Props:
		bgColor: string representing the color of the background of the img (can be hex color, rgb(r, g, b, a), or color name)
		textColor: string representing the color of the text in the button (can be hex color, rgb(r, g, b, a), or color name)
		imgSrc: string representing the location of the img used as the icon (can be in the form of URL, path location, or data representing image)
		textPadding: string representing padding to the left of the text, i.e. distance from the img (give px units)
*/

class LoadText extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showText: false };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ showText: true });
    }, 2000);
  }

  render() {
    return (
      <div>
        <h1>
          Looks like loading is taking a bit long! If it takes too long, submit an issue on{" "}
          <a href="https://github.com/uclaacm/TeachLAFrontend/issues">github</a>.
        </h1>
      </div>
    );
  }
}

const Loading = props => (
  <div className="Loading">
    <div className="Loading-title">Loading</div>
    <RingLoader color={"#171124"} size={250} loading={true} />
  </div>
);

export default Loading;

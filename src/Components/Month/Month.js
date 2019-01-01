import React from "react";
import PropTypes from "prop-types";
import { CssConnector, PropsConnector } from "Containers/Provider";
import dark from "./Month.style.dark";
import light from "./Month.style.light";

class Month extends React.Component {
  constructor(props) {
    super(props);
    this.style = props.theme == "light" ? light : dark;
  }

  componentDidMount() {}

  render() {
    const { month, cssObject } = this.props;
    return (
      <div className={this.style.Month} style={cssObject}>
        {month}
      </div>
    );
  }
}

Month.defaultProps = {};

Month.propTypes = {
  month: PropTypes.string.isRequired,
  cssObject: PropTypes.object,
  theme: PropTypes.string
};

export default PropsConnector(({ state }) => ({
  theme: state.theme
}))(
  CssConnector(({ state }) => ({
    cssObject: state.MonthCssObject
  }))(Month)
);

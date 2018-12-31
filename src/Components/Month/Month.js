import React from "react";
import PropTypes from "prop-types";
import { CssConnector } from "../../Containers/Provider";
import style from "./Month.style.less";

class Month extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    const { month, cssObject } = this.props;
    return (
      <div className={style.Month} style={cssObject}>
        {month}
      </div>
    );
  }
}

Month.defaultProps = {};

Month.propTypes = {
  month: PropTypes.string.isRequired,
  cssObject: PropTypes.object
};

export default CssConnector(({ state }) => ({
  cssObject: state.MonthCssObject
}))(Month);

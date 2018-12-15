import React from "react";
import PropTypes from "prop-types";
import "./MonthArrow.style";

class MonthArrow extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    const { type } = this.props;
    return <div className="MonthArrow">{type === "left" ? "❮" : "❯"}</div>;
  }
}

MonthArrow.defaultProps = {};

MonthArrow.propTypes = {
  type: PropTypes.oneOf(["left", "right"])
};

export default MonthArrow;

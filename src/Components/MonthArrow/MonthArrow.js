import React from "react";
import PropTypes from "prop-types";
import "./MonthArrow.style";

class MonthArrow extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { type, onClick } = this.props;
    return (
      <div className="MonthArrow" onClick={onClick}>
        {type === "left" ? "❮" : "❯"}
      </div>
    );
  }
}

MonthArrow.propTypes = {
  type: PropTypes.oneOf(["left", "right"]).isRequired,
  onClick: PropTypes.func.isRequired
};

export default MonthArrow;

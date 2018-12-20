import React from "react";
import PropTypes from "prop-types";
import style from "./MonthArrow.style";

class MonthArrow extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { type, onClick } = this.props;
    return (
      <div className={style.MonthArrow} onClick={onClick}>
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

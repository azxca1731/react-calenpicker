// Demo component
// this is only example component

import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./MyComponent.style.scss";
const cx = classNames.bind(styles);

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    const { name } = this.props;
    return (
      <div className={cx("myComponent")}>
        <i className="icon-test">One</i>
        <br />
        <i className="icon-test">Two</i>
        <br />
        <i className="icon-test">Three</i>
        <div className="name-holder">My name is - {name}</div>
      </div>
    );
  }
}

MyComponent.propTypes = {
  name: PropTypes.string
};

export default MyComponent;

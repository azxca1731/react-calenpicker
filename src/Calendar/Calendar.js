import React from "react";
import PropTypes from "prop-types";
import "./Calendar.style";

import Template from "../Components/Template";
import CalendarHead from "../Containers/CalendarHead";
import CalendarBody from "../Containers/CalendarBody";
import { DateProvider } from "../Containers/DateProvider";

const AppProvider = props => {
  const { contexts, children, ...otherOption } = props;
  const showOption = {};
  Object.keys(otherOption)
    .filter(item => item.indexOf("show") === 0)
    .map(item => (showOption[item] = otherOption[item]));

  return contexts.reduce(
    (prev, context) => React.createElement(context, showOption, prev),
    children
  );
};

class Calendar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { props } = this;
    return (
      <AppProvider contexts={[DateProvider]} {...props}>
        <Template head={<CalendarHead />}>
          <CalendarBody />
        </Template>
      </AppProvider>
    );
  }
}

Calendar.defaultProps = {
  showonlythismonth: false
};

Calendar.propTypes = {
  showonlythismonth: PropTypes.bool
};

export default Calendar;

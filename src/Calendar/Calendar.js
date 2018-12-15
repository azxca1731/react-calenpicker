import React from "react";
import PropTypes from "prop-types";
import "./Calendar.style";

import Template from "../Components/Template";
import CalendarHead from "../Containers/CalendarHead";
import CalendarBody from "../Containers/CalendarBody";
import { DateProvider } from "../Containers/DateProvider";

const AppProvider = ({ contexts, children }) =>
  contexts.reduce(
    (prev, context) =>
      React.createElement(context, {
        children: prev
      }),
    children
  );

class Calendar extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <AppProvider contexts={[DateProvider]}>
        <Template head={<CalendarHead />}>
          <CalendarBody />
        </Template>
      </AppProvider>
    );
  }
}

Calendar.defaultProps = {
  name: "Default"
};

Calendar.propTypes = {
  name: PropTypes.string
};

export default Calendar;

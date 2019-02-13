import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import WeekDayContainer from "Containers/WeekDayContainer";
import WeekContainer from "Containers/WeekContainer";
import { DayConnector, PropsConnector, CssConnector } from "Containers/Provider";

const CalendarBodyDiv = styled.div`
  width: 87%;
  padding: 0px 20px;
  height: 80%;
  border-top: 0px;
`;

const CalendarBodyTable = styled.table`
  width: 100%;
  height: 100%;
`;

const CalendarBodyTbody = styled.tbody`
  width: 100%;
  height: 85%;
  display: block;
`;

class CalendarBody extends React.Component {
  constructor(props) {
    super(props);
    const { setDateObjectArray, duplicated, month, calculateMonth } = props;
    setDateObjectArray(calculateMonth(month, duplicated), duplicated);
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.month !== this.props.month) return true;
    else return false;
  }

  render() {
    const { cssObject } = this.props;

    return (
      <CalendarBodyDiv style={cssObject}>
        <CalendarBodyTable>
          <WeekDayContainer />
          <CalendarBodyTbody>
            <WeekContainer weekNumber={0} />
            <WeekContainer weekNumber={1} />
            <WeekContainer weekNumber={2} />
            <WeekContainer weekNumber={3} />
            <WeekContainer weekNumber={4} />
            <WeekContainer weekNumber={5} />
          </CalendarBodyTbody>
        </CalendarBodyTable>
      </CalendarBodyDiv>
    );
  }
}

CalendarBody.propTypes = {
  month: PropTypes.string.isRequired,
  setDateObjectArray: PropTypes.func.isRequired,
  duplicated: PropTypes.bool,
  cssObject: PropTypes.object,
  calculateMonth: PropTypes.func
};

export default PropsConnector(({ state }) => ({
  duplicated: state.duplicated
}))(
  DayConnector(({ state, actions }) => ({
    month: `${state.year}-${state.month + 1}`,
    setDateObjectArray: actions.setDateObjectArray,
    calculateMonth: actions.calculateMonth
  }))(
    CssConnector(({ state }) => ({
      cssObject: state.CalendarBodyCssObject
    }))(CalendarBody)
  )
);

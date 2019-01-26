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
    const { setDateObjectArray, duplicated } = props;
    setDateObjectArray(this.calculateMonth(), duplicated);
  }

  componentDidUpdate(prevProps) {
    const { setDateObjectArray, duplicated } = prevProps;
    setDateObjectArray(this.calculateMonth(), duplicated);
  }

  calculateMonth = () => {
    const { duplicated } = this.props;
    const propMonth = new Date(this.props.month);
    const month = duplicated
      ? new Date(propMonth.getFullYear(), propMonth.getMonth() + 1, 1)
      : new Date(propMonth.getFullYear(), propMonth.getMonth(), 1);
    const today = month;
    const currentMonthFirstDay = new Date(today.getFullYear(), today.getMonth());
    const previousMonthLastDay = new Date(today.getFullYear(), today.getMonth(), 0);
    const currentMonthLastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 2, 0);
    const dateObjectArray = [];
    let count = 0;

    for (let i = 1; i <= currentMonthFirstDay.getDay(); i++) {
      dateObjectArray.push({
        dayNumber: previousMonthLastDay.getDate() - currentMonthFirstDay.getDay() + i,
        dateString: `${previousMonthLastDay.getFullYear()}-${previousMonthLastDay.getMonth() + 1}-${previousMonthLastDay.getDate() -
          currentMonthFirstDay.getDay() +
          i}`,
        text: ""
      });
      count++;
    }

    for (let i = 1; i <= currentMonthLastDay.getDate(); i++) {
      dateObjectArray.push({
        dayNumber: i,
        dateString: `${month.getFullYear()}-${month.getMonth() + 1}-${i}`,
        text: "",
        isInThisMonth: true
      });
      count++;
    }

    for (let i = 1; count < 42; i++) {
      dateObjectArray.push({
        dayNumber: i,
        dateString: `${nextMonth.getFullYear()}-${nextMonth.getMonth() + 1}-${i}`,
        text: ""
      });
      count++;
    }

    return dateObjectArray;
  };

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
  theme: PropTypes.string
};

export default PropsConnector(({ state }) => ({
  duplicated: state.duplicated,
  theme: state.theme
}))(
  DayConnector(({ state, actions }) => ({
    month: `${state.year}-${state.month + 1}`,
    setDateObjectArray: actions.setDateObjectArray
  }))(
    CssConnector(({ state }) => ({
      cssObject: state.CalendarBodyCssObject
    }))(CalendarBody)
  )
);

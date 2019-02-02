import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import MonthContainer from "Containers/MonthContainer";
import MonthArrowContainer from "Containers/MonthArrowContainer";
import { DayConnector, PropsConnector, CssConnector } from "Containers/Provider";

const CalendarHeadDiv = styled.div`
  width: 87%;
  padding: 0px 20px;
  height: 20%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CalendarDateInputModal = styled.div`
  position: absolute;
  z-index: 1000;
  width: 200px;
  height: 200px;
  color: #000000;
  border: 1px solid #efefef;
  background-color: #ffffff;
  top: 20px;
  left: 20px;
`;

class CalendarHead extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "",
      text: "",
      isHoliday: true,
      modalshow: false
    };
  }

  handleInputDateChange = event => {
    this.setState({
      date: event.target.value
    });
  };

  handleInputTextChange = event => {
    this.setState({
      text: event.target.value
    });
  };

  handleInputIsHoliday = event => {
    this.setState({
      isHoliday: event.target.checked
    });
  };

  handleModal = addCalendarText => {
    const { isHoliday, date, text } = this.state;
    return (
      <CalendarDateInputModal>
        <input value={date} onChange={this.handleInputDateChange} />
        <input value={text} onChange={this.handleInputTextChange} />
        <input type="checkbox" checked={isHoliday} onChange={this.handleInputIsHoliday} />
        <button
          onClick={() => {
            addCalendarText({ text, date, isHoliday });
            this.setState({
              text: "",
              date: "",
              isHoliday: false,
              modalshow: false
            });
          }}
        >
          추가
        </button>
      </CalendarDateInputModal>
    );
  };

  render() {
    const { month: propsMonth, duplicated, duplicate, showNextMonth, showPreviousMonth, addCalendarText } = this.props;

    let month;
    if (duplicated) {
      month = new Date(propsMonth);
      month = new Date(month.getFullYear(), month.getMonth() + 1, 1);
      month = `${month.getFullYear()}.${month.getMonth() + 1}`;
    } else {
      month = propsMonth;
    }
    return (
      <div>
        {!duplicate ? (
          <CalendarHeadDiv>
            <MonthArrowContainer type="left" onClick={showPreviousMonth} />
            <MonthContainer month={month} />
            <div onClick={() => this.setState({ modalshow: true })}>+</div>
            {this.state.modalshow ? this.handleModal(addCalendarText) : null}
            <MonthArrowContainer type="right" onClick={showNextMonth} />
          </CalendarHeadDiv>
        ) : !duplicated ? (
          <CalendarHeadDiv>
            <MonthArrowContainer type="left" onClick={showPreviousMonth} />
            <MonthContainer month={month} />
            <MonthArrowContainer type="none" onClick={() => {}} />
          </CalendarHeadDiv>
        ) : (
          <CalendarHeadDiv>
            <MonthArrowContainer type="none" onClick={() => {}} />
            <MonthContainer month={month} />
            <MonthArrowContainer type="right" onClick={showNextMonth} />
          </CalendarHeadDiv>
        )}
      </div>
    );
  }
}

CalendarHead.propTypes = {
  month: PropTypes.string.isRequired,
  showNextMonth: PropTypes.func.isRequired,
  showPreviousMonth: PropTypes.func.isRequired,
  duplicated: PropTypes.bool,
  duplicate: PropTypes.bool,
  cssObject: PropTypes.object,
  theme: PropTypes.string,
  addCalendarText: PropTypes.func
};

export default PropsConnector(({ state, actions }) => ({
  duplicated: state.duplicated,
  duplicate: state.duplicate,
  theme: state.theme,
  addCalendarText: actions.addCalendarText
}))(
  DayConnector(({ state, actions }) => ({
    month: `${state.year}.${state.month + 1}`,
    showPreviousMonth: actions.decreaseMonth,
    showNextMonth: actions.increaseMonth
  }))(
    CssConnector(({ state }) => ({
      cssObject: state.CalendarHeadCssObject
    }))(CalendarHead)
  )
);

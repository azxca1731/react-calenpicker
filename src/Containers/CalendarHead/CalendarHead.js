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
  position: relative;
`;

const CalendarDateInputModal = styled.div`
  position: absolute;
  z-index: 1000;
  width: calc(100%);
  color: #000000;
  border: 1px solid #000000;
  background-color: #ffffff;
  top: 0px;
  left: 0px;
`;

const CalendarDateInputModalHead = styled.div`
  padding: 20px;
  border-bottom: 1px solid #000000;
`;

const CalendarDateInputModalFooter = styled.div`
  padding: 20px;
  border-top: 1px solid #000000;
`;

const CalendarDateInputModalBody = styled.div`
  padding: 20px;
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
        <CalendarDateInputModalHead>날짜 추가</CalendarDateInputModalHead>
        <CalendarDateInputModalBody>
          <label htmlFor="date">날짜: </label>
          <input id="date" value={date} onChange={this.handleInputDateChange} placeholder="2019-12-10" />
          <br />
          <label htmlFor="text">이름: </label>
          <input id="text" value={text} onChange={this.handleInputTextChange} placeholder="휴가" />
          <br />
          <label htmlFor="isHoliday">휴일 여부: </label>
          <input id="isHoliday" type="checkbox" checked={isHoliday} onChange={this.handleInputIsHoliday} />
        </CalendarDateInputModalBody>
        <CalendarDateInputModalFooter>
          <button
            onClick={() => {
              addCalendarText({ text, date, isHoliday });
              this.setState({
                text: "",
                date: "",
                isHoliday: true,
                modalshow: false
              });
            }}
          >
            추가
          </button>
          <button
            onClick={() => {
              this.setState({
                text: "",
                date: "",
                isHoliday: true,
                modalshow: false
              });
            }}
          >
            닫기
          </button>
        </CalendarDateInputModalFooter>
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

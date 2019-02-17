import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import ArrowUp from "Styles/icons/ArrowUp";
import ArrowDoubleUp from "Styles/icons/ArrowDoubleUp";
import ArrowDown from "Styles/icons/ArrowDown";
import Modify from "Styles/icons/Modify";
import Close from "Styles/icons/Close";

const DateCardDiv = styled.div`
  width: 100%;
  border: 1px solid ${props => props.theme.fontColor};
  height: ${props => (props.open ? props.height + 100 : props.height)}px;
  border-radius: 5px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  margin: 10px 0px;
  background-color: ${props => props.theme.backgroundColor};
  color: ${props => props.theme.fontColor};
  transition: all 0.3s ease-out;
`;

const DateCardConfig = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding-top: ${props => props.height * 0.1}px;
  padding-right: 10px;
  margin: 4px 0px;
`;

const DateCardText = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0px 10px;
  margin-top: 5px;
`;

const DateCardBody = styled.div`
  font-weight: bold;
  color: ${props => (props.isHoliday ? "red" : props.theme.fontColor)};
`;

const ModifyCollapse = styled.form`
  max-height: ${props => (props.open ? "100px" : "0")};
  overflow: hidden;
  padding: 0px 30px;
  transition: all 0.3s ease-out;
`;

const CalendarDateInputModalButton = styled.button`
  background-color: ${props => (props.isAccept ? props.theme.acceptColor : props.isDelete ? "red" : props.theme.cancelColor)};
  color: ${props => props.theme.backgroundColor};
  border: 2px solid ${props => props.theme.fontColor};
  padding: 0.5em 1em;
  opacity: 0.7;
  transition: 0.5s;
  cursor: pointer;
  position: relative;
  top: -5px;
  right: 5px;

  &:hover {
    opacity: 1;
  }
`;

const ModifyCollapseWithButton = styled.div`
  display: flex;
  justify-content: space-between;
`;

class DateCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      collapseOpen: false,
      date: props.date,
      text: props.text,
      isHoliday: props.isHoliday
    };

    this.form = React.createRef();
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

  modifySchedule = () => {
    const { index, handleModify } = this.props;
    const { date, isHoliday, text } = this.state;
    if (this.form.current.reportValidity()) {
      handleModify(index - 1, { date, text, isHoliday });
    }
  };

  render() {
    const { height, index, dateLength, handleDelete, handleDown, handleFirst, handleUp, type } = this.props;
    const { collapseOpen, isHoliday, text, date } = this.state;
    return (
      <DateCardDiv height={height} open={collapseOpen}>
        <DateCardText>
          <DateCardBody isHoliday={isHoliday}>{text}</DateCardBody>
          <div>
            {index}/{dateLength}
          </div>
        </DateCardText>
        {type == "UPDATE" ? (
          <DateCardConfig height={height}>
            <ArrowDoubleUp onClick={handleFirst} />
            <ArrowUp onClick={handleUp} />
            <ArrowDown onClick={handleDown} />
            <Modify onClick={() => this.setState({ collapseOpen: !this.state.collapseOpen })} />
            <Close onClick={handleDelete} />
          </DateCardConfig>
        ) : null}
        <ModifyCollapse open={collapseOpen} ref={this.form} onSubmit={e => e.preventDefault()}>
          <div>
            <label htmlFor="date">날짜: </label>
            <input id="date" value={date} onChange={this.handleInputDateChange} placeholder="날짜를 입력하세요" type="text" pattern="[0-9]{4}-[0-1]{0,1}[0-9]{1}-[0-9]{2}" />
          </div>
          <br />
          <div>
            <label htmlFor="text">이름: </label>
            <input id="text" value={text} onChange={this.handleInputTextChange} placeholder="이벤트의 이름을 입력하세요" required />
          </div>
          <br />
          <ModifyCollapseWithButton>
            <div>
              <label htmlFor="isHoliday">휴일 여부: </label>
              <input id="isHoliday" type="checkbox" checked={isHoliday} onChange={this.handleInputIsHoliday} />
            </div>
            <CalendarDateInputModalButton isAccept onClick={this.modifySchedule}>
              수정
            </CalendarDateInputModalButton>
          </ModifyCollapseWithButton>
        </ModifyCollapse>
      </DateCardDiv>
    );
  }
}

DateCard.defaultProps = {
  text: "",
  height: 100,
  isHoliday: false,
  index: 1,
  dateLength: 1,
  date: "",
  handleDelete: () => {},
  handleUp: () => {},
  handleDown: () => {},
  handleFirst: () => {},
  handleModify: () => {},
  type: "UPDATE"
};

DateCard.propTypes = {
  text: PropTypes.string,
  height: PropTypes.number,
  date: PropTypes.string,
  isHoliday: PropTypes.bool,
  index: PropTypes.number,
  dateLength: PropTypes.number,
  handleDelete: PropTypes.func,
  handleUp: PropTypes.func,
  handleDown: PropTypes.func,
  handleFirst: PropTypes.func,
  handleModify: PropTypes.func,
  type: PropTypes.oneOf(["READ", "UPDATE"])
};

export default DateCard;

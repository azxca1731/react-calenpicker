import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const CalendarDateInputModalDiv = styled.div`
  position: absolute;
  z-index: 1000;
  width: calc(100% - 3px);
  color: ${props => props.theme.fontColor};
  border: 1px solid ${props => props.theme.fontColor};
  background-color: ${props => props.theme.backgroundColor};
  top: 0px;
  left: 0px;
`;

const CalendarDateInputModalHead = styled.div`
  padding: 20px;
  border-bottom: 1px solid ${props => props.theme.fontColor};
`;

const CalendarDateInputModalFooter = styled.div`
  padding: 20px;
  border-top: 1px solid ${props => props.theme.fontColor};
  text-align: center;
`;

const CalendarDateInputModalBody = styled.div`
  padding: 40px 20px;
  text-align: center;
`;

const CalendarDateInputModalButton = styled.button`
  background-color: ${props => (props.isAccept ? props.theme.acceptColor : props.theme.cancelColor)};
  color: ${props => props.theme.backgroundColor};
  border: 2px solid ${props => props.theme.fontColor};
  margin: 0px 5px;
  padding: 0.5em 1em;
  opacity: 0.7;
  transition: 0.5s;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }
`;

class CalendarDateInputModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "",
      text: "",
      isHoliday: true
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

  render() {
    const { addCalendarText, handleModal } = this.props;
    const { isHoliday, date, text } = this.state;
    return (
      <CalendarDateInputModalDiv>
        <CalendarDateInputModalHead>날짜 추가</CalendarDateInputModalHead>
        <CalendarDateInputModalBody>
          <label htmlFor="date">날짜: </label>
          <input id="date" value={date} onChange={this.handleInputDateChange} placeholder="2019-12-10" />
          <br />
          <br />
          <label htmlFor="text">이름: </label>
          <input id="text" value={text} onChange={this.handleInputTextChange} placeholder="휴가" />
          <br />
          <br />
          <label htmlFor="isHoliday">휴일 여부: </label>
          <input id="isHoliday" type="checkbox" checked={isHoliday} onChange={this.handleInputIsHoliday} />
          <br />
        </CalendarDateInputModalBody>
        <CalendarDateInputModalFooter>
          <CalendarDateInputModalButton
            isAccept
            onClick={() => {
              addCalendarText({ text, date, isHoliday });
              this.setState({
                text: "",
                date: "",
                isHoliday: true
              });
              handleModal(false);
            }}
          >
            추가
          </CalendarDateInputModalButton>
          <CalendarDateInputModalButton
            onClick={() => {
              this.setState({
                text: "",
                date: "",
                isHoliday: true
              });
              handleModal(false);
            }}
          >
            닫기
          </CalendarDateInputModalButton>
        </CalendarDateInputModalFooter>
      </CalendarDateInputModalDiv>
    );
  }
}

CalendarDateInputModal.defaultProps = {
  addCalendarText: () => {},
  handleModal: () => {}
};

CalendarDateInputModal.propTypes = {
  addCalendarText: PropTypes.func,
  handleModal: PropTypes.func
};

export default CalendarDateInputModal;

import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const CalendarDateInputModalDiv = styled.div`
  position: absolute;
  z-index: 1000;
  color: ${props => props.theme.fontColor};
  border: 1px solid ${props => props.theme.fontColor};
  background-color: ${props => props.theme.backgroundColor};
  top: -1px;
  left: 0px;
`;

const CalendarDateInputModalHead = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid ${props => props.theme.fontColor};
  height: ${props => props.size.height.substr(0, props.size.height.length - 2) * 0.15}px;
`;

const CalendarDateInputModalFooter = styled.div`
  border-top: 1px solid ${props => props.theme.fontColor};
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${props => props.size.height.substr(0, props.size.height.length - 2) * 0.15}px;
`;

const CalendarDateInputModalBody = styled.div`
  height: ${props => props.size.height.substr(0, props.size.height.length - 2) * 0.7}px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const CalendarDateInputModalButton = styled.button`
  background-color: ${props => (props.isAccept ? props.theme.acceptColor : props.isDelete ? "red" : props.theme.cancelColor)};
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
    const { target } = props;
    this.state = {
      date: target ? target.date : "",
      text: target ? target.text : "",
      isHoliday: target ? target.isHoliday : true
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

  handleAddButtonClicked = () => {
    const { target, updateCalendarText, addCalendarText } = this.props;
    const { text, date, isHoliday } = this.state;
    if (target && target.text) {
      updateCalendarText(target, { text, date, isHoliday });
    } else {
      addCalendarText({ text, date, isHoliday });
    }
    this.handleCloseButtonClicked();
  };

  handleDeleteButtonClicked = () => {
    const { target, deleteCalendarText } = this.props;
    const { text, date, isHoliday } = this.state;
    deleteCalendarText(target, { text, date, isHoliday });
    this.handleCloseButtonClicked();
  };

  handleCloseButtonClicked = () => {
    const { handleTargetSetValue, handleModal } = this.props;
    this.setState({
      text: "",
      date: "",
      isHoliday: true
    });
    handleTargetSetValue({
      text: "",
      date: "",
      isHoliday: true
    });
    handleModal(false);
  };

  render() {
    const { size, target } = this.props;
    const { isHoliday, date, text } = this.state;
    return (
      <CalendarDateInputModalDiv style={size}>
        <CalendarDateInputModalHead size={size}>날짜 추가</CalendarDateInputModalHead>
        <CalendarDateInputModalBody size={size}>
          <div>
            <label htmlFor="date">날짜: </label>
            <input id="date" value={date} onChange={this.handleInputDateChange} placeholder="2019-12-10" />
          </div>
          <br />
          <br />
          <div>
            <label htmlFor="text">이름: </label>
            <input id="text" value={text} onChange={this.handleInputTextChange} placeholder="휴가" />
          </div>
          <br />
          <br />
          <div>
            <label htmlFor="isHoliday">휴일 여부: </label>
            <input id="isHoliday" type="checkbox" checked={isHoliday} onChange={this.handleInputIsHoliday} />
          </div>
          <br />
        </CalendarDateInputModalBody>
        <CalendarDateInputModalFooter size={size}>
          <CalendarDateInputModalButton isAccept onClick={this.handleAddButtonClicked}>
            {target && target.text ? "수정" : "추가"}
          </CalendarDateInputModalButton>
          {target && target.text ? (
            <CalendarDateInputModalButton isDelete onClick={this.handleDeleteButtonClicked}>
              삭제
            </CalendarDateInputModalButton>
          ) : null}
          <CalendarDateInputModalButton onClick={this.handleCloseButtonClicked}>닫기</CalendarDateInputModalButton>
        </CalendarDateInputModalFooter>
      </CalendarDateInputModalDiv>
    );
  }
}

CalendarDateInputModal.defaultProps = {
  addCalendarText: () => {},
  handleModal: () => {},
  size: {}
};

CalendarDateInputModal.propTypes = {
  addCalendarText: PropTypes.func,
  handleModal: PropTypes.func,
  handleTargetSetValue: PropTypes.func,
  deleteCalendarText: PropTypes.func,
  updateCalendarText: PropTypes.func,
  size: PropTypes.object,
  target: PropTypes.shape({
    date: PropTypes.string,
    text: PropTypes.string,
    isHoliday: PropTypes.bool
  })
};

export default CalendarDateInputModal;

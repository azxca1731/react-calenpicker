import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import DateCard from "Components/DateCard";

const CalendarDateInputModalDiv = styled.div`
  position: absolute;
  z-index: 1000;
  color: ${props => props.theme.fontColor};
  border: 1px solid ${props => props.theme.fontColor};
  background-color: ${props => props.theme.backgroundColor};
  top: -1px;
  right: 0px;
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
  height: ${props => props.size.height.substr(0, props.size.height.length - 2) * 0.625}px;
  padding: ${props => props.size.height.substr(0, props.size.height.length - 2) * 0.025}px ${props => props.size.width.substr(0, props.size.width.length - 2) * 0.05}px;
`;

const CalendarDateInputModalInputZone = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  border: 1px solid ${props => props.theme.fontColor};
  padding: ${props => props.size.height.substr(0, props.size.height.length - 2) * 0.05}px 0px;
  border-radius: 5px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;

const CalendarDateInputModalDateZone = styled.div`
  width: 90%;
  border: 1px solid ${props => props.theme.fontColor};
  border-radius: 5px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  height: ${props => props.size.height.substr(0, props.size.height.length - 2) * 0.6 + 10}px;
  overflow-y: scroll;
  padding: 0px 5%;
`;

const CalendarDateInputModalCustomZone = styled.div`
  width: 90%;
  border: 1px solid ${props => props.theme.fontColor};
  border-radius: 5px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  height: ${props => props.size.height.substr(0, props.size.height.length - 2) * 0.6 + 10}px;
  padding: 0px 5%;
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

const NoItemComment = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

class CalendarDateInputModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "",
      text: "",
      isHoliday: true
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

  handleAddButtonClicked = () => {
    const { addCalendarText } = this.props;
    const { text, date, isHoliday } = this.state;

    if (this.form.current.reportValidity()) {
      addCalendarText({ text, date, isHoliday });
      this.handleCloseButtonClicked();
    }
  };

  handleDeleteButtonClicked = () => {
    const { target, deleteCalendarText } = this.props;
    const { text, date, isHoliday } = this.state;
    deleteCalendarText(target, { text, date, isHoliday });
    this.handleCloseButtonClicked();
  };

  handleListOut = deleteindex => {
    const { updateCalendarText, anotherSchedules, target } = this.props;
    const filtered = anotherSchedules.filter((_, index) => index != deleteindex);
    updateCalendarText(target, filtered);
  };

  updateScheduleArray = (updatedIndex, updateSchedule) => {
    const { updateCalendarText, anotherSchedules, target } = this.props;
    const filtered = anotherSchedules.map((item, index) => {
      if (index != updatedIndex) {
        return item;
      } else {
        return updateSchedule;
      }
    });
    updateCalendarText(target, filtered);
  };

  handleListFirst = firstIndex => {
    const { updateCalendarText, anotherSchedules, target } = this.props;
    if (firstIndex == 0) return;
    const frontSlice = anotherSchedules.slice(0, firstIndex);
    const backSlice = anotherSchedules.slice(firstIndex + 1, anotherSchedules.length);
    const returnArray = [anotherSchedules[firstIndex], ...frontSlice, ...backSlice];
    updateCalendarText(target, returnArray);
  };

  handleListUp = upIndex => {
    const { updateCalendarText, anotherSchedules, target } = this.props;
    if (upIndex == 0) return;
    const frontSlice = anotherSchedules.slice(0, upIndex - 1);
    const backSlice = anotherSchedules.slice(upIndex + 1, anotherSchedules.length);
    const returnArray = [...frontSlice, anotherSchedules[upIndex], anotherSchedules[upIndex - 1], ...backSlice];
    updateCalendarText(target, returnArray);
  };

  handleListDown = downIndex => {
    const { anotherSchedules, updateCalendarText, target } = this.props;
    if (downIndex == anotherSchedules.length - 1) return;
    const frontSlice = anotherSchedules.slice(0, downIndex);
    const backSlice = anotherSchedules.slice(downIndex + 2, anotherSchedules.length);
    const returnArray = [...frontSlice, anotherSchedules[downIndex + 1], anotherSchedules[downIndex], ...backSlice];
    updateCalendarText(target, returnArray);
  };

  handleCloseButtonClicked = () => {
    const { handleTargetSetValue, handleModal } = this.props;
    this.setState({
      text: "",
      date: "",
      isHoliday: true
    });
    handleTargetSetValue("");
    handleModal("NONE");
  };

  renderHead = () => {
    const { type } = this.props;
    let head;
    if (type == "READ") {
      head = "자세히 보기";
    } else if (type == "UPDATE") {
      head = "일정 수정";
    } else if (type == "ADD") {
      head = "일정 추가";
    } else {
      head = "추가 정보";
    }
    return head;
  };

  renderInputZone = () => {
    const { size } = this.props;
    const { isHoliday, date, text } = this.state;
    return (
      <CalendarDateInputModalInputZone size={size} ref={this.form} onSubmit={e => e.preventDefault()}>
        <div>
          <label>날짜: </label>
          <input id="date" value={date} onChange={this.handleInputDateChange} placeholder="날짜를 입력하세요" type="text" pattern="[0-9]{4}-[0-1]{0,1}[0-9]{1}-[0-9]{2}" required />
        </div>
        <br />
        <div>
          <label>이름: </label>
          <input id="text" value={text} onChange={this.handleInputTextChange} placeholder="이벤트의 이름을 입력하세요" required />
        </div>
        <br />
        <div>
          <label>휴일 여부: </label>
          <input id="isHoliday" type="checkbox" checked={isHoliday} onChange={this.handleInputIsHoliday} />
        </div>
      </CalendarDateInputModalInputZone>
    );
  };

  renderDateZone = () => {
    const { size, type, anotherSchedules } = this.props;
    const height = size.height.substr(0, size.height.length - 2) * 0.15;
    return (
      <CalendarDateInputModalDateZone size={size}>
        {anotherSchedules.length != 0 ? (
          anotherSchedules.map(({ text, isHoliday, date }, index) => (
            <DateCard
              key={text}
              text={text}
              height={height}
              isHoliday={isHoliday}
              index={index + 1}
              date={date}
              dateLength={anotherSchedules.length}
              handleDelete={() => this.handleListOut(index)}
              handleUp={() => this.handleListUp(index)}
              handleDown={() => this.handleListDown(index)}
              handleFirst={() => this.handleListFirst(index)}
              handleModify={this.updateScheduleArray}
              type={type}
            />
          ))
        ) : (
          <NoItemComment>아무런 스케줄이 없습니다</NoItemComment>
        )}
      </CalendarDateInputModalDateZone>
    );
  };

  renderCustomZone = () => {
    const { size, customComponent } = this.props;
    return <CalendarDateInputModalCustomZone size={size}>{customComponent}</CalendarDateInputModalCustomZone>;
  };

  render() {
    const { size, type } = this.props;
    if (type == "NONE") {
      return null;
    }
    return (
      <CalendarDateInputModalDiv style={size}>
        <CalendarDateInputModalHead size={size}>{this.renderHead()}</CalendarDateInputModalHead>
        <CalendarDateInputModalBody size={size}>
          {type == "ADD" ? this.renderInputZone() : null}
          {type == "READ" || type == "UPDATE" ? this.renderDateZone() : null}
          {type == "DUPLICATED" ? this.renderCustomZone() : null}
        </CalendarDateInputModalBody>
        <CalendarDateInputModalFooter size={size}>
          {type == "ADD" ? (
            <CalendarDateInputModalButton isAccept onClick={this.handleAddButtonClicked}>
              추가
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
  size: { height: "450px", width: "300px" },
  anotherSchedules: [],
  type: "READ",
  customComponent: React.createElement("div")
};

CalendarDateInputModal.propTypes = {
  addCalendarText: PropTypes.func,
  handleModal: PropTypes.func,
  handleTargetSetValue: PropTypes.func,
  deleteCalendarText: PropTypes.func,
  updateCalendarText: PropTypes.func,
  size: PropTypes.object,
  target: PropTypes.string,
  anotherSchedules: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      date: PropTypes.string,
      isHoliday: PropTypes.bool
    })
  ),
  customComponent: PropTypes.element,
  /**
   * ADD - 일정을 더 할때의 모달, 다른 스케줄이 보이면 안된다.
   * UPDATE - 일정을 업데이트 한다. 다른 일정을 볼 수 있고 수정도 가능하다.
   * READ - 다른 일정이 뭐가 있는지만 볼 수 가 있다.
   * DUPLICATED - 추가적인 정보를 렌더 할 수 있다.
   */
  type: PropTypes.oneOf(["ADD", "UPDATE", "READ", "DUPLICATED"])
};

export default CalendarDateInputModal;

import React, { Component, createContext } from "react";
import PropTypes from "prop-types";
import createUseConsumer from "./UseConsumer";

const Context = createContext();

const { Provider, Consumer: ScheduleConsumer } = Context;

class ScheduleProvider extends Component {
  constructor(props) {
    super(props);
    const { schedules } = this.props;
    const ids = schedules
      .map(item => item.scheduleID)
      .filter((id, index, self) => {
        return self.indexOf(id) === index;
      });
    this.state = {
      schedules: schedules, // [{ date, text, isHoliday, scheduleId }]
      scheduleIDs: ids,
      target: "",
      modalType: "NONE"
    };
  }
  actions = {
    /**
     * @function formatDateString - 날짜 형식 통일을 위한 변환 함수.
     * @param {String} dateString - 날짜 형식을 변환할 스트링
     * @return {String} - 변환된 날짜 스트링
     */
    formatDateString: dateString => {
      const newDate = new Date(dateString);
      return `${newDate.getFullYear()}-${newDate.getMonth() + 1}-${newDate.getDate()}`;
    },
    handleTargetSetValue: newTarget => {
      this.setState({
        target: newTarget
      });
    },
    addCalendarText: newDateObject => {
      const { date } = newDateObject;
      newDateObject.date = this.actions.formatDateString(date);
      this.setState({
        schedules: [...this.state.schedules, newDateObject]
      });
    },
    deleteCalendarText: deletedDateObject => {
      const filterd = this.state.schedules.filter(({ date, text, isHoliday }) => !(date == deletedDateObject.date && text == deletedDateObject.text && isHoliday == deletedDateObject.isHoliday));
      this.setState({
        schedules: filterd
      });
    },
    updateCalendarText: (deletedDate, newDateObjectArray) => {
      const fomratedArray = newDateObjectArray.map(newDateObject => {
        const { date } = newDateObject;
        newDateObject.date = this.actions.formatDateString(date);
        return newDateObject;
      });
      const filterd = this.state.schedules.filter(({ date }) => date != deletedDate);
      this.setState({
        schedules: [...filterd, ...fomratedArray]
      });
    },
    handleModal: (result, canUpdateDate) => {
      if (result == "READ" && canUpdateDate) result = "UPDATE";
      this.setState({
        modalType: result
      });
    },
    /**
     * @function convertToSchedule - 기존 objectSetText를 ScheduleObject로 변환해주는 action
     * @param {Array} schedules - objectSetText에 해당.
     * @return {Array} - schedule로 변환된 배열
     */
    convertToSchedule: schedules => {
      const id = this.actions.generateUniqueID();
      const schedule = schedules.map(item => {
        return { ...item, scheduleID: id };
      });
      return schedule;
    },
    generateUniqueID: () => {
      function s4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      }
      return s4();
    }
  };
  render() {
    const { state, actions } = this;
    const value = { state, actions };
    return <Provider value={value}>{this.props.children}</Provider>;
  }
}

ScheduleProvider.defaultProps = {
  children: <div />,
  schedules: []
};

ScheduleProvider.propTypes = {
  children: PropTypes.node,
  schedules: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string,
      text: PropTypes.string,
      isHoliday: PropTypes.bool,
      scheduleID: PropTypes.string
    })
  )
};

const ScheduleConnector = createUseConsumer(ScheduleConsumer);
export { ScheduleProvider, ScheduleConsumer, ScheduleConnector };

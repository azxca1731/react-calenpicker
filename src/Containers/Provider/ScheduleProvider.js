import React, { Component, createContext } from "react";
import PropTypes from "prop-types";
import createUseConsumer from "./UseConsumer";

const Context = createContext();

const { Provider, Consumer: ScheduleConsumer } = Context;

class ScheduleProvider extends Component {
  state = {
    schedules: [] // [{ date, text, isHoliday, scheduleId }]
  };
  actions = {
    /**
     * @function convertToSchedule - 기존 objectSetText를 ScheduleObject로 변환해주는 action
     * @param {Array} scheduleObjects - objectSetText에 해당.
     * @return {Array} - schedule로 변환된 배열
     */
    convertToSchedule: scheduleObjects => {
      const id = this.actions.generateUniqueID();
      const schedule = scheduleObjects.map(item => {
        return {...item, scheduleId: id};
      });
      return schedule;
    },
    generateUniqueID: () => {
      function s4() {
        return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
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
  scheduleObjects: []
};

ScheduleProvider.propTypes = {
  children: PropTypes.node,
  scheduleObjects: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string,
      text: PropTypes.string,
      isHoliday: PropTypes.bool,
      scheduleId: PropTypes.string
    })
  )
};

const ScheduleConnector = createUseConsumer(ScheduleConsumer);
export { ScheduleProvider, ScheduleConsumer, ScheduleConnector };

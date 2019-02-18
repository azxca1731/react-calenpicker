import React from "react";
import PropTypes from "prop-types";

import { DayConnector, PropsConnector, CssConnector, ScheduleConnector } from "Containers/Provider";
import Date from "Components/Date";

class DateContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleDateClick = this.handleDateClick.bind(this);
  }

  state = {
    today: this.props.getTodayString(),
    dateString: "",
    dayNumber: 0,
    isInThisMonth: false,
    isInPeriod: false,
    isHoliday: false,
    isToday: false,
    isSaturday: false,
    indicatorType: "date",
    schedules: []
  };

  static getDerivedStateFromProps(props, state) {
    const { weekNumber, day, schedules, duplicated, duplicatedDateObjectArray, indicateToday, onlyThisMonth } = props;
    const dateObjectArray = duplicated ? duplicatedDateObjectArray : props.dateObjectArray;
    if (dateObjectArray.length > 0) {
      const target = dateObjectArray[weekNumber * 7 + day - 1];
      const dateString = (onlyThisMonth && target.isInThisMonth) || !onlyThisMonth ? target.dateString : "";
      const isInThisMonth = target.isInThisMonth;
      let text, isHoliday, isToday, haveMoreDate;
      if (state.today === dateString && indicateToday) {
        text = "오늘";
        isToday = true;
      } else {
        const filtered = schedules.length > 0 ? schedules.filter(item => item.date === dateString) : [];
        text = filtered.length > 0 ? filtered[0].text : "";
        haveMoreDate = filtered.length > 1;
        isHoliday = filtered.length > 0 ? filtered[0].isHoliday : false;
        isToday = false;
      }
      const dayNumber = onlyThisMonth && !isInThisMonth ? null : target.dayNumber;
      const isInPeriod = props.isInPeriod(dateString);
      isHoliday = day == 1 ? true : isHoliday;
      const isSaturday = day == 7 ? true : false;

      let indicatorType = "date";
      const selected = DateContainer._filterSelectedPeriod(props, state, dateString);
      if (DateContainer._isPeriodDate(props, state, "start", dateString)) indicatorType = "start";
      else if (DateContainer._isPeriodDate(props, state, "end", dateString)) indicatorType = "end";
      if (selected.length > 0) {
        indicatorType = "select";
      }
      const filteredSchedule = schedules.filter(({ date }) => date === dateString); // length = 1
      let isStart = false,
        isEnd = false;
      if (filteredSchedule.length > 0) {
        indicatorType = "schedule";
        const targetSchedule = schedules.filter(({scheduleID}) => filteredSchedule[0].scheduleID === scheduleID );
        if (targetSchedule.length > 1) {
          const pos = targetSchedule.map(item => item.date).indexOf(dateString);
          isStart = pos === 0 ? true : false;
          isEnd = pos === targetSchedule.length - 1 ? true: false;
        }
      }
      return {
        dateString,
        text,
        dayNumber,
        isInThisMonth,
        isHoliday,
        isInPeriod,
        isToday,
        isSaturday,
        indicatorType,
        haveMoreDate,
        isStart,
        isEnd,
        schedules: filteredSchedule
      };
    }
    return null;
  }

  /**
   * @function _filterSelectedPeriod
   * @param {object} props - 프로퍼티들
   * @param {object} state - state
   * @param {string} dateString - 특정 날짜를 찾기 위해 사용
   * @returns {array} - period를 반환, 예상 길이는 1개, multiSelect시 dateString이 없다면 다수. 검색 결과가 없다면 []
   */
  static _filterSelectedPeriod(props, state, dateString = "") {
    const { periods, periodStart, periodEnd } = props;
    if (periods && periods.length > 0) {
      return periods.filter(period => {
        const { periodStart: ps, periodEnd: pe } = period;
        if (dateString) return ps === pe && ps === dateString;
        else return ps === pe;
      });
    } else {
      if (periodStart && periodEnd && periodStart == periodEnd) return [{ periodStart, periodEnd }];
      return [];
    }
  }
  /**
   * @function _isPeriodDate - 기간 배열에서 주어진 type이 맞다면 true 아니면 false
   * @param {object} props - 프로퍼티
   * @param {object} state - state
   * @param {string} type - 시작의 경우 'start' 끝의 경우 'end'
   * @param {string} dateString - 해당 Date의 날짜 string
   * @returns {boolean} boolean
   */
  static _isPeriodDate(props, state, type, dateString) {
    const { periods, periodStart, periodEnd } = props;
    let result;
    result = (type == "start" && periodStart === dateString) || (type === "end" && periodEnd === dateString);
    result =
      result ||
      periods.filter(period => {
        const { periodStart: ps, periodEnd: pe } = period;
        return (type == "start" && ps == dateString) || (type == "end" && pe == dateString);
      }).length > 0;
    return result;
  }

  handleDateClick() {
    const { dateClicked, isInPeriod, triggerState } = this.props;
    const { isInThisMonth, dateString } = this.state;

    if (isInThisMonth) {
      dateClicked(this.state, triggerState);
    }
    if (isInPeriod(dateString)) {
      if (!isInPeriod) {
        this.setState({
          isInPeriod: true
        });
      }
    } else {
      if (isInPeriod)
        this.setState({
          isInPeriod: false
        });
    }
  }

  render() {
    const { cssObject, handleModal, handleTargetSetValue, canUpdateDate, scheduleIDs } = this.props;
    const { text, dayNumber, isInPeriod, isHoliday, isInThisMonth, isToday, isSaturday, indicatorType, dateString, haveMoreDate, isStart, isEnd, schedules } = this.state;
    return (
      <Date
        {...{
          cssObject,
          text,
          dayNumber,
          isInThisMonth,
          isToday,
          isHoliday,
          isInPeriod,
          isSaturday,
          indicatorType,
          handleDateClick: this.handleDateClick,
          handleModal,
          dateString,
          handleTargetSetValue,
          haveMoreDate,
          canUpdateDate,
          schedules,
          scheduleIDs,
          isStart,
          isEnd
        }}
      />
    );
  }
}

DateContainer.defaultProps = {
  day: "1",
  handleModal: () => {}
};

DateContainer.propTypes = {
  weekNumber: PropTypes.number.isRequired,
  day: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7]).isRequired,
  dateObjectArray: PropTypes.array.isRequired,
  dateClicked: PropTypes.func,
  onlyThisMonth: PropTypes.bool,
  isInPeriod: PropTypes.func,
  periodStart: PropTypes.string,
  periodEnd: PropTypes.string,
  getTodayString: PropTypes.func,
  indicateToday: PropTypes.bool,
  multiSelect: PropTypes.bool,
  periods: PropTypes.arrayOf(
    PropTypes.shape({
      periodStart: PropTypes.string,
      periodEnd: PropTypes.string
    })
  ),
  duplicated: PropTypes.bool,
  duplicatedDateObjectArray: PropTypes.array,
  cssObject: PropTypes.object,
  handleModal: PropTypes.func,
  handleTargetSetValue: PropTypes.func,
  triggerState: PropTypes.string,
  schedules: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string,
      text: PropTypes.string,
      isHoliday: PropTypes.bool,
      scheduleId: PropTypes.string
    })
  ),
  scheduleIDs: PropTypes.arrayOf(PropTypes.string),
  convertToSchedule: PropTypes.func,
  canUpdateDate: PropTypes.bool
};

let wrapped = PropsConnector(({ state }) => ({
  onlyThisMonth: state.onlyThisMonth,
  duplicated: state.duplicated,
  triggerState: state.triggerState,
  canUpdateDate: state.canUpdateDate
}))(DateContainer);

wrapped = ScheduleConnector(({ state, actions }) => ({
  schedules: state.schedules,
  scheduleIDs: state.scheduleIDs,
  convertToSchedule: actions.convertToSchedule,
  handleModal: actions.handleModal,
  handleTargetSetValue: actions.handleTargetSetValue
}))(wrapped);

wrapped = DayConnector(({ state, actions }) => ({
  dateObjectArray: state.dateObjectArray,
  duplicatedDateObjectArray: state.duplicatedDateObjectArray,
  dateClicked: actions.handleDateClicked,
  isInPeriod: actions.isInPeriod,
  periodStart: state.periodStart,
  periodEnd: state.periodEnd,
  getTodayString: actions.getTodayString,
  indicateToday: state.indicateToday,
  multiSelect: state.multiSelect,
  periods: state.periods
}))(wrapped);

wrapped = CssConnector(({ state }) => ({
  cssObject: state.DateCssObject
}))(wrapped);

export default wrapped;

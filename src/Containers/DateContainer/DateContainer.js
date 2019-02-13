import React from "react";
import PropTypes from "prop-types";

import { DayConnector, PropsConnector, CssConnector } from "Containers/Provider";
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
    indicatorType: "date"
  };

  static getDerivedStateFromProps(props, state) {
    const { weekNumber, day, objectSetText, duplicated, duplicatedDateObjectArray, indicateToday, onlyThisMonth } = props;
    const dateObjectArray = duplicated ? duplicatedDateObjectArray : props.dateObjectArray;
    if (dateObjectArray.length > 0) {
      const target = dateObjectArray[weekNumber * 7 + day - 1];
      const dateString = (onlyThisMonth && target.isInThisMonth) || !onlyThisMonth ? target.dateString : "";
      const isInThisMonth = target.isInThisMonth;
      let text, isHoliday, isToday;
      if (state.today === dateString && indicateToday) {
        text = "오늘";
        isToday = true;
      } else {
        const filtered = objectSetText.length > 0 ? objectSetText.filter(item => item.date === dateString) : [];
        text = filtered.length > 0 ? filtered[0].text : "";
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

      return {
        dateString,
        text,
        dayNumber,
        isInThisMonth,
        isHoliday,
        isInPeriod,
        isToday,
        isSaturday,
        indicatorType
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
    const { dateClicked, isInPeriod } = this.props;
    const { isInThisMonth, dateString } = this.state;
    if (isInThisMonth) {
      dateClicked(this.state);
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
    const { cssObject, canUpdateDate, handleModal, handleTargetSetValue } = this.props;
    const { text, dayNumber, isInPeriod, isHoliday, isInThisMonth, isToday, isSaturday, indicatorType, dateString } = this.state;
    return (
      <Date
        cssObject={cssObject}
        text={text}
        dayNumber={dayNumber}
        isInThisMonth={isInThisMonth}
        isToday={isToday}
        isHoliday={isHoliday}
        isInPeriod={isInPeriod}
        isSaturday={isSaturday}
        indicatorType={indicatorType}
        handleDateClick={this.handleDateClick}
        handleModal={canUpdateDate ? handleModal : () => {}}
        dateString={dateString}
        handleTargetSetValue={handleTargetSetValue}
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
  objectSetText: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      date: PropTypes.date
    })
  ),
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
  canUpdateDate: PropTypes.bool,
  handleTargetSetValue: PropTypes.func
};

export default PropsConnector(({ state, actions }) => ({
  onlyThisMonth: state.onlyThisMonth,
  objectSetText: state.objectSetText,
  duplicated: state.duplicated,
  handleModal: actions.handleModal,
  canUpdateDate: state.canUpdateDate,
  handleTargetSetValue: actions.handleTargetSetValue
}))(
  DayConnector(({ state, actions }) => ({
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
  }))(
    CssConnector(({ state }) => ({
      cssObject: state.DateCssObject
    }))(DateContainer)
  )
);

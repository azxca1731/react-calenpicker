import React from "react";
import PropTypes from "prop-types";
import light from "./Date.style.light";
import dark from "./Date.style.dark";
import Date, { DateText } from "Components/Date";
import styled from "styled-components";
import startImg from "../../Styles/assets/start-period.png";
import endImg from "../../Styles/assets/end-period.png";
import { DayConnector, PropsConnector, CssConnector } from "Containers/Provider";

const PeriodIndicatorDIV = styled.div`
  z-index: 101;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
`;

const StartDIV = styled(PeriodIndicatorDIV)`
  background: url(${startImg}) no-repeat;
  background-size: 100% 100%;
`;

const EndDIV = styled(PeriodIndicatorDIV)`
  background: url(${endImg}) no-repeat;
  background-size: 100% 100%;
`;

const StartIndicator = props => (
  <StartDIV>
    <div>{props.dayNumber}</div>
    <div>시작</div>
  </StartDIV>
);

const EndIndicator = props => (
  <EndDIV>
    <div>{props.dayNumber}</div>
    <div>시작</div>
  </EndDIV>
);

class DateContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleDateClick = this.handleDateClick.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.handleEnd = this.handleEnd.bind(this);
  }

  state = {
    today: this.props.getTodayString(),
    dateString: "",
    dayNumber: 0,
    isInThisMonth: false,
    isInPeriod: false,
    isHoliday: false,
    isToday: false,
    isSaturday: false
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
        const filtered =
          objectSetText.length > 0
            ? objectSetText.filter(item => {
              return item.date === dateString;
            })
            : [];
        text = filtered.length > 0 ? filtered[0].text : "";
        isHoliday = filtered.length > 0 ? filtered[0].isHoliday : false;
        isToday = false;
      }
      const dayNumber = target.dayNumber;
      const isInPeriod = props.isInPeriod(dateString);
      isHoliday = day == 1 ? true : isHoliday;
      const isSaturday = day == 7 ? true : false;
      return { dateString, text, dayNumber, isInThisMonth, isHoliday, isInPeriod, isToday, isSaturday };
    }
    return null;
  }

  componentDidMount() {}


  handleDateClick() {
    const { dateClicked, isInPeriod } = this.props;
    const { isInThisMonth, dateString } = this.state;
    if (isInThisMonth) {
      dateClicked(this.state);
    }
    if (isInPeriod(dateString)) {
      this.setState({
        isInPeriod: true
      });
    } else {
      this.setState({
        isInPeriod: false
      });
    }
  }


  handleStart() {
    const { periodStart, periods } = this.props;
    const { dateString, dayNumber } = this.state;

    for (let i = 0; i < periods.length; i++) {
      const { periodStart: ps, periodEnd: pe } = periods[i];
      if (ps == pe) {
        if (ps == dateString) return;
      } else if (ps == dateString) return <StartIndicator dayNumber={dayNumber} />;
    }

    if (periods.length >= 0 && periodStart == dateString) {
      return <StartIndicator dayNumber={dayNumber} />;
    }
  }

  handleEnd() {
    const { periodEnd, periods } = this.props;
    const { dateString, dayNumber } = this.state;

    for (let i = 0; i < periods.length; i++) {
      const { periodStart: ps, periodEnd: pe } = periods[i];
      if (ps === pe) {
        if (pe == dateString) return <DateText>선택</DateText>;
      } else if (pe == dateString) return <EndIndicator dayNumber={dayNumber} />;
    }

    if (periods.length == 0 && periodEnd == dateString) {
      return <EndIndicator dayNumber={dayNumber} />;
    }
  }

  render() {
    const { cssObject } = this.props;
    const { text, dayNumber, isInPeriod, isHoliday, isInThisMonth, isToday, isSaturday } = this.state;
    const handlers = { handleDateClick: this.handleDateClick };
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
        handlers={handlers}
      >
        {this.handleStart()}
        {this.handleEnd()}
      </Date>
    );
  }
}

StartIndicator.propTypes = {
  dayNumber: PropTypes.number
};
EndIndicator.propTypes = {
  dayNumber: PropTypes.number
};

DateContainer.defaultProps = {
  day: "1"
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
};

export default PropsConnector(({ state }) => ({
  onlyThisMonth: state.onlyThisMonth,
  objectSetText: state.objectSetText,
  duplicated: state.duplicated,
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

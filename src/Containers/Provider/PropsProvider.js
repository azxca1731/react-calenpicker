import React, { Component, createContext } from "react";
import PropTypes from "prop-types";
import createUseConsumer from "./UseConsumer";

const Context = createContext();

const { Provider, Consumer: PropsConsumer } = Context;

class PropsProvider extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    sizeOption: this.props.sizeOption,
    duplicate: this.props.duplicate,
    duplicated: this.props.duplicated,
    onlyThisMonth: this.props.onlyThisMonth,
    objectSetText: this.props.objectSetText,
    addText: this.props.addText,
    canMouseWheel: this.props.canMouseWheel,
    canUpdateDate: this.props.canUpdateDate,
    modalType: "NONE",
    target: "",
    triggerState: "UNIFIED"
  };

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
    addCalendarText: newDateObject => {
      const { date } = newDateObject;
      newDateObject.date = this.actions.formatDateString(date);
      this.setState({
        objectSetText: [...this.state.objectSetText, newDateObject]
      });
    },
    deleteCalendarText: deletedDateObject => {
      const filterd = this.state.objectSetText.filter(({ date, text, isHoliday }) => !(date == deletedDateObject.date && text == deletedDateObject.text && isHoliday == deletedDateObject.isHoliday));
      this.setState({
        objectSetText: filterd
      });
    },
    updateCalendarText: (deletedDate, newDateObjectArray) => {
      const fomratedArray = newDateObjectArray.map(newDateObject => {
        const { date } = newDateObject;
        newDateObject.date = this.actions.formatDateString(date);
        return newDateObject;
      });
      const filterd = this.state.objectSetText.filter(({ date }) => date != deletedDate);
      this.setState({
        objectSetText: [...filterd, ...fomratedArray]
      });
    },
    handleModal: result => {
      if (result == "READ" && this.props.canUpdateDate) result = "UPDATE";
      this.setState({
        modalType: result
      });
    },
    handleTargetSetValue: newTarget => {
      this.setState({
        target: newTarget
      });
    },
    /**
     * @function setTriggerState - 캘린터 트리거 세팅
     * @param trigger - 트리거 종류 one of ["UNIFIED", "START", "END"]
     * @returns {void}
     */
    setTriggerState: trigger => {
      this.setState({
        triggerState: trigger
      });
    }
  };

  componentDidUpdate(_, prevState) {
    if (prevState.objectSetText != this.state.objectSetText) {
      this.props.scheduleListener(this.state.objectSetText);
    }
  }

  static getDerivedStateFromProps(nextProps) {
    const { triggerState } = nextProps;
    return { triggerState };
  }

  render() {
    const { state, actions } = this;
    const value = { state, actions };
    return <Provider value={value}>{this.props.children}</Provider>;
  }
}

PropsProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  sizeOption: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      width: PropTypes.number,
      height: PropTypes.number
    })
  ]),
  duplicate: PropTypes.bool,
  duplicated: PropTypes.bool,
  onlyThisMonth: PropTypes.bool,
  addText: PropTypes.bool,
  objectSetText: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      date: PropTypes.string,
      isHoliday: PropTypes.bool
    })
  ),
  canMouseWheel: PropTypes.bool,
  canUpdateDate: PropTypes.bool,
  scheduleListener: PropTypes.func,
  triggerState: PropTypes.string
};

const PropsConnector = createUseConsumer(PropsConsumer);
export { PropsProvider, PropsConsumer, PropsConnector };

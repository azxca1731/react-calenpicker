import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import MonthContainer from "Containers/MonthContainer";
import MonthArrowContainer from "Containers/MonthArrowContainer";
import CalendarDateInputModal from "Components/CalendarDateInputModal";
import { DayConnector, PropsConnector, CssConnector } from "Containers/Provider";
import { ScheduleConnector } from "../Provider/ScheduleProvider";

const CalendarHeadDiv = styled.div`
  width: 87%;
  padding: 0px 20px;
  height: 20%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

class CalendarHead extends React.Component {
  constructor(props) {
    super(props);
  }

  renderCalendarDateInputModal = () => {
    const { target, addCalendarText, handleModal, handleTargetSetValue, deleteCalendarText, updateCalendarText, size, schedules, modalType, duplicated, CustomElements } = this.props;

    const filtered = target ? schedules.filter(({ date }) => date == target) : [];
    if (duplicated) {
      return <CalendarDateInputModal handleModal={handleModal} handleTargetSetValue={handleTargetSetValue} size={size} type={"DUPLICATED"} customComponent={CustomElements} />;
    } else {
      return (
        <CalendarDateInputModal
          addCalendarText={addCalendarText}
          handleModal={handleModal}
          target={target}
          handleTargetSetValue={handleTargetSetValue}
          deleteCalendarText={deleteCalendarText}
          updateCalendarText={updateCalendarText}
          size={size}
          anotherSchedules={filtered}
          type={modalType}
        />
      );
    }
  };

  render() {
    const { month: propsMonth, duplicated, duplicate, showNextMonth, showPreviousMonth, modalType } = this.props;

    let month;
    if (duplicated) {
      month = new Date(propsMonth);
      month = new Date(month.getFullYear(), month.getMonth() + 1, 1);
      month = `${month.getFullYear()}.${month.getMonth() + 1}`;
    } else {
      month = propsMonth;
    }
    return (
      <div>
        {!duplicate ? (
          <CalendarHeadDiv>
            <MonthArrowContainer type="left" onClick={showPreviousMonth} />
            <MonthContainer month={month} />
            {modalType != "NONE" ? this.renderCalendarDateInputModal() : null}
            <MonthArrowContainer type="right" onClick={showNextMonth} />
          </CalendarHeadDiv>
        ) : !duplicated ? (
          <CalendarHeadDiv>
            <MonthArrowContainer type="left" onClick={showPreviousMonth} />
            <MonthContainer month={month} />
            <MonthArrowContainer type="none" onClick={() => {}} />
            {modalType != "NONE" ? this.renderCalendarDateInputModal() : null}
          </CalendarHeadDiv>
        ) : (
          <CalendarHeadDiv>
            <MonthArrowContainer type="none" onClick={() => {}} />
            <MonthContainer month={month} />
            <MonthArrowContainer type="right" onClick={showNextMonth} />
            {modalType != "NONE" ? this.renderCalendarDateInputModal() : null}
          </CalendarHeadDiv>
        )}
      </div>
    );
  }
}

CalendarHead.defaultProps = {
  CustomElements: React.createElement("div")
};

CalendarHead.propTypes = {
  month: PropTypes.string.isRequired,
  showNextMonth: PropTypes.func.isRequired,
  showPreviousMonth: PropTypes.func.isRequired,
  duplicated: PropTypes.bool,
  duplicate: PropTypes.bool,
  cssObject: PropTypes.object,
  addCalendarText: PropTypes.func,
  modalType: PropTypes.string,
  handleModal: PropTypes.func,
  target: PropTypes.string,
  handleTargetSetValue: PropTypes.func,
  deleteCalendarText: PropTypes.func,
  updateCalendarText: PropTypes.func,
  size: PropTypes.object,
  CustomElements: PropTypes.element,
  schedules: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      date: PropTypes.string,
      isHoliday: PropTypes.bool
    })
  )
};

let wrapped = CssConnector(({ state }) => ({
  cssObject: state.CalendarHeadCssObject,
  size: state.TemplateCssObject
}))(CalendarHead);

wrapped = DayConnector(({ state, actions }) => ({
  month: `${state.year}.${state.month + 1}`,
  showPreviousMonth: actions.decreaseMonth,
  showNextMonth: actions.increaseMonth
}))(wrapped);

wrapped = PropsConnector(({ state }) => ({
  duplicated: state.duplicated,
  duplicate: state.duplicate,
  CustomElements: state.customElements
}))(wrapped);

wrapped = ScheduleConnector(({ state, actions }) => ({
  schedules: state.schedules,
  addCalendarText: actions.addCalendarText,
  modalType: state.modalType,
  handleModal: actions.handleModal,
  target: state.target,
  handleTargetSetValue: actions.handleTargetSetValue,
  deleteCalendarText: actions.deleteCalendarText,
  updateCalendarText: actions.updateCalendarText
}))(wrapped);
export default wrapped;

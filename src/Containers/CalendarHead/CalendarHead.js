import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import MonthContainer from "Containers/MonthContainer";
import MonthArrowContainer from "Containers/MonthArrowContainer";
import CalendarDateInputModal from "Components/CalendarDateInputModal";
import { DayConnector, PropsConnector, CssConnector } from "Containers/Provider";

const CalendarHeadDiv = styled.div`
  width: 87%;
  padding: 0px 20px;
  height: 20%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

const AddButton = styled.div`
  border-radius: 50%;
  background-color: ${props => props.theme.fontColor};
  color: ${props => props.theme.backgroundColor};
  padding: 0px 4px;
  cursor: pointer;
  position: relative;
  top: 1px;
`;

class CalendarHead extends React.Component {
  constructor(props) {
    super(props);
  }

  renderAddTextButton = () => {
    return <AddButton onClick={() => this.props.handleModal("ADD")}>+</AddButton>;
  };

  renderCalendarDateInputModal = () => {
    const { target, canUpdateDate, addCalendarText, handleModal, handleTargetSetValue, deleteCalendarText, updateCalendarText, size, objectSetText, modalType } = this.props;

    const filtered = target ? objectSetText.filter(({ date, text, isHoliday }) => date == target.date && (text != target.text || isHoliday != target.isHoliday)) : [];
    return (
      <CalendarDateInputModal
        addCalendarText={addCalendarText}
        handleModal={handleModal}
        target={canUpdateDate ? target : null}
        handleTargetSetValue={handleTargetSetValue}
        deleteCalendarText={deleteCalendarText}
        updateCalendarText={updateCalendarText}
        size={size}
        anotherSchedules={filtered}
        type={modalType}
      />
    );
  };

  render() {
    const { month: propsMonth, duplicated, duplicate, showNextMonth, showPreviousMonth, addText, modalType } = this.props;

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
            {addText ? this.renderAddTextButton() : null}
            {modalType != "NONE" ? this.renderCalendarDateInputModal() : null}
            <MonthArrowContainer type="right" onClick={showNextMonth} />
          </CalendarHeadDiv>
        ) : !duplicated ? (
          <CalendarHeadDiv>
            <MonthArrowContainer type="left" onClick={showPreviousMonth} />
            <MonthContainer month={month} />
            {addText ? this.renderAddTextButton() : null}
            {modalType != "NONE" ? this.renderCalendarDateInputModal() : null}
            <MonthArrowContainer type="none" onClick={() => {}} />
          </CalendarHeadDiv>
        ) : (
          <CalendarHeadDiv>
            <MonthArrowContainer type="none" onClick={() => {}} />
            <MonthContainer month={month} />
            <MonthArrowContainer type="right" onClick={showNextMonth} />
          </CalendarHeadDiv>
        )}
      </div>
    );
  }
}

CalendarHead.propTypes = {
  month: PropTypes.string.isRequired,
  showNextMonth: PropTypes.func.isRequired,
  showPreviousMonth: PropTypes.func.isRequired,
  duplicated: PropTypes.bool,
  duplicate: PropTypes.bool,
  cssObject: PropTypes.object,
  addCalendarText: PropTypes.func,
  addText: PropTypes.bool,
  modalType: PropTypes.String,
  handleModal: PropTypes.func,
  canUpdateDate: PropTypes.bool,
  target: PropTypes.shape({
    dateString: PropTypes.string,
    text: PropTypes.string,
    isHoliday: PropTypes.bool
  }),
  handleTargetSetValue: PropTypes.func,
  deleteCalendarText: PropTypes.func,
  updateCalendarText: PropTypes.func,
  size: PropTypes.object,
  objectSetText: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      date: PropTypes.string,
      isHoliday: PropTypes.bool
    })
  )
};

export default PropsConnector(({ state, actions }) => ({
  duplicated: state.duplicated,
  duplicate: state.duplicate,
  addCalendarText: actions.addCalendarText,
  addText: state.addText,
  modalType: state.modalType,
  handleModal: actions.handleModal,
  canUpdateDate: state.canUpdateDate,
  target: state.target,
  handleTargetSetValue: actions.handleTargetSetValue,
  deleteCalendarText: actions.deleteCalendarText,
  updateCalendarText: actions.updateCalendarText,
  objectSetText: state.objectSetText
}))(
  DayConnector(({ state, actions }) => ({
    month: `${state.year}.${state.month + 1}`,
    showPreviousMonth: actions.decreaseMonth,
    showNextMonth: actions.increaseMonth
  }))(
    CssConnector(({ state }) => ({
      cssObject: state.CalendarHeadCssObject,
      size: state.TemplateCssObject
    }))(CalendarHead)
  )
);

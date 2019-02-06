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
    this.state = {
      modalshow: false
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { modalShowFromDate, editSelectedDate } = nextProps;
    if (editSelectedDate) return { modalShow: modalShowFromDate };
    else return { modalShow: prevState };
  }

  handleModal = result => {
    this.setState({
      modalshow: result
    });
  };

  renderAddTextButton = () => {
    return <AddButton onClick={() => this.setState({ modalshow: true })}>+</AddButton>;
  };

  render() {
    const { month: propsMonth, duplicated, duplicate, showNextMonth, showPreviousMonth, addCalendarText, addText } = this.props;

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
            {this.state.modalshow ? <CalendarDateInputModal addCalendarText={addCalendarText} handleModal={this.handleModal} /> : null}
            <MonthArrowContainer type="right" onClick={showNextMonth} />
          </CalendarHeadDiv>
        ) : !duplicated ? (
          <CalendarHeadDiv>
            <MonthArrowContainer type="left" onClick={showPreviousMonth} />
            <MonthContainer month={month} />
            {addText ? this.renderAddTextButton() : null}
            {this.state.modalshow ? <CalendarDateInputModal addCalendarText={addCalendarText} handleModal={this.handleModal} /> : null}
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
  editSelectedDate: PropTypes.bool,
  modalShowFromDate: PropTypes.bool
};

export default PropsConnector(({ state, actions }) => ({
  duplicated: state.duplicated,
  duplicate: state.duplicate,
  addCalendarText: actions.addCalendarText,
  addText: state.addText,
  editSelectedDate: state.editSelectedDate,
  modalShowFromDate: state.modalShowFromDate
}))(
  DayConnector(({ state, actions }) => ({
    month: `${state.year}.${state.month + 1}`,
    showPreviousMonth: actions.decreaseMonth,
    showNextMonth: actions.increaseMonth
  }))(
    CssConnector(({ state }) => ({
      cssObject: state.CalendarHeadCssObject
    }))(CalendarHead)
  )
);

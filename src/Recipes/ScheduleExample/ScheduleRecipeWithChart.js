import React, { Component } from "react";
import Calendar from "../../Calendar";
import PropType from "prop-types";
import styled from "styled-components";

const ColorSet = [
  "#f98866",
  "#ff420e",
  "#80bd9e",
  "#89da59",
  "#90afc5",
  "336b87",
  "#2a3132",
  "#763626",
  "#505165",
  "#c4dfd6"
];

const Screen = styled.div`
  width: 1000px;
  height: 1000px;
  display: flex;
`;

const ChartContainerDiv = styled.div`
  width: 200px;
  height: 200px;
  padding: 0px 50px;
  border: 1px solid #000;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const ChartItem = styled.div`
  width: 20px;
  height: ${props => props.count * 20}px;
  background-color: ${props => ColorSet[props.index]};
  border: 1px solid #000;
  transition: height 0.3s;
  position: relative;
`;

const ChartTop = styled.div`
  position: absolute;
  top: -25px;
  font-size: 3px;
`;

const ChartContainer = props => {
  const mostDay = {};
  props.data.map(item => {
    if (!mostDay[item.date]) mostDay[item.date] = 1;
    else mostDay[item.date] += 1;
  });
  return (
    <ChartContainerDiv>
      {Object.keys(mostDay).map((objectKey, index) =>
        index < 10 ? (
          <ChartItem key={objectKey} count={mostDay[objectKey]} index={index}>
            <ChartTop>{objectKey}</ChartTop>
          </ChartItem>
        ) : null
      )}
    </ChartContainerDiv>
  );
};

ChartContainer.propTypes = {
  data: PropType.array
};

const externalSchedule = [
  { text: "오픈", date: "2019-2-19" },
  { text: "휴가", date: "2019-2-25", isHoliday: true }
];

class ScheduleRecipeWithChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      schedule: externalSchedule
    };
  }

  handleSchedule = schedule => {
    this.setState({
      schedule
    });
  };

  render() {
    return (
      <Screen>
        <Calendar
          schedules={externalSchedule}
          scheduleListener={this.handleSchedule}
          canUpdateDate
          addText
        />
        <ChartContainer data={this.state.schedule} />
      </Screen>
    );
  }
}

export default ScheduleRecipeWithChart;

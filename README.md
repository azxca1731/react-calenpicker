# react-calenpicker

<p>
  <a href="https://travis-ci.org/azxca1731/react-calenpicker">
    <img src="https://travis-ci.org/azxca1731/react-calenpicker.svg?branch=master"/>
  </a>
  <a href="https://www.npmjs.com/package/react-calenpicker">
    <img src="https://img.shields.io/npm/v/react-calenpicker.svg"/>
  </a>
</p>
리액트 캘린픽커는 리액트 캘린더 픽커의 줄임말로서 호텔, 항공권 같은 기간을 더 손쉽게 선택하기 위해 만들었습니다. 사용법은 간단합니다. 다음과 같이 입력해주세요

> npm install react-calenpicker
> <br />
> yarn add react-calenpicker

이렇게 설치하고 당신의 앱에 아래 예시와 비슷하게 입력 해주시면 됩니다.

```
import React, { Component } from "react";
import Calendar from "react-calenpicker";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Calendar />
      </div>
    );
  }
}

export default App;
```

이렇게 손쉽게 사용이 가능합니다.

---

### props 소개

props는 다음과 같습니다.

1.  startDate: 달력이 처음 불러질때 언제 부터 보일지 선택할 수 있습니다.
    > 타입: string <br />
    > 예시: <Calendar startDate="2018-12-29" />
2.  callbackFunction: 기간이 선택된 후 불려지는 함수입니다. 유저가 기간을 선택한 후에 보여질 것을 할 수 있습니다.
    > 타입: function <br />
    > 예시: <Calendar callbackFunction={period=>console.log(period)} /> <br />
    > callbackFunction으로 state를 조절하여 껏다 킬 수 있습니다.
3.  indicateToday: 오늘을 표시합니다. 캘린더에 오늘이라고 표시가 됩니다.
    > 타입: bool <br />
    > 예시: <Calendar indicateToday />
4.  multiSelect: 다중 선택이 가능하게 됩니다.
    > 타입: bool <br />
    > 예시: <Calendar multiSelect /> <br />
    > 정보: 다중선택을 할 시에 callbackFunction이 선택할 때 마다 선택됩니다.
5.  onlyThisMonth: 이번 달만 보여줄 수 있습니다. 전달이나 앞달이 보이지 않게 됩니다.
    > 타입: bool <br />
    > 예시: <Calendar multiSelect />
6.  objectSetText:텍스트 커스터마이징을 할 수 있습니다. 원하는 날짜를 date에 넣고 text에 원하는 말을 적으면 됩니다.
    > 타입: arrayOf(
    > {
    > text: string
    > date: string
    > isHoliday: bool
    > }) <br />
    > 예시: <Calendar objectSetText={[
               { text: "연말", date: "2018-12-31" },
               { text: "휴가", date: "2018-12-26", isHoliday: true }
             ]} /> <br />
    > 정보: isHoliday값의 true면 빨간색이 됩니다.
7.  sizeOption: 사이즈를 선택 할 수 있습니다.

    > 타입: sm, md, lg 혹은
    > {
    > width: string,
    > height: string
    > } <br />
    > 예시: <Calendar sizeOption="lg" /> or <Calendar sizeOption= {width: "300px" height: "400px" } />

다음 부터 나오는 props는 원하는 css를 커스터마이징 하기위해 있는 props입니다. 원하시는 Css Object를 넣으시면 됩니다.

1.  DateCssObject: object
2.  WeekCssObject: object
3.  TemplateCssObject: object
4.  MonthCssObject: object
5.  MonthArrowCssObject: object
6.  WeekDayCssObject: object
7.  CalendarBodyCssObject: object
8.  CalendarHeadCssObject: object
    > 예시 <Calendar MonthCssObject={{ color: "white" }} />

---

### Contributing

우리는 언제든지 기여를 환영합니다!
[이 문서](https://github.com/azxca1731/react-calenpicker/blob/master/CONTRIBUTING.md)를 읽어주세요.<br />

따로 슬랙 커뮤니티를 이용중입니다. 원하시면 azxca1731@gmail.com으로 이메일 주세요! 초대해드리겠습니다!

---

### Contributors

[김동현](https://github.com/DongDongKim)<br />

[공정훈](https://github.com/rhdtl78)<br />

[이정훈](https://github.com/azxca1731)<br />

---

이 프로젝트는 Dinesh Pandiyan의 [보일러플레이트](https://github.com/flexdinesh/react-npm-package-boilerplate)를 기반으로 만들었습니다.

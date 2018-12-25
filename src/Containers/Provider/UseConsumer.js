import React from "react";

const createUseConsumer = Consumer => mapContextToProps => WrappedComponent => {
  // mapContextToProps 가 없으면 그냥 context 를 그대로 props 에 전달
  const defaultMapContextToProps = context => ({ context });

  function UseConsumer(props) {
    return (
      <Consumer>
        {context => {
          // context에서 원하는 값 추출
          const contextProps = (mapContextToProps || defaultMapContextToProps)(
            context
          );
          return <WrappedComponent {...contextProps} {...props} />;
        }}
      </Consumer>
    );
  }
  // displayName 설정
  const displayName =
    WrappedComponent.displayName || WrappedComponent.name || "component";
  UseConsumer.displayName = `Connect(${displayName})`;
  return UseConsumer;
};

export default createUseConsumer;

import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const TemplateDiv = styled.div`
  width: 300px;
  display: inline-block;
  vertical-align: top;
  background-color: ${props => props.theme.backgroundColor};
  border: 1px solid ${props => props.theme.borderColor};
  ${props => (props.duplicated ? "border-left-width : 0;" : null)}
`;

const Devider = styled.div`
  width: 100%;
  border-bottom: 1px solid ${props => props.theme.borderColor};
`;

const Template = props => {
  const { head, children, cssObject, duplicated } = props;
  return (
    <TemplateDiv style={cssObject} duplicated={duplicated}>
      {head}
      <Devider />
      {children}
    </TemplateDiv>
  );
};

Template.defaultProps = {
  head: React.createElement("div"),
  children: React.createElement("div"),
  cssObject: {},
  duplicated: false
};

Template.propTypes = {
  head: PropTypes.element.isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  cssObject: PropTypes.object,
  duplicated: PropTypes.bool
};
export default Template;

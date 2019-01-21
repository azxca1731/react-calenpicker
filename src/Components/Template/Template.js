import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const TemplateDiv = styled.div`
  width: 300px;
  float: left;
  background-color: ${props => props.theme.backgroundColor};
  border: 1px solid ${props => props.theme.borderColor};
`;

const Devider = styled.div`
  width: 100%;
  border-bottom: 1px solid ${props => props.theme.borderColor};
`;

const TemplateLight = props => {
  const { head, children, cssObject } = props;
  return (
    <TemplateDiv style={cssObject}>
      {head}
      <Devider />
      {children}
    </TemplateDiv>
  );
};

TemplateLight.defaultProps = {
  cssObject: {}
};

TemplateLight.propTypes = {
  head: PropTypes.element.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  cssObject: PropTypes.object
};
export default TemplateLight;

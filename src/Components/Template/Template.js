import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import AddButton from "Components/AddButton";

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
  const { head, children, cssObject, duplicate, duplicated, handleModal, addText } = props;
  return (
    <TemplateDiv style={cssObject} duplicated={duplicated}>
      {head}
      <Devider />
      {children}
      {addText && duplicate && duplicated ? <AddButton handleModal={handleModal} /> : null}
      {addText && !duplicate && !duplicated ? <AddButton handleModal={handleModal} /> : null}
    </TemplateDiv>
  );
};

Template.defaultProps = {
  head: React.createElement("div"),
  children: React.createElement("div"),
  cssObject: {},
  duplicate: false,
  duplicated: false,
  addText: false,
  handleModal: () => {}
};

Template.propTypes = {
  head: PropTypes.element.isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  cssObject: PropTypes.object,
  duplicate: PropTypes.bool,
  duplicated: PropTypes.bool,
  addText: PropTypes.bool,
  handleModal: PropTypes.func
};
export default Template;

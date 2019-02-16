import React from "react";
import styled from "styled-components";
import PropType from "prop-types";
import PlusCircle from "Styles/icons/PlusCircle";
const AddButtonDiv = styled.div`
  position: relative;
  top: -20px;
  left: calc(100% - 50px);
  width: 20px;
`;
const AddButton = props => {
  return (
    <AddButtonDiv>
      <PlusCircle width="20px" onClick={() => props.handleModal("ADD")} />
    </AddButtonDiv>
  );
};

AddButton.propTypes = {
  handleModal: PropType.func
};

export default AddButton;

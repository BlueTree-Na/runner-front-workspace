import styled from "styled-components";

export const EmailContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

export const LocalPartInput = styled.input`
  width: 200px;
  margin-left: 50px;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  &:focus {
    outline: none;
    border-color: rgb(0, 162, 255);
  }
`;

export const DomainSelectWrapper = styled.div`
  position: relative;
  width: 160px;
`;

export const DomainSelectButton = styled.div`
  padding: 12px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  background-color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  &:focus {
    outline: none;
    border-color: rgb(0, 162, 255);
  }
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: 45px;
  left: 0;
  width: 100%;
  border: 1px solid #ccc;
  background: white;
  z-index: 10;
  border-radius: 5px;
  display: ${(props) => (props.open ? "block" : "none")};
`;

export const DropdownItem = styled.div`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

export const CustomDomainInput = styled.input`
  flex: 1;
  padding: 3px 3px;
  font-size: 16px;
  border: none;
  background: transparent;
  &:focus {
    outline: none;
  }
`;

export const EmailErrorMessage = styled.span`
  color: red;
  font-size: 12px;
  margin-top: 8px;
  display: block;
`;

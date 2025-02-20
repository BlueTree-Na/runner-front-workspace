import styled from "styled-components";

export const Sidebar = styled.div`
  width: 20%;
  background-color: #33bfe8;
  color: white;
  padding: 20px;
`;

export const SbTitle = styled.h2`
  font-size: 23px;
  font-weight: 900;
  margin: 30px;
  color: #33bfe8;
`;

export const SbTitleMenu = styled.ul`
  width: 200px;
  margin: 20px;
  list-style: none;
  padding: 0;
`;

export const SbTitleMenuItem = styled.li`
  padding: 10px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background-color: #33bfe8;
    border-radius: 5px;
    color: rgb(255, 255, 255);
  }
`;

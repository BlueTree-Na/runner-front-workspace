import styled from "styled-components";
export const Container = styled.div`
  display: flex;
  height: 100%;
  background-color: rgb(255, 255, 255);
`;

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-start;
  width: 100%;
  padding: 20px;
`;
export const ProfileCard = styled.div`
  margin-top: 50px;
  width: 300px;
  min-width: 250px;
  flex-shrink: 0;
  padding: 20px;
  background-color: #ffffff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  border-radius: 8px;
`;

export const ProfileImage = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #f9f9f9f9;
`;

export const Nickname = styled.h3`
  margin: 20px 0;
`;

export const HiddenInput = styled.input`
  margin: 20px 0;
  display: none;
`;

export const FileInput = styled.label`
  display: inline-block;
  margin-top: 10px;
  padding: 8px 12px;
  background-color: rgb(0, 162, 255);
  color: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: rgb(2, 55, 85);
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;
`;

export const SaveButton = styled.button`
  display: inline-block;
  margin-top: 10px;
  padding: 8px 12px;
  background-color: rgb(0, 200, 150);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: rgb(0, 150, 120);
  }
`;

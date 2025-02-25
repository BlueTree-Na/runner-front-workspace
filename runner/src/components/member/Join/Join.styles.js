import styled from "styled-components";

export const JoinContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 600px;
  margin: 80px auto 20px auto;
  padding: 20px;
  background-color: rgb(255, 255, 255);
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h2`
  font-size: 32px;
  font-weight: 600;
  margin: 10px 0 20px 0;
  color: #333;
  position: relative;
  padding-bottom: 8px;
  letter-spacing: 0.5px;
  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 50px;
    height: 3px;
    background-color: rgb(0, 162, 255);
    border-radius: 2px;
    transition: width 0.3s ease-in-out;
  }
  &:hover::after {
    width: 100%;
  }
`;

export const JoinWrapper = styled.form`
  display: flex;
  margin: 30px;
  flex-direction: column;
  width: 100%;
  gap: 3px;
`;

export const JoinLabel = styled.label`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
`;

export const JoinInput = styled.input`
  padding: 12px;
  width: 400px;
  margin-bottom: 10px;
  margin-left: 50px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  &:focus {
    outline: none;
    border-color: rgb(0, 162, 255);
  }
`;

export const JoinSelect = styled.select`
  padding: 12px;
  margin-left: 50px;
  width: 400px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  background-color: white;
  cursor: pointer;
  &:focus {
    outline: none;
    border-color: rgb(0, 162, 255);
  }
`;

export const JoinMessage = styled.span`
  color: red;
  font-size: 12px;
  margin-left: 50px;
  margin-bottom: 10px;
`;

export const JoinButton = styled.button`
  padding: 12px;
  background-color: rgb(0, 162, 255);
  color: white;
  width: 300px;
  margin: auto;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: rgb(2, 55, 85);
  }
`;

export const JoinCheckButton = styled.button`
  margin-left: 20px;
  margin-bottom: 10px;
  padding: 10px 12px;
  background-color: rgb(0, 162, 255);
  color: white;
  font-size: 14px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: rgb(2, 55, 85);
  }
`;

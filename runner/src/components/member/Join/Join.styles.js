import styled from "styled-components";

export const JoinContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 400px;
  margin: 80px auto 20px auto;
  padding: 20px;
  background-color: rgb(255, 255, 255);
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h2`
  font-size: 30px;
  font-weight: 550;
  margin: 10px;
  text-align: left;
`;

export const JoinWrapper = styled.form`
  display: flex;
  margin: 30px;
  flex-direction: column;
  width: 100%;
`;

export const JoinLabel = styled.label`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
`;

export const JoinInput = styled.input`
  padding: 12px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  &:focus {
    outline: none;
    border-color: #33bfe8;
  }
`;

export const JoinSelect = styled.select`
  padding: 12px;
  margin-bottom: 20px;
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
  margin-bottom: 10px;
`;

export const JoinButton = styled.button`
  padding: 12px;
  background-color: rgb(0, 162, 255);
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: rgb(2, 55, 85);
  }
`;

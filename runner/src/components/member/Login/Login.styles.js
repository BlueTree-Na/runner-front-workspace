import styled from "styled-components";

export const LoginContainer = styled.div`
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  background-color: #ffffff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
`;

export const LoginInput = styled.input`
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

export const LoginButton = styled.button`
  padding: 10px;
  background-color: #33bfe8;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: rgb(0, 162, 255);
  }
`;

export const ErrorMessage = styled.p`
  color: red;
  margin-bottom: 10px;
`;

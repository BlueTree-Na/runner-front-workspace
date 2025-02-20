// ProfileUpdateVerify.styles.js
import styled from "styled-components";

export const Container = styled.div`
  max-width: 400px;
  margin: 80px auto;
  padding: 40px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  text-align: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

export const Input = styled.input`
  height: 44px;
  margin-bottom: 20px;
  padding: 0 15px;
  font-size: 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #f7f7f7;
  transition: border-color 0.3s, background-color 0.3s;

  &:focus {
    outline: none;
    border-color: #00a2ff;
    background-color: #fff;
  }
`;

export const Button = styled.button`
  height: 44px;
  font-size: 1rem;
  background-color: #00a2ff;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0088d1;
  }
`;

export const ErrorMessage = styled.p`
  color: #e74c3c;
  font-size: 0.9rem;
  margin-top: 10px;
  text-align: center;
`;

export const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 10px;
  text-align: center;
`;

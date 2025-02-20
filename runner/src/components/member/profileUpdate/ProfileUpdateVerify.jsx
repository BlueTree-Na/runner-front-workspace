// ProfileUpdateVerify.jsx
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import {
  Container,
  Form,
  Input,
  Button,
  ErrorMessage,
  Title,
} from "./ProfileUpdateVerify.styles";

const ProfileUpdateVerify = () => {
  const { auth } = useContext(AuthContext);
  const [currentPassword, setCurrentPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleVerify = (e) => {
    e.preventDefault();
    setError("");

    axios
      .post(
        "http://localhost/members/verify-password", // 백엔드의 비밀번호 검증 엔드포인트
        { currentPassword },
        {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        }
      )
      .then((response) => {
        // 백엔드에서 { isValid: true }를 반환한다고 가정
        if (response.data.isValid) {
          // 검증 성공 → ProfileUpdate 페이지로 이동하면서 현재 비밀번호를 state에 전달
          navigate("/profileUpdate", {
            state: { verified: true, currentPassword },
          });
        } else {
          setError("비밀번호가 일치하지 않습니다.");
        }
      })
      .catch((error) => {
        console.error("비밀번호 검증 오류:", error);
        setError("비밀번호를 확인해주세요.");
      });
  };

  return (
    <Container>
      <Title>회원정보수정</Title>
      <Form onSubmit={handleVerify}>
        <Input
          type="password"
          placeholder="비밀번호를 입력해주세요."
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
        />
        <Button type="submit">확인하기</Button>
      </Form>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </Container>
  );
};

export default ProfileUpdateVerify;

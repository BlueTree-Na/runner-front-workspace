import {
  Container,
  Form,
  Input,
  Button,
  ErrorMessage,
} from "./DeleteAccount.styles";
import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const DeleteAccount = () => {
  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleDeleteAccount = (e) => {
    e.preventDefault();
    setError("");

    if (!window.confirm("회원 탈퇴 하시겠습니까?")) {
      return;
    }
    axios
      .delete("http://localhost/members", {
        data: {
          password,
        },
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      })
      .then(() => {
        alert("탈퇴가 완료되었습니다.");
        logout();
        navigate("/");
      })
      .catch((error) => {
        setError("탈퇴에 실패하였습니다.");
      });
  };
  return (
    <Container>
      <h2>회원 탈퇴</h2>
      <Form onSubmit={handleDeleteAccount}>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호 확인"
          required
        />
        <Button type="submit">회원 탈퇴</Button>
      </Form>
    </Container>
  );
};

export default DeleteAccount;

import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import {
  LoginButton,
  LoginContainer,
  LoginForm,
  LoginInput,
} from "./Login.styles";
import { Form } from "react-router-dom";
import { Nickname } from "../Mypage/Profile.styles";

const Login = () => {
  const [userId, setUserId] = useState("");
  const [userPwd, setUserPwd] = useState("");

  const { login } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost/members/login", {
        userId: userId,
        userPwd: userPwd,
      })
      .then((response) => {
        const { username, tokens } = response.data;
        login(username, tokens.accessToken, tokens.refreshToken);
        localStorage.setItem("nickname", username);
        alert(`${username}님 환영합니다!`);
        window.location = "/";
      })
      .catch((error) => {
        console.log(error);
        alert("로그인에 실패하였습니다. 아이디와 패스워드를 확인해주세요");
      });
  };

  return (
    <LoginContainer>
      <h2>로그인</h2>
      <LoginForm onSubmit={handleLogin}>
        <LoginInput
          type="text"
          onChange={(e) => setUserId(e.target.value)}
          value={userId}
          placeholder="아이디"
          required
        />
        <LoginInput
          type="password"
          onChange={(e) => setUserPwd(e.target.value)}
          value={userPwd}
          placeholder="비밀번호"
          required
        />
        <LoginButton type="submit">로그인</LoginButton>
      </LoginForm>
    </LoginContainer>
  );
};

export default Login;

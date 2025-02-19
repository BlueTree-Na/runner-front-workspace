import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import {
  LoginContainer,
  LoginForm,
  LoginInput,
  Title,
  LoginButton,
} from "./Login.styles";
import NaverLogin from "./NaverLogin";

const Login = () => {
  const [userId, setUserId] = useState("");
  const [userPwd, setUserPwd] = useState("");
  const { login } = useContext(AuthContext);

  // state 임의 문자열 생성
  const generateRandomState = (length = 16) => {
    return [...Array(length)].map(() => Math.random().toString(36)[2]).join("");
  };

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

  // 네이버 로그인 페이지로 이동하는 함수 (Authorization Code Flow)
  const handleNaverLogin = () => {
    const CLIENT_ID = "S55AvttZtL3b87wDRQaD";
    const CALLBACK_URL = "http://localhost:80/members/naver/oauth";
    const STATE = generateRandomState(16);

    window.location.href =
      `https://nid.naver.com/oauth2.0/authorize` +
      `?response_type=code` +
      `&client_id=${CLIENT_ID}` +
      `&redirect_uri=${encodeURIComponent(CALLBACK_URL)}` +
      `&state=${STATE}`;
  };

  return (
    <LoginContainer>
      <Title>로그인</Title>
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

      {/* 네이버 로그인 버튼 */}
      <div style={{ marginTop: "20px" }}>
        <NaverLogin onClick={handleNaverLogin}>네이버 로그인</NaverLogin>
      </div>
    </LoginContainer>
  );
};

export default Login;

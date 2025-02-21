import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  LoginContainer,
  LoginForm,
  LoginInput,
  Title,
  LoginButton,
} from "./Login.styles";

const Login = () => {
  const [userId, setUserId] = useState("");
  const [userPwd, setUserPwd] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // script.src = "https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.2.js";
    // if (window.naver) {
    //   const naverLogin = new window.naver.LoginWithNaverId({
    //     clientId: "S55AvttZtL3b87wDRQaD",
    //     callbackUrl: "http://localhost:3000/auth",
    //     isPopup: false,
    //     loginButton: { color: "green", type: 3, height: 40 },
    //   });
    //   naverLogin.init();
    // }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost/members/login", {
        userId: userId,
        userPwd: userPwd,
      })
      .then((response) => {
        console.log("서버 응답:", response.data);
        console.log("로그인 성공, 메인으로 이동");

        const { username, tokens } = response.data;
        login(username, tokens.accessToken, tokens.refreshToken);
        localStorage.setItem("nickname", username);
        alert(`${username}님 환영합니다!`);

        navigate("/main"); // 또는 window.location.href = "/main";
      })

      .catch((error) => {
        console.log(error);
        alert("로그인에 실패하였습니다. 아이디와 패스워드를 확인해주세요");
      });
  };

  // 네이버 로그인 URL 요청 및 이동
  const handleNaverLogin = async () => {
    try {
      const response = await axios.get(
        "http://localhost/members/naver/login-url"
      );
      window.location.href = response.data; // 네이버 로그인 페이지로 이동
    } catch (error) {
      console.error("네이버 로그인 URL을 가져오는 중 오류 발생:", error);
      alert("네이버 로그인 요청 중 오류가 발생했습니다.");
    }
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

      {/* 네이버 공식 로그인 버튼 (자동 렌더링) */}
      <div id="naver_id_login" style={{ marginTop: "20px" }}></div>

      {/* 네이버 로그인 버튼 (백엔드에서 URL 생성) */}
      <div style={{ marginTop: "20px" }}>
        <LoginButton
          onClick={handleNaverLogin}
          style={{ backgroundColor: "green" }}
        >
          네이버 로그인
        </LoginButton>
      </div>
    </LoginContainer>
  );
};
export default Login;

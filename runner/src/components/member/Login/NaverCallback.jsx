import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const NaverCallback = () => {
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // 로그인 처리 함수 가져오기

  useEffect(() => {
    // 1) URL에서 code와 state 추출
    const query = new URLSearchParams(location.search);
    const code = query.get("code");
    const state = query.get("state");

    // 2) localStorage에 저장해둔 state 가져오기
    const storedState = localStorage.getItem("naverState");

    // 3) 기본 검증
    if (!code || !state) {
      setError("code 또는 state 파라미터가 없습니다.");
      return;
    }
    if (!storedState) {
      setError("localStorage에 저장된 state 값이 없습니다.");
      return;
    }
    if (storedState !== state) {
      setError("state 값이 일치하지 않습니다. 보안 상 문제 발생.");
      return;
    }

    // 4) 백엔드에 code와 state 전달하여 토큰 발급
    axios
      .get(`http://localhost/members/naver/oauth?code=${code}&state=${state}`)
      .then((response) => {
        console.log("네이버 로그인 응답:", response.data);
        const data = response.data;

        // 예: 서버가 { accessToken, refreshToken, nickname, ... } 형태로 반환한다고 가정
        const accessToken = data.accessToken;
        const refreshToken = data.refreshToken;
        const nickname = data.nickname || data.userName || "네이버사용자";

        if (!accessToken) {
          setError("토큰을 가져오지 못했습니다.");
          return;
        }

        // 5) AuthContext 업데이트 및 localStorage 저장
        login(nickname, accessToken, refreshToken);
        localStorage.setItem("nickname", nickname);
        alert(`${nickname}님 환영합니다!`);

        // 6) 메인 페이지로 이동
        navigate("/");
      })
      .catch((err) => {
        setError(err.message);
      });
  }, [location, login, navigate]);

  return (
    <div>{error && <div style={{ color: "red" }}>에러: {error}</div>}</div>
  );
};

export default NaverCallback;

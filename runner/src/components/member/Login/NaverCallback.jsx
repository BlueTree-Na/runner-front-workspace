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
    // URL에서 code와 state 추출
    const query = new URLSearchParams(location.search);
    const code = query.get("code");
    const state = query.get("state");

    if (!code || !state) {
      setError("code 또는 state 파라미터가 없습니다.");
      return;
    }

    axios
      .get(`http://localhost/members/naver/oauth?code=${code}&state=${state}`)

      .then((data) => {
        console.log("네이버 로그인 응답:", data); // 응답 확인

        // accessToken이 존재하면 저장하고 메인으로 이동
        if (1) {
          console.log("accessToken:", data.accessToken);
          console.log("refreshToken:", data.refreshToken);
          login(null, data.accessToken, data.refreshToken);
          alert("네이버 로그인 성공!");

          navigate("http://localhost:3000/"); // 메인 페이지로 이동
        } else {
          setError("토큰을 가져오지 못했습니다.");
        }
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
      });
  }, [location, login, navigate]);

  return (
    <div>
      <h1>네이버 로그인 콜백</h1>
      {error && <div style={{ color: "red" }}>에러: {error}</div>}
      {!error && <p>로그인 처리 중...</p>}
    </div>
  );
};

export default NaverCallback;

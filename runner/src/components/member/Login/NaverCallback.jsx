import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const NaverCallback = () => {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    // URL 쿼리 파라미터에서 code와 state 추출
    const query = new URLSearchParams(location.search);
    const code = query.get("code");
    const state = query.get("state");

    if (!code || !state) {
      setError("code 또는 state 파라미터가 없습니다.");
      return;
    }

    fetch(`/naver/oauth?code=${code}&state=${state}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP 에러: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setResult(data);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
      });
  }, [location]);

  return (
    <div>
      <h1>네이버 로그인 콜백</h1>
      {error && <div style={{ color: "red" }}>에러: {error}</div>}
      {result ? (
        <div>
          <h2>로그인 성공</h2>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      ) : (
        !error && <p>로딩 중...</p>
      )}
    </div>
  );
};

export default NaverCallback;

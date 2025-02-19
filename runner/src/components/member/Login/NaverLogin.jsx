import React, { useEffect } from "react";

const NaverLogin = () => {
  useEffect(() => {
    // 네이버 로그인 스크립트 동적 로드
    const naverScript = document.createElement("script");
    naverScript.src =
      "https://static.nid.naver.com/js/naverLogin_implicit-1.0.3.js";
    naverScript.type = "text/javascript";
    naverScript.charset = "utf-8";
    document.body.appendChild(naverScript);

    naverScript.onload = () => {
      if (window.naver_id_login) {
        const CLIENT_ID = "S55AvttZtL3b87wDRQaD";
        const CALLBACK_URL = "http://localhost:80/members/naver/oauth";
        const SERVICE_URL = "http://localhost:80";

        const naverLoginInstance = new window.naver_id_login(
          CLIENT_ID,
          CALLBACK_URL
        );
        const state = naverLoginInstance.getUniqState();
        naverLoginInstance.setButton("green", 3, 40);
        naverLoginInstance.setDomain(SERVICE_URL);
        naverLoginInstance.setState(state);
        naverLoginInstance.setPopup();
        naverLoginInstance.init_naver_id_login();
      }
    };

    // 초기화
    return () => {
      document.body.removeChild(naverScript);
    };
  }, []);

  return (
    <div>
      {/* 네이버 로그인 버튼이 노출될 영역 */}
      <div id="naver_id_login"></div>
    </div>
  );
};

export default NaverLogin;

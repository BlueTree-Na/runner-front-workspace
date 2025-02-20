import React, { useEffect } from "react";

const NaverLogin = () => {
  //   useEffect(() => {
  //     // 네이버 로그인 스크립트 동적 로드
  //     const script = document.createElement("script");
  //     script.src = "https://static.nid.naver.com/js/naverLogin_implicit-1.0.3.js";
  //     script.async = true;
  //     script.charset = "utf-8";
  //     document.body.appendChild(script);
  //     //   window.location.href =
  //     //"https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=S55AvttZtL3b87wDRQaD&redirect_uri=http%3A%2F%2Flocalhost%3A80%2Fmembers%2Fnaver%2Foauth&state=cwciuwriiykg34uc";
  //     script.onload = () => {
  //       if (window.naver_id_login) {
  //         const CLIENT_ID = "S55AvttZtL3b87wDRQaD";
  //         const CALLBACK_URL = "http://localhost:80/members/naver/oauth";
  //         const naverLogin = new window.naver_id_login(CLIENT_ID, CALLBACK_URL);
  //         naverLogin.setButton("green", 3, 40);
  //         const state = Math.random().toString(36).substring(2, 18);
  //         naverLogin.setState(state);
  //         naverLogin.setPopup();
  //         naverLogin.init_naver_id_login();
  //       }
  //     };
  //     return () => {
  //       document.body.removeChild(script);
  //     };
  //   }, []);
  //   return (
  //     <div>
  //       {/* 네이버 공식 로그인 버튼이 렌더링될 영역 */}
  //       <div id="naver_id_login"></div>
  //     </div>
  //   );
};
export default NaverLogin;

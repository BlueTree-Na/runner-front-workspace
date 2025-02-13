import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Mypage from "./components/member/Mypage/Mypage";
import Login from "./components/member/Login/Login";
import Join from "./components/member/Join/Join";
import { AuthProvider } from "./components/member/context/AuthContext";
import CollapsibleExample from "./components/Header/Header";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <CollapsibleExample />
        <Routes>
          <Route path="mypage" element={<Mypage />} />
          <Route path="login" element={<Login />} />
          <Route path="join" element={<Join />} />
          {/* 네이버 로그인 콜백 처리 경로 }
          <Route
            path="naver-callback"
            element={<h2>네이버 로그인 처리 중...</h2>}
          />

          {/*<Route path="profileUpate" element={<ProfileUpdate />} /> */}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

import logo from "./logo.svg";
import "./App.css";
import { AuthProvider } from "./components/member/context/AuthContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProfileUpdate from "./components/member/profileUpdate/ProfileUpdate";
import Mypage from "./components/member/Mypage/Mypage";
import Join from "./components/member/Join/Join";
import CollapsibleExample from "./components/Header/Header";
import NaverLogin from "./components/member/Login/NaverLogin";
import NaverCallback from "./components/member/Login/NaverCallback";
import Login from "./components/member/Login/Login";
import ChangePassword from "./components/member/profileUpdate/PasswordUpdate";
import ProfileUpdateVerify from "./components/member/profileUpdate/ProfileUpdateVerify";
import DeleteAccount from "./components/member/Mypage/DeleteAccount";
import ScheduleList from "./components/Schedule/ScheduleList";
import ScheduleDetail from "./components/Schedule/ScheduleDetail";
import RunningList from "./components/RunningCourse/RunningList";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <CollapsibleExample />
        <Routes>
          <Route path="mypage" element={<Mypage />} />
          <Route path="login" element={<Login />} />
          <Route path="join" element={<Join />} />
          <Route path="profileUpdate" element={<ProfileUpdate />} />
          <Route path="NaverLogin" element={<NaverLogin />} />
          <Route path="NaverCallback" element={<NaverCallback />} />
          <Route path="passwordUpdate" element={<ChangePassword />} />

          <Route path="profileUpdateVerify" element={<ProfileUpdateVerify />} />
          <Route path="profileUpate" element={<ProfileUpdate />} />
          <Route path="deleteAccount" element={<DeleteAccount />} />

          <Route path="/course" element={<RunningList />} />
          <Route path="/schedule" element={<ScheduleList />} />
          <Route path="/schedule/:id" element={<ScheduleDetail />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

import { useContext, useState } from "react";
import { SbTitle, SbTitleMenu, SbTitleMenuItem } from "./Sidebar.styles";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Sidebar2 = () => {
  const navigate = useNavigate();
  const { auth, logout } = useContext(AuthContext);

  const menuItems = [
    { name: "개인정보수정", path: "/profileUpdate" },
    { name: "내가 쓴 글", path: "/my" },
    { name: "랜덤매칭", path: "/reviews" },
    { name: "관리자", path: "/favorites" },
    { name: "로그아웃", path: "logout" },
    { name: "회원탈퇴", path: "/deleteAccount" },
  ];
  // 로그아웃
  const handleLogout = () => {
    if (window.confirm("정말 로그아웃 하시겠습니까?")) {
      logout();
      navigate("/");
    }
  };

  return (
    <div>
      <SbTitle>마이 로그 🚵‍♂️ </SbTitle>
      <SbTitleMenu>
        {menuItems.map((item, index) => (
          <SbTitleMenuItem
            key={index}
            onClick={
              () =>
                item.path === "logout" ? handleLogout() : navigate(item.path) // 로그아웃
            }
          >
            {item.name}
          </SbTitleMenuItem>
        ))}
      </SbTitleMenu>
    </div>
  );
};

export default Sidebar2;

import { useState } from "react";
import { SbTitle, SbTitleMenu, SbTitleMenuItem } from "./Sidebar.styles";
import { useNavigate } from "react-router-dom";

const Sidebar2 = () => {
  const navigate = useNavigate();

  const menuItems = [
    { name: "개인정보수정", path: "/profile" },
    { name: "내가 쓴 글", path: "/my" },
    { name: "내가 쓴 글", path: "/my" },
    { name: "랜덤매칭", path: "/reviews" },
    { name: "관리자", path: "/favorites" },
  ];

  return (
    <div>
      <SbTitle>마이 로그 🚵‍♂️ </SbTitle>
      <SbTitleMenu>
        {menuItems.map((item, index) => (
          <SbTitleMenuItem key={index} onClick={() => navigate(item.path)}>
            {item.name}
          </SbTitleMenuItem>
        ))}
      </SbTitleMenu>
    </div>
  );
};

export default Sidebar2;

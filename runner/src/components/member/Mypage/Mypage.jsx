import { useState } from "react";
import Sidebar from "./Sidebar";
import Profile from "./Profile";
import UserPosts from "./UserPosts";
import { Container, Content } from "./Mypage.styles";

const Mypage = () => {
  return (
    <Container>
      <Sidebar />
      <Content>
        <Profile />
        <UserPosts />
      </Content>
    </Container>
  );
};

export default Mypage;

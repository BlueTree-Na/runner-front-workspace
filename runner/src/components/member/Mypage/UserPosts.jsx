import { useState } from "react";
import { UserPostsContainer, Title, Content } from "./UserPosts.styles";

const UserPosts = () => {
  return (
    <UserPostsContainer>
      <Title>내가 쓴 글</Title>
      <Content>작성한 글 목록</Content>

      <Title>내가 쓴 댓글</Title>
      <Content>작성한 댓글 목록</Content>
    </UserPostsContainer>
  );
};

export default UserPosts;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ProfileCard,
  ProfileImage,
  Nickname,
  HiddenInput,
  FileInput,
} from "./Profile.styles";

const Profile = () => {
  const [nickname, setNickname] = useState("닉네임");
  const [profileImage, setProfileImage] = useState("/default-profile.png");
  const [selectedFile, setSelectFile] = useState(null);
  const navigate = useNavigate(); // ✅ 네비게이션 함수 사용

  useEffect(() => {
    fetch("/api/user/profile")
      .then((response) => response.json())
      .then((data) => {
        console.log("API 응답 데이터:", data); // 콘솔에서 API 데이터 확인
        setNickname(data.nickname);
        setProfileImage(data.profileImage || "/default-profile.png");
      })
      .catch((error) => console.error("API 호출 오류:", error));
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setSelectFile(file);
    const imageUrl = URL.createObjectURL(file);
    setProfileImage(imageUrl); // 화면에서 즉시 미리보기 반영

    // 파일을 서버로 업로드
    const formData = new FormData();
    formData.append("file", file);

    fetch("/api/user/upload-profile", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("업로드 성공:", data);
        setProfileImage(data.profileImageUrl); // 서버에서 반환된 이미지 URL 적용
      })
      .catch((error) => {
        console.error("업로드 실패:", error);
      });
  };

  // 설정 버튼 클릭
  const goToEditPage = () => {
    navigate("/memberUpdate");
  };

  return (
    <ProfileCard>
      <ProfileImage
        src={profileImage}
        alt="Profile"
        onError={(e) => (e.target.src = "/default-profile.png")}
      />
      <Nickname>{nickname}</Nickname>

      {/* ✅ 설정 버튼 클릭 시 수정 페이지로 이동 */}
      <FileInput onClick={goToEditPage}>설정</FileInput>

      {/* 파일 선택 버튼 */}
      <HiddenInput
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        id="fileInput"
      />
      <FileInput htmlFor="fileInput">프로필 변경</FileInput>
    </ProfileCard>
  );
};

export default Profile;

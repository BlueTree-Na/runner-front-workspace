import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  ProfileCard,
  ProfileImage,
  Nickname,
  FileInput,
  ButtonContainer,
  SaveButton,
} from "./Profile.styles";

const Profile = () => {
  const [nickname, setNickname] = useState("닉네임");
  const [profileImage, setProfileImage] = useState("/default-profile.png");
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/user/profile")
      .then((response) => response.json())
      .then((data) => {
        console.log("API 응답 데이터:", data);
        setNickname(data.nickname);
        setProfileImage(data.profileImage || "/default-profile.png");
      })
      .catch((error) => console.error("API 호출 오류:", error));
  }, []);

  // 프로필 이미지 클릭 시 파일 선택 다이얼로그 열기
  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // 파일 선택 시 미리보기 및 상태 업데이트
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  // 저장 버튼 클릭 시 서버에 이미지 업로드
  const handleSaveImage = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("profileImage", selectedFile);

      axios
        .post("/api/user/uploadProfile", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => {
          console.log("프로필 이미지 업로드 성공:", response.data);

          setSelectedFile(null);
        })
        .catch((error) => {
          console.error("프로필 이미지 업로드 실패:", error);
        });
    }
  };

  // 개인정보수정 버튼
  const goToUpdatePage = () => {
    navigate("/ProfileUpdateVerify");
  };

  // 비밀번호변경 버튼
  const goToPassWordPage = () => {
    navigate("/passwordUpdate");
  };

  return (
    <ProfileCard>
      <ProfileImage
        src={profileImage}
        alt="Profile"
        onClick={handleImageClick}
        onError={(e) => (e.target.src = "/default-profile.png")}
      />
      {/* 숨겨진 파일 입력 */}
      <input
        type="file"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
      />
      {/* 파일 선택 후 저장 버튼 표시 */}
      {selectedFile && (
        <SaveButton onClick={handleSaveImage}>프로필 이미지 저장</SaveButton>
      )}
      <Nickname>{nickname}</Nickname>
      <ButtonContainer>
        <FileInput onClick={goToUpdatePage}>개인정보수정</FileInput>
        <FileInput onClick={goToPassWordPage}>비밀번호변경</FileInput>
      </ButtonContainer>
    </ProfileCard>
  );
};
export default Profile;

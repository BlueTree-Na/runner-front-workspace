import { useState, useContext, useEffect } from "react";
import axios from "axios";
import {
  JoinContainer,
  JoinWrapper,
  ProfileContainer,
  ProfileImage,
  ProfileInput,
  UploadLabel,
  JoinLabel,
  JoinInput,
  JoinSelect,
  JoinButton,
} from "./ProfileUpdate.styels";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProfileUpdate = () => {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  const [nickName, setNickName] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [profileImage, setProfileImage] = useState("/default-profile.png");
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost/members/profile", {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      })
      .then((response) => {
        const data = response.data;
        setNickName(data.nickName || "");
        setGender(data.gender || "");
        setPhone(data.phone || "");

        if (data.profileImage) {
          setProfileImage(data.profileImage);
        }
      })
      .catch((error) => {
        console.error("프로필 정보를 불러오는데 실패했습니다.", error);
      });
  }, [auth.accessToken]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSelectedFile(file);
    const imageUrl = URL.createObjectURL(file);
    setProfileImage(imageUrl);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("nickName", nickName);
    formData.append("gender", gender);
    formData.append("phone", phone);
    if (selectedFile) {
      formData.append("file", selectedFile);
    }

    axios
      .put("http://localhost/members/profileUpdate", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${auth.accessToken}`,
        },
      })
      .then(() => {
        alert("회원 정보가 수정되었습니다.");
        navigate("/mypage");
      })
      .catch((error) => {
        console.error("업데이트 실패:", error);
        alert("회원 정보 수정에 실패하였습니다.");
      });
  };

  return (
    <JoinContainer>
      <h2>회원정보 수정</h2>
      <JoinWrapper onSubmit={handleSubmit}>
        <ProfileContainer>
          <ProfileImage src={profileImage} alt="프로필 미리보기" />
          <ProfileInput
            type="file"
            id="fileInput"
            accept="image/*"
            onChange={handleImageUpload}
          />
          <UploadLabel htmlFor="fileInput">프로필 변경</UploadLabel>
        </ProfileContainer>

        <JoinLabel>닉네임</JoinLabel>
        <JoinInput
          type="text"
          value={nickName}
          onChange={(e) => setNickName(e.target.value)}
          placeholder="닉네임을 입력하세요."
        />

        <JoinLabel>성별</JoinLabel>
        <JoinSelect value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="">선택</option>
          <option value="남성">남성</option>
          <option value="여성">여성</option>
        </JoinSelect>

        <JoinLabel>전화번호</JoinLabel>
        <JoinInput
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="전화번호를 입력하세요."
        />

        <JoinButton type="submit">수정하기</JoinButton>
      </JoinWrapper>
    </JoinContainer>
  );
};

export default ProfileUpdate;

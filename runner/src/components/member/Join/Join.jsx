import { useState } from "react";
import axios from "axios";
import {
  JoinContainer,
  JoinButton,
  JoinInput,
  JoinLabel,
  JoinWrapper,
  JoinMessage,
  JoinSelect,
  Title,
} from "./Join.styles";
import { Navigate, useNavigate } from "react-router-dom";
const Join = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [userPwd, setUserPwd] = useState("");
  const [pwdConfirm, setPwdConfirm] = useState("");
  const [userName, setUserName] = useState("");
  const [nickName, setNickName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState("");
  const [idError, setIdError] = useState("");
  const [pwdError, setPwdError] = useState("");
  const [nameError, setNameError] = useState("");
  const [nickNameError, setNickNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // 비밀번호 확인 (프론트엔드에서 먼저 체크)
    if (userPwd !== pwdConfirm) {
      setErrors((prev) => ({
        ...prev,
        userPwd: "비밀번호가 일치하지 않습니다.",
      }));
      return;
    }

    axios
      .post("http://localhost:/members", {
        userId: userId,
        userPwd: userPwd,
        userName: userName,
        nickName: nickName,
        gender: gender,
        email: email,
        phone: phone,
      })
      .then((response) => {
        //console.log(response);
        alert("회원가입이 완료되었습니다.");
        setErrors({});

        navigate("/login");
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          setErrors(error.response.data); // 백엔드에서 받은 오류 메시지를 상태에 저장
        } else {
          alert("회원가입에 실패했습니다. 다시 시도해주세요.");
        }
      });
  };
  return (
    <JoinContainer>
      <Title>회원가입</Title>
      <JoinWrapper onSubmit={handleSubmit}>
        <JoinLabel>이름*</JoinLabel>
        <JoinInput
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="이름을 입력하세요."
          required
        />
        {errors.phone && <JoinMessage>{errors.phone}</JoinMessage>} <br />
        <JoinLabel>아이디*</JoinLabel>
        <JoinInput
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="아이디를 입력하세요."
          maxLength="15"
        />
        {errors.userId && <JoinMessage>{errors.userId}</JoinMessage>}
        {errors.duplicate && <JoinMessage>{errors.duplicate}</JoinMessage>}
        <br />
        <JoinLabel>비밀번호*</JoinLabel>
        <JoinInput
          type="password"
          value={userPwd}
          onChange={(e) => setUserPwd(e.target.value)}
          placeholder="비밀번호를 입력하세요."
          maxLength="20"
        />
        {errors.userPwd && <JoinMessage>{errors.userPwd}</JoinMessage>} <br />
        <JoinLabel>비밀번호 확인*</JoinLabel>
        <JoinInput
          type="password"
          value={pwdConfirm}
          onChange={(e) => setPwdConfirm(e.target.value)}
          placeholder="비밀번호를 입력하세요"
          maxLength="20"
        />
        {errors.pwdConfirm && <JoinMessage>{errors.pwdConfirm}</JoinMessage>}{" "}
        <br />
        <JoinLabel>닉네임*</JoinLabel>
        <JoinInput
          type="text"
          value={nickName}
          onChange={(e) => setNickName(e.target.value)}
          placeholder="닉네임을 입력하세요."
        />
        {errors.nickName && <JoinMessage>{errors.nickName}</JoinMessage>}
        {errors.duplicate && <JoinMessage>{errors.duplicate}</JoinMessage>}{" "}
        <br />
        <JoinLabel>성별</JoinLabel>
        <JoinSelect value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="">선택</option>
          <option value="F">F</option>
          <option value="M">M</option>
        </JoinSelect>
        <JoinLabel>이메일*</JoinLabel>
        <JoinInput
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="test@naver.com"
        />
        {emailError && <JoinMessage>{emailError}</JoinMessage>} <br />
        <JoinLabel>전화번호*</JoinLabel>
        <JoinInput
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="010-1234-5678"
          maxLength="13"
        />
        {errors.phone && <JoinMessage>{errors.phone}</JoinMessage>} <br />
        <JoinButton type="submit">가입하기</JoinButton>
      </JoinWrapper>
    </JoinContainer>
  );
};

export default Join;

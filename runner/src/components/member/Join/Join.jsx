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
import { Navigate } from "react-router-dom";
const Join = () => {
  const [userId, setUserId] = useState("");
  const [userPwd, setUserPwd] = useState("");
  const [pwdConfirm, setPwdConfirm] = useState("");
  const [userName, setUserName] = useState("");
  const [nickName, setNickName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [idError, setIdError] = useState("");
  const [pwdError, setPwdError] = useState("");
  const [nameError, setNameError] = useState("");
  const [nickNameError, setNickNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (userPwd !== pwdConfirm) {
      setPwdError("비밀번호가 일치하지 않습니다.");
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
        alert(response.data);
        Navigate("/main");
        setIdError("");
        setPwdError("");
        setNameError("");
        setNickNameError("");
        setEmailError("");
        setPhoneError("");
      })
      .catch((error) => {
        console.log(error);
        if (error.response && error.response.data) {
          const errors = error.response.data;
          setIdError(errors.userId || "");
          setPwdError(errors.userPwd || "");
          setNameError(errors.userName || "");
          setNickNameError(errors.nickName || "");
          setEmailError(errors.email || "");
          setPhoneError(errors.phone || "");
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
        {nameError && <JoinMessage>{nameError}</JoinMessage>} <br />
        <JoinLabel>아이디*</JoinLabel>
        <JoinInput
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="아이디를 입력하세요."
        />
        {idError && <JoinMessage>{idError}</JoinMessage>} <br />
        <JoinLabel>비밀번호*</JoinLabel>
        <JoinInput
          type="password"
          value={userPwd}
          onChange={(e) => setUserPwd(e.target.value)}
          placeholder="비밀번호를 입력하세요."
        />
        <JoinLabel>비밀번호 확인*</JoinLabel>
        <JoinInput
          type="password"
          value={pwdConfirm}
          onChange={(e) => setPwdConfirm(e.target.value)}
          placeholder="비밀번호를 입력하세요"
        />
        {pwdError && <JoinMessage>{pwdError}</JoinMessage>} <br />
        <JoinLabel>닉네임*</JoinLabel>
        <JoinInput
          type="text"
          value={nickName}
          onChange={(e) => setNickName(e.target.value)}
          placeholder="닉네임을 입력하세요."
        />
        {nickNameError && <JoinMessage>{nickNameError}</JoinMessage>} <br />
        <JoinLabel>성별</JoinLabel>
        <JoinSelect value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="">선택</option>
          <option value="남성">남성</option>
          <option value="여성">여성</option>
        </JoinSelect>
        <JoinLabel>이메일*</JoinLabel>
        <JoinInput
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일을 입력하세요."
        />
        {emailError && <JoinMessage>{emailError}</JoinMessage>} <br />
        <JoinLabel>전화번호*</JoinLabel>
        <JoinInput
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="전화번호를 입력하세요."
        />
        {phoneError && <JoinMessage>{phoneError}</JoinMessage>} <br />
        <JoinButton type="submit">가입하기</JoinButton>
      </JoinWrapper>
    </JoinContainer>
  );
};

export default Join;

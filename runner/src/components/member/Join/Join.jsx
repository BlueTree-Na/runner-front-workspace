import { useState } from "react";

import axios from "axios";
import {
  JoinContainer,
  JoinButton,
  JoinInput,
  JoinLabel,
  JoinWrapper,
  JoinCheckButton,
  JoinMessage,
  JoinSelect,
  Title,
} from "./Join.styles";
import { useNavigate } from "react-router-dom";
import EmailInput from "./EmailInput";

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

  const [errors, setErrors] = useState({});
  const [idAvailable, setIdAvailable] = useState(null);
  const [emailAvailable, setEmailAvailable] = useState(null);
  const [nickAvailable, setNickAvailable] = useState(null);

  // 중복 체크 핸들러
  const handleCheckDuplicate = (field, value) => {
    if (!value.trim()) {
      alert(`${field} 값을 먼저 입력해주세요.`);
      return;
    }
    axios
      .get(
        `http://localhost:/members/check-duplicate?field=${field}&value=${value}`
      )
      .then((response) => {
        const available = response.data.available;
        if (field === "id") {
          setIdAvailable(available);
        } else if (field === "email") {
          setEmailAvailable(available);
        } else if (field === "nickname") {
          setNickAvailable(available);
        }
        if (available) {
          alert(`${field} 사용 가능합니다.`);
          setErrors((prev) => ({ ...prev, [field]: "" }));
        } else {
          alert(`이미 사용 중인 ${field}입니다.`);
          setErrors((prev) => ({
            ...prev,
            [field]: `이미 사용 중인 ${field}입니다.`,
          }));
        }
      })
      .catch((error) => {
        console.error(`${field} 중복 체크 에러:`, error);
        alert(`${field} 중복 체크에 실패했습니다.`);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!userName.trim()) {
      newErrors.userName = "이름을 입력해주세요.";
    } else if (userName.length > 20) {
      newErrors.userName = "이름은 20자 이하로 입력해주세요.";
    } else if (!/^[a-zA-Z가-힣]+$/.test(userName)) {
      newErrors.userName = "이름은 영문과 한글만 사용할 수 있습니다.";
    }

    if (!userId.trim()) {
      newErrors.id = "아이디를 입력해주세요.";
    } else if (userId.length < 4 || userId.length > 15) {
      newErrors.id = "아이디는 4자 이상 15자 이하이어야 합니다.";
    } else if (!/^[a-zA-Z0-9]+$/.test(userId)) {
      newErrors.id = "아이디는 영문자와 숫자로만 구성되어야 합니다.";
    } else if (idAvailable === false) {
      newErrors.id = "이미 사용 중인 아이디입니다.";
    }

    if (!userPwd.trim()) {
      newErrors.userPwd = "비밀번호를 입력해주세요.";
    } else if (userPwd.length < 8 || userPwd.length > 20) {
      newErrors.userPwd = "비밀번호는 8자 이상 20자 이하이어야 합니다.";
    }

    if (userPwd !== pwdConfirm) {
      newErrors.pwdConfirm = "비밀번호가 일치하지 않습니다.";
    }

    if (!nickName.trim()) {
      newErrors.nickname = "닉네임을 입력해주세요.";
    } else if (nickName.length < 2 || nickName.length > 15) {
      newErrors.nickname = "닉네임은 2자 이상 15자 이하이어야 합니다.";
    } else if (!/^[a-zA-Z0-9가-힣]+$/.test(nickName)) {
      newErrors.nickname = "닉네임은 영문, 숫자, 한글만 가능합니다.";
    } else if (nickAvailable === false) {
      newErrors.nickname = "이미 사용 중인 닉네임입니다.";
    }

    if (!email.trim()) {
      newErrors.email = "이메일을 입력해주세요.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "유효한 이메일 형식을 입력해주세요.";
    } else if (emailAvailable === false) {
      newErrors.email = "이미 사용 중인 이메일입니다.";
    }

    if (!phone.trim()) {
      newErrors.phone = "전화번호를 입력해주세요.";
    } else if (phone.length !== 13) {
      newErrors.phone = "전화번호는 하이픈 포함 13자리여야 합니다.";
    } else if (!/^01[0-9]-[0-9]{4}-[0-9]{4}$/.test(phone)) {
      newErrors.phone = "전화번호는 010-1234-5678 형식으로 입력해주세요.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    axios
      .post("http://localhost:/members", {
        userId,
        userPwd,
        userName,
        nickName,
        gender,
        email,
        phone,
      })
      .then((response) => {
        alert("회원가입이 완료되었습니다.");
        setErrors({});
        navigate("/login");
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          setErrors(error.response.data);
        } else {
          alert("회원가입에 실패했습니다. 다시 시도해주세요.");
        }
      });
  };

  return (
    <JoinContainer>
      <Title> Runners </Title>
      <JoinWrapper onSubmit={handleSubmit}>
        <JoinLabel>이름 *</JoinLabel>
        <JoinInput
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="이름을 입력하세요."
          required
        />
        {errors.userName && <JoinMessage>{errors.userName}</JoinMessage>}
        <br />

        <JoinLabel>아이디 *</JoinLabel>
        <div style={{ display: "flex", alignItems: "center" }}>
          <JoinInput
            type="text"
            value={userId}
            onChange={(e) => {
              setUserId(e.target.value);
              setIdAvailable(null);
            }}
            placeholder="아이디를 입력하세요."
            maxLength="15"
          />
          <JoinCheckButton
            type="button"
            onClick={() => handleCheckDuplicate("id", userId)}
          >
            중복 체크
          </JoinCheckButton>
        </div>
        {errors.id && <JoinMessage>{errors.id}</JoinMessage>}
        <br />

        <JoinLabel>비밀번호 *</JoinLabel>
        <JoinInput
          type="password"
          value={userPwd}
          onChange={(e) => setUserPwd(e.target.value)}
          placeholder="비밀번호를 입력하세요."
          maxLength="20"
        />
        {errors.userPwd && <JoinMessage>{errors.userPwd}</JoinMessage>}
        <br />

        <JoinLabel>비밀번호 확인 *</JoinLabel>
        <JoinInput
          type="password"
          value={pwdConfirm}
          onChange={(e) => setPwdConfirm(e.target.value)}
          placeholder="비밀번호를 확인하세요."
          maxLength="20"
        />
        {errors.pwdConfirm && <JoinMessage>{errors.pwdConfirm}</JoinMessage>}
        <br />

        <JoinLabel>닉네임 *</JoinLabel>
        <div style={{ display: "flex", alignItems: "center" }}>
          <JoinInput
            type="text"
            value={nickName}
            onChange={(e) => {
              setNickName(e.target.value);
              setNickAvailable(null);
            }}
            placeholder="닉네임을 입력하세요."
          />
          <JoinCheckButton
            type="button"
            onClick={() => handleCheckDuplicate("nickname", nickName)}
          >
            중복 체크
          </JoinCheckButton>
        </div>
        {errors.nickname && <JoinMessage>{errors.nickname}</JoinMessage>}
        <br />

        <JoinLabel>성별</JoinLabel>
        <JoinSelect value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="">선택</option>
          <option value="남성">남성</option>
          <option value="여성">여성</option>
        </JoinSelect>
        <br />

        <JoinLabel>이메일 *</JoinLabel>
        <div style={{ display: "flex", alignItems: "center" }}>
          <EmailInput value={email} onChange={setEmail} />
          <JoinCheckButton
            type="button"
            onClick={() => handleCheckDuplicate("email", email)}
            style={{ marginLeft: "10px" }}
          >
            중복 체크
          </JoinCheckButton>
        </div>
        {errors.email && <JoinMessage>{errors.email}</JoinMessage>}
        <br />
        <JoinLabel>전화번호 *</JoinLabel>
        <JoinInput
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="010-1234-5678"
          maxLength="13"
        />
        {errors.phone && <JoinMessage>{errors.phone}</JoinMessage>}
        <br />

        <JoinButton type="submit">가입하기</JoinButton>
      </JoinWrapper>
    </JoinContainer>
  );
};

export default Join;

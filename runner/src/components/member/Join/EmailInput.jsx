import React, { useState } from "react";
import {
  EmailContainer,
  LocalPartInput,
  DomainSelectWrapper,
  DomainSelectButton,
  DropdownMenu,
  DropdownItem,
  CustomDomainInput,
  EmailErrorMessage,
} from "./EmailInput.styles";

const EmailInput = ({ value, onChange }) => {
  const [localPart, setLocalPart] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("naver.com");
  const [customDomain, setCustomDomain] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [error, setError] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // 이메일 업데이트
  const updateEmail = (local, domain) => {
    const newEmail = local + "@" + domain;
    if (!emailRegex.test(newEmail)) {
      setError("유효한 이메일 형식을 입력해주세요.");
    } else {
      setError("");
    }
    onChange(newEmail);
  };

  const handleLocalPartChange = (e) => {
    const newLocal = e.target.value;
    setLocalPart(newLocal);
    updateEmail(
      newLocal,
      selectedDomain === "custom" ? customDomain : selectedDomain
    );
  };

  const handleSelectDomain = (domain) => {
    setSelectedDomain(domain);
    setIsDropdownOpen(false);
    if (domain !== "custom") {
      setCustomDomain("");
      updateEmail(localPart, domain);
    }
  };

  const handleCustomDomainChange = (e) => {
    const newCustom = e.target.value;
    setCustomDomain(newCustom);
    updateEmail(localPart, newCustom);
  };

  return (
    <>
      <EmailContainer>
        <LocalPartInput
          type="text"
          placeholder="이메일 아이디"
          value={localPart}
          onChange={handleLocalPartChange}
        />
        <span>@</span>
        <DomainSelectWrapper>
          <DomainSelectButton
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {selectedDomain === "custom" ? (
              <CustomDomainInput
                type="text"
                placeholder="직접 입력"
                value={customDomain}
                onChange={handleCustomDomainChange}
                autoFocus
              />
            ) : (
              <span>{selectedDomain}</span>
            )}
          </DomainSelectButton>
          <DropdownMenu open={isDropdownOpen}>
            <DropdownItem onClick={() => handleSelectDomain("naver.com")}>
              naver.com
            </DropdownItem>
            <DropdownItem onClick={() => handleSelectDomain("gmail.com")}>
              gmail.com
            </DropdownItem>
            <DropdownItem onClick={() => handleSelectDomain("daum.net")}>
              daum.net
            </DropdownItem>
            <DropdownItem onClick={() => handleSelectDomain("hanmail.net")}>
              hanmail.net
            </DropdownItem>
            <DropdownItem onClick={() => handleSelectDomain("custom")}>
              직접입력
            </DropdownItem>
          </DropdownMenu>
        </DomainSelectWrapper>
      </EmailContainer>

      {error && <EmailErrorMessage>{error}</EmailErrorMessage>}
    </>
  );
};

export default EmailInput;

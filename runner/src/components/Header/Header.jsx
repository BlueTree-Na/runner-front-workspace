import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../member/context/AuthContext";

function CollapsibleExample() {
  const navi = useNavigate();
  const { auth } = useContext(AuthContext);
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    const storedNickname = localStorage.getItem("nickname");
    if (storedNickname) {
      setNickname(storedNickname);
    }
  }, [auth.isAuthenticated]);

  const goTo = (path) => {
    navi(path);
  };

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand onClick={() => goTo("/")}>Runners</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="등산" id="collapsible-nav-dropdown">
              <NavDropdown.Item onClick={() => goTo("/")}>
                등산로
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={() => goTo("/course")}>
                산책로
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="소모임" id="collapsible-nav-dropdown">
              <NavDropdown.Item onClick={() => goTo("/schedule")}>
                일정목록
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={() => goTo("/")}>
                소모임2
              </NavDropdown.Item>
            </NavDropdown>

            <Nav.Link onClick={() => goTo("/outdorrlog")}>
              아웃도어로그
            </Nav.Link>
            <Nav.Link onClick={() => goTo("/mypage")}>마이페이지</Nav.Link>
          </Nav>

          {/* 로그인 여부에 따라 버튼 변경 */}
          {auth.isAuthenticated && nickname ? (
            <Nav>
              <Nav.Link onClick={() => goTo("/mypage")}>
                {nickname}님 환영합니다
              </Nav.Link>
              {/* 닉네임 클릭 시 마이페이지 이동 */}
            </Nav>
          ) : (
            <Nav>
              <Nav.Link onClick={() => goTo("/login")}>로그인</Nav.Link>
              <Nav.Link eventKey={2} onClick={() => goTo("/join")}>
                회원가입
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CollapsibleExample;

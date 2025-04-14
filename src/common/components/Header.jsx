import React, { useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";

function Header() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const [expanded, setExpanded] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    setExpanded(false);
  };

  const handleMyBooksClick = (e) => {
    if (!user) {
      e.preventDefault();
      navigate("/login", { state: { from: "/my-books" } });
    }
    setExpanded(false);
  };

  const handleNavClick = () => {
    setExpanded(false);
  };

  return (
    <Navbar
      expanded={expanded}
      expand="lg"
      style={{
        backgroundColor: "#ffffff",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        padding: "1rem 0",
      }}
    >
      <Container>
        <Navbar.Brand
          as={Link}
          to="/"
          onClick={handleNavClick}
          style={{
            color: "#1B3B36",
            fontSize: "1.2rem",
            fontWeight: "bold",
            marginRight: "2rem",
          }}
        >
          코딩알려주는 누나 도서관
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={() => setExpanded(expanded ? false : "expanded")}
          style={{
            border: "none",
            padding: "0.5rem",
          }}
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link
              as={Link}
              to="/"
              onClick={handleNavClick}
              style={{
                color: "#1B3B36",
                margin: "0.5rem 1rem",
                fontWeight: "500",
                textAlign: "center",
              }}
            >
              메인
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/my-books"
              onClick={handleMyBooksClick}
              style={{
                color: "#1B3B36",
                margin: "0.5rem 1rem",
                fontWeight: "500",
                textAlign: "center",
              }}
            >
              나의 책
            </Nav.Link>
            {user ? (
              <Nav.Link
                onClick={handleLogout}
                style={{
                  color: "#E6C88C",
                  margin: "0.5rem 1rem",
                  fontWeight: "500",
                  textAlign: "center",
                }}
              >
                로그아웃
              </Nav.Link>
            ) : (
              <Nav.Link
                as={Link}
                to="/login"
                onClick={handleNavClick}
                style={{
                  color: "#E6C88C",
                  margin: "0.5rem 1rem",
                  fontWeight: "500",
                  textAlign: "center",
                }}
              >
                로그인
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;

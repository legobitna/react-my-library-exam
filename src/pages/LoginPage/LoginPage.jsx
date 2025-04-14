import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Container, Card, Form, Button } from "react-bootstrap";
import useAuthStore from "../../store/useAuthStore";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuthStore((state) => state);

  const handleSubmit = (e) => {
    e.preventDefault();
    // 실제로는 여기서 API 호출을 통해 인증을 확인해야 합니다.
    // 지금은 간단히 username만 저장하겠습니다.
    login({ username });
    // 이전 페이지로 돌아가거나 메인 페이지로 이동
    const from = location.state?.from || "/";
    navigate(from);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #1B3B36 0%, #2C5851 100%)",
        margin: 0,
        padding: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card
        style={{
          width: "100%",
          maxWidth: "400px",
          borderRadius: "10px",
          border: "none",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          margin: "20px",
        }}
      >
        <Card.Body className="p-4">
          <h2
            className="text-center mb-4"
            style={{
              color: "#1B3B36",
              fontWeight: "bold",
            }}
          >
            환영합니다
          </h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="이메일 주소"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{
                  height: "50px",
                  border: "1px solid #E6E6E6",
                  borderRadius: "5px",
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  height: "50px",
                  border: "1px solid #E6E6E6",
                  borderRadius: "5px",
                }}
              />
            </Form.Group>
            <div className="text-end mb-3">
              <Link
                to="/forgot-password"
                style={{
                  color: "#1B3B36",
                  textDecoration: "none",
                  fontSize: "0.9rem",
                }}
              >
                비밀번호를 잊으셨나요?
              </Link>
            </div>
            <Button
              type="submit"
              className="w-100 mb-3"
              style={{
                backgroundColor: "#E6C88C",
                borderColor: "#E6C88C",
                height: "50px",
                color: "#1B3B36",
                fontWeight: "500",
              }}
            >
              로그인
            </Button>
            <div className="text-center">
              <span style={{ color: "#666" }}>계정이 없으신가요? </span>
              <Link
                to="/signup"
                style={{
                  color: "#1B3B36",
                  textDecoration: "none",
                  fontWeight: "500",
                }}
              >
                회원가입
              </Link>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default LoginPage;

import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/api/login", { email, password });
      console.log("Login successful:", response.data);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        padding: "20px",
      }}
    >
      <Form
        style={{ width: "100%", maxWidth: "500px", marginBottom: "20px" }}
        onSubmit={handleSubmit}
      >
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>이메일 주소</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>비밀번호</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="로그인 상태 유지" />
        </Form.Group>
        <Button variant="primary" type="submit">
          로그인
        </Button>
      </Form>

      <div className="btn" style={{ marginTop: "70px" }}>
        <Button variant="outline-white" style={{ margin: "10px" }}>
          <img
            src="https://recipe1.ezmember.co.kr/img/mobile/2022/icon_sns_g2.png?v.1"
            alt="구글"
          ></img>
        </Button>
        <Button variant="outline-white" style={{ margin: "10px" }}>
          <img
            src="https://2bob.co.kr/skin/nodskin_argio/images/btn_join_choice3.jpg"
            alt="네이버"
          ></img>
        </Button>
        <Button variant="outline-white" style={{ margin: "10px" }}>
          <img
            src="	https://2bob.co.kr/skin/nodskin_argio/images/btn_join_choice4.jpg"
            alt="카카오"
          ></img>
        </Button>
      </div>
    </div>
  );
};

export default Login;

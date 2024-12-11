import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import recipeRoadIcon from "../image/recipeRoadIcon.png";

const Navbars = () => {
  return (
    <Navbar bg="light" expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="/" className="icon">
          <img alt="" src={recipeRoadIcon} width="45" height="30" />
          Recipe Road
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/recipe-display">
              레시피보기
            </Nav.Link>
            <Nav.Link as={Link} to="/recipe-write">
              레시피작성
            </Nav.Link>
            <Nav.Link as={Link} to="/profile">
              마이프로필
            </Nav.Link>
            <Nav.Link as={Link} to="/login">
              로그인/회원가입
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navbars;

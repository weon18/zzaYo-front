import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios"; // Axios를 사용하여 서버와 통신

const Profile = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null); // 파일 객체를 저장

  // 프로필 이미지 업로드 핸들러
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file); // 파일 객체를 상태에 저장
      setProfileImage(URL.createObjectURL(file));
    }
  };

  // 폼 제출 핸들러
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("description", description);
    if (imageFile) {
      formData.append("profileImage", imageFile);
    }

    try {
      const response = await axios.post("/api/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Profile saved successfully:", response.data);
      // 필요시 사용자에게 성공 메시지 표시
    } catch (error) {
      console.error("Error saving profile:", error);
      // 필요시 사용자에게 에러 메시지 표시
    }
  };

  return (
    <Container fluid>
      <Row>
        {/* 왼쪽: 프로필 폼 */}
        <Col md={4} className="profile-form-container">
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="profileImage">
              <Form.Label>프로필 이미지</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
              {profileImage && (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="profile-image-preview"
                />
              )}
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>한 줄 설명</Form.Label>
              <Form.Control
                type="text"
                placeholder="한 줄 설명을 입력하세요"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              저장
            </Button>
          </Form>
        </Col>

        {/* 오른쪽: 레시피 리스트 */}
        <Col md={8} className="recipe-list-container">
          <h3>내가 작성한 레시피</h3>
          <ul className="recipe-list">
            {/* 예시 데이터 */}
            {[
              { id: 1, title: "순두부 열라면" },
              { id: 2, title: "우렁된장쌈밥" },
            ].map((recipe) => (
              <li key={recipe.id}>
                <Link to={`/recipe-write/${recipe.id}`}>{recipe.title}</Link>
              </li>
            ))}
          </ul>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;

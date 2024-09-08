import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import recipeRoadLogo from "../image/recipeRoadLogo.png";

const MainSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = async (event) => {
    event.preventDefault();
    if (searchQuery) {
      // 여기서 유튜브 API를 호출하거나 크롤링을 시작
      // 검색어를 RecipeDisplay 페이지로 전달
      navigate(`/recipe-display?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <Form onSubmit={handleSearch}>
      <img alt="" src={recipeRoadLogo} className="logo" />
      <Form.Group controlId="search">
        <Form.Control
          type="text"
          placeholder="재료를 검색하세요"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            borderRadius: "100px",
            marginLeft: "auto",
            marginRight: "auto",
            width: "60%",
            padding: "15px 35px",
            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
          }}
        />
      </Form.Group>
    </Form>
  );
};

export default MainSearch;

import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import axios from "axios";

const RecipeWrite = () => {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState([
    { name: "", amount: "", unit: "" },
  ]);
  const [instructions, setInstructions] = useState([{ step: "" }]);
  const [image, setImage] = useState(null);

  const handleIngredientChange = (index, event) => {
    const newIngredients = [...ingredients];
    newIngredients[index][event.target.name] = event.target.value;
    setIngredients(newIngredients);
  };

  const handleAddIngredient = () => {
    setIngredients([...ingredients, { name: "", amount: "", unit: "" }]);
  };

  const handleRemoveIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleInstructionChange = (index, event) => {
    const newInstructions = [...instructions];
    newInstructions[index].step = event.target.value;
    setInstructions(newInstructions);
  };

  const handleAddInstruction = () => {
    setInstructions([...instructions, { step: "" }]);
  };

  const handleRemoveInstruction = (index) => {
    setInstructions(instructions.filter((_, i) => i !== index));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // FormData 객체를 사용하여 데이터를 서버로 전송
    const formData = new FormData();
    formData.append("title", title);
    formData.append("ingredients", JSON.stringify(ingredients)); // 재료는 JSON 문자열로 저장
    formData.append("instructions", JSON.stringify(instructions)); // 조리법은 JSON 문자열로 저장
    if (image) {
      formData.append("image", image);
    }

    try {
      // 서버의 API 엔드포인트 URL로 데이터를 전송
      const response = await axios.post("/api/recipes", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // 파일 업로드를 위한 헤더
        },
      });
      console.log("Recipe submitted successfully:", response.data);
    } catch (error) {
      console.error("Error submitting recipe:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h1>레시피 작성</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="recipeTitle">
          <Form.Label>레시피 제목</Form.Label>
          <Form.Control
            type="text"
            placeholder="레시피 제목을 입력하세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>재료</Form.Label>
          {ingredients.map((ingredient, index) => (
            <Row key={index} className="mb-3">
              <Col sm={4}>
                <Form.Control
                  type="text"
                  placeholder="재료명"
                  name="name"
                  value={ingredient.name}
                  onChange={(e) => handleIngredientChange(index, e)}
                />
              </Col>
              <Col sm={3}>
                <Form.Control
                  type="text"
                  placeholder="양"
                  name="amount"
                  value={ingredient.amount}
                  onChange={(e) => handleIngredientChange(index, e)}
                />
              </Col>
              <Col sm={3}>
                <Form.Control
                  as="select"
                  name="unit"
                  value={ingredient.unit}
                  onChange={(e) => handleIngredientChange(index, e)}
                >
                  <option value="">단위</option>
                  <option value="g">그램 (g)</option>
                  <option value="ml">밀리리터 (ml)</option>
                  <option value="tbsp">큰술 (tbsp)</option>
                  <option value="tsp">작은술 (tsp)</option>
                  <option value="cup">컵 (cup)</option>
                  <option value="piece">개 (개)</option>
                </Form.Control>
              </Col>
              <Col sm={2}>
                <Button
                  variant="danger"
                  onClick={() => handleRemoveIngredient(index)}
                >
                  제거
                </Button>
              </Col>
            </Row>
          ))}
          <Button variant="primary" onClick={handleAddIngredient}>
            재료 추가
          </Button>
        </Form.Group>

        <Form.Group>
          <Form.Label>조리 방법</Form.Label>
          {instructions.map((instruction, index) => (
            <Row key={index} className="mb-3">
              <Col>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="조리 방법 단계"
                  value={instruction.step}
                  onChange={(e) => handleInstructionChange(index, e)}
                />
              </Col>
              <Col sm="auto">
                <Button
                  variant="danger"
                  onClick={() => handleRemoveInstruction(index)}
                >
                  제거
                </Button>
              </Col>
            </Row>
          ))}
          <Button variant="primary" onClick={handleAddInstruction}>
            조리 방법 추가
          </Button>
        </Form.Group>

        <Form.Group controlId="recipeImage">
          <Form.Label>레시피 사진</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          저장
        </Button>
      </Form>
    </div>
  );
};

export default RecipeWrite;

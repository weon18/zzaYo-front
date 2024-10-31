import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const RecipeDisplay = () => {
  const [videos, setVideos] = useState([]);
  const [userRecipes, setUserRecipes] = useState([]);
  const query = new URLSearchParams(useLocation().search).get("query");

  useEffect(() => {
    const refineSearchQuery = (query) => {
      const ingredients = query.split(" ");
      const verbs = ["만들기", "조리하기", "요리하기"];
      const nouns = ["레시피", "음식", "요리"];
      const expandedQueries = [];

      ingredients.forEach((ingredient) => {
        verbs.forEach((verb) => {
          expandedQueries.push(`${ingredient} ${verb}`);
        });
        nouns.forEach((noun) => {
          expandedQueries.push(`${ingredient} ${noun}`);
        });
      });

      return `${ingredients.join(", ")} recipe, ${expandedQueries.join(", ")}`;
    };

    const fetchVideos = async () => {
      try {
        const searchQuery = refineSearchQuery(query);

        // 유튜브 API를 사용하여 비디오 검색
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/search`,
          {
            params: {
              q: searchQuery,
              part: "snippet",
              type: "video",
              maxResults: 150,
              key: "AIzaSyCDt6GYSlMvQU2G_eeB_5NNpJ6Ds6Bb3Nk",
              relevanceLanguage: "ko",
              safeSearch: "strict",
            },
          }
        );

        // 비디오 데이터 처리
        const ingredients = query
          .split(" ")
          .filter((ingredient) => !ingredient.endsWith("장"));
        const exactMatchVideos = response.data.items
          .filter((item) => {
            const title = item.snippet.title;
            const description = item.snippet.description;

            // 검색한 재료가 제목 or 설명에 포함되어 있는지 확인
            return ingredients.every(
              (ingredient) =>
                title.includes(ingredient) || description.includes(ingredient)
            );
          })
          .map((item) => ({
            id: item.id.videoId,
            title: item.snippet.title,
            thumbnail: item.snippet.thumbnails.high.url,
          }));

        const partialMatchVideos = response.data.items
          .filter((item) => {
            const title = item.snippet.title;
            const description = item.snippet.description;

            // 재료 중 하나라도 제목 or 설명에 포함되어 있는지 확인 + 모든 재료가 포함된건 아닌 경우
            return (
              ingredients.some(
                (ingredient) =>
                  title.includes(ingredient) || description.includes(ingredient)
              ) &&
              !ingredients.every(
                (ingredient) =>
                  title.includes(ingredient) || description.includes(ingredient)
              )
            );
          })
          .map((item) => ({
            id: item.id.videoId,
            title: item.snippet.title,
            thumbnail: item.snippet.thumbnails.high.url,
          }));

        // 정확히 일치하는 비디오 먼저, 그다음에 부분적으로 일치하는 비디오 추가
        const combinedVideos = [
          ...exactMatchVideos,
          ...partialMatchVideos.filter(
            (video) =>
              !exactMatchVideos.some((exactVideo) => exactVideo.id === video.id)
          ),
        ];

        setVideos(combinedVideos);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    const fetchUserRecipes = async () => {
      try {
        // 서버에서 유저 레시피 데이터를 가져옴
        const response = await axios.get("/api/user-recipes", {
          params: {
            ingredients: query.split(" "),
          },
        });

        setUserRecipes(response.data);
      } catch (error) {
        console.error("Error fetching user recipes:", error);
      }
    };

    if (query) {
      fetchVideos();
      fetchUserRecipes();
    }
  }, [query]);

  return (
    <div className="recipe-display">
      <div className="video-gallery">
        {videos.length > 0 ? (
          videos.map((video) => (
            <div key={video.id} className="video-item">
              <div className="video-source-label youtube-label">
                <span>YouTube Video</span>
              </div>
              <a
                href={`https://www.youtube.com/watch?v=${video.id}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="video-thumbnail"
                />
                <h3>{video.title}</h3>
              </a>
              <p className="search-keywords">
                {query.split(" ").map((ingredient, index) => (
                  <span key={index} className="highlight">
                    {ingredient}
                  </span>
                ))}
              </p>
            </div>
          ))
        ) : (
          <p>관련된 레시피 정보가 없습니다.</p>
        )}
      </div>

      <div className="user-recipe-gallery">
        {userRecipes.length > 0 ? (
          userRecipes.map((recipe) => (
            <div key={recipe.id} className="user-recipe-item">
              <div className="video-source-label user-recipe-label">
                <span>User Submitted Recipe</span>
              </div>
              <h3>{recipe.title}</h3>
              <p>{recipe.description}</p>
              <a href={recipe.link} target="_blank" rel="noopener noreferrer">
                레시피 보기
              </a>
              <p className="search-keywords">
                {query.split(" ").map((ingredient, index) => (
                  <span key={index} className="highlight">
                    {ingredient}
                  </span>
                ))}
              </p>
            </div>
          ))
        ) : (
          <p>관련된 유저 레시피 정보가 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default RecipeDisplay;

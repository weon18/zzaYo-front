import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const RecipeDisplay = () => {
  const [videos, setVideos] = useState([]);
  const query = new URLSearchParams(useLocation().search).get("query");

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        // 유튜브 API를 사용하여 비디오 검색
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/search`,
          {
            params: {
              q: query + " recipe" + " 만개의 레시피",
              part: "snippet",
              type: "video",
              maxResults: 100,
              key: "AIzaSyCDt6GYSlMvQU2G_eeB_5NNpJ6Ds6Bb3Nk",
            },
          }
        );

        // 비디오 데이터 처리
        const videoList = response.data.items.map((item) => ({
          id: item.id.videoId,
          title: item.snippet.title,
          thumbnail: item.snippet.thumbnails.high.url,
        }));

        setVideos(videoList);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    if (query) {
      fetchVideos();
    }
  }, [query]);

  return (
    <div>
      <div className="video-gallery">
        {videos.length > 0 ? (
          videos.map((video) => (
            <div key={video.id} className="video-item">
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
            </div>
          ))
        ) : (
          <p>관련된 레시피 정보가 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default RecipeDisplay;

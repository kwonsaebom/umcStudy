import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgb(28, 24, 81);
  height: 100%;
  padding: 30px;
  color: white;
`;

const Title = styled.div`
  font-size: 25px;
  font-weight: bold;
`;

const DetailContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: space-between;
  padding: 20px;
`;

const ItemList = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
  font-size: 12px;
  max-height: 400px; /* 최대 높이 설정 */
  overflow-y: auto; /* 세로 스크롤 추가 */
`;

const Item = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  margin-bottom: 10px;
`;

const ItemImg = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50%;
`;

const ItemName = styled.div`
  margin-top: 10px;
  margin-left: 10px;
`;

function MovieDetailPage({ movieId }) {
  const [credits, setCredits] = useState([]);
  const [directors, setDirectors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!movieId) {
      return;
    }

    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=a95590c440c1457a4166f509c1ef33c0`
    )
      .then((response) => response.json())
      .then((data) => {
        setCredits(data.cast);
        const director = data.crew.find(
          (member) => member.department === "Directing"
        );
        setDirectors(director ? [director] : []);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(
          "출연진 정보를 가져오는 도중 에러가 발생했습니다:",
          error
        );
        setIsLoading(false);
      });
  }, [movieId]);

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  const defaultImage =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz7ztleRwzXhFdiwBYqZ8cib9RvEsukVVUS3niN1YQ&s";

  return (
    <Container>
      <Title>출연진 및 제작진</Title>
      <DetailContainer>
        <ItemList>
          {credits.map((castMember, index) => (
            <Item key={index}>
              <ItemImg
                src={
                  castMember.profile_path
                    ? `https://image.tmdb.org/t/p/w500${castMember.profile_path}`
                    : defaultImage
                }
                alt={castMember.name}
              />
              <ItemName>{castMember.name}</ItemName>
            </Item>
          ))}
          {directors.map((director, index) => (
            <Item key={index}>
              <ItemImg
                src={
                  director.profile_path
                    ? `https://image.tmdb.org/t/p/w500${director.profile_path}`
                    : defaultImage
                }
                alt={director.name}
              />
              <ItemName>{director.name}</ItemName>
            </Item>
          ))}
        </ItemList>
      </DetailContainer>
    </Container>
  );
}

MovieDetailPage.propTypes = {
  movieId: PropTypes.string.isRequired,
};

export default MovieDetailPage;

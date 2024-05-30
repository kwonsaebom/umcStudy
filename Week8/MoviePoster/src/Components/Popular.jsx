import { useState } from "react";
import Movie from "./PopularPage";
import styled from "styled-components";

const Container = styled.div`
  background-color: #1e2161;
  display: flex;
  justify-content: center;
  color: white;
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 20px;
`;
const Page = styled.div`
  padding-left: 100px;
  padding-right: 100px;
`;
const Button = styled.div`
  border: none;
  cursor: pointer;
  &:hover {
    color: #acacac;
  }
`;
function Popular() {
  const [page, setPage] = useState(1);

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div>
      <Movie endpoint={`popular?page=${page}`} />
      <Container>
        <Button onClick={handlePreviousPage} disabled={page === 1}>
          &lt;
        </Button>
        <Page>{page}</Page>
        <Button onClick={handleNextPage}>&gt;</Button>
      </Container>
    </div>
  );
}

export default Popular;

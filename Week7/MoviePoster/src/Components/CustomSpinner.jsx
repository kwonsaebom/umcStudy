import { Spinner as BootstrapSpinner } from "react-bootstrap";
import styled from "styled-components";

const Container = styled.div`
  background-color: #1e2161;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Spinner = styled(BootstrapSpinner)`
  margin: 10px; /* 좌우 여백을 10px로 설정 */
`;

function CustomSpinner() {
  return (
    <Container>
      <Spinner animation="grow" variant="danger" />
      <Spinner animation="grow" variant="warning" />
      <Spinner animation="grow" variant="info" />
    </Container>
  );
}

export default CustomSpinner;

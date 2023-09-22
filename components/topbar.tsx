import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row  from "react-bootstrap/Row";

export default function Topbar() {
  return (
    <section className="topbar bg-secondary py-2 d-none d-lg-block">
      <Container>
        <Row className="justify-content-between">
          <Col lg={2} xl={4}></Col>
          <Col className="my-auto text-start" lg={5} xl={5}><p className="fs-6 m-0">Welcome to Future Connect, your destination for success!</p></Col>
          <Col lg xl className="d-lg-none d-xl-block"></Col>
          <Col className="d-flex justify-content-between text-end" lg={2} xl={1}>
            <i className="bi bi-linkedin"></i>
            <i className="bi bi-facebook"></i>
            <i className="bi bi-twitter"></i>
          </Col>
        </Row>
      </Container>
    </section>
  )
}
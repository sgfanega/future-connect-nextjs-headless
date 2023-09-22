import Image from 'next/image';

import { Container, Row, Col, Button } from "react-bootstrap"
import healthCareImage from '/public/images/nursing-picture.jpg'
import internationalAdmissionsImage from '/public/images/college-picture.jpg'


export default function Services({
  healthcareDescription,
  intlAdmissionDescription,
}) {
  return (
    <section className="home__services bg-primary">
    <Container id="home__services">
      <h2 className="display-5">Services</h2>
      <hr/>
      <Row className="justify-content-center my-5">
        <Col className="mb-3 mb-lg-0" xs={10} md={9} lg={5} xl={3}>
          <Image  
            className="healthcare-image"
            src={healthCareImage}
            alt="Picture of Student's back walking forward."
            quality={50}
            />
        </Col>
        <Col xs={10} md={9} lg={6}>
          <h3 className="display-6">Healthcare</h3>
          <p className="fs-5">{healthcareDescription}</p>
          <Button href="/services/healthcare" variant="secondary">More Info!</Button>
        </Col>
      </Row>
      <Row className="justify-content-center text-lg-end">
        <Col className="order-lg-2 mb-3 mb-lg-0" xs={10} md={9} lg={5} xl={3}>          
          <Image  
            className="international-admissions--image"
            src={internationalAdmissionsImage}
            alt="Picture of Student's back walking forward."
            quality={50}
            />
        </Col>
        <Col className="order-lg-1" xs={10} md={9} lg={6}>
          <h3 className="display-6">International Admissions</h3>
          <p className="fs-5">{intlAdmissionDescription}</p>
          <Button href="/services/intl-admissions" variant="secondary">More Info!</Button></Col>
      </Row>
    </Container>
    </section>
  )
}
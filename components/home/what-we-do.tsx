import { Container, Row, Col } from 'react-bootstrap';

export default function WhatWeDo({
  whatWeDoDescription, 
  missionStatement, 
  collegeFund, 
  collegesAndUniversities, 
  countries}) {

  return (
    <section className="home__what-we-do">
      <Container>
        <Row className="justify-content-evenly">
          <Col className="text-center pb-5 mb-lg-0" lg={4}xl={3}>
            <h2 className="display-1 font-weight-bold">What <br/>We Do</h2>
            <hr className="what-we-do-hr"/>
          </Col>
          <Col className="my-auto" md={8} lg={6} xl={5} >
            <p className="fs-4 text-center text-lg-end">{whatWeDoDescription}</p>
          </Col>
          <Col className="tagline text-center" md={8} xl={7}>
            <p className="fs-5">{missionStatement}</p>
            <p className="fs-6">- Future Connect Team</p>
          </Col>
        </Row>
        <Row className="justify-content-lg-evenly mt-5">
          <Col lg={4}>
            <NumberCounter className="counter-dollar" 
              number={collegeFund} 
              label="assisted in Scholarship Funds" 
              duration={8}
            />
          </Col>
          <Col lg={4}>
            <NumberCounter number={collegesAndUniversities} label="Colleges and Universities" duration={10}/>
          </Col>
          <Col lg={4}>
            <NumberCounter number={countries} label="Countries" duration={10}/>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

import CountUp from "react-countup"

export function NumberCounter({ number, label, duration, className='' }) {
  return (
    <div className="number-counter">
      <CountUp duration={duration} className={`${className} counter display-4`} end={number}/>
      <p className="fs-5">{label}</p>
    </div>
  )
}
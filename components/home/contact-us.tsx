import { useState } from 'react'
import { Container, Button, Row, Col } from 'react-bootstrap'

export default function ContactUs() {
  return (
    <section className="home__contact-us py-5">
      <Container>
        <h2 className="display-5">Contact Us</h2>
        <hr/>
        <Row className="justify-content-center">
          <Col lg={4}>
            <ContactForm/>
          </Col>
        </Row>
      </Container>
    </section>
  )
}


export function ContactForm() {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [showErrorMessage, setShowErrorMessage] = useState(false)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let data = new FormData(event.currentTarget)
    let formObject = Object.fromEntries(data.entries())
    
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formObject as any).toString()
    })
    .then((response) => {
      if (!response.ok) {
        setShowErrorMessage(true)
      }
    })
    .then(() => setShowSuccessMessage(true))
  }

  return (
    <section id="contact-form" className="contact-form pt-5">
      <Container>
        { showSuccessMessage && !showErrorMessage &&
          <p className="display-6 text-center">We will get in touch with you soon!</p>
        }
        { showErrorMessage && 
          <p className="display-6 text-center">There was an issue with your submission, please email <a href="mailto:info@futureconnect.one" >us.</a></p>
        }
        {!showSuccessMessage &&
        <form name="contact-form" method="POST" data-netlify="true" netlify-honeypot="bot-field" onSubmit={handleSubmit}>
          <input type="hidden" name="form-name" value="contact-form"/>
          <input type="hidden" name="bot-field"/>

          <div className="row mb-3">
            <div className="col-12 col-7 mb-3">
              <label htmlFor="first-name" className="form-label">First Name: </label>
              <input type="text" id="first-name" name="first-name" className="form-control" placeholder="Enter First Name" required/>
            </div>
            <div className="col-12 col-7 mb-3">
              <label htmlFor="last-name" className="form-label">Last Name: </label>
              <input type="text" id="last-name" name="last-name" className="form-control" placeholder="Enter Last Name" required/>
            </div>
            <div className="col-12 col-7 mb-3">
              <label htmlFor="email" className="form-label">Email: </label>
              <input type="email" id="email" name="email" className="form-control" placeholder="Enter Email" required/>
            </div>
            <div className="col-12 col-7 mb-3">
              <label />
              
            </div>
            <div className="col-6">
              <Button variant="secondary" type="submit">Get in Touch!</Button>
            </div>
          </div>
        </form>
        }
      </Container>
    </section>
  )
}
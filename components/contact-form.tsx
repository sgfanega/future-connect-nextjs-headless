import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { ChangeEvent, useState } from 'react';
import { FormPost } from '../types/types';

export default function ContactForm() {
  const [state, setState] = useState<FormPost>();
  const [submitted, setSubmitted] = useState(false)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [showErrorMessage, setShowErrorMessage] = useState(false)

  const encode = (data: any) => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&")
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    fetch('/', {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "contact-form", ...state})
    }).then((response) => {
      console.log(response)
      if (!response.ok) {
        setShowErrorMessage(true)
      }
    }).then(() => {
      setShowSuccessMessage(true)
    })

    console.log(state);
    event.preventDefault();
    setSubmitted(true);
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.currentTarget.id]: event.currentTarget.value
    });
  };

  return (
    <section id="contact-form" className="contact-form">
      { showSuccessMessage && !showErrorMessage &&
        <p className="fs-4 fw-500 fc-bright-gray text-center mb-0">We will get in touch with you soon!</p>
      }
      { showErrorMessage && 
        <p className="fs-4 fw-500 fc-bright-gray text-center mb-0">There was an issue with your submission, please email <a href="mailto:leeporterfitness@gmail.com" >us.</a></p>
      }
      { (!submitted) &&
      <Form name="contact-form" method="POST" data-netlify="true" netlify-honeypot="bot-field" onSubmit={handleSubmit}>
        <Form.Control type="hidden" name="form-name" value="contact-form"/>
        <Form.Control type="hidden" name="bot-field"/>
        <InputGroup className="mb-3">
          <InputGroup.Text id="firstName">First Name</InputGroup.Text>
          <Form.Control
            id="firstName"
            type="text"
            placeholder="e.g John"
            aria-label="FirstName"
            aria-describedby="firstName"
            required 
            onChange={handleChange}
            />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="lastName">Last Name</InputGroup.Text>
          <Form.Control
            id="lastName"
            type="text"
            placeholder="e.g Doe"
            aria-label="LastName"
            aria-describedby="lastName"
            required 
            onChange={handleChange}
            />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="email">Email</InputGroup.Text>
          <Form.Control
            id="email"
            type="email"
            placeholder="e.g johndoe@email.com"
            aria-label="Email"
            aria-describedby="email"
            required 
            onChange={handleChange}
            />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="category">Choose a category</InputGroup.Text>
          <Form.Control
            id="category"
            as="select"
            aria-label="Category" 
            aria-describedby="category"
            required
            onChange={handleChange}>
            <option value="Other">Other</option>
            <option value="Int'l Admission">Int'l Admission</option>
            <option value="Nursing">Nursing</option>
            <option value="CNA">CNA</option>
          </Form.Control>
        </InputGroup>
        <Button variant="secondary" type="submit">Contact Us!</Button>
      </Form>
      }
    </section>
  )
}

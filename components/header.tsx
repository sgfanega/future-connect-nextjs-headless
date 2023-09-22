import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import Image from 'next/image';
import logo from '../public/future-connect-logo.svg';
import { MenuLinkAttributes, MenuLinks, } from '../types/types';

export default function Header({ menuLinks } : MenuLinks) {
  const MenuLinks = () => {
    const result = menuLinks.map((menuLink : MenuLinkAttributes) => {
      if (menuLink.children.length !== 0) {
        return (
        <NavDropdown key="menuLinks" title={menuLink.label} id="basic-nav-dropdown">
          { 
            menuLink.children.map((subMenuLink : MenuLinkAttributes) => {
              return <NavDropdown.Item key={subMenuLink.label} href={subMenuLink.url}>{subMenuLink.label}</NavDropdown.Item>
            })
          }
        </NavDropdown>)
      } else {
        return <Nav.Link key={menuLink.label} href={menuLink.url}>{menuLink.label}</Nav.Link>
      }
    })

    return <>{result}</>
  }

  return(
    <Navbar bg="primary" expand="lg">
      <Container>
        <Navbar.Brand href="/">
          <Image src={logo} alt="Future Connect Logo" height={40} width={40}/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-start ms-lg-auto">
            <MenuLinks></MenuLinks>
          </Nav>
          <Button href="/#home__services" variant="secondary">Get Started!</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
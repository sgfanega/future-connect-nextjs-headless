import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row  from "react-bootstrap/Row";
import Link from 'next/link';
import Image from 'next/image';
import logoWithWords from '../public/future-connect-words.svg';
import { MenuLinkAttributes } from '../types/types';

export default function Footer({ footerLinks }) {
  return (
    <footer id="footer" className="footer">
      <Container className="pt-5">
        <hr/>
        <Row className="justify-content-center pt-3">
          <Col sm={12} className="d-flex flex-column flex-md-row justify-content-evenly align-items-center pb-3">
            { footerLinks.map((menuLink: MenuLinkAttributes) => {
              if (menuLink.label !== 'Services') {
                return <Link key={menuLink.label} href={menuLink.url} className="py-2 py-md-0">{menuLink.label}</Link>
              }
            })}
          </Col>
          <Col sm={12} className="d-flex justify-content-evenly pb-3">
            <Image src={logoWithWords} alt="Logo" style={{ width: '140', height: '240' }} />
          </Col>
          <Col xs={12}>
            <Row className="justify-content-center">
              <Col xs={5} md={4} className="text-end">
                <p className="fs-6"><Link href="/privacy-policy">Privacy Policy</Link></p>
              </Col>
              <Col xs={1} className="text-center">
                <p className="fs-6">•</p>
              </Col>
              <Col xs={5} md={4} className="text-start">
              <p className="fs-6"><Link href="/ca-privacy-policy">CA Privacy Policy</Link></p>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      <div className="footer__copyright footer-copyright">
        <p className="fs-6 mb-0 py-2">Copyright © 2023 Future Connect</p>
      </div>
    </footer>
  )
}
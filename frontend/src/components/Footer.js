import React from "react";
import { Container, Row, Col } from 'react-bootstrap'

function Footer() {
  return (
    <div>
      <footer>
        <Container>
          <Row>
            <Col className="text-center py-3"> Copyright &copy; Dress Zone  || <a href="mailto:`nicci@mail.com`?subject={subject}&body={body}">Click to Conatct Us By Email</a></Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
}

export default Footer;

import react from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { LinkContainer } from "react-router-bootstrap";

const NavbarComponent = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">Shisha championship</Navbar.Brand>
        <Nav className="me-auto">
          <LinkContainer to="/">
            <Nav.Link href="/">Home</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/results">
            <Nav.Link href="/results">Matches</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/settings">
            <Nav.Link href="#settings">Settings</Nav.Link>
          </LinkContainer>
        </Nav>
      </Container>
    </Navbar>
  );
};
export default NavbarComponent;

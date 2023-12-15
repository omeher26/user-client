import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "./headers.css"

const Headers = () => {
  return (
    <>
      <Navbar bg="dark" >
        <Container>
          {/* <Navbar.Brand href="#home">Navbar</Navbar.Brand> */}

          <Nav className="m-auto">
            {/* <Nav.Link href="#home">Home</Nav.Link> */}
            <h2 className="abc">User Management System</h2>
          </Nav>

        </Container>
      </Navbar>
    </>
  );
};

export default Headers;

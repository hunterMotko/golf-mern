import React, {useState} from 'react';
import {
  Navbar,
  Offcanvas,
  Nav,
  Form,
  Container,
  FormControl,
  Button,
} from 'react-bootstrap';
import golfBall from '../assets/images/golfball.png'

const NavBar = ({signIn, user}) => {

  return (
    <>
    {
      <Navbar bg="dark" variant="dark" expand="md" className="mb-3">
        <Container fluid>
          <Navbar.Brand href="/"><img src={golfBall} alt="Golf Ball" height="50" width="50"/></Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md`} />
          <Navbar.Offcanvas
            className="bg-dark"
            id={`offcanvasNavbar-expand-md`}
            aria-labelledby={`offcanvasNavbarLabel-expand-md`}
            placement="end"
          >
            <Offcanvas.Header closeButton className='bg-dark text-white'>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-md`}>
                Navigation
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className='bg-dark text-white'>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link href='/'>Home</Nav.Link>
                <Nav.Link href="/courses">Courses</Nav.Link>
                <Nav.Link href="/cards">Score Cards</Nav.Link>
                <Nav.Link href="/">Handicap</Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    }
  </>
  )
}

export default NavBar
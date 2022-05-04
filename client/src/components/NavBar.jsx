import React, {useState} from 'react'
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
  const [toggle, setToggle] = useState(false);
  const [username, setUsername] = useState('');

  return (
    <>
    {
      <Navbar bg="dark" variant="dark" expand="md" className="mb-3">
        <Container fluid>
          <Navbar.Brand href="/"><img src={golfBall} alt="Golf Ball" height="50" width="50"/></Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-md`}
            aria-labelledby={`offcanvasNavbarLabel-expand-md`}
            placement="end"
            className='bg-dark'
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-md`}>
                Navigation
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link href="#action1">Home</Nav.Link>
                <Nav.Link href="#action2">Link</Nav.Link>

                {/* {user.current.username ?
                  <h3>{user.current.username}</h3> :
                    toggle ?
                    <div className='d-flex'>
                      <FormControl
                        type="text"
                        placeholder="Username ... "
                        value={username}
                        className='mx-1'
                        onChange={e=>setUsername(e.target.value)}
                      />
                      <Button onClick={submit}>Login</Button>
                    </div> :
                    <Button variant='outline-success' size='sm' className='mx-1' onClick={()=>setToggle(!toggle)}>Log In</Button>
                } */}
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
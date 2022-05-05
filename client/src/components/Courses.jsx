import React, { useContext } from 'react';
import { MainContext } from '../context/Main';
import {useNavigate} from 'react-router-dom';

import {
  Container,
  Row,
  Col,
  Card,
  ListGroup,
  Spinner
} from 'react-bootstrap';

const Courses = () => {
  const { courses } = useContext(MainContext);

  const getCourse = (course) =>{
    return window.location.href = `/course/${course.name}/${course.zip_code}`
  }

  return (
    <Container>
      {
        courses.length > 0 ? courses.map(course=>(
          <Row key={course.name} className='courses my-2'>
            <Col>
              <Card  onClick={()=>getCourse(course)}>
                <ListGroup variant="flush">
                  <ListGroup.Item>{course.name}</ListGroup.Item>
                  <ListGroup.Item>ZIP: {course.zip_code}</ListGroup.Item>
                  <ListGroup.Item>{course.distance} Miles</ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        ))
        :
        <Row>
          <Col className="d-flex justify-content-center">
            <Spinner animation="border" variant='light' role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </Col>
        </Row>
      }
    </Container>
  )
}

export default Courses
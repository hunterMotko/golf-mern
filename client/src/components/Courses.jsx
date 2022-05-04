import React, { useContext } from 'react';
import {MainContext} from '../context/Main';
import {
  Container,
  Row,
  Col,
  Card,
  ListGroup
} from 'react-bootstrap';

const Courses = () => {
  const { courses } = useContext(MainContext);

  return (
    <Container>
      {
        courses.length > 0 && courses.map(course=>(
          <Row key={course.name} className='my-2'>
            <Col>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>{course.name}</ListGroup.Item>
                  <ListGroup.Item>{course.zip_code}</ListGroup.Item>
                  <ListGroup.Item>{course.distance} Miles</ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        ))
      }
    </Container>
  )
}

export default Courses
import React, {useState, useEffect, useContext} from 'react'
import { useParams } from 'react-router-dom';
import { MainContext } from '../context/Main';
import {
  Container,
  Row,
  Col,
  ListGroup,
  Spinner
} from 'react-bootstrap';

const Course = () => {
  const params = useParams();
  const { getCourse } = useContext(MainContext);
  const [course, setCourse] = useState({});

  const get = async() =>{
    let res = await getCourse(params)
    if (res) {
      setCourse(res.course_details.result)
    }
  }

  useEffect(()=>{
    if (params) {
      get()
    }
  }, [params]);

  return (
    <>
      {
        Object.keys(course).length > 0 ?
          <Container className='bg-dark text-white p-1 rounded' fluid>
            <Row>
              <Col>
                <h1>
                  {course.name}
                </h1>
              </Col>
            </Row>
            <Row>
              <Col>
                <ListGroup>
                  <ListGroup.Item>{course.formatted_address}</ListGroup.Item>
                  <ListGroup.Item>{course.formatted_phone_number}</ListGroup.Item>
                  <ListGroup.Item>
                    Course Hours
                    <ul className='text-decoration-none'>
                      {course.opening_hours.weekday_text && course.opening_hours.weekday_text.map((item, i)=>(
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Course Rating: {course.rating}
                  </ListGroup.Item>
                  <ListGroup.Item>Google Maps: <a href={course.url}>Get Directions</a></ListGroup.Item>
                  <ListGroup.Item>Course Website: <a href={course.website}>Site</a></ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
          </Container> :
          <Container>
            <Row>
              <Col className="d-flex justify-content-center">
                <Spinner animation="border" variant='light' role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </Col>
            </Row>
          </Container>
      }
    </>
  )
}

export default Course
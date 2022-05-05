import React, { useState, useEffect } from 'react'
import image from '../assets/images/slope-rating.jpeg';
import axios from 'axios';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form
} from 'react-bootstrap';
import {scoreDifferncial, avg} from '../assets/helpers/helpers.js';

const Handicap = () => {
  const [users, setUsers] = useState([]);
  const [handicap, setHandicap] = useState(0);
  const [values, setValues] = useState({user: '', rating: '', slope: ''});
  const [submitted, setSubmitted] = useState(false);

  const getUsers = async() => {
    let res = await axios.get('http://localhost:8080/api/user');
    setUsers(res.data.data);
  }

  const handleChange = e => {
    const {name, value} = e.target;
    setValues({
      ...values,
      [name]: value
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    const {user, rating, slope} = values
    let [ item ] = users.filter(item => item._id === user);
    let [low] = item.rounds.sort((a,b)=>a-b);
    let dif = Math.floor(scoreDifferncial(low-3, rating, slope))
    let a = Math.floor(avg(dif))
    setHandicap(a);

    setSubmitted(true);
  }

  useEffect(()=>{
    getUsers()
  },[])

  return (
    <>
      {
      submitted ?
        <Container className='bg-dark rounded p-2 my-3 text-white'>
          <Row>
            <Col>
              <h1>Your handicap is {handicap}</h1>
            </Col>
          </Row>
        </Container>
      :
      <Container className='bg-dark rounded p-2 my-3 text-white'>
        <Row>
          <Col>
            <h1>Calculate Your Handicap</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <h2>Dont know where to get slope and course rating?</h2>
            <img src={image} alt="slope and course rating" />
            <h2>On the left of the slash is the course rating and on the left is the slope</h2>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Select Player</Form.Label>
                <Form.Select name='user' value={values.user} onChange={handleChange}>
                  <option value="">Please select a player</option>
                  {users.map(user=>(
                    <option key={user._id} value={user._id}>{user.username}</option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Course Rating</Form.Label>
                <Form.Control
                  type="number"
                  name='rating'
                  value={values.rating}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Course Slope</Form.Label>
                <Form.Control
                  type="number"
                  name='slope'
                  value={values.slope}
                  onChange={handleChange}
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
      }
    </>
  )
}

export default Handicap
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {
  Container,
  Row,
  Col,
  ListGroup,
  Button
} from 'react-bootstrap';

const ScoreCards = () => {
  const [cards, setCards] = useState([]);

  const getCards = async()=>{
    let res = await axios.get('http://localhost:8080/api/card')
    setCards(res.data.data)
  }

  useEffect(()=>{
    getCards();
  }, []);

  return (
  <>
    { cards.length > 0 ?
      <Container className="bg-dark p-1 rounded text-white">
          <Row>
            <Col>
              <h1>
                Course Cards
              </h1>
            </Col>
          </Row>
          <Row>
            <Col>
              <ListGroup>
                {cards.map(item=>(
                  <ListGroup.Item key={item._id} action>{item.course}</ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
          </Row>
          <Row className='my-2'>
            <Col>
              <Button>
                Create New ScoreCard
              </Button>
            </Col>
          </Row>
        </Container>
        :
        <Container>
          <Row>
            <Col>
              <h2>Loading</h2>
            </Col>
          </Row>
        </Container>
    }
  </>

  )
}

export default ScoreCards
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {
  Container,
  Row,
  Col,
  ListGroup,
  Button
} from 'react-bootstrap';
import Card from './Card'

const ScoreCards = () => {
  const [cards, setCards] = useState([]);
  const [card, setCard] = useState({});

  const getCards = async()=>{
    let res = await axios.get('http://localhost:8080/api/card')
    setCards(res.data.data)
  }

  useEffect(()=>{
    if (!cards.length) {
      getCards();
    }
  }, []);

  const getCard = card => {
    setCard(card)
  }

  return (
  <>
    {
    Object.keys(card).length > 0 ?
      <Card card={card} />
    :
    cards.length > 0 ?
      <Container className="bg-dark p-1 rounded text-white">
          <Row>
            <Col>
              <h1>
                Course Score Cards
              </h1>
            </Col>
          </Row>
          <Row>
            <Col>
              <ListGroup>
                {cards.map(item=>(
                  <ListGroup.Item key={item._id} action onClick={()=>getCard(item)}>{item.course}</ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
          </Row>
          <Row className='my-2'>
            <Col>
              <Button>
                Add A Course Score Card
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
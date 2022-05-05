import React, {useState, useEffect, useContext} from 'react'
import axios from 'axios';
import {
  Container,
  Row,
  Col,
  ListGroup,
  Form,
  Table,
  Button
} from 'react-bootstrap';

const FirstNine = ({first}) =>{
  return (
    <Col>
      <h3>{first.name}</h3>
      <Table responsive className='text-white'>
        <thead>
          <tr>
            <th>Par</th>
            {first.par.map((item, i)=>(
              <th xs={1} key={i}>{item}</th>
            ))}
          </tr>
          <tr>
            <th>Handicap</th>
            {first.handicap.map((item, i)=>(
              <th xs={1} key={i}>{item}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* {players.map(player=>(

          ))} */}
        </tbody>
      </Table>
    </Col>
  )
}

const SecondNine = ({second}) =>{
  return (
    <Col>
      <h3>{second.name}</h3>
      <Table responsive className='text-white'>
        <thead>
          <tr>
            <th>Par</th>
            {second.par.map((item, i)=>(
              <th xs={1} key={i}>{item}</th>
            ))}
          </tr>
          <tr>
            <th>Handicap</th>
            {second.handicap.map((item, i)=>(
              <th xs={1} key={i}>{item}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* {players.map(player=>(

          ))} */}
        </tbody>
      </Table>
    </Col>
  )
}

const SideSelect = ({card, selectSide}) => {
  return (
  <Col>
    <h3>Select your first 9</h3>
    <Form.Select onChange={selectSide}>
      <option value="">Please select a side</option>
      {card.sides.map(side=>(
        <option key={side._id} value={side._id}>{side.name}</option>
      ))}
    </Form.Select>
  </Col>
  )
}

const Card = ({card}) => {
  const [first, setFirst] = useState({});
  const [firstScores, setFristScores] = useState([]);
  const [second, setSecond] = useState({});
  const [secondScores, setSecondScores] = useState([]);
  const [users, setUsers] = useState([]);
  const [players, setPlayers] = useState([]);
  const [togglePlayer, setTogglePlayer] = useState(false);
  const [toggleSelect, setToggleSelect] = useState(false);


  const selectSide = e => {
    let [item] = card.sides.filter(item => item._id === e.target.value);
    if (Object.keys(first).length === 0) {
      setFirst(item);
    } else {
      setSecond(item)
    }
  }

  const getUsers = async() => {
    let res = await axios.get('http://localhost:8080/api/user');
    setPlayers(res.data);
  }

  useEffect(()=>{
    if (Object.keys(users).length === 0) {
      getUsers()
    }
  }, [])

  return (
  <>
    <Container className='bg-dark rounded p-1 my-2 text-white'>
      <Row>
        <Col>
          <h1>{card.course}</h1>
        </Col>
      </Row>
    </Container>
    <Container className='bg-dark rounded p-1 my-2 text-white'>
      <Row>
        {Object.keys(first).length > 0 ?
          <FirstNine first={first} />
          :
          <SideSelect card={card} selectSide={selectSide} />
        }
      </Row>
    </Container>
    <Container className='bg-dark rounded p-1 my-2 text-white'>
      <Row>
        {Object.keys(second).length > 0 ?
          <SecondNine second={second} />
          :
          <SideSelect card={card} selectSide={selectSide} />
        }
      </Row>
    </Container>
    <Container>
      <Row>
        <Col>
          { togglePlayer ?
            <>
              <h3>Select Player</h3>
              <Form.Select>
                <option value="">Please select a player</option>
                {players.map(player=>(
                  <option key={player._id} value={player._id}>{player.name}</option>
                ))}
              </Form.Select>
              <Button>Add</Button>
              <Button>Create New</Button>
            </>
            :
            <Button onClick={()=>setTogglePlayer(!togglePlayer)}>Add Player</Button>
          }
        </Col>
      </Row>
    </Container>
  </>
  )
}

export default Card
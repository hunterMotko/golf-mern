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

const FirstNine = ({first,players,firstScores,setFirstScores}) =>{
  const handleChange = (e,j,i) => {
    firstScores[j][i] = e.target.value
    setFirstScores([...firstScores])
  }

  const total = arr => arr.reduce((a,b)=>Number(a)+Number(b), 0);

  return (
    <Col>
      <h3>{first.name}</h3>
      <Table responsive className='text-white'>
        <thead>
          <tr>
            <th>Handicap</th>
            {first.handicap.map((item, i)=>(
              <th xs={1} key={i}>{item}</th>
            ))}
            <th>Total</th>
          </tr>
          <tr>
            <th>Par</th>
            {first.par.map((item, i)=>(
              <th xs={1} key={i}>{item}</th>
            ))}
            <th>{total(first.par)}</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player, j)=>(
            <tr key={player._id}>
              <td>{player.username}</td>
              {firstScores[j].map((val, i)=>(
                <td key={i}>
                  <Form.Control size='sm' type='number' value={val} onChange={e=>handleChange(e,j,i)}/>
                </td>
              ))}
              <td>{total(firstScores[j])}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Col>
  )
}

const SecondNine = ({second,players,secondScores,setSecondScores}) =>{
  const handleChange = (e,j,i) => {
    secondScores[j][i] = e.target.value
    setSecondScores([...secondScores])
  }

  const total = arr => arr.reduce((a,b)=>Number(a)+Number(b), 0)

  return (
    <Col>
      <h3>{second.name}</h3>
      <Table responsive className='text-white'>
        <thead>
          <tr>
            <th>Handicap</th>
            {second.handicap.map((item, i)=>(
              <th xs={1} key={i}>{item}</th>
            ))}
            <th>Total</th>
          </tr>
          <tr>
            <th>Par</th>
            {second.par.map((item, i)=>(
              <th xs={1} key={i}>{item}</th>
            ))}
            <th>{total(second.par)}</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player, j)=>(
            <tr key={player._id}>
              <td>{player.username}</td>
              {secondScores[j].map((val, i)=>(
                <td key={i}>
                  <Form.Control size='xs' type='number' value={val} onChange={e=>handleChange(e,j,i)}/>
                </td>
              ))}
              <td>{total(secondScores[j])}</td>
            </tr>
          ))}
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

const CreatePlayer = ({addPlayer, setAddPlayer, createPlayer, setToggleSelect}) => (
  <>
    <Form.Control
      type='text'
      placeholder='Create New Player'
      value={addPlayer}
      onChange={e => setAddPlayer(e.target.value)}
    />
    <Button className='m-1' onClick={createPlayer}>Add</Button>
    <Button variant="danger" className='m-1' onClick={()=>setToggleSelect(false)}>cancel</Button>
  </>
)

const SelectPlayers = ({holdId, users, selectPlayers, addPlayers, setTogglePlayer}) =>(
  <>
    <h3>Select Player</h3>
    <Form.Select value={holdId} onChange={selectPlayers}>
      <option value="">Please select a player</option>
      {users.map(user=>(
        <option key={user._id} value={user._id}>{user.username}</option>
      ))}
    </Form.Select>
    <Button className='m-1' onClick={addPlayers}>Add</Button>
    <Button variant="danger" className='m-1' onClick={()=>setTogglePlayer(false)}>cancel</Button>
  </>
)

const Card = ({card}) => {
  const [first, setFirst] = useState({});
  const [firstScores, setFirstScores] = useState([
    ['','','','','','','','',''],
    ['','','','','','','','',''],
    ['','','','','','','','',''],
    ['','','','','','','','','']
  ]);
  const [second, setSecond] = useState({});
  const [secondScores, setSecondScores] = useState([
    ['','','','','','','','',''],
    ['','','','','','','','',''],
    ['','','','','','','','',''],
    ['','','','','','','','','']
  ]);
  const [users, setUsers] = useState([]);
  const [players, setPlayers] = useState([]);
  const [addPlayer, setAddPlayer] = useState('');
  const [holdId, setHoldId] = useState('')
  const [togglePlayer, setTogglePlayer] = useState(false);
  const [toggleSelect, setToggleSelect] = useState(false);
  const [play, setPlay] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [finalScore, setFinalScore] = useState([]);

  const selectSide = e => {
    let [item] = card.sides.filter(item => item._id === e.target.value);
    if (Object.keys(first).length === 0) {
      setFirst(item);
    } else {
      setSecond(item);
    }
  }

  const selectPlayers = e => {
    setHoldId(e.target.value);
  }

  const addPlayers = e => {
    if (holdId !== '') {
      let [item] = users.filter(item => item._id === holdId);
      setPlayers([...players, item]);
      setHoldId('');
      setTogglePlayer(false)
      setToggleSelect(false)
    }
  }

  const getUsers = async() => {
    let res = await axios.get('http://localhost:8080/api/user');
    setUsers(res.data.data);
  }

  const createPlayer = async() => {
    if (addPlayer !== '') {
      let res = await axios.post('http://localhost:8080/api/user', {
        username: addPlayer
      });
      setPlayers([...players, res.data]);
      setAddPlayer('');
      setTogglePlayer(false);
      setToggleSelect(false);
    }
  }
  const total = arr => arr.reduce((a,b)=>Number(a)+Number(b), 0)
  const submit = async() =>{
    let res = players.map((player, i)=>{
      let f = total(firstScores[i])
      let s = total(secondScores[i])
      setFinalScore([
        ...finalScore, {name: player.username, total: (f+s)}
      ])
      return {id: player._id, total: (f+s)}
    })
    console.log(res);
    for(let item of res) {
      await axios.post(`http://localhost:8080/api/user/${item.id}`, {round: item.total})
    }

    setPlay(false);
    setSubmitted(true);
  }

  useEffect(()=>{
    if (Object.keys(users).length === 0) {
      getUsers()
    }
  }, []);

  return (
  <>
  {submitted?
    <Container>
      <Row className='bg-dark rounded p-1 my-2 text-white text-center'>
        <Col>
          <h1>Thank you for playing!</h1>
        </Col>
      </Row>
      <Row className='bg-dark rounded p-1 my-2 text-white text-center'>
        <Col>
          {finalScore.map(play=>(
            <h3 key={play.name}>
              {play.name} your final score was {play.total}
            </h3>
          ))}
        </Col>
      </Row>
    </Container>
    :
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
            <FirstNine
              first={first}
              players={players}
              firstScores={firstScores}
              setFirstScores={setFirstScores}
            />
            :
            <SideSelect card={card} selectSide={selectSide}/>
          }
        </Row>
      </Container>
      <Container className='bg-dark rounded p-1 my-2 text-white'>
        <Row>
          {Object.keys(second).length > 0 ?
            <SecondNine
              second={second}
              players={players}
              secondScores={secondScores}
              setSecondScores={setSecondScores}
            />
            :
            <SideSelect card={card} selectSide={selectSide}/>
          }
        </Row>
      </Container>
      <Container className='bg-dark rounded p-1 my-2 text-white'>
        {!play &&
          <Row>
            <Col>
              { togglePlayer ?
                <>
                  {(users.length===0||toggleSelect) ?
                    <CreatePlayer
                      addPlayer={addPlayer}
                      setAddPlayer={setAddPlayer}
                      createPlayer={createPlayer}
                      setToggleSelect={setToggleSelect}
                    />
                    :
                    <SelectPlayers
                      holdId={holdId}
                      users={users}
                      selectPlayers={selectPlayers}
                      addPlayers={addPlayers}
                      setTogglePlayer={setTogglePlayer}
                    />
                  }
                  {!toggleSelect &&
                    <Button className='m-1' onClick={()=>setToggleSelect(true)}>Create New</Button>
                  }
                </>
                :
                <Button onClick={()=>setTogglePlayer(true)}>Add Player</Button>
              }
            </Col>
          </Row>
        }
        <Row className="my-2">
          <Col>
            {play ?
              <Button variant="success" onClick={submit}>Submit</Button> :
              <Button variant="success" onClick={()=>setPlay(true)}>Play</Button>
            }
          </Col>
        </Row>
      </Container>
    </>
    }
  </>
  )
}

export default Card
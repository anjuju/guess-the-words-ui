import React from 'react';
import './styles.css';


class Role extends React.Component {

  state = {
    role: {},
    roomId: '',
  }

  handleRoleClick = (event) => {
    let color;
    let type;

    (event.target.id === 'redSpyMaster' || event.target.id === 'redGuesser') ? color = 'red' : color = 'blue';
    (event.target.id === 'redSpyMaster' || event.target.id === 'blueSpyMaster') ? type = 'spymaster' : type = 'guesser';
    this.setState({
      role : {
        color,
        type
      }
    });
    // setTimeout(()=>console.log("role (state):", this.state.role),0);
  }

  handleRoomId = (event) => {
    this.setState({
      roomId: event.target.value
    })
  }

  render() {
    return (
      <section className="role-section__container">
        <h1>Choose your role:</h1>
        <ul className="role__container">
          <li className="role red">
            <input type="radio" id="redGuesser" name="role" onClick={this.handleRoleClick}/>
            <label htmlFor="redGuesser">I am a red guesser</label>
          </li>
          <li className="role blue">
            <input type="radio" id="blueGuesser" name="role" onClick={this.handleRoleClick}/>
            <label htmlFor="blueGuesser">I am a blue guesser</label>
          </li>
          <li className="role red">
            <input type="radio" id="redSpyMaster" name="role" onClick={this.handleRoleClick}/>
            <label htmlFor="redSpyMaster">I am a red spymaster</label>
          </li>
          <li className="role blue">
            <input type="radio" id="blueSpyMaster" name="role" onClick={this.handleRoleClick}/>
            <label htmlFor="blueSpyMaster">I am a blue spymaster</label>
          </li>
        </ul>
        <div className="game-btns">
          {(this.props.roomId === '') && <button type="submit" onClick={()=>this.props.onNewGame(this.state.role)}>New Game</button>}
          <button type="submit" onClick={()=>this.props.onJoinGame(this.state.role, this.state.roomId)}>Join Game</button>
          {(this.props.roomId === '') && <input className="room-id" type="text" placeholder="room-ID" onChange={this.handleRoomId}/>}
          {(this.props.roomId !== '') && <div className="gameID">Currently in: {this.props.roomId}</div> }
        </div>
      </section>
    );
  }
}

export default Role;
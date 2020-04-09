import React from 'react';
import './styles.css';


class Role extends React.Component {

  state = {
    role: '',
    roomId: '',
  }

  handleRoleClick = (event) => {
    this.setState({
      role: event.target.id
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
        <button type="submit" onClick={()=>this.props.onNewGame(this.state.role)}>New Game</button>
        <input type="text" placeholder="Enter Game ID" onChange={this.handleRoomId}/>
        <button type="submit" onClick={()=>this.props.onJoinGame(this.state.role, this.state.roomId)}>Join Game</button>
      </section>
    );
  }
}

export default Role;
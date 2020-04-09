import React from 'react';
import './styles.css';

import Role from '../Role/Component';
import GameBoard from '../GameBoard/Component';

class Game extends React.Component {
  
  state = {
    board: [[{"word":"POLE","color":"blue","toReveal":false},{"word":"SUIT","color":"neutral","toReveal":false},{"word":"SLIP","color":"black","toReveal":false},{"word":"HAND","color":"red","toReveal":false},{"word":"BUGLE","color":"neutral","toReveal":false}],[{"word":"VAN","color":"red","toReveal":false},{"word":"LEPRECHAUN","color":"blue","toReveal":false},{"word":"SERVER","color":"blue","toReveal":false},{"word":"ROUND","color":"blue","toReveal":false},{"word":"DISEASE","color":"red","toReveal":false}],[{"word":"SCREEN","color":"red","toReveal":false},{"word":"THEATER","color":"red","toReveal":false},{"word":"DIAMOND","color":"neutral","toReveal":false},{"word":"NINJA","color":"red","toReveal":false},{"word":"CASINO","color":"blue","toReveal":false}],[{"word":"MAPLE","color":"red","toReveal":false},{"word":"STADIUM","color":"red","toReveal":false},{"word":"COTTON","color":"blue","toReveal":false},{"word":"CODE","color":"blue","toReveal":false},{"word":"EMBASSY","color":"blue","toReveal":false}],[{"word":"FISH","color":"neutral","toReveal":false},{"word":"FAIR","color":"neutral","toReveal":false},{"word":"SCORPION","color":"red","toReveal":false},{"word":"NAIL","color":"neutral","toReveal":false},{"word":"LIFE","color":"neutral","toReveal":false}]],
    role: '',
    roomId: '',
  }
   
  componentDidMount() {
    fetch(`http://localhost:8080/board`)
      .then(response => {
        // console.log(response);
        return response.json() 
      }) // parse JSON from request
      .then(resultData => {
        console.log('resultData', resultData);
        if (resultData.message === "please create a new board first!") {
          fetch('http://localhost:8080/board', {
            method: 'post',
            headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
            }
          })
            .then(res=>res.json())
            .then(res => {
              this.setState({ board: res.board})
            });
        } else {
          this.setState({ board: resultData.board})
        }
    });
    this.props.socket.on('tileClicked', data => {
      this.updateBoard(data.coord);
    })
  }

  updateBoard = (coord) => {
    const newBoard = this.state.board.slice();
    // if (!newBoard[coord.x][coord.y].toReveal) {
    //   newBoard[coord.x][coord.y].toReveal = true;
    // }
    newBoard[coord.x][coord.y].toReveal = !newBoard[coord.x][coord.y].toReveal;
    this.setState({
      board: newBoard,
    });
    
    if (newBoard[coord.x][coord.y].color === "black") {
      alert("You clicked the assassin! Sorry, you lose!");
      this.revealBoard();
    }
  }

  handleClick = (coord) => {
    this.props.socket.emit('clickTile', {
      coord,
      room: this.state.room
    });

    this.updateBoard(coord);
  }

  handleNewGame = () => {
    fetch('http://localhost:8080/board', {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
      .then(res=>res.json())
      .then(res => {
        window.location.reload();
      });
  }

  handleRoleSubmit = (role) => {
    if (role === '') {
      alert('Please choose a role')
    } else {
      if (role === 'redSpyMaster' || role === 'blueSpyMaster') {
        this.revealBoard();
      }
      this.setState({
        role
      });
      // setTimeout(()=>console.log("role (game):", this.state.role),0);
    }
  }

  handleCreateNewGame = (role) => {
    console.log('creating new game');
    this.props.socket.emit('createGame');
    this.props.socket.on('newGame', data => {
      this.setState({
        room: data.room
      });
    });
    this.handleRoleSubmit(role);
  }

  handleJoinGame = (role, room) => {
    console.log('room', room);
    this.props.socket.emit('joinGame', { role, room })
    this.setState({
      room
    });
    this.handleRoleSubmit(role);
  }

  revealBoard = () => {
    const newBoard = this.state.board.map((boardRow) => {
      return boardRow.map(tile => {
        return { ...tile, toReveal: true };
      })
    });
    this.setState({
      board: newBoard
    });
    setTimeout(()=>console.log("reveal board:", this.state.board),0);
  }

  render() {

    // let status;
    // // if (winner) {
    // //   status = "Winner: " + winner;
    // // } else {
    //   status = "Next team: " + (this.state.redIsNext ? "red" : "blue");
    // // }

    if (this.state.role) {
      return (
        <div className="game">
          <div className="game-board">
            <GameBoard
              board={this.state.board}
              onClick={coord => this.handleClick(coord)}
            />
          </div>
          <div className="gameID">Please share your game ID with friends: {this.state.room}</div>
          {/* <div className="game-info">
            <div>{status}</div>
          </div> */}
          <button className="btn-newGame" onClick={this.handleNewGame}> New Game </button>
          {(this.state.role === "redGuesser" || this.state.role === "blueGuesser") && <button onClick={this.revealBoard}> Reveal Board </button>}
        </div>
      );
    } else {
      return (
        <div className="start-game">
          {/* <button onClick={}>Start new game</button>
          <button onClick={}>Join existing game</button> */}
          <Role 
          state={this.state}
          onNewGame={this.handleCreateNewGame} 
          onJoinGame={this.handleJoinGame}
          />
        </div>
      );
    }
  }
}

export default Game;
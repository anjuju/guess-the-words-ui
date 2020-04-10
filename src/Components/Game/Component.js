import React from 'react';
import './styles.css';

import Role from '../Role/Component';
import GameBoard from '../GameBoard/Component';

/* Socket IO */
import socketIOClient from 'socket.io-client';
const socketEndPoint = 'http://localhost:8080/';

// Connect to the socket
const socket = socketIOClient(socketEndPoint); 


class Game extends React.Component {
  
  state = {
    // board: [[{"word":"TEST","color":"blue","toReveal":false},{"word":"SUIT","color":"neutral","toReveal":false},{"word":"SLIP","color":"black","toReveal":false},{"word":"HAND","color":"red","toReveal":false},{"word":"BUGLE","color":"neutral","toReveal":false}],[{"word":"VAN","color":"red","toReveal":false},{"word":"LEPRECHAUN","color":"blue","toReveal":false},{"word":"SERVER","color":"blue","toReveal":false},{"word":"ROUND","color":"blue","toReveal":false},{"word":"DISEASE","color":"red","toReveal":false}],[{"word":"SCREEN","color":"red","toReveal":false},{"word":"THEATER","color":"red","toReveal":false},{"word":"DIAMOND","color":"neutral","toReveal":false},{"word":"NINJA","color":"red","toReveal":false},{"word":"CASINO","color":"blue","toReveal":false}],[{"word":"MAPLE","color":"red","toReveal":false},{"word":"STADIUM","color":"red","toReveal":false},{"word":"COTTON","color":"blue","toReveal":false},{"word":"CODE","color":"blue","toReveal":false},{"word":"EMBASSY","color":"blue","toReveal":false}],[{"word":"FISH","color":"neutral","toReveal":false},{"word":"FAIR","color":"neutral","toReveal":false},{"word":"SCORPION","color":"red","toReveal":false},{"word":"NAIL","color":"neutral","toReveal":false},{"word":"LIFE","color":"neutral","toReveal":false}]],
    role: {},
    roomId: '',
  }
   
  componentDidMount() {
    // fetch(`http://localhost:8080/board`)
    //   .then(res => {
    //     // console.log(res);
    //     return res.json() 
    //   }) // parse JSON from request
    //   .then(resultData => {
    //     //console.log('resultData', resultData);
    //     if (resultData.message === "please create a new board first!") {
    //       fetch('http://localhost:8080/board', {
    //         method: 'post',
    //         headers: {
    //           'Accept': 'application/json, text/plain, */*',
    //           'Content-Type': 'application/json'
    //         },
    //         //body: JSON.stringify(data)
    //       })
    //         .then(res=>res.json())
    //         .then(res => {
    //           this.setState({ board: res.board})
    //         });
    //     } else {
    //       this.setState({ board: resultData.board})
    //     }
    // });
    socket.on('updateBoard', data => {
      // console.log('updateBoard', data);
      if (data) {
        this.setState({
          board: data.board
        });
      } else {
        this.setState({
          board: null
        });
      }  
    });
  }
  
  handleRoleSubmit = (role) => {   
    if (!role.type) {
      alert('Please choose a Role');
    } else {
      this.setState({
        role
      });
      // setTimeout(()=>console.log("role (game):", this.state.role),0);
    }
  }

  enterGame = (data) => {
    if (data.error && this.state.role.type) {
      alert(data.error);
    } else if (data.board) {
      console.log('entering game', data.roomId);
      this.setState({
        roomId: data.roomId,
        board: data.board
      });
    }
  }

  handleCreateNewGame = (role) => {
    this.handleRoleSubmit(role);
    console.log('creating new game');
    socket.emit('createGame', { role });
    socket.on('creatingGame', data => this.enterGame(data));
  }

  handleJoinGame = (role, roomId) => {
    this.handleRoleSubmit(role);
    if (roomId === '') {
      alert('Please enter a Room ID');
    } else {
      console.log('joining game', roomId);
      socket.emit('joinGame', { role, roomId });
      socket.on('joiningGame', data => this.enterGame(data));
    }
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
      alert("The assassin was clicked! Game over!");
    }

    socket.emit('clickTile', {
      roomId: this.state.roomId,
      board: this.state.board,
      coord,
    });
  }

  handleNewBoard = () => {
    // fetch('http://localhost:8080/board', {
    //   method: 'DELETE',
    //   headers: {
    //     'Accept': 'application/json, text/plain, */*',
    //     'Content-Type': 'application/json'
    //   }
    // })
    //   .then(res=>res.json())
    //   .then(res => {
    //     window.location.reload();
    //   });
    socket.emit('getNewBoard', { roomId: this.state.roomId });
    this.setState({
      role: {}
    });
  }

  revealBoard = () => {
    const newBoard = this.state.board.map((boardRow) => {
      return boardRow.map(tile => {
        if (this.state.role.type === "guesser") {
          return { ...tile, toReveal: true };
        } else {
          // for spymasters... this will be inverted in GameBoard
          return { ...tile, toReveal: false };
        }
        
      })
    });

    this.setState({
      board: newBoard
    });
    //setTimeout(()=>console.log("reveal board:", this.state.board),0);
  }

  render() {

    // let status;
    // // if (winner) {
    // //   status = "Winner: " + winner;
    // // } else {
    //   status = "Next team: " + (this.state.redIsNext ? "red" : "blue");
    // // }

    if (this.state.role.type && this.state.board) {
      return (
        <div className="game">
          <div className={`role ${this.state.role.color}`}>Role: {this.state.role.color} {this.state.role.type}</div>
          <GameBoard
            board={this.state.board}
            onClick={coord => this.updateBoard(coord)}
            role={this.state.role}
          />
          <div className="gameID">Room ID: {this.state.roomId}</div>
          <div className="game-btns">
            <button onClick={this.handleNewBoard}> Change Board </button>
            <button onClick={this.revealBoard}> Reveal Board </button>
          </div>
          
        </div>
      );
    } else {
      return (
        <div className="start-game">
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
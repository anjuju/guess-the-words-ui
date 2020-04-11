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
    alert: '',
  }
   
  componentDidMount() {
    socket.on('updateBoard', data => {
      if (data.role) {
        this.setState({
          role: data.role,
        });
      } 
      this.setState({
        board: data.board
      });
      // setTimeout(()=>console.log('state', this.state));
    });
  }
  
  handleRoleSubmit = (role) => {   
    if (!role.type) {
      this.setState({
        alert: 'Please choose a Role'
      });
    } else {
      this.setState({
        role
      });
    }
  }

  enterGame = (data) => {
    if (data.error && this.state.role.type) {
      this.setState({
        alert: data.error
      });
    } else if (data.board) {
      console.log('entering game', data.roomId);
      this.setState({
        roomId: data.roomId,
        board: data.board,
        alert: ''
      });
    }
  }

  handleCreateNewGame = (role) => {
    this.handleRoleSubmit(role);
    //console.log('creating new game');
    socket.emit('createGame', { role });
    socket.on('creatingGame', data => this.enterGame(data));
  }

  handleJoinGame = (role, roomId) => {
    this.handleRoleSubmit(role);
    if (roomId === '' && this.state.roomId === '') {
      this.setState({
        alert: 'Please enter a Room ID'
      });
    } else {
      //console.log('joining game', roomId);
      socket.emit('joinGame', { role, roomId });
      socket.on('joiningGame', data => this.enterGame(data));
    }
  }

  updateBoard = (coord) => {
    const newBoard = this.state.board.slice();
    newBoard[coord.x][coord.y].toReveal = !newBoard[coord.x][coord.y].toReveal;
    this.setState({
      board: newBoard,
    });
    
    if (newBoard[coord.x][coord.y].color === "black") {
      alert("The assassin was clicked! Game over");
    }

    const { roomId, board } = this.state;
    socket.emit('clickTile', { 
      roomId,
      board
    });
  }

  handleNewBoard = () => {
    const { roomId } = this.state;
    socket.emit('getNewBoard', { roomId });
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

  leaveRoom = () => {
    const { roomId } = this.state;
    socket.emit('leaveRoom', { roomId });
    this.setState({
      role: {},
      roomId: '',
      board: null
    });
  }

  render() {
    if (this.state.role.type && this.state.board) {
      return (
        <div className="game">
          <div className={`role ${this.state.role.color}`}>Role: {this.state.role.color} {this.state.role.type}</div>
          <GameBoard
            board={this.state.board}
            onClick={coord => this.updateBoard(coord)}
            role={this.state.role}
          />
          <div className="gameID">Currently in: {this.state.roomId}</div>
          <div className="game-btns">
            <button onClick={this.handleNewBoard}> Change Board </button>
            <button onClick={this.revealBoard}> Reveal Board </button>
            <button onClick={this.leaveRoom}> Leave Room </button>
          </div>
          
        </div>
      );
    } else {
      return (
        <div className="start-game">
          <div className="extra-info">{this.state.alert}</div>
          <Role 
          roomId={this.state.roomId}
          onNewGame={this.handleCreateNewGame} 
          onJoinGame={this.handleJoinGame}
          />
        </div>
      );
    }
  }
}

export default Game;
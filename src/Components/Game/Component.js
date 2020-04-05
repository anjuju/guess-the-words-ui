import React, { useState, useEffect } from 'react';
import './styles.css';

import Role from '../Role/Component';
import GameBoard from '../GameBoard/Component';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: [[{"word":"POLE","color":"blue","toReveal":false},{"word":"SUIT","color":"neutral","toReveal":false},{"word":"SLIP","color":"black","toReveal":false},{"word":"HAND","color":"red","toReveal":false},{"word":"BUGLE","color":"neutral","toReveal":false}],[{"word":"VAN","color":"red","toReveal":false},{"word":"LEPRECHAUN","color":"blue","toReveal":false},{"word":"SERVER","color":"blue","toReveal":false},{"word":"ROUND","color":"blue","toReveal":false},{"word":"DISEASE","color":"red","toReveal":false}],[{"word":"SCREEN","color":"red","toReveal":false},{"word":"THEATER","color":"red","toReveal":false},{"word":"DIAMOND","color":"neutral","toReveal":false},{"word":"NINJA","color":"red","toReveal":false},{"word":"CASINO","color":"blue","toReveal":false}],[{"word":"MAPLE","color":"red","toReveal":false},{"word":"STADIUM","color":"red","toReveal":false},{"word":"COTTON","color":"blue","toReveal":false},{"word":"CODE","color":"blue","toReveal":false},{"word":"EMBASSY","color":"blue","toReveal":false}],[{"word":"FISH","color":"neutral","toReveal":false},{"word":"FAIR","color":"neutral","toReveal":false},{"word":"SCORPION","color":"red","toReveal":false},{"word":"NAIL","color":"neutral","toReveal":false},{"word":"LIFE","color":"neutral","toReveal":false}]],
      role: '',
    };
  }

  
  componentDidMount() {
    fetch(`http://localhost:8080/board`)
      .then(response => {
        // console.log(response);
        return response.json() 
      }) // parse JSON from request
      .then(resultData => {
        console.log('resultData', resultData);
        if (resultData.message == "please create a new board first!") {
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

    })
  }

  handleClick(coord) {
    // if (calculateWinner(tiles) || tiles[i]) {
    //   return;
    // }
    const newBoard = this.state.board.slice();
    newBoard[coord.x][coord.y].toReveal = !newBoard[coord.x][coord.y].toReveal;
    console.log('send sio message');
    // this.props.sendSioMessage();
    this.setState({
      board: newBoard,
    });
  }

  // jumpTo(step) {
  //   this.setState({
  //     stepNumber: step,
  //     redIsNext: (step % 2) === 0
  //   });
  // }

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
        const newBoard = this.state.board.map((boardRow) => {
          return boardRow.map(tile => {
            return { ...tile, toReveal: true };
          })
        });
        this.setState({
          role,
          board: newBoard
        })
      } else {
        this.setState({
          role
        });
      }
      // setTimeout(()=>console.log("role (game):", this.state.role),0);
    }
  }

  render() {

    // const winner = calculateWinner(current.tiles);

    // const moves = history.map((step, move) => {
    //   const desc = move ?
    //     'Go to move #' + move :
    //     'Go to game start';
    //   return (
    //     <li key={move}>
    //       <button onClick={() => this.jumpTo(move)}>{desc}</button>
    //     </li>
    //   );
    // });

    let status;
    // if (winner) {
    //   status = "Winner: " + winner;
    // } else {
      status = "Next player: " + (this.state.redIsNext ? "red" : "blue");
    // }

    if (this.state.role) {
      return (
        <div className="game">
          <div className="game-board">
            <GameBoard
              board={this.state.board}
              onClick={coord => this.handleClick(coord)}
            />
          </div>
          <button onClick={() => this.handleNewGame()}> New Game </button>
          <div className="game-info">
            <div>{status}</div>
            {/* <ol>{moves}</ol> */}
          </div>
        </div>
      );
    } else {
      return (
        <Role 
          state={this.state}
          onSubmit={this.handleRoleSubmit} 
          />
      );
    }
  }
}

export default Game;
import React, { useState, useEffect } from 'react';
import './styles.css';

import Role from '../Role/Component';
import GameBoard from '../GameBoard/Component';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          board: [[{"word":"POLE","color":"blue","toReveal":false},{"word":"SUIT","color":"neutral","toReveal":false},{"word":"SLIP","color":"black","toReveal":false},{"word":"HAND","color":"red","toReveal":false},{"word":"BUGLE","color":"neutral","toReveal":false}],[{"word":"VAN","color":"red","toReveal":false},{"word":"LEPRECHAUN","color":"blue","toReveal":false},{"word":"SERVER","color":"blue","toReveal":false},{"word":"ROUND","color":"blue","toReveal":false},{"word":"DISEASE","color":"red","toReveal":false}],[{"word":"SCREEN","color":"red","toReveal":false},{"word":"THEATER","color":"red","toReveal":false},{"word":"DIAMOND","color":"neutral","toReveal":false},{"word":"NINJA","color":"red","toReveal":false},{"word":"CASINO","color":"blue","toReveal":false}],[{"word":"MAPLE","color":"red","toReveal":false},{"word":"STADIUM","color":"red","toReveal":false},{"word":"COTTON","color":"blue","toReveal":false},{"word":"CODE","color":"blue","toReveal":false},{"word":"EMBASSY","color":"blue","toReveal":false}],[{"word":"FISH","color":"neutral","toReveal":false},{"word":"FAIR","color":"neutral","toReveal":false},{"word":"SCORPION","color":"red","toReveal":false},{"word":"NAIL","color":"neutral","toReveal":false},{"word":"LIFE","color":"neutral","toReveal":false}]]
        }
      ],
      board: [[{"word":"POLE","color":"blue","toReveal":false},{"word":"SUIT","color":"neutral","toReveal":false},{"word":"SLIP","color":"black","toReveal":false},{"word":"HAND","color":"red","toReveal":false},{"word":"BUGLE","color":"neutral","toReveal":false}],[{"word":"VAN","color":"red","toReveal":false},{"word":"LEPRECHAUN","color":"blue","toReveal":false},{"word":"SERVER","color":"blue","toReveal":false},{"word":"ROUND","color":"blue","toReveal":false},{"word":"DISEASE","color":"red","toReveal":false}],[{"word":"SCREEN","color":"red","toReveal":false},{"word":"THEATER","color":"red","toReveal":false},{"word":"DIAMOND","color":"neutral","toReveal":false},{"word":"NINJA","color":"red","toReveal":false},{"word":"CASINO","color":"blue","toReveal":false}],[{"word":"MAPLE","color":"red","toReveal":false},{"word":"STADIUM","color":"red","toReveal":false},{"word":"COTTON","color":"blue","toReveal":false},{"word":"CODE","color":"blue","toReveal":false},{"word":"EMBASSY","color":"blue","toReveal":false}],[{"word":"FISH","color":"neutral","toReveal":false},{"word":"FAIR","color":"neutral","toReveal":false},{"word":"SCORPION","color":"red","toReveal":false},{"word":"NAIL","color":"neutral","toReveal":false},{"word":"LIFE","color":"neutral","toReveal":false}]],
      stepNumber: 0,
      redIsNext: true,
      role: ''
    };
  }

  componendDidMount() {
    fetch(`https://api.github.com/repos/gatsbyjs/gatsby`)
      .then(response => response.json()) // parse JSON from request
      .then(resultData => {
        console.log(resultData)
      }) // set data for the number of stars
  }
  // const [gameBoard, setgameBoard] = useState(0);
  // useEffect(() => {
  //   // get data from GitHub api
  // }, []);


  handleClick(coord) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const board = current.board.slice();
    // if (calculateWinner(tiles) || tiles[i]) {
    //   return;
    // }
    console.log('coord is', coord.x, coord.y);
    console.log('toReveal before:', board[coord.x][coord.y].toReveal);
    console.log('toreveal after click ', !board[coord.x][coord.y].toReveal);
    const newBoard = this.state.board.slice();
    newBoard[coord.x][coord.y].toReveal = !newBoard[coord.x][coord.y].toReveal;
    board[coord.x][coord.y].toReveal = !board[coord.x][coord.y].toReveal;
    this.setState({
      history: history.concat([
        {
          board: board
        }
      ]),
      board: newBoard,
      stepNumber: history.length,
      redIsNext: !this.state.redIsNext
    });
  }

  // jumpTo(step) {
  //   this.setState({
  //     stepNumber: step,
  //     redIsNext: (step % 2) === 0
  //   });
  // }

  handleRoleSubmit = (role) => {
    if (role === '') {
      alert('Please choose a role')
    } else {
      if (role === 'redSpyMaster' || role === 'blueyMaster') {
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
    const history = this.state.history;
    const current = history[this.state.stepNumber];
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
              board={current.board}
              onClick={coord => this.handleClick(coord)}
            />
          </div>
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
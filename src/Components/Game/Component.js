import React from 'react';
import './styles.css';

import Role from '../Role/Component';
import GameBoard from '../GameBoard/Component';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          tiles: Array(25).fill(null)
        }
      ],
      stepNumber: 0,
      redIsNext: true,
      role: ''
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const tiles = current.tiles.slice();
    // if (calculateWinner(tiles) || tiles[i]) {
    //   return;
    // }
    tiles[i] = this.state.redIsNext ? "red" : "blue";
    this.setState({
      history: history.concat([
        {
          tiles: tiles
        }
      ]),
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
      this.setState({
        role
      });
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
              tiles={current.tiles}
              onClick={i => this.handleClick(i)}
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
import React from 'react';
import './styles.css';

import { requestBoard } from '../../thunks/requestBoard';
import Tile from '../Tile/Component';

class GameBoard extends React.Component {
  
  componentDidMount() {
    const boardData = requestBoard();
  }
  
  renderTile(i) {
    return (
      <Tile
        value={this.props.tiles[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderTile(0)}{this.renderTile(1)}{this.renderTile(2)}{this.renderTile(3)}{this.renderTile(4)}
        </div>
        <div className="board-row">
          {this.renderTile(5)}{this.renderTile(6)}{this.renderTile(7)}{this.renderTile(8)}{this.renderTile(9)}
        </div>
        <div className="board-row">
          {this.renderTile(10)}{this.renderTile(11)}{this.renderTile(12)}{this.renderTile(13)}{this.renderTile(14)}
        </div>
        <div className="board-row">
          {this.renderTile(15)}{this.renderTile(16)}{this.renderTile(17)}{this.renderTile(18)}{this.renderTile(19)}
        </div>
        <div className="board-row">
          {this.renderTile(20)}{this.renderTile(21)}{this.renderTile(22)}{this.renderTile(23)}{this.renderTile(24)}
        </div>
      </div>
    );
  }
}

export default GameBoard;
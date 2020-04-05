import React from 'react';
import './styles.css';

import { requestBoard } from '../../thunks/requestBoard';
import Tile from '../Tile/Component';

class GameBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: props.board
    };
  }

  componentDidMount() {
    const boardData = requestBoard();
  }

  
  renderTile(tile, coord) {
    return (
      <Tile
        key={`${coord.x}${coord.y}`}
        word={tile.word}
        onClick={() => this.props.onClick(coord)}
      />
    );
  }

  createBoard(boardData) {
    console.log('new board data', boardData)
    let boardDisplay = boardData.map((boardRowData, x) =>{
      return boardRowData.map((tile, y) => {
        return this.renderTile(tile, { x, y });
      })
    });
    return boardDisplay;
  }
  
  render() {
    const boardDisplay = this.createBoard(this.state.board);
    console.log('rendering props', this.state.board)
    // console.log('boardDisplay', this.props.board);
    return (
      <div>
        {/* <div> {this.props.board[0][0].word }</div> */}
        <div className="board-row">
          {this.props.board[0].map((tile, y) => { this.renderTile(tile, { x: 0, y })})}
        </div>
        <div className="board-row">
          {boardDisplay[1]}
        </div>
        <div className="board-row">
          {boardDisplay[2]}
        </div>
        <div className="board-row">
          {boardDisplay[3]}
        </div>
        <div className="board-row">
          {boardDisplay[4]}
        </div>
      </div>
    );
  }
}

export default GameBoard;
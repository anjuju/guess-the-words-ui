import React from 'react';
import './styles.css';

import Tile from '../Tile/Component';

const GameBoard = (props) => {
  
  const renderTile = (tile, coord) => {
    return (
      <Tile
        key={`${coord.x}${coord.y}`}
        tile={tile}
        onClick={() => props.onClick(coord)}
      />
    );
  };



  const createBoard = (boardData) => {
    // console.log('new board data', boardData);
    let boardDisplay = boardData.map((boardRowData, x) =>{
      return boardRowData.map((tile, y) => {
        const newTile = {...tile};
        if (props.role === 'redSpyMaster' || props.role === 'blueSpyMaster') {
          newTile.toReveal = !newTile.toReveal;
        }
        return renderTile(newTile, { x, y });
      })
    });
    return boardDisplay;
  };
  
  const boardDisplay = createBoard(props.board);
  // console.log('rendering props', props.board);

  return (
    <div>
      <div className="board-row">
        {boardDisplay[0]}
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

export default GameBoard;
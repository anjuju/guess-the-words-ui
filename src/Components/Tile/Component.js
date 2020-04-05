import React from 'react';
import './styles.css';

const Tile = (props) => (
  <button
    className={`tile ${props.tile.toReveal ? props.tile.color : ''}`}
    onClick={() => props.onClick()}>
    {props.tile.word}
  </button>
);

export default Tile;
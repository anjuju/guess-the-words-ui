import React from 'react';
import './styles.css';

const Tile = (props) => (
  <button
    className="tile"
    onClick={() => props.onClick()}>
    {props.value}
  </button>
);


export default Tile;
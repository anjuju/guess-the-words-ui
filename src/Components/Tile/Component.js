import React from 'react';
import './styles.css';

const className = (tile, roleType) => {
  if (tile.toReveal) {
    return tile.color;
  } else {
    if (roleType === 'spymaster') {
      return `${tile.color}-font dull`;
    } else {
      return ''
    }
  }
}

const Tile = (props) => (
  <button
    className={`tile ${className(props.tile, props.roleType)}`}
    onClick={() => props.onClick()}>
    {props.tile.word}
  </button>
);

export default Tile;
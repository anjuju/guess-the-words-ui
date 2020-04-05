import React from 'react';
import './styles.css';

class Tile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tile: props.tile
    };
  }

  render() {
    return (
      <button
        className={`tile ${this.state.tile.toReveal ? this.state.tile.color : ''}`}
        onClick={() => this.props.onClick()}>
        {this.state.tile.word}
      </button>
    )
  }
}

// const Tile = (props) => (
//   <button
//     className={`tile ${props.tile.toReveal ? props.tile.color : ''}`}
//     onClick={() => props.onClick()}>
//     {props.tile.word}
//   </button>
// );


export default Tile;
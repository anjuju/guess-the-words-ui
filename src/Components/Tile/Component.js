import React from 'react';
import './styles.css';

class Tile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toReveal: props.toReveal,
      word: props.word,
      color: props.color
    };
  }

  render() {
    return (
      <button
        className={`tile ${this.state.toReveal ? this.state.color : ''}`}
        onClick={() => this.props.onClick()}>
        {this.state.word}
      </button>
    )
  }
}

// const Tile = (props) => (
//   <button
//     className={`tile ${props.toReveal ? props.color : ''}`}
//     onClick={() => props.onClick()}>
//     {props.word}
//   </button>
// );


export default Tile;
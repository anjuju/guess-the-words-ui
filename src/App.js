import React from 'react';
import './App.css';

import Game from './Components/Game/Component';

function App() {
  return (
    <div className="App">
      <header>
        <h1>Guess the Words</h1>
      </header>
      <Game />
      <footer>
        <p>Coded by John and Angelica</p>
      </footer>
    </div>
  );
}

export default App;

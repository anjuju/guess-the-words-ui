import React, {useEffect} from 'react';
import './App.css';
import socketIOClient from 'socket.io-client';
import Game from './Components/Game/Component';

/* Socket IO */

const socketEndPoint = 'http://localhost:8080/';

// Connect to the socket
const socket = socketIOClient(socketEndPoint); 
const dataKey = 'incoming data';

const sendData = function() {
  socket.emit(dataKey, 'data');
}

const recepData = function() {
  //Listen for data on the "outgoing data" namespace
  //and supply a callback for what to do when we get one
  socket.on('outgoing data', data => console.log(data))
}

// const ns= 'public_chat';
// const salaSocket = socketIOClient(socketEndPoint + ns)
// const messageKey = 'test_message'; // Message id

// function sendMessage(){
//   salaSocket.emit(messageKey, 'Prueba de mensaje desde el cliente: '+Math.random())
// }

// function recepMessage(){
//   salaSocket.on(messageKey, (received) => {
//     alert('Message: '+ received)
//   })
// }

function App() {
  // useEffect(() => recepMessage() , [])
  useEffect(() => recepData() , [])
  return (
    <div className="App">
      {/* <div className="App">
        <button style={{marginTop: '50', padding: '10px'}} onClick={sendMessage}>
          Send message
        </button>
      </div> */}
      <header>
        <h1>Guess the Words</h1>
      </header>
      <Game sendSioData={sendData}/>
      <footer>
        <p>Coded by John and Angelica</p>
      </footer>
    </div>
  );
}

export default App;

// src/App.js

import React from 'react';
import './App.css';
import Assess from './assess'; 

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Are You Disillusioned?</h1>
      </header>
      <div className="main-content">
        <Assess /> {/* Render the Assess component */}
      </div>
    </div>
  );
}

export default App;

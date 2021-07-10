import React from 'react';
import './App.css';
import { generateFullName } from './names';

function App() {
  const names = [];
  for (let i = 0; i < 10; i++) {
    names.push(generateFullName());
  }
  return (
    <>
      {names.map(name => <div key={name}>{name}</div>)}
    </>
  );
}

export default App;

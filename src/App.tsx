import React, { useState } from 'react';
import styles from './App.module.css';
import { generateFullName } from './names';

function App() {
  const [names, setNames] = useState<string[]>(generateNames(10));

  return (
    <div className={styles.app}>
      <div className={styles.names}>
        {names.map(name => (
          <div className={styles.name} key={name}>
            {name}
          </div>
        ))}
      </div>
      <button
        className={styles.button}
        onClick={() => setNames(generateNames(10))}
      >
        Refresh
      </button>
    </div>
  );
}

const generateNames = (count: number): string[] => {
  const names = [];
  for (let i = 0; i < count; i++) {
    names.push(generateFullName());
  }
  return names;
}

export default App;

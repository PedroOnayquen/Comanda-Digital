import React, { useState } from 'react';
import './App.css';
import TemaToggleButton from './components/TemaToggleButton';

function App() {
  const [temaClaro, setTemaClaro] = useState(true);

  const alternarTema = () => {
    setTemaClaro(!temaClaro);
  };

  return (
    <div className={`app ${temaClaro ? 'tema-claro' : 'tema-escuro'}`}>
      <header>
        <h1>Comanda Digital</h1>
      </header>
      <main>
        <TemaToggleButton alternarTema={alternarTema} />
        {/* Renderize seus outros componentes aqui */}
      </main>
    </div>
  );
}

export default App;

import React, { useState } from 'react';

const TemaToggleButton = () => {
  const [temaClaro, setTemaClaro] = useState(true);

  const alternarTema = () => {
    setTemaClaro(!temaClaro);
  };

  return (
    <div className="tema-toggle">
      <button onClick={alternarTema}>
        Alternar Tema {temaClaro ? 'Escuro' : 'Claro'}
      </button>
    </div>
  );
};

export default TemaToggleButton;

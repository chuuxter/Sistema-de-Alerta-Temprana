// src/App.js
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/home.js' ;
import ClasificacionLogica from './components/Clasificacion/clasificacion_logica.js';
import VarkTest from './components/Clasificacion/testVark.js';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/clasificacion-logica" element={<ClasificacionLogica />} />
        <Route path="/vark-test" element={<VarkTest />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
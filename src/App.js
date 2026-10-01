// src/App.js
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Modelos/home.js' ;
import ClasificacionLogica from './Modelos/Clasificacion/clasificacion_logica.js';
import VarkTest from './Modelos/Clasificacion/testVark.js';
import EscogerCurso from './Modelos/Prediccion/escogerCurso.js';
import CuestionarioAritmetica from './Modelos/Prediccion/Cuestionarios/cuestionarioAritmetica.js';
import CuestionarioAlgebra from './Modelos/Prediccion/Cuestionarios/cuestionarioAlgebra.js';
import CuestionarioGeometria from './Modelos/Prediccion/Cuestionarios/cuestionarioGeometria.js';
import CuestionarioRazonamientoMatematico from './Modelos/Prediccion/Cuestionarios/cuestionarioRM.js';
import CuestionarioQuimica from './Modelos/Prediccion/Cuestionarios/cuestionarioQuimica.js';
import CuestionarioBiologia from './Modelos/Prediccion/Cuestionarios/cuestionarioBiologia.js';
import CuestionarioFisica from './Modelos/Prediccion/Cuestionarios/cuestionarioFisica.js';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/clasificacion-logica" element={<ClasificacionLogica />} />
        <Route path="/vark-test" element={<VarkTest />} />
        <Route path="/escogerCurso" element={<EscogerCurso />} />
        <Route path="/cuestionario/aritmetica" element={<CuestionarioAritmetica />} />
        <Route path="/cuestionario/algebra" element={<CuestionarioAlgebra />} />
        <Route path="/cuestionario/geometria" element={<CuestionarioGeometria />} />
        <Route path="/cuestionario/rm" element={<CuestionarioRazonamientoMatematico />} />
        <Route path="/cuestionario/quimica" element={<CuestionarioQuimica />} />
        <Route path="/cuestionario/biologia" element={<CuestionarioBiologia />} />
        <Route path="/cuestionario/fisica" element={<CuestionarioFisica />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
// src/App.js
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/home.js' ;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
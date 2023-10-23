import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainScreen from '../screen/main';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainScreen />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

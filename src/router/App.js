import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainScreen from '../screen/main';

import SignInUpScreen from '../screen/user/signInUp';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainScreen />} />
          <Route path="/user" element={<SignInUpScreen />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

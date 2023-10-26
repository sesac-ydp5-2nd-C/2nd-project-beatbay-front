import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainScreen from '../screen/main';
import ProductTradeScreen from '../screen/trade/productTrade';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainScreen />} />
          <Route path="/trade/product" element={<ProductTradeScreen />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

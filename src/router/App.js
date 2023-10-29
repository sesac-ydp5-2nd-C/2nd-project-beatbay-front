import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainScreen from '../screen/main';
import ProductTradeScreen from '../screen/trade/productTrade';

import SignInUpScreen from '../screen/user/signInUp';
import MypageDashboard from '../screen/mypage/dashboard';
import TalentTradeScreen from '../screen/trade/talentTrade';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainScreen />} />
          <Route path="/trade/product" element={<ProductTradeScreen />} />
          <Route path="/trade/talent" element={<TalentTradeScreen />} />
          <Route path="/user" element={<SignInUpScreen />} />
          <Route path="/mypage" element={<MypageDashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

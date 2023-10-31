import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainScreen from '../screen/main';
import ProductTradeScreen from '../screen/trade/productTrade';

import SignInUpScreen from '../screen/user/signInUp';
import MypageDashboard from '../screen/mypage/dashboard';
import TalentTradeScreen from '../screen/trade/talentTrade';
import MypageDashboardScreen from '../screen/mypage/dashboard';
import MypageListingsScreen from '../screen/mypage/listings';
import MypagePurchasesScreen from '../screen/mypage/purchases';
import MypageLikesScreen from '../screen/mypage/likes';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainScreen />} />
          <Route path="/trade/product" element={<ProductTradeScreen />} />
          <Route path="/trade/talent" element={<TalentTradeScreen />} />
          <Route path="/user" element={<SignInUpScreen />} />
          <Route path="/mypage" element={<MypageDashboardScreen />} />
          <Route path="/mypage/sell" element={<MypageListingsScreen />} />
          <Route path="/mypage/buy" element={<MypagePurchasesScreen />} />
          <Route path="/mypage/like" element={<MypageLikesScreen />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

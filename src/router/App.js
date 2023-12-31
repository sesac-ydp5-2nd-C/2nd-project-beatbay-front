import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainScreen from '../screen/main';
import ProductTradeScreen from '../screen/trade/productTrade';

import SignInUpScreen from '../screen/user/signInUp';

import TalentTradeScreen from '../screen/trade/talentTrade';
import MypageDashboardScreen from '../screen/mypage/dashboard';
import MypageListingsScreen from '../screen/mypage/listings';
import MypagePurchasesScreen from '../screen/mypage/purchases';
import MypageLikesScreen from '../screen/mypage/likes';
import TradeDetailScreen from '../screen/trade/tradeDetail';

import MypageEditInformationScreen from '../screen/mypage/editinfo';

import TradeSellScreen from '../screen/trade/tradeSell';
import MypageChatScreen from '../screen/mypage/chat';
import UserpageScreen from '../screen/userpage';
import NoticeScreen from '../screen/notice';
import ErrorScreen from '../screen/404';
import AdminScreen from '../screen/adminPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainScreen />} />
          <Route path="/trade/product" element={<ProductTradeScreen />} />
          <Route path="/trade/talent" element={<TalentTradeScreen />} />
          <Route
            path="/trade/:type/detail/:id"
            element={<TradeDetailScreen />}
          />
          <Route path="/trade/sell" element={<TradeSellScreen />} />
          <Route path="/trade/sell/:type/:id" element={<TradeSellScreen />} />
          {/* <Route
            path="/trade/:ability/detail/:id"
            element={<TradeDetailScreen />}
          /> */}

          <Route path="/user" element={<SignInUpScreen />} />

          <Route path="/mypage" element={<MypageDashboardScreen />} />
          <Route path="/mypage/sell" element={<MypageListingsScreen />} />
          <Route path="/mypage/buy" element={<MypagePurchasesScreen />} />
          <Route path="/mypage/like" element={<MypageLikesScreen />} />
          <Route
            path="/mypage/userProfile"
            element={<MypageEditInformationScreen />}
          />
          <Route path="/mypage/chat" element={<MypageChatScreen />} />

          <Route path="/seller/:id" element={<UserpageScreen />} />

          <Route path="/notice" element={<NoticeScreen />} />

          <Route path="/admin" element={<AdminScreen />} />

          <Route path="/*" element={<ErrorScreen />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

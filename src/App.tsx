import { Navbar } from './Views/Common/Navbar';
import {
  Routes,
  Route,
  Link,
  Navigate,
  useSearchParams,
  useNavigate,
} from 'react-router-dom';
import Drawer from '@Views/Common/V2-Drawer';
import IbfrFaucet from '@Views/Faucet';
import Background from './AppStyles';
import { Alert, Snackbar } from '@mui/material';
import { atom, useAtom, useAtomValue } from 'jotai';
import { Warning } from '@Views/Common/Notification/warning';
import TnCModal from '@Views/Common/TnCModal';
import BinryMarkets, {
  activeMarketFromStorageAtom,
  defaultMarket,
  referralCodeAtom,
} from '@Views/BinaryOptions';
import { Incentivised } from '@Views/V2-Leaderboard/Incentivised';
import { Earn } from '@Views/Earn';
import { Dashboard } from '@Views/Dashboard';
import { ReferralPage } from '@Views/Referral';
import SideBar from '@Views/Common/Sidebar';
import ConnectionDrawer from '@Views/Common/V2-Drawer/connectionDrawer';
import { useGraphStatus } from '@Utils/useGraphStatus';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import { Weekly } from '@Views/V2-Leaderboard/Weekly';
import { LeaderBoardOutlet } from '@Views/V2-Leaderboard';
import { ProfilePage } from '@Views/Profile';
import { useEffect } from 'react';
import { useToast } from '@Contexts/Toast';
import { AllTradesPage } from '@Views/AllTrades';
import { MobileBottomTabs } from '@Views/Common/Navbar/MobileBottomTabs';
import { History } from '@Views/BinaryOptions/History';
import { MobileTrade } from '@Views/BinaryOptions/MobileTrade';
import { TradePage } from '@Views/BinaryOptions/TradePage';
import { DesktopTrade } from './MultiChartLayout';
import { TestComponent } from './TestComponent';
import { getHashUrlQueryParam } from '@Utils/getHashUrlQueryParam';
import { urlSettings } from './Config/wagmiClient';

if (import.meta.env.VITE_MODE === 'production') {
  // console.log(`import.meta.env.SENTRY_DSN: `, import.meta.env.VITE_SENTRY_DSN);
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 0.5,
  });
}
function AppComponent() {
  return (
    <div className=" text-blue-1 font-bold">
      <div className="main">
        <ul>
          <Link to={'/faucet'}>Faucet</Link>
          <Link to={'/home'}>Home</Link>
        </ul>
      </div>
      <Drawer>
        <></>
      </Drawer>
    </div>
  );
}

(function () {
  const r = document.querySelector<HTMLElement>(':root');
  for (let color in urlSettings) {
    if (color.includes('-')) {
      r!.style.setProperty(`--${color}`, '#' + urlSettings[color]);
    }
  }
})();

const AppRoutes = () => {
  const activeMarketFromStorage = useAtomValue(activeMarketFromStorageAtom);
  const [searchParam] = useSearchParams();
  const [ref, setRef] = useAtom(referralCodeAtom);
  const toastify = useToast();
  const navigate = useNavigate();
  useEffect(() => {
    let referralCode = searchParam.get('ref');
    console.log(`referralCode: `, referralCode);
    if (!referralCode) {
      let code = '';
      const codes = window.location.href.split('/');
      console.log(`codes: `, codes);
      for (let i = 0; i < codes.length; i++) {
        if (codes[i] == 'ref') {
          code = codes?.[i + 1];
        }
      }
      if (code) referralCode = code;
    }
    console.log(`referralCode: `, referralCode, ref);
    if (referralCode) {
      if (ref !== referralCode) {
        setRef(referralCode);
        toastify({
          type: 'success',
          msg: 'Referral Link  "' + referralCode + '" is applied successfully!',
          id: 23132,
        });
      }
      navigate('/binary/ETH-USD');
    }
  }, [searchParam]);
  return (
    <div className="relative root w-[100vw]">
      <Routes>
        <Route path="/home" element={<AppComponent />} />
        <Route path="/faucet" element={<IbfrFaucet />} />
        <Route path="/test2" element={<TestComponent />} />
        <Route path="/test/:market" element={<TradePage />} />
        <Route path="/referral" element={<ReferralPage />} />
        <Route path="/ref/:code" element={<div>Helo</div>} />
        <Route path="/history" element={<History />} />
        <Route path="/leaderboard" element={<LeaderBoardOutlet />}>
          <Route path="daily" element={<Incentivised />}>
            <Route path=":chain" element={<Incentivised />} />
          </Route>
          <Route path="weekly" element={<Weekly />}>
            <Route path=":chain" element={<Weekly />} />
          </Route>
        </Route>
        <Route path="/earn" element={<Earn />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path=":chain" element={<Dashboard />} />
        </Route>
        <Route path="/referral" element={<ReferralPage />} />
        <Route path="/profile" element={<ProfilePage />}>
          <Route path=":chain" element={<ProfilePage />} />
        </Route>
        <Route path="/trades" element={<AllTradesPage />} />
        <Route path="/binary/:market" element={<TradePage />} />
        {/* referral link handling */}
        <Route
          path="/*"
          element={
            <Navigate
              to={'/binary/' + (activeMarketFromStorage || defaultMarket)}
            />
          }
        />
      </Routes>
    </div>
  );
};

export const snackAtom = atom<{
  message: null | React.ReactNode;
  severity?: 'success' | 'warning' | 'info' | 'error';
}>({
  message: null,
});

function App() {
  const [snack, setSnack] = useAtom(snackAtom);
  const graphStatus = useGraphStatus();
  return (
    <>
      <Background>
        {graphStatus && (
          <Warning
            body={
              <>
                We are facing some issues with the theGraph API. Trading
                experience on the platform may be hindered temporarily.
              </>
            }
            closeWarning={() => {}}
            shouldAllowClose={false}
            state={graphStatus.error}
            className="disclaimer !bg-[#f3cf34] !text-[black] !text-f16 !p-2 !text-semibold hover:!brightness-100"
          />
        )}
        <Navbar />
        <AppRoutes />
        <Snackbar
          open={snack.message ? true : false}
          autoHideDuration={3500}
          onClose={() => setSnack({ message: null })}
          action={null}
        >
          <Alert
            onClose={() => setSnack({ message: null })}
            severity={snack.severity || 'info'}
            sx={{ width: '100%' }}
          >
            {snack.message}
          </Alert>
        </Snackbar>
        {!urlSettings?.hide && (
          <Warning
            body={
              <>
                $BFR token 0x1A5B0aaF478bf1FDA7b934c76E7692D722982a6D has been
                listed on Uniswap V3 Arbitrum. Don't trade $iBFR token on
                PancakeSwap or Apeswap on BNB chain.
              </>
            }
            closeWarning={() => {}}
            shouldAllowClose={false}
            state={true}
            className="disclaimer sm:hidden"
          />
        )}
        <ConnectionDrawer className="open" />
        <TnCModal />
        <SideBar />
      </Background>
      <MobileBottomTabs />
    </>
  );
}

export default App;

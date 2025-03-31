import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

import './App.css';
import Home from './pages/Home';
import Layout from './components/layout/Layout';
import Dashborad from './pages/Dashborad';
import SignUp from './components/common/auth/SignUp';
import SignIn from './components/common/auth/SignIn';
import ProtectRoute from './components/common/auth/ProtectRoute';
import Subscriptions from './pages/Subscriptions';
import CreateSubscription from './pages/CreateSubscription';
import SettingLayout from './components/layout/SettingLayout';
import Account from './pages/Account';
import Notifications from './pages/Notifications';
import Profile from './pages/Profile';

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          {/* Public routes But Authorised User Can't See it */}
          <Route index element={
            <ProtectRoute>
              <Home />
            </ProtectRoute>
          } />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/signin' element={<SignIn />} />

          {/* Protected routes */}
          <Route path='/dashboard' element={
            <ProtectRoute>
              <Dashborad />
            </ProtectRoute>
          } />

          <Route path='/dashboard/settings' element={
            <ProtectRoute>
              <SettingLayout />
            </ProtectRoute>
          }>
            <Route index element={<Account />} />
            <Route path='notifications' element={<Notifications />} />
            <Route path='profile' element={<Profile />} />
          </Route>

          <Route path='/subscription' element={
            <ProtectRoute>
              <Subscriptions />
            </ProtectRoute>
          } />

          <Route path='/subscription/create-subs' element={
            <ProtectRoute>
              <CreateSubscription />
            </ProtectRoute>
          } />

          {/* Redirect any unknown routes to home */}
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

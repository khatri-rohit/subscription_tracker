import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

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
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useAuth } from './context/Auth';

function App() {

  const { clientId } = useAuth()

  const GoogleProviderSignUp = () => {
    return <GoogleOAuthProvider clientId={clientId}>
      <SignUp />
    </GoogleOAuthProvider>
  }

  const GoogleProviderSignIn = () => {
    return <GoogleOAuthProvider clientId={clientId}>
      <SignIn />
    </GoogleOAuthProvider>
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* <GoogleOAuthProvider clientId={clientId}> */}
        <Route path='/signup' element={<GoogleProviderSignUp />} />
        <Route path='/signin' element={<GoogleProviderSignIn />} />
        {/* </GoogleOAuthProvider> */}

        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />

          {/* Protected routes */}
          <Route path='/dashboard' element={
            <ProtectRoute>
              <Dashborad />
            </ProtectRoute>
          } />

          {/* Setting Pages Layout */}
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

          <Route path="*" element={<Navigate to="/" />} />
          {/* Redirect any unknown routes to home */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

import {
  BrowserRouter,
  Routes,
  Route
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


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/signup' element={<SignUp />} />
          <Route path='/signin' element={<SignIn />} />
          <Route index element={
            <ProtectRoute>
              <Home />
            </ProtectRoute>
          } />
          <Route path='/dashboard' element={
            <ProtectRoute>
              <Dashborad />
            </ProtectRoute>
          } />
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
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

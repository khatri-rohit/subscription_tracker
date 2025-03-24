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


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/dashboard' element={<Dashborad />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

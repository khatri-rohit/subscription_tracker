import './App.css'
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/auth/signup' element={<SignUp />} />
        <Route path='/auth/signin' element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

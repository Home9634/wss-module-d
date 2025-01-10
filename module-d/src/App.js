import './App.css';
import { Link, Route, Routes, BrowserRouter } from 'react-router';
import HomePage from './pages/HomePage';
import UserProfilePage from './pages/UserProfilePage';
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<HomePage />} path='/'></Route>
        <Route element={<UserProfilePage />} path="/profile:id"></Route>
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;

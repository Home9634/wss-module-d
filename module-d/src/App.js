import './App.css';
import { Link, Route, Routes, BrowserRouter } from 'react-router';
import HomePage from './pages/HomePage';
import UserProfilePage from './pages/UserProfilePage';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

function App() {
  return (
    <div className="justify-center">
      <BrowserRouter>
        <Routes>
          <Route element={<HomePage />} path='/'></Route>
          <Route element={<UserProfilePage />} path="/profile/:id"></Route>
        </Routes>

      </BrowserRouter>
    </div>

  );
}

export default App;

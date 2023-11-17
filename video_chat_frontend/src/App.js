import './App.css';
import HomePage from './pages/HomePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import { AuthProvider } from './context/AuthContext';
import AuthorPrivateRoute from './utils/AuthorPrivateRoute';
import DashboardPage from './pages/DashboardPage';
import ChatDashboardPage from './pages/ChatDashboardPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Routes>
            <Route element={<DashboardPage />} path='/' />
            {/* authenticated routes */}
            <Route element={<AuthorPrivateRoute />} path='/'>
              <Route element={<HomePage />} path='chat_dashboard/:roomName/' />
              <Route element={<ChatDashboardPage/>} path='chat_dashboard/'/>
            </Route>
            {/* end */}
            <Route element={<SignupPage />} path='/signup' />
            <Route element={<LoginPage />} path='/login' />
            <Route element={<NotFoundPage />} path='*' /> 
        </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;

import { Routes, Route } from 'react-router-dom';
import Login from './components/login/Login';
import Search from './components/search/Search';
import Container from 'react-bootstrap/Container';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Container fluid className='min-vh-100'>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<PrivateRoute><Search /></PrivateRoute>} />
        </Routes>
      </Container>
    </AuthProvider>
    
  );
}

export default App;
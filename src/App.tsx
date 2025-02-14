import Container from 'react-bootstrap/Container';
import Login from './components/login/Login';
import Search from './components/search/Search';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Container fluid className='min-vh-100'>
        <Login />
        {/* <Search /> */}
      </Container>
    </AuthProvider>
    
  );
}

export default App;
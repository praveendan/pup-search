import Container from 'react-bootstrap/Container';
import Login from './components/login/Login';
import Search from './components/search/Search';

function App() {
  return (
    <Container fluid className='min-vh-100'>
      {/* <Login /> */}
      <Search />
    </Container>
  );
}

export default App;
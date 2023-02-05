import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Body from './components/Body';
import Header from './components/Header/Header';
import { AuthUserProvider } from './utilites/firebase/auth';

function App() {
  return (
    <AuthUserProvider>
      <BrowserRouter>
        <div className='wrapper'>
          <Header />
          <Body />
          <footer></footer>
        </div>
      </BrowserRouter>
    </AuthUserProvider>
  );
}

export default App;

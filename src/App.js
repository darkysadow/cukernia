import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Body from './components/Body';
import Header from './components/Header/Header';
import store from './redux/redux-store';
import { AuthUserProvider } from './utilites/firebase/auth';

function App() {
  return (
    <AuthUserProvider>
    <Provider store={store}>
      <BrowserRouter>
        <div className='wrapper'>
          <Header />
          <Body />
          <footer></footer>
        </div>
      </BrowserRouter>
    </Provider>
    </AuthUserProvider>
  );
}

export default App;

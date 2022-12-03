import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Body from './components/Body';
import Header from './components/Header/Header';
import store from './redux/redux-store';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className='wrapper'>
          <Header />
          <Body />
          <footer></footer>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

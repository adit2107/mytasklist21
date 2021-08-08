import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TopbarComponent from './shared/topbar.component';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import AllRoutes from './routes/routes';
import RegisterComponent from './components/user/register.component';

function App() {
  return (
    <div className="App">
   <Provider store={store}>
      <Router>
        <>
          <TopbarComponent/>
          <ToastContainer newestOnTop autoClose={2000} />
          <Switch>
            <Route exact path='/' component={RegisterComponent} />
            <Route component={AllRoutes} />
          </Switch>
        </>
      </Router>
    </Provider>
    </div>
  );
}

export default App;

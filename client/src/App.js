import './App.css';
import Login from './components/Login';
import {BrowserRouter,Switch,Route,Redirect} from 'react-router-dom'
import Signup from './components/Signup';
import Landing from './components/Landing';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/" component={Landing}/>
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;

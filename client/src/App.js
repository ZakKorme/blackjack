import Home from "./containers/Home/Home";
import Singleplayer from "./containers/Singleplayer/Singleplayer";
import Multiplayer from "./containers/Multiplayer/Multiplayer";
import {Route, Switch, Redirect } from 'react-router-dom';

const App = (props) => {
  let routes = (
    <Switch>
        <Route path="/single-player" component={Singleplayer}/>
        <Route path="/multi-player" component={Multiplayer}/>
        <Route path="/" component={Home}/>
        <Redirect to="/"/>
    </Switch>
);
  
  return (
    <div >
      {routes}
    </div>
  );
}

export default App;

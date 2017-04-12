import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Lobby from '../components/Lobby';
import Login from '../components/Login';
import Game from '../components/Game';
import Error404 from '../components/Error404';
import Main from '../Main';

// const Game = () => <h3>Game</h3>;
// const Pinata = () => <h3>Game / Pinata</h3>;

// const routes = [
//   { path: '/lobby',
//     component: Lobby
//   },
//   { path: '/game',
//     component: Game,
//     routes: [
//       { path: '/pinata',
//         component: Pinata
//       },
//       { path: '/wut',
//         component: Pinata
//       },
//     ]
//   }
// ];

// wrap <Route> and use this everywhere instead, then when
// sub routes are added to any route it'll work
// const RouteWithSubRoutes = (route) => (
//   <Route path={route.path} render={props => (
//     // pass the sub-routes down to keep nesting
//     <route.component {...props} routes={route.routes}/>
//   )}/>
// );

// const RouteConfig = () => (
//   <Router>
//     <div className="navigation">
//       <ul>
//         <li><Link to="/game">Game</Link></li>
//         <li><Link to="/lobby">Lobby</Link></li>
//         <li><Link to="/404">Error404</Link></li>
//       </ul>

//       {routes.map((route, i) => (
//         <RouteWithSubRoutes key={i} {...route}/>
//       ))}
//     </div>
//   </Router>
// );

class Navigation extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <a className="navbar-brand" href="/">Socket-Game-Platform</a>
          </div>
          <div id="navbar" className="collapse navbar-collapse">
            <ul className="nav navbar-nav">
              <li><Link to="/">Lobby</Link></li>
              {/*<li><Link to="/game">Game</Link></li>*/}
              <li><a href="/game.html">Redirect Game</a></li>
              {/*<li><Link to="/game">Create New Game</Link></li>*/}
              <li><Link to="/login">Login</Link></li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}
const NavRouter = () => (
  <Main>
    
  </Main>
);

export { NavRouter, Navigation};
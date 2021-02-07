import React from 'react';
import {Switch, Route, useLocation} from 'react-router-dom';
import { useTransition, animated } from 'react-spring';
import HomePage from './Pages/HomePage';
import MemoryGame from './Pages/MemoryGame';
import ScorePage from './Pages/ScorePage';

function App({...props}) {
  const location = useLocation();
  const transitions = useTransition(location, location => location.pathname, {
    from: { opacity: 0, transform: 'translate3d(100%,0,0)' },
    enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
    leave: { opacity: 0, transform: 'translate3d(-50%,0,0)' },
  });
 
  return transitions.map(({ item: location, props, key }) => (
    <animated.div key={key} style={props}>
      <Switch location={location}>
        <Route path="/" exact component={HomePage} />
        <Route path="/game" component={MemoryGame}/>
        <Route path="/score" component={ScorePage} />
      </Switch>
    </animated.div>
  ))
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Details from './pages/Details';
import BattlePage from './pages/BattlePage';
import BattleArena from './pages/BattleArena';
import { Provider } from 'react-redux';
import store from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokemon/:id" element={<Details />} />
          <Route path="/battle" element={<BattlePage />} />
          <Route path="/battle-arena/:pokemon1Id/:pokemon2Id" element={<BattleArena />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
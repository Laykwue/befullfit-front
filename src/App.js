// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './css/App.css';
import CreateArticle from './createArticles';
import VoirArticles from './voirArticles';

function AppHeader() {
  return (
    <div className='App-header'>
      <h1>Articles</h1>
      <Link className='nav-link' to="/createArticle">Créer mon article</Link>
      <Link className='nav-link' to="/voirArticles">Voir mes articles</Link>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppHeader />} />
        <Route path="/createArticle" element={<CreateArticle />} />
        <Route path="/voirArticles" element={<VoirArticles />} />
      </Routes>
    </Router>
  );
}

export default App;

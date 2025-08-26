import React, { useEffect } from 'react';
import Home from './pages/home.jsx';

/*
  App.jsx simplified to render the single-page portfolio (Home).
  Removed Vite boilerplate logos/counter.
  Ensures page scrolls to top on first load (useful if using HMR during dev).
*/

function App() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <Home />;
}

export default App;
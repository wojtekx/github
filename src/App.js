import "./App.css";
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Details from './components/Details/Details';

const App = () => (
  <div className="App">
     <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path=":login/:name" element={<Details />} />
      </Routes>
     </Router>
  </div>
);

export default App;

import './App.css';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Notes from './components/Notes';

function App() {
  return (
    <div className="App">
      <NoteState>
        <BrowserRouter>
          <Navbar />
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/home" element={<Home />} />
              <Route exact path="/notes" element={<Notes />} />
              <Route exact path="/about" element={<About />} />
            </Routes>
          </div>
        </BrowserRouter>
      </NoteState>

    </div>
  );
}

export default App;

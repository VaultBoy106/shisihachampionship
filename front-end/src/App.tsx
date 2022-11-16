import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavbarComponent from "./components/Navbar";
import Settings from "./components/Settings";
import Results from "./components/Results";
import Main from "./components/Main";
function App() {
  return (
    <>
      <Router>
        <NavbarComponent />
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/results" element={<Results />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

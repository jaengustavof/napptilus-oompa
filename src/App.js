import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Homepage";
import Details from "./pages/Details";
import './assets/styles/styles.scss';
import Header from "./components/Header/Header";

function App() {
  return (
    <Router>
    <Header/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:id" element={<Details />} />
      </Routes>
    </Router>
  );
}

export default App;

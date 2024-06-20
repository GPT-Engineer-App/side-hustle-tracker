import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import IndexJa from "./pages/IndexJa.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<IndexJa />} />
      </Routes>
    </Router>
  );
}

export default App;

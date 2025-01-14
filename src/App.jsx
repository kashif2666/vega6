import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchPage from "./components/SearchPage";
import AddCaptionPage from "./components/AddCaptionPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/caption-editor" element={<AddCaptionPage />} />
      </Routes>
    </Router>
  );
};

export default App;

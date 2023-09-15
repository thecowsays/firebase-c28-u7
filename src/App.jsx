import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Homepage from "./pages/Homepage/Homepage";
import CategoryArticle from "./pages/CategoryArticle/CategoryArticle";
import Auth from "./pages/Auth/Auth";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/category/:categoryName" element={<CategoryArticle />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/auth" element={<Auth />} />
        {/* <Route path="/" element={<Homepage />} /> */}
        <Route path="*" element={<Homepage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

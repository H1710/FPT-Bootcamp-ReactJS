import ScreenHome from "./layout/ScreenHome/ScreenHome";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScreenQuiz from "./layout/ScreenQuiz/ScreenQuiz";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ScreenHome />} />
          <Route path="/quiz/:quizCode" element={<ScreenQuiz />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

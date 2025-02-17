// import logo from "./logo.avif";
import "./App.css";
import ScheduleList from "./components/Schedule/ScheduleList";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScheduleDetail from "./components/Schedule/ScheduleDetail";
import RunningList from "./components/RunningCourse/RunningList";

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <img src={logo} className="App-logo2" alt="logo" />
        <img src={logo} className="App-logo3" alt="logo" />
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <code>컴마 찍어야겠다</code>
        </p>
        <a
          className="App-link"
          href="https://www.naver.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          성취도 우수자의 세계
        </a>
      </header> */}
      <BrowserRouter>
        <Routes>
          <Route path="/course" element={<RunningList />} />
          <Route path="/schedule" element={<ScheduleList />} />
          <Route path="/schedule/:id" element={<ScheduleDetail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

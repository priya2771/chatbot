import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./components/login";
import Chatbot from "./components/chatbot";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="*" element={<Login />} /> {/* Default to login */}
      </Routes>
    </>
  );
}

export default App;

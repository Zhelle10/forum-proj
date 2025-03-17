import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import ThreadDetails from "./pages/ThreadDetails";

const App = () => {
  return (
    <>
      
      <Outlet />
    </>
  );
};

export default App;

// <Router>
//   <Routes>
//     <Route path="/" element={<Home />} />
//     <Route path="/thread/:threadId" element={<ThreadDetails />} />
//   </Routes>
// </Router>

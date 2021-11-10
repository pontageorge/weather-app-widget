import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet";

import Homepage from "components/Homepage/Homepage";

export default function App() {
  return (
    <Router>
      <Helmet>
        <title>My Weather App</title>
      </Helmet>
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
      </Routes>
    </Router>
  );
}

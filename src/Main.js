import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";

import Homepage from "components/Homepage/Homepage";

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <Helmet>
          <title>My Weather App</title>
        </Helmet>
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
        </Routes>
      </Router>
    </HelmetProvider>
  );
}

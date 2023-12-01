import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/App';
import { AuthProvider } from "./auth/AuthContext";
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Article from './pages/Article';

function App() {

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/article/:articleid" element={<Article />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
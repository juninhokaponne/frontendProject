import { Routes, Route, Link, Navigate } from "react-router-dom";
import { Home } from "./Pages/Home";
import "./App.css";
import { Dashboard } from "./Pages/Dashboard";
import { Page404 } from "./Pages/Page404/";

const token = localStorage.getItem("token");
const isLogged = token ? true : false;

function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route
        path="dashboard"
        element={<ProtectedRoute element={<Dashboard />} />}
      />
      <Route path="/profile" element={<Profile />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}

function Profile() {
  return (
    <div>
      <h1>Profile</h1>
      <Link to="dashboard">Dashboard</Link>
    </div>
  );
}

function ProtectedRoute({ element }: any) {
  if (!isLogged) {
    return <Navigate to="/" replace />;
  }

  return element;
}

export default App;

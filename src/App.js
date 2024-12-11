import "./App.css";
import { Routes, Route } from "react-router";
import MainSearch from "./page/MainSearch";
import Login from "./page/Login";
import Profile from "./page/Profile";
import RecipeWrite from "./page/RecipeWrite";
import RecipeDisplay from "./page/RecipeDisplay";
import Navbar from "./component/Navbars";

function App() {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<MainSearch />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/recipe-write" element={<RecipeWrite />} />
        <Route path="/recipe-display" element={<RecipeDisplay />} />
      </Routes>
    </div>
  );
}

export default App;

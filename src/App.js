import "./App.css";
import { useEffect } from "react";
import {  Route, Routes, useNavigate } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import Login from "./pages/Login/Login";
import Game from "./components/Game/Game";
import Stat from "./components/Stat/Stat";
import { categoriesFetch } from "./store/asyncActions/clues";

function App() {
  const { user, catId } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      navigate("auth");
      dispatch(categoriesFetch());
    }
  }, [user]);

  return (
    <div className="App">
      {user ? (
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="game" element={<Game />}></Route>
            <Route path="stat" element={<Stat />}></Route>
          </Route>
          <Route path="*" element={<p>There's nothing here: 404!</p>} />
        </Routes>
      ) : (
        <Routes>
          <Route path="auth" element={<Login />} />
        </Routes>
      )}
    </div>
  );
}

export default App;

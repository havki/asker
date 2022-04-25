import './App.css';
import axios from './api/axios.info';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Layout from './components/Layout/Layout';
import { useSelector } from 'react-redux';
import BasicModal from './UI/ModalWindow/ModalWindow';
import Login from './pages/Login/Login';
import Game from './components/Game/Game';
import Stat from './components/Stat/Stat';

function App() {

  const {user} = useSelector((state)=> state.auth)
  const [data, setData] = useState({})



  useEffect(() => {
    
    const fetchData = async () => {
      const response = await axios.get(`/random`);
      const res = response.data;
      setData(res);


   
    };
    fetchData().catch(console.error);

  }, []);
  
  console.log(user);
  

  return (
    <div className="App">
     <Routes>
       <Route path = "/" element = {<Layout/>}>

       <Route path = "game" element = {<Game/>}></Route>
      <Route path = "stat" element = {<Stat/>}></Route>
        

       </Route>
       
       {/* <Route path= "/" element = { <ProtectedRoute user = {user}>
        <Layout/>
       </ProtectedRoute>}/>

      <Route path = "game" element = {<Game/>}></Route>
      <Route path = "stat" element = {<Stat/>}></Route>

      
      <Route path= "auth" element= {<Login/>}/>
      <Route path="*" element={<p>There's nothing here: 404!</p>}/> */}
     
     </Routes>
    </div>
  );
}

export default App;

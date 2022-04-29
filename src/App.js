import './App.css';
import axios from './api/axios.info';
import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Layout from './components/Layout/Layout';
import { useDispatch, useSelector } from 'react-redux';
import BasicModal from './UI/ModalWindow/ModalWindow';
import Login from './pages/Login/Login';
import Game from './components/Game/Game';
import Stat from './components/Stat/Stat';
import { categoriesFetch, cluesFetch } from './store/reducers/auth.reducer';


function App() {

  const {user} = useSelector((state)=> state.auth)
  const [data, setData] = useState({})
  const navigate = useNavigate()
  const dispatch =useDispatch()

  // const fetchData = async () => {
  //   const response = await axios.get(`/random`);
  //   const res = response.data;
  //   setData(res);



  useEffect(() => {
    if(!user){
      navigate('auth')
      dispatch(categoriesFetch())
      // dispatch(cluesFetch())
    }


   
   

  }, [user]);
  
  

  return (
    <div className="App">
     
       {user ?
       <Routes>
       <Route path = "/" element = {<Layout/>}>

       <Route path = "game" element = {<Game/>}></Route>
       <Route path = "stat" element = {<Stat/>}></Route>
        

       </Route>
       <Route path="*" element={<p>There's nothing here: 404!</p>}/>
       </Routes>
       :
       <Routes>

         <Route path= "auth" element= {<Login/>}/>
       </Routes>
       
       }
       
       {/* <Route path= "/" element = { <ProtectedRoute user = {user}>
        <Layout/>
       </ProtectedRoute>}/>

       <Route path = "game" element = {<Game/>}></Route>
       <Route path = "stat" element = {<Stat/>}></Route> */}
      
      
     
     
     
    </div>
  );
}

export default App;

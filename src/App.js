import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Profile from './components/Profile';
import CreatePost from './components/CreatePost';
import React,{createContext, useState} from 'react';
import { LoginContext } from './context/navigation';

function App() {
  const [userlogin, setuserlogin] = useState(false)
  return (
    <BrowserRouter>
    <div className="App">
      <LoginContext.Provider value={{setuserlogin}}>
        <Navbar login={userlogin}/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/signin' element={<Signin/>}></Route>
        <Route path='/profile' element={<Profile/>}></Route>
        <Route path='/createpost' element={<CreatePost/>}></Route>
      </Routes>
      </LoginContext.Provider>
      
      
    </div>
    </BrowserRouter>
  );
}

export default App;

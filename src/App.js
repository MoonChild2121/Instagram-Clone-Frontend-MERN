import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Profile from './components/Profile';
import CreatePost from './components/CreatePost';
import React,{useState} from 'react';
import { LoginContext } from './context/navigation';
import Modal from './components/Modal';

function App() {
  const [userlogin, setuserlogin] = useState(false)
  const [modal, setmodal] = useState(false)
  return (
    <BrowserRouter>
    <div className="App">
      <LoginContext.Provider value={{setuserlogin, setmodal}}>
        <Navbar login={userlogin}/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/signin' element={<Signin/>}></Route>
        <Route path='/profile' element={<Profile/>}></Route>
        <Route path='/createpost' element={<CreatePost/>}></Route>
      </Routes>
      {modal && <Modal setmodal={setmodal}></Modal>}
      </LoginContext.Provider>
    </div>
    </BrowserRouter>
  );
}

export default App;

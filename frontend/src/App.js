import './App.css';
import { Route, Routes } from "react-router-dom";
import SignUp from './components/loginComponent/Signup';
import SignIn from './components/loginComponent/Signin';
import HomePage from './components/homeComponent/HomePageComponent';

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<SignUp/>}/>
      <Route path='/singIn' element={<SignIn/>}/>
      <Route path='/homePage' element={<HomePage/>} />
    </Routes>
    </>
  );
}

export default App;

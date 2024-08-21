import './App.css';
import { Route, Routes } from "react-router-dom";
import SignUp from './components/loginComponent/Signup';
import SignIn from './components/loginComponent/Signin';
import HomePage from './components/homeComponent/HomePageComponent';
import HeaderComponent from './components/headerComponent/HeaderComponent';
import FooterComponent from './components/footerComponent/FooterComponent';

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<SignUp/>}/>
      <Route path='/signIn' element={<SignIn/>}/>
      <Route path='/homePage' element={<HomePage/>} />
      <Route path='/header' element={<HeaderComponent/>}/>
      <Route path='/footer' element={<FooterComponent/>}/>
    </Routes>
    </>
  );
}

export default App;

import './App.css';
import { Route, Routes } from "react-router-dom";
import SignUp from './components/LoginComponent/Signup';
import SignIn from './components/LoginComponent/Signin';
import HomePage from './components/HomeComponent/HomePageComponent';
import HeaderComponent from './components/HeaderComponent/HeaderComponent';
import FooterComponent from './components/FooterComponent/FooterComponent';
import AllEventList from './components/EventListComponent/AllEventList';
import OurEventComponent from './components/OurEventComponent/OurEvent';
import CreateNewEvent from './components/NewEventComponent/NewEventCreate';

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<SignUp/>}/>
      <Route path='/signIn' element={<SignIn/>}/>
      <Route path='/homePage' element={<HomePage/>} />
      <Route path='/header' element={<HeaderComponent/>}/>
      <Route path='/footer' element={<FooterComponent/>}/>
      <Route path='/eventList' element={<AllEventList/>}/>
      <Route path='/ourEvent' element={<OurEventComponent/>}/>
      <Route path='/newEvent' element={<CreateNewEvent/>}/>
    </Routes>
    </>
  );
}

export default App;

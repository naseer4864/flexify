import { Routes, Route } from "react-router-dom";
import MovieList from "./Components/moviesList";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import Navbar from "./Components/Navbar";
import Account from "./Components/Account";
import PasswordReset from "./Components/resetpassword/PasswordReset";
import Footer from "./Components/Footer";
import { Fragment } from "react";


function App() {
  return (
    <Fragment>
    <Routes>
      <Route path="/" element={<Navbar/>}>
        <Route index element={<MovieList />} />
        <Route path="/SignIn/" element={<SignIn/>} />
        <Route path="/SignUp/" element={<SignUp/>} />
        <Route path="/Account" element={<Account/>}/>
        <Route path="/PasswordReset" element={<PasswordReset/>}/>
      </Route>
    </Routes>
    <Footer/>
    </Fragment>
  );
}

export default App;

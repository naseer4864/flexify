import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Fragment } from "react";
import { UserContext } from "../context/firebase.context";
import { useContext } from "react";

const Navbar = () => {
    const { currentUser } = useContext(UserContext);
    return ( 
        <Fragment>
        <div className="navbar-container">
            <div className="home">
                <Link to="/" className="logo">FLEXIFY</Link>
            </div>
            <div className="auth-nav">
                
                {currentUser ? (
            <Link to="Account" className="link">
              Account
            </Link>
          ) : (
            <Link to="SignIn" className="link">Sign In</Link>
          )}

          {currentUser ? (<span className="link"><marquee behavior="smooth" direction="left">{currentUser.displayName}</marquee></span>) : 
          <Link to="SignUp" className="links">Sign Up</Link>
          }
                
            </div>
        </div>
        <Outlet/>
        </Fragment>
     );
}
 
export default Navbar;
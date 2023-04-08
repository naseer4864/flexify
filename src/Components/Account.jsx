import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/firebase.context";
import { signOutUser } from "../firebase/firebase";



const Account = () => {
    const {currentUser} = useContext(UserContext);
    const navigate = useNavigate();
    const handleSign = () => {
        navigate("/signIn")
    }
    return (
        <div className="auth-container">
        <div className="account-container">
            {currentUser ? <span>WELCOME</span> : null}
            {currentUser ? ( <span>{currentUser.displayName}</span>) : null}
            {currentUser ? ( <span>{currentUser.email}</span>) : null}
            {currentUser ? ( <span onClick={signOutUser} className="sign-out">SIGN OUT</span>) : (<span onClick={handleSign} className="nav-links-con">SIGN IN</span>)}
        </div>
        </div>
    );
}

export default Account;
import { createGoogleUserAuth, signInUserwithEandP } from "../firebase/firebase";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/firebase.context"
import { useContext } from "react";


const defaultformfield = {
    email: "",
    password: ""
}

const SignIn = () => {
    const [formfield, setFormfield] = useState(defaultformfield)
    const { email, password } = formfield;
    // const [showPassword, setShowpassword] = useState(false);
    const [error, setError]= useState(false)

    const { currentUser } = useContext(UserContext);
   
    const resetForm = () => {
        setFormfield(defaultformfield)
    }

    const handleOnchange = (event) => {
        const { name, value } = event.target;
        setFormfield({ ...formfield, [name]: value })
    }
    const logUser = async () => {
        await createGoogleUserAuth();

    }


    const handleOnsubmit = async (event) => {
        event.preventDefault();


        try {
            await signInUserwithEandP(email, password)
            resetForm()
        } catch (error) {
            switch (error.code) {
                case "auth/wrong-password":
                    setError("incorrect password for email");
                    break
                case "auth/user-not-found":
                    setError("no user associated with this email");
                    break;
                default:
                    console.log(error)
            }

        }
    }

    // const handleClick = () => {
    //     setShowpassword(!showPassword)
    // }
    const navigate = useNavigate();
    
    useEffect(() => {
        if(currentUser) {
            navigate("/")
        }

    },[currentUser, navigate])

    const handleResetPasword = () => {
        navigate("/PasswordReset")
    }
    return ( 
        <div className="auth-container">
            <form onSubmit={handleOnsubmit}>
                <h1>Sign In</h1>
                <input type="text"  placeholder="Email"  name="email" value={email} onChange={handleOnchange} required />
                <span className="error">{error}</span>
                <input type="password" placeholder="Password" name="password" value={password} onChange={handleOnchange} required />
                <span className="error">{error}</span>
                <button type="submit">Log in</button>
                <p onClick={handleResetPasword}>Forgotten passwords ?</p>
                <div className="form-add">
                    <button onClick={logUser}>Sign in with Google</button>
                    <span>don't have an account? <a href="/SignUp">Sign Up</a> </span>
                </div>
            </form>
        </div>
     );
}
 
export default SignIn;
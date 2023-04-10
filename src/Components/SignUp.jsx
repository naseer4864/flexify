import { useState, useContext, useEffect } from "react";
import { createUserwithEandP, createUserDocRef } from "../firebase/firebase";
import { UserContext } from "../context/firebase.context";
import { useNavigate } from "react-router-dom";



const defaultformField = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: ""
}

const SignUp = () => {
    const [formField, setFormField] = useState(defaultformField);
    const { displayName, email, password, confirmPassword } = formField;
    // const [showPassword, setShowpassword] = useState(false);
    const [error, setError]= useState(false)
    const {currentUser} = useContext(UserContext)
    const navigate = useNavigate();

console.log(formField)
    const resetForm = () => {
        setFormField(defaultformField)
    }

    const handleOnsubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            setError("password not matched")
            return;
        }
        try {
            const { user } = await createUserwithEandP(email, password);
            await createUserDocRef(user, { displayName });
            resetForm()
        } catch (error) {
            if (error.code === "auth/eamil-already-in use") {
                setError("can not create user, eamil already in use")
            } else {
                console.log("catching error creating user", error)
            }
        }
    }

    const handleOnchange = (event) => {
        const { name, value } = event.target;
        setFormField({ ...formField, [name]: value })
        setError(false)
    }

    // const handleClick = () => {
    //     setShowpassword(!showPassword)
    // }

    useEffect(() => {
        if(currentUser){
            navigate("/")
        }
    }, [currentUser, navigate])
    return ( 
        <div className="auth-container">
           <form onSubmit={handleOnsubmit}>
                <h1>Sign up</h1>
                <input type="text" required placeholder="Full Name" name="displayName" value={displayName} onChange={handleOnchange} />
                <input type="text"  placeholder="Email" name="email" value={email} onChange={handleOnchange}/>
                <input type="password" required placeholder="Password" name="password" value={password} onChange={handleOnchange} />
                <input type="password" required placeholder="confirm Password" name="confirmPassword" value={confirmPassword} onChange={handleOnchange} />
                <span className="error">{error}</span>
                <button type="submit">Sign Up</button>
            </form>
        </div>
     );
}
 
export default SignUp;
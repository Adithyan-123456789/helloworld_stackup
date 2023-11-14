import { useState } from "react";
import useFetch from "./useFetch";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom";

const UserLogin = (props) => {


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isDetailsFounded, setPermission] = useState(true);
    const history = useHistory();

    /*Replace the url in the useFetch with the path to users email and password */
    const { data, pending, error } = useFetch('http://localhost:8000/users');
    console.log(data);
    const handleSubmit = (event) => {
        event.preventDefault();
        // to prevent the reload due to submit action

        //Searching for the existance of a user
        const userDetails = data.filter((eachPersonDetails) =>
            (eachPersonDetails.email === email && eachPersonDetails.password === password))
        console.log("User details");
        console.log(userDetails);

        if (userDetails.length === 0) {
            setPermission(false);
        } else {
            props.setId(userDetails[0].id);
            localStorage.setItem('userId', userDetails[0].id);
            setPermission(true);
            console.log("Account founded!!!!");
            history.push('/home');
            localStorage.setItem('isSignedIn', 'true');
            props.setSignInStatus(true);
        }
    }
    return (

        <div className="login-container">
            {pending && <div className='loading-container'><img src='./transparentLoading.gif' alt='An animated logo of an infinity symbol'></img></div>}
            <h1>Login into Your Account</h1>
            <form onSubmit={handleSubmit}>
                {!isDetailsFounded && <span>Email id or password is wrong</span>}
                <div className="login-details">
                    <label>Email Id :</label>
                    <input
                        type="email"
                        className="input-box"
                        placeholder="email"
                        required
                        maxLength={30}
                        value={email}
                        onChange={(event) => { setEmail(event.target.value); setPermission(true); }}></input>
                    <label>Password : </label>
                    <input type="password"
                        className="input-box"
                        placeholder="password"
                        required
                        value={password}
                        onChange={(event) => { setPassword(event.target.value); setPermission(true); }}></input>
                    <div className="login-button-section">
                        <input type="submit" className="submit-button" value={'Sign in'}></input>
                        <span> Or </span>
                        <Link to="/createAccount"><button className="button-configuration">SignUp</button></Link>
                    </div>
                </div>
            </form>
        </div>
    );

}

export default UserLogin;
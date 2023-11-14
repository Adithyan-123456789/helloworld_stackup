import { useState } from "react";
import { useHistory } from "react-router-dom";



const SignInDetails = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const task = [];
    const history = useHistory();

    const handleSubmit = (event) => {
        event.preventDefault();
        history.push('/');
        const data = { email, password, username, task }; /*change the variable names as you need
        .Also use refractor to make multiple changes*/
        console.log(data);

        //Replace the url with a path to the users email and password for adding a new user.
        fetch(' http://localhost:8000/users', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then((res) => {
                if (res.ok) {
                    console.log('Accound created successfully');
                } else {
                    console.log('Server response is not ok');
                }
            })
            .catch((error) => {
                console.log(error.message);
            })

    }

    return (
        <div className="create-account">
            <h1>Create a account</h1>
            <form onSubmit={handleSubmit}>
                <div className="login-details">
                    <label>Username : </label>
                    <input
                        type="text"
                        placeholder="name"
                        required
                        maxLength="20"
                        className="create-input"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    ></input>
                    <label>Email Id : </label>
                    <input
                        type="email"
                        placeholder="email id"
                        required
                        maxLength="30"
                        className="create-input"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    ></input>
                    <label>Password : </label>
                    <input
                        type="password"
                        placeholder="password"
                        required
                        maxLength="20"
                        className="create-input"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    ></input>
                    <div className="submit-container">
                        <input type="submit" value="Create Account" className="submit-button"></input>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default SignInDetails;
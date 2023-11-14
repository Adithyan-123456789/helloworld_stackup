import { useEffect, useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";

const NavBar = ({ isSignedIn, setSignInStatus, data }) => {

    const [dataAndTime, setDateAndTime] = useState(new Date());
    useEffect(() => {

        const intervalId = setInterval(() => {
            setDateAndTime(new Date())
        }, 1000);

        return () => clearInterval(intervalId);

    }, []);

    return (
        <div className="navigation">
            <div className="display-details">
                <span className="nav-logo">Task Manager</span>
                <span className="nav-time">{dataAndTime.toLocaleTimeString()}</span>
                {(data && isSignedIn) && <span className="nav-username">{(data.username)}</span>}
            </div>
            <div className="nav-links" >
                {isSignedIn && <Link to='/home' className="links" >Home</Link>}
                {!isSignedIn && <Link to='/' className="links" >Sign in</Link>}
                <Link to='/aboutUs' className="links" >About us</Link>
                {isSignedIn && <Link to='/' className="links"><span onClick={() => {
                    localStorage.setItem('userId', '');
                    localStorage.setItem('isSignedIn', 'false');
                    setSignInStatus(false);
                }}>Sign out</span></Link>}
            </div>
        </div>
    );
}

export default NavBar;

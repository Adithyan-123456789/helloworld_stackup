import { Link } from "react-router-dom/cjs/react-router-dom.min";

const SideNav = () => {

    return (
        <div className="side-nav">
            <Link to="/addTask"><button className="side-nav-button-add" ></button></Link>
            <button className="side-nav-button-clearall"></button>
        </div>
    );
}

export default SideNav;
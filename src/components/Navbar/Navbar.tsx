import "./navbar.css";
import logo from "../../assets/logo.svg";
import { Button } from "../Common/Button/Button";

export const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar__logo">
                <img src={logo} alt="Logo"/>
            </div>
            <div className="navbar__links">
                <button className="navbar__links categories">
                    Categories
                </button>
                <button className="navbar__links our-mission">
                    Our mission
                </button>
                <button className="navbar__links contact" value="contact">
                    Contact
                </button>
            </div>
            <div className="navbar__search">
                <div className="navbar__search input">
                    <input/>
                </div>
                <div className="navbar__search button">
                    <Button type="secondary" label="Search" icon={undefined}/>
                </div>
            </div>
        </nav>
    )
};

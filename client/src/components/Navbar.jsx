import {useNavigate} from "react-router-dom";
import useAuthStore from "../store/authStore";
import SearchBar from "../components/SearchComponent";


function Navbar() {
    const navigate = useNavigate();
    const { logout } = useAuthStore();

    const handleLogOut = () => {
        logout();
        navigate("/login");
    };



    return ( 
        <div className="navbar" style={{display: "flex", justifyContent: "space-between"}}>
        <button  onClick={handleLogOut}>
            logout
        </button>
        <SearchBar />
        </div>
     );
}

export default Navbar;
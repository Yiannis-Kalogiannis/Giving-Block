import {useNavigate} from "react-router-dom";
import useAuthStore from "../store/authStore";
import useServiceStore from "../store/useServiceStore";

function Navbar() {
    const navigate = useNavigate();
    const { logout } = useAuthStore();
    const { services } = useServiceStore();

    const handleLogOut = () => {
        logout();
        navigate("/login");
    };



    return ( 
        <div className="navbar" style={{display: "flex", justifyContent: "space-between"}}>
        <button  onClick={handleLogOut}>
            logout
        </button>
        </div>
     );
}

export default Navbar;
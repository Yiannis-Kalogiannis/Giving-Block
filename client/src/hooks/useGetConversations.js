import { useState, useEffect } from "react";
import axios from 'axios';
// import useUserStore from "../store/useUserStore";

const useGetConversations = () => {
    const [conversations, setConversations] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("token")
    // console.log("Token:", token);

    useEffect(() => {
        const getConversations = async () => {
            setLoading(true);
            try {
                const res = await axios.get("http://localhost:8080/users/getAllUsers", {
                    headers: {
                      Authorization: `Bearer ${token}`, 
                    },
                  });
                //   console.log("Conversations:", res.data.filteredUsers);
                setConversations(res.data.filteredUsers);
                setLoading(false);
            } catch (err) {
                console.log(err);
            }finally{
                setLoading(false);
            }
        };
        getConversations();
        // console.log("Conversations:", conversations);
    },[]);
    
    return { conversations, loading };
    };

export default useGetConversations;
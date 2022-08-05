import axios from "axios";
import { useEffect } from "react";
import { useState } from "react"

const useToken = (user) => {
    const [token, setToke] = useState('');
    useEffect(() => {
        const getToken = async () => {
        console.log(user)
            const email = user?.user?.email;
           if(email){
            const { data } = await axios.post('https://shielded-crag-04533.herokuapp.com/login', { email });
            setToke(data.accessToken);
            localStorage.setItem('accessToken', data.accessToken);
           }
        }
        getToken();
    }, [user])

    return [token];

}
export default useToken;
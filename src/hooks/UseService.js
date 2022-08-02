import { useEffect, useState } from "react";

const useServicer = () => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        fetch('https://shielded-crag-04533.herokuapp.com/service')
            .then(res => res.json())
            .then(data => setServices(data));
    }, []);
    return [services, setServices]
}

export default useServicer;
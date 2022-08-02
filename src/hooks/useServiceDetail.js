import { useEffect, useState } from "react";

const useServicerDetail = serviceId => {

    const [service, setService] = useState({});

    useEffect(() => {
        const url = `https://shielded-crag-04533.herokuapp.com/service/${serviceId}`;

        fetch(url)
            .then(res => res.json())
            .then(data => setService(data));

    }, [serviceId])
    return [service]
}

export default useServicerDetail;
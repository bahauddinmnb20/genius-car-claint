import useServicer from "../../hooks/UseService";

const ManageService = () => {
    const [services, setServices] = useServicer();

    const handleDelete = id => {
        const proceed = window.confirm('Are you sure?');
        if (proceed) {
            const url = `https://shielded-crag-04533.herokuapp.com/service/${id}`;

            fetch(url, {
                method: "DELETE"
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    const remaining = services.filter(service => service._id !== id);
                    setServices(remaining)
                })
        }
    }
    return (
        <div className=" text-center w-75 mx-auto d-flex  flex-column gap-5 ">
            <h3>the manage service</h3>

            {
                services.map(service => <dev key={service._id} className=' p-5  shadow  mb-5 bg-body rounded'>

                    <h4>{service.name} <button onClick={() => handleDelete(service._id)}>x</button></h4>
                    <p>{service.description}</p>
                    <p> <b> {service.price}</b> </p>
                    <img src={service.img} alt="" />
                </dev>)
            }
        </div>
    );
};

export default ManageService;
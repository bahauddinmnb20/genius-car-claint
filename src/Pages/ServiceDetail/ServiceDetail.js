import React from 'react';
import { Link, useParams } from 'react-router-dom';
import useServicerDetail from '../../hooks/useServiceDetail';

const ServiceDetail = () => {
    const { serviceId } = useParams();
    const [service] = useServicerDetail(serviceId);
    return (
        <div className='text-center bg-success p-5     '>
            <h2>You are about to book: {service.name}</h2>
            <img src={service.img} alt="" />
            <div className='text-center mt-5'>
                <Link to={`/checkout/${serviceId}`}>
                    <button className='btn btn-primary'>Proceed Checkout</button>
                </Link>
            </div>
        </div>
    );
};

export default ServiceDetail;
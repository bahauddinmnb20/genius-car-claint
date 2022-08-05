import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import axiosPrivate from '../../api/axiosPrivate';
import auth from '../../firebase.init';

const Orders = () => {
    const [orders, setOrder] = useState([]);
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    console.log(orders)
    useEffect(() => {
        const getOrder = async () => {
            const email = user.email;
            const url = `https://shielded-crag-04533.herokuapp.com/order?email=${email}`;
            try {
                const { data } = await axiosPrivate.get(url);
                setOrder(data);
            }
            catch (error) {
                console.log(error.massage);
                if (error.response.status === 401 || error.response.status === 403) {
                    signOut(auth);
                    navigate('/login');
                }

            }
        };
        getOrder();
    }, [user])
    return (
        <div className=' w-50 mx-auto mt-5'>
            <h3>My order {orders.length}</h3>
            
            {
                orders.map(order => <dev key={order._id}>
                    <h5>{order.name}</h5>
                    <p>{order.email}</p>
                    <p>{order.service}</p>
                </dev>)
            }
        </div>
    );
};

export default Orders;
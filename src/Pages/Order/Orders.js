import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import axiosPrivate from '../../api/axiosPrivate';
import auth from '../../firebase.init';

const Orders = () => {
    const [order, setOrder] = useState([]);
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
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
        <div>
            <h3>My order {order.length}</h3>
        </div>
    );
};

export default Orders;
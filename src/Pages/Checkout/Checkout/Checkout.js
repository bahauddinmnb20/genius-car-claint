import axios from 'axios';
import React from 'react';
// import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import auth from '../../../firebase.init';
import useServicerDetail from '../../../hooks/useServiceDetail';

const Checkout = () => {
    const { serviceId } = useParams();
    const [service] = useServicerDetail(serviceId);
    const [user] = useAuthState(auth);

    const handlePlaceOder = event => {
        event.preventDefault();
        const order = {
            name: user.displayName,
            email: user.email,
            service: service.name,
            address: event.target.address.value,
            phone: event.target.phone.value
        }
        axios.post('https://shielded-crag-04533.herokuapp.com/order')
            .then(response => {
                console.log(response);
                const { data } = response;
                if (data.insertedId) {
                    toast('Your order is success!!!');
                    event.target.reset()
                }
            })
    }
    // if(user){
    //     console.log(user)
    // }
    //     const [user, setUser] = useState({
    //         name: 'bahauddin paloan',
    //         email:'bahuddin@gmail.com',
    //         phone:'017783635496',
    //         address:'Dhaka, Gazipur,Kaligunj'

    //     })
    //   const handleAddress = event =>{
    //    console.log(event.target.value);
    //    const {address, ...rest} = user;
    //    const newAddress = event.target.value;
    //    const newUser = {address: newAddress, ...rest};
    //    setUser(newUser)
    //   }
    return (
        <div className='w-50 mx-auto mt-5'>
            <h2>Please Order: {service.name}</h2>
            <form onSubmit={handlePlaceOder} className='oder-form mt-4'>
                <input type="text" value={user?.displayName} name="name" placeholder='Name' required readOnly disabled />
                <br />
                <input type="email" name="email" value={user?.email} placeholder='Email' required eadOnly disabled />
                <br />
                <input type="text" name="service" placeholder='service' value={service.name} required readOnly />
                <br />
                <input type="text" name="phone" placeholder='phone' required />
                <br />
                <input type="text" name="address" placeholder='address' autoComplete='off' required />
                <br />
                <input className=' bg-primary text-white border-0' type="submit" value="please Order" />

                <br />
            </form>
            <ToastContainer />
        </div>
    );
};

export default Checkout;
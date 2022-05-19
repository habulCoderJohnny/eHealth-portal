import React from 'react';
import { useQuery } from 'react-query';
import Loading from '../SHARED/Loading/Loading';

const ManageDoctors = () => {
    const {data: doctors, isLoading} = useQuery('doctors', ()=> fetch('http://localhost:5000/doctor',{
        headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res=>res.json()));

    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div>
              <h1 className='text-center text-3xl'>Manage<small className='text-[#007C92]'> Doctor ({doctors.length})</small></h1>
        </div>
    );
};

export default ManageDoctors;
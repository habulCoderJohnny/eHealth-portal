import React from 'react';
import { useQuery } from 'react-query';
import Loading from '../SHARED/Loading/Loading';
import DoctorRow from './DoctorRow';


const ManageDoctors = () => {
    const {data: doctors, isLoading, refetch} = useQuery('doctors', ()=> fetch('http://localhost:5000/doctor',{
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

         <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    {/* <!-- head --> */}
                    <thead className='text-primary'>
                        <tr>
                            <th>Avator</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Specialty</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            doctors.map(doctor=><DoctorRow key={doctor._id} doctor={doctor} refetch={refetch}></DoctorRow>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageDoctors;
import React from 'react';
import { useQuery } from 'react-query';
import Loading from '../SHARED/Loading/Loading';
import UserRow from './UserRow';

const USERS = () => {
    //load all user from Database
    const { data: allUsers, isLoading, refetch } = useQuery('users', () => fetch('http://localhost:5000/users',{
        method: 'GET',
        headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()));
    
    if (isLoading) {
        return Loading
    }
    console.log(allUsers);
    return (
        <div>
            <h1>users length <span className='stat-value'>{allUsers.length}</span></h1>

            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    {/* <!-- head --> */}
                    <thead className='text-primary'>
                        <tr>
                            <th>Avator |User Name</th>
                            <th>Email</th>
                            <th>Admin Status</th>
                            <th>User Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allUsers.map(user=><UserRow key={user._id} user={user} refetch={refetch}></UserRow>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default USERS;
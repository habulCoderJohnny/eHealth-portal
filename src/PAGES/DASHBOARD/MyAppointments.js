import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import Loading from '../SHARED/Loading/Loading';


const MyAppointments = () => {
    const [appointments,setAppointments] = useState([]);
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();
    useEffect(()=>{
      //SEND USER MAIL & localStorage accessToken for secure UserData TO SERVER || Token parameter sent 
        if (user) {
            fetch(`http://localhost:5000/booking?patientMail=${user?.email}`,{
              method: 'GET',
              headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
              }
            })
            //Handle unauthorized access || Showing Error
            .then(res=>{ console.log('res:', res);
            if (res.status ===401 || res.status ===403) {
              signOut(auth);
              localStorage.removeItem('accessToken');
              navigate('/login')
            }
      
              return res.json()
            })
            .then(data=>{
              setAppointments(data);
            })
        }
    },[user]);
        
        if (loading) {
            return <Loading></Loading>
        }
    

    return (
        <div>
            <h1>My Appointments: <span className='stat-value text-blue-400'> {appointments.length}</span></h1> <br />


            <div class="overflow-x-auto w-full">
  <table class="table w-full">
    {/* <!-- head --> */}
    <thead className='text-primary'>
      <tr>
        <th>Avator | Name</th>
        <th>Date</th>
        <th>Schedule</th>
        <th>Treatment</th>
        <th>
          <label>
            <input type="checkbox" class="checkbox" />
          </label>
        </th>
      </tr>
    </thead>
    <tbody>

        {
           appointments.map(a =>
            <tr>
            <td>
              <div class="flex items-center space-x-3">
                {/* SELF CODING */}
                <div class="avatar">

                    {
                      user.photoURL ? <div class="rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 w-full"> <img src= {user?.photoURL}  alt=".."/> 
                      </div> : <div class="bg-primary-focus text-neutral-content rounded-full w-24 text-center"><br /><span class="text-base text-white font-bold block">{user?.displayName}</span> </div>
                    }

                </div>
                <div>
                  <div class="font-bold">{a.patientName}</div>
                  <div class="text-sm opacity-50">United States</div>
                </div>
              </div>
            </td>
            <td>
              {a.date}
              <br />
              <span class="badge badge-ghost badge-sm">Desktop Support Technician</span>
            </td>
            <td>{a.slot}</td>
            <th>
              <button class="btn btn-ghost btn-xs">{a.treatment}</button>
            </th>
            <th>
              <label>
                <input type="checkbox" class="checkbox" />
              </label>
            </th>
          </tr>)
        }   
    </tbody>    
  </table>
</div>
        </div>
    );
};

export default MyAppointments;
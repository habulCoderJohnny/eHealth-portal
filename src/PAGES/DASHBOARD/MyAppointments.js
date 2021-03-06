import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import Loading from '../SHARED/Loading/Loading';


const MyAppointments = () => {
  const [appointments,setAppointments] = useState([]);
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(()=>{
    //SEND USER MAIL & localStorage accessToken for secure UserData TO SERVER || Token parameter sent 
    if (user) {
      fetch(`https://e-health-server.herokuapp.com/booking?patientMail=${user?.email}`,{
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      })
        //Handle unauthorized access || Showing Error
        .then(res => {
          console.log('res:', res);
          if (res.status === 401 || res.status === 403) {
            signOut(auth);
            localStorage.removeItem('accessToken');
            navigate('/login')
          }

          return res.json()
        })
        .then(data => {
          setAppointments(data);
        })
    }
  }, [user]);

  if (loading) {
    return <Loading></Loading>
  }


  return (
    <div>
      <h1>My Appointments: <span className='stat-value text-blue-400'> {appointments.length}</span></h1> <br />


      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          {/* <!-- head --> */}
          <thead className='text-primary'>
            <tr>
              <th></th>
              <th>Avator</th>
              <th>Name</th>
              <th>Date</th>
              <th>Schedule</th>
              <th>Treatment</th>
              <th>Payment Status</th>
            </tr>
          </thead>
          <tbody>

            {
              appointments.map((a, index) => 
                <tr key={a._id}>
                  <th>{index+1}</th>
                  <td>
                    <div className="flex items-center space-x-3">
                      {/* SELF CODING */}
                      <div className="avatar">
                        {
                          user.photoURL ? <div className="rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 w-full"> <img src={user?.photoURL} alt=".." />
                          </div> : <div className="bg-primary-focus text-neutral-content rounded-full w-24 text-center"><br /><span className="text-base text-white font-bold block">{user?.displayName}</span> </div>
                        }

                      </div>
                    </div>
                  </td>

                  <td>
                    <div>
                      <div className="font-bold">{a.patientName}</div>
                      <div className="text-sm opacity-50">United States</div>
                    </div>
                  </td>
                  <td>
                    {a.date}
                    <br />
                    <span className="badge badge-ghost badge-sm">Support Technician</span>
                  </td>
                  <td>{a.slot}</td>
                  <th>
                  <button className="btn btn-ghost btn-xs">{a.treatment}</button>
                  </th>
                  <td>{(a.price && !a.paid ) && <Link to={`/dashboard/payment/${a._id}`}>
                    <button className="btn btn-warning btn-xs">Plz Pay</button>
                    </Link>}
                  {(a.price && a.paid ) && 
                   <div>
                      <p className='stat-value text-green-500 text-xl'><FontAwesomeIcon icon={faCheckCircle}></FontAwesomeIcon> PAID</p>
                      <abbr className='text-green-500' title={a.transactionId}>Transaction id</abbr> 
                   </div>}
                   </td>
                </tr>)
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyAppointments;
import React from 'react';
import { toast } from 'react-toastify';

const UserRow = ({user,refetch}) => {
    const {email,Role, photoURL,displayName} = user;
    const makeAdmin = () =>{
        fetch(`https://e-health-server.herokuapp.com/user/admin/${email}`,{
            method: 'PUT',
            headers:{
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then(res=> {
            if (res.status===403) {
                toast.error('Without an admin! Let alone Add a admin')
            }
           return res.json()})
        .then(data =>{
            // console.log(data);
            if (data.modifiedCount>0) {
                refetch();
                toast.success(`Successfully made an admin!`);
            }
            
        })

    }
    return (

        <tr>
            <td>
                <div className="flex items-center space-x-3">
                    {/* SELF CODING */}
                    <div className="avatar">

                        {
                            photoURL ? <div className="rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 w-full"> <img src={photoURL} alt=".." />
                            </div> : <div className="bg-primary-focus text-neutral-content rounded-full w-24 text-center"><br /><span className="text-base text-white font-bold block">{displayName}</span> </div>
                        }

                    </div>
                    <div>
                        <div className="font-bold">{}</div>
                        <div className="text-sm opacity-50">United States</div>
                    </div>
                </div>
            </td>
            <td>
                {email}
                <br />
                <span className="badge badge-ghost badge-sm">Desktop Support Technician</span>
            </td>
            <td>{Role!=='Admin' && <button onClick={makeAdmin} className="btn btn-warning btn-xs">Make Admin</button>}</td>
            <td><button className="btn btn-error btn-xs">Remove user</button></td>
        </tr>
    );
};

export default UserRow;
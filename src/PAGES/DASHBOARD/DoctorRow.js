import React from 'react';
import { toast } from 'react-toastify';

const DoctorRow = ({ doctor, index,refetch }) => {
    const { image, name, email, specialty } = doctor;

    const handleDelete = email =>{
        const confirm = window.confirm(`Are you sure to Delete Doctor: ${name}`);
        if (confirm) {
        fetch(`https://e-health-server.herokuapp.com/doctor/${email}`,{
            method: 'DELETE',
            headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            if (data.deletedCount) {
                toast.success(`${name} is Delete Successfully!`)
                refetch();
            }
            else{
                toast.error('failed to delete!')
            }
        })

      };
    }
    const handleLike = () =>{
        toast('Like added');

    }    

    return (

        <tr className="font-bold">
            <th>{index + 1}</th>
            <td>
                <div class="avatar online">
                    <div class="w-24 mask mask-squircle">
                        <img src={image} alt='' />
                    </div>
                </div>
            </td>

            <td>
                <div>
                    <div>{name}</div>
                    <div className="text-sm opacity-50">United States</div>
                </div>
            </td>
            <td>
                {email}
            </td>
            <td>{specialty} <br />
                <span className="badge badge-ghost badge-sm">MBBS</span>
            </td>
            <th>
                <label>
                    <button onClick={()=>handleLike()} class="btn gap-2 btn-circle  bg-[#2818f1]">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                    </button>
                </label>
            </th>
            <th>
                <label>
                    <button onClick={()=>handleDelete(email)} class="btn btn-square btn-outline btn-error">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </label>
            </th>
        </tr>
    );
};

export default DoctorRow;

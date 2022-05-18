import React from 'react';

const UserRow = ({user}) => {
    const {email,photoURL,displayName} = user;
    return (

        <tr>
            <td>
                <div class="flex items-center space-x-3">
                    {/* SELF CODING */}
                    <div class="avatar">

                        {
                            photoURL ? <div class="rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 w-full"> <img src={photoURL} alt=".." />
                            </div> : <div class="bg-primary-focus text-neutral-content rounded-full w-24 text-center"><br /><span class="text-base text-white font-bold block">{displayName}</span> </div>
                        }

                    </div>
                    <div>
                        <div class="font-bold">{}</div>
                        <div class="text-sm opacity-50">United States</div>
                    </div>
                </div>
            </td>
            <td>
                {email}
                <br />
                <span class="badge badge-ghost badge-sm">Desktop Support Technician</span>
            </td>
            <td><button class="btn btn-warning btn-xs">Make Admin</button></td>
            <td><button class="btn btn-error btn-xs">Remove user</button></td>
        </tr>
    );
};

export default UserRow;
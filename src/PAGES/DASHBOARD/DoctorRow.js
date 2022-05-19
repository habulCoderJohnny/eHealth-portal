import React from 'react';

const DoctorRow = ({ doctor }) => {
    const { image, name, email, specialty } = doctor;

    return (

        <tr className="font-bold">
            <td>
                <div class="avatar online">
                    <div class="w-24 mask mask-squircle">
                        <img src={image} alt=''/>
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
                    <input type="checkbox" className="checkbox" />
                </label>
            </th>
        </tr>
    );
};

export default DoctorRow;

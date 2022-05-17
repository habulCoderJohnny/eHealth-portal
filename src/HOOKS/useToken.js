import { useEffect, useState } from "react";

const useToken = user =>{
    const [token, useToken] = useState('');
    useEffect(()=>{
        //console.log('user inside token', user);
        const email = user?.user?.email;
        const currentUser = {email:email};
        //SEND BACKEND
        if (email) {
            fetch(`http://localhost:5000/user/${email} `,{
                method: 'PUT',
                headers:{
                    'content-type': 'application/json'
                },
                body:JSON.stringify(currentUser)
            })
            .then(res=>res.json())
            .then(data =>{
                console.log('data inside usetoken', data);
            })

        }

    },[user]);
    return [token];
}

export default useToken;
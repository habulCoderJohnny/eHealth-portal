import { useEffect, useState } from "react";

const useToken = user =>{
    const [token, setToken] = useState('');
    useEffect(()=>{
        //console.log('user inside token', user);
        const email = user?.user?.email;
        const currentUser = {email:email};
        //SEND BACKEND
        if (email) {
            fetch(`https://e-health-server.herokuapp.com/user/${email} `,{
                method: 'PUT',
                headers:{
                    'content-type': 'application/json'
                },
                body:JSON.stringify(currentUser)
            })
            .then(res=>res.json())
            .then(data =>{
                console.log('data inside usetoken', data);
                const accessToken = data.token;
                localStorage.setItem('accessToken', accessToken);
                setToken(accessToken);
            })

        }

    },[user]);
    return [token];
}

export default useToken;
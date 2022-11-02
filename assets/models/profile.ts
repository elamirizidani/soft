import { useEffect, useState } from "react";

const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const GetUsers = async () =>{
        try {
            const response = await fetch("http://soft.com:8080/users/read/1");
            const json = await response.json();
            setData(json.users);
            console.log(json.users);
            return json.users
    }
    catch(error) {console.error(error);}
    finally {
        setLoading(false);
    }
    
}
useEffect(() => {
    GetUsers();
},[]);

export default GetUsers;
import React from "react";


const UserContext = React.createContext({
    username:'',
    email:'',
    address:'',
    identity:true,
});

export default UserContext;
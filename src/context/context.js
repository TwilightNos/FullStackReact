import React from "react";


const UserContext = React.createContext({
    username:'',
    email:'',
    address:'',
    identity:true,
    isGoogle:false,
});

export default UserContext;
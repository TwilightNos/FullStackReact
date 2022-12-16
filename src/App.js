import {Route, Routes, useNavigate} from "react-router-dom";
import Login from "./pages/login/Login";
import Customer from "./pages/Customer/Customer"
import Home from "./pages/home/Home";
import storageUtils from "./utils/storageUtils";
import {useContext, useEffect} from "react";
import Register from "./pages/register/Register";
import UserContext from "./context/context";
import Seller from "./pages/Seller/Seller";
import Profile from "./pages/profile/Profile";
import TopNav from "./components/top-nav/TopNav";
import CustomerSearch from "./pages/Customer/CustomerSearch";
import Order from "./components/order/Order";
import History from "./components/order/history";

function App() {

    const navigate = useNavigate();
    // useEffect(()=>{
    //     if(JSON.stringify(storageUtils.getUser())==="{}"){
    //         navigate('/login');
    //     }
    // },[])

    const userctx = useContext(UserContext);
    useEffect(()=>{
        if(JSON.stringify(storageUtils.getUser())==="{}"){
            navigate('/login');
        }else{
            const newUser = storageUtils.getUser();
            userctx.email = newUser.email;
            userctx.address = newUser.address;
            userctx.username = newUser.username;
            userctx.identity = newUser.identity;
        }
    },[])


  return (
    <div>
        <Routes>
            <Route path={'/'} element={<Home/>}></Route>
            <Route path={"/login"} element={<Login/>}></Route>
            <Route path={'/register'} element={<Register/>}></Route>
            <Route path={"/customer"} element={<Customer/>}>
                <Route path={'customerSearch'} element={<CustomerSearch/>}></Route>
                <Route path={'order'} element={<Order/>}></Route>
                <Route path={'history'} element={<History/>}></Route>
                <Route path={'profile'} element={<Profile/>}></Route>
            </Route>
            <Route path={'/seller'} element={<Seller/>}>
                <Route path={'profile'} element={<Profile/>}></Route>
            </Route>
        </Routes>
    </div>
  );
}

export default App;

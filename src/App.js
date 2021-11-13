import React from "react";
import {BrowserRouter, Route,Switch} from 'react-router-dom'

import Login from "./pages/login/login"
import User from "./pages/user/user"
import Signup from "./pages/signup/signup";
import AdminLogin from "./pages/admin/adminLogin";

function App() {
    return(
        <BrowserRouter>
        <Switch>
            <Route path='/login' component={Login}></Route>
            <Route path='/signup' component={Signup}></Route>
            <Route path='/adminLogin' component={AdminLogin}></Route>
            <Route path='/' component={User}></Route>
        </Switch>
        </BrowserRouter>
    )
}
export default App
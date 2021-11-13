import React, { useState } from "react";
//import { Route, Switch, Redirect, Breadcrumb} from "react-router";
import { useHistory } from "react-router";
import { Layout, Menu, Tabs, Radio, Space } from 'antd';
import memoryUtils from "../../utils/memoryUtils";
import './index.less'
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    TeamOutlined,
    MessageOutlined,
} from '@ant-design/icons';


const { TabPane } = Tabs;

/* 主界面路由组件 */
function LeftNav() {

    const { Sider, Content } = Layout;
    const [collapsed, setCollapsed] = useState(false)

    const toggle = () => {
        setCollapsed(!collapsed)
    }
    /* if (!user || !user._id) {
        //hooks中是否在非事件回调函数中(render)用redirect跳转页面
        //return <Redirect to='/login'/>
        history.replace('/login')
    } */
    return (
        {/*  左边导航栏 */ }
        
    )
}
export default LeftNav
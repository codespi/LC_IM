import React, { useState } from "react";
//import { Route, Switch, Redirect, Breadcrumb} from "react-router";
import { useHistory } from "react-router";
//import { useWebSocket } from '../../hooks'
import { Layout, Tabs } from 'antd';
import memoryUtils from "../../utils/memoryUtils";
import './user.less'
import logo from '../../assets/images/logo.png'
//import LeftNav from "../../components/left_nav/index";
import Talk from '../talk_area/talk'
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    TeamOutlined,
    MessageOutlined,
} from '@ant-design/icons';
import Header from "../../components/header";
import ChatList from '../../components/chatList/chatList'
import Friends from '../../components/friends/friends'
import Groups from '../../components/groups/groups'


const { TabPane } = Tabs;

/* 主界面路由组件 */
function User() {

    const user = memoryUtils.user
    const history = useHistory()
    const { Sider, Content } = Layout;
    const [collapsed, setCollapsed] = useState(false)
    

    /* const handleMessage = function(e) {
        console.log('接收处理');
    }
    const ws = useWebSocket(handleMessage) */

    const toggle = () => {
        setCollapsed(!collapsed)
    }
    /* if (!user || !user._id) {
        //hooks中是否在非事件回调函数中(render)用redirect跳转页面
        //return <Redirect to='/login'/>
        history.replace('/login')
    } */
    return (

        <Layout style={{ height: '100%' }} >
            {/*  左边导航栏 */}
            <Sider trigger={null} collapsible collapsed={collapsed} theme="light">
                <div className="left-nav">
                    <header className="left-nav-header">
                        <img src={logo} alt="logo" />
                    </header>
                    <section className="left-nav-content">
                        {/* <Layout> */}
                        {/* <Sider trigger={null} collapsible collapsed={collapsed}> */}
                        <Tabs tabPosition={'left'} style={{ backgroundColor: 'rgb(60,112,126)' }}
                            size={'large'}
                            tabBarGutter={16}
                            type={'line'}
                            className="left-nav-content-tab"
                        >

                            <TabPane tab={
                                <span >
                                    <MessageOutlined onClick={toggle}/>
                                    {collapsed ?
                                        <span></span> :
                                        <span>消息</span>}
                                </span>
                            }
                                key="1"
                                >
                                {collapsed ?
                                    <span></span> :
                                    <ChatList />}

                            </TabPane>

                            <TabPane tab={
                                <span >
                                    <UserOutlined onClick={toggle}/>
                                    {collapsed ?
                                        <span ></span> :
                                        <span>好友</span>}
                                </span>
                            }
                                key="2"
                                >
                                {collapsed ?
                                    <span></span> :
                                    <Friends />}
                            </TabPane>

                            <TabPane tab={
                                <span >
                                    <TeamOutlined onClick={toggle}/>
                                    {collapsed ?
                                        <span></span> :
                                        <span>群组</span>}
                                </span>
                            }
                                key="3"
                                >
                                {collapsed ?
                                    <span></span> :
                                    <Groups />}
                            </TabPane>

                        </Tabs>
                        {/* </Sider> */}
                        {/* </Layout> */}
                    </section>
                </div>
            </Sider>
            <div className="site-layout-background" style={{ padding: 0 }}>
                {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                    className: 'trigger',
                    onClick: toggle,
                })}
            </div>
            <Layout>
                {/* 顶部搜索及状态栏 */}
                <Header />
                {/* 内容部分 */}
                <Content style={{backgroundColor: "Highlight"}}>
                    <Talk id="continer"/>
                </Content>
            </Layout>

        </Layout>
    )
}
export default User
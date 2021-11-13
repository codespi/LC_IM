import React,{useRef, useState} from "react";
import './login.less'
import logo from '../../assets/images/logo.png'
import {reqLogin} from "../../api";
import { Form, Input, Button, message, Spin } from 'antd';
import { UserOutlined, LockOutlined, RightCircleOutlined } from '@ant-design/icons';
import { useHistory } from "react-router";
import cookie from 'react-cookies'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'


/* 登陆路由组件 */
function Login() {

    const formRef=useRef();
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false)

    //如果用户已经登陆，自动跳转到主界面
    /* const user = memoryUtils.user
    if(user && user._id) {
        history.push('/');
    } */

    const handleFinish=(values) => {
        /* console.log(values);
        console.log(formRef.current); */
        const form = formRef.current

        form.validateFields().then(async values => {
            console.log('提交登陆请求', values);
            const {userName, password} = values//解构值务必和下方item标识名一致
            setIsLoading(true)
                const result = await reqLogin(userName, password)
                //console.log('请求成功', response.data);
                if(result.code==="IM100008") {
                    message.success(result.desc)

                    window.sessionStorage.setItem("user_key", document.cookie)

                    /* //保存user
                    const user = Storage.getItem('JSESSIONID')
                    memoryUtils.user = user //保存在内存中
                    storageUtils.saveUser(user) // 保存到local中 */
                    
                    //跳转到主界面 replace 不需要回退到登录
                    setTimeout(()=>{
                        setIsLoading(false)
                        history.replace('/')
                    },800)
                    
                } else {
                    message.error(result.desc)
                    setIsLoading(false)
                }
        }).catch(error => {
            message.error('本地检验失败', error);
        })
    }

    const handleToSign = () => {
        setIsLoading(true)

        setTimeout(()=>{
            setIsLoading(false)
            history.push('/signup')
        },300)
    }
    const handleAdminLogin = () => {
        setIsLoading(true)

        setTimeout(()=>{
            setIsLoading(false)
            history.push('/adminLogin')
        },300)
    }

    return (
        <div className="login">
            <Spin spinning={isLoading}>
            <header className="login-header">
                <img src={logo} alt="logo" />
                <h1>LC-IM</h1>
                <div className="admin-login" onClick={handleAdminLogin}>管理员登录入口
                <RightCircleOutlined className="admin-login-logo"/>
                </div>
            </header>
            <section className="login-content">
                <h2>用户登陆</h2>
                <Form
                    name="normal_login"
                    className="login-form"
                    ref={formRef}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={handleFinish}
                >
                    <Form.Item
                        name="userName"
                        rules={[
                            {
                                required: true,
                                whitespace: true,
                                message: '请输入用户名',
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: '请输入密码',
                            },
                        ]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            登陆
                        </Button>

                        <Button type="primary"  className="login-form-button" onClick={handleToSign}>
                            注册
                        </Button>
                        
                    </Form.Item>
                </Form>
            </section>
            </Spin>
        </div>
    )
}
export default Login


/* 
async和await
1.作用
    简化promise对象使用:不再使用then()来指定成功/失败的回调函数
    以同步编码方式(没有回调函数)实现异步函数
2.哪里写await
    在返回promise的表达式左侧写await：不想要promise, 想要promise异步执行的成功value数据

3.哪里写async
    await所在函数(最近的)定义的左侧
*/
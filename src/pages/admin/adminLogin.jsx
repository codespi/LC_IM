import React,{useRef, useState} from "react";
import './adminLogin.less'
import logo from '../../assets/images/logo.png'
import {reqAdminLogin} from "../../api";
import { Form, Input, Button, message, Spin } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useHistory } from "react-router";

function AdminLogin() {

    const formRef=useRef();
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false)


    const handleFinish=(values) => {
        /* console.log(values);
        console.log(formRef.current); */
        const form = formRef.current

        form.validateFields().then(async values => {
            console.log('提交登陆请求', values);
            const {userName, password} = values//解构值务必和下方item标识名一致
            setIsLoading(true)
                const result = await reqAdminLogin(userName, password)
                //console.log('请求成功', response.data);
                if(result.code==="IM100008") {
                    message.success(result.desc)

                    
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


    return (
        <div className="login">
            <Spin spinning={isLoading}>
            <header className="login-header">
                <img src={logo} alt="logo" />
                <h1>LC-IM</h1>
            </header>
            <section className="login-content">
                <h2>管理员登陆</h2>
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

                        <Button type="primary"  className="login-form-button" >
                            注册
                        </Button>
                        
                    </Form.Item>
                </Form>
            </section>
            </Spin>
        </div>
    )

} 
export default AdminLogin
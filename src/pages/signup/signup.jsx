import React,{useRef, useState} from "react";
import './signup.less'
import logo from './images/logo.png'
import {reqAddUser} from '../../api'
import { Form, Input, Button, message, Spin } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { useHistory } from "react-router";


/* 注册路由组件 */
function Signup() {
    const formRef=useRef();//不需要使用被弃用的包装组件方法来获取form对象Form.create() 包装组件会向被包装组件传入特定属性(高阶组件扩展组件功能) 高阶组件即是一种高阶函数只是接收的是组件函数
    const history = useHistory()
    const [isLoading, setIsLoading] = useState(false)


    const handleFinish=(values)=>{
        /* console.log(values);
        console.log(formRef.current); */
        const form = formRef.current
        //console.log(formRef.current.get);
        form.validateFields().then(async values => {
            const {userName, password, nickName, email} = values
            setIsLoading(true)
            const result = await reqAddUser({userName, password, nickName, email})
            if(result.code==="IM100007") {
                message.success('注册成功')

                setTimeout(()=>{
                    setIsLoading(false)
                    history.push('/login')//跳转到登陆界面 可以回退回来
                },500)
                
                
            } else {
                message.error(result.desc)
                setIsLoading(false)
            }
            //console.log('提交登陆请求', values);
        }).catch(error => {
            message.error('本地检验失败', error);
        })
    }

    const handleBack = () => {
        setIsLoading(true)
        setTimeout(()=>{
            setIsLoading(false)
            history.push('/login')
        },500)
        
    }

    return (
        <div className="sign">
            <Spin spinning={isLoading}>
            <header className="sign-header">
                <img src={logo} alt="logo" />
                <h1>LC-IM</h1>
            </header>
            <section className="sign-content">
                <h2>欢迎注册LC-IM</h2>
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
                        name='userName'
                        /* 声明式验证 */
                        rules={[
                            {
                                required: true,
                                whitespace: true,
                                message: '请输入用户名', 
                            },
                            {
                                max: 12, 
                                message: '用户名最多十二位',
                            }
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                    </Form.Item>

                    <Form.Item
                        name='nickName'
                        /* 声明式验证 */
                        rules={[
                            {
                                required: true,
                                whitespace: true,
                                message: '请输入昵称', 
                            },
                            {
                                max: 8, 
                                message: '昵称最多八位',
                            }
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Nickname" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: '请输入密码',
                            },
                            {
                                min: 4, 
                                message: '密码至少四位',
                            },
                            {
                                max: 12, 
                                message: '密码最多十二位',
                            }
                        ]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>

                    <Form.Item
                        name="reptpassword"
                        rules={[
                            {
                                required: true,
                                message: '请再次输入你的密码',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                  if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                  }
                                  return Promise.reject(new Error('两次输入的密码不一致'));
                                },
                              }),
                        ]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="ReptPassword"
                        />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: '请输入邮箱地址',
                            },
                            {
                                pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, 
                                message: '请输入正确的邮箱地址',
                            },
                            
                        ]}
                    >
                        <Input
                            prefix={<MailOutlined className="site-form-item-icon" />}
                            placeholder="Mail_box"
                        />
                    </Form.Item>

                    <Form.Item>
                        
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            立即注册
                        </Button>
                        
                    </Form.Item>

                    <Form.Item>
                        
                        <Button type="primary"  className="login-form-button beauty" onClick={handleBack}>
                            返回登陆页面
                        </Button>
                        
                    </Form.Item>
                </Form>
            </section>
            </Spin>
        </div>
        
    )
}
export default Signup
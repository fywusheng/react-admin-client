import React, { Component } from 'react'
import { Redirect } from 'react-router';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './login.less'
import logo from '../../assets/images/logo.png'
import { reqLogin } from '../../api'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'


const Item = Form.Item

/**
 * 登录的路由组件
 */
export default class Login extends Component {

    formRef = React.createRef();

    onFinish = () => {

        this.formRef.current.validateFields().then(async (values) => {
             // 请求登陆
            const {username, password} = values
            const result = await reqLogin(username, password)
            if (result.status===0) { // 登陆成功
                // 提示登陆成功
                message.success('登陆成功')
      
                // 保存user
                const user = result.data
                memoryUtils.user = user // 保存在内存中
                storageUtils.saveUser(user) // 保存到local中
      
                // 跳转到管理界面 (不需要再回退回到登陆)
                this.props.history.replace('/')
      
              } else { // 登陆失败
                // 提示错误信息
                message.error(result.msg)
              }
        }).catch((errorInfo ) => {
            console.log(errorInfo || '验证失败！')
        });
    };

    validatePwd = (rule, value, callback) => {
        console.log('validatePwd()', rule, value)
        if(!value) {
          callback('密码必须输入')
        } else if (value.length<4) {
          callback('密码长度不能小于4位')
        } else if (value.length>12) {
          callback('密码长度不能大于12位')
        } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
          callback('密码必须是英文、数字或下划线组成')
        } else {
          callback() // 验证通过
        }
      }

    render() {
        // 如果用户已经登陆，自动跳转到管理界面
        const user = memoryUtils.user
        if(user && user._id) {
            return <Redirect to='/'></Redirect>
        }

        return (
            <div className="login">
                <header className='login-header'>
                    <img src={logo} alt="" />
                    <h1>React项目：后台管理系统</h1>
                </header>
                <section className='login-content'>
                    <h2>用户登录</h2>
                    <Form
                        ref={this.formRef}
                        name="normal_login"
                        className="login-form"
                        initialValues={{ username: 'admin' }}
                        onFinish={this.onFinish}
                        >
                        <Item
                            name="username"
                            rules={[
                                    { required: true, message: '请输入你的用户名!' },
                                    { min: 4, message: '用户名至少4位' },
                                    { max: 12, message: '用户名最多12位' },
                                    { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线组成' },
                                ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入你的用户名" />
                        </Item>
                        <Item
                            name="password"
                            rules={[
                                { validator: this.validatePwd }
                            ]}
                        >
                            <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="请输入你的密码"
                            />
                        </Item>
                        <Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                            登录
                            </Button>
                        </Item>
                    </Form>
                </section>
            </div>
        )
    }
}

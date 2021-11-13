/* 
包含应用中所有接口请求函数的模块 解决每次手动写参数的繁琐
返回Promise对象
*/

import ajax from "./ajax"

//用户登陆
export const reqLogin = (userName, password) => ajax('/auth/login/signIn', {userName, password}, 'POST')

//管理员登陆
export const reqAdminLogin = (userName, password) => ajax('/auth/login/signIn', {userName, password}, 'POST')

//添加用户
export const reqAddUser = (user)  => ajax('/auth/registry/signUp',user, 'POST')

//退出
export const reqLogOut = (userName) => ajax('/auth/login/signOut',{userName})


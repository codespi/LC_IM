/* 
进行local数据存储管理的工具模块
*/
import store from 'store'

const USER_Key = 'user_key'

// eslint-disable-next-line
export default {
    /* 
    保存user
    */
    saveUser(user) {
        //localStorage.setItem(USER_Key, JSON.stringify(user))//对象得toString方法是保存[object, object]
        store.set(USER_Key, user)
    },

    /* 
    读取user
    */
    getUser() {
        //return JSON.parse(localStorage.getItem(USER_Key) || '{}')
        return store.get(USER_Key)
    },

    /* 
    删除user
    */
    removeUser() {
        //localStorage.removeItem(USER_Key)
        //sessionStorage.removeItem(USER_Key)
        store.remove(USER_Key)
    }
}
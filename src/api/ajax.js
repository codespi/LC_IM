/* 
能发送异步ajax函数的模块
封装axios库
函数返回值是promise对象
1. 优化 统一处理请求异常
    在外层抱一个自己创建的promise
*/
import axios from "axios"
import { message } from "antd"

export default function ajax(url, data = {}, type = 'GET') {
    
    const sessionId = document.cookie
    return new Promise((resolve, reject) => {
        let promise
        if (type === 'GET') { //发GET请求
            promise = axios.get(url, {//配置对象
                params: data, //指定请求参数
                headers:{"sessionId":sessionId}
            })
        } else { //发POST请求
            axios.post(url, data,{
                headers:{"sessionId":sessionId}
            })
        }
        promise.then(response => {
            resolve(response.data)
        }).catch(error => {
            message.error("请求出错了: " + error.message)
        })
    })

}


/* 
import axios from "axios";
import { message } from "antd";
import Qs from "qs";
import storageUtils from '../utilsorageUtils';

export default function ajax(url, data={}, type='GET') {
  const token=storageUtils.getUser().token;
  return new Promise((resolve, reject) => {
    let promise
    switch(type){
      case 'GET':
        promise = axios.get(url, {
          params: data,
          headers:{"Authorization":token}
        });
        break;
      case 'POST':
        promise = axios.post(url,Qs.stringify(data),{
          headers:{"Authorization":token}
        });
        break;
      case 'PUT':
        promise = axios.put(url,Qs.stringify(data),{headers:{"Authorization":token}});
        break;
      default:
        promise = axios.delete(url, {params:data,headers:{"Authorization":token}});
        break;
    }

    promise.then(response => {
      resolve(response.data)
    }).catch(error => {
      message.error('请求出错了: ' + error.message)
    })
  })
}

*/

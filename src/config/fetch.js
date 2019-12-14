import{
  baseUrl
}from './env';
import axios from 'axios';
import qs from 'qs';

export default async(url='',data={},type='POST')=>{
  type = type.toUpperCase();
  url = baseUrl + url;
  if(type == 'POST'){
    return new Promise((resolve, reject) =>{
      axios({
        method: type,
        url: url,
        data: qs.stringify(data),
      }).then((response)=>{
        resolve(response.data);
      }).catch((error)=>{
        alert(error);
      });
    });

  }else{
    alert("fetch.js=>不支持POST以外的请求方式");
  }
}

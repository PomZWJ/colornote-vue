import{
  baseUrl
}from './env';
import axios from 'axios';
import qs from 'qs';

export default async(url='',data={},type='POST')=>{
  type = type.toUpperCase();
  url = baseUrl + url;
  if(type == 'POST'){
    axios({
      method: type,
      url: url,
      data: qs.stringify(data),
    }).then((response)=>{
      let data = response.data;
      if(data.resultCode!='000000'){
        alert(data.resultMsg);
      }else{
        let params = data.params;
        return params;
      }
    }).catch((error)=>{
      alert(error);
    });
  }else{
    alert("fetch.js=>不支持POST以外的请求方式");
  }
}

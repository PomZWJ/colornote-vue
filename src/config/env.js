/**
 *配置编译环境和线上环境之间的切换
 * baseUrl 域名地址
 * routerMode 路由模式
 * imgBaseUrl 图片所在的域名地址
 */
let baseUrl = '';
let routerMode = 'hash';
let imgBaseUrl = '';
let systemOkCode = '000000';


if(process.env.NODE_ENV == 'development') {
  baseUrl = "http://vzdn.natapp1.cc/ColorNote/";
  imgBaseUrl = '../../color-note/static/';
}else if(process.env.NODE_ENV == 'production'){
  baseUrl = "http://182.254.163.38/ColorNote/";
  imgBaseUrl = 'static/';
}
export {
  baseUrl,
  routerMode,
  imgBaseUrl,
  systemOkCode
}

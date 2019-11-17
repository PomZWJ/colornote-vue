/**
 *配置编译环境和线上环境之间的切换
 * baseUrl 域名地址
 * routerMode 路由模式
 * imgBaseUrl 图片所在的域名地址
 */
let baseUrl = 'http://vzdn.natapp1.cc/ColorNote/';
let routerMode = 'hash';
let imgBaseUrl = '../../static/';


/*if(progress.env.NODE_ENV == 'development') {
  imgBaseUrl = '/img';
}else if(progress.env.NODE_ENV == 'production'){
  baseUrl = 'http://vzdn.natapp1.cc/ColorNote/'
  imgBaseUrl = "http://vzdn.natapp1.cc/ColorNote/";
}*/
export {
  baseUrl,
  routerMode,
  imgBaseUrl
}

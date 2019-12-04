/**
 *配置编译环境和线上环境之间的切换
 * baseUrl 域名地址
 * routerMode 路由模式
 * imgBaseUrl 图片所在的域名地址
 */
let baseUrl = 'http://182.254.163.38/ColorNote/';
/*let baseUrl = "http://vzdn.natapp1.cc/ColorNote/";*/
let routerMode = 'hash';
let imgBaseUrl = 'static/';
/*let imgBaseUrl = '../../static/';*/


/*if(progress.env.NODE_ENV == 'development') {
  imgBaseUrl = '/img';
}else if(progress.env.NODE_ENV == 'production'){

}*/
export {
  baseUrl,
  routerMode,
  imgBaseUrl
}

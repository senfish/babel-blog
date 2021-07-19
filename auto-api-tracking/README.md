## 接口请求函数自动收集错误

### demo采用Babel插件的形式

> 包括但不限于babel插件

### 需求

类似[自动埋点](https://github.com/senfish/babel-blog/blob/master/auto-track/README.md)


对接口请求函数实现try catch自动包裹，并且将错误信息上传至错误中心。


### 如何确定那些函数是接口请求函数？

君子协议: 规定接口请求函数名必须是以Dispatch结尾的。


```js
  cd auto-api-tracking && npm install
  npm run dev
```
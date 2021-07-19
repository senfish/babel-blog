## 接口请求函数自动收集错误

### demo采用Babel插件的形式

> 包括但不限于babel插件

### 需求

类似[自动埋点](https://github.com/senfish/babel-blog/blob/master/auto-track/README.md)

对接口请求函数实现try catch自动包裹，并且将错误信息上传至错误中心。

### 如何确定那些函数是接口请求函数？

君子协议: 规定接口请求函数名必须是以Dispatch结尾的。


### 插件用法

插件接受两个参数：
 - **keyword**： `string` 需要处理的函数名字部分关键字
 - **name**：`string` 第三方包名

```js
  cd auto-api-tracking && npm install
  npm run dev
```

Example：

```js
const getListDispatch = async () => {
  let a = 'aaa';
  return request.get();
}
const getUserDispatch = () => {
  try {
    return request.get();
  } catch (err) {
    console.log('err', err);
  }
}
```

转成

```js
import _errorCenter2 from "error-center";

const getListDispatch = async () => {
  try {
    let a = 'aaa';
    return request.get();
  } catch (err) {
    _errorCenter2.add(err);
  }
};

const getUserDispatch = () => {
  try {
    return request.get();
  } catch (err) {
    console.log('err', err);
  }
};
```


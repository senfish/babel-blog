## api自动生成文档说明

```js
  cd api-auto-to-docs && npm install
```

```js
  npm run dev
```
### 利用babel-plugin实现自动生成api文档

Example:

```ts
/**
 * 获取名字
 * @param {string} fristName 名字
 * @param {string} lastName 姓氏
 * @returns {string} 返回字符串
 */
 function getName(fristName: string, lastName: string) {
  return lastName + fristName;
}
```
转成下面这种：

### getName 

#### 获取名字 
| 参数    | 类型    | 描述   | 
| ---    | ---     | ---   | 
| fristName | string | 名字   |
| lastName | string | 姓氏   |

const homedir = require("os").homedir(); //用户home目录
const home = process.env.HOME || homedir; //系统home目录
const p = require("path");
const fs = require("fs");
const dbPath = p.join(home, ".todo"); //node.js提供的api帮我们合并路径使得window和mac用户都能使用
const db = {
  read(path = dbPath) {
    //由于读文件是异步操作，所以我们需要read函数返回一个Promise
    return new Promise((resolve, reject) => {
      fs.readFile(path, { flag: "a+" }, (error, data) => {
        if (error) return reject(error);
        let list;
        try {
          //判断data.toString()是否为空，如果为空不能转化为对象数组
          list = JSON.parse(data.toString());
        } catch (error2) {
          //用哪个try catch来捕获这个错误，并将空数组赋给list
          list = [];
        }
        resolve(list);
      });
    });
  },
  write(list, path = dbPath) {
    //属于es6语法，如果传了path就用path，如果没传就用dbPath
    return new Promise((resolve, reject) => {
      const string = JSON.stringify(list);
      fs.writeFile(path, string + "\n", (error) => {
        if (error) return reject(error);
        resolve();
      });
    });
  },
};
//不能用export default,node.js不支持
module.exports = db;

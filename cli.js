#!/usr/bin/env node
const program = require("commander");
const api = require("./index.js");
program.option("-x, --xxx", "what the x");
//子命令
program
  .command("add")
  .description("add a task")
  //add后面的第一个参数
  .action((...args) => {
    //最后一个参数是一个对象Command
    const words = args.slice(0, -1).join(" ");
    api.add(words).then(
      () => {
        console.log("成功了");
      },
      () => {
        console.log("失败了");
      }
    );
  });
program
  .command("clear")
  .description("clear a task")
  //add后面的第一个参数
  .action(() => {
    api.clear().then(
      () => {
        console.log("清除成功了");
      },
      () => {
        console.log("清除失败了");
      }
    );
  });
program.parse(process.argv);
if (process.argv.length === 2) {
  api.showAll();
}

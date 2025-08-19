/*
 * @Author: dqr
 * @Date: 2025-08-18 14:42:50
 * @LastEditors: D Q R 852601818@qq.com
 * @LastEditTime: 2025-08-18 17:17:54
 * @FilePath: /vue3-design/server/index.js
 * @Description: 
 * 
 */
const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const cron = require("node-cron");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// 保存客户端连接
let clients = [];

wss.on("connection", (ws) => {
  console.log("客户端已连接");
  clients.push(ws);

  ws.on("close", () => {
    clients = clients.filter((c) => c !== ws);
  });
});

// 定时任务：每天 11:50 触发
cron.schedule("50 11 * * 1,2,3,4", () => {
  console.log("⏰ 定时任务触发：11:50");

  // 给所有客户端发消息
  clients.forEach((ws) => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ type: "task", message: "11:50 触发任务" }));
    }
  });
}, {
  timezone: 'Asia/Shanghai'  // 设置为北京时间
});


server.listen(3000, () => {
  console.log("服务器已启动 http://localhost:3000");
});

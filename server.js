const http = require("http");

const PORT = process.env.PORT || 3000;
const ADMIN_TOKEN = process.env.ADMIN_TOKEN;

let online = true;

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json; charset=utf-8");

  if (req.url === "/status") {
    res.end(JSON.stringify({
      game: "Перекуп телефонов Online",
      online
    }));
    return;
  }

  if (req.url === "/admin/off" || req.url === "/admin/on") {
    if (
      !ADMIN_TOKEN ||
      req.headers["x-admin-token"] !== ADMIN_TOKEN
    ) {
      res.writeHead(403);
      res.end(JSON.stringify({ error: "Доступ запрещён" }));
      return;
    }

    online = req.url === "/admin/on";

    res.end(JSON.stringify({ online }));
    return;
  }

  if (!online) {
    res.writeHead(503);
    res.end(JSON.stringify({ error: "Сервер выключен" }));
    return;
  }

  res.end(JSON.stringify({
    game: "Перекуп телефонов Online",
    status: "Работает"
  }));
});

server.listen(PORT, "0.0.0.0", () => {
  console.log("Сервер запущен на порту " + PORT);
});

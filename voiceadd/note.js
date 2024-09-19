const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`サーバーがポート ${port} で起動しました`);
});

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`ポート ${port} は既に使用中です。別のポートを試します。`);
    const newPort = port + 1;
    server.listen(newPort, () => {
      console.log(`サーバーがポート ${newPort} で起動しました`);
    });
  } else {
    console.error('サーバーエラー:', error);
  }
});
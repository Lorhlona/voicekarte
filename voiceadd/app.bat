@echo off

echo アプリケーションを起動しています...
start cmd /k "npm run dev"


echo サーバーが起動するまで15秒待機しています...
timeout /t 15 /nobreak


echo ブラウザを開いています...
start http://localhost:3000

pause
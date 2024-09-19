@echo off

echo アプリケーションを起動しています...
start cmd /k "npm run dev"


:: 15秒待機
echo サーバーが起動するまで15秒待機しています...
timeout /t 15 /nobreak

:: ブラウザを開く
echo ブラウザを開いています...
start http://localhost:3000

:: バッチファイルを開いたままにする
pause
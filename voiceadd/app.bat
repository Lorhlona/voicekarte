@echo off
:: 管理者権限かどうかをチェック
net session >nul 2>&1
if %errorLevel% EQU 0 (
    echo 管理者として実行しないでください。
    pause
    exit /b
)

:: スクリプトのディレクトリに移動
cd /d "%~dp0"

:: Node.jsアプリケーションの起動
node note.js
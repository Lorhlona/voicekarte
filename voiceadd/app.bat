@echo off

start cmd /k "npm run dev"


timeout /t 15 /nobreak

start http://localhost:3000

pause
@echo off
chcp 65001 > nul
cd /d "%~dp0"
echo Current directory: %CD%
echo Installing dependencies...
call npm install
echo.
echo Setting up Prisma...
call npx prisma generate
call npx prisma db push
echo.
echo Seeding database...
call npx tsx prisma/seed.ts
echo.
echo Setup complete! Run 'npm run dev' to start the development server.
pause

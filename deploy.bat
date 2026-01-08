@echo off
chcp 65001 > nul
cd /d "%~dp0"

echo ========================================
echo   Vercelにデプロイします
echo ========================================
echo.

:: Vercel CLIがインストールされているか確認
where vercel >nul 2>&1
if errorlevel 1 (
    echo Vercel CLIをインストール中...
    npm install -g vercel
)

echo.
echo デプロイを開始します...
echo （初回はブラウザでログインが必要です）
echo.

vercel --prod

echo.
echo ========================================
echo   デプロイ完了！
echo ========================================
pause

@echo off
chcp 65001 > nul
cd /d "%~dp0"

echo ========================================
echo   GitHubへプッシュします
echo ========================================
echo.

:: ステージング
echo ファイルをステージング中...
git add -A

:: 変更があるか確認
git diff --cached --quiet
if errorlevel 1 (
    echo.
    echo 変更をコミット中...
    git commit -m "Update: 修正"
) else (
    echo.
    echo 新しい変更はありません。
)

:: プッシュ
echo.
echo GitHubにプッシュ中...
git push origin main

echo.
echo ========================================
echo   完了しました！
echo ========================================
echo.
echo GitHubで確認: https://github.com/hikkoreeno/gurumreview
echo.
pause

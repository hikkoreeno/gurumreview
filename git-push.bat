@echo off
chcp 65001 > nul
cd /d "%~dp0"

echo ========================================
echo   GitHubへプッシュします
echo ========================================
echo.

:: 現在の状態を表示
echo 現在のファイル状態:
git status

echo.
echo ========================================
echo.

:: すべてのファイルをステージング（強制）
echo すべてのファイルをステージング中...
git add -A --verbose

:: コミット
echo.
echo コミット中...
git commit -m "Fix: Remove unused AnimatePresence import" --allow-empty

:: プッシュ
echo.
echo GitHubにプッシュ中...
git push origin main

echo.
echo ========================================
echo   完了しました！
echo ========================================
echo.
pause

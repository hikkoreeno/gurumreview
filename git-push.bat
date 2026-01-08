@echo off
chcp 65001 > nul
cd /d "%~dp0"

echo ========================================
echo   GitHubへプッシュします
echo ========================================
echo.

:: Gitリポジトリが初期化されているか確認
if not exist ".git" (
    echo Gitリポジトリを初期化中...
    git init
)

:: リモートが設定されているか確認
git remote get-url origin >nul 2>&1
if errorlevel 1 (
    echo リモートリポジトリを設定中...
    git remote add origin https://github.com/hikkoreeno/gurumreview.git
)

:: ユーザー設定（未設定の場合）
git config user.email >nul 2>&1
if errorlevel 1 (
    git config user.email "hikkoreeno@users.noreply.github.com"
    git config user.name "hikkoreeno"
)

:: ステージング
echo.
echo ファイルをステージング中...
git add -A

:: ステータス確認
echo.
echo 現在の状態:
git status --short

:: コミット
echo.
set /p msg="コミットメッセージを入力 (Enterでデフォルト): "
if "%msg%"=="" set msg=Initial commit: グルメレビューサイト

git commit -m "%msg%"

:: ブランチ名を設定
git branch -M main

:: プッシュ
echo.
echo GitHubにプッシュ中...
git push -u origin main

if errorlevel 1 (
    echo.
    echo エラーが発生しました。強制プッシュを試みます...
    git push -u origin main --force
)

echo.
echo ========================================
echo   完了しました！
echo ========================================
echo.
echo GitHubで確認: https://github.com/hikkoreeno/gurumreview
echo.
pause

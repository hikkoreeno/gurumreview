# Setup script for Gurume Review
$ErrorActionPreference = "Stop"

# Get the directory where this script is located
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path

Write-Host "Setting up Gurume Review..." -ForegroundColor Cyan
Write-Host "Directory: $scriptDir" -ForegroundColor Gray

# Change to project directory
Set-Location $scriptDir

# Install dependencies
Write-Host "`nInstalling dependencies..." -ForegroundColor Yellow
npm install

# Generate Prisma client
Write-Host "`nGenerating Prisma client..." -ForegroundColor Yellow
npx prisma generate

# Push database schema
Write-Host "`nSetting up database..." -ForegroundColor Yellow
npx prisma db push

# Seed database
Write-Host "`nSeeding database..." -ForegroundColor Yellow
npx tsx prisma/seed.ts

Write-Host "`nSetup complete!" -ForegroundColor Green
Write-Host "Run 'npm run dev' to start the development server." -ForegroundColor Cyan

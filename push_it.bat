@echo off
cd /d "%~dp0"

git add .
git commit -m "Website Update"
git push origin main
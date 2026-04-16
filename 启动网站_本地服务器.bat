@echo off
chcp 65001 >nul
cd /d "%~dp0"

set PORT=8090
echo 正在启动本地服务器：http://localhost:%PORT%/
echo 请保持此窗口打开，关闭窗口即停止网站�?
where py >nul 2>nul
if %errorlevel%==0 (
  start "" "http://localhost:%PORT%/index.html"
  py -m http.server %PORT%
  goto :eof
)

where python >nul 2>nul
if %errorlevel%==0 (
  start "" "http://localhost:%PORT%/index.html"
  python -m http.server %PORT%
  goto :eof
)

echo 未检测到 Python，无法启动本地服务器�?echo 请先安装 Python，或继续使用原来的打开方式�?pause


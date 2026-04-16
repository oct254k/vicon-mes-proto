@echo off
chcp 65001 >nul 2>&1
title VICON MES

REM 이미 실행 중이면 브라우저만 열고 종료
powershell -NoProfile -Command "try{(New-Object Net.Sockets.TcpClient('localhost',8080)).Close();exit 0}catch{exit 1}" >nul 2>&1
if %errorlevel%==0 (
    echo  이미 실행 중입니다. 브라우저를 엽니다.
    start http://localhost:8080
    timeout /t 2 >nul
    exit
)

echo.
echo  ============================================
echo    VICON MES 를 시작합니다...
echo    브라우저가 자동으로 열립니다.
echo    이 창을 닫으면 종료됩니다.
echo  ============================================
echo.

set PORT=8080

REM 브라우저 열기
start http://localhost:%PORT%

REM PowerShell 간이 웹서버 실행
powershell -NoProfile -ExecutionPolicy Bypass -Command ^
  "$port=%PORT%;" ^
  "$root=(Get-Item '%~dp0').FullName;" ^
  "$listener=[System.Net.HttpListener]::new();" ^
  "$listener.Prefixes.Add(\"http://localhost:${port}/\");" ^
  "$listener.Start();" ^
  "Write-Host \"서버 실행 중: http://localhost:${port}\" -ForegroundColor Green;" ^
  "Write-Host \"종료하려면 이 창을 닫으세요.\" -ForegroundColor Yellow;" ^
  "Write-Host '';" ^
  "while($listener.IsListening){" ^
  "  $ctx=$listener.GetContext();" ^
  "  $req=$ctx.Request;" ^
  "  $res=$ctx.Response;" ^
  "  $url=$req.Url.LocalPath;" ^
  "  if($url -eq '/'){$url='/index.html'}" ^
  "  if($url.EndsWith('/')){$url+='index.html'}" ^
  "  $file=Join-Path $root ($url -replace '/','\\');" ^
  "  if(Test-Path $file -PathType Leaf){" ^
  "    $bytes=[System.IO.File]::ReadAllBytes($file);" ^
  "    $ext=[System.IO.Path]::GetExtension($file);" ^
  "    $mime=switch($ext){" ^
  "      '.html'{'text/html;charset=utf-8'}" ^
  "      '.js'{'application/javascript'}" ^
  "      '.css'{'text/css'}" ^
  "      '.json'{'application/json'}" ^
  "      '.png'{'image/png'}" ^
  "      '.jpg'{'image/jpeg'}" ^
  "      '.svg'{'image/svg+xml'}" ^
  "      '.ico'{'image/x-icon'}" ^
  "      '.woff2'{'font/woff2'}" ^
  "      '.woff'{'font/woff'}" ^
  "      '.ttf'{'font/ttf'}" ^
  "      default{'application/octet-stream'}" ^
  "    };" ^
  "    $res.ContentType=$mime;" ^
  "    $res.ContentLength64=$bytes.Length;" ^
  "    $res.OutputStream.Write($bytes,0,$bytes.Length);" ^
  "  }else{" ^
  "    $fallback=Join-Path $root 'index.html';" ^
  "    if(Test-Path $fallback){" ^
  "      $bytes=[System.IO.File]::ReadAllBytes($fallback);" ^
  "      $res.ContentType='text/html;charset=utf-8';" ^
  "      $res.ContentLength64=$bytes.Length;" ^
  "      $res.OutputStream.Write($bytes,0,$bytes.Length);" ^
  "    }else{" ^
  "      $res.StatusCode=404;" ^
  "    }" ^
  "  }" ^
  "  $res.Close();" ^
  "}"

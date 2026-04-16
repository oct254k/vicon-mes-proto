#!/bin/bash

PORT=8080
DIR="$(cd "$(dirname "$0")" && pwd)"

# 이미 실행 중이면 브라우저만 열고 종료
if lsof -i :$PORT >/dev/null 2>&1; then
    echo "  이미 실행 중입니다. 브라우저를 엽니다."
    open "http://localhost:$PORT" 2>/dev/null || xdg-open "http://localhost:$PORT" 2>/dev/null
    sleep 2
    exit 0
fi

echo ""
echo "  ============================================"
echo "    VICON MES 를 시작합니다..."
echo "    브라우저가 자동으로 열립니다."
echo "    이 창을 닫으면 종료됩니다."
echo "  ============================================"
echo ""

# 브라우저 열기
open "http://localhost:$PORT" 2>/dev/null || xdg-open "http://localhost:$PORT" 2>/dev/null &

# Python 간이 웹서버 실행
cd "$DIR"
echo "서버 실행 중: http://localhost:$PORT"
echo "종료하려면 이 창을 닫으세요."
echo ""
python3 -m http.server $PORT 2>/dev/null || python -m http.server $PORT

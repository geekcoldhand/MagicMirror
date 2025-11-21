#!/bin/bash
# MagicMirror² Diagnostic Script
# Save this as diagnose.sh and run with: bash diagnose.sh

echo "=========================================="
echo "MagicMirror² Diagnostic Report"
echo "=========================================="
echo ""

cd ~/Desktop/Dev/All/MagicMirror

echo "1. CORE FILES CHECK"
echo "-------------------"
for file in index.html js/module.js js/loader.js js/main.js js/socketclient.js config/config.js; do
    if [ -f "$file" ]; then
        echo "✓ $file exists"
    else
        echo "✗ $file MISSING"
    fi
done
echo ""

echo "2. MODULE DIRECTORIES CHECK"
echo "---------------------------"
for dir in modules/default/clock modules/default/alert modules/default/calendar modules/default/weather; do
    if [ -d "$dir" ]; then
        echo "✓ $dir exists"
        ls -la "$dir" | grep -E '\.(js|css)$' || echo "  (no .js or .css files found)"
    else
        echo "✗ $dir MISSING"
    fi
done
echo ""

echo "3. CLOCK MODULE FILES"
echo "---------------------"
if [ -f "modules/default/clock/clock.js" ]; then
    echo "✓ clock.js exists ($(wc -l < modules/default/clock/clock.js) lines)"
    echo "First line:"
    head -1 modules/default/clock/clock.js
else
    echo "✗ clock.js MISSING"
fi
echo ""

echo "4. ALERT MODULE FILES"
echo "---------------------"
if [ -f "modules/default/alert/alert.js" ]; then
    echo "✓ alert.js exists ($(wc -l < modules/default/alert/alert.js) lines)"
    echo "First line:"
    head -1 modules/default/alert/alert.js
else
    echo "✗ alert.js MISSING"
fi
echo ""

echo "5. CONFIG.JS CHECK"
echo "------------------"
if [ -f "config/config.js" ]; then
    echo "Number of modules in config:"
    grep -c '"module":' config/config.js || echo "0"
    echo ""
    echo "Modules configured:"
    grep '"module":' config/config.js | sed 's/.*"module": *"\([^"]*\)".*/  - \1/'
else
    echo "✗ config.js MISSING"
fi
echo ""

echo "6. LAST 10 LINES OF INDEX.HTML"
echo "-------------------------------"
tail -10 index.html
echo ""

echo "7. SERVER CHECK"
echo "---------------"
if lsof -i :8080 > /dev/null 2>&1; then
    echo "✓ Server is running on port 8080"
    echo "Process:"
    lsof -i :8080 | grep LISTEN
else
    echo "✗ No server running on port 8080"
fi
echo ""

echo "8. TESTING SERVER RESPONSE"
echo "--------------------------"
if curl -s -o /dev/null -w "%{http_code}" http://localhost:8080 | grep -q "200"; then
    echo "✓ Server responds with HTTP 200"
else
    echo "✗ Server not responding or error"
fi
echo ""

echo "9. MODULE FILE ACCESSIBILITY"
echo "----------------------------"
if curl -s -o /dev/null -w "%{http_code}" http://localhost:8080/modules/default/clock/clock.js | grep -q "200"; then
    echo "✓ clock.js accessible via HTTP"
else
    echo "✗ clock.js NOT accessible via HTTP"
fi

if curl -s -o /dev/null -w "%{http_code}" http://localhost:8080/js/module.js | grep -q "200"; then
    echo "✓ module.js accessible via HTTP"
else
    echo "✗ module.js NOT accessible via HTTP"
fi
echo ""

echo "=========================================="
echo "Diagnostic Complete"
echo "=========================================="
echo ""
echo "Copy all of this output and send it for analysis."
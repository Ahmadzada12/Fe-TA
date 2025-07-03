#!/bin/bash

# 🚀 Quick Start Script - Crowdfunding Platform
# Run this script to verify current status

echo "=== CROWDFUNDING PLATFORM STATUS CHECK ==="
echo ""

# Check frontend status
echo "📱 FRONTEND STATUS:"
if curl -f http://localhost:5173 >/dev/null 2>&1; then
    echo "✅ Frontend running at http://localhost:5173"
else
    echo "❌ Frontend not running - run 'pnpm run start'"
fi

echo ""

# Check backend status (assuming port 3001)
echo "🔧 BACKEND STATUS:"
if curl -f http://localhost:3001/v1/crowdfounding >/dev/null 2>&1; then
    echo "✅ Backend API accessible"
    
    # Test statistics endpoint
    if curl -f http://localhost:3001/v1/crowdfounding/statistics >/dev/null 2>&1; then
        echo "✅ Statistics endpoint working"
        echo "📊 Statistics response:"
        curl -s http://localhost:3001/v1/crowdfounding/statistics | jq .
    else
        echo "❌ Statistics endpoint missing - needs implementation"
        echo "👉 Run backend implementation steps from NEXT-STEPS.md"
    fi
else
    echo "❌ Backend not running or not accessible"
    echo "👉 Start backend server first"
fi

echo ""

# Check project structure
echo "📁 PROJECT STRUCTURE:"
if [ -f "src/pages/home.vue" ]; then
    echo "✅ Frontend files present"
else
    echo "❌ Frontend files missing"
fi

if [ -d "backend-optimization" ]; then
    echo "✅ Backend documentation present"
    echo "📋 Available scripts:"
    ls backend-optimization/*.ps1 2>/dev/null || echo "   No PowerShell scripts found"
    ls backend-optimization/*.md 2>/dev/null || echo "   No documentation found"
else
    echo "❌ Backend documentation missing"
fi

echo ""

# Next actions
echo "🎯 NEXT ACTIONS:"
echo "1. If backend not running: implement statistics endpoint"
echo "2. If frontend not running: run 'pnpm run start'"
echo "3. If both running: test homepage at http://localhost:5173"
echo "4. Check browser console for any errors"

echo ""
echo "📖 For detailed steps, see:"
echo "   - NEXT-STEPS.md (full roadmap)"
echo "   - ACTION-PLAN.md (immediate actions)"
echo "   - backend-optimization/ (backend implementation)"

echo ""
echo "=== STATUS CHECK COMPLETE ==="

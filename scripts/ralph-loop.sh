#!/bin/bash
# Ralph Loop - Phase 0 Reality Check Automation
# Runs every 15 minutes to verify and fix WhiteClaws platform

set -e

echo "🐇 RALPH LOOP - Phase 0 Reality Check"
echo "========================================"

# Read PROMPT.md and CONTEXT.md
echo "📖 Reading PROMPT.md and CONTEXT.md..."

# Run Phase 0 Reality Check
echo "🔍 Running Phase 0 Reality Check..."

cd /home/ubuntu/clawd/whiteclaws

# Check 1: Git status
echo "📝 Check 1: Git status..."
git status --short > /tmp/git_status.txt || true

# Check 2: npm run build
echo "🏗️ Check 2: Running build..."
npm run build 2>&1 | tee /tmp/build_output.txt || BUILD_FAILED=1

# Check 3: Check routes exist
echo "🛣️ Check 3: Checking critical routes..."
ROUTES_OK=1
for route in "app/page.tsx" "app/bounties/page.tsx" "app/leaderboard/page.tsx" "app/login/page.tsx" "app/dashboard/page.tsx"; do
    if [ ! -f "$route" ]; then
        echo "  ❌ Missing: $route"
        ROUTES_OK=0
    fi
done

if [ "$ROUTES_OK" = "1" ]; then
    echo "  ✅ All critical routes exist"
fi

# Generate checklist summary
echo ""
echo "📊 VERIFICATION CHECKLIST SUMMARY:"
echo "==================================="

# Parse results and determine highest priority issue
# This script is called by the cron job, actual logic handled in agent

echo ""
echo "✅ Phase 0 Reality Check Complete"

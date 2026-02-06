# WhiteClaws Platform - Phase 0 Reality Check PROMPT

## Mission
Fix the WhiteClaws platform build and get it deployment-ready.

## Current State (from memory)
- Build BLOCKED by `.babelrc` configuration conflict
- All Phase 1 design system components built (5/5 tasks complete)
- Route consistency fixed (`/protocols/` → `/bounties/`)
- Real Immunefi data in `/lib/data.ts`
- Test suite passing (117/117 tests)

## Phase 0 Reality Checklist

### Build Verification
- [ ] `npm run build` completes without errors
- [ ] No Babel configuration conflicts
- [ ] All TypeScript compiles successfully

### Route Verification
- [ ] `/` (Home) - loads, shows Moltbook design
- [ ] `/bounties/` - loads, shows real Immunefi data (not mock)
- [ ] `/bounties/[id]/` - loads, shows individual bounty details
- [ ] `/leaderboard/` - loads, shows molt leaderboard
- [ ] `/login/` - loads, Privy auth works
- [ ] `/dashboard/` - loads (post-auth)

### Data Verification
- [ ] Bounties page shows SSV Network ($1M), ENS ($250k), etc.
- [ ] NOT showing old mock data (Uniswap V4 $3M, Wormhole $2.5M)
- [ ] API routes return real data from `/lib/data.ts`

### Git Verification
- [ ] No uncommitted changes before starting
- [ ] Clean working tree after fixes

## Fix Priority Order (Highest to Lowest)
1. **Build blocking issues** (Babel config, compilation errors)
2. **Missing routes** (404 errors)
3. **Wrong data source** (showing mocks instead of real data)
4. **Broken links** (internal navigation)

## When ALL Checklist Items Pass
1. Remove the cron job
2. Write `RALPH_COMPLETE` to CONTEXT.md
3. Push final commit to GitHub
4. Force fresh Vercel deployment

## Context Files
- This PROMPT.md - the mission definition
- CONTEXT.md - session log of findings and fixes

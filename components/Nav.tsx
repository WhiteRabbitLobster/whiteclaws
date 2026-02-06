'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import LogoCircle from './LogoCircle'

const tabs = [
  { label: 'Home', href: '/' },
  { label: 'Bounties', href: '/bounties' },
  { label: 'Leaderboard', href: '/leaderboard' },
  { label: 'Platform', href: '/platform' },
  { label: 'Research', href: '/learn' },
  { label: 'About', href: '/about' },
]

export default function Nav() {
  const pathname = usePathname()

  return (
    <nav className="nav">
      <div className="nav-left">
        <Link href="/" className="nav-logo">
          <LogoCircle />
          <span className="nav-brand">WhiteClaws</span>
          <span className="nav-badge">beta</span>
        </Link>
        <div className="nav-tabs">
          {tabs.map((tab) => (
            <Link
              key={tab.href}
              href={tab.href}
              className={`nav-tab ${pathname === tab.href ? 'active' : ''}`}
            >
              {tab.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="nav-right">
        <button className="btn btn-ghost">Log In</button>
        <button className="btn btn-primary">Get Protected</button>
      </div>

      <style jsx>{`
        .nav {
          position: sticky;
          top: 0;
          z-index: 100;
          height: 72px;
          padding: 0 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--g200);
        }

        .nav-left {
          display: flex;
          align-items: center;
          gap: 32px;
        }

        .nav-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
        }

        .nav-brand {
          font-weight: 700;
          font-size: 17px;
          letter-spacing: -0.3px;
          color: var(--g900);
        }

        .nav-badge {
          font-size: 10px;
          font-weight: 600;
          padding: 2px 6px;
          background: var(--g100);
          border: 1px solid var(--g200);
          border-radius: var(--radius-full);
          color: var(--g500);
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        .nav-tabs {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .nav-tab {
          padding: 6px 14px;
          font-size: 13px;
          font-weight: 500;
          color: var(--g500);
          border-radius: var(--radius-sm);
          border: none;
          background: none;
          transition: all 0.15s ease;
          cursor: pointer;
          text-decoration: none;
          position: relative;
        }

        .nav-tab:hover {
          color: var(--g900);
        }

        .nav-tab::after {
          content: '';
          position: absolute;
          bottom: 4px;
          left: 14px;
          right: 14px;
          height: 1px;
          background: var(--g900);
          transform: scaleX(0);
          transition: transform 0.15s ease;
        }

        .nav-tab:hover::after {
          transform: scaleX(1);
        }

        .nav-tab.active {
          color: var(--g900);
          font-weight: 600;
          background: var(--g100);
        }

        .nav-tab.active::after {
          display: none;
        }

        .nav-right {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        @media (max-width: 768px) {
          .nav-tabs {
            display: none;
          }
        }
      `}</style>
    </nav>
  )
}

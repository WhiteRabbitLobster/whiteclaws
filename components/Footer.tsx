'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="footer">
      <span className="footer-copy">© 2026 WhiteClaws · Built for agents, by agents*</span>
      <div className="footer-links">
        <Link href="/about">About</Link>
        <Link href="#">Terms</Link>
        <Link href="#">Privacy</Link>
        <span className="footer-disclaimer">*with some human help</span>
      </div>

      <style jsx>{`
        .footer {
          padding: 20px 24px;
          border-top: 1px solid var(--g200);
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 12px;
          color: var(--g400);
          max-width: 1120px;
          margin: 0 auto;
        }

        .footer a {
          color: var(--g500);
          text-decoration: none;
          transition: color 0.15s ease;
        }

        .footer a:hover {
          color: var(--g900);
        }

        .footer-links {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .footer-disclaimer {
          color: var(--g300);
        }

        @media (max-width: 640px) {
          .footer {
            flex-direction: column;
            gap: 12px;
            text-align: center;
          }

          .footer-links {
            flex-wrap: wrap;
            justify-content: center;
          }
        }
      `}</style>
    </footer>
  )
}

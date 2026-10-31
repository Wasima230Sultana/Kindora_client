import { Mail } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { footerLinkGroups } from "@/lib/data"

const socialIcons = [
  {
    name: "X",
    href: "#",
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644z",
  },
  {
    name: "YouTube",
    href: "#",
    path: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
  },
]

const socialShapes = [
  {
    name: "Instagram",
    href: "#",
    shape: (
      <g fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" stroke="none" />
      </g>
    ),
  },
  {
    name: "Facebook",
    href: "#",
    shape: (
      <path
        fill="currentColor"
        d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
      />
    ),
  },
]

export function Footer() {
  return (
    <>
      {/* Newsletter band */}
      <section className="px-4 pb-14">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 rounded-3xl bg-gradient-to-r from-violet-600 via-violet-600 to-indigo-600 px-6 py-7 shadow-xl shadow-violet-600/25 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-white/25">
              <Mail className="size-6" />
            </span>
            <div>
              <p className="font-heading text-lg font-bold text-white">
                Subscribe to Our Newsletter
              </p>
              <p className="mt-0.5 max-w-md text-sm text-white/75">
                Get the latest events, volunteer opportunities and initiatives.
              </p>
            </div>
          </div>
          <div className="flex w-full max-w-md items-center gap-2">
            <Input
              type="email"
              placeholder="Enter your email address"
              aria-label="Email address"
              className="h-11 flex-1 rounded-full border-0 bg-white px-5 text-sm dark:bg-white"
            />
            <Button
              type="button"
              className="h-11 rounded-full bg-violet-800! px-6 text-white hover:bg-violet-900!"
            >
              Subscribe
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="scroll-mt-20 bg-[#151528] text-white/70">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500 text-white">
                <svg
                  viewBox="0 0 24 24"
                  className="size-5"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </span>
              <div>
                <p className="font-heading text-lg leading-tight font-bold text-white">
                  CommunityHub
                </p>
                <p className="text-[11px] text-white/50">
                  Together for a better society
                </p>
              </div>
            </div>

            <div className="mt-5 flex items-center gap-2.5">
              {socialIcons.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  aria-label={social.name}
                  className="flex size-8 items-center justify-center rounded-full bg-white/10 text-white/70 transition-colors hover:bg-primary hover:text-white"
                >
                  <svg viewBox="0 0 24 24" className="size-4" aria-hidden>
                    <path fill="currentColor" d={social.path} />
                  </svg>
                </a>
              ))}
              {socialShapes.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  aria-label={social.name}
                  className="flex size-8 items-center justify-center rounded-full bg-white/10 text-white/70 transition-colors hover:bg-primary hover:text-white"
                >
                  <svg viewBox="0 0 24 24" className="size-4" aria-hidden>
                    {social.shape}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {footerLinkGroups.map((group) => (
            <div key={group.title}>
              <p className="font-heading text-sm font-bold tracking-wider text-white uppercase">
                {group.title}
              </p>
              <ul className="mt-4 space-y-2.5 text-sm">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="transition-colors hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <p className="max-w-[15rem] font-heading text-xl leading-snug font-bold text-white">
              Let&apos;s Build a Better Community <span aria-hidden>💗</span>
            </p>
            <svg
              viewBox="0 0 200 44"
              className="mt-6 w-full max-w-[16rem] text-white/15"
              fill="currentColor"
              aria-hidden
            >
              <path d="M0 44V30h12v-8h10v8h8V14h14v30H0zM52 44V24h10v-9h9v9h6v-5h13v5h9v20H52zM104 44V13h12V4h7v9h11v31h-30zM142 44V27h11v-7h9v7h11V15h9v12h9v17h-49z" />
            </svg>
          </div>
        </div>

        <div className="border-t border-white/10 py-5 text-center text-xs text-white/50">
          © 2026 CommunityHub. All rights reserved.
        </div>
      </footer>
    </>
  )
}

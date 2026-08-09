import { Hand } from "lucide-react";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";
const linkGroups = [
  {
    title: "Product",
    links: [
      { label: "About", href: "#why" },
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Contact", href: "#contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "GitHub", href: "https://github.com" },
      { label: "University", href: "#contact" },
      { label: "Learning Hub", href: "#learning" },
      { label: "Technology", href: "#technology" },
    ],
  },
]

const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com", icon: FaLinkedin },
  { label: "GitHub", href: "https://github.com", icon: FaGithub },
  { label: "Email", href: "mailto:hello@signix.ai", icon: MdEmail },
];

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div className="flex flex-col gap-4">
            <a href="#home" className="flex items-center gap-2" aria-label="Signix home">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Hand size={20} aria-hidden="true" />
              </span>
              <span className="text-xl font-bold tracking-tight text-foreground">Signix</span>
            </a>
            <p className="max-w-sm text-base leading-relaxed text-muted">
              An AI-powered accessibility platform that helps everyone communicate through sign
              language, speech and text.
            </p>
            <ul className="mt-2 flex items-center gap-3">
              {socials.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    aria-label={label}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border text-muted transition-colors duration-200 hover:border-primary hover:text-primary"
                  >
                    <Icon size={20} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {linkGroups.map((group) => (
            <nav key={group.title} aria-label={group.title} className="flex flex-col gap-4">
              <h3 className="text-sm font-semibold text-foreground">{group.title}</h3>
              <ul className="flex flex-col gap-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith("/") ? <Link to={link.href}
                      className="text-base text-muted transition-colors duration-200 hover:text-foreground"
                    >{link.label}</Link> : <a href={link.href} className="text-base text-muted transition-colors duration-200 hover:text-foreground" target={link.href.startsWith("http") ? "_blank" : undefined} rel={link.href.startsWith("http") ? "noreferrer" : undefined}>{link.label}</a>}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 border-t border-border pt-6">
          <p className="text-sm text-muted">
            &copy; {new Date().getFullYear()} Signix. Built for accessible communication.
          </p>
        </div>
      </div>
    </footer>
  )
}

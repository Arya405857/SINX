import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Hand, Menu, X } from "lucide-react"
import { cn } from "../../utils/cn"
import Button from "../ui/Button"

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Features", href: "#features" },
  { label: "Learning", href: "#learning" },
  { label: "Technology", href: "#technology" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
]

function Logo() {
  return (
    <a href="#home" className="flex items-center gap-2" aria-label="Signix home">
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
        <Hand size={20} aria-hidden="true" />
      </span>
      <span className="text-xl font-bold tracking-tight text-foreground">Signix</span>
    </a>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled ? "border-b border-border bg-surface/90 backdrop-blur" : "bg-transparent",
      )}
    >
      <nav
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
        aria-label="Primary"
      >
        <Logo />

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-muted transition-colors duration-200 hover:text-foreground"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <Button variant="ghost" size="md" href="#login">
            Login
          </Button>
          <Button variant="primary" size="md" href="#get-started">
            Get Started
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-foreground transition-colors hover:bg-background lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden border-b border-border bg-surface lg:hidden"
          >
            <ul className="flex flex-col gap-1 px-4 py-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-4 py-3 text-base font-medium text-foreground transition-colors hover:bg-background"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="mt-2 flex flex-col gap-2">
                <Button variant="outline" size="md" href="#login" onClick={() => setOpen(false)}>
                  Login
                </Button>
                <Button variant="primary" size="md" href="#get-started" onClick={() => setOpen(false)}>
                  Get Started
                </Button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

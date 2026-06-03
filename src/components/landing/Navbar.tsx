import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[min(1100px,calc(100%-2rem))]"
        >
          <div className="flex items-center justify-between rounded-full border border-border/80 bg-black/40 backdrop-blur-md px-5 py-3">
            <a href="#top" className="font-medium tracking-tight text-accent">
              Commodity AI
            </a>
            <div className="flex items-center gap-2 sm:gap-4">
              <a
                href="#how"
                className="hidden sm:inline text-sm text-subtext hover:text-foreground transition-colors px-3 py-2"
              >
                How it Works
              </a>
              <a
                href="#waitlist"
                className="text-sm rounded-full border border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-all px-4 py-2"
              >
                Join Waitlist
              </a>
            </div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}

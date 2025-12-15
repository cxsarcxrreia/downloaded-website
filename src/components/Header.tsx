import Link from "next/link";

export default function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 mix-blend-difference text-white">
            {/* Logo - Mirroring the main H1 style but smaller */}
            <Link href="/" className="text-xl md:text-2xl font-bold tracking-tighter cursor-pointer hover:opacity-80 transition-opacity">
                downloaded<sup className="text-xs opacity-60 ml-0.5">&reg;</sup>
            </Link>

            {/* Navigation */}
            <nav className="flex items-center gap-6 md:gap-8 text-sm md:text-base font-medium tracking-wide uppercase">
                <Link href="/work" className="hover:underline underline-offset-4 decoration-white/50 hover:decoration-white transition-all">
                    Our Work
                </Link>
                <Link href="/about" className="hover:underline underline-offset-4 decoration-white/50 hover:decoration-white transition-all">
                    About Us
                </Link>
            </nav>
        </header>
    );
}

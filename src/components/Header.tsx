import Link from "next/link";
import Image from "next/image";

export default function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-black/80 backdrop-blur-md text-white border-b border-white/10">
            {/* Logo */}
            <Link href="/" className="hover:opacity-80 transition-opacity">
                <Image
                    src="/logo.png"
                    alt="Downloaded Studios"
                    width={150}
                    height={40}
                    className="h-8 w-auto"
                    priority
                />
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

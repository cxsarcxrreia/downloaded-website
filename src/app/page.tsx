import BackgroundGrid from "@/components/BackgroundGrid";
import LoadingDots from "@/components/LoadingDots";

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center p-8 overflow-hidden">
      {/* Interactive Background */}
      <BackgroundGrid />

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col items-center text-center space-y-6 max-w-2xl px-4 animate-in fade-in zoom-in duration-1000">

        {/* Hire Us Chip */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm shadow-sm transition-all hover:bg-white/10 cursor-default">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 animate-blink-color"></span>
          </span>
          <span className="text-xs text-gray-300 font-bold tracking-wider uppercase">Hire Us</span>
        </div>

        <div className="space-y-6">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tighter text-white mix-blend-difference overflow-hidden">
            {/* Split "downloaded" into letters for animation */}
            <span className="inline-block">
              {"downloaded".split("").map((char, index) => (
                <span
                  key={index}
                  className="inline-block opacity-0 animate-letter-reveal"
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  {char}
                </span>
              ))}
            </span>
            <sup className="text-lg md:text-2xl opacity-80 animate-in fade-in zoom-in duration-600 delay-1000"> &reg;</sup>
          </h1>
          <p className="text-sm md:text-base text-gray-400 tracking-normal font-light animate-in fade-in slide-in-from-bottom-5 duration-600 ease-out delay-200 fill-mode-backwards">
            [ Your Digital Solution is waiting<LoadingDots /> ]
          </p>
        </div>

        <div className="pt-1 animate-in fade-in slide-in-from-bottom-5 duration-600 ease-out delay-500 fill-mode-backwards">
          <a
            href="mailto:contact@downloaded.studios"
            className="group relative inline-flex items-center justify-center px-6 py-2 overflow-hidden font-bold text-white border border-white/20 hover:border-white transition-all duration-300 text-sm"
          >
            <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-10"></span>
            <span className="relative flex items-center gap-2">
              <span>SAY HELLO</span>
              <span className="group-hover:translate-x-1 transition-transform duration-300">
                &gt;
              </span>
            </span>
          </a>
        </div>
      </div>

      <footer className="absolute bottom-8 flex flex-col items-center gap-2 text-xs text-gray-700 uppercase tracking-widest">
        <span>Located in Algarve, Portugal</span>
        <span>© {new Date().getFullYear()} Downloaded Studios</span>
      </footer>
    </main>
  );
}

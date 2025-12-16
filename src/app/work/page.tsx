"use client";

import BackgroundGrid from "@/components/BackgroundGrid";
import SectionReveal from "@/components/SectionReveal";

// Data for the timeline
const TIMELINE = [
    {
        year: "2025",
        title: "Agency Launch",
        description: "Downloaded Studios is born. A digital sanctuary for modern web experiences.",
    },
    {
        year: "2025",
        title: "WalkSBN Festival",
        description: "First major project. A customized ticket selling app for the Santa Barbara de Nexe festival.",
        link: "https://wfsbn.com",
        linkLabel: "Visit wfsbn.com",
        features: [
            "Website Branding Redesign",
            "Full Purchase Flow In-app",
            "Payments In-app",
            "BackOffice Support",
        ],
    },
];

export default function WorkPage() {
    return (
        <main className="relative min-h-screen flex flex-col items-center pt-24 pb-12 px-4 overflow-hidden">
            <BackgroundGrid />

            <div className="relative z-10 w-full max-w-3xl animate-in fade-in slide-in-from-bottom-8 duration-700">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase mb-16 text-center text-white mix-blend-difference">
                    Our Work
                </h1>

                <div className="relative w-fit max-w-4xl mx-auto flex pb-16 flex-col">

                    {/* Central Line */}
                    <div className="absolute top-0 bottom-0 left-[22px] w-px bg-white/20"></div>

                    {TIMELINE.map((item, index) => (
                        <SectionReveal key={index} delay={index * 100}>
                            <div className="relative w-full flex items-start mb-16 last:mb-0 group">

                                {/* Timeline Dot (Left) */}
                                <div className="absolute left-[16px] mt-1.5 w-3 h-3 bg-black rounded-full border-2 border-white shadow-[0_0_10px_rgba(255,255,255,0.5)] z-20 group-hover:scale-150 transition-transform duration-300"></div>

                                {/* Content (Full Width) */}
                                <div className="w-full pl-12 pt-0.5">
                                    <span className="text-green-400 font-mono text-xs tracking-widest block mb-1 opacity-80">{item.year}</span>
                                    <h3 className="text-xl md:text-2xl font-bold uppercase mb-2 text-white group-hover:text-green-400 transition-colors">{item.title}</h3>
                                    <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-4 max-w-sm">
                                        {item.description}
                                    </p>

                                    {item.features && (
                                        <div className="flex flex-col gap-2 mb-4 items-start">
                                            {item.features.map((feature, i) => (
                                                <span
                                                    key={i}
                                                    className="px-3 py-1 text-[10px] md:text-xs font-mono font-bold uppercase tracking-wide text-green-400 border border-green-500/30 bg-green-500/10 rounded-full shadow-[0_0_10px_rgba(74,222,128,0.1)]"
                                                >
                                                    {feature}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    {item.link && (
                                        <a
                                            href={item.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 text-xs font-bold uppercase border border-white/20 px-4 py-2 hover:bg-white hover:text-black transition-colors"
                                        >
                                            {item.linkLabel}
                                        </a>
                                    )}
                                </div>
                            </div>
                        </SectionReveal>
                    ))}
                </div>
            </div>
        </main>
    );
}


"use client";

import BackgroundGrid from "@/components/BackgroundGrid";

const TEAM = [
    {
        name: "Cesar Correia",
        role: "IST Student / Master's",
        bio: "Current graduate student at Instituto Superior Técnico.",
    },
    {
        name: "Rafael Morão",
        role: "IST Student / Master's",
        bio: "Current graduate student at Instituto Superior Técnico",
    },
];

export default function AboutPage() {
    return (
        <main className="relative min-h-screen flex flex-col items-center pt-24 pb-12 px-4">
            <BackgroundGrid />

            <div className="relative z-10 w-full max-w-4xl animate-in fade-in zoom-in duration-700">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase mb-16 text-center text-white mix-blend-difference">
                    About Us
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    {TEAM.map((member, index) => (
                        <div
                            key={index}
                            className="group relative p-1 bg-gradient-to-br from-white/10 to-transparent hover:from-white/20 transition-all border border-white/10 rounded-xl"
                        >
                            <div className="relative flex flex-col items-center p-8 bg-black/40 h-full backdrop-blur-md rounded-xl">

                                {/* Avatar Placeholder */}
                                <div className="w-24 h-24 mb-6 rounded-full bg-neutral-800/80 border-2 border-white/10 flex items-center justify-center group-hover:border-white/50 transition-colors backdrop-blur-sm">
                                    <span className="text-2xl text-gray-600 group-hover:text-white transition-colors">
                                        {member.name.charAt(0)}
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold uppercase tracking-wide mb-1">{member.name}</h3>
                                <span className="text-xs font-mono text-green-400 uppercase tracking-widest mb-4">
                                    {member.role}
                                </span>

                                <p className="text-gray-400 text-sm text-center leading-relaxed font-light">
                                    {member.bio}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-20 max-w-3xl mx-auto space-y-16">
                    {/* Bio Section - Glassmorphism Layer */}
                    <div className="bg-black/30 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-2xl relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-400/50 to-transparent"></div>
                        <p className="text-sm md:text-base text-gray-300 leading-loose font-light text-center">
                            Having spent our entire lives on the Internet since we were born, we KNOW what is a good user experience. Coming from a background of freelancing and customer service, we also understand client satisfaction. Don't believe us? Check out this referral from our latest job.
                        </p>
                    </div>

                    {/* Referrals Section */}
                    <div className="text-center space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
                        <div className="flex items-center justify-center gap-4 opacity-50">
                            <div className="h-px w-12 bg-white"></div>
                            <h2 className="text-sm font-mono uppercase tracking-[0.2em]">Referrals</h2>
                            <div className="h-px w-12 bg-white"></div>
                        </div>

                        <div className="relative max-w-2xl mx-auto">
                            <span className="absolute -top-6 -left-4 text-6xl text-white/10 font-serif">"</span>
                            <blockquote className="text-lg md:text-xl font-light italic text-gray-200 leading-relaxed font-serif">
                                Downloaded Studios is a company that we have been using for a while now. They have been a pleasure to work with and their team is always on top of the current game. We highly recommend them for any project you have in mind.
                            </blockquote>
                            <span className="absolute -bottom-12 -right-4 text-6xl text-white/10 font-serif transform rotate-180">"</span>

                            <cite className="block mt-8 not-italic">
                                <span className="text-green-400 font-bold uppercase tracking-widest text-sm block mb-1">Filomena C.</span>
                                <span className="text-xs text-gray-500 uppercase tracking-wider">Client</span>
                            </cite>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

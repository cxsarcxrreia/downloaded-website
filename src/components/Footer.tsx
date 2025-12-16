"use client";

import React from "react";

export default function Footer() {
    return (
        <footer className="fixed bottom-8 w-full flex flex-col items-center gap-2 text-[10px] text-gray-700 uppercase tracking-wider z-50 pointer-events-none">
            <span>Located in Algarve, Portugal</span>
            <span>© {new Date().getFullYear()} Downloaded Studios</span>
        </footer>
    );
}

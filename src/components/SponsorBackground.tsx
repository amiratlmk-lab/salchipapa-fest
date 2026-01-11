"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export function SponsorBackground() {
    // Columns configuration: speed and direction
    // odd columns move down (rain), even columns move up (escalator) or all same direction?
    // User said "rain effect" or "escalator". Let's make them all move down for "rain" effect, maybe with different speeds for depth.
    // actually "escalator" might imply up. Let's do a slow consistent flow. Vertical Parallax.

    // Let's optimize: 9 columns for desktop to fill the width.
    const columns = [
        { duration: 25, delay: 0 },
        { duration: 35, delay: -5 },
        { duration: 28, delay: -10 },
        { duration: 40, delay: -15 },
        { duration: 30, delay: -2 },
        { duration: 32, delay: -8 },
        { duration: 22, delay: -12 },
        { duration: 38, delay: -4 },
        { duration: 26, delay: -6 },
    ]

    // Create a long strip of alternating logos
    const logos = Array(10).fill(null).map((_, i) => i % 2 === 0 ? "/watermark-uni.png" : "/watermark-epic.png")

    return (
        <div className="absolute inset-0 z-[5] overflow-hidden opacity-[0.60] pointer-events-none">
            {/* Expanded width for desktop to reach edges as requested */}
            <div className="flex justify-between w-full h-full max-w-[95%] mx-auto px-2 md:px-4">
                {columns.map((col, index) => (
                    <div
                        key={index}
                        // Hide some columns on mobile to prevent overcrowding, show all on desktop
                        className={`relative h-full w-20 md:w-32 flex-col gap-12 md:gap-20 items-center ${
                            // Show columns 0, 4, 8 on mobile (3 columns), hide others
                            // Or just hide every other one? Let's keep it simple:
                            // Desktop shows all 9. Mobile shows maybe 3 or 4.
                            index % 2 === 0 ? 'flex' : 'hidden md:flex'
                            }`}
                    >
                        {/* We need two sets of the logo strip to create a seamless loop */}
                        {/* Using pure CSS animation might be smoother for infinite loop than Framer Motion layout shift, but FM is easier to control */}

                        <motion.div
                            animate={{ y: [0, -1000] }} // Adjust based on height of content
                            transition={{
                                repeat: Infinity,
                                ease: "linear",
                                duration: col.duration,
                                repeatType: "loop"
                            }}
                            className="flex flex-col gap-16 md:gap-24 w-full items-center pb-16 md:pb-24"
                        >
                            {/* Tripling the content to ensure coverage during scroll */}
                            {[...logos, ...logos, ...logos].map((src, i) => (
                                <div key={i} className="relative w-16 h-16 md:w-24 md:h-24 opacity-80">
                                    <Image
                                        src={src}
                                        alt="sponsor"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            ))}
                        </motion.div>
                    </div>
                ))}
            </div>
        </div>
    )
}

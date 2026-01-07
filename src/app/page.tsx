"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Particles } from "@/components/Particles";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleStartVoting = () => {
    // Fade out effect or just simple navigation
    router.push("/votar");
  };

  return (
    <div className="h-[100svh] bg-slate-950 text-white relative overflow-hidden selection:bg-yellow-500/30">

      {/* Background Layer */}
      <div className="fixed top-0 left-0 w-full h-[100svh] md:h-screen md:inset-0 z-0">


        {/* Mobile Background (Vertical) */}
        <div className="absolute inset-0 z-0 block md:hidden">
          <Image
            src="/bg-home-mobile-4k.jpg"
            alt="Mobile Background"
            fill
            className="object-cover"
            priority
            quality={100}
            unoptimized
          />
        </div>

        {/* Desktop Background (Horizontal) */}
        <div className="absolute inset-0 z-0 hidden md:block">
          <Image
            src="/bg-home-4k.jpg"
            alt="Desktop Background"
            fill
            className="object-contain"
            priority
            quality={100}
            unoptimized
          />
        </div>

        <Particles />
      </div>

      {/* Main Content Layer */}
      <div className="relative z-10 flex flex-col h-full">

        {/* Hero Section */}
        <main className="flex-grow flex flex-col items-center justify-center gap-2 md:gap-0 px-4 py-2 md:pt-10 md:pb-12 text-center max-w-lg md:max-w-4xl mx-auto w-full h-full">


          {/* Integrated Header: Sponsors + Main Logo */}
          <div className="relative w-full max-w-[320px] md:max-w-[360px] aspect-square flex justify-center items-center mb-6">

            {/* Allied Logos (Positioned Top-Left, Lowered & Closer) */}
            <motion.div
              initial={{ opacity: 0, x: -30, filter: "blur(10px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
              className="absolute top-12 left-1 z-20 flex items-start gap-2"
            >
              <Image src="/sponsor-uni.png" alt="Uni Cola" width={56} height={56} className="object-contain drop-shadow-lg" />
              <Image src="/sponsor-epic.png" alt="Epic Marketing" width={48} height={48} className="object-contain drop-shadow-lg mt-1" />
            </motion.div>

            {/* Main Logo (Raised, Pushed Right) */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.4
              }}
              className="relative w-[70%] h-[70%] z-10 translate-x-6 -translate-y-2"
            >
              <motion.div
                className="w-full h-full relative"
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2 // Wait for entry to finish
                }}
              >
                <Image
                  src="/logo.png"
                  alt="Salchipapa Fest 2026"
                  fill
                  className="object-contain drop-shadow-[0_0_25px_rgba(234,179,8,0.4)] filter brightness-110"
                />
              </motion.div>
            </motion.div>
          </div>

          {/* Golden Crown */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1, type: "spring" }}
            className="-mt-28 relative z-20"
          >
            <Image src="/crown.png" alt="Crown" width={240} height={180} className="w-[240px] h-auto drop-shadow-md mx-auto" />
          </motion.div>

          {/* Main Text (H1) */}
          <motion.h1
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 1, duration: 1, ease: "easeOut" }}
            className="text-3xl md:text-6xl text-[#fbcc04] uppercase leading-tight tracking-tight mb-2 -mt-16 md:-mt-12 drop-shadow-md font-lilita"
          >
            ¡Vota por la mejor<br />salchipapa de Panamá!
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 1, ease: "easeOut" }}
            className="text-base md:text-lg text-white font-medium mb-2 md:mb-8 max-w-xs md:max-w-2xl mx-auto leading-relaxed"
          >
            Solo una será coronada como la reina del <span className="font-bold text-white">Salchipapa Fest 2026</span> 🏆
          </motion.p>

          {/* CTA Button */}
          <motion.button
            onClick={handleStartVoting}
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{
              scale: 1,
              opacity: 1,
              y: 0,
              boxShadow: ["0 0 10px rgba(251,204,4,0.25)", "0 0 30px rgba(251,204,4,0.45)", "0 0 10px rgba(251,204,4,0.25)"]
            }}
            whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(251,204,4,0.8)" }}
            whileTap={{ scale: 0.95 }}
            transition={{
              default: { type: "spring", stiffness: 200, damping: 20 },
              boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }}
            className="group relative bg-gradient-to-r from-orange-600 to-yellow-400 text-black text-xl md:text-2xl py-4 px-12 rounded-full flex items-center gap-3 border border-yellow-300/50 font-lilita tracking-wide mt-4"
          >
            <span>EMPIEZA A VOTAR 🔥</span>

            {/* Button Shine Effect */}
            <div className="absolute inset-0 rounded-full border border-white/30" />
            <div className="absolute top-0 left-0 w-full h-1/2 bg-white/10 rounded-t-full" />
          </motion.button>
          <footer className="pb-4 pt-2 md:py-10 text-center text-white text-xs mt-2 md:mt-8 relative z-20">
            <p>© 2026 Salchipapa Fest • Votación segura • Panamá</p>
          </footer>
        </main>

      </div>
    </div>
  );
}

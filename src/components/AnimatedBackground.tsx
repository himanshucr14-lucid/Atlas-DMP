'use client';

import { motion } from 'framer-motion';

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none bg-[#030712]">
      {/* Mesh Overlay */}
      <div className="animated-mesh" />
      
      {/* Floating Ambient Light Orbs */}
      <motion.div
        className="absolute top-[10%] left-[20%] w-[30vw] h-[30vw] rounded-full bg-indigo-500/10 blur-[120px]"
        animate={{
          x: [0, 40, -20, 0],
          y: [0, -30, 20, 0],
          scale: [1, 1.1, 0.9, 1]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
      <motion.div
        className="absolute bottom-[20%] right-[10%] w-[35vw] h-[35vw] rounded-full bg-violet-600/8 blur-[140px]"
        animate={{
          x: [0, -50, 30, 0],
          y: [0, 40, -30, 0],
          scale: [1, 0.9, 1.1, 1]
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
      <motion.div
        className="absolute top-[50%] left-[60%] w-[25vw] h-[25vw] rounded-full bg-cyan-500/8 blur-[100px]"
        animate={{
          x: [0, 20, -35, 0],
          y: [0, 50, -20, 0],
          scale: [1, 1.15, 0.85, 1]
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
    </div>
  );
}

"use client";

import React from "react";
import { Theme } from "./ImageThemes";
import { themeColorMap } from "./colorMap";
import { motion, AnimatePresence } from "framer-motion";

type HeroSectionProps = {
  theme: Theme;
  quote?: string;
};

export default function HeroSection({ theme, quote }: HeroSectionProps) {
  const tColor = themeColorMap[theme.primaryColor];

  return (
    <div className="w-full h-64 xl:h-full relative overflow-hidden group">
      <AnimatePresence mode="wait">
        <motion.div
            key={theme.imageUrl}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
        >
          {/* Background Image */}
          <img 
            src={theme.imageUrl} 
            alt={theme.name} 
            className={`w-full h-full object-cover ${theme.imagePosition || "object-center"}`}
          />
        </motion.div>
      </AnimatePresence>
      
      {/* Overlay Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-t ${tColor.gradient} via-black/20 opacity-90 transition-colors duration-1000`} />
      
      {/* Content */}
      <div className="absolute inset-0 p-8 sm:p-12 flex flex-col justify-end z-10">
        <AnimatePresence mode="wait">
          {quote ? (
            <motion.div
              key="quote"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="max-w-md"
            >
                <div className="w-8 h-1 bg-white mb-6 rounded-full shadow-[0_2px_4px_rgba(0,0,0,0.5)]" />
                <p 
                  className="text-white sm:text-lg md:text-xl font-medium leading-relaxed md:leading-loose tracking-normal mb-8 opacity-100 [text-shadow:_0_2px_12px_rgba(0,0,0,0.85)]"
                  style={{ fontFamily: "'-apple-system', 'BlinkMacSystemFont', 'SF Pro Text', 'SF Pro Display', 'San Francisco', 'Helvetica Neue', sans-serif" }}
                >
                  "{quote}"
                </p>
                <h3 className="text-white text-sm font-semibold tracking-widest uppercase opacity-90 [text-shadow:_0_2px_8px_rgba(0,0,0,0.8)]">
                  {theme.name} Season
                </h3>
            </motion.div>
          ) : (
            <motion.div
              key="no-quote"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-md"
            >
                <h3 className="text-white text-3xl font-bold tracking-wide drop-shadow-md mb-2">
                  {theme.name} Season
                </h3>
                <p className="text-white/80 text-sm">Natural rhythms</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

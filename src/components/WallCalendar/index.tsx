"use client";

import React, { useState } from "react";
import { format, addMonths, subMonths } from "date-fns";
import HeroSection from "./HeroSection";
import CalendarGrid from "./CalendarGrid";
import NotesPanel from "./NotesPanel";
import SnowEffect from "./SnowEffect";
import FlowerEffect from "./FlowerEffect";
import SunlightEffect from "./SunlightEffect";
import WaveEffect from "./WaveEffect";
import FogEffect from "./FogEffect";
import RainEffect from "./RainEffect";
import FogRainEffect from "./FogRainEffect";
import AugustFogGlowEffect from "./AugustFogGlowEffect";
import SeptemberLeavesEffect from "./SeptemberLeavesEffect";
import OctoberDiwaliEffect from "./OctoberDiwaliEffect";
import NovemberColdFogEffect from "./NovemberColdFogEffect";
import DecemberLightsEffect from "./DecemberLightsEffect";
import { getThemeForMonth, quotesMap } from "./ImageThemes";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { themeColorMap } from "./colorMap";
import { motion, AnimatePresence } from "framer-motion";

export default function WallCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selection, setSelection] = useState<{ start: Date | null; end: Date | null }>({
    start: null,
    end: null,
  });
  const [direction, setDirection] = useState(0);

  const activeTheme = getThemeForMonth(currentDate.getMonth());
  const currentQuote = quotesMap[currentDate.getMonth()];

  const handleNextMonth = () => {
    setDirection(1);
    setCurrentDate(addMonths(currentDate, 1));
  };
  
  const handlePrevMonth = () => {
    setDirection(-1);
    setCurrentDate(subMonths(currentDate, 1));
  };

  const handleDateClick = (date: Date) => {
    if (!selection.start || (selection.start && selection.end)) {
      setSelection({ start: date, end: null });
    } else {
      if (date < selection.start) {
        setSelection({ start: date, end: selection.start });
      } else {
        setSelection({ start: selection.start, end: date });
      }
    }
  };

  const tc = themeColorMap[activeTheme.primaryColor];

  const flipVariants = {
    enter: (dir: number) => ({
      rotateX: dir > 0 ? -90 : 90,
      opacity: 0,
      transition: { duration: 0.1 }
    }),
    center: {
      rotateX: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      rotateX: dir > 0 ? 90 : -90,
      opacity: 0,
      transition: { duration: 0.1 }
    }),
  };

  return (
    <div className="min-h-screen bg-white p-4 pt-16 md:p-8 md:pt-24 font-sans flex items-start justify-center transition-colors duration-500 relative overflow-hidden text-zinc-900">
      {/* Wall Texture / Wallpaper Pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-30 mix-blend-multiply"
        style={{ backgroundImage: 'radial-gradient(#e5e5e5 1px, transparent 1px)', backgroundSize: '24px 24px' }}
      />
      
      {/* Nail and String */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 flex flex-col items-center z-0 w-full max-w-[1200px] px-8 md:px-32 object-visible">
        {/* The Nail */}
        <div className="w-4 h-4 rounded-full bg-zinc-800 dark:bg-zinc-400 shadow-[1px_8px_10px_rgba(0,0,0,0.5)] border border-zinc-900 absolute -top-2 z-20 flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-zinc-600 dark:bg-zinc-300" />
            <div className="w-full h-full rounded-full absolute inset-0 bg-gradient-to-tr from-transparent to-white/20" />
        </div>
        
        {/* The String */}
        <svg width="100%" height="80" viewBox="0 0 1000 80" preserveAspectRatio="none" className="opacity-80 drop-shadow-md">
          <path d="M 500 0 Q 750 40 900 80" fill="transparent" stroke="#5a5a5a" strokeWidth="2.5" />
          <path d="M 500 0 Q 250 40 100 80" fill="transparent" stroke="#5a5a5a" strokeWidth="2.5" />
        </svg>
      </div>

      <div className="max-w-[1200px] w-full bg-white dark:bg-zinc-900 rounded-b-xl rounded-t-sm shadow-[0_30px_60px_-15px_rgba(0,0,0,0.4)] dark:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.8)] flex flex-col xl:flex-row relative border-b-4 border-r-4 border-white/50 dark:border-black/50 z-10 mt-6 lg:mt-0 transition-all duration-300 items-stretch">
        
        {/* Top Wire Binding (simulated connecting to the string) */}
        <div className="absolute -top-3 left-0 right-0 h-6 flex justify-around px-8 sm:px-16 md:px-24 z-20 pointer-events-none drop-shadow-md">
            {Array.from({ length: 30 }).map((_, i) => (
              <div key={i} className="w-1.5 h-6 bg-gradient-to-b from-zinc-200 to-zinc-500 dark:from-zinc-400 dark:to-zinc-800 rounded-full shadow-sm" />
            ))}
        </div>

        {/* Hero Section */}
        <div className="xl:w-[40%] relative overflow-hidden rounded-tl-sm xl:rounded-bl-xl z-0">
          <HeroSection theme={activeTheme} quote={currentQuote} />
        </div>

        {/* Calendar & Notes */}
        <div className={`flex-1 flex flex-col p-6 sm:p-10 z-10 ${tc.pageBg} xl:shadow-[-15px_0_30px_-5px_rgba(0,0,0,0.1)] dark:xl:shadow-[-15px_0_30px_-5px_rgba(0,0,0,0.4)] relative rounded-br-xl xl:rounded-tr-sm transition-colors duration-1000`}>
          
          {currentDate.getMonth() === 0 && <SnowEffect currentDate={currentDate} />}
          {currentDate.getMonth() === 1 && <FlowerEffect currentDate={currentDate} />}
          {currentDate.getMonth() === 2 && <SunlightEffect />}
          {currentDate.getMonth() === 3 && <WaveEffect />}
          {currentDate.getMonth() === 4 && <FogEffect />}
          {currentDate.getMonth() === 5 && <RainEffect />}
          {currentDate.getMonth() === 6 && <FogRainEffect />}
          {currentDate.getMonth() === 7 && <AugustFogGlowEffect />}
          {currentDate.getMonth() === 8 && <SeptemberLeavesEffect />}
          {currentDate.getMonth() === 9 && <OctoberDiwaliEffect />}
          {currentDate.getMonth() === 10 && <NovemberColdFogEffect />}
          {currentDate.getMonth() === 11 && <DecemberLightsEffect />}
          
          <div className="flex items-end justify-between mb-10 pb-6 border-b border-zinc-100 dark:border-zinc-800 relative z-40">
            <div>
              <h2 className={`text-4xl sm:text-5xl font-extrabold tracking-tight ${tc.headingText} transition-colors duration-300 relative inline-block group`}>
                {format(currentDate, "MMMM")}
              </h2>
              <p className={`text-xl sm:text-2xl ${tc.text} font-bold mt-1 uppercase tracking-widest pl-1`}>
                {format(currentDate, "yyyy")}
              </p>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={handlePrevMonth}
                className={`p-3 bg-white dark:bg-zinc-900 rounded-full ${tc.hoverBg} transition-colors border border-zinc-200 dark:border-zinc-700 shadow-sm`}
              >
                <ChevronLeft className="w-5 h-5 text-zinc-600 dark:text-zinc-300" />
              </button>
              <button 
                onClick={handleNextMonth}
                className={`p-3 bg-white dark:bg-zinc-900 rounded-full ${tc.hoverBg} transition-colors border border-zinc-200 dark:border-zinc-700 shadow-sm`}
              >
                <ChevronRight className="w-5 h-5 text-zinc-600 dark:text-zinc-300" />
              </button>
            </div>
          </div>

          <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            <div 
              className="lg:col-span-7 xl:col-span-8 flex flex-col justify-center relative"
              style={{ perspective: 1200 }}
            >
              <AnimatePresence mode="popLayout" custom={direction}>
                <motion.div
                  key={currentDate.toISOString()}
                  custom={direction}
                  variants={flipVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
                  style={{ transformOrigin: "top" }}
                  className="w-full"
                >
                  <CalendarGrid 
                    currentDate={currentDate} 
                    selection={selection} 
                    onDateClick={handleDateClick}
                    themeColor={activeTheme.primaryColor}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="lg:col-span-5 xl:col-span-4 h-full min-h-[300px]">
              <NotesPanel 
                currentDate={currentDate} 
                selection={selection}
                themeColor={activeTheme.primaryColor}
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

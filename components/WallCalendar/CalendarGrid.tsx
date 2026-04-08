"use client";

import React from "react";
import { 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  format, 
  isSameMonth, 
  isSameDay, 
  isWithinInterval,
  isWeekend
} from "date-fns";
import { cn } from "@/lib/utils";
import { themeColorMap } from "./colorMap";

type CalendarGridProps = {
  currentDate: Date;
  selection: { start: Date | null; end: Date | null };
  onDateClick: (date: Date) => void;
  themeColor: string;
};

export default function CalendarGrid({ currentDate, selection, onDateClick, themeColor }: CalendarGridProps) {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  
  // Wall calendars usually start on Sunday (0)
  const startDate = startOfWeek(monthStart, { weekStartsOn: 0 });
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 0 });
  
  const dateFormat = "d";
  const days = eachDayOfInterval({ start: startDate, end: endDate });
  
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
  const tc = themeColorMap[themeColor];

  return (
    <div className="w-full">
      <div className="grid grid-cols-7 mb-4">
        {weekDays.map((ds, idx) => {
          const isWkdHeader = idx === 0 || idx === 6;
          return (
            <div key={idx} className={`text-center font-bold text-xs tracking-widest uppercase ${isWkdHeader ? (tc.weekendText || 'text-red-500/90') : tc.text}`}>
              {ds}
            </div>
          );
        })}
      </div>
      
      <div className="grid grid-cols-7 gap-y-2 gap-x-0">
        {days.map((day, idx) => {
          const isSelectedStart = selection.start && isSameDay(day, selection.start);
          const isSelectedEnd = selection.end && isSameDay(day, selection.end);
          const isSelected = isSelectedStart || isSelectedEnd;
          const isBetween = selection.start && selection.end && 
            isWithinInterval(day, { start: selection.start, end: selection.end }) && !isSelected;
          
          const isCurrentMonth = isSameMonth(day, monthStart);
          const isToday = isSameDay(day, new Date());
          const isWkd = isWeekend(day);

          return (
            <div 
              key={idx} 
              className={cn(
                "relative h-12 flex items-center justify-center cursor-pointer group",
                !isCurrentMonth && "opacity-30",
              )}
              onClick={() => onDateClick(day)}
            >
              {/* Between Highlight background */}
              {isBetween && (
                <div className={cn("absolute inset-0 top-1 bottom-1", tc.softBg)} />
              )}
              
              {/* Range Connection Backgrounds */}
              {isSelectedStart && selection.end && !isSameDay(selection.start as Date, selection.end as Date) && (
                 <div className={cn("absolute right-0 w-1/2 top-1 bottom-1", tc.softBg)} />
              )}
              {isSelectedEnd && selection.start && !isSameDay(selection.start as Date, selection.end as Date) && (
                 <div className={cn("absolute left-0 w-1/2 top-1 bottom-1", tc.softBg)} />
              )}

              {/* Day Circle / Button */}
              <div 
                className={cn(
                  "relative z-10 w-10 h-10 flex flex-col items-center justify-center rounded-full text-sm transition-all duration-200",
                  isSelected 
                    ? tc.solidBg + " shadow-lg scale-105 ring-4 ring-[#F2F4F5] font-bold"
                    : `${isWkd ? (tc.weekendText || 'text-red-500/90') : tc.text} font-bold ` + tc.hoverBg,
                  isToday && !isSelected && "ring-2 " + tc.ring,
                  isWkd && !isSelected && "font-extrabold"
                )}
              >
                <span>{format(day, dateFormat)}</span>
              </div>
              
              {/* Hover effect that looks like a subtle shadow */}
              {!isSelected && !isBetween && isCurrentMonth && (
                <div className="absolute inset-2 rounded-full border-b-2 border-transparent group-hover:border-zinc-200 dark:group-hover:border-zinc-700 transition-colors pointer-events-none" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { themeColorMap } from "./colorMap";

type NotesPanelProps = {
  currentDate: Date;
  selection: { start: Date | null; end: Date | null };
  themeColor: string;
};

export default function NotesPanel({ currentDate, selection, themeColor }: NotesPanelProps) {
  const [notes, setNotes] = useState<Record<string, string>>({});

  useEffect(() => {
    // Load from localStorage on mount
    const saved = localStorage.getItem("calendar_notes");
    if (saved) {
      try {
        setNotes(JSON.parse(saved));
      } catch (e) {
         // silent fallback
      }
    }
  }, []);

  const saveNotes = (newNotes: Record<string, string>) => {
    setNotes(newNotes);
    localStorage.setItem("calendar_notes", JSON.stringify(newNotes));
  };

  // Determine the key for the current note.
  let noteKey = format(currentDate, "yyyy-MM");
  let headerText = format(currentDate, "MMMM yyyy") + " Notes";

  if (selection.start && selection.end) {
    if (selection.start.getTime() === selection.end.getTime()) {
      noteKey = format(selection.start, "yyyy-MM-dd");
      headerText = format(selection.start, "MMM d, yyyy");
    } else {
      noteKey = `${format(selection.start, "yyyy-MM-dd")}_${format(selection.end, "yyyy-MM-dd")}`;
      headerText = `${format(selection.start, "MMM d")} - ${format(selection.end, "MMM d")}`;
    }
  } else if (selection.start) {
      noteKey = format(selection.start, "yyyy-MM-dd");
      headerText = format(selection.start, "MMM d, yyyy");
  }

  const currentNote = notes[noteKey] || "";

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    saveNotes({
      ...notes,
      [noteKey]: e.target.value
    });
  };

  const tc = themeColorMap[themeColor];

  return (
    <div className={`h-full flex flex-col bg-[#3f3f46] text-zinc-100 rounded-2xl border ${tc.border} overflow-hidden shadow-lg transition-colors duration-300 min-h-[250px]`}>
      <div className={`px-5 py-3 bg-[#27272a]/50 border-b border-zinc-600 flex items-center justify-between transition-colors duration-300`}>
        <h4 className={`font-semibold text-sm text-zinc-100 tracking-wide uppercase`}>
          {headerText}
        </h4>
        <div className={`text-xs text-zinc-300 opacity-80 font-medium`}>
          Local
        </div>
      </div>
      <div className="flex-1 p-5 relative overflow-hidden">
        {/* Ruled lines background for 'physical calendar' feel */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-20 dark:opacity-10 mt-5" 
          style={{ 
            backgroundImage: 'repeating-linear-gradient(transparent, transparent 31px, #94a3b8 31px, #94a3b8 32px)', 
            backgroundPositionY: '0px' 
          }}
        />
        
        <textarea
          value={currentNote}
          onChange={handleNoteChange}
          placeholder="Jot down events, to-dos, or thoughts..."
          className="w-full h-full resize-none bg-transparent border-none focus:ring-0 text-zinc-100 leading-[32px] relative z-10 p-0 text-base outline-none placeholder:text-zinc-400/70"
          spellCheck="false"
        />
      </div>
    </div>
  );
}

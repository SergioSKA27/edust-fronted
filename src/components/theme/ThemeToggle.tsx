'use client';

import { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Toggle } from '@/components/ui/toggle';


import { Moon, Sun, Palette } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [showThemePicker, setShowThemePicker] = useState(false);
  
  const lightTheme: Theme = 'light';
  const darkTheme: Theme = 'dark';
  const themes = [
    { name: lightTheme, icon: <Sun className="w-4 h-4" />, color: '#f59e0b' },
    { name: darkTheme, icon: <Moon className="w-4 h-4" />, color: '#3b82f6' },
  ];

  return (
    <div className="relative group">
      <button
        onClick={() => setShowThemePicker(!showThemePicker)}
        className={cn(
          "h-10 w-10 rounded-full flex items-center justify-center transition-all",
          "bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700",
          "shadow-lg hover:shadow-xl",
          "border border-gray-200 dark:border-gray-700"
        )}
      >
        <motion.div
          key={theme}
          initial={{ rotate: 45, scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          exit={{ rotate: 45, scale: 0 }}
          transition={{ duration: 0.2 }}
        >
          {themes.find(t => t.name === theme)?.icon}
        </motion.div>
      </button>

      <AnimatePresence>
        {showThemePicker && (
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 10 }}
          className="absolute left-0 top-5 mr-2 w-48 p-2 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700"
        >
            <div className="flex flex-col gap-2">
              {themes.map((t) => (
                <button
                  key={t.name}
                  onClick={() => {
                    toggleTheme(t.name);
                    setShowThemePicker(false);
                  }}
                  className={cn(
                    "flex items-center justify-between px-3 py-2 rounded-lg",
                    "transition-colors duration-200",
                    theme === t.name 
                      ? "bg-blue-100 dark:bg-gray-700" 
                      : "hover:bg-gray-100 dark:hover:bg-gray-600"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full shadow-sm"
                      style={{ backgroundColor: t.color }}
                    />
                    <span className="capitalize text-sm text-gray-700 dark:text-gray-200">
                      {t.name}
                    </span>
                  </div>
                  {theme === t.name && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-4 h-4 text-blue-500"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </motion.div>
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}